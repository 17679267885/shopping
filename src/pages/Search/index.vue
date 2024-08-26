<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread ：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}
              <i @click="removeCatName">×</i>
            </li>
            <!-- 搜索框的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 品牌属性价格  由于props里面存放的是数组 需要用v-for来遍历-->
            <li class="with-x" v-for="(propsValue, index) in searchParams.props" :key="index">
              {{ propsValue.split(":")[1] }} <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @remTrademark="remTrademark" @attValueInfo="attValueInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="storeRank(1)">
                  <a href="#">综合 <span v-show="isOne" v-if="isDesc"> ⬇ </span> <i v-show="isOne" v-if="isAsc">⬆</i></a>
                </li>
                <li :class="{ active: isTwo }" @click="storeRank(2)">
                  <a href="#">价格 <span v-show="isTwo" v-if="isDesc"> ⬇ </span> <i v-show="isTwo" v-if="isAsc">⬆</i> </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <!-- 图片 -->
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 :pagNo 第几页 :pageSize 一页有多少  :total 一共多少条数据 :continues  一页有几个分页器一般为奇数
           子传父  用自定义事件-->
          <Pagination :pagNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total"
            :continues="5" @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        /* 三级分类  */
        "category1id": "",
        "category2id": "",
        "category3id": "",
        //分类名字
        "categoryName": "",
        //关键字
        "keyword": "",
        //排序
        "order": "1:desc",
        //分页器使用：代表当前是第几页
        "pageNo": 1,
        //代表的是每一个展示数据个数
        "pageSize": 10,
        //平台售卖属性参数
        "props": [],
        //品牌
        "trademark": ""

      }
    }
  },
  components: {
    SearchSelector
  },
  /* 在挂载数据之前 需要把数据传给服务器 把params 和query 传给searchParams */
  beforeMount() {

    console.log(this.$route.query, this.$route.params);
    //利用es6语法赋值的形势 object.assign  
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },

  mounted() {
    this.getData()
  },
  /* 向服务器发送请求获取search模块数据（根据参数不同返回不同数据进行展示） */
  methods: {
    getData() {
      this.$store.dispatch('searchCk/postSearch', this.searchParams);
    },
    /* 删除商品名字 */
    removeCatName() {
      //给undefined 不把字段带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1id = undefined
      this.searchParams.category2id = undefined
      this.searchParams.category3id = undefined
      //在发给请求
      this.getData()
      //当删除query参数的时候 路径也要删除  编程式跳转到当前地址
      if (this.$route.params) {
        this.$router.push(
          {
            name: 'search',
            params: this.$route.params
          }
        )
      }
    },
    /* 删除搜索框里面的面包屑 */
    removeKeyword() {
      this.searchParams.keyword = undefined
      //在次提交请求
      this.getData()
      //在让输入框里面的值清空 需要全局通信
      this.$bus.$emit('clear')
      //让路由参数删除
      if (this.$route.query) {
        this.$router.push(
          {
            name: 'search',
            query: this.$router.query
          }
        )
      }

    },
    /* 删除品牌面包屑 */
    removeTrademark() {
      this.searchParams.trademark = ''
      this.getData()
    },
    /* 删除品牌价格属性 */
    removeProps(index) {
      //点击删除属性值的时候需要 删除数组的元素 需要删除splice 
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    /* 接收自定义事件 后端要求数据需要以id:品牌 接收*/
    remTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`,
        this.getData()
    },
    /* 接收品牌属性回调函数 (自定义事件)*/
    attValueInfo(attrs, attrValue) {
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      /* 可以连续添加重复数组到数组里面 */
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)

      this.getData()
    },
    /* 判断升序还是降序 修改order的值 */
    storeRank(flag) {
      /* 进行分割  a是判断点击的那个 b表示升序还是降序*/
      let a = this.searchParams.order.split(':')[0]
      let b = this.searchParams.order.split(':')[1]
      let nubOrder = ''
      if (false == a) {
        nubOrder = `${a}:${b == 'desc' ? 'asc' : 'desc'}`
      } else {
        nubOrder = `${flag}:${b == 'desc' ? 'asc' : 'desc'}`
      }
      this.searchParams.order = nubOrder
      this.getData()
    },
    /* 点击页码的时候 */
    getPageNo(pagNo) {
      this.searchParams.pageNo = pagNo
      console.log(this.searchParams.pagNo);
      this.getData()
    }
  },

  computed: {
    //...mapState('searchCk', ['searchList']), 
    // 'attrsList', 'trademarkList'
    ...mapGetters('searchCk', ['goodsList']),
    //获取多少条数据
    ...mapState('searchCk', ['searchList']),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    /* 判断显示向上还是下降 */
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },

  },
  /* 目前只会发送一次请求,当在次请求的时候 searchParams 参数不会发送改变  因为只要在挂载的时候发送一次 */
  watch: {
    immediate: true,
    $route(newValue, oldValue) {

      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
      console.log(this.searchParams);
      /* 每次请求完毕 将里面的值清空 */
      this.searchParams.category1id = '';
      this.searchParams.category2id = '';
      this.searchParams.category3id = '';

    }
  }

} 
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>