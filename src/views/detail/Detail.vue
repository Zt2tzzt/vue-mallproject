<!--
 * @Author: Zt2tzzt
 * @Date: 2020-06-15 16:37:28
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 02:15:25
 * @Description: 详情页
--> 
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav" />
    <!-- :probe-type用于Scroll对象派发记录滚动的事件 @scroll用于监听Scroll对象内发送的监听滚动事件-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
      <back-top @click.native="backClick" v-show='isShowBackTop' />
      <detail-bottom-bar @addToCart='addToCart' />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"; // 导入商品图片信息组件
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList" ;// 导入GoodsList用于展示推荐商品信息
import Scroll from "components/common/scroll/Scroll"; // 导入Scroll组件
import { debounce } from "common/utils";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail" // 导入商品详情，商品，商店信息。
import { itemListenerMixin, backTopMixin } from "common/mixin" // 导入混入对象

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin], // 放入混入对象
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], // 用于DetailNavBar导航至各组件需要滚动到的位置。
      getThemeTopYs: null, // 用于封装防抖函数获取themeTopYs的值。
      currentIndex: 0, // 用于记录当前滚动道德位置对应themeTopYs里的哪一个主题的index
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.创建iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      console.log(data);
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据。
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息。
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      
      // 当Detail里的所有组件渲染完成后，会回调nextTick这个函数。即可保证params和comment的offset是有值的，而不是undifined
      this.$nextTick(() => {
        // 此函数根据最新的数据，对应的DOM是已经被渲染出来，但是图片依然没有加载完。
      })
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list;
    });

    // 4.将防抖函数封装金getThemeTopY方法
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []; // 清空themeTopYs
      // 给themeTopYs赋值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE) // 加入一个JS中能够表示的最大值，以方便判断滚动区间，从而在detailNavBar上自动切换颜色。
      console.log("this.themeTopYs:", this.themeTopYs);
    }, 100);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      // mixin里已经有了相应的条件，直接调用refresh方法即可。
      this.newRefresh();

      // 调用getThemeTopYs方法，图片加载完后获取各组件对应的位置，更为准确
      this.getThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听Scroll对象传来的scroll事件，pos为位置信息
    contentScroll (pos) {
      // 1.获取y值
      const posY = -pos.y

      // 2.posY和主题中值进行对比。
      for (let i in this.themeTopYs) {
        i = parseInt(i)
        if ((this.currentIndex !== i) && (this.themeTopYs[i] <= posY && posY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部。
      this.listenShowBackTop(pos)
    },
    // 添加商品到购物车
    addToCart () {
      // 1.获取购物车需要展示的信息，图片，标题，描述，价格，数量。
      const product = {}
      product.iid = this.iid // 作为商品的唯一标识，一定要传
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice

      // 2.将商品添加到购物车，用Vuex保存商品。
      this.$store.commit('addCart', product)
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 10;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
</style>