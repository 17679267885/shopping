import axios from "axios";
//进度条配置 以及进度条样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const ajaxMock = axios.create({
  //配置基本路径 发送请求的时候 路径会出现api
  baseURL: '/mock',
  //请求超时为5秒
  timeout: 10000
})
//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
ajaxMock.interceptors.request.use(
  config => {
    //进度条开始
    nprogress.start()
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

//响应拦截器
// 响应拦截器
ajaxMock.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 401) {
    MessageBox.confirm(
      {

      }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  } else if (code !== 200) {
    /* Notification.error({
      title: res.data.msg
    }) */
      alert(res.data);
    return Promise.reject(res.data)
  } else {
    //进度条结束
    nprogress.done()
    return res.data
  }
},
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  })

export default ajaxMock