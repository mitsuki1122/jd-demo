<template>
    <div>
        <div class="searchResult">
            <div class="scanCode">
                <i class="searchIcon searchCodeIcon"></i>
                <span>扫一扫</span>
            </div>
            <div class="searchInput" @click="change">
                <div class="searchBox">
                    <i class="searchIcon searchContentIcon"></i>
                    <span>MacBook Pro 15.4寸</span>
                </div>
            </div>
            <div class="searchMsg">
                <i class="searchIcon searchMsgIcon"></i>
                <span>消息</span>
            </div>
        </div>
        <mt-popup v-model="searchVisible" :modal="false" position="right" class="searchContainer">
        <!--    <div class="searchContainer"> -->
                <div class="search-top">
                    <i class="search-top-icon" @click="() => {keyword=''; searchVisible=false}"></i>
                    <div class="searchInput">
                        <i class="searchInputIcon"></i>
                        <div class="searchBox">
                            <input v-model="keyword" placeholder="MacBook Pro 15.4寸" @focus="search_flag = false" ref="searchinput">
                            <span class="clear" @click="keyword=''" v-show="keyword.length>0">&times;</span>
                        </div>
                        
                    </div>
                    <span @click="keywordSearch(keyword)">搜索</span>
                </div>
                <div class="history-search"  v-show="keyword.length<=0">
                    <span>最近搜索</span>
                    <ul class="searchlist">
                        <li class="searchitem" v-for="(item, index) in searchHistoryData" :key="index"
                        @click="getSellersList(item)">{{item.keyword}}</li>
                    </ul>
                    <div class="clear">
                        <span>&times;</span>
                    </div>
                    <div class="hot-search">
                        <p>热搜</p>
                        <ul class="searchlist">
                            <li class="searchitem" v-for="(item, index) in searchHotData" :key="index">{{item}}</li>
                        </ul>
                    </div>
                </div>
                <div class="search-result-content" v-show="keyword.length>0">
                    <div class="keyword-result" v-show="keyword.length>0 && search_flag == false">
                        ..
                    </div>
                    <div class="seller-result" v-show="search_flag">
                        <div v-for="(item, index) in sellersList" :key="index" style="height: 3rem; font-size: 1.8rem;" @click="$router.push('/product')">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            
        <!--    </div> -->
        </mt-popup>
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    data () {
        return {
            searchVisible: false,
            keyword: '',
            searchHistoryData: [],
            searchHotData: [],
            sellersList: [],
            search_flag: false,
        }
    },
    /*computed: {
        function name(params) {
            
        }
        this.searchHistoryData = JSON.parse(window.localStorage.getItem('searchHistoryData'));
            console.log(this.searchHistoryData);
    },*/
    watch: {
        /*searchHistoryData: {
            handler(newval, oldval) {
                console.log("changed!");
            },
            deep:true
        }   */ 
    },
    mounted() {
        this.getHistoryData();
        this.getHotData();
        
    },
    methods: {
        change () {
            this.searchVisible = !this.searchVisible
        },
        keywordSearch (item) {
            this.sellersList = [];
            this.getSellersList(item);
            this.search_flag = true;
            
            var storage = window.localStorage;
            var historyData = storage.getItem('searchHistoryData');
            if (!historyData) {
                storage.setItem('searchHistoryData', JSON.stringify([{"keyword": this.keyword, "date": new Date()}]));
            }
            else {
                var Data = JSON.parse(historyData);
                Data.push({"keyword": this.keyword, "date": new Date()});
                storage.setItem('searchHistoryData', JSON.stringify(Data));
            }
            this.searchHistoryData = JSON.parse(window.localStorage.getItem('searchHistoryData'));
        },
        getHistoryData () {
            try {
                this.searchHistoryData = JSON.parse(window.localStorage.getItem('searchHistoryData'));
            }
            catch(err) {
                console.log(err);
            }
        },
        getHotData () {
            this.$axios.get('http://localhost:8080/static/data.json').then((res) => {
                this.searchHotData = res.data.searchHot;
                
            }).catch((err) => {
                console.log(err)
            })
        },
        
        getSellersList(item) {
            this.$axios.get('http://localhost:8080/static/data.json').then((res) => {
                this.sellersList = res.data.sellerslist;
            }).catch((err) => {
                console.log(err)
            })
        }
    },

    
}
</script>

<style lang="scss" scoped>
body{
  padding-top:40px;
}
.searchResult {
    position: fixed;
    background: red;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 999;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .searchIcon {
        background: url('../../assets/images/searchIcon.png') no-repeat;
        background-size: 600% 100%;
    }
    .scanCode {
        min-width: 3rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin:1vw 2vw;
        .searchCodeIcon {
            width: 2rem;
            height: 2rem;
            background-position: 0 0;
            
        }
        span {
            color: #ffffff;
            font-size: .5rem;
        }
    }
    .searchMsg {
        min-width: 3rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin:1vw 2vw;
        .searchMsgIcon {
            width: 2rem;
            height: 2rem;
            background-position: -4rem 0rem;
        }
        span {
            color: #ffffff;
            font-size: .5rem;
        }
    }
    .searchInput {
    //    width: 100%;
        .searchBox {
            width: 20rem;
            background: #ffffff;
            height: 2.2rem;
            border-radius: 2rem;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            
            .searchContentIcon {
                width: 1rem;
                height: 1rem;
                background-position: -1rem 0;
                margin: 0 1rem;
            }
            span {
                color: #999;
                font-size: .5rem;
            }
        }

    }

}
.cus-popup {
    position: fixed;
    left: 0; 
    top: 0 ;         
}
.searchContainer {        
        z-index: 999;
        width: 100%;
        height: 100%;
        background: #ffffff;
        .search-top {
            padding: .5rem 1rem;
        //    height: 40px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eeeeee; 
            .search-top-icon {
                background: url('../../assets/images/arrow-left.png') no-repeat;
                width: 2.0rem;
                height: 2.0rem;
                background-size: 100% 100%;
                
            }
            .searchInput {
                width: 100%;
                height: 3rem;
                background: hsl(0, 25%, 98%);
                border-radius: 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
                .searchInputIcon {
                    background: url('../../assets/images/searchIcon.png') no-repeat;
                    background-size: 600% 100%;
                    width: 1rem;
                    height: 1rem;
                    background-position: -1rem 0;
                    margin: 0 1rem;
                }
                .searchBox {
                    width: 80%;
                //    height: 3.5rem;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;
                    input {
                        width: 100%;
                        height: 3rem;
                        background: transparent;
                        border: none;
                        color: #999;
                        font-size: 1.5rem;
                        
                        border: none;
                        outline: none;
                    }
                    .clear {
                    display: inline-block;
                   // display: flex;
                  //  justify-content: center;
                  //  align-items: center;
                    height: 1rem;
                    width:  1rem;
                    background: transparent;
                    color: #999;
                //    border-radius: 1rem;
                //    border: .1rem solid #999;
                    margin: 0 1rem;
                    text-align: center;
                    line-height: 1rem;
                }
                }
                
            }
            > span {
                font-size: .8rem;
                background: rgb(243, 31, 102);
                color: #ffffff;
                white-space: nowrap;
                border-radius: 2px;
                margin: 0 5px;
                padding: 1px;
            }
        }
        .history-search {
            text-align: left;
            padding: .5rem 1rem;
            .searchlist {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-content: flex-start;
                align-items: center;
                .searchitem {
                    background: hsl(0, 25%, 98%);
                    color: #555;
                    font-size: .5rem;
                    padding: .2rem 0.5rem;
                    margin: .3rem;
                    border-radius: .2rem;
                }
            }
        }
        .searchlist {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-content: flex-start;
                align-items: center;
                .searchitem {
                    background: hsl(0, 25%, 98%);
                    color: #555;
                    font-size: .5rem;
                    padding: .2rem 0.5rem;
                    margin: .3rem;
                    border-radius: .2rem;
                }
            }
        .hot-search {
            li:nth-child(-n+3) {
                color:  rgb(243, 31, 102) !important;
            }
        }
    }

</style>


