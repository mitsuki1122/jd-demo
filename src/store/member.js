const member = {
    state: {
        isLogin: false
    },
    getters: {
        isLogin: state => state.isLogin
    },
    mutations: {
        userStatus(state, flag) {
            state.isLogin = flag
        }
    },
    actions: {
        setUserStatus({commit}, flag) {
            commit('userStatus', flag)
        }
    }
}

export default member