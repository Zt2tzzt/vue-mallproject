/*
 * @Author: Zt2tzzt
 * @Date: 2020-07-31 18:57:57
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 02:16:24
 * @Description: Vuex使用
 */ 
import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: [], // 用于存放购物车中的商品
  },
  mutations: {
    addCart(state, payload) {
      // 1.使用数组的find函数（如果数组中某个对象满足参数函数的条件，返回这个对象），找到cartList中与传入商品对象payload相同的元素，并取到该元素。
      let product = state.cartList.find(item => {
        return item.iid === payload.iid
      })

      // 2.判断如果cartList中不包含添加到商品，则把商品添加进cartList
      if (product) {
        product.count++
      } else {
        payload.count = 1 // 第一次添加的商品，给一个count属性，默认值为1
        state.cartList.push(payload)
      }

      // 使用for虚幻也能大倒上面的效果
      /* let flag = 0 // 用于判断cartList中是否包含添加进的商品。
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          item.count += 1
          flag++
          break
        }
      }
      // 2.判断如果cartList中不包含添加到商品，则把商品添加进cartList
      if (!flag) {
        payload.count = 1 // 第一次添加的商品，给一个count属性，默认值为1
        state.cartList.push(payload)
      } */

      // console.log(state.cartList[0].count)
    }
  }
})

// 3.挂载Vue实例上
export default store
