const log = require('./log-helper').getLogger('utils-badwords-analyzer');
var Filter = require('bad-words');

module.exports = class BadWordsAnalyzer {
    constructor() {
        this._logger = log;
        this.analyzer = new Filter();
    }

    analyze(text) {
        var self = this;
        try {
            let cleaned = this.analyzer.clean(text);
            return text === cleaned;
        } catch (err) {
            self._logger.error('Something went wrong during bad word analysis', err);
            return false;
        }
    }
};