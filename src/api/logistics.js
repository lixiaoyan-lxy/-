import request from '@/utils/request'

// 获取页面数据
export function logistics(data) {
  return request({
    url: '/Input/k',
    method: 'post',
    data,
    baseURL: "http://47.93.255.80:8081/admin"// 覆盖
  })
}

// 添加页面数据
export function addInformation(data) {
  return request({
    url: '/Input/add',
    method: 'post',
    data,
    baseURL: "http://47.93.255.80:8081/admin"// 覆盖
  })
}

// 删除页面数据
export function deleteForm(id) {
  return request({
    url: '/Input/g',
    method: 'post',
    baseURL: "http://47.93.255.80:8081/admin",// 覆盖
    data: id
  })
}

// 编辑页面数据
export function editForm(id) {
  return request({
    url: '/Input/h',
    method: 'post',
    baseURL: "http://47.93.255.80:8081/admin",// 覆盖
    data: id
  })
}
