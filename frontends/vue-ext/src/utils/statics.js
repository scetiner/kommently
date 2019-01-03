import { BASE } from "../config/index";
var conf = require('../config/index.js');
export const URLS = {   
    'BASE': getBase(), 
    'AUTH': BASE.AUTH,
    'API': {
        'KOMMENTLY': {
            'user':{
                'create': getBase() + '/user',
                'get': getBase() + '/user',
            },
            'page': {
                'create': getBase() + '/page',
                'get': getBase() + '/page',
                'visit': getBase() + '/page/visit'
            },
            'comment': {
                'create': getBase() + '/comment',
                'get': getBase() + '/comment',
                'user': getBase() + '/comment/user',
                'trend': getBase() + '/comment/trend'
            }
        }
    }
};

function getBase(){                
    return BASE.URL + '/api';
}
