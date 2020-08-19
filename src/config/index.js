/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'http://server3.luronghui.cn';
let routerMode = 'hash';
let imgBaseUrl;


// 生产环境配置
let devConfig = {
    baseUrl: 'http://server3.luronghui.cn',
    imgBaseUrl: 'http://152.136.111.216:8002',
}

// 上线环境配置
let prodConfig = {
    baseUrl: 'http://server3.luronghui.cn',
    imgBaseUrl: 'http://152.136.111.216:8001',
}

// // 开发环境
if (process.env.NODE_ENV == 'development') {
    baseUrl = devConfig.baseUrl;
    imgBaseUrl = devConfig.imgBaseUrl;
    // 生产环境
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = prodConfig.baseUrl;
    imgBaseUrl = prodConfig.imgBaseUrl;
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}