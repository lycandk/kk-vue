<template>
  <el-menu
    active-text-color="red"
    class="varieties"
    default-active="0"
    @select="handleSelect">
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">中华田园猫</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">英短</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">美短</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-menu"></i>
      <span slot="title">布偶</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-menu"></i>
      <span slot="title">暹罗</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-menu"></i>
      <span slot="title">豹猫</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-menu"></i>
      <span slot="title">缅因猫</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  /**
   * 侧边栏组件
   */
  name: 'SideMenu',
  data () {
    return {
      vid: ''
    }
  },
  methods: {
    /**
     * 实现了点击分类引发查询事件
     * @param key
     * @param keyPath
     */
    handleSelect (key, keyPath) {
      this.vid = key
      this.$emit('indexSelect')
    }
  }
}
</script>

<style scoped>
.varieties {
  /**
  在CatCafeIndex.vue里面用的是<el-aside>是不用设置位置属性会自动显示在边框位置的。
  因此以下css注释掉
   */
  /*position: fixed;*/
  /*margin-left: 50%;*/
  /*left: -600px;*/
  /*top: 100px;*/
  /*width: 150px;*/
  /**导航栏图标对齐
   */
  text-align: left;
}
</style>
