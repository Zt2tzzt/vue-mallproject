<!--
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 19:22:05
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-02 02:10:30
 * @Description: 购物车底部汇总结算栏
--> 
<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkAllClick" />
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/CheckButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartButtonBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    // 统计底部汇总栏的合计价格
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2) // 保留两位小数
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // 当catList中没有商品时，返回false，全选框不选中
      if (!this.cartList.length) return false

      // 用filter找不被选中的商品对象，如果有则长度不为0，取反则为false
      // return !(this.cartList.filter(item => !item.checked).length)
      // 用find找到数组中没被选中的商品，返回false，没找到则返回true
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    // 点击全选框
    checkAllClick () {
      if (this.isSelectAll) {
        // 购物车中商品全部选中时，点击全选按钮，全部取反为不选中
        this.cartList.forEach(element => element.checked = false);
      } else {
        // 购物车中商品有一个不选中时，点击全选按钮，全部选中
        this.cartList.forEach(element => element.checked = true);
      }
    }
  }
}
</script>

<style scoped>
  .button-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px; /*设置汉高用于剧中*/
    background-color: #eee;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 65px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px; /*覆盖继承的line-height*/
    margin-right: 10px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 100px;
    background-color: var(--color-tint);
    text-align: center;
    color: white;
  }
</style>
