/*
 * @Author: Zt2tzzt
 * @Date: 2020-08-01 15:45:53
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 19:19:16
 * @Description: store中的mutations
 */
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload);
  }
};
