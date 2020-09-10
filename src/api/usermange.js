import request from  '@/utils/request'

// 获取用户信息
export function GetUserList(data){
    return request({
        url: '/user/selUserList',
        method: 'get',
        params:data,
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}

// 添加用户
export function UserAdd(data){
    return request ({ 
        url: '/user/editUser',
        method: 'post',
        data,
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}

// 修改用户信息
export function EidtUserss(data){
    return request ({
        url:'/user/updateStatus',
        method: 'post',
        data,
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}

//删除用户
export function DeleteUser(data){
    return request({
        url:'/user/delete_user',
        method: 'post',
        data,
        baseURL: 'http://47.93.255.80:8081/admin'
    })
}