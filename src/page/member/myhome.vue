<template>
    <div style="background: #f8f8f8">
        <div class="header">
            <div class="setting">
                <i class="my-setting" @click=""></i>
                <i class="msg-icon"></i>
            </div>
            <div class="userinfo">
                <img src="../../assets/images/seckill5.jpg">
                <span class="username">jd_XXXXX</span>
            </div>
        </div>
        
        <div class="my-order">
            <div class="title">
                <strong>我的订单</strong>
                <div>
                    <span @click="$router.push('/orderlist')">查看全部订单</span>
                    <i></i>
                </div>
            </div>
            <div class="order-items">
                <div class="order-item">
                    <i>
                        <span id="numtag" v-if="!orderListSwitch.length">{{orderListSwitch.length}}</span>
                    </i>
                    <img src="../../assets/images/paymenticon.png">
                    <span>待付款</span>
                </div>
                <div class="order-item">
                    <img src="../../assets/images/received.png">
                    <span>待发货</span>
                </div>
                <div class="order-item">
                    <img src="../../assets/images/evaluated.png">
                    <span>待收货</span>
                </div>
                <div class="order-item">
                    <img src="../../assets/images/evaluated.png">
                    <span>待评价</span>
                </div>
                <div class="order-item">
                    <img src="../../assets/images/Aftermarket.png">
                    <span>退换/售后</span>
                </div>
            </div>
        </div>

        <div class="my-favour">
            <div class="favour-item">
                <strong>0</strong>
                <span>收藏夹</span>
            </div>
            <div class="favour-item">
                <strong>0</strong>
                <span>关注店铺</span>
            </div>
            <div class="favour-item">
                <strong>0</strong>
                <span>足迹</span>
            </div>
            <div class="favour-item">
                <strong>0</strong>
                <span>红包卡券</span>
            </div>
        </div>

        <div class="recommend">
            <img src="../../assets/images/tuijian.png">
        </div>
        <footerView/>
    </div>
</template>

<script>
import footerView from '@/components/footerView';
import {getOrderList} from '@/service/getData.js';
export default {
    data () {
        return {
            orderListSwitch: [],
            orderList: []
        }
    },
    components: {
        footerView
    },
    methods: {
        async onRefresh() {
            new Promise((resolve, reject) => {
                getOrderList().then(res => {
                    this.orderList = res.data.returnData;
                    this.orderListSwitch = this.orderList.filter(item => item.orderinfo.payStatus == 0);
                    resolve()
                }, err=> {
                    reject(err)
                })
            })
        },
    },
    created: function() {
        this.onRefresh()
    }
}
</script>

<style lang="scss" scoped>
.header {
    height: 8rem;
    background: crimson;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .setting {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .msg-icon {
            display: block;
            background: url(../../assets/images/searchIcon.png) no-repeat;
            width: 2rem;
            height: 2rem;
            background-size: 600%;
            background-position: -4rem 0;
            margin: 1rem;
            
        }
        .my-setting {
            display: block;
            background: url(../../assets/images/Settings.png) no-repeat;
            width: 2rem;
            height: 2rem;
            background-size: 100%;
            margin: 1rem;

            
        }
        
    }
    .userinfo {
        display: flex;
        justify-content: flex-start;
        color: #eee;
        img {
            border: 1px solid hsla(0, 0, 100%, .4);
            border-radius:  60px;
            width: 60px;
            height: 60px;
            box-shadow: 0 2px 10px rgba(0,0,0, .15);
            margin-left: 1.5rem;
        }
        span {
            line-height: 60px;
            margin: 0 1.5rem;
        }
        
    }

}
.my-order {
    background: #fff;
    border-radius: 10px; 
    height: 10rem;
    width: 92%;
    margin: 2rem auto;
    
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3.5rem;
        border-bottom: 1px solid #eee;
        padding: 0 1rem;
        strong {
            font-size: 1.5rem;
        }
        span {
            color: #999;
        }
        i {
           display: inline-block;
            background: url(../../assets/images/arrow-right.png) no-repeat;
            width: 1rem;
            height: 1rem;
            background-size: 100%; 
        }
    }
    .order-items{
        display:flex;
//    flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 6.5rem;;
    .order-item {
    //    width: 3rem;
    //    height: 3rm;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        img {
            width: 2.5rem;
            height: 2.5rem;
            position: relative;
        }
        #numtag {
                position: absolute;
                display: inline-block;
            //    width: 1.5rem;
            //    height: 1.2rem;
                border-radius: 5px;
                background: red;
                color: #eee;
                top: 0;
            //    right: 0;
                left: 100%;
                font-weight: 500;
                margin-left: -1rem;
                padding: 0 .3rem;
                font-style: normal;

            }  
    }
    }
    
}
.my-favour {
    height: 5rem;
    background: #fff;
    border-radius: 10px;
    width: 92%;
    margin: 0 auto 2rem;
    display:flex;
    justify-content: space-around;
    align-items: center;
    .favour-item {
        display: flex;
        flex-direction: column;
    }
}

.recommend {
    height: 4rem;
    widows: 100%;
    img {
        height: 100%;
        width: 80%;
    }
}

</style>

