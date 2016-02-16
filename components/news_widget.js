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
            var icon, title, bg;
            var themeStyle = getThemeCellStyle(feedConfig.color);

            container = tabris.create('Composite', { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background}).appendTo(cell);

            icon = tabris.create('ImageView', { left: 0, right: 0, top: 1, bottom: 1, scaleMode: 'fill' , background: "rgb(220, 220, 220)"}).appendTo(container);

            tabris.create('Composite', { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8}).appendTo(container);

            title = tabris.create('TextView', { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }).appendTo(container);

            cell.on("change:item", function(widget, item) {
                title.set('text', item.title);
                icon.set('image', helpers.resolveImageForFeedItem(item ,feedConfig.imageResolver) );
            });
        }
    }).on("select", function(target, value) {
        detailScreen.open(feedConfig.name, value);
    });
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
