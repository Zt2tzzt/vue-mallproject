/*
 * @Author: Zt2tzzt
 * @Date: 2020-05-23 03:27:43
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-31 09:43:43
 * @Description: 混入对象
 */ 
import { debounce } from 'common/utils'
import BackTop from "components/content/backTop/BackTop" // 回到顶部

/**
 * @description: 导出商品item监听的混入对象，用于首页和详情页图片加载完成后进行Scroll的防抖刷新。
 */
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500)
    // 保存函数。
    this.itemImgListener = () => {
      this.newRefresh()
    }
    // 1.监听GoodsListItem中图片加载完成。在mounted中实现，是为了确保scroll对象有值
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

/**
 * @description: 导出返回到顶部按钮的混入对象。
 */
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop (pos) {
      this.isShowBackTop = (-pos.y) > 1000 ? true : false
    }
  }
}
