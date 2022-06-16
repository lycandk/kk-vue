<template>
  <el-menu
    default-active="1"
    class="eventitem"
    >
    <a href="#header-div">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">猫咪动态</span>
      </el-menu-item>
    </a>
    <a href="#update-card">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">猫咪大事件</span>
      </el-menu-item>
    </a>
    <a href="#slogan">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">联系我们</span>
      </el-menu-item>
    </a>
    <a href="#about">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">关于我们</span>
      </el-menu-item>
    </a>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu'
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.eventitem{
  text-align: left
}

</style>
