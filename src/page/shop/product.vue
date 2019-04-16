<template>
    <div style="background: #f8f8f8;" >
        <!-- 顶部tab栏 -->
        <div class="container"  style="height:100vh; overflow-y: scroll" ref="pro_body">
        <div class="product-header">
            <div class="product-header-container">
                <div class="goback" @click="$router.go(-1)">
                    <i></i>
                </div>
                <div class="product-tabs">
                    <span :class="anchor_flag == 1 ? 'cur-item' : ''" @click="goAnchor('#anchor-1')">商品</span>
                    <span :class="anchor_flag == 2 ? 'cur-item' : ''" @click="goAnchor('#anchor-2')">评价</span>
                    <span :class="anchor_flag == 3 ? 'cur-item' : ''" @click="goAnchor('#anchor-3')">详情</span>
                </div>
                <div class="other">
                    <i></i>
                </div>
            </div>
        </div>

        <!-- product content -->
        <div class="product-content" id="anchor-1">
            <mt-tab-container v-model="active" :swipeable="true">
                <mt-tab-container-item id="mainDisplay">
                    <div class="product-swiper">
                        <mt-swipe :auto="0" :continuous="false">
                            <mt-swipe-item v-for="(item, index) in productInfo.productss" :key="index">
                                <img :src="item.image_url" :alt="item.name">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    
                   <div class="product-title">
                       <div class="leftp"> 
                        <i class="ziying">
                            <img src="/static/images/icon.png">
                        </i>{{productInfo.name}}
                       </div>
                       <div class="rightp">
                           <div>
                           <i>
                           </i>
                           </div>
                           <span>关注</span>
                       </div>
                    </div>
                    
                    <div class="product-saleinfo">
                        <p>{{productInfo.saleinfo}}</p>
                    </div>

                    <div class="product-price">
                        <span>&yen;</span><strong>{{productInfo.price}}</strong>
                    </div>
                    
                    <div class="baitiao">
                        <span>白条</span>
                        <div>激活白条新用户得百元礼包(点此激活)</div>
                    </div>

                    <div class="coupon">
                        <span>领券</span>
                        <span>共1张</span>
                    </div>

                    <div class="promote">
                        <span class="title">促销</span>
                        <div class="promote-items">
                            <div class="prom-item">
                                <em>赠品</em>
                                <span> 【免费体验】Apple产品"上手无忧"服务 X1</span>
                            </div>
                            <div class="prom-item">
                                <em>换购</em>
                                <span> 购买1件可优惠换购热销商品</span>
                            </div>
                            <div class="prom-item">
                                <em>满额返券</em>
                                <span> 购买iphone产品满一元返Apple Watch50元优惠券</span>
                            </div>
                        </div>
                    </div>

                    <div class="sku-window" @click="skuVisible=true">
                        
                        <span>已选</span>
                        <span>{{selectedProperty.join()}}</span>

                    </div>
                    <mt-popup v-model="skuVisible" position="bottom" style="width:100%">
                        <div class="sku-page">
                            <div class="sku-header">
                                <img :src="img_url[skuinfo.flag[0]]">
                                <div class="selected-value">
                                    <span id="price">&yen;{{productPrice}}.00</span>
                                    <p><span>已选</span>{{selectedProperty.join()}}</p>
                                </div>
                                <i @click="skuVisible = false"></i>
                            </div>

                            <div class="sku-body">
                                <div class="sele" v-for="(item, index) in skuinfo.property" :key="index">
                                    <p>{{item.name}}</p>
                                    <span v-for="(itemsub, indexsub) in item.kinds" :key="indexsub"
                                    @click="changeSelect(index, indexsub)" :class="{active: indexsub==skuinfo.flag[index]}"
                                >{{itemsub}}</span>
                                </div>
                            </div>
                        
                            <div class="sku-bottom">
                            <!--    <div @click="addProductToCart"><span>加入购物车</span></div> -->
                                <div @click="cartNum++;addProductToCart(selectedItem )"><span>加入购物车</span></div>
                                <div @click="BuyProduct(selectedItem)">立即购买</div>
                            </div>
                       
                        </div>
                    </mt-popup>

                   <div class="comment-summary" id="anchor-2">
                        <div class="comment-header">
                            <div><span>评价</span><span>好评 99%</span></div>  
                            <div class="more-comment">
                                共 999+ 条
                            </div>
                        </div>
                        
                        <div  class="comment-label">
                        
                            <span class="comment-label-item">运行流畅</span>
                            <span class="comment-label-item">漂亮大方</span>
                            <span class="comment-label-item">方便好用</span>
                            
                        </div>

                        <div class="comment-userinfo">
                            <div class="star-area">
                                <div class="starlist">
                                    <i class="star" v-for="i in [1,1,1,1,1]"></i>

                                </div>
                            </div>
                        </div>
                        
                        <div class="comment-content">
                            <p>好用，漂亮</p>
                            <div class="comment-imagelist">
                                <img src="/static/images/comment1.jpg">
                                <img src="/static/images/comment2.jpg">
                                <img src="/static/images/comment3.jpg">
                            </div>
                        </div>
                    </div>

                </mt-tab-container-item>
            <!--
                <mt-tab-container-item id="goodsDetail">
                    22
                </mt-tab-container-item>
                <mt-tab-container-item id="commentList">
                    33
                </mt-tab-container-item>
            -->
            </mt-tab-container>

            <!-- 底部购物车 -->
    <!--        <div class="cart-bootom">
                <div>
                    <div class="contacting-kefu">
                        <i></i>
                        <span>联系客服</span>
                    </div>
                    <div class="entering-shop">
                        <i></i>
                        <span>进店</span>
                    </div>
                    <div class="shopping-cart">
                        <i></i>
                        <span>购物车</span>
                    </div>
                </div>
                <div class="add-to-cart">加入购物车</div>
                <div class="buy-rightnow">立即购买</div>
            </div>
        </div>
       -->

       <div class="product-detail" id="anchor-3">
           <div class="detail-title">
               <span class="title-item" @click="isCur = 1">商品介绍</span>
               <span class="title-item" @click="isCur = 2">规格参数</span>
               <span class="title-item" @click="isCur = 3">售后服务</span>
           </div>
            <div class="content" style="width:100%">
               <div :class="['tab-item', isCur==1 ? 'cur-item' : '']">
                  <img src=""> 
                   <tbody>
                       <tr>
                           <td>
                               <img src="/static/images/detail1.jpg" style="width: 100%">
                           </td>
                       </tr>
                       <tr>
                           <td>
                               <img src="/static/images/detail2.jpg" style="width: 100%">
                           </td>
                       </tr>
                        <tr>
                           <td>
                               <img src="/static/images/detail3.jpg" style="width: 100%">
                           </td>
                       </tr>
                   </tbody>
                   <div class="main-info">
                       <img src="/static/images/detail4.jpg" style="width: 100%">
                   </div>
               </div>
               <div :class="['tab-item', isCur ==2 ? 'cur-item' : '']" id="tab1">
                   <div style="height: 500px">This is the params page.</div>
               </div>
               <div :class="['tab-item', isCur ==3 ? 'cur-item' : '']">
                   <div style="height: 500px">This is the service after buying.</div>
               </div>
           </div>
       </div>
        </div>

        <div class="product-bottom">
            <div class="left">
                <div>
                    <i ></i>
                    <span>联系客服</span>
                </div>
                <div>
                    <i></i>
                    <span>进店</span>
                </div>
                <div>
                    <i>
                        <span id="numtag">{{cartNum}}</span>
                    </i>
                    <span @click="$router.push('/cart')">购物车</span>
                </div>
            </div>
            <div class="right">
                <div @click="cartNum++;addProductToCart(selectedItem)">
                    <span>加入购物车</span>
                </div>
                <div @click="BuyProduct(selectedItem)">
                    <span>立即购买</span>
                </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import {Swipe, SwipeItem, Toast} from 'mint-ui';
import {mapActions} from 'vuex';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

export default {
    data () {
        return {
           active: 'mainDisplay',
           productInfo: {
               productss: [
               {image_url: "/static/images/iphone1.jpg", name:"iphone1"},
               {image_url: "/static/images/iphone2.jpg", name:"iphone1"},
               {image_url: "/static/images/iphone3.jpg", name:"iphone1"}
            ],
            name: "Apple iPhone X (64GB) 深空灰色 移动联通电信4G手机",
            saleinfo: "【Apple新年限时狂欢, iPhoneX券后价6099, 数量有限】疯抢iphone千元券, iPhoneXR低至5999元！",
            price: "6299.00",


           },
           skuVisible: false,
           skuinfo: {
               property: [],
               flag: ['0','0','0','0'],
           },
           defaultflag: '01,10,20,30',//flag can be demoted as this form
           selectedFlag: '',
           selectedProperty: ["深灰色","公开版","64G","官方标配"],
           selectedItem: null,
           img_url: [],
           
           productData: [],
           productPrice: '6299',
           productInventory: '',
           ifLogin: false,
           anchor_flag: 1,
           isCur: 1,
           cartNum: 0,

        }
    },
    computed: {
        currentPosition: function() {
        //    return this.$refs.pro_body.offsetTop;
        }

    },
    watch: {
    //    skuinfo.flag: function() {
     //       this.selectedFlag = this.skuinfo.flag.join()
    //        console.log(this.selectedFlag)
         //   this.$axios.get('http://localhost:8080/static/data.json').then()
    /*    currentPosition: function() {
            var po = this.currentPosition;
            console.log(po)
            if( po > 850 )
                this.anchor_flag = 3;
        }*/

    },
    methods: {
        initData() {
            this.$axios.get('productsku').then((res) => {
                this.skuinfo.property = res.data.skuinfo.property
                this.productData = res.data.skuinfo.params
                this.selectedItem = this.productData[0]
                this.img_url = res.data.skuinfo.img_url

            }).catch((err) => {
                console.log(err)
            })      
        },
        changeSelect(index, indexsub) {
        //    this.skuinfo.flag[index] = indexsub.toString()
            this.$set(this.skuinfo.flag, index, indexsub.toString())

            this.selectedProperty[index] = this.skuinfo.property[index].kinds[indexsub]
            
            this.selectedFlag = this.skuinfo.flag.join()
            
            this.productData.find( (item) => {
                
                if(item.skuid == this.selectedFlag)
                {
                    this.productPrice = item.price;
                    this.selectedItem = item;
                }
                
            })
        },
        classChange(index, indexsub) {
            return indexsub==this.skuinfo.flag[index] ? 'active':''
        },

        ...mapActions(['increaseItem','decreaseItem']),
        
    
        //add to cart
    async   addProductToCart(product) {
            let isLogin = window.sessionStorage.getItem('Flag');
            if(isLogin){
                this.$store.dispatch('increaseItem',{product:product, isLogin:isLogin}).then(response => {
                    this.skuVisible=false;
                    return Toast({
                        message: '已加入购物车',
                        position: 'middle'
                    })
                })
            }
        /*    else {
                    this.$store.dispatch('increaseItem', {product:product, isLogin:isLogin})    
            }
        */
    },
        

        BuyProduct(product) {
                this.$router.push({path: '/createorder', 
                query: {
                    product: [product],
                    totalfee: product.price
                //    detail: `${this.selectedProperty.join()}`
                    }
                })

        },

        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector);
            
            
            this.anchor_flag = selector.slice(selector.length-1);
            console.log(this.anchor_flag)
            
            this.$refs.pro_body.scrollTop = anchor.offsetTop - 30;
        },

        handleScroll() {
            var scroll = this.$refs.pro_body.scrollTop;
            if(scroll>=0 && scroll<800) {
                this.anchor_flag = 1;
            }
            else if(scroll >= 800 && scroll < 1000) {
                this.anchor_flag = 2;
            }
            else {
                this.anchor_flag = 3;
            }
        //    console.log(scroll);
        }
    },
    mounted: function() {
        this.initData();
        
        this.$refs.pro_body.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        
        this.$refs.pro_body.removeEventListener('scroll', this.handleScroll);
       
    }
}
</script>

<style lang="scss" scoped>
.product-header{
    z-index: 999; //不加999会被覆盖，滚动到详情处又恢复
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3.5rem;
    background: #fff;
    border-bottom: .1rem solid #eee;
    .product-header-container {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        height: 100%;
        .goback {
            i {
                display: block;
                width: 2rem;
                height: 2rem;
                background: url(../../assets/images/arrow-left.png) no-repeat;
                background-size: 100%;

            }
        }
        .product-tabs {
            width: 20rem;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;

            span {
                width: 33%;
                color: #333;
                font-size: 1.5rem;  
                flex:1;
            }
            .cur-item {
                color: crimson;
                &:before {
                    content: '';
                    background: url(/static/images/location.png) no-repeat 0 0;
                    width: 1rem;
                    height: 1rem;
                    background-size: 70%;
                    display: inline-block;

                }
            }
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
        
}

.product-content {
    padding-top: 3.5rem;
    
    .product-swiper {
        height: 31rem;
        border-bottom: .1rem solid #eee;
        img {
            height: 100%;
            width: 100%;
        }
       /deep/ .mint-swipe-indicator {
            width: 5px;
            height: 5px;
        //    bottom: 10px;
            opacity: .5;
            &.is-active {
                background: crimson;
            }
        }
    }
}

.product-title {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: .8rem .8rem;
    .leftp {
        font-size: 1.6rem;
        text-align: left;
        width: 80%;
    i {
        display: inline-block;
        margin-right: 1rem;
        width: 2.5rem;
        height: 1.5rem;
        vertical-align: middle;
       // margin-top: -2px;
       img {
           width: 100%;
       }
    }
    }
    .rightp {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
            display: block;
            background: url(../../assets/images/cart_sprits_all.png) no-repeat 0 0;
            width: 1.8rem;
            height: 1.8rem;
            background-size: 500%;
            background-position: -4.6rem 0;
        }

        &::before {
            content: '';
            display: block;
            height: 100%;
            border-left: .1rem solid #ddd;
        //    margin-right: 2rem;
            position: absolute;
            left: -1rem;
            top: 0;

        }   
    }
}

 .product-saleinfo {
    padding: 0 .8rem;
    background: #fff;
    color: crimson;
    text-align: left;
}
.product-price {
    padding: .5rem .8rem;
    background: #fff;
    color: crimson;
    text-align: left;
    font-size: 1.8rem;
    span {
        font-size: 1rem;
    }
}

.sku-window {
    height: 4rem;
    background: #fff;
    padding: 0 2rem 0 3rem;
    position: relative;
    span:first-child {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        color: #aaa;
    }
    span:last-child {
        text-align: left;
        line-height: 4rem;
    }
    
}
.sku-page {
    position: relative;
    height: 350px;
    width: 100%;
    .sku-header {
        height: 70px;
        
        img {
            position: absolute;
            top: -2rem;
            left: 1.5rem;
            width: 6rem;
            height: 6rem;
        }

        i {
            position: absolute;
            right: 0;
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            background: url(../../assets/images/close.png) no-repeat 0 0;
            background-size: 100%;
            margin: .5rem;
        }
        .selected-value {

            position: absolute;
            left: 8rem;
            text-align: left;
            span#price {
                display: block;
                color: crimson;
                font-size: 1.5rem;
                margin: 1rem 0;

            }
            p {
                span {
                    color: #aaa;
                    margin-right: .5rem;
                }
            }
        }
    }
}  

.sku-body {
    overflow-y: scroll;
    padding-bottom: 4rem;
    height: 200px;
    
    text-align: left;
    .sele {
        margin: 1.5rem 0;
        p {
            color: #aaa;
            height: 2rem;
            text-align: left;
            margin: 0 1rem;
        }
        span {
            display: inline-block;
            font-size: 1.5rem;
            padding: 0 1rem;
            background: #eee;
            margin-left: 1rem;
            border-radius: 4px;
            height: 2.5rem;
            line-height: 2.5rem;
        }
        .active {
            background: red;
            color: #fff;
        }
        
    }
}
.sku-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    display: relative;
    
    font-size: 1.5rem;
    color: #fff;
    line-height: 4rem;
    width: 100%;
    
    div:last-child {
        position: absolute;
        left: 50%;
        top: 0;
        float: right;
        background: red;
        width:  50%;
        height: 4rem;
    }
    div:first-child {
        
        background: orange;
        width:  50%;
        height: 4rem;
        
    }
}

.baitiao {
    display: flex;
    background: #fff;
    position: relative;
    
    span {
        flex: .2;
        color: #aaa;
        display: flex;
        align-items: center;
        justify-content: center;
       
    }
    div {
        position: relative;
        flex: 1;
        color: #333;
        padding:  1.5rem 0;
        text-align: left;
    }

   
}

.coupon {
    color: #aaa;
    background: #fff;
    padding: 1.5rem 3rem 1.5rem 1.5rem;
//    height: 3rem;
//    line-height: 3rem;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.promote {
    padding: 1rem 3rem 1rem 5rem;
    color: #aaa;
    background: #fff;
    position: relative;
    .title {
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
    }
    .promote-items {
        text-align: left;
        
        .prom-item {
            margin: .5rem 0;
            display: flex;
            flex-wrap: nowrap;
           
            em {
                color: crimson;
                border: .1rem solid crimson;
                font-style: normal;
                margin-right: .5rem;
                white-space: nowrap;
            }
            span {
                color: #333;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                
            }
        }
    }

}

.baitiao:after, .coupon:after,
.promote:after, .sku-window:after {
    content: '';
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background: url(../../assets/images/menu.png) no-repeat 0 0;
            background-size: 100%;
            position: absolute;
            right: 1rem;
            top: 1.5rem;
}

.baitiao:before, .coupon:before,
.promote:before, .sku-window:before {

        content: '';
        display: block;
        height: 0;
        border-top: .1rem solid #ddd;
        position: absolute;
        left: 2rem;
        top: 0;
        right: 0
}

.product-detail {
    background: #fff;
    .detail-title {
        display: flex;
        height: 4rem;
        justify-content: center;
        align-items: center;
        border-top: .1rem solid #ddd;
        border-bottom: .1rem solid #ddd;
        margin-top: 1rem;
        .title-item {
            flex: 1;
            border-left: .1rem solid #ddd;
            display: inline-block;
            font-size: 1.5rem;
            height: 100%;
            line-height: 4rem;
        }

    }
    .tab-item {
        display: none;
    }
    .cur-item {
        display: block;
    }
}

#tab1 {
    animation: tab1 1s ease;
    
}
@keyframes tab1 {
    from {
        transform: translateX(-200px)
    }
    to {
        transform: translateX(0px)
    }
}

.product-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .left {
        width: 40%;
        display: flex;
        flex-wrap: nowrap;
    //    justify-content: space-between;
        border-top: .1rem solid #ddd;
        background: #fff;
        color: #555;
        div {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            i {
                display: block;
                width: 2rem;
                height: 2rem;
                background: url(../../assets/images/store.png) no-repeat;
                background-size: 100%;
                margin: .2rem .8rem;
                
            } 
            #numtag {
                position: absolute;
                display: inline-block;
            //    width: 1.5rem;
            //    height: 1.2rem;
                border-radius: 5px;
                background: red;
                color: #eee;
                top: .5rem;
            //    right: 0;
                left: 100%;
                font-weight: 500;
                margin-left: -1.8rem;
                padding: 0 .3rem;
                font-style: normal;

            }  
        }
    }
    .right {
        width: 60%;
        display: flex;
    //    flex: 1;
        font-size: 1.5rem;
        font-weight: 200;
        color: #fff;

        div:first-child {
            height: 100%;
            width: 100%;
            background: orange;
            line-height: 5rem;
        }
        div:last-child {
            height: 100%;
            width: 100%;
            background: red;
            line-height: 5rem;
        }
    }
}

.comment-summary{
    margin-top: 1rem;
    background: #fff;
    padding: 0 1rem 1rem;
    
    .comment-header {
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: left;
        border-bottom: .1rem solid #eee;
        position: relative;
        span:first-child {
            font-size: 1.8rem;
            margin-right: 1.5rem;
           
        }
        .more-comment {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 1rem;
        }
    }
    .comment-label {
        display: flex;
        flex-wrap: nowrap;
        .comment-label-item{
            padding: .5rem 1rem;
            background:mistyrose;
            margin: 1rem;
        }
    }
    .star-area {
        display: flex;
        align-items: center;
        .starlist {
            height: 4rem;
            display: flex;
            align-items: center;
            i {
                
                display: inline-block;
                width: 2.5rem;
                height: 2.5rem;
                background-size: 100%;
            }
            .star {
                background: url('../../assets/images/star-h.png') no-repeat;
            }
            .blur {
                background: url('../../assets/images/star-n.png') no-repeat;
            }
            
        }
    }

    .comment-content {
        font-size: 1.6rem;
        text-align: left;
        p {
            margin: 1rem;
        }

    }
}

</style>


