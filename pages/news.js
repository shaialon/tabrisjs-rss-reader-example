var newsWidget = require('./../components/news_widget');
var helpers = require('./../helpers/feed_helpers');

function init() {
    // Ok we need a page to contain all the crazy things we are going to create
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;


    // Now we will create a tab per source
    var tabsDef = config.channels;

    // So we need a Tab Container
    var tabFolderConfig = { left: 0, top: 0, right: 0, bottom:0 , elevation: 8 , tabBarLocation: "top", paging: true};
    tabs = tabris.create('TabFolder', tabFolderConfig ).appendTo(page);

    // We update the UI based on the theme and active tab.
    updateUIColors(tabsDef[0].color);

    // So now we add the tabs to the Tab Container
    _tabs = [];

    tabsDef.forEach(function( thisTab , index ){
        _tabs[ index ] = tabris.create( 'Tab', { title: thisTab.name, background: 'white' } ).appendTo(tabs);
    });

    // When the user change the tab we need to change the tab container background
    tabs.on("change:selection", function(widget, tab) {
        tabsDef.forEach(function( thisTab ){
            if( tab.get('title') == thisTab.name ) {
                url = thisTab.feed;
                updateUIColors(thisTab.color);
            }
        })
    });

    // Check the news.widget.js file for more information but basically we crete the list and assign the refresh function to the onRefresh event

    var list = [];

    for( x=0;x<tabsDef.length;x++ ) {
        list[ x ] = newsWidget( x ,tabsDef[x] );
        list[ x ].appendTo(_tabs[ x ]); // Also we add the list to the tab
        list[ x ].on('refresh', function(widget){
            _refresh = true;
            refresh( widget.get('id').replace('list_', '') );
        });
    }


    // Show the loading indicator and get the news

    function refresh( counter ) {
        list[counter].set({
            refreshIndicator: true,
            refreshMessage: "loading..."
        });
        getItems( counter );
    }

    cache = []; // Stores cached information

    // This function get the info from the web service using the Fetch function

    function getItems( counter ) {
        loading = true;
        url = tabsDef[counter].feed;

        // If the url is not in cache or the user is refreshing we get the info from the RSS
        if( (typeof cache[url] == 'undefined' || cache[url] == '') || _refresh == true )

            fetch( url ).then(function( res ){
                return res.json();
            }).then(function( res ){
                //console.log("Got items "+counter)
                var itemsUsed = helpers.sanitizeFeedItems (res.items , tabsDef[counter].contentSanitizer);
                list[counter].insert(itemsUsed, -1);
                list[counter].reveal(0);
                //list[counter].set('items', res.items );

                cache[url] = itemsUsed;
                loading = false;
                list[counter].set('refreshIndicator', false);
                list[counter].set('refreshMessage', '');
            });

        // If not we get the info from cache
        else {

            list[counter].set('items', cache[url] );
            loading = false;
            list[counter].set('refreshIndicator', false);
            list[counter].set('refreshMessage', '');

        }

        _refresh = false;
    }

    // refresh the ui styling based on the theme (and color passed.
    function updateUIColors(color){
        if(config.theme === 'light'){
            tabris.ui.set({background: 'white', textColor: color });
            tabs.set({background: 'white', textColor: color});
        }
        else if (config.theme === 'full') {
            tabris.ui.set({background: color, textColor: 'white' });
            tabs.set({background: color, textColor: 'white'});
        }
        else if (config.theme === 'normal') {
            tabris.ui.set({background: color, textColor: 'white' });
            tabs.set({background: 'white',textColor: color});
        }
        // If the theme is other then just fall back to system defaults.
    }


    // We are close to run this thing but before of that

    _refresh = false; // why we need to know when the user is refreshing? because refreshing is an async process
                      // and if the user refresh 100 times the app could even crash,
                      // so one refresh at time ok?

    url = tabsDef[0].feed; // We set the default url

    // Initially we get the news for all the tabs
    for(x=0;x<tabsDef.length;x++){
        refresh(x);
    }

    return page;
}

function open(){
    var p = init();
    return p.open();
}

module.exports = {
    init: init,
    open: open
}

