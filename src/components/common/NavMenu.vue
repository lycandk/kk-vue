<template>
  <el-menu
    :default-active="$route.path"
    active-text-color="red"
    background-color="white"
    mode="horizontal"
    router
    style="min-width: 1300px"
    text-color="#222">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
    <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
    <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Kitty Kitty - Record Your Kitty</span>
  </el-menu>
</template>

<script>
export default {
  /**
   * common 文件夹，用来存储公共的组件
   * 打开 Element 的文档，找到 NavMenu 组件相关内容：
   * https://element.eleme.cn/2.0/#/zh-CN/component/menu
   * 主要有顶栏、侧栏两种导航样式，我们选择顶栏型，点击显示代码
   * <el-menu> 标签中开启了 router 模式: 启用该模式会在激活导航时以index为path进行路由跳转
   */
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '猫咖'},
        {name: '/blog', navItem: '猫咪笔记'},
        {name: '/cats', navItem: '猫咪们'},
        {name: '/login', navItem: '管理中心'}
      ]
    }
  },
  methods: {
    logout () {
      const _this = this
      this.$axios.get('/logout').then(response => {
        if (response.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      })
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}

.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
</style>
