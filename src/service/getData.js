import axios from 'axios'
var qs = require('qs')
//cms
export const getIndexCmsData = (params) => {
    return axios.get('/api/indexdata', {params: params})
}

export const getCategoryList = () => {
    return axios.get('productsku')
}

export const getCategoryCont = (params) => {
    return axios.get('category', {params: params})
}

//cart //getSelectedProductList
export const getcartList = () => {
    return axios.get('getcartlist')
}

export  const addtoCart = (params) => {//qs.stringify({params: params})
    return axios.post('cartlist', qs.stringify(params))
}

//order
export const getOrderList = () => {
    return axios.get('getorderlist')
}

export const postOrderList = (params) => {
    return axios.post('postorderlist', qs.stringify(params))
}


