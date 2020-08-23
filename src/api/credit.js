import request from '@/utils/request'




export function integral(data) {
    return request({
        url: '/int1/dy',
        params: data,
        method: 'get',
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}
export function changeState(data) {
    return request({
        url: '/int1/update',
        params: data,
        method: 'get',
        baseURL: 'http://47.93.255.80:8081/admin'
    })

}
export function shopping(data) {
    return request({
        url: '/int2/dy',
        params: data,
        method: 'get',
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}