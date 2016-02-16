// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

var detailScreen = require('./../pages/details');
var helpers = require('./../helpers');

module.exports = function( counter , tabDefinition ) {
    return tabris.create("CollectionView", {
        id: 'list_' + counter,
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        items: [],
        itemHeight: 220,
        refreshEnabled: true,
        initializeCell: function(cell){
            var icon, title, bg;
            var bottomMargin = 1;
            var themeStyle = getThemeCellStyle(tabDefinition.color);

            bg = tabris.create('Composite', { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background}).appendTo(cell);

            icon = tabris.create('ImageView',
                { left: 0, right: 0, top: 1, bottom: 0+bottomMargin, scaleMode: 'fill' , background: "rgb(220, 220, 220)"}).appendTo(bg);

            tabris.create('Composite', { left: 0, right: 0, height: 46, bottom: 0+bottomMargin ,background: themeStyle.overlayBG, opacity: 0.8}).appendTo(bg);

            title = tabris.create('TextView', { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 4+bottomMargin, textColor: themeStyle.textColor }).appendTo(bg);

            cell.on("change:item", function(widget, item) {
                title.set('text', item.title);
                icon.set('image', helpers.resolveImageForFeedItem(item ,tabDefinition.imageResolver) );
            });
        }
    }).on("select", function(target, value) {
        detailScreen.open(tabDefinition.name, value);
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
