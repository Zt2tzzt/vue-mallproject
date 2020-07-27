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