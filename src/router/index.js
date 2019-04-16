import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/page/shop/product'
import Index from '@/page/cms/index'
import Login from '@/page/member/login'
import Myhome from '@/page/member/myhome'
import Category from '@/page/shop/category'
import Cart from '@/page/shop/cart'
import CreateOrder from '@/page/shop/createOrder'
import OrderDetail from '@/page/shop/orderDetail'
import OrderList from '@/page/shop/orderList'
import AddressList from '@/page/shop/addressList'
import Comment from '@/page/shop/comment'

Vue.use(Router)

const router = new Router({
  routes: [
    {

      path: '/',
    //  name: 'HelloWorld',
    //  component: HelloWorld
      name: 'index',
      component: Index,
      meta: {keepAlive: true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myhome',
      name: 'myhome',
      component: Myhome
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {keepAlive: true}
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta: {keepAlive: true}
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/createorder',
      name: 'createorder',
      component: CreateOrder
    },

    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: OrderDetail
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: OrderList
    },
    {
      path: '/addresslist',
      name: 'addresslist',
      component: AddressList
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    
  ]
})

router.beforeEach((to, from, next) => {
//  console.log("from", from);
//  console.log("to", to);
  const login = window.sessionStorage.getItem("Flag");
  const whiteList = ['/product', '/', '/category', '/myhome'];//或者用元信息判断，用于数据多的情况
  // if(to.matched.some(record => record.meta.requireAuth || record.meta.homePages))
  if(whiteList.indexOf(to.path) !== -1) {
    next()
  }
  else {
    if(login || to.path === '/login') {
      let redirect = from.query.redirect;
    //  console.log("redirect",redirect);
      if(!redirect) next()
      else {
      if(to.path === redirect) next();
      else {
        next({
          path: redirect
        })
      }
    }}
    else {
      if(to.path === '/cart') next()
      else {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
    }
  }
  
})

export default router
