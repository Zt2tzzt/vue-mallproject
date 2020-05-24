<template>
  <div class='goods'>
    <goods-list-item :key='index' v-for='(item, index) in goods' :goods-item='item' />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; /* 均等分 */
}
</style>