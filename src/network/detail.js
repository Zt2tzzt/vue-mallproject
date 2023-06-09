/*
 * @Author: Zt2tzzt
 * @Date: 2020-06-16 10:42:44
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 18:05:22
 * @Description: file content
 */ 
import {request} from "./request"

export function getDetail (iid) {
  return request ({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request ({
    url: '/recommend'
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.lowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值，有些商品有值，有些商品没有值。
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables;
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
