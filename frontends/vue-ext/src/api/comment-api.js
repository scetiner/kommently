import { URLS } from '../utils/statics';
import { HTTP } from '../utils/call-service';

export default {    
    async getComments(page_id,index,size) {
        try {            
            let resp = await HTTP.get(URLS.API.KOMMENTLY.comment.get,{
                params:{
                    id:page_id,
                    index,
                    size
                }
            }); 
            if(resp && resp.status && resp.result){
                return resp.result.comments;
            }
            return [];
        } catch (e) {                        
            console.error(e);
            return [];
        }
    },
    async createComment(page_id,user_id,body,user_score) {
        try {            
            let resp = await HTTP.post(URLS.API.KOMMENTLY.comment.create,{
                comment:{
                    page_id:page_id,
                    user_id:user_id,
                    body: body,
                    user_score:user_score
                }
            }); 
            if(resp && resp.status){
                return resp.result;
            }
            return false;
        } catch (e) {                        
            console.error(e);
            return false;
        }
    },
    async getUserComment(page_id,user_id) {
        try {            
            let resp = await HTTP.get(URLS.API.KOMMENTLY.comment.user,{
                params:{
                    page_id:page_id,
                    user_id:user_id
                }
            }); 
            if(resp && resp.status && resp.result){
                return resp.result.comment;
            }
            return [];
        } catch (e) {                        
            console.error(e);
            return [];
        }
    },
    async getCommentTrend(page_id) {
        try {            
            let resp = await HTTP.get(URLS.API.KOMMENTLY.comment.trend,{
                params:{
                    id:page_id
                }
            }); 
            if(resp && resp.status && resp.result){
                return resp.result.trend;
            }
            return [];
        } catch (e) {                        
            console.error(e);
            return [];
        }
    }
}