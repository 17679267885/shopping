//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import store from "@/store";
Vue.use(VueRouter);
//先把原型链 VueRouter的puls 保存一份 解决搜索框错误问题
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push | replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (reject && resolve) {
    //call(调用一次函数) apply 也是调用一次函数 用处是需要数组传参
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (reject && resolve) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


let router = new VueRouter({
  routes: [
    {
      path: '/detail/:skuId',
      component: Detail,
      meta: { show: true }
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: { show: true }
    },
    {
      name: 'search',
      /* 用params传参的时候需要现在path占位,不传params参数 需要在后面加个？ */
      path: '/search/:keyword?',
      component: Search,
      meta: { show: true },
      //函数写法才最重要
      props: (route) => {
        keyword: route.params.keyword;
        big: route.query.big
      }
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false }
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false }
    },
    /* 重定向 */
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ],
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
//全局路由
router.beforeEach((to, from, next) => {
  //登录了账号就不能在去访问/login
  let token = store.state.registerCk.token
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router