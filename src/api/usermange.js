import request from  '@/utils/request'

// 获取用户信息
/**
 * 获取管理员信息
 * @param {*} data 
 */
export function GetUserList(data){
    return request({
        url:'/admin/GetAdminList',
        // url:'http://47.103.201.174/index.php/user/selUserList',
        method: 'get',
        params:data
    })
}

// 添加用户
export function UserAdd(data){
    return request ({
        // url:'/admin/AdminCreat',
        url:'http://47.103.201.174/index.php/user/editUser',
        method: 'post',
        data
    })
}

// 更新用户信息
// export function UpData(data){
//     return request({
//         url:'http://47.103.201.174/index.php/user/updateStatus',
//         method: 'post',
//         data
//     })
// }

// 修改用户信息
export function EidtUserss(data){
    return request ({
        url:'/admin/editAdmin',
        method: 'post',
        data
    })
}

//删除用户
export function DeleteUser(data){
    return request({
        url:'/user/delete_user',
        method: 'post',
        data,
        baseURL: 'http://47.103.201.174/'
    })
}