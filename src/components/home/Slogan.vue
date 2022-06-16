<template>
  <div>
    <el-card class="box-card">
      <div style="font-size: 45px;color: azure;white-space: nowrap">Kitty Kitty - Record Your Kitty</div>
      <a href="https://github.com/lycandk" target="_blank">
        <img src="../../assets/icon/icon6.png" alt="" class="git-link">
      </a>
      <a href="https://blog.csdn.net/qq_44455767" target="_blank">
        <img src="../../assets/icon/csdn.png" alt="" class="csdn-link">
      </a>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Slogan'
}
</script>

<style scoped>
.box-card {
  width: 100%;
  height: 150px;
  background-color: #222;
  text-align: center;
  /*margin-top: 5px;*/
  /*margin-left: 20px;*/
  margin: 0 auto;
}

.slogan {
  width: 100%;
}

.git-link {
  width: 80px;
  /*position: absolute;*/
}

.csdn-link {
  width: 65px;
  /*position: absolute;*/
  margin-bottom: 7px;
  margin-left: 20px;
}
</style>
