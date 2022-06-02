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
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// 使用ElementUI
Vue.use(ElementUI)

// 使用 router.beforeEach()，意思是在访问每一个路由前调用。
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      axios.get('/authentication').then(response => {
        console.log(response)
        if (response.data) {
          next()
        } else {
          next({
            path: 'login',
            query: {
              redirect: to.fullPath
            }
          })
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
