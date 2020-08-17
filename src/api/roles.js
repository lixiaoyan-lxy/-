import request from '@/utils/request'

//获取角色列表
export function GetRolesLest(data){
    return request({
        url:'/role/getRole',
        method: 'get',
        data,
        baseURL: 'http://47.103.201.174/'
    })
}

// 添加角色
export function AddRole(data){
    return request({
        url: '/role/insertRole?id=9&role=&describe=',
        method: 'post',
        data,
        baseURL: 'http://47.103.201.174/'
    })
}

// 修改角色信息
export function EditRoles(data){
    return request ({
        url:'/role/updataRole',
        method: 'post',
        data,
        baseURL:'http://47.103.201.174/'
    })
}

// 删除角色
export function DeleteRole(data){
    return request({
        url: '/role/deleteRole',
        method: 'post',
        data,
        baseURL: 'http://47.103.201.174/'
    })
}