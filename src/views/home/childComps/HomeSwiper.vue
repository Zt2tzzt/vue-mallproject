<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key='index'>
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      isLoad: true
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      // 只需要发出一次事件
      if (this.isLoad) {
        this.$emit('swiperImageLoad')
        // 默认只需要发送一次
        this.isLoad = false
      }
    }
  }
};
</script>

<style>
</style>