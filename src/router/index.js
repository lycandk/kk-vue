import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

Vue.use(Router)

// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  console.log(onReject + onResolve)
  // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    console.log(err)
    originalPush.call(this, location, onResolve, onReject)
  })
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  console.log(onReject + onResolve)
  // if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => {
    console.log(err)
    originalPush.call(this, location, onResolve, onReject)
  })
}
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
          // 在路由被访问时才会引入组件
          path: '/index',
          name: 'Index',
          component: () => import('../components/home/AppIndex')
        },
        {
          path: '/cats',
          name: 'CatCafe',
          component: () => import('../components/catcafe/CatCafeIndex')
        },
        {
          // 文章列表页面
          path: '/blog',
          name: 'Blog',
          component: () => import('../components/blog/Articles')
        },
        {
          // 文章详情页面
          path: '/blog/article',
          name: 'Article',
          component: () => import('../components/blog/ArticleDetails')
        },
        {
          // 图书编辑器路由
          path: '/admin/content/editor',
          name: 'Editor',
          component: () => import('../components/admin/content/ArticleEditor'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('../components/admin/dashboard/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]
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
          component: () => import('../components/home/AppIndex')
        },
        {
          path: '/cats',
          name: 'CatCafe',
          component: () => import('../components/catcafe/CatCafeIndex')
        },
        {
          path: '/blog',
          name: 'Blog',
          component: () => import('../components/blog/Articles')
        },
        {
          path: '/blog/article',
          name: 'Article',
          component: () => import('../components/blog/ArticleDetails')
        },
        {
          path: '/admin/content/editor',
          name: 'Editor',
          component: () => import('../components/admin/content/ArticleEditor'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/admin/AdminIndex'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: () => import('../components/admin/dashboard/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
