<template>
    <ul class="nav-bar">
        <li class="barIcon home" @click="$router.push('/')"></li>
        <li class="barIcon categary" @click="$router.push('/category')"></li>
        <li class="barIcon find" @click="$router.push('/category')"></li>
        <li class="barIcon cart" @click="$router.push('/cart')"></li>
        <li class="barIcon myHome" @click="$router.push('/myhome')"></li>
    </ul>
</template>

<script>
export default {
    name: 'FooterView',
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.nav-bar {
    position: fixed;
  //  margin-top: -4rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    display: flex;
//    flex: 1;
    flex-wrap: no wrap;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    background: #fff;
 //   box-shadow: 0px -1px 5px #888888;
    box-shadow: 0px 0px 20px -8px #888888;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .barIcon {
    //    width: 100vw;
        width: 5rem;
        height: 4rem;
    //    background: url('../assets/images/navbar.png') 0 0 no-repeat;
    //    background-size: 850% 105%;
          
    }
    .home {
        
    //    background-position: 0 0;
         background: url('../assets/images/navbar1.png') 0 0 no-repeat;
            background-size: 100% 100%;
    }
    .categary {
       
    //    background-position: -11rem 0;
     background: url('../assets/images/navbar3.png') 0 0 no-repeat;
    background-size: 100% 100%;
    }
    .find {
       
    //    background-position: -21rem 0;
     background: url('../assets/images/navbar4.png') 0 0 no-repeat;
    background-size: 100% 100%;
    }
    .cart {
       
    //    background-position: -31rem 0;
     background: url('../assets/images/navbar5.png') 0 0 no-repeat;
    background-size: 100% 100%;
    }
    .myHome {
       
    //    background-position: -42rem 0;
     background: url('../assets/images/navbar6.png') 0 0 no-repeat;
    background-size: 100% 100%;
    }
}
</style>



