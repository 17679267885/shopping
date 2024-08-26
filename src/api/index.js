//当前这个模块：API 进行统一管理
import requests from "./request";
import ajaxMock from './ajaxMock'
/* import reqToken from './reqtoken' */

//三级联动接口
///api/product/getBaseCategoryList

//发送请求{
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
};
/* 获取轮播图数据 */

export const reqBanners = () => {
  return ajaxMock({ url: '/banners', method: 'get' })
}

// 获取首页楼层列表
export const reqFloors = () => {
  return ajaxMock({ url: '/floors', method: 'get' })
}
//发送search请求
//获取搜索模块数据地址:/api/list 请求方式:post参数:需要带参数也要注意空参形式
// "category3Id":"61"
// "categoryName":"手机”
// "keyword":"小米"
// "order": "1:desc"
// "pageNo": 1,
// "pagesize": 10,
// "props":["1:1700-2799:价格"，"2:6.65-6.74英寸:屏幕尺寸"]"trademark":"4:小米"
export const postSearchList = (params) => requests(
  {
    url: '/list',
    method: 'post',
    data: params || {}

  }
)

//获取产品详情信息的接口 URL：api/item/{skuId}  请求方式get
export const reqGoodsInfo = (skuID) => requests(
  {
    url: `/item/${skuID}`,
    method: 'get',
  }
)

//登录的接口获取验证码
export const reqGetCode = (phone) => requests(
  {
    url: `/user/passport/sendCode/${phone}`
  }
)

//注册用户  接口 /api/user/passport/register    method:POST  参数 phone password code
export const reqUserRegister = (data) => requests(
  {
    url: `/user/passport/register`,
    data,
    method: 'post'
  }
)

//登录 /api/user/passport/login
export const reqUserLogin = (data) => requests(
  {
    url: '/user/passport/login',
    data,
    method: 'post'
  }
)

//获取用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: "get"
})

//获取用户信息
/* export const reqUserInfo = ()=>reqToken({
  url:'/login',
  method:'post'
})
 */

//退出登录
export const reqUserout = () => requests(
  {
    url:'/user/passport/logout',
    method:'get'
  }
)