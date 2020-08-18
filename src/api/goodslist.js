import request from '@/utils/request'
// import { EPSILON } from 'core-js/fn/number'

/**
 * 获取产品列表
 * @param {*} data 
 */
export function goodsList(data) {
  return request({
    url: '/goods/selGoods',
    method: 'get',
    params:data,
    baseURL: 'http://47.103.201.174/' // 直接通过覆盖的方式
  })
}

/**
 * 查询初始化产品信息
 */
export function selectGoods(data) {
  return request({
    url: '/initial/QueryProductInformation?id=1',
    method: 'post',
    data,
    baseURL: '	http://server3.luronghui.cn'  
  })
}

/**
 * 删除
 * @param {*} data 
 */
export function deleteGoods(data) {
  return request({
    url:'/goods/deleteGoods',
    method:'post',
    data,
    baseURL: 'http://47.103.201.174/' // 直接通过覆盖的方式
  })
}

/**
 * 修改 
 */
export function editGoods(data) {
  return request({
    url:'/goods/updateGoods',
    method:'post',
    data,
    baseURL: 'http://47.103.201.174/' // 直接通过覆盖的方式
  })
}

/**
 * 添加
 */
export function addGoods (data) {
  return request({
    url: '/goods/insertGoods?id=229',
    method: 'post',
    data,
    baseURL:'http://47.103.201.174/'
  })
}