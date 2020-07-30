<!--
 * @Author: Zt2tzzt
 * @Date: 2020-05-24 16:21:55
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-29 18:09:30
 * @Description: file content
--> 
<template>
  <div class='goods-item' @click="itemClick">
    <!-- @load是vue中针对JS里load函数封装的事件 -->
    <img :src="showImage" alt="" @load="imageLoad">
    <div class='goods-info'>
      <p>{{goodsItem.title}}</p>
      <span class='price'>{{goodsItem.price}}</span>
      <span class='collect'>{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // 思路一：直接发射防抖方法，但是当离开Home时，要取消对bus的监听。
      this.$bus.$emit('itemImageLoad')
      // 思路二：通过路由判断是刷新首页还是刷新详情页。
      /* if (this.$router.path.indexOf('/home')) {
        // $bus 事件总线
        this.$bus.$emit('itemImageLoad')
      } else if (this.$router.path.indexOf('/detail')) {
        this.$bus.$emit('detailItemImgLoad')
      } */
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px; /* 图片圆角 */
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>