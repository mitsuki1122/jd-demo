import {getCategoryList} from '@/service/getData';
import { getCategoryCont, addtoCart } from '../service/getData';
import {getcartList} from '@/service/getData';


const shop = {
    state: {
        categoryData: null,
        cartProductData: [],
        localCartData: [],
        notPay: null
    },
    getters: {
        categoryData: state => state.categoryData,
    //    cartProductData: state => state.cartProductData,
        totalPrice: (state) => {
            let totalPrice = 0;
            if(state.cartProductData) {
                state.cartProductData.forEach(item => { 
                    totalPrice += item.price * item.quantity    
                })
            }
            return totalPrice;
        }
    
    },
    mutations: {
        SET_CATEGORY_DATA(state, categoryData) {
            state.categoryData = categoryData
        },
        SET_CARTPRODUCT_DATA(state, cartProductData) {
            state.cartProductData = cartProductData
        },
        SET_LOCAL_DATA(state, localCartData) {
            state.localCartData =  localCartData
        },
        Get_LOCAL_DATA(state) {
            let tempList = JSON.parse(window.sessionStorage.getItem("cart"));
            state.cartProductData = tempList;
        },
        ADD_CARTPRODUCT_DATA(state, {product, isLogin}) {
            if(isLogin) {
                state.cartProductData.push(product)

            }
        //    else state.localCartData.push(product)
        },
        INCREMENT_ITEM_QUANTITY(state, product) {

        //    let cartItem = state.cartProductData.find(item => item.skuid === skuid.replace(/\,/g,""));
            product.quantity++;
    
          
        },
        DECREMENT_ITEM_QUANTITY(state, {skuid}) {
            let cartItem = state.cartProductData.find(item => item.skuid === skuid);
            if(cartItem.quantity>1) cartItem.quantity--;
            if(cartItem.counter>1) cartItem.counter--;
        },

        
        
    },

    actions: {
        UploadCartData({commit, state}, product) {
            return new Promise((resolve, reject) => {
            //    let localcartData = window.sessionStorage.getItem('cart')
                if(product) {
                    addtoCart(product).then(response => {
                        resolve(response)
                    }, err => {
                        reject(err)
                    })
                }
                else {
                    addtoCart(JSON.parse(state.cartProductData)).then(response => {
                        resolve(response)
                    }, err => {
                        reject(err)
                    })
                }
                
            })
        },
        GetCategoryList({commit, state}) {
            return new Promise((resolve, reject) => {
                getCategoryList().then(response => {
                    resolve(response)
                }, err => {
                    reject(err)
                })
            })
        },
        GetCategoryCont({commit, state}, param) {
            console.log(param)
            return new Promise((resolve, reject) => {
                getCategoryCont(param).then(response => {
                    resolve(response)
                }, err => {
                    reject(err)
                })
            })
        },

        // get cart
        GetCartList({commit, state}){
            return new Promise((resolve, reject) => {
                getcartList().then(response => {
                    commit('SET_CARTPRODUCT_DATA', response.data.returnData);
                    resolve(response)
                }, err => {
                    reject(err)
                })
            })
        },

        // add to cart
        addToCart({commit, state}, param) {
            return new Promise((resolve, reject) => {
                addtoCart(param).then(response => {
                    console.log(response)
                    resolve(response)
                }, err => {
                    reject(err)
                })
            })
        },
        

        // add a product                                                                                                                                                                          
        increaseItem({state, commit}, {product, isLogin}) {
            
            if(isLogin)
            {   
                if(!state.cartProductData) commit('SET_CARTPRODUCT_DATA', product)
                else {
                    console.log("product",state.cartProductData)
                    let cartItem = state.cartProductData.find(item => {
                        if(item.skuid === product.skuid.replace(/\,/g,"") || item.skuid === product.skuid)
                        return item;
                    });
                    console.log("cartitem", cartItem);
                    if (!cartItem) {
                    //    state.cartProductData.push() 是否状态改变都由minutation改变？不能直接在methods里写？
                        commit('ADD_CARTPRODUCT_DATA', {product:product, isLogin:isLogin});
                        
                    }
                    else {
                        commit('INCREMENT_ITEM_QUANTITY', cartItem);
                        
                    }
                }
            }
        /*    else {
                if(!state.cartProductDat) commit('SET_LOCAL_DATA', product)
                else {
                let cartItem = state.localCartData.find(item => item.skuid === product.skuid);
                if (!cartItem) {
                
                    commit('ADD_CARTPRODUCT_DATA', {skuid: product.skuid});
                    
                }
                else {
                    commit('INCREMENT_ITEM_QUANTITY', cartItem);
                }
            }
            }
            */
        },

        // reduce a product
        decreaseItem({state, commit}, product) {
            
            let cartItem = state.cartProductData.find(item => item.skuid === product.skuid);
            if (cartItem) {
                commit('DECREMENT_ITEM_QUANTITY', cartItem);
            }
        },

        

        
    }

}

export default shop
