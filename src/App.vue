<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '',
  components: {
    Header, Footer
  },
  mounted() {
    this.$store.dispatch('homeCk/categoryList');
   //获取首页展示登录
   this.$store.dispatch('registerCk/getUserInfo')
  },

}
</script>

<style></style>