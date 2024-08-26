<template>
  <div class="pagination">
    <button :disabled="pagNo == 1" @click="$emit('getPageNo', pagNo - 1)">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="startNumAndEndNum.start <= page"
      @click="$emit('getPageNo', page)" :class="{ active: pagNo == page }">{{ page
      }}</button>

    <button v-show="startNumAndEndNum.end <= (totalPage - parseInt(continues / 2))">···</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</button>
    <button :disabled="pagNo == totalPage" @click="$emit('getPageNo', pagNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>

  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pagNo', 'pageSize', 'total', 'continues'],
  /* :pagNo="8" :pageSize="5" :total="91" :continues="5" */
  computed: {
    //总页数 Math.ceil向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //开始的1页数和结束的页数
    startNumAndEndNum() {
      //解构当前的第几页,一页有几个分页,总共有多少页
      let { pagNo, continues, totalPage } = this
      let start = 0, end = 0;
      //判断页面不正常现象
      //总页码数 没有连续页码多
      if (continues > totalPage) {
        start = 1,
          end = continues
      } else {
        //正常页码
        start = pagNo - Math.floor(continues / 2)
        end = pagNo + Math.floor(continues / 2)
        if (start < 1) {
          start = 1,
            end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }

      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }

  }

}
</style>
