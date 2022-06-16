<template>
  <el-card class="card-carousel">
    <el-carousel  class="push" :interval="4000" arrow="always">
      <el-carousel-item v-for="item in items" :key="item.id">
        <a :href=item.link target="_blank">
          <img :src=item.img alt="" class="carousel_img">
        </a>
        <h3>{{item.title}}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
export default {
  name: 'Carousel',
  data: function () {
    return {
      items: [{
        id: 1,
        title: '马达',
        img: '../../../static/img/carousel/6498ee82543c9fba0d93a33ee2b3b4c.jpg'
        // link: 'http://how2j.cn?p=50613'
      },
      {
        id: 2,
        title: '花贝',
        img: '../../../static/img/carousel/4ec5b33914329b841e8856bba1e64c5.jpg'
        // link: 'https://cn.vuejs.org/'
      },
      {
        id: 3,
        title: '草莓',
        img: '../../../static/img/carousel/1ba6a0b0d130e543632da53ced083f8.jpg'
        // link: 'http://element-cn.eleme.io/#/zh-CN'
      }]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: black;
  font-size: 15px;
  /*line-height: 300px;*/
  bottom: 43px;
  float: left;
  position: relative;
}

.card-carousel {
  margin: 0 auto;
  /*margin-left: 20px;*/
  width: 680px;
  height: 320px;
}

.push {
  /*margin-left: -15px;*/
}

.el-carousel__item:nth-child(2n) {
  background: black;
}

.el-carousel__item:nth-child(2n+1) {
  background: black;
}

.carousel_img {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
