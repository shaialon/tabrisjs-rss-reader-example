function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: pageTitle, topLevel: false, _feedItem: feedItem });
	addViewAction(page);
	addRssItemWebView(page,feedItem);

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

function htmlStyling(){
	var styles = WebViewInternalCSS();

	return '<style> body {background:transparent; '+styles.font + styles.padding+'} html{ background: transparent; } img{ ' + styles.img + ' } .pubDate{color:#5A5A5A}</style>';
}

var platformStyling = {
	iOS : {
		font:"font-size: 290%; font-family:'Helvetica Neue';",
		padding: 'padding: 10px 30px 0px 30px;',
		img: 'width:100%;'

	},
	Android: {
		font: 'font-size: 100%; ',
		padding: 'padding: 10px 10px 0px 10px;',
		img: 'max-width: 100%;'
	}
};



function WebViewInternalCSS() {
	return platformStyling[tabris.device.get("platform")];
}



function buildHtml(feedItem){
	return '<html><head>'+htmlStyling()+'</head><body><h2>'+ feedItem.title +'</h2><h4 class="pubDate">'+ feedItem.pubDate +'</h4> ' + feedItem.cleanContent + '</body></html>';
}

function addRssItemWebView(page, feedItem){
	var rssItemWebView = tabris.create('WebView', { left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
	rssItemWebView.set("html", buildHtml(feedItem) );
	page.set('_rssItemWebView', rssItemWebView);
}


function addViewAction(page){
	var openLinkAction = tabris.create("Action", {
		id: "openLink",
		placementPriority: "high",
		image: {src: "images/refresh.png", scale: 3}
	}).on("select", function() {
		page.get('_rssItemWebView').dispose();
		tabris.create('WebView', { url: page.get('_feedItem').link, left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
	});
	page.on("disappear", function(){
		openLinkAction.dispose();
	});
}
