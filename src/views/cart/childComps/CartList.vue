<!--
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 16:54:16
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 19:31:31
 * @Description: 购物车中的购物车列表组件
--> 
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li :key="index" v-for="(item, index) in cartList">{{item}}</li> -->
      <cart-list-item :key="index"
                      v-for="(item, index) in cartList"
                      :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    /* 44px:顶部导航栏高度，49px:底部导航栏高度，40px:汇总结算栏高度 */
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
