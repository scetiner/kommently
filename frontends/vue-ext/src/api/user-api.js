import { URLS } from '../utils/statics';
import { HTTP } from '../utils/call-service';
import { isDeepStrictEqual } from 'util';

export default {
    async getUser(email) {
        try {            
            let resp = await HTTP.get(URLS.API.KOMMENTLY.user.get,{
                params:{
                    email
                }
            }); 
            if(resp && resp.status && resp.result){
                return resp.result.user;
            }
            return null;
        } catch (e) {                        
            console.error(e);
            return null;
        }
    },
    async createUser(id, email) {
        try {                        
            let resp = await HTTP.post(URLS.API.KOMMENTLY.user.create,{
                user:{
                    id: id,
                    email: email
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