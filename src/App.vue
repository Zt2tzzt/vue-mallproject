<!--
 * @Author: Zt2tzzt
 * @Date: 2020-05-23 02:49:23
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-27 14:58:07
 * @Description: file content
--> 
<template>
  <div id="app">
    <!-- 将详情页排除在keep alive范围之外 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar"
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
