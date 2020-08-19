import request from '@/utils/request'

export function getAdList(data) {
    return request({
        url: '/Input/find',
        method: 'post',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        data

    })
}

export function getAdvList(params) {
    return request({
        url: '/Input/advance',
        method: 'get',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        params
    })
}

export function putList(data) {
console.log(request,'data')
    return request({
        url: '/Input/a',
        method: 'post',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        // dataType: 'json',
        // transformRequest: [function (data) {
        //     return JSON.stringify(data)
        // }],
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        data
    })

}

export function getNextList(params) {
    return request({
        url: '/Input/c',
        method: 'get',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        params
    })
}

export function getAdListById(id) {
    return request({
        url: '/Input/d',
        method: 'get',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        params: { id }
    })
}

export function removeById(id) {
    return request({
        url: '/Input/delete',
        method: 'post',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        data: id
    })
}

export function deletethisform(id) {
    return request({
        url: '/Input/p',
        method: 'post',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        data: id
    })
}


export function adFormFinal(data) {
    return request({
        url: '/Input/f',
        method: 'post',
        baseURL: "http://47.93.255.80:8081/admin",// 覆盖
        data
    })
}
