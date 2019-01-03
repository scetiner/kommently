const request = require('request');
const User = require('./../model/User');
const log = require('./../../utils/log-helper').getLogger('route-user-repo');


module.exports =  class UserRepository {
    constructor() {
        this._user = new User();
        this._logger = log;
    }
    
    async getUserByEmail(email) {        
        var self = this;
        try{
            var user = await User.findOne({ email });
            return user;
        } catch (error) {
            self._logger.error("Get User Failed : ", error);
            return null;
        }        
    }

    async saveUser(user) {        
        var self = this;
        try{            
            var newUser = new User({
                email: user.email,
                username:user.username,
                g_id: user.id,
                avatar: user.avatar,
            });

            // save user to database
            return await newUser.save();
        } catch (error) {
            if(error.code && error.code == 11000){
                self._logger.warn("Duplicate user creation tried", user.email);    
                return true;
            } else{
                self._logger.error("Save User Failed : ", error);
                return null;
            }            
        }        
    }
};
