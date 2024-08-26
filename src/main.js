import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
/* 使用vuex的仓库 store */
import store from './store'
/* 引入mock */
import '@/mock/mockServer'
/* 引入swiper */
import 'swiper/css/swiper.css'
/* 全局主键需要传个名字 第一个传的组件，第二个是组件名 */
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
//引入路由
import router from './router'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //创建全局通信
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
