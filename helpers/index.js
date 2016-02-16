/**
 * Created by shaialon on 16/02/2016.
 */
function sanitizeFeedItems(feedItems, customSanitizer){
	var results = [];
	feedItems.forEach(function(item){
		if(item.title && item.title.length>0){
			item.cleanContent = customSanitizer ? customSanitizer (item.content) : sanitizeHTMLfromFeedBloat(item.content);
			delete item.content;
			results.push(item);
		}
	})
	return results;
}

function sanitizeHTMLfromFeedBloat(html){
	var tmp = html.replace(/<a href="http:\/\/feeds.feedburner.com.*?<\/a>/ig,'') // remove feedburner crap
		.replace(/<img src="http:\/\/feeds.feedburner.com.*?>/ig,'') // remove feedburner crap
		.replace(/<img src="http:\/\/rss.buysellads.*?>/ig,'')// remove speckboy tracking pixels.
		.replace(/<table width="650".*?<\/table>/igm,'')   // ads in table (smashing magazine)

	return tmp;

}

function extractFirstImageFromHtml(html) {
	var m,
		rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\>/g;

	m = rex.exec( html );
	if(m && m[1]) { return m[1]; }
	return null;
}

module.exports = {
	sanitizeFeedItems: sanitizeFeedItems,
	sanitizeHTMLfromFeedBloat: sanitizeHTMLfromFeedBloat,
	extractFirstImageFromHtml: extractFirstImageFromHtml
}
