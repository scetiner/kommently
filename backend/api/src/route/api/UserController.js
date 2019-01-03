const BaseRoute = require('../infra/base/BaseRoute');
const log = require('./../../utils/log-helper').getLogger('controller-user');
const { ErrorTypes } = require('../infra/middlewares/ErrorMiddleware');
const UserService = require('../../service/UserService');
const { SystemMessages } = require('../../statics/default_types');

module.exports = class UserController {
    constructor() {
        this._logger = log;
        this._userService = new UserService();
    }

    async getUser(req, res) {
        var self = this;
        try {
            let email = req.query.email;
            const user = await self._userService.getUser(email);
            return BaseRoute.success(res, { user });
        } catch (err) {
            self._logger.error('Something went wrong while getting user', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async saveUser(req, res) {
        var self = this;
        try {
            let user = req.body.user;
            const result = await self._userService.saveUser(user);
            return BaseRoute.success(res, { result });
        } catch (err) {
            self._logger.error('Something went wrong while saving user', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }
};