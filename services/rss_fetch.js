var feedHelpers = require('./../helpers/feed_helpers');

function getRssFeedItems(feedConfig){
	return new Promise(function(resolve, reject) {
		fetch( feedConfig.feed ).then(function( res ){
			return res.json();
		}).then(function( res ){
			var itemsProcessed = feedHelpers.sanitizeFeedItems (res.items , feedConfig.contentSanitizer);
			resolve(itemsProcessed);
		});
	});
}

module.exports = {
	getRssFeedItems: getRssFeedItems
};
