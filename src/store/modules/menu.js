import { fecthRouter } from '@/api/menu'
import { traverseRoutes } from '@/utils/route'
import { constantRoutes } from '@/router'
const state = {
  routes: [],
  addRoutes: [],
  constantRoutes:constantRoutes
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  getSideMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTES', []);
      resolve([])
      // 路由获取
      // fecthRouter().then(response => {
      //   let menus = response.data
      //   menus.push({ path: '*', redirect: '/404', hidden: true })
      //   let remoteroutes = traverseRoutes(menus)
        // commit('SET_ROUTES', remoteroutes);
      //   resolve(remoteroutes);
      // }).catch(error => {
      //   console.log('获取菜单失败')
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
