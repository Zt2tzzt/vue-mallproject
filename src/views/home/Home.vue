<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref='tabControl1'
                   class="tab-control"
                   v-show="isTabFixed" />
    <scroll class="content"
            ref='scroll'
            :probe-type="3"
            @scroll="contentScorll"
            :pull-up-load="true"
            @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref='tabControl2' />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件事件监听，需要加native修饰符 -->
    <back-top @click.native="backClick" v-show='isShowBackTop' />
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin } from 'common/mixin' // 导入混入对象

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin], // 放入混入对象
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0, // 离开首页时，用于保存当前位置。
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted () {
  },
  destroyed () {
    console.log('Home diestroyed')
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 对scroll进行刷新，避免一些莫名其妙的问题
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     *事件监听的相关方法。
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tabControl的currentIndex保持一致。
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScorll (position) {
      // 1. 判断BackTop是否显示。
      this.isShowBackTop = (-position.y) > 1000 ? true : false

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      // 2.获取tabControl的offseTop，所有的组件都有一个属性$el，用于获取组件中的元素。
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      // 1.请求多个数据 - 异步操作
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 2.请求商品数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); // ...相当于数组的解构
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    },
    
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh; /* 100视口高度 */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff; /* 文字颜色 */
  /* 在使用浏览器原生滚动时，给导航栏定位 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 10;
}

/* .conttent {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>