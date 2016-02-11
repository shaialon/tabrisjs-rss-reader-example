// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

var config = {

    appName: 'Tabris.js RSS Reader Example', // You probably will use the app name in many places so is a good practice to set it in the config file
    securitySalt: 'myxssrtabrix123', // You can add an extra security layer to LocalStorage by adding a security salt to the keys
    modules: 'details,news', // The filenames in the mod/ folder without the .js
    defaultModule: 'news',
    theme: 'normal', // Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.
    libs: 'page', // Libraries included in the lib/ folder we need in the app

    // For this particular app i added a news Sources setting so you can easily play with sources and check how fast is creating an app with Tabris
    channels: [
        {
            name: 'TechRadar',
            color: '#2F6E91',
            feed: rss('http://www.techradar.com/rss')
            // imageResolver Just falls back with the image to extracting from the content.
        },
        {
            name: 'TechCrunch',
            color: '#0A9E01',
            feed: rss('http://feeds.feedburner.com/Techcrunch'),
            imageResolver: function(feedItem){
                if(feedItem.enclosure && feedItem.enclosure.link){
                    // TODO: device width!
                    return feedItem.enclosure.link + '?w=410' //request a custom size of img. Supported only on techcrunch
                }
                return './images/notfound.png';
            }
        },
        {
            name: 'Fayerwayer',
            color: '#333',
            feed: rss('http://feeds.feedburner.com/fayerwayer'),
            imageResolver: function(feedItem){
                if(feedItem.enclosure && feedItem.enclosure.link){
                    // TODO: device width!
                    return feedItem.enclosure.link.replace('https://', 'http://').replace('.jpg', '-320x210.jpg')
                }
                return './images/notfound.png';
            }
        }
    ]
}


function rss(feedUrl){
    return 'http://rss2json.com/api.json?rss_url='+encodeURIComponent(feedUrl);
}

exports.config = config;
