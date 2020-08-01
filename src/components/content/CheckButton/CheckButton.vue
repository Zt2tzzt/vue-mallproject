<!--
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 18:32:21
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 18:51:02
 * @Description: 购物车商品前的复选框
--> 
<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border:2px solid #aaa
  }
  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
