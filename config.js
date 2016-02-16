// Tabris.js RSS Reader
// Feb 10, 2016
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990

var config = {

    appName: 'Tabris.js RSS Reader Example', // You probably will use the app name in many places so is a good practice to set it in the config file
    theme: 'normal', // Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.
    /******************************************
    * Here, are some common technology RSS feeds, with their respective:
    *
    *  name             - The title of the tab
    *  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
    *  feed             - The url of the feed. If it is in XML use the rss2json function.
    *  contentSanitizer - a custom function that can modify the html of the feed to remove all kind of bloat (ads, trackers, and ugly sharing buttons)
    *  imageResolver    - each feed has a certain placement for the images or the ability to load lightweight images with a certain parameter (see TechCrunch or FayerWayer)
    *
    *************************************/
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
