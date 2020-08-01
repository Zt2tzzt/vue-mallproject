/*
 * @Author: Zt2tzzt
 * @Date: 2020-07-31 18:57:57
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 15:58:30
 * @Description: Vuex使用
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: [], // 用于存放购物车中的商品
}
const store = new Vuex.Store({
  state,
  /**
   * 作用：muations唯一的目的就是修改state中状态
   * 原则：mutations中的每个方法尽可能完成单一的事件。
   */
  mutations,
  actions
})

// 3.挂载Vue实例上
export default store
