<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu @indexSelect="listByVariety" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <cats class="cats-area" ref="catsArea"></cats>
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
  components: {SideMenu, Cats},
  methods: {
    /**
     * 实现按品种查询
     * 点击左侧导航栏，向后端发送一个带有参数的 get 请求，然后同样是修改 data 里的数据以实现动态渲染
     * 通过@indexSelect="listByVariety"，这个东西为 listByVariety() 方法设置了触发事件。
     * indexSelect事件在SideMenu中被handleSelect触发（$emit 方法即触发父组件中定义的事件），handleSelect则被@select 事件触发
     *
     * 总结：
     * 点击选择侧边导航栏的一个标签后-->
     *        触发SideMenu组件 <el-menu> 组件的 @select 事件，执行 handleSelect 方法
     *        handleSelect 方法触发 indexSelect 事件，并把 key，即 <el-menu-item> 标签的 index 属性的值赋给 data 中定义的属性，即分类码。
     *        父组件收到指令，执行事件对应的方法，即 listByVariety 方法
     *        发送请求，后端执行查询代码，返回数据，再通过 refs 修改 Cats组件的 data 以动态渲染页面。
     */
    listByVariety () {
      const _this = this
      const vid = this.$refs.sideMenu.vid
      /**
       *  url 的构造方式与后端接口对应
       * @type {string}
       */
      const url = 'varieties/' + vid + '/cats'
      this.$axios.get(url).then(resp => {
        if (resp.status === 200) {
          _this.$refs.catsArea.cats = resp.data
        }
      })
    }
  }

}
</script>

<style scoped>
.cats-area {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
