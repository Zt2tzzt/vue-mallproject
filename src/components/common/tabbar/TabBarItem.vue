<template>
  <!-- 监听点击事件 -->
  <div class="tab-bar-item" @click='itemClick'>
    <div v-if="isActive">
      <slot name="item-icon-actived"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    isActive() {
      // 判断当前活跃的路由指向的路径是否是当前路径。
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // 动态绑定样式
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
};
</script>

<style>
/* .active {
  color: red;
} */
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>