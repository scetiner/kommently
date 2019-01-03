const BaseRoute = require('../infra/base/BaseRoute');
const log = require('./../../utils/log-helper').getLogger('controller-comment');
const { ErrorTypes } = require('../infra/middlewares/ErrorMiddleware');
const PageService = require('../../service/PageService');
const CommentService = require('../../service/CommentService');
const { SystemMessages } = require('../../statics/default_types');

module.exports = class CommentController {
    constructor() {
        this._logger = log;
        this._pageService = new PageService();
        this._commentService = new CommentService();
    }

    async getUserCommentOnPage(req, res) {
        var self = this;
        try {
            let page_id = req.query.page_id;
            let user_id = req.query.user_id;
            const comment = await self._commentService.getUserCommentOnPage(page_id, user_id);
            return BaseRoute.success(res, { comment });
        } catch (err) {
            self._logger.error('Something went wrong while checking whether user has comment on a page', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async getDailyTrend(req, res) {
        var self = this;
        try {
            let id = req.query.id;
            const trend = await self._commentService.getDailyTrend(id);
            return BaseRoute.success(res, { trend });
        } catch (err) {
            self._logger.error('Something went wrong while getting daily trend', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async getComments(req, res) {
        var self = this;
        try {
            let id = req.query.id;
            let index = Number(req.query.index);
            let size = Number(req.query.size);
            size = size > 10 ? 10 : size;
            const comments = await self._commentService.getComments(id, index, size);
            return BaseRoute.success(res, { comments });
        } catch (err) {
            self._logger.error('Something went wrong while getting comments', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async saveComment(req, res) {
        var self = this;
        try {
            let comment = req.body.comment;
            comment.ip = req.headers['x-real-ip'] || req.connection.remoteAddress;            
            const cResult = await self._commentService.saveComment(comment);
            let pResult = null;
            if (cResult) {
                pResult = await self._pageService.updatePageScore(comment.page_id, comment.user_score, comment.sentiment_score);
            }

            return BaseRoute.success(res, { result: cResult && pResult });
        } catch (err) {
            self._logger.error('Something went wrong while saving comment', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }
};