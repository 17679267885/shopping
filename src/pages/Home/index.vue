<template>
  <div>
    首页
    <!-- 三级联动 -->
    <TypeNav />
    <Container />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="like in getFloorsList" :key="like.id" :floor="like" />
      <Brand />
  </div>
</template>

<script>
import Container from '@/pages/Home/Container'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  /* 先提交 */
  mounted() {
    //派发action,获取floor组件数据
    this.$store.dispatch('homeCk/getFloorsList')
    //获取首页展示
    this.$store.dispatch('registerCk/getUserInfo')
  },
  computed: {
    ...mapState('homeCk', ['getFloorsList'])
  },
}
</script>

<style></style>