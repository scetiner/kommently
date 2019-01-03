import { URLS } from '../utils/statics';
import { HTTP } from '../utils/call-service';

export default {
    async getPage(url) {
        try {            
            let resp = await HTTP.get(URLS.API.KOMMENTLY.page.get,{
                params:{
                    url: url
                }
            }); 
            if(resp && resp.status && resp.result){
                return resp.result.page;
            }
            return [];
        } catch (e) {                        
            console.error(e);
            return [];
        }
    },
    async createPage(url) {
        try {            
            let resp = await HTTP.post(URLS.API.KOMMENTLY.page.create,{
                page:{
                    url:url
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
    async visitPage(url) {
        try {            
            let resp = await HTTP.post(URLS.API.KOMMENTLY.page.visit,{
                page:{
                    url:url
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
    }
}