import request from '@/utils/request'

/**
 * 最终产品列表
 * @param {*} data 
 */
export function selGoods(data) {
    return request({
      url: '/goods/selGoods',
      method: 'get',
      data,
      baseURL: 'http://47.103.201.174' // 直接通过覆盖的方式
    })
  }
  