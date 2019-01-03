const log = require('../../../utils/log-helper').getLogger('route-validator-base');
const Defaults = require('../../../statics/default_types');
const BaseRoute = require('../base/BaseRoute');
const _ErrorTypes = require('../middlewares/ErrorMiddleware').ErrorTypes;
const MailChecker = require("mailchecker");
const basicAuth = require('basic-auth');

function auth(req,res,next){
    let user = basicAuth(req);
    if (user && 
        user.name === Defaults.API_AUTH_INFO.user && 
        user.pass === Defaults.API_AUTH_INFO.pass
    ) {
        return next();        
    }

    log.error('Invalid AUTH Parameters req', user);
    return BaseRoute.httpError(res, 'Authorization failed', 401, req.getErrorCode(_ErrorTypes.VALIDATION, 1));    
}


function pageRead(req, res, next) {
    if (!req.query || 
        !req.query.url
    ) {
        log.error('Invalid Parameters req query', req.query);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}


function pageCreation(req, res, next) {
    if (!req.body || 
        !req.body.page ||
        !req.body.page.url
    ) {
        const params = req.body ? JSON.stringify(req.body) : 'Empty';
        log.error('Invalid Parameters req body', params);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}


function commentCreation(req, res, next) {
    if (!req.body || 
        !req.body.comment ||
        !req.body.comment.user_id ||
        !req.body.comment.page_id ||        
        !req.body.comment.user_score ||
        isNaN(req.body.comment.user_score) ||
        !req.body.comment.body ||
        !(req.body.comment.body.length > 4 && req.body.comment.body.length < 251)
    ) {
        const params = req.body ? JSON.stringify(req.body) : 'Empty';
        log.error('Invalid Parameters req body', params);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}

function userCreate(req, res, next) {
    if (!req.body || 
        !req.body.user ||
        !req.body.user.email ||
        !req.body.user.id
    ) {
        const params = req.body ? JSON.stringify(req.body) : 'Empty';
        log.error('Invalid Parameters req body', params);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}


function userRead(req, res, next) {
    if (!req.query || 
        !req.query.email
    ) {
        log.error('Invalid Parameters req query', req.query);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}


function commentRead(req, res, next) {
    if (!req.query || 
        !req.query.id ||
        !req.query.index ||
        !req.query.size || 
        isNaN(req.query.index) ||
        isNaN(req.query.size)
    ) {
        log.error('Invalid Parameters req query', req.query);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}

function commentCheck(req, res, next) {
    if (!req.query || 
        !req.query.page_id ||
        !req.query.user_id
    ) {
        log.error('Invalid Parameters req query', req.query);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}

module.exports = {
    auth,
    userCreate,
    userRead,
    pageCreation,
    pageRead,
    commentCreation,
    commentRead,
    commentCheck
};
