import request from '@/utils/request'
/**
 * 账户密码登录
 * POST /Index.php/admin/member/login
 * @param {*} data 
 */
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/Getadmindata',
    method: 'get',
    params: { token }
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
