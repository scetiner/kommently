import pageService from '../../api/page-api'

// initial state
const state = {
    id: null,
    url: null,
    title:"",
    icon:"",
    visits:0,
    c_count:0,
    sentiment_score:0,
    user_score:0
}

// getters
const getters = {
    pageId: state =>{
        return state.id;
    },
    pageTitle: state=>{
        return state.title;
    },
    pageIcon: state=>{
        return state.icon;
    },
    pageUrl: state =>{
        return state.url;
    },
    visitorCount: state => {
        return state.visits;
    },
    commentCount: state => {
        return state.c_count;
    },
    sentimentScore: state => {
        return state.sentiment_score;
    },
    userScore: state => {
        return state.user_score;
    }
}

// actions
const actions = {
    async getPage({ commit }, url) {
        let address = url || this.url;
        let result = await pageService.getPage(address);
        commit('setPageInfo', result);
    },
    async createPage({ dispatch }, url) {
        let result = await pageService.createPage(url);
        if(result){
            dispatch('getPage', url);
        }
    },
    async visitPage({ commit, dispatch }, url) {
        let result = await pageService.visitPage(url);        
        dispatch("getPage",url);
    },
}

// mutations
const mutations = {
    setPageTitle(state,title){
        state.title = title;
    },
    setPageIcon(state,icon){
        state.icon = icon;
    },
    setPageInfo(state, result) {        
        if(result){
            state.id = result._id;
            state.url = result.url;
            state.sentiment_score = result.s_score;
            state.user_score = result.u_score;
            state.visits = result.visits;
            state.c_count = result.c_count;            
        } 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}