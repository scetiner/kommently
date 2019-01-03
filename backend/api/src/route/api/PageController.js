const BaseRoute = require('../infra/base/BaseRoute');
const log = require('./../../utils/log-helper').getLogger('controller-page');
const { ErrorTypes } = require('../infra/middlewares/ErrorMiddleware');
const PageService = require('../../service/PageService');
const UserService = require('../../service/UserService');
const { SystemMessages } = require('../../statics/default_types');

module.exports = class PageController {
    constructor() {
        this._logger = log;
        this._pageService = new PageService();
        this._userService = new UserService();
    }

    async getPage(req, res) {
        var self = this;
        try {
            let url = req.query.url;
            const page = await self._pageService.getPage(url);
            return BaseRoute.success(res, { page });
        } catch (err) {
            self._logger.error('Something went wrong while getting page', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async savePage(req, res) {
        var self = this;
        try {
            let page = req.body.page;
            const result = await self._pageService.savePage(page);
            return BaseRoute.success(res, { result });
        } catch (err) {
            self._logger.error('Something went wrong while saving page', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async visitPage(req, res) {
        var self = this;
        try {
            let url = req.body.page.url;
            var pageResult = await self._pageService.visitPage(url);
            if(pageResult == false){
                pageResult = await self._pageService.savePage({url});
            }
            return BaseRoute.success(res, { result : pageResult });
        } catch (err) {
            self._logger.error('Something went wrong while visiting page', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }
};