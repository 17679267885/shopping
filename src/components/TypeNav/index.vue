<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">

    <div class="container" @mouseleave="leaveShow">
      <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">美溢价超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 全部商品 -->
      <transition name="zl">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 给显示来个样式 -->
            <div class="item" v-for="c1 in categoryList.slice(0, 15)" :key="c1.categoryId">
              <h3>
                <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TypeNav',
  data() {
    return {
      show: true
    }
  },
  //组件挂载完毕：可以向服务器发请求
  mounted() {

    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('homeCk', ['categoryList'])
  },
  methods: {
    /* 用事件委派 */
    goSearch(event) {
      let element = event.target
      //dataset 可以获取节点的信息 给a标签添加自定义属性 
      let { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        /* 路径 */
        let location = { name: 'search' };
        /* 参数 */
        let query = { categoryName: categoryname }

        if (category1id) {
          /* 动态添加 */
          query.category1id = category1id
        } else if (category2id) {
          query.category2id = category2id
        } else {
          query.category3id = category3id
        }
        /* 合并 */
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query
          this.$router.push(location);
        }


      }

    },
    /* 显示隐藏 */
    enterShow() {
      this.show = true
    },

    leaveShow() {
      if (this.$route.path != '/home') {
        this.show = false
      }

    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .zl-enter-active {
      animation: donHua 0.5s linear;
    }

    .zl-leave-active {
      animation: donHua 0.5s reverse;
    }

    @keyframes donHua {
      from {
        transform: translateX(-100%);
      }

      to {
        transform: translateX(0);
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .item:hover {
          background-color: hsla(194, 88%, 74%, 0.985);
        }
      }
    }
  }
}
</style>