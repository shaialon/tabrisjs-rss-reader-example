// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function(){
	// The first thing we need to do is create a page
	// (The format of c.page is, c.page( title, topLevel?, Composite or ScrollView?, semiTransparent Background? ))
	page = libs.page( 'RSS Reader Example', false, null, true );

	// We display the title with a cool serif font
	//	var title = c.label(c.get('title'));
	// 	title.set({ font: '30px serif' });

	// We display the icon if its available
	// 	var _icon = c.get('icon');

	//if( _icon != 'none' )
	//	tabris.create('ImageView',
	//               { left: 0, right: 0, top: 'prev() 10', height: 200, scaleMode: 'fill', image: _icon }).appendTo(page);

	// We display the publication date
	//	var pubDate = c.label( c.get('pubDate') );
	//	pubDate.set({background: '#2DB200', textColor: 'white', left: null, right: 10, width: 150, alignment: 'center'});

	// And finally we display the body
	//	var body = c.label( c.get('content') );
	var fontSize = tabris.device.get("platform") === "iOS" ? 'font-size: 290%; ' : 'font-size: 100%; ';
	var padding = tabris.device.get("platform") === "iOS" ? 'padding: 0px 20px 0px 20px;' : '';
	var fixedhtml = '<style>body{background:transparent; '+fontSize + padding+'} html{ background: transparent; } img{width: 100%; max-width: 100%;  }</style>';

	var body2 = tabris.create('WebView',
		{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);

	body2.set("html", '<html><head>'+fixedhtml+'</head><body><h1>'+c.get('title')+'</h1>' + c.get('content') + '</body></html>');

	//	body.set({font:'15px'});
}
