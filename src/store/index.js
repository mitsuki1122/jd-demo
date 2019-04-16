import Vue from 'vue'
import Vuex from 'vuex'
import cms from './cms'
import shop from './shop'
import member from './member'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cms,
        shop,
        member
    }
})

export default store