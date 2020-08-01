<!--
 * @Author: Zt2tzzt
 * @Date: 2020-07-30 18:11:27
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 16:45:26
 * @Description: file content
--> 
<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-button-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'
import { mapGetters } from 'vuex' // 导入vuex中的mapGetters，允许将vuex中的getters映射为组件中的计算属性。

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    /* cartLength () {
      return this.$store.getters.cartLength
    } */
    ...mapGetters([
      'cartLength'
    ])
  }
}

</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>