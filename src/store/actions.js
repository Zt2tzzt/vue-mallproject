/*
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 15:48:13
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 15:48:14
 * @Description: store中的actions
 */ 
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart (context, payload) {
    // 1.使用数组的find函数（如果数组中某个对象满足参数函数的条件，返回这个对象），找到cartList中与传入商品对象payload相同的元素，并取到该元素。
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断如果cartList中不包含添加到商品，则把商品添加进cartList
    if (oldProduct) {
      // oldProduct.count++
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1 // 第一次添加的商品，给一个count属性，默认值为1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
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

  }
}
