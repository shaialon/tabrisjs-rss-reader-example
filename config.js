// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

var config = {

    appName: 'Tabris.js RSS Reader Example', // You probably will use the app name in many places so is a good practice to set it in the config file
    securitySalt: 'myxssrtabrix123', // You can add an extra security layer to LocalStorage by adding a security salt to the keys
    modules: 'details,news', // The filenames in the mod/ folder without the .js
    defaultPage: 'news',
    theme: 'normal', // Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.

    // For this particular app i added a news Sources setting so you can easily play with sources and check how fast is creating an app with Tabris
    channels: [
        {   // GOOD
            name: 'LifeHacker',
            color: '#709602',
            feed: rss2json('http://lifehacker.com/rss'),
        },
        {
            name: 'TechRadar',
            color: '#2F6E91',
            feed: rss2json('http://www.techradar.com/rss'),
            contentSanitizer: function(html){
                return html.replace(/<br clear="all".*?alt="">/igm,'');
            }
        },
        {
            name: 'TechCrunch',
            color: '#0A9E01',
            feed: rss2json('http://feeds.feedburner.com/Techcrunch'),
            imageResolver: function(feedItem){
                if(feedItem.enclosure && feedItem.enclosure.link){
                    // TODO: device width!
                    return feedItem.enclosure.link + '?w=410' //request a custom size of img. Supported only on techcrunch
                }
                return './images/notfound.png';
            }
        },

        //{
        //    name: 'Fayerwayer',
        //    color: '#333',
        //    feed: rss2json('http://feeds.feedburner.com/fayerwayer'),
        //    imageResolver: function(feedItem){
        //        if(feedItem.enclosure && feedItem.enclosure.link){
        //            // TODO: device width!
        //            return feedItem.enclosure.link.replace('https://', 'http://').replace('.jpg', '-320x210.jpg')
        //        }
        //        return './images/notfound.png';
        //    }
        //},

        //{   // GOOD
        //    name: 'Gizmodo',
        //    color: '#333',
        //    feed: rss2json('http://gizmodo.com/rss'),
        //},

        //{   // Good (performance issues?)
        //    name: 'SmashingMagazine',
        //    color: '#E53F2C',
        //    feed: rss2json('http://www.smashingmagazine.com/feed'),
        //},
        //
        //{   // no images..
        //    name: 'ScienceDaily',
        //    color: '#004276',
        //    feed: rss2json('http://www.sciencedaily.com/rss/top/technology.xml'),
        //},

        //{   // Needs image in detail
        //    name: 'PCWorld',
        //    color: '#8f0d10',
        //    feed: rss2json('http://www.pcworld.com/index.rss'),
        //},

        //{   // Good (but small)
        //    name: 'SpeckyBoy',
        //    color: '#658DB5',
        //    feed: rss2json('http://speckyboy.com/feed'),
        //},

        //{   // no images..
        //    name: 'Economist',
        //    color: '#8f0d10',
        //    feed: rss2json('http://www.economist.com/topics/computer-technology/index.xml'),
        //},

    ]
}

function rss2json(feedUrl){
    return 'http://rss2json.com/api.json?rss_url='+encodeURIComponent(feedUrl);
}

exports.config = config;
