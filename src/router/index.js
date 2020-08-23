import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    // {
    //   path:'/logout',
    //   component: ()=> import('@/views/login/index'),
    //   hidden:true
    // },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    {
        path: '/users',
        component: Layout,
        redirect: '/users/usermange',
        name: 'Users',
        meta: { title: '用户中心', icon: 'user' },
        children: [{
                path: 'usermange',
                name: 'Usermange',
                component: () =>
                    import ('@/views/usermange/index'),
                meta: { title: '用户管理' }
            },
            {
                path: 'rolesmange',
                name: 'Rolesmange',
                component: () =>
                    import ('@/views/rolesmange/index'),
                meta: { title: '角色管理' }
            }
        ]
    },
    // {
    //   path: '/users',
    //   component: Layout,
    //   redirect: 'users/userslist',
    //   name: 'Users',
    //   meta: { title: '用户中心', icon: 'user'},
    //   children: [
    //     {
    //       path: 'userslist',
    //       name: 'Userslist',
    //       component: () => import('@/views/userslist/index'),
    //       meta: { title: '用户列表'}
    //     }
    //   ]
    // },

    {
        path: '/goods',
        component: Layout,
        // redirect: '/goods/goodslist',
        name: 'Goods',
        meta: { title: '商品中心', icon: 'goods' },
        children: [{
                path: 'goodslist',
                name: 'Goodslist',
                component: () =>
                    import ('@/views/goods/goodslist/index'),
                meta: { title: '商品列表' }
            },
            // {
            //   path: 'goodsmanage',
            //   name: 'Goodsmanage',
            //   component: () => import('@/views/goods/goodsmanage/index'),
            //   meta: { title: '商品管理'}
            // },
        ]
    },

    {
        path: '/order',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Order',
            component: () =>
                import ('@/views/order/index'),
            meta: { title: '订单中心', icon: 'order' }
        }]
    },

    {
        path: '/credit',
        component: Layout,
        name: 'credit',
        meta: { title: "积分中心", icon: 'credit' },
        children: [{
            path: 'classification',
            name: 'Credit',
            component: () =>
                import ('@/views/credit/classification/index'),
            meta: { title: '积分分类', icon: 'credit' }
        }, {
            path: 'list',
            name: 'Credit',
            component: () =>
                import ('@/views/credit/list/index'),
            meta: { title: '积分列表', icon: 'credit' }
        }]
    },

    {
        path: '/logistical',
        component: Layout,
        children: [{
                path: 'index',
                name: 'Logistical',
                component: () =>
                    import ('@/views/logistical/index'),
                meta: { title: '物流中心', icon: 'logistical' }
            },
            {
                path: 'addInformation',
                name: 'information',
                component: () =>
                    import ('@/views/logistical/addInformation'),
                meta: { title: '添加信息', icon: 'logistical' },
                hidden: true
            },
            {
                path: 'edit',
                name: 'editIndex',
                component: () =>
                    import ('@/views/logistical/edit'),
                meta: { title: '编辑内容', icon: 'logistical' },
                hidden: true
            }
        ]
    },

    {
        path: '/ad',
        component: Layout,
        // redirect: '/ad/adv_position',
        name: 'Ad',
        meta: { title: '广告中心', icon: 'el-icon-picture' },
        children: [{
                path: 'adv_position',
                name: 'Adv_position',
                component: () =>
                    import ('@/views/adv_position/index'),
                meta: { title: '广告位管理' }
            },
            {
                path: 'adv',
                name: 'Adv',
                component: () =>
                    import ('@/views/adv/index'),
                meta: { title: '广告管理' }
            },
            {
                path: '/ad/adv_position/addform',
                hidden: true,
                name: 'addform',
                component: () =>
                    import ('@/views/addform/index'),
                meta: { title: 'Addform' }
            },
            {
                path: '/ad/adv_position/editform',
                hidden: true,
                name: 'editform',
                component: () =>
                    import ('@/views/editform/index'),
                meta: { title: 'editform' }
            },
            {
                path: '/ad/adv_position/addchild',
                hidden: true,
                name: 'addchild',
                component: () =>
                    import ('@/views/addchild/index'),
                meta: { title: 'addchild' }
            }, {
                path: '/ad/adv_position/editchild',
                hidden: true,
                name: 'editchild',
                component: () =>
                    import ('@/views/editchild/index'),
                meta: { title: 'editchild' }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router