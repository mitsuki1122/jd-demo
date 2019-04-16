<template>   
    <div  class="category-containner">
        <mt-search style="height: 8vh;width:100%;"></mt-search>
        <div class="category-side" ref="sidelist">
            <ul class="side-list" >
                <li class="side-list-item" v-for="(item, index) in categorySideList" 
                @click="toTop(index)">{{item.name}}</li>
            </ul>    
        </div>

        <!-- dispaly part -->
        <div class="category-content">
            <div class="content-item" v-for="(item1, index1) in categoryContItems" >
                <h4>{{item1.title}}</h4>
                <ul  class="img-area">
                    <li  class="img-item" v-for="(item2, index2) in item1.images">
                        <img :src="item2.image_url">
                        <span>{{item2.name}}</span>
                    </li>
                </ul>
                
            </div>
        </div>

        
        <footerView/>
       
    </div>
</template>

<script>
import footerView from '../../components/footerView';
import {
    mapGetters,
    mapMutations
} from 'vuex';
export default {
    data () {
        return {
            categorySideList: [],
            categoryContItems: [],
            a: [1],
            b: [{url: "../../static/images/category1.png",name: "xiaomi"},
            {url: "../../static/images/category1.png",name: "xiaomi"},
            {url: "../../static/images/category1.png",name: "xiaomi"},
            {url: "../../static/images/category1.png",name: "xiaomi"},
            {url: "../../static/images/category1.png",name: "xiaomi"}
            ],
        }
    },
    components: {
        footerView,
    },
    methods: {
        ...mapMutations(['SET_CATEGORY_DATA']),
        async initData() {
            let res = await this.$store.dispatch('GetCategoryList');
            this.SET_CATEGORY_DATA(res);
            this.categorySideList = res.data.categoryList;

            let ress = await this.$store.dispatch('GetCategoryCont', {index: 0});
            this.categoryContItems = ress.data.returnData.categoryCont
            

        },
        async toTop(index) {
            var ele = document.getElementsByClassName("side-list-item")[0];
            var dis = ele.offsetHeight * index;
            this.$refs.sidelist.scrollTop = dis;

            let ress = await this.$store.dispatch('GetCategoryCont', {index: index});
            this.categoryContItems = ress.data.returnData.categoryCont
        }

    },
    mounted: function() {
        this.initData();
    }
    

}
</script>

<style lang="scss" scoped>
.category-containner{
    position: relative;
    height: 100%;
.category-side {
  //  height: 600px;
 //   position: relative;
 //   height: 500px;
    height: 85vh;
    width: 25%;
    overflow-y: scroll;
 //   overflow-y: scroll;
 //   padding-bottom: 50px;
    .side-list {
        
        background: #eee;
        padding-right:  1px;
     //   position: relative;
        li {
            height: 4.5rem;
            font-size: 1.5rem;
            line-height: 4.5rem;
            border-bottom: 1px solid #ccc;
            &:last-child {
                border-bottom: none;
            }    
        }   
    }
}
.category-content {
     width: 75%; 
     position: absolute; 
     top: 8vh; 
     left: 25%;

    .content-item {
        padding: .5rem;
        h4 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: .5rem;
            text-align: left;
        }
        .img-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            
            .img-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 33.3%;
                height: auto;
                img {
                    width: 70px;
                    height: 70px;
                }
                span {
                    font-size: 1.2rem;
                    margin: 1rem;
                }
                
            }
            

        }
        
    }

    
}
}
</style>



