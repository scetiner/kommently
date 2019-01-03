const CommentRepository = require('../data/repository/CommentRepository');
const log = require('./../utils/log-helper').getLogger('services-comment');
const axios = require('axios');
const moment = require('moment');
const ACCESS_KEY = "my access key";

module.exports = class CommentService {
    constructor() {
        this._commentRepository = new CommentRepository();
        this._logger = log;
    }

    async getDailyTrend(page_id) {
        var self = this;
        let now = moment(moment.now()).format('YYYY-MM-DD');
        let days = {};
        for (let index = 0; index < 365; index++) {
            let str = moment(now).subtract(index,"day").format('YYYY-MM-DD');
            days[moment(str).valueOf()]=0;
        }
        var result =  await self._commentRepository.getDailyTrend(page_id);
        if(result){
            for (let index = 0; index < result.length; index++) {
                const d = result[index];
                days[moment(d._id.day).valueOf()] = d.count
            }
            return days;
        }
        return days;
    }

    async getComments(page_id,index,size) {
        var self = this;
        return await self._commentRepository.getComments(page_id,index,size);
    }

    async getUserCommentOnPage(page_id, user_id) {
        var self = this;
        return await self._commentRepository.getUserCommentOnPage(page_id,user_id);
    }

    async saveComment(comment) {
        var self = this;

        try {
            let location = await axios.get(`http://api.ipstack.com/${comment.ip}?access_key=${ACCESS_KEY}&format=1`);
            if(location){
                let data = location.data;
                if (data && location.status === 200) {
                    comment.country_code = data.country_code;
                    comment.country_name = data.country_name;
                    comment.city = data.city;
                }
            }
            
            let result = await self._commentRepository.saveComment(comment);        
            if(result){
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Save comment failed", error);
            return false;
        }     
    }
};