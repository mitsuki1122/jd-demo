<template>
    <div style="background: #fff; height: 100%">
        <!-- 顶部tab栏 -->
        <div class="cart-header">
                <div class="goback" @click="$router.push({path:'/'})">
                    <i></i>
                </div>
                
                <div class="cart-title">订单详情</div>
                
                <div class="other">
                    <i></i>
                </div>
        </div>
        <div class="cart-products">
            <div class="orderid"> <!--orderList[0].orderNum 报错 -->
                订单号：{{orderid}}
            </div>
            <div class="cart-store" v-for="(item, index) in orderList.products" :key="index">
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
            <div class="total-fee">
                <span>订单总价{{orderList.totalfee}}元</span>
                <span>实付款{{orderList.totalfee}}元</span>
                <div @click="$router.push('/comment')" class="comment"><span>去评价</span></div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderList: {
                products: [],
                totalfee: null
            },
            popupEnable: false,
            password: '',
            orderid: ''
        }
    },
    methods: {
       
    },
    created: function() {
        let queryValue = this.$route.query;
        this.orderList.products = [...queryValue.products];
        this.orderList.totalfee = queryValue.totalfee;
        this.orderid = this.$route.query.orderid.orderNum;
        console.log(this.orderList);
    },
    mounted: function() {
    
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
    .orderid {
        height: 2rem;
    
        font-size: 1.5rem;
        text-align: left;
        margin: 1rem;
    }
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
    .total-fee {
        position: relative;
        height: 2rem;
        font-size: 1.6rem;
        text-align: right;
        margin: 1.5rem;
        .comment {
            margin-top: .5rem;
            position: absolute;
            right: 0;
            padding: .3rem .8rem;
            border: 2px solid sandybrown;
            font-size: 1.5rem;
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
    width: 75%;
    height: 200px;
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


