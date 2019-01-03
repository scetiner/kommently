const request = require('request');
const Page = require('./../model/Page');
const log = require('./../../utils/log-helper').getLogger('route-page-repo');


module.exports = class PageRepository {
    constructor() {
        this._page = new Page();
        this._logger = log;
    }

    async getPageByUrl(url) {
        var self = this;
        try {
            var page = await Page.findOne({ url },{ comments: { $slice: [ 0, 10 ] } });
            return page;
        } catch (error) {
            self._logger.error("Get Page Failed : ", error);
            return null;
        }
    }

    async savePage(page) {
        var self = this;
        try {
            var newPage = new Page({
                url: page.url
            });

            // save page to database
            return await newPage.save();
        } catch (error) {
            self._logger.error("Save Page Failed : ", error);
            return null;
        }
    }

    async updatePageScore(page_id, user_score, sentiment_score) {
        var self = this;
        try {

            let page = await Page.findOne({_id: page_id});
            
            if(page){
                let result = await Page.update({_id: page_id},
                    {
                        $inc: { 
                            c_count: 1,
                            u_score:user_score,
                            s_score:sentiment_score
                        }
                    },
                );
    
                if (result && result.nModified > 0) {
                    return true;
                }
    
                return false;
            }

            return false;
        } catch (error) {
            self._logger.error("Update Page Score Failed : ", error);
            return null;
        }
    }

    async visitPage(url) {
        var self = this;
        try {

            let result = await Page.update(
                {
                    url: url
                },
                {
                    $inc: { 
                        visits: 1
                    }
                },
            );

            if (result && result.nModified > 0) {
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Visit Page Failed : ", error);
            return null;
        }
    }

    async getComments(url,index,size){
        var self = this;
        try {
            var page = await Page.findOne({ url },{ comments: { $slice: [ index * size, size ] } });
            return page.comments;
        } catch (error) {
            self._logger.error("Get Comments of Page Failed : ", error);
            return null;
        }
    }
};
