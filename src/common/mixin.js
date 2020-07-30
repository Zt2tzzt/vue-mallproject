/*
 * @Author: Zt2tzzt
 * @Date: 2020-05-23 03:27:43
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-30 17:06:09
 * @Description: 混入对象
 */ 
import { debounce } from 'common/utils'

/**
 * @description: 导出商品item监听的混入对象，用于首页和详情页图片加载完成后进行Scroll的防抖刷新。
 */
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    // 保存函数。
    this.itemImgListener = () => {
      this.refresh()
    }
    // 1.监听GoodsListItem中图片加载完成。在mounted中实现，是为了确保scroll对象有值
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}