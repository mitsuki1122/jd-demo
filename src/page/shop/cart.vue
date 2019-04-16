<template>
    <div style="background: #fff; height: 100%">
        <!-- 顶部tab栏 -->
        <div class="cart-header">
                <div class="goback" @click="$router.go(-1)">
                    <i></i>
                </div>
                
                <div class="cart-title">购物车</div>
                
                <div class="other">
                    <i></i>
                </div>
        </div>

        <div class="login" v-if='!isLogin'>
            登录后同步账户购物车中的商品
            <div class="login-btn" @click="$router.push({path: '/login', query: {redirect: '/cart'}})">登录</div>
        </div>

        <div class="cart-products">
            <div class="cart-store" v-for="(item, index) in cartList" :key="index">
                <i :class="['default-icon', item.checked ? 'selected' : '']" @click="checked(item, index)"></i>
                <div class="pd-images">
                    <img :src="item.img_url">
                </div>
        
                <div class="pd-info">
                    <p>{{item.name}} {{item.color}} {{item.storage}} {{item.version}} {{item.method}}</p>
                    <div class="pd-price">
                        <div class="left">
                            <span>&yen;<strong>{{item.price}}</strong>.00</span>
                        </div>
                        <div class="right">
                            <div class="decre" @click="decreaseItem(item)"></div>
                            <input type="text" class="num-area" v-model="item.quantity"/> 
                            <div class="incre" @click="$store.commit('INCREMENT_ITEM_QUANTITY',item)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="recommend-part">
            <div class="recomment-header">
                可能你还想要
            </div>
        </div>
        
        <div class="cart-calcu">
            <div class="price-info">
                <div class="selected-all">
                    <i :class="['default-icon', selectAll ? 'selected' : '']" @click="selectedAllItems()"></i>
                    全选
                </div>
                <div class="calculate">
                    <div class="total-price">
                        <p>总计：<em>&yen;{{totalFee.toFixed(2)}}</em></p>
                        <p>总额{{totalFee.toFixed(2)}} 立减&yen;0.00</p>
                    </div>
                </div>
            </div>
            <div class="calcu-btn" @click="BuyProduct(selectedItems)">
                去结算({{selectedItems.length}}件)
            </div>
        </div>

    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {Toast} from 'mint-ui';
export default {
    data () {
        return {
            totalPrices: 0,
            selectedItems: [],
            selectAll: false,
            cartListMerge: [],
            isLogin: false,
            
    
        }
    },

    computed: {
        ...mapState({
            cartList: state => state.shop.cartProductData,
        //    localCartList: state => shop.state.localCartData
        }),
        ...mapGetters({
            totalPrice: 'totalPrice',
        }),
        totalFee: function() {
            let totalFee = 0;
            this.selectedItems.forEach(item => {
                totalFee += item.quantity * item.price
            })
            return totalFee;
        }
        
    
    },

    methods: {
        async initData() {    
        this.isLogin = window.sessionStorage.getItem('Flag')
        if(this.isLogin) { 
            this.cartListMerge = this.cartList;
            console.log('cartlist',this.cartList)
        }
        else this.cartListMerge = this.localCartList
        },
    
        
        ...mapActions(['increaseItem','decreaseItem']),

        checked(item) {
        /*    let temItem = {checked: true};
            temItem = Object.assign(temItem, item);
            this.selectedItems.push(temItem);
        */
            
            
            if(item.checked === undefined)
            {
                this.$set(item, 'checked', true);
                this.selectedItems.push(item);
                if(this.cartList.length == 1) this.selectAll = true;
            }
            else{
                item.checked = !item.checked;
                if(!item.checked) {
                //    let target = this.selectedItems.find(i => i.skuid == item.skuid);
                    this.selectAll = false;
                }
            }
            
            this.updateSelectedItems(); 
            if (this.selectedItems.length == this.cartList.length)
                this.selectAll = true; 
        },

        updateSelectedItems() {
        
            this.selectedItems = this.cartList.filter(
                item => item.checked)
                    
            console.log(this.selectedItems)
    
        },

        selectedAllItems() {
            this.selectAll = !this.selectAll;
            if(!this.selectAll) this.selectedItems = [];
            else this.selectedItems = this.cartList;
            this.cartList.map(item => {
                if(item.checked === undefined)
                {
                    this.$set(item, 'checked', true);
                }
                if(this.selectAll) {
                    item.checked = true;
                }                   
                else {
                    item.checked = false;
                }
            })
        },

        BuyProduct(product) {
            console.log("product",product);
            if(!product.length) {
               Toast({
                    position: 'middle',
                    message: '请选择商品'
                })
            }
            else {
                this.$router.push({path: '/createorder', 
                query: {
                    product: product,
                    totalfee: this.totalFee
                    }
                })
            }
        },
    },
    created: function () {
    //   if(window.sessionStorage.getItem('Flag'))
    //        this.$store.dispatch('GetCartList');

    },
    mounted: function () {
    
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.cart-header{
    
    width: calc(100% - 2rem); // the blank needed pre&after -
//    width: 100%; overrange
    position: relative;
    top: 0;
    
    height: 4rem;
    background: #fff;
    border-bottom: .1rem solid #eee;
    display: flex;
//    flex: 1;
    
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .goback {
        i {
            display: block;
            width: 2rem;
            height: 2rem;
            background: url(../../assets/images/arrow-left.png) no-repeat;
            background-size: 100%;

        }
    }
    
    .cart-title {
        font-size: 1.8rem;

    }
        
    .other {
        i {
            display: block;
            width: 2rem;
            height: 2rem;
            background: url(../../assets/images/menu.png) no-repeat;
            background-size: 100%;
        //    margin-right: 1rem;

        }
    }
        
}

.login {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background: #fff;
    border-bottom: .1rem solid #eee;
//    margin-top: 3.5rem;
    .login-btn {
        background: crimson;
        width: 5rem;
        height: 2.5rem;
        border-radius: 4px;
        color: #fff;
        margin-left: .5rem;
        line-height: 2.5rem;
    }
}

.recommend-part {
    height: 3.5rem;
    line-height: 3.5rem;
    background: #eee;
    margin-bottom: 4rem;
}
.cart-calcu {
    height: 4rem;
    display: flex;
//    justify-content: space-around;
//    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: .1rem solid #eee;
    .price-info {
        flex: .6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: rgba(#fff, 0.6);
    //    opacity: .5; the words will inherit the opacity
        
        .selected-all {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 3.5rem;
            height: 3.5rem;
        }
        .calculate {
            flex: 1;
        .total-price {
            p:first-child {
                font-size: 1.5rem;
                font-weight: bold;
                em {
                    color: crimson;
                    font-style: normal;
                }
            }
            p:last-child {
            //    font-size: .5rem;
            }
        }
        }
    }
    .calcu-btn {
        flex: .4;
        background: crimson;
        color: #fff;
        line-height: 4rem;
        font-size: 1.8rem
    }
}

.cart-products {
    .cart-store {

        display: flex;
        align-items: center;
        padding:  1rem;
        border-bottom: .1rem solid #eee;
       
        

        .pd-images {
            flex: .3;
            img {
                width: 6rem; 
                height: 6rem;
            }
        }

        .pd-info {
            flex: 1;
            p {
                text-align: left;
                font-size: 1.5rem;
            }
            .pd-price {
                display: flex;
                justify-content: space-between;
                .left {
                    span {
                        color: crimson;
                        font-size: 1rem;
                    }
                    strong {
                        font-size: 1.5rem;
                    }
                }
                .right {
                    display: flex;
                    
                    width:6rem;
                    height: 1.8rem;
                    border: .1rem solid #eee;
                    border-radius: 2px;
                    .decre {
                        width: 30%;
                    //    height: .6rem;
                        position: relative;
                        &:before {
                            content: '';
                            position: absolute;
                            right: 0;
                            top: 0;
                            background: #eee;
                            height: 100%;
                            width: 1px;
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            left: calc(30%);
                            top: 50%;
                            background: #999;
                            height: 1px;
                            width: 40%;
                        }

                    }
                    .incre {
                        width: 30%;
                        position: relative;
                        line-height: 1.8rem;
                        &:before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            background: #eee;
                            height: 100%;
                            width: 1px;
                        }
                        &:after {
                            content: '+';
                        //    position: absolute;
                        //    left: calc(30%);
                        //    top: 50%;

                            
                            
                        }
                    }
                    .num-area {
                        border: none;
                        outline: none;
                        width: 40%;
                        text-align: center;
                    }
                }
                


            }
        }

    }

}
.default-icon {
            display: block;
            width: 1.8rem;
            height: 1.8rem;
            background: url(../../assets/images/check0.png) no-repeat 0 0;
            background-size: 100%;

        }
        .selected {
            display: block;
            width: 1.8rem;
            height: 1.8rem;
            background: url(../../assets/images/check1.png) no-repeat 0 0;
            background-size: 100%;
        }
</style>


