const log = require('../../../utils/log-helper').getLogger('route-middleware-sentiment');
const SentimentAnalyzer = require("../../../utils/sentiment-analyzer");
const BadWordsAnalyzer = require("../../../utils/bad-words-analyzer");
const BaseRoute = require('../base/BaseRoute');
const _ErrorTypes = require('../middlewares/ErrorMiddleware').ErrorTypes;
var sentimentAnalyzer = new SentimentAnalyzer();
var badWordsAnalyzer = new BadWordsAnalyzer();

function sentimentAnalysis(req, res, next) {        
    req.body.comment.sentiment_score = sentimentAnalyzer.analyze(req.body.comment.body);
    return next();
}


function badWordAnalysis(req, res, next) {
    
    if (!badWordsAnalyzer.analyze(req.body.comment.body)) {
        const params = req.body ? JSON.stringify(req.body) : 'Empty';
        log.error('Invalid Parameters req body', params);
        return BaseRoute.httpError(res, 'Please remove bad words...', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }
    return next();
}


module.exports = {
    sentimentAnalysis,
    badWordAnalysis
};
