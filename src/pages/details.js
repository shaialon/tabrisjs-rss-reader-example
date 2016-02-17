var WebViewInternalCSS = require('./../styles/general').WebViewInternalCSS;

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

/*************************
 * Add an action to the nav bar
 **************************/

function addViewAction(page){
	var openLinkAction = tabris.create("Action", {
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

/*************************
 * Add the webview with the feed content.
 **************************/

function addRssItemWebView(page, feedItem){
	var rssItemWebView = tabris.create('WebView', { left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
	rssItemWebView.set("html", rssItemWebViewHTML(feedItem) );
	page.set('_rssItemWebView', rssItemWebView);
}

function rssItemWebViewHTML(feedItem){
	return [
		'<html>',
		'<head>'+ WebViewInternalCSS() +'</head>',
		'<body>',
		'<h2>'+ feedItem.title +'</h2>',
		'<h4 class="pubDate">'+ feedItem.pubDate +'</h4>',
		feedItem.cleanContent,
		'</body>',
		'</html>'
	].join('');
}


