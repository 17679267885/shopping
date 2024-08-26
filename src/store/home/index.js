//home 小仓库
import { reqCategoryList, reqBanners, reqFloors } from '@/api'
const homeCk = {
  namespaced: true,
  state: {
    //默认初始值别瞎写,服务器返回的是数组则，state中的数据也为数组
    categoryList: [],
    getBannerList: [],
    getFloorsList: []
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    /* banner */
    GETBANNERLIST(state, getBannerList) {
      state.getBannerList = getBannerList
    },
    /* floors */
    GETFLOORSLIST(state, getFloorsList) {
      state.getFloorsList = getFloorsList
    }
  },
  actions: {
    async categoryList({ commit }) {
      let result = await reqCategoryList();
      console.log(result.data);
      if (result.code == 200) {
        commit("CATEGORYLIST", result.data)
      }
    },
    /* 获取banner轮播图数据 */
    async getBannerList({ commit }) {
      let result = await reqBanners()
      console.log(result.data);
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data)
      }
    },
    /* 获取floors数据 */
    async getFloorsList({ commit }) {
      let result = await reqFloors()
      console.log(result.data);
      if (result.code == 200) {
        commit("GETFLOORSLIST", result.data)
      }
    }
  },
  getters: {}
}


export default homeCk