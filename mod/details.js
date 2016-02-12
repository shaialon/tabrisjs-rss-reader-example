// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function(){
	// The first thing we need to do is create a page
	// (The format of c.page is, c.page( title, topLevel?, Composite or ScrollView?, semiTransparent Background? ))
	page = libs.page( c.get('activeTabName'), false, null, true );

	var font = tabris.device.get("platform") === "iOS" ? "font-size: 290%; font-family:'Helvetica Neue';" : 'font-size: 100%; ';
	var padding = tabris.device.get("platform") === "iOS" ? 'padding: 10px 30px 0px 30px;' : 'padding: 10px 10px 0px 10px;';
	var fixedhtml = '<style>body{background:transparent; '+font + padding+'} html{ background: transparent; } img{width: 100%; max-width: 100%; margin-bottom: 10px; } .pubDate{color:#5A5A5A}</style>';

	var body = tabris.create('WebView', { left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);

	body.set("html", '<html><head>'+fixedhtml+'</head><body><h2>'+c.get('title')+'</h2><h4 class="pubDate">'+c.get('pubDate')+'</h4> ' + c.get('content') + '</body></html>');

}
