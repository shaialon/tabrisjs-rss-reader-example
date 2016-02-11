// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function( title, _top, type, bgTrans ){
	// So why we don't use ScrollView all the time?
	// CollectionView doesn't work properly with ScrollView but works perfectly with composite thats why,
	// in a CollectionView (list) the vertical scrolling is included in the widget itself,
	// nothing good happens when you make scrolling over scrolling :p

	var type = type || 'Composite';
	var margin = 0; // 5

	var __page = tabris.create("Page", { title: title || config.appName, topLevel: _top || false});

	if( typeof bgTrans != 'undefined' ) {
		var bgTrans = tabris.create("ImageView",
			{ left: margin, right: margin, top: 0, bottom: margin, image: 'images/bgrow.png', scaleMode: 'stretch' }).appendTo(__page);
	}

	var main = tabris.create(type, { left: margin, top: 0, right: margin, bottom: margin }).appendTo(__page);
	var _com = tabris.create("Composite", {left: 0, width: 1, height: 1, top: 0} ).appendTo(__page);

	__page.open();

	return main;
}
