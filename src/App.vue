<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
// import Login from './components/Login'

export default {
  name: 'App'
}
</script>

<style>
/*在App.vue中将样式中默认的margin-top 改为0，使得页面顶部不留白*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
/* 在App.vue中加入body样式，使得背景图片四周不会留有空白*/
body{
  margin:0;
  padding:0;
  border:0
}
</style>
