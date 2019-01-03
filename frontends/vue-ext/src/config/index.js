'use strict'

const isProd = process.env.NODE_ENV === 'production';
const isStage = process.env.NODE_ENV === 'staging';

var conf = {
    production:{
        host: 'https://restipsum.com/serif/kommently',
        auth: 'Basic use your token'
    },
    development:{
        host: 'http://localhost:9595',
        auth: 'Basic use your token'
    }
};

const envConf = isProd ? conf.production : (isStage ? conf.staging : conf.development);

export const BASE = {
    URL: envConf.host,
    AUTH: envConf.auth
}
