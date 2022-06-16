<template>
  <div class="quick-nav">
<!--    <img src="../../assets/logo/cat-g148837720_1920.png/" alt="" class="red">-->
    <a href="https://github.com/Antabot/White-Jotter/blob/master/README.md" target="_blank">
      <img src="../../assets/icon/icon5.png" alt="" class="readme">
    </a>
    <img src="../../assets/icon/icon7.png" alt="" class="spark">
    <img src="../../assets/logo/logo.png" alt="" class="logo">
  </div>
</template>

<script>
export default {
  name: 'QuickNav'
}
</script>

<style scoped>
.quick-nav {
  width: 303px;
  height: 318px;
  background-color: transparent;
}

.red {
  width: 280px;
  height: 260px;
  /*position: absolute;*/
  /*top: 150px;*/
  /*left: 700px;*/
}

.readme {
  width: 300px;
  height: 285px;
  position: absolute;
  margin-left: 50%;
  top: 300px;
  left: 230px;
}

.spark {
  position: absolute;
  margin-left: 50%;
  top: 100px;
  left: 20px;
}

.logo {
  width: 280px;
  position: absolute;
  margin-left: 50%;
  top: 50px;
  left: 210px;
}
</style>
