// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: pageTitle, topLevel: false });

	var openLinkAction = tabris.create("Action", {
		id: "openLink",
		placementPriority: "high",
		image: {src: "images/refresh.png", scale: 3}
	}).on("select", function() {
		body.dispose();
		tabris.create('WebView', { url: feedItem.link, left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
	});

	page.on("disappear", function(){
		openLinkAction.dispose();
	});


	var font = tabris.device.get("platform") === "iOS" ? "font-size: 290%; font-family:'Helvetica Neue';" : 'font-size: 100%; ';
	var padding = tabris.device.get("platform") === "iOS" ? 'padding: 10px 30px 0px 30px;' : 'padding: 10px 10px 0px 10px;';
	var img = tabris.device.get("platform") === "iOS" ? 'width:100%;' : 'max-width: 100%;';



	var fixedhtml = '<style>body{background:transparent; '+font + padding+'} html{ background: transparent; } img{ ' + img + ' } .pubDate{color:#5A5A5A}</style>';

	var body = tabris.create('WebView', { left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);

	body.set("html", '<html><head>'+fixedhtml+'</head><body><h2>'+ feedItem.title +'</h2><h4 class="pubDate">'+ feedItem.pubDate +'</h4> ' + feedItem.cleanContent + '</body></html>');

	return page;

}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem)
	return p.open();
}

module.exports  = {
	open: open,
	init: init
}
