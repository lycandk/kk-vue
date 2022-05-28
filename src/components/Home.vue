<template>
  <div>
    <NavMenu></NavMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'

export default {
  /**
   * -dev-NavMenu
   * 导航栏的要求很简单：
   * 能够在每个页面显示
   * 我们需要把导航栏放在其它页面的父页面中（对 Vue 来说就是父组件），之前我们讲过，App.vue 是所有组件的父组件，
   * 但把导航栏放进去不合适，因为我们的登录页面中不应该显示导航栏。
   * 为了解决这个问题，我们在 components 目录下直接新建一个组件，命名为 Home.vue
   * ——————————————————————————————————————————————————————————————————————————————————————————————————————————
   * Home.vue中放入NavMenu.vue
   */
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>

</style>
