import userService from '../../api/user-api'

// initial state
const state = {
    email: null,
    id:null,
    gId:null,
    avatar:"",
    userName:"",
    likes:[],
    comments:[],
    isRegistered:true
}

// getters
const getters = {
    userName: state => {
        return state.userName;
    },
    userId: state => {
        return state.id
    },
    googleId: state => {
        return state.gId
    },
    avatar: state => {
        return state.avatar
    },
    registrationStatus: state => {
        return state.isRegistered;
    }
}

// actions
const actions = {
    async getUser({ commit }, email) {
        let result = await userService.getUser(email);
        commit('setUserInfo', result);
    },
    async createUser({ commit,dispatch }, user) {
        let result = await userService.createUser(user.id,user.email);    
        if(result == false){
            commit('setUserInfo', false);
        }    
        dispatch('getUser', user.email);
    }
}

// mutations
const mutations = {
    setUserInfo(state, result) {
        if(result){
            state.isRegistered = true;
            state.id = result._id;
            state.gId = result.g_id;
            state.userName = result.username;
            state.email = result.email;
            state.avatar = result.avatar;
            state.likes = result.likes;
            state.comments = result.comments;
        } else {
            state.isRegistered = false;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}