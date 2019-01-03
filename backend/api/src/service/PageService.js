const PageRepository = require('../data/repository/PageRepository');
const log = require('./../utils/log-helper').getLogger('services-page');

module.exports = class PageService {
    constructor() {
        this._pageRepository = new PageRepository();
        this._logger = log;
    }

    async getPage(url) {
        var self = this;
        return await self._pageRepository.getPageByUrl(url);
    }

    async savePage(page) {
        var self = this;

        try {
            let result = await self._pageRepository.savePage(page);        
            if(result){
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Save page failed", error);
            return false;
        }     
    }

    async visitPage(url) {
        var self = this;

        try {
            let result = await self._pageRepository.visitPage(url);        
            if(result){
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Visit page failed", error);
            return false;
        }     
    }

    async updatePageScore(page_id,user_score,sentiment_score) {
        var self = this;

        try {
            let result = await self._pageRepository.updatePageScore(page_id,user_score,sentiment_score);        
            if(result){
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Update page failed", error);
            return false;
        }     
    }
};