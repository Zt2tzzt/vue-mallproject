<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import pullUpLoad from 'better-scroll/pull-up'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 1.创建scroll对象
    // 通过ref拿元素。
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 用于控制scroll中类似div的元素可点击
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置。
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position) // 发出自定义事件
    })

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, Time=300) {
      // this.scroll && 用于判断scroll对象是否被初始化
      this.scroll && this.scroll.scrollTo(x, y, Time)
    },
    // 上拉加载更多完成方法
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp();
    },
    // refresh函数
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>