<template>
    <div style="background: #fff; height: 100%">
        <!-- 顶部tab栏 -->
        <div class="cart-header">
                <div class="goback" @click="$router.go(-1)">
                    <i></i>
                </div>
                
                <div class="cart-title">确认订单</div>
                
                <div class="other">
                    <i></i>
                </div>
        </div>
        <div class="default-address">
            <div class="addricon">
                <i></i>
            </div>
            <div>
                <div class="contact">
                    <span>收货人：哟西</span> <strong>15601586129</strong>
                </div>
                <div class="address">
                    收货地址：北京北京市海淀区中关村南四街中关村软件园1号楼
                </div>
            </div>
            <div class="forward" @click="$router.push({path: '/addresslist'})">
                <i></i>
            </div>
        </div>
        <div style="background: #eee; height: 1.5rem; width: 100%"></div>
        <div class="cart-products">
            <div class="cart-store" v-for="(item, index) in buyNow.products" :key="index">
                <div class="pd-images">
                    <img :src="item.img_url">
                </div>
        
                <div class="pd-info">
                    <p>{{item.name}} ({{item.version}}) {{item.color}} {{item.storage}} {{item.version}} {{item.method}}</p>
                    <div class="pd-price">
                        <div class="left">
                            <span>&yen;<strong>{{item.price}}</strong>.00</span>
                        </div>
                        <div class="right">
                            <span>X {{item.quantity}}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        <div class="cart-calcu">
            <div class="price-info">
                <div class="calculate">
                    <div class="total-price">
                        <p>总计：<em>&yen;{{buyNow.totalfee}}</em></p>
                        <p>总额{{buyNow.totalfee}} 立减&yen;0.00</p>
                    </div>
                </div>
            </div>
            <div class="calcu-btn" @click="submitOrder(buyNow)">
                提交订单({{selectedItems.length||1}}件)
            </div>
        </div>

        <mt-popup v-model="popupEnable" position="bottom" class="popup-window" >
            <div class="popup-container">
                <div class="header">
                    <i></i>
                    <span>请输入支付密码</span>
                </div>
                <div class="main">
                    <span>订单付款</span>
                    <span>6900.00</span>
                </div>
                <div class="bottom">
                    <div class="psw">
                        <input style="password" name="password" v-model="password"> 
                        <i></i>
                    </div>
                    <mt-button type="primary" class="btn" @click="pay">
                        确认支付</mt-button>
                </div> 
            </div>
        </mt-popup>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import  {Indicator, Toast} from 'mint-ui';
var qs = require('qs');
export default {
    data () {
        return {
            totalPrices: 0,
            selectedItems: [],
            selectAll: false,
            buyNow: {
                products: [],
                totalfee: null
            },
            popupEnable: false,
            password: '',
            orderid: null,
            orderDetail: null
        }
    },

    computed: {
        ...mapState({
            cartList: state => state.shop.cartProductData,
        }),
        ...mapGetters({
            totalPrice: 'totalPrice',
            isLogin: 'isLogin'   
        }),
    
    },

    methods: {
        async initData() {
        //    let res = await this.$store.dispatch('GetSelectedProductList');
        //    this.cartList = res.data.returnData
        },
    
        
        ...mapActions(['UploadCartData']),

        checked(item) {
        /*    let temItem = {checked: true};
            temItem = Object.assign(temItem, item);
            this.selectedItems.push(temItem);
        */
            if(item.checked === undefined)
            {
                this.$set(item, 'checked', true);
            }
            else{
                item.checked = !item.checked;
            } 
            if(!item.checked) this.selectAll = false;    
        },

        selectedAllItems() {
            this.selectAll = !this.selectAll;
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
        submitOrder(order) {
            this.$axios.post('postorderlist', qs.stringify(order, {arrayFormat: 'indices'})).then(res => {
                this.orderid = res.data.returnData
                if(this.orderid) {
                    this.popupEnable = true;
                    this.orderDetail = {
                        products: order.products,
                        totalfee: order.totalfee,
                        orderid: this.orderid
                    }
            //    console.log(this.orderDetail)
                }
            })   
        },

        pay() {
            this.popupEnable = false,
            Indicator.open();
            this.$axios.post('orderpayment', qs.stringify({
                password: this.password,
                orderid: this.orderid
            })).then(res => {
                if(res.data.returnData == 'ok')
                {
                    Indicator.close();
                    Toast({
                        message: "支付成功",
                        position: "middle",
                        duration: "1000"
                    })
                    this.$router.push({path: '/orderdetail', query: this.orderDetail})
                }
                else {
                    Indicator.close();
                    Toast({
                        message: "密码错误",
                        position: "middle",
                        duration: "2000"
                    })

                }
            })
        }
        
    },
    created: function () {
        const item = this.$route.query
        console.log(item)
        if(item) {
            this.buyNow.products = [...item.product];
            this.buyNow.totalfee = item.totalfee;
        }
        else {
            this.$store.commit('Get_LOCAL_DATA');
        
        }
    },
    mounted: function () {
    //    this.initData()

    /**
     * test local cart
     */
//    this.$store.commit('Get_LOCAL_DATA');
//    console.log(this.cartList);
    }
}
</script>

<style lang="scss" scoped>
.cart-header{
    
    width: calc(100% - 2rem); // the blank needed pre&after -
//    width: 100%; overrange
    position: relative;
    top: 0;
    
    height: 3.5rem;
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

.default-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 9rem;
    background: #fff;
    border-bottom: .1rem solid #eee;
    background: url('../../assets/images/addressbg.png') repeat-x bottom;
    .addricon i {
        display: block;
        width: 2rem;
        height: 2rem;
        background: url(../../assets/images/position1.png) no-repeat;
        background-size: 100%;
        margin: 1.5rem;
    }
    
    .contact {
        font-size: 1.8rem;
        color:#111;
        text-align: left;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;
    }
    .address {
        font-size: .6rem;
        color: #555;
        text-align: left;
       
    }
   
    .forward i {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../../assets/images/arrow-right.png) no-repeat;
        background-size: 100%;
        margin: 1.5rem;
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
.popup-window {
    width: 100%;
    height: 65%;
    background: #fff;
//    z-index: 9999;
    .header {
        height: 20%;
        font-size: 2rem;
        font-weight: 800;
        margin: 1.5rem;
    }
    .main {
        height: 30%;
        font-size: 2rem;
        margin: 1.5rem;
    }
    .bottom {
        height: 40%;
        
        .psw {
            margin: 1rem;
            input {
                border: none;
                border-bottom: 1px solid #aaa;
            }
        }
        .btn {
            margin: 1rem;
        }
    }
}
</style>