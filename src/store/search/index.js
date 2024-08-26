//search 小仓库
import { postSearchList } from '@/api'
const searchCk = {
  namespaced: true,
  state: {
    searchList: {
   
    }
  },
  mutations: {
    POSTSEARCH(state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    async postSearch({ commit }, params = {}) {
      let result = await postSearchList(params)
      if (result.code == 200) {
        commit('POSTSEARCH', result.data)
      }
    }
  },
  getters: {
    /* 手机属性 */
    attrsList(state) {
      //网络不给力返回空
      return state.searchList.attrsList || [];
    },
    /* 品牌  */
    trademarkList(state) {
      return state.searchList.trademarkList;
    },
    /* 手机 */
    goodsList(state) {
      return state.searchList.goodsList;
    },
    /* 用来测试 总个数的 */
    zgs(state){
      return state.searchList.total
    }
  }
}


export default searchCk