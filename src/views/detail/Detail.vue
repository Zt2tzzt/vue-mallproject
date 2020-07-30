<!--
 * @Author: Zt2tzzt
 * @Date: 2020-06-15 16:37:28
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-30 16:55:54
 * @Description: file content
--> 
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content"
            ref="scroll" >
      <div>
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
        <detail-param-info :param-info="paramInfo"/>
        <detail-comment-info :commentInfo="commentInfo" />
        <goods-list :goods="recommends" />
      </div>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo" // 导入商品图片信息组件
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import GoodsList from "components/content/goods/GoodsList" // 导入GoodsList用于展示推荐商品信息
import Scroll from "components/common/scroll/Scroll" // 导入Scroll组件
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail.js" // 导入商品详情，商品，商店信息。
import { itemListenerMixin } from 'common/mixin' // 导入混入对象

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin], // 放入混入对象
  data () {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    }
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.创建iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(data)
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据。
      this.detailInfo = data.detailInfo

      // 5.获取参数信息。
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

  },
  mounted () {
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad () {
      this.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>