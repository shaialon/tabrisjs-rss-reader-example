// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

exports.init = function(){
	// The first thing we need to do is create a page
	// (The format of c.page is, c.page( title, topLevel?, Composite or ScrollView?, semiTransparent Background? ))
	page = libs.page( c.get('activeTabName'), false, null, true );

	activeFeedItemLink = c.get('activeFeedItemLink');

	//var openLinkAction = tabris.create("Action", {
	//	id: "openLink",
	//	title: "Link",
	//	placementPriority: "high",
	//	image: {src: "images/refresh.png", scale: 3}
	//}).on("select", function() {
	//	body.dispose();
	//	tabris.create('WebView', { url: activeFeedItemLink, left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
	//});

	//tabris.ui.activePage().on("disappear", function(){
	//	openLinkAction.set('visible',false);
	//	//tabris.ui.children("#openLink").set('visible',false);
	//});


	var font = tabris.device.get("platform") === "iOS" ? "font-size: 290%; font-family:'Helvetica Neue';" : 'font-size: 100%; ';
	var padding = tabris.device.get("platform") === "iOS" ? 'padding: 10px 30px 0px 30px;' : 'padding: 10px 10px 0px 10px;';
	var img = tabris.device.get("platform") === "iOS" ? 'width:100%;' : 'max-width: 100%;';



	var fixedhtml = '<style>body{background:transparent; '+font + padding+'} html{ background: transparent; } img{ ' + img + ' } .pubDate{color:#5A5A5A}</style>';

	var body = tabris.create('WebView', { left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);

	body.set("html", '<html><head>'+fixedhtml+'</head><body><h2>'+c.get('title')+'</h2><h4 class="pubDate">'+c.get('pubDate')+'</h4> ' + c.get('content') + '</body></html>');

}
