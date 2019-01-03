const UserRepository = require('../data/repository/UserRepository');
const log = require('./../utils/log-helper').getLogger('services-user');
const axios = require('axios');

module.exports = class UserService {
    constructor() {
        this._userRepository = new UserRepository();
        this._logger = log;
    }

    async getUser(email) {
        var self = this;
        var user = await self._userRepository.getUserByEmail(email);
        return user;
    }

    async saveUser(user) {
        var self = this;

        try {
            let guser = await axios.get(`http://picasaweb.google.com/data/entry/api/user/${user.id}?alt=json`);
            if(guser.status == 200 && guser.data && guser.data.entry){
                user.username = guser.data.entry.gphoto$nickname.$t;
                user.avatar = guser.data.entry.gphoto$thumbnail.$t;
            } else {
                user.username = user.email;
                user.avatar = "";
            }

            let result = await self._userRepository.saveUser(user);        
            if(result){
                return true;
            }

            return false;
        } catch (error) {
            self._logger.error("Save user failed", error);
            return false;
        }     
    }
};