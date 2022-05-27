<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <cats class="cats-area"></cats>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
import Cats from './Cats'

export default {
  /**
   * CatCafeIndex.vue，作为猫咪页面Cats.vue的根组件
   * 使用了 Element 提供的 Container 布局容器，把整个页面分为了侧边栏和主要区域两个部分
   * 配置这个页面的路由，修改 router/index.js
   * 引用SideMenu侧边栏组件
   */
  name: 'CatCafeIndexIndex',
  components: {SideMenu, Cats}

}
</script>

<style scoped>
.cats-area {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
