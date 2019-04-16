<template>
    <div style="padding: 1rem;">
    
    <!--    <mt-popup :v-model="visible" :modal="false" position="bottom"> -->
        <div class="header">
            <strong>京东登录</strong>
            <i @click="$router.push('/')"></i>
        </div>
        <div class="form-user">
            <div style="position: relative"> 
                <span>账号</span><input v-model="username" placeholder="请输入用户名和密码"/>
                <i class="clear" @click="username=''" v-show="username.length>0"></i>
            </div>
            <div style="position: relative">
                <span>密码</span><input v-model="password" :type="passwordForm"/>
                <i class="clear" @click="password=''" v-show="password.length>0"></i>
                <i :class="passwordForm ==='text' ? 'shown' : 'hidden'"
                    @click="passwordForm = passwordForm === 'password' ? 'text': 'password'"></i>
            </div>
        </div>
        <div class="login">
            <div @click="login">登录</div>
        </div>
        <div class="other-link">
            <span>快速注册</span>
            <span>忘记密码</span>
        </div>
    <!--   </mt-popup> -->
    </div>
</template>

<script>
var qs = require('qs');
import {getcartList} from '@/service/getData.js'
export default {
    data () {
        return {
            visible: true,
            username: '',
            password: '',
            passwordForm: 'password',
            
        }
    },

    methods: {
    async    login() {
            let username = this.username;
            let password = this.password;
            this.$axios.post('login',qs.stringify({
                username: username,
                passwrd: password
            })).then(res => {

            //    this.$store.dispatch('UploadCartData');
                this.$store.dispatch('setUserStatus', true);
                this.$store.dispatch('GetCartList');
            
            
                window.sessionStorage.setItem('Flag', 'Logined');
                // 判断登录重定向
                const redirect = this.$route.query.redirect;
                console.log("redirect", redirect);
                if(redirect) {
                    this.$router.push(redirect)
                }
                else {
                
                    this.$router.push({
                        name: 'index'
                    })
                }
                

            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    font-size: 2rem;
    text-align: center;
    height: 3.5rem;
    position: relative;
//    margin-bottom: 2rem;
    i {
        
        display: inline-block;
        background: url(../../assets/images/close.png);
        width: 1.5rem;
        height: 1.5rem;
        background-size: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
}

.form-user {
    margin: 2rem 0;
    height: 5rem;
//    position: relative;
    span {
        font-size: 1.8rem;
        margin-right: 1.5rem;
    }
    input {
        border: none;
        outline: none;
        border-bottom: 1px solid gray;   
        height: 2rem;  
    }
    div {
        margin: 1rem 0;

    }
    .clear{
        
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../../assets/images/close.png) no-repeat;
        background-size: 100%;
        position: absolute;
        right: 7rem;
        top: .5rem;
    }

    .shown {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../../assets/images/eye.png) no-repeat;
        background-size: 100%;
        position: absolute;
        right: 5rem;
        top: .5rem;
    }

    .hidden {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../../assets/images/eye-close.png) no-repeat;
        background-size: 100%;
        position: absolute;
        right: 5rem;
        top: .5rem;
    }

}

.login {

    height: 3.5rem;
    width: 80%;

    background-color: crimson;
    color: #fff;
    font-size: 1.5rem;
    line-height: 3.5rem;
    margin: 3rem auto;
    text-align: center;
}

.other-link {
    display: flex;
    justify-content: space-around;
}
</style>

