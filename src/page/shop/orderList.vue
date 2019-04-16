<template>
    <div style="background: #f5f5f5; height: 100%">
        <!-- 顶部tab栏 -->
        <div class="cart-header">
                <div class="goback" @click="$router.go(-1)">
                    <i></i>
                </div>
                
                <div class="cart-title">我的订单</div>
                
                <div class="other">
                    <i></i>
                </div>
        </div>
        
        <div class="order-tabs">
            <span @click="active=0; swithTab(0)" :class="{'active':active === 0}">全部</span>
            <span @click="active=1; swithTab(1)" :class="{'active': active === 1}">代付款</span>
            <span @click="active=2; swithTab(2)" :class="{'active': active === 2}">代收货</span>
            <span @click="active=3; swithTab(3)" :class="{'active': active === 3}">待收货</span>
            <span @click="active=4; swithTab(4)" :class="{'active': active === 4}">待评价</span>
            <div id="slidebar" :style="active===0 ? 'left:4%' : active===1? 'left: 23.5%' :
                active===2? 'left:43.5%' : active===3? 'left: 63.5%' : 'left: 83.5%' "> 
            </div>
        </div>
        <div class="order-container">
            <!-- order -->
            <div class="order-list" v-for="(item, index) in orderListSwitch" :key="index">
                <div>
                    <div class="order-header">
                        <div class="left">
                            <div>Apple 官方旗舰店</div>
                            
                        </div>
                        <div class="right">
                            <div class="order-status">
                                <span v-if="item.orderinfo.payStatus === 0 ">等待付款</span>
                            <!--    <span v-if="item.orderinfo.payStatus === 1 ">等待收货</span> -->
                                <span v-if="item.orderinfo.payStatus === 1">交易成功</span>
                            <!--    <span v-if="item.orderinfo.finishStatus === 0">交易关闭</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="order-product-list">
                        <div class="order-product-item" v-for="(pitem, pindex) in item.productList" :key="pindex">
                                <div><img :src="pitem.img_url"></div>
                                <div class="product-info">
                                    <p class="product-name">{{pitem.name}} {{pitem.color}} {{pitem.storage}} {{pitem.version}} {{pitem.method}}</p>
                                    <p class="product-price">
                                        <strong>{{pitem.price * pitem.quantity}}</strong>
                                        <span>X {{pitem.quantity}}</span>
                                    </p>
                                </div>
                        </div>
                    </div>
                    <div class="order-summary">
                        <span>共{{item.productList.length}}件商品</span>
                        <strong>共{{item.orderinfo.totalFee}}元</strong>
                    </div>
                    <div class="order-btn-group">
                        <span class="payment" v-if=" item.orderinfo.payStatus === 0" @click="payment(item)">去支付</span>
                        <span class="payment" v-if="item.orderinfo.payStatus === 1 && item.orderinfo.commentStatus === 0" @click="comment(item)">去评价</span>
                    </div>
                </div>

                <div class="order-list-none" v-if="orderList==''">
                    <img>
                    <p>您还没有相关的订单</p>
                    <p>可以去看看有哪些想买的</p>
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
        </div>
    </div>
</template>

<script>
import {getOrderList, postOrderList} from '@/service/getData.js';
import { Indicator, Toast  } from "mint-ui";
var qs = require('qs');
export default {
    data() {
        return {
            orderNum: null,
            orderList: [],
            orderListSwitch: [],
            popupEnable: false,
            password: null,
            orderid: null,
            active: 0,
            params: {
                pageSize: 10,
                pageIndex: 1,
                cancel_status: null,
                confirm_status: null,
                pay_status: null,
                finish_status: null
            }

        }
    },
    methods: {
    async onRefresh() {
            new Promise((resolve, reject) => {
                getOrderList().then(res => {
                    this.orderList = res.data.returnData;
                    this.orderListSwitch = this.orderList;
                    console.log(this.orderList)
                    resolve()
                }, err=> {
                    reject(err)
                })
            })
        },
        swithTab(index) {
            let _this = this;
            Indicator.open();
            if (index == 0) {
                setTimeout(function(){
                    _this.onRefresh()
                    Indicator.close();
                    }, 1000);
            }
            else if (index == 1) {
                setTimeout(function() {
                    
                    _this.orderListSwitch = _this.orderList.filter(item => item.orderinfo.payStatus == 0)
                    Indicator.close();
                }, 1000)
            }
            else if (index ==2) {
               setTimeout( function(){ _this.orderListSwitch = [];Indicator.close()}, 1000 )
            }
            else if (index ==3) {
               setTimeout( function() { _this.orderListSwitch = [];Indicator.close()}, 1000 )
            }
            else if (index ==4) {
               setTimeout( function() {
                //    _this.orderListSwitch = _this.orderList.filter(item => item.orderinfo.commentStatus == 0);
                    Indicator.close()
                    }, 1000 )
               
            }
            setTimeout(function() {Indicator.close()}, 2500)
        },

        payment(item) {
            this.popupEnable = true;
            console.log(item);
            this.orderid = {orderNum:item.orderinfo.orderNum}
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
                    this.onRefresh();
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
        },
        comment(item) {
            this.$router.push({path:"/comment", query: item.orderinfo.orderNum})

        }

    },
    created: function() {
        
    },
    mounted: function() {
        this.onRefresh()
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
.order-tabs {
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    span {
        flex: 1;
        display: block;
        line-height: 4rem;
        font-size: 1.5rem;
        font-weight: 500;
        
    }
    .active {
       color: red;     
    }
    #slidebar {
        position: absolute;
        transition: .4s;
        width: calc(100%/8);
        bottom: 0;
        height: 1px;
        background: red;
    }
}
.order-container {
    overflow-y: scroll;
    .order-list {
        background: #fff;
        margin: 1rem;
        border-radius: 10px;
        padding: .5rem; 
        .order-header {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            font-size: 1.5rem;
            .order-status {
                color: red;
            }
        }
        .order-product-list {
            
            .order-product-item {
                   
                    display: flex;
                    justify-content: space-between;
                    img {
                    //    flex: 1;
                        width: 6.5rem;
                        height: 6.5rem;
                        margin-right: 1rem;
                    }
                    .product-info {
                         font-size: 1.5rem;
                        .product-name {
                            word-wrap: break-word;
                            word-break: break-all;
                            text-align: left;
                            margin: 1rem 0;
                        }
                        .product-price {
                            display: flex;
                            justify-content: flex-end;
                            strong {
                                color: red;
                            }
                        }
                    

                }
            }
        }
        .order-summary {
            display: flex;
            justify-content: flex-end;
            font-size: 1.5rem;
            margin: 1rem;
            span {
                margin-right: .5rem;
            }
        }
        .order-btn-group {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 1.5rem;
            margin: 1rem;
            .payment {
                width: 6rem;
                height: 2rem;
                line-height: 2rem;
                border: 1px solid #aaa;
                border-radius: 8px;
            }
        }
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
}}
</style>


