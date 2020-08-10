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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户中心', icon: 'user'}
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Goods',
        component: () => import('@/views/goods/index'),
        meta: { title: '商品中心', icon: 'goods'}
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单中心', icon: 'order'}
      }
    ]
  },

  {
    path: '/credit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Credit',
        component: () => import('@/views/credit/index'),
        meta: { title: '积分中心', icon: 'credit'}
      }
    ]
  },

  {
    path: '/logistical',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Logistical',
        component: () => import('@/views/logistical/index'),
        meta: { title: '物流中心', icon: 'logistical'}
      }
    ]
  },

  {
    path: '/ad',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Ad',
        component: () => import('@/views/ad/index'),
        meta: { title: '广告中心', icon: 'ad'}
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
