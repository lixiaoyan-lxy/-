import request from '@/utils/request'
/**
 * 或去用户的侧边导航栏路由
 * POST /Index.php/admin/user/hq
 * @param {*} data 
 */
export function fecthRouter() {
  return request({
    url: '/Index.php/admin/user/hq',
    method: 'get'
  })
}