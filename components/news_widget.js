var detailScreen = require('./../pages/details');
var helpers = require('./../helpers/feed_helpers');

module.exports = function( counter , feedConfig ) {
    return tabris.create("CollectionView", {
        id: 'list_' + counter,
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        items: [],
        itemHeight: 220,
        refreshEnabled: true,
        _feedConfig: feedConfig,
        initializeCell: function(cell){

            var style = cellStyle(feedConfig);
            var container = tabris.create('Composite', style.container).appendTo(cell),
                icon      = tabris.create('ImageView', style.image).appendTo(container),
                overlay   = tabris.create('Composite', style.overlay).appendTo(container),
                title     = tabris.create('TextView',  style.title).appendTo(container);

            cell.on("change:item", function(widget, item) {
                title.set('text', item.title);
                icon.set('image', helpers.resolveImageForFeedItem(item ,feedConfig.imageResolver) );
            });
        }
    }).on("select", function(target, feedItem) {
        detailScreen.open(feedConfig.name, feedItem);
    });
}


function cellStyle(feedConfig){
    var themeStyle = getThemeCellStyle(feedConfig.color);
    return {
        container : { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background},
        image: { left: 0, right: 0, top: 1, bottom: 1, scaleMode: 'fill' , background: "rgb(220, 220, 220)"},
        overlay: { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8},
        title: { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }
    }
}


function getThemeCellStyle(color){
    if (config.theme === 'light'){
        return {
            background: 'white',
            overlayBG: 'white',
            textColor: color
        }
    }
    else if (config.theme === 'normal'){
        return {
            background: 'white',
            overlayBG: color,
            textColor: 'white'
        }
    }
    else if (config.theme === 'full'){
        return {
            background: color,
            overlayBG: color,
            textColor: 'white'
        }
    }
}
