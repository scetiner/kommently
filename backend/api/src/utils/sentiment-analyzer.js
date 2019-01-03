const log = require('./log-helper').getLogger('utils-sentiment-analyzer');
var Sentiment = require('sentiment');
module.exports = class SentimentAnalyzer {
    constructor() {
        this._logger = log;
        this.analyzer = new Sentiment();
    }

    analyze(text) {
        var self = this;
        try {
            return this.analyzer.analyze(text).comparative;
        } catch (err) {
            self._logger.error('Something went wrong during sentiment analysis', err);
            return 0;
        }
    }
};