/*
 * @Author: Zt2tzzt
 * @Date: 2020-07-30 18:11:27
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-08-01 16:06:50
 * @Description: file content
 */ 
import axios from 'axios'

// Edition 1
export function request (config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: '加微信coderwhy002获取接口',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1. 请求拦截
  instance.interceptors.request.use(config => {
    // 拦截其使用场景
    // 1.比如config中的一些信息不符合服务器的要求。
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标。
    // 3.某些网络请求（比如登录），必须携带一些特殊的信息（比如token）
    return config
  }, err => {
    console.log(err)
    
  })
  // 2.2. 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
    
  })

  // 3. 发送真正的网络请求
  return instance(config, success, failure)
}
