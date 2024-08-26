const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  /* 关闭eslint校验工具 */
  lintOnSave: false,
  /* 跨域问题 */
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        //pathRewrite: { '^/api': '' },  //pathRewrite 用来过滤api 重写
        ws: true,
        changeOrigin: true //用于请求头的host值
      },
     /*  '/user': {
        target: 'http://localhost:8082',
        ws: true,
        changeOrigin: true
      } */
      /* 多个和上面的方法一样 */
    }
  }
})
