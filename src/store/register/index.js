import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserout } from '@/api'
import { setToken, getToken ,remToken} from '@/utils/token'
const registerCk = {
  namespaced: true,
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    /* 验证码 */
    GRTCODE(state, code) {
      state.code = code
    },
    /* 登录 */
    USERLOGIN(start, token) {
      start.token = token
    },
    //用户信息
    GETUSERINFO(start, userInfo) {
      start.userInfo = userInfo
    },
    //退出登录
    GETUSEROUT(start){
      start.token = '',
      start.userInfo = ''
      remToken()
    }
  },
  actions: {
    //验证码
    async grtCode({ commit }, phone) {
      let res = await reqGetCode(phone)
      if (res.code == 200) {
        commit('GRTCODE', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //用户注册 
    async userRegister({ commit }, user) {
      let res = await reqUserRegister(user)
      console.log(res);
      if (res.code == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'))
      }


    },
    //登录业务token
    async userLogin({ commit }, data) {
      let res = await reqUserLogin(data)
      console.log(res);

      if (res.code == 200) {
        //发送token
        commit("USERLOGIN", res.data.token),
          //持久化保存token
          setToken(res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }

    },
    //退出登录
    async getUserout({ commit }) {
      let result = await reqUserout();
      if (result.code == 200) {
        commit('GETUSEROUT', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  getters: {

  }
}
export default registerCk