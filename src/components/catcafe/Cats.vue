<template>
  <div>
    <el-row style="height: 840px;">
      <!--<search-bar></search-bar>-->
      <el-tooltip effect="dark" placement="right"
                  v-for="item in cats"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.nickname}}</span> /
          <span>{{item.variety}}</span> /
          <span>{{item.birthdate}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="nickname">{{item.nickname}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  /**
   * 此组件用于显示图书
   * v-for 指令，之后可以使用动态渲染，这里我们用《三体》的内容作为一个默认值，先查看效果。
   * el-tooltip Element 提供的组件，用于展示鼠标悬停时的提示信息。参考 https://element.eleme.cn/2.0/#/zh-CN/component/tooltip
   * slot 插槽，及把标签中的内容插到父组件指定的地方，这里我们插入了 el-tooltip 的 content 中。上述文档中亦有描述。
   * 封面图像标签中，我们使用了 :src="item.cover" 这种写法，: 其实是 v-bind: 的缩写，用于绑定把标签的属性与 data 中的值绑定起来。
   * 搜索栏暂不理会
   * 分页使用 el-pagination 组件，目前只是样式。
   * 把 Books 组件放在 CatCafeIndex.vue 中
   */
  name: 'Cats',
  data () {
    return {
      cats: [
        {
          cover: require('../../assets/cats/美短.png'),
          nickname: '虎虎',
          variety: '美短',
          scientificname: '美国短毛猫',
          latinname: 'American Shorthair',
          placeoforigin: '美国',
          color: '银色条纹',
          birthdate: '2022-1-1',
          abs: '美国最早的家猫据说是随17世纪的移民来到新大陆的猫咪，接下来的几个世纪里，壮实而具有工作效率的猫咪扩散到整个美国，' +
            '它们大多是熟练的捕鼠能手而非家庭宠物。但到了20世纪初，一种庭院捕鼠猫的改良品种开始出现，被称为短毛家猫。' +
            '人们精心的繁育进一步改良了家猫品种，到20世纪60年代，该品种被更名为美国短毛猫，逐渐在纯种猫咪展览上吸引人们的注意力。' +
            '美国短毛猫健康而且性格坚忍，是适合几乎任何类型家庭的完美宠物。' +
            '美国短毛猫素以体格魁伟，骨骼粗壮，肌肉发达，生性聪明，性格温顺著称，是短毛猫类中大型品种。被毛厚密，毛色多达30种，' +
            '其中以银色条纹品种最为名贵'
        }
      ]
    }
  }
}
</script>

<style scoped>
.cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.nickname {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
</style>
