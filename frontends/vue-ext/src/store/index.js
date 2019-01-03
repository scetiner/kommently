import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import user from './modules/user'
import page from './modules/page'
import comments from './modules/comments'

Vue.use(Vuex);

export const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        user,
        page,
        comments
    },
    strict: true
})