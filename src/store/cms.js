import {getIndexCmsData} from '../service/getData'

const cms = {
    state: {
        indexCmsData: null, //首页全部资讯数据
    },
    getters: {
        indexCmsData: state => state.cms.indexCmsData
    },
    mutations: {
        set_indexCmsData(state, indexCmsData) {
            state.indexCmsData = indexCmsData
        }
    },
    actions: {
        GetIndexCmsData({commit, state}, paraDate) {
            return new Promise((resolve, reject) => {
                getIndexCmsData(paraDate).then(response => {
                    commit('set_indexCmsData', response);
                    resolve(response);
                }, err => {
                    reject(err)
                })
            })       
        }
    }
}

export default cms
