const https = require('https');
var NYTActions = require('../actions/NYTActions');
var NYTConstants = require('../constants/NYTConstants');
var delay_load_time = 1000;
module.exports = {
    getNewsData: function(pageIndex) {
        var req_url = NYTConstants.NYT_API_SEARCH + NYTConstants.NYT_API_KEY + NYTConstants.NYT_REQ_PAGE_ATTR + pageIndex;
        return https.get(req_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                if(JSON.parse(data).status != "OK" || !JSON.parse(data).response){
                    return;
                }
                var jsonData = JSON.parse(data).response.docs;
                jsonData.sort(function (a, b) {
                    return  b.multimedia.length - a.multimedia.length;
                });
                NYTActions.receiveNews(jsonData);
                NYTActions.updatePageIndex(pageIndex);
                setTimeout(() => {
                    this.preload_img_next_page(pageIndex+1);    
                }, delay_load_time);
            });
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
    },
    preload_img_next_page:function(pageIndex){
        var req_url = NYTConstants.NYT_API_SEARCH + NYTConstants.NYT_API_KEY + NYTConstants.NYT_REQ_PAGE_ATTR + pageIndex;
        https.get(req_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                if(JSON.parse(data).status != "OK" || !JSON.parse(data).response)
                    return;
                var jsonData = JSON.parse(data).response.docs;
                for(var i in jsonData) {
                    var objNews = jsonData[i];
                    if(objNews.multimedia && objNews.multimedia.length > 0){
                        var img = new Image()
                        img.src = NYTConstants.NYT_RES_DOMAIN + objNews.multimedia[0].url;
                    }
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
};