<!--
 * @Author: Zt2tzzt
 * @Date: 2020-06-16 11:10:04
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-23 15:38:22
 * @Description: file content
--> 
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.detail-swiper {
  height: 300px;
}
</style>