var config = require('./../config.js').config;
var newsWidgetComponent = require('./../components/news_widget');
var updateUIColors = require('./../styles/general.js').updateUIColors;

function init() {
    // Ok we need a page to contain all the crazy things we are going to create
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;


    // Now we will create a tab per source
    var rssFeeds = config.rssFeeds;

    // So we need a Tab Container
    var tabFolderConfig = { left: 0, top: 0, right: 0, bottom:0 , elevation: 8 , tabBarLocation: "top", paging: true};
    tabs = tabris.create('TabFolder', tabFolderConfig ).appendTo(page);

    // We update the UI based on the theme and active tab.
    updateUIColors(rssFeeds[0].color);

    // So now we add the tabs to the Tab Container
    rssFeeds.forEach(function( rssFeed ){
        var tab = tabris.create( 'Tab', { title: rssFeed.name, background: 'white', _rssFeed: rssFeed} ).appendTo(tabs);
        newsWidgetComponent( rssFeed ).appendTo(tab);
    });


    // When the user change the tab we need to change the tab container background
    tabs.on("change:selection", function(widget, tab) {
        updateUIColors(tab.get('_rssFeed').color);
    });

    //_refresh = false; // why we need to know when the user is refreshing? because refreshing is an async process
                      // and if the user refresh 100 times the app could even crash,
                      // so one refresh at time ok?

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

