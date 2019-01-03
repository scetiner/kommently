import commentService from '../../api/comment-api'

// initial state
const state = {
    comments:[],
    userComment:null,
    pagination:null,
    commentTrend:null
}

// getters
const getters = {
    pageComments: state => {
        let cList = state.comments.map(c=>{            
            return {
                body:c.body,
                u_score:c.u_score,
                s_score:c.s_score,
                updated_at: c.updated_at,
                userName: c.user.username,
                avatar: c.user.avatar,
                id:c._id
            }
        });
        return cList;
    },
    commentTrend: state=>{                
        return state.commentTrend || [];
    },
    commentUser: state=>{
        return state.userComment;
    },
    commentPageSize: state=>{
        return state.pagination ? state.pagination.limit : 10;
    },
    commentPageIndex: state=>{
        return state.pagination ? state.pagination.page : 1;
    },
    commentPageCount: state=>{
        return state.pagination ? state.pagination.pages : 1;
    }
}

// actions
const actions = {
    async getComments({ commit }, payload) {                
        let result = await commentService.getComments(payload.page_id,payload.index,payload.size);
        commit('addComments', {
            result:result,
            reset:payload.reset
        });  
    },
    async getUserComment({ commit }, payload) {        
        let result = await commentService.getUserComment(payload.page_id,payload.user_id);        
        commit('setUserComment', result);        
    },
    async getCommentTrend({ commit }, payload) {        
        let result = await commentService.getCommentTrend(payload.page_id);        
        commit('setCommentTrend', result);        
    },
    async createComment({ commit, dispatch }, comment) {
        let result = await commentService.createComment(comment.page_id,comment.user_id,comment.body,comment.user_score);
        if(result){
            // location.reload();
            dispatch('getComments', {
                page_id:comment.page_id,
                index:1,
                size:10,
                reset:true
            });
            dispatch('getPage', comment.page_url);
            dispatch('getUserComment', {
                page_id:comment.page_id,
                user_id:comment.user_id
            });

        } 
    },
}

// mutations
const mutations = {
    addComments(state, comments) {        
        if(comments.result){
            if(comments.reset){
                state.comments = comments.result.docs || [];
            } else {
                state.comments = [...state.comments, ...comments.result.docs];
            }

            state.pagination = {
                "total": comments.result.total,
                "limit": comments.result.limit,
                "page": comments.result.page,
                "pages": comments.result.pages
            };
        } 
    },
    setUserComment(state, comment) {        
        state.userComment = comment || null;
    },
    setCommentTrend(state, trend) {        
        state.commentTrend = trend || null;
    },
    setLoading(state, isLoading){
        state.loading = isLoading;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}