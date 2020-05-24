<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop"
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
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     *
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
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      // 1.请求多个数据 - 异步操作
      getHomeMultidata().then(res => {
        //this.result = res; // 将数据保存到 data 的 result中
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
      });
    }
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
  /* 给导航栏定位 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .conttent {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>