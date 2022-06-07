import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import Home from '../components/Home'
import CatCafeIndex from '../components/catcafe/CatCafeIndex'
import Register from '../components/Register'
import AdminIndex from '../components/admin/AdminIndex'

Vue.use(Router)
// 为区分是否需要拦截,在需要拦截的路由中加一条元数据，设置一个 requireAuth 字段
export default new Router({
  mode: 'history',
  routes: [
    /**
     * 建立路由的父子关系。注意我们在一个组件中通过导入引用了其它组件，也可以称之为父子组件，
     * 但导航栏想要通过 <router-view/> 控制子组件的显示，则需要进行路由的相关配置。
     * 并没有把首页的访问路径设置为 /home/index，仍然可以通过 /index 访问首页，
     * 这样配置其实是感受不到 /home 这个路径的存在的。之后再添加新的页面，可以直接在 children 中增添对应的内容。
     */
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: AppIndex
        },
        {
          path: '/cats',
          name: 'CatCafe',
          component: CatCafeIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    { path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: AppIndex
        },
        {
          path: '/cats',
          name: 'CatCafe',
          component: CatCafeIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      }
    }
  ]
})
