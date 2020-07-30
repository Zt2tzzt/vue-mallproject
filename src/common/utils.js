/*
 * @Author: Zt2tzzt
 * @Date: 2020-05-23 03:27:29
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-07-29 16:57:36
 * @Description: file content
 */ 
/**
 * 事件监听的相关方法
 */
// 封装防抖函数，func为要进行防抖的函数，delay为延迟时间
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout (timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

/**
 * @description: 日期格式化函数。
 * @param {Date} Date：日期。
 * @param {String} fmt：格式（eg:’yyyy-MM-dd‘）。
 * @return: 格式化后的日趋字符串。
 */
export function formatDate(date, fmt) {
  // 1.获取年丰
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  /**
   * 获取时分秒字符串。
   * m+ -> 正则表达式的一个规则，代表一个或多个
   */
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
