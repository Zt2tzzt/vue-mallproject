/*
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 16:23:39
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 16:23:40
 * @Description: 用于封装get方法取Vuex中的数据
 */ 
export default {
  cartLength (state) {
    return state.cartList.length
  },
  cartList (state) {
    return state.cartList
  }
}
