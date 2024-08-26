import {reqGoodsInfo} from '@/api'
const detailCk = {
  namespaced: true,
  state: {
    goodInfo:{

    }
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  actions: {
    async getGoodInfo({ commit }, skuId) {
      let req = await reqGoodsInfo(skuId)
      if (req.code == 200) {
        commit('GETGOODINFO', req.data)
      }
    }
  },
  getters: {

  }
}
export default detailCk