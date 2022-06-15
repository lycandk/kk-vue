// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入路由拦截
import store from './store'
// 引入ElementUI
import ElementUI from 'element-ui'
// 引入CSS
import 'element-ui/lib/theme-chalk/index.css'
// 引入mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// 使用ElementUI
Vue.use(ElementUI)
// 使用mavonEditor
Vue.use(mavonEditor)

// 使用 router.beforeEach()，意思是在访问每一个路由前调用。
router.beforeEach((to, from, next) => {
  // 在用户已登录且访问以 /admin 开头的路径时请求菜单信息
  if (store.state.username && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  // 已登录状态下访问 login 页面直接跳转到后台首页
  if (store.state.username && to.path.startsWith('/login')) {
    next({
      name: 'Dashboard'
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.username) {
      // 访问每个页面前都向后端发送一个请求，目的是经由拦截器验证服务器端的登录状态
      // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
      axios.get('/authentication').then(response => {
        if (response) {
          next()
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

/**
 * 判断state中adminmenus的长度，如果大于0表示已有数据，直接读取，否则请求后端menu接口
 * 防止重复触发加载菜单操作
 * @param router
 * @param store
 */
const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      const fmtRoutes = formatRoutes(resp.data.result)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

/**
 * AdminMenu 表，实际上包含了前端路由（router）与导航菜单需要的信息，
 * 从后台传来的数据，需要被整理成路由能够识别的格式。导航菜单倒是无所谓，赋给相应的属性就行。
 * @param routes 代表我们从后端获取的菜单列表。遍历这个列表，首先判断一条菜单项是否含子项，如果含则进行递归处理。
 * @returns {*[]}
 */
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    /**
     * 把路由的属性与菜单项的属性对应起来，其它的都好说，主要是 component 这个属性是一个对象，因此需要根据名称做出解析（即获取对象引用）。
     * 同时我们需要把组件导入进来，因此可以利用 Vue 的异步组件加载机制（也叫懒加载），在解析的同时完成导入。
     * @type {{path, component: fmtRoute.component, children: *[], nameZh, meta: {requireAuth: boolean}, name, iconCls}}
     */
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
