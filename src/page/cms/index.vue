<template>
    <div id="jd">
        <!--搜索栏-->
    <!--    <mt-search v-model="value"></mt-search>-->
        <search-bar/>
        <mt-swipe :auto="5000" class="banner">
            <mt-swipe-item v-for="(item, index) in res" :key="index">
                <img :src="item.image_url" :alt="item.name">
            </mt-swipe-item>
    
        </mt-swipe>
    
    <!--    <mt-swipe :auto="5000" class="banner">
            <mt-swipe-item v-for="(item, index) in testda" :key="index">
                <img :src="item.url">
            </mt-swipe-item>

        </mt-swipe>
    -->    
        <div class="appTabscenter">
            <mt-swipe :auto="0">
                <mt-swipe-item>
                    <ul class="tableTabs">
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (1).png" alt="">
                            </i>
                            <p>京东超市</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (2).png" alt="">
                            </i>
                            <p>京东服饰</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (3).png" alt="">
                            </i>
                            <p>京东到家</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (4).png" alt="">
                            </i>
                            <p>京东生鲜</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (5).png" alt="">
                            </i>
                            <p>京东超市</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (6).png" alt="">
                            </i>
                            <p>充值缴费</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (7).png" alt="">
                            </i>
                            <p>全球购</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (8).png" alt="">
                            </i>
                            <p>领券</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (9).png" alt="">
                            </i>
                            <p>领京豆</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (10).png" alt="">
                            </i>
                            <p>赚钱</p>
                        </li>
                    </ul>
                </mt-swipe-item>
                <mt-swipe-item>
                    <ul class="tableTabs">
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (1).png" alt="">
                            </i>
                            <p>京东超市</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (2).png" alt="">
                            </i>
                            <p>京东服饰</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (3).png" alt="">
                            </i>
                            <p>京东到家</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (4).png" alt="">
                            </i>
                            <p>京东生鲜</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (5).png" alt="">
                            </i>
                            <p>京东超市</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (6).png" alt="">
                            </i>
                            <p>充值缴费</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (7).png" alt="">
                            </i>
                            <p>全球购</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (8).png" alt="">
                            </i>
                            <p>领券</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (9).png" alt="">
                            </i>
                            <p>领京豆</p>
                        </li>
                        <li class="table-tabs-item">
                            <i>
                                <img src="../../assets/images/applist (10).png" alt="">
                            </i>
                            <p>赚钱</p>
                        </li>
                    </ul>
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <!-- jd express news -->
        <div class="express-news">
            <img class="express-news-icon" src="../../assets/images/jd-news-tit.png">
        
            <div class="swiper-container swiper1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><span class="first">推荐</span>机油发动机在六个月不换，会有啥啦啦啦啦啦啊啊</div>
                    <div class="swiper-slide"><span class="first">最新</span>三大运营商舍弃华为，将百亿巨额订单拉爱爱爱</div>
                    <div class="swiper-slide"><span class="first">热门</span>骁龙855还没上，麒麟960又杀到了啦啊啊啊啊</div>
                    <div class="swiper-slide"><span class="first">HOT</span>麒麟新机980稳了，水滴屏+256G，售买喵喵</div>
                </div>
            </div>
            <span>更多</span>
        </div>

        <!-- new customer activity -->
        <div class="new-customer">
            <div class="container-bg">
                <img src="../../assets/images/floor1.jpg">
            </div>
            <div class="activity-list">
                <div class="left_item">
                    <img src="../../assets/images/floor (1).jpg">
                </div>
                <div class="right_item">
                    <img src="../../assets/images/floor (2).jpg">
                    <img src="../../assets/images/floor (3).jpg">
                </div>
            </div>
        </div>

        <!-- secondkill -->
        <div class="sec-kill">
            <div class="seckill-title">
                <div class="first-part">
                    <span>京东秒杀</span>
                    <span>20点场</span>
                    <div class="seckill-time">
                        <span class="seckill-time-item">01</span>
                        <span>:</span>
                        <span class="seckill-time-item">38</span>
                        <span>:</span>
                        <span class="seckill-time-item">29</span>
                    </div>
                </div>
                <div class="seckill-more">
                    <span>更多秒杀</span>
                    <img src="../../assets/images/arrow_rt.png">
                </div>
            </div>
            <div class="seckill-content">
                <div class="swiper-container swiper2">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="$router.push('/product')"><img src="/static/images/iphone1.jpg">
                            <div class="price" >
                                <span>￥</span><span>6299.0</span>
                                <div class="chi"><span>￥</span>8999.0</div>
                            </div>
                        </div>
                        <div class="swiper-slide"><img src="../../assets/images/seckill1.jpg">
                            <div class="price">
                                <span>￥</span><span>2219.5</span>
                                <div class="chi"><span >￥</span>2549.8</div>
                            </div>
                        </div>
                        <div class="swiper-slide"><img src="../../assets/images/seckill2.jpg">
                            <div class="price">
                                <span>￥</span><span>19.5</span>
                                <div><span class="chi">￥</span><span>49.8</span></div>
                            </div>
                        </div>
                        <div class="swiper-slide"><img src="../../assets/images/seckill3.jpg">
                            <div class="price">
                                    <span>￥</span><span>1119.5</span>
                                    <div class="chi"><span class="chi">￥</span><span>1549.8</span></div>
                            </div>
                        </div>
                        <div class="swiper-slide"><img src="../../assets/images/seckill4.jpg">
                            <div class="price">
                                <span>￥</span><span>1119.5</span>
                                <div class="chi"><span>￥</span><span>2149.8</span></div>
                            </div>
                        </div>
                        <div class="swiper-slide"><img src="../../assets/images/seckill5.jpg">
                            <div class="price">
                                <span>￥</span><span>119.5</span>
                                <div><span class="chi">￥</span><span class="chi">249.8</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- lovelife -->
        <!-- ??从后台返回图片地址+flex布局，如何实现?? -->
        <div class="lovelife">
            <div class="lovelife-title">
                <img src="../../assets/images/lovelife.jpg">
            </div>
            <div class="lovelife-container">
                <div class="lovelife-content">
                    <div class="lovelife-content-t">
                        <p>玩3C</p>
                        <p>解锁圣诞</p>
                    </div>
                    <div class="lovelife-content-imgs">
                        <img src="../../assets/images/lovelife1.jpg">
                        <img src="../../assets/images/lovelife2.jpg">
                    </div>
                    <span></span>
                </div>
                
                <div class="lovelife-content">
                    <div class="lovelife-content-t">
                        <p>京东家电</p>
                        <p>加点狂欢 京彩有你</p>
                    </div>
                    <div class="lovelife-content-imgs">
                        <img src="../../assets/images/lovelife3.jpg">
                        <img src="../../assets/images/lovelife4.jpg">
                    </div>
                    
                </div>
                <div class="lovelife-content">
                    <div class="lovelife-content-t">
                        <p>京东超市</p>
                        <p>超市大放假 抢超值好货</p>
                    </div>
                    <div class="lovelife-content-imgs">
                        <img src="../../assets/images/lovelife5.jpg">
                        <img src="../../assets/images/lovelife6.jpg">
                    </div>
                    <span></span>
                </div>
                <div class="lovelife-content">
                    <div class="lovelife-content-t">
                        <p>爱家</p>
                        <p>居家日用 部分满199减100</p>
                    </div>
                    <div class="lovelife-content-imgs">
                        <img src="../../assets/images/lovelife7.jpg">
                        <img src="../../assets/images/lovelife8.jpg">
                    </div>
                </div>
                <div class="lovelife-content-bottom">
                    <div class="lovelife-content ">
                        <div class="lovelife-content-t">
                            <p>家有萌宝</p>
                            <p>低至5折</p>
                        </div>
                        <img src="../../assets/images/lovelife9.jpg">
                        <span></span>
                    </div>
                    <div class="lovelife-content ">
                        <div class="lovelife-content-t">
                            <p>个护馆</p>
                            <p>9.9元拼购</p>
                        </div>
                        <img src="../../assets/images/lovelife10.jpg">
                        <span></span>
                    </div>

                    <div class="lovelife-content ">   
                        <div class="lovelife-content-t">
                            <p>爱吃</p>
                            <p>9.9包邮</p>
                        </div>
                        <img src="../../assets/images/lovelife11.jpg">
                        <span></span>
                    </div>

                    <div class="lovelife-content ">
                        <div class="lovelife-content-t">
                            <p>时尚衣橱</p>
                            <p>做百变女神</p>
                        </div>
                        <img src="../../assets/images/lovelife12.jpg">
                    </div>
                </div>
            </div>
        </div>
        <!-- loadmore -->
        <!--
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper" style="height: auto" ref="wrapper">
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                             :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="item in  list" class="page-loadmore-item">
                            {{item}}
                        </li>
                    </ul>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !== 'loading'" :class="{'is-rotate': bottomStatus === 'drop'}">↑</span>
                        <span v-show="bottomStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                        </span>
                    </div>
                </mt-loadmore>
            </div>
        </div>
        -->

        <!-- recommend -->
        <div class="page-recommend">
        <div class="recommend-container">
            <div class="recommend-title">
                <div class="title-wrapper">
                    <img src="../../assets/images/recommend.png">
                    为您推荐
                </div>
            </div>

        <!--    <div class="page-loadmore-wrapper" style="height: auto" ref="wrapper">-->
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                             :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="recommend-products">
                    <li class="recommend-item" v-for="(item, index) in recommendData" :key="index">
                        <img v-lazy="item.image_url">
                        <p class="item-product-name">{{item.name}}</p>
                        <p class="item-product-info">
                            <span>&yen;</span>{{item.price}}
                        </p>
                        <span>找相似</span>
                    </li>
                </ul>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{'is-rotate': bottomStatus === 'drop'}">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                <!--    <div v-if="allLoaded === true" class="all-loaded">
                        <span>没有更多商品...</span>
                    </div> -->
                </div>
                <div v-if="allLoaded === true" class="all-loaded">
                        <span style="font-size:20px">没有更多商品...</span>
                    </div>
            </mt-loadmore>
    
        </div>
        </div>
        <footerView/>
    </div>
</template>

<script>
import SearchBar from '../shop/searchBar';
import footerView from '../../components/footerView';
import {getIndexCmsData} from '../../service/getData';
import {mapGetters} from 'vuex';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
export default {
    data () {
        return {
            value: '',
            //cmsData: [],
            res: [],
            testda: [
                {url: require('../../assets/images/banner1.png')},
                {url: require('../../assets/images/banner2.png')}
            ],
            list: [],
            allLoaded: false,
            bottomStatus: '',
            wrapperHeight: 0,
            recommendData: [],
            curPage: 1,

        }
    },
    components: {
        SearchBar,
        footerView,
    },
    computed: {
        ...mapGetters(['indexCmsData'])
    },
    
    /*created () {
        this.$store.dispatch('GetIndexCmsData', {pageIndex: 1})
        console.log(this.cmsData);
    },
    */
    mounted () {
        this.getData();
        this.getPic(1);
        var mySwiper1 = new Swiper('.swiper1', {
            autoplay: true,
            loop: true,
            direction: 'vertical',
            height: 20,
        /*    pagination: {
                el: '.swiper-pagination'
            }
        */
        });
        var mySwiper2 = new Swiper('.swiper2', {
            slidesPerView: 'auto',
            freeMode: true,
            freeModeMomentum: false,
        });
       // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        getData () {
            this.$axios.get('productsku').then((res) => { //暂时用此接口，未分离
                this.res = res.data.cmsBanner;
            

            /* 调用本地图片 */
            //    this.recommendData = res.data.recommendProduct;
                
            }).catch((err) => {
                console.log(err)
            });
        },
        getPic (pageIndex) {
            this.$axios.get('banner', {
                params: {page: pageIndex, size: 6}
                }).then((res) => {
             
                this.recommendData.push( ...res.data.returnData2); 
            //    this.recommendData = res.data.returnData;
                console.log(res.data.returnData2);
                
            }).catch((err) => {
                console.log(err)
            });
        },

        handleBottomChange(status) {
            this.bottomStatus = status;
        },

        loadBottom () {
            setTimeout( () => {
            /*    let lastValue = this.list[this.list.length -1];
                if (lastValue < 40) {
                    for(let i=1; i<=10; i++) {
                        this.list.push(lastValue + i);
                    }
                } else {
                    this.allLoaded = true;
                }
                console.log(this.$refs.loadmore);
                this.$refs.loadmore.onBottomLoaded();
            */
           if(this.curPage<3)
           { 
                this.curPage++;
                this.getPic(this.curPage);
                console.log(this.curPage);
           } 
           else {
               this.allLoaded = true;
               console.log(this.curPage);
               console.log(this.allLoaded);
           }
           this.$refs.loadmore.onBottomLoaded();   
            }, 1500)
        },

    },

    created () {
        for (let i = 1; i<= 10; i++) {
            this.list.push(i);
        }
    },
}
</script>

<style lang="scss" scoped>
// @import '../../assets/common/init.scss';
#jd{
  margin-top:50px;
}
.banner {
    height: 10.88rem;
    img {
        min-width: 100%;
        max-width: 100%;
        max-height: 100%;
    }

}
.appTabscenter {
    border-radius: .5rem .5rem 0 0;
    background: #f8f8f8;
    width: 100%;
    height: 150px;
    padding-bottom: .25rem;
    /*mt-swipe {
        height: 3.39rem;
    }
    */
    .tableTabs {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
        flex-wrap: wrap; 
        justify-content: space-around;
        .table-tabs-item {
            flex: 1;
            width: 20%;
            min-width: 20%; /*添加解决不换行问题*/
            max-width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                color: #666666;
                font-size: .5rem;
            }
            img {
                width: 29px;
                height: 29px;
            }
        }
    }


}
.express-news {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 1.5rem;
    margin: 1rem 1rem;
    img {
        height: 90%;
    }
    .swiper-container {
        height: 100%;
        overflow: hidden;
     
        .swiper-slide {
                width: 20rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

            .first{
                color:crimson;
                margin-right: .5rem;
                
            }
        }
    }
    >span {
            text-align: right;
            &:before {
                content: '';
                width: .1rem;
                height: 100%;
                border-right: 1px solid #ececec;
                margin-right: .5rem;
            }
        } 
}

.new-customer {
    position: relative;
    width: 100%;
    overflow: hidden;
    .container-bg {
        width: 100%;
        height: auto;
        img {
            width: 100%
        }
    }
    .activity-list {
        position: absolute;
        padding: 0 1rem;
        top: 3.5rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-items: space-between;
     //   align-items: center;
        /* 对图片的容器进行flex显示，不对img */
        /* 此为正确写法，已经对下面的写法进行了更正 *、
        >div {
            width: 50%;
        }
        img {
            width: 100%;
            height: auto;
        }*/
        .left_item {
           width: 50%;
         //  align-self: stretch;
            img {
        //        align-self: stretch;
                width: 100%;
               height: 100%;
            }
        }
        .right_item {
        //    align-self: stretch;
            width: 50%;
            display: flex;
            flex: initial;
            flex-direction: column;
            flex-wrap: wrap;
            justify-items: space-between;
            img {
                height: 50%;
                width: 100%
            }
           
        }
    }

}

.sec-kill {
 //   display: flex;
 //   flex-direction: row;
 //   flex-wrap: wrap;
 //   align-content: space-between;
  //  height: 1.5rem;
   // width: 100%;
    margin: .8rem 1rem;
    .seckill-title {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        //  justify-content: space-between;
        width: 100%;
        .first-part {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            width: 100%;
            >span:nth-child(1) {
                font-size: 1.6rem;
                font-weight: bold;
                color: crimson;
                white-space: nowrap;
            }
            >span:nth-child(2) {
                font-size: 1rem;
                font-weight: bold;
                white-space: nowrap;
                margin: 0 .5rem;
            }

            .seckill-time {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                .seckill-time-item {
                    border: .1rem solid silver;
                    height: 1.3rem;
                    font-size: .5rem;
                }
            }
        }
        .seckill-more {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            color: crimson;
            font-size: .5rem;
            white-space: nowrap;
            img {
                height: 1rem;
                width: 1rem;
                margin-left: .1rem;
            }
        }
    }
    .seckill-content {
        overflow: hidden;
        .swiper-container {
            width: 100%;
            .swiper-slide {
                width:auto;
                img {
                    width: 80px;
                //    height: 75px;
                }
                .price {
                    >span {
                        color:crimson;
                        font-size: 1.5rem;
                        font-weight: bold;
                        &:nth-child(1) {
                            font-size: 1rem;
                        }
                    }
                    >div {
                       /* .chi {
                            text-decoration: line-through;
                        }*/
                        span:nth-child(1) {
                        //    text-decoration: none;
                            font-size: 1rem;
                        }
                    /*    text-decoration: line-through;
                        span:nth-child(1) {
                            text-decoration: none;
                            font-size: .5rem;
                        }
                    }
                    */
                    
                    }
                }
            }  
        }
    }
}
.chi {
        text-decoration: line-through;
    }

.lovelife {
    background-color: #faf6f6;

    .lovelife-title {
    //    background-image: url('../../assets/images/lovelife.jpg')
       width: 100%;   
        img {
            height: 3.2rem;
            width: 100%;
        }
    }
        
    .lovelife-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #fff;
        
        
        .lovelife-content {
            overflow: hidden;
            width: 50%;
            position: relative;
        //    padding: .5rem;
        //    display: flex;
        //    flex-wrap: nowrap;  
            border-bottom: .2rem solid  #faf6f6;
            .lovelife-content-imgs {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-around;
                flex: 1;
                //   height: 90px;
                img {
                    width: 45%;
                    height: 45%;
                    padding-bottom: 1rem;
                }
            }
            span {
            position: absolute;
            height: 100%;
            width: .2rem;
            top: 0;
            right: 0;
            background:  #faf6f6;
            z-index: 99;
        }
        }
        .lovelife-content-bottom {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
            img {
                width: 80%;
            }
            span {
            position: absolute;
            height: 95%;
            width: .2rem;
            top: 0;
            right: 0;
            background:  #faf6f6;
            z-index: 99;
        }

        }
        
    }
    .lovelife-content-t {
        //    width: 100%;
        //    margin: .5rem;
            padding: .5rem;
            p:nth-child(1) {
                font-size: 1.6rem;
                text-align: left;
                margin-left: 1rem;
            }
            p:nth-child(2) {
                color: crimson;
                 text-align: left;
                 margin-left: 1rem;
            }
        }
    
}

/*.page-loadmore {
    margin-top: 40px;
    overflow: scroll;
    .page-loadmore-list {
        .page-loadmore-item {
            height: 50px;
            line-height: 50px;
            border-bottom: solid 1px #eee;
            text-align: center;
        }
    }
    .mint-loadmore-bottom {
        span.is-rotate {
            transform: rotate(180deg);
        }
        span {
            display: inline-block;
            transition: .2s linear;
            vertical-align: middle;
        }
        .mint-spinner {
            display: inline-block;
            vertical-align:  middle;
        }
    }
}*/

.recommend-container {
    overflow: scroll;
    background: #f0f2f5;
    padding-bottom: 5rem;
    .recommend-title {
       height: 3.2rem;
        
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center; 
        vertical-align: middle;
        position: relative;
        .title-wrapper {
            margin: .3rem 0;
            font-size: 2rem;
            color: #999;
            
            img {
                widows: 15px;
                height: 15px;
            }

            &:before {
                content: '';
                width:35%;
                height: .1rem;
                background: #ccc;
                position: absolute;
                top: 50%;
                left: 0;
            }
            &:after {
            content: '';
            width:35%;
            height: .1rem;
            background: #ccc;
            position: absolute;
            top: 50%;
            right: 0;
            }   
        }    
    }
    .recommend-products {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            .recommend-item {
                background: #fff;
                width: 49.2%;
                margin-bottom: .5rem;
                img{
                    width: 100%;
                    height: 180px;
                }
            }
            
    }
    .mint-loadmore-bottom {
        span.is-rotate {
            transform: rotate(180deg);
        }
        span {
            display: inline-block;
            transition: .2s linear;
            vertical-align: middle;
        }
        .all-loaded {
            height: 50px;
           span { 
            display: block;
            background-color: chocolate; 

            font-size: 2rem;
           }
        }
    }
    
}


</style>
