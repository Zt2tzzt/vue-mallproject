<!--
 * @Author: Zt2tzzt
 * @Date: 2020-06-15 17:26:41
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-27 14:42:47
 * @Description: file content
--> 
<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           :key="index"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)">{{item}} </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
    },
    backClick () {
      // this.$router.go(-1)
      this.$router.back() // this.$router.go(-1)
    }
  }
};
</script>

<style>
.title {
  display: flex;
  margin-top: 5px;
}

.title-item {
  flex: 1;
  font-size: 15px;
}

.active {
  color: var(--color-tint);
}

.back {
  margin-top: 10px;
}
</style>