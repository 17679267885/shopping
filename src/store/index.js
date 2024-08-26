import Vue from "vue";
import Vuex from 'vuex'

//使用插件
Vue.use(Vuex)

//对外暴露
import homeCk from "./home";
import searchCk from "./search";
import detailCk from './detail'
import registerCk from './register'
export default new Vuex.Store({
  modules: {
    homeCk,
    searchCk,
    detailCk,
    registerCk,
  }
})