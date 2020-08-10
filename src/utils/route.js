import _import from './_import_vue'
import Layout from '@/layout'
export function setSideMenus(Menus) {
  /* 存储的是Json 字符串*/
  localStorage.setItem('sideMenus', JSON.stringfy(Menus))
}

export function getSideMenus() {
  const strMenus = localStorage.getItem('sideMenus')
  return JSON.parse(strMenus)
}

export function traverseRoutes(menus) {

  let routes = menus.map(menu => {
    
    if (menu.component) {
      let name = menu.component;
      // menu.component = (resolve)=> require([`@/${name}`],resolve)
      if (name == 'Layout') {
        menu.component = Layout;
      } else {
        menu.component = _import(name)
      }

    }
    if (menu.children && menu.children.length > 0) {
      menu.children = traverseRoutes(menu.children);
    } else {
      delete menu.children;
    }
    return menu;
  })
  return routes;
}
