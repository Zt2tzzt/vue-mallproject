<template>
  <!-- 文字不同没有必要使用插槽 -->
  <div class="tab-control">
    <div :key='index' v-for='(item, index) in titles'
          class='tab-control-item'
          :class='{active: index === currentIndex}'
          @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    
    height: 40px;
    line-height: 40px;
    background-color: #fff;

    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 0 5px 3px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>