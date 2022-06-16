<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: bold;font-size: 20px">最近更新</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2022/6/16" placement="top">
          <el-card>
            <h4>草莓，马达半岁</h4>
            <p>2022/6/16</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/3/30" placement="top">
          <el-card>
            <h4>领养草莓</h4>
            <p>2022/3/30</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/3/24" placement="top">
          <el-card>
            <h4>马达，草莓三个月</h4>
            <p>2022/3/24</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/1/6" placement="top">
          <el-card>
            <h4>猫瘟高发期，小芝麻去世</h4>
            <p>2022/1/6</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/12/24" placement="top">
          <el-card>
            <h4>马达，小白，草莓出生</h4>
            <p>2021/12/24</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UpdateCard'
}
</script>

<style scoped>
.box-card {
  /*margin-top: 5px;*/
  /*margin-left: 20px;*/
  margin: 0 auto;
  width: 988px;
  height: 1050px;
  text-align: left;
}
</style>
