// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.wgnews = function( counter , tabDefinition ) {
    return tabris.create("CollectionView", {
        id: 'list_' + counter,
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        items: [],
        itemHeight: 220,
        refreshEnabled: true,
        initializeCell: function(cell){
            var icon, title, titleShadow, date, bg;

            bg = tabris.create('Composite', { left: 0, right: 0, top: 0, bottom: 0 }).appendTo(cell);

            // the news picture is setted up 100% x 100%

            icon = tabris.create('ImageView',
                { left: 0, right: 0, top: 1, bottom: 0, scaleMode: 'fill' , background: "rgb(220, 220, 220)"}).appendTo(bg);

            date = tabris.create('TextView',
                { right: 5, bottom: 10, font: '11px', textColor: '#666', width: 200, alignment: 'center' }).appendTo(bg);

            // Tabris doesn't include a function to add shadow to text, but we can use this simple trick
            // create 2 textviews with exactly the same text and positioning almost at the same location, with just a few pixels of difference

            titleShadow = tabris.create('TextView',
                { maxLines: 2, font: '25px', left: 6.5, right: 5, bottom: [date, -3], textColor: '#000' }).appendTo(bg);

            title = tabris.create('TextView',
                { maxLines: 2, font: '25px', left: 5, right: 5, bottom: [date, -2], textColor: '#fff' }).appendTo(bg);

            cell.on("change:item", function(widget, item) {

                title.set('text', item.title);
                titleShadow.set('text', item.title);

                item.enclosure = item.enclosure || {};
                var img = item.enclosure.link || item.enclosure.thumbnail;
                if(tabDefinition.imageResolver){
                    img = tabDefinition.imageResolver(item);
                }
                else if(!img){
                    // Fallback, extract image from the content
                    img = extractFirstImageFromHtml(item.description);
                }
                if(!img){
                    img = './images/notfound.png';
                }
                icon.set('image', img);

                date.set('text', item.pubDate);
            });
        }
    }).on("select", function(target, value) {

        c.set( 'title', value.title );
        c.set( 'activeTabName', tabDefinition.name );

        // so we delete images tags and some copyrights tags

        c.set( 'content', sanitizeHTMLfromFeedBloat(value.content) );
        c.set( 'pubDate', value.pubDate );

        try {
            // in this particular case we modify the images url in order to make them load faster
            c.set( 'icon', value.enclosure.link.replace('https://', 'http://').replace('.jpg', '-320x210.jpg') );
        }
        catch( error ) {
            c.set( 'icon', 'none' );
        }

        mods.details();
    });
}


function extractFirstImageFromHtml(html) {
    var m,
        rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\>/g;

    m = rex.exec( html );
    if(m && m[1]) { return m[1]; }
    return null;
}

function sanitizeHTMLfromFeedBloat(html){
    return html.replace(/<a href="http:\/\/feeds.feedburner.com.*?<\/a>/ig,'').replace(/<br clear="all".*?alt="">/im,'')
}
