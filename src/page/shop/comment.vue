<template>
    <div style="background: #fff; height: 100%">
        <!-- 顶部tab栏 -->
        <div class="cart-header">
                <div class="goback" @click="$router.go(-1)">
                    <i></i>
                </div>
                
                <div class="cart-title">评价</div>
                
                <div class="other">
                    <span @click="$router.push('/orderlist')">发布</span>
                </div>
        </div>
        <div class="comment-container">
            <div class="comment-list">
                <div class="comment-item" v-for="(item, index) in orderData.ProductList" :key="index">
                    <div class="star-area">
                        <img src="">
                        <div class="starlist">
                            <i  v-for="(star, starindex) in item.starList" :key="starindex" :class="star ===1 ? 'star':'blur'"  @click="starChange(item.starList, starindex, item)"></i>
                        </div>
                        <span class="tip">{{item.starTip}}</span>
                    </div>
                    <br/>
                    <div class="content" >
                        <textarea v-model="item.content" placeholder="宝贝满足你的期待吗？说出它的优点和美中不足的地方吧" cols="50" rows="10" style="border: none"></textarea>
                    </div>
                    <div class="upload">
                        <div class="uploadfile">   
                            <i><input type="file"  multiple @change="getFile" ref="uploadfile" id="file" class="inputfile"> </i>
                            <span >添加图片</span>
                        </div>
                        <div class="file-data" v-for="(file, fileindex) in item.uploadFiles" :key="fileindex"> 
                            <img  :src="file.base64"  >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
export default {
    data() {
        return {
            orderData: {
                ProductList: [
                    {
                        starList: [1,1,1,1,1],
                        starTip: '非常好',
                        content: '',
                        uploadFiles: []
                    //    uploadFiles: [{base: require('../../assets/images/arrow-left.png')}]
                    }
                ]
           },
            imgholder: [],
        
        }
    },
    watch: {
        orderData: {
            handler(){}
        },
        deep: true
    },
    components: {
        FileUpload: VueUploadComponent
    },
    methods: {
        starChange(arr, index, parentItem) {
        //    let level = index;
            let tip = ['非常差','差','一般','好','非常好'];   
            for (let i = index+1; i< 5; i++)
            {
                arr[i] = 0;
            //    this.$set(arr, i, 0) 动态渲染
            }
            this.$set(parentItem, 'starTip', tip[index]);
        },

        getFile(e) {
            var _this = this;
            var files = e.target.files;
            let param = new FormData(); //create form object
            for(let i=0; i<files.length; i++) {
                
                param.append('file', files[i]);  
                let reader = new FileReader();
                reader.readAsDataURL(files[i]); //transform to base64
                reader.onloadend = function() {
                    _this.imgholder.push({base64: this.result});
                }
            }
            _this.$set(_this.orderData.ProductList[0],'uploadFiles', _this.imgholder);
        //    console.log('test', _this.ProductList[0].uploadFiles);
        
        //    _this.imgholder = [];
            
            _this.$axios.post('http://localhost:3000/upload', param, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res.data)
            })
           
        },

        upload() {
            let param = new FormData(); //create form object
            this.orderData.ProductList.forEach((item, index) => {
            
                item.uploadFiles.forEach(file => {
                    param.append('file', file)   
                })
            })
            console.log(param.getAll('file'));

        },

        inputFile(newFile, oldFile) {

        },
        inputFilter(newFile, oldFile, prevent) {
            if(newFile && !oldFile) {
                if(!/\.(jpg|png|jpeg)$/i.test(newFile.name)) {
                    return prevent()
                }
            }
            newFile.blob = '';
            let URL = window.URL;
            if(URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file);
            }
        }

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
            display: inline-block;
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
        font-size: 1.5rem;
    }
        
}

.comment-item {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
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
        //    background: url('../../assets/images/star-h.png') no-repeat;
            background-size: 100%;
        }
        .star {
            background: url('../../assets/images/star-h.png') no-repeat;
        }
        .blur {
            background: url('../../assets/images/star-n.png') no-repeat;
        }
        
    }
    .tip {
            font-size: 1.6rem;
            font-weight: bold;
            margin-left: 1.5rem;

        }
}

.upload {
    display: flex;
    justify-items: center;
    margin-bottom: 1rem;
    .uploadfile {
        width: 6.5rem;
        height: 6.5rem;
        padding: 1.5rem;
        margin: .5rem;
        border: 1px dotted #555;
        i {
            display: block;
            width: 5rem;
            height: 5rem;
            background: url('../../assets/images/camera.png');
            background-size: 100%;
        }
        input {
            opacity: 0;
        //    width: 100%;
        //    height: 100%;
        }
    }
    .file-data {
        width: 8.5rem;
        height: 8.5rem;
        padding: .5rem;
        margin: .5rem;
        border: 1px dotted #555;
        img {
        width: 6rem;
        height: 6rem;
        
        }
    }
}
}
</style>


