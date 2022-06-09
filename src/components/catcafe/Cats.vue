<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <view-switch class="switch"></view-switch>
      <el-tooltip v-for="item in cats.slice((currentPage - 1) *pagesize, currentPage*pagesize)" :key="item.id"
                  effect="dark"
                  placement="right">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{ item.nickname }}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{ item.scientificname }}</span> /
          <span>{{ item.color}}</span> /
          <span>{{ item.birthdate }}</span>
        </p>
        <p slot="content" class="abstract" style="width: 300px">{{ item.abs }}</p>
        <el-card bodyStyle="padding:10px" class="cat"
                 shadow="hover" style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px">
          <div class="cover">
            <img :src="item.cover" alt="猫咪图片">
          </div>
          <div class="info">
            <div class="nickname">
              <a href="">{{ item.nickname }}</a>
            </div>
<!--            <i class="el-icon-delete" @click="deleteCat(item.id)"></i>-->
          </div>
          <div class="variety">{{ item.varieties.name}}</div>
        </el-card>
      </el-tooltip>
<!--      <edit-form @onSubmit="loadCats()" ref="edit"></edit-form>-->
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="cats.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
// import EditForm from './EditForm'
import SearchBar from './SearchBar'
import ViewSwitch from './ViewSwitch'

export default {
  /**
   * 此组件用于显示猫咪
   * v-for 指令，之后可以使用动态渲染
   * el-tooltip Element 提供的组件，用于展示鼠标悬停时的提示信息。参考 https://element.eleme.cn/2.0/#/zh-CN/component/tooltip
   * slot 插槽，及把标签中的内容插到父组件指定的地方，这里我们插入了 el-tooltip 的 content 中。上述文档中亦有描述。
   * 封面图像标签中，我们使用了 :src="item.cover" 这种写法，: 其实是 v-bind: 的缩写，用于绑定把标签的属性与 data 中的值绑定起来。
   * 搜索栏暂不理会
   * 分页使用 el-pagination 组件，目前只是样式。
   * 把 Books 组件放在 CatCafeIndex.vue 中
   */
  /** 前端核心功能
   * 添加搜索框
   * 添加增加、删除按钮
   * 完善分页功能
   * 构造增、删、改、查对应的请求
   */
  name: 'Cats',
  // components: {EditForm, SearchBar},
  components: {SearchBar, ViewSwitch},
  data () {
    return {
      cats: [],
      currentPage: 1,
      pagesize: 17
    }
  },
  mounted: function () {
    /**
     * 打开页面，默认查询出所有猫咪并显示（即页面的初始化）
     * Vue 的 钩子函数 —— mounted。
     * mounted 即 “已挂载” ，所谓挂载，就是我们写的 Vue 代码被转换为 HTML 并替换相应的 DOM 这个过程，
     * 这个过程完事儿的时候，就会执行 mounted 里面的代码
     */
    this.loadCats()
  },
  methods: {
    /**
     * 加载所有猫咪信息
     */
    loadCats () {
      const _this = this
      this.$axios.get('/cats').then(resp => {
        if (resp && resp.status === 200) {
          _this.cats = resp.data.result
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    /**
     * 通过onSearch事件触发
     * 实现的只是初级的模糊查询，只能搜索出完全包含关键字的内容，而且顺序不能变。可改进
     */
    searchResult () {
      const _this = this
      this.$axios.get('/search?keyword=' + this.$refs.searchBar.keyword, {
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.cats = resp.data.result
          _this.currentPage = 1
        }
      })
    }
    // deleteCat (id) {
    //   this.$confirm('此操作将删除该猫咪信息，无法找回, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$axios.post('/delete', {id: id}).then(resp => {
    //       if (resp && resp.status === 200) {
    //         this.loadCats()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    //   // alert(id)
    // },
    /**
     * 负责弹出修改表单并渲染数据
     * @param item
     */
    // editCat (item) {
    //   this.$refs.edit.dialogFormVisible = true
    //   this.$refs.edit.form = {
    //     id: item.id,
    //     nickname: item.nickname,
    //     cover: item.cover,
    //     variety: item.variety,
    //     color: item.color,
    //     birthdate: item.birthdate,
    //     scientificname: item.scientificname,
    //     latinname: item.latinname,
    //     placeoforigin: item.placeoforigin,
    //     abs: item.abs,
    //     varieties: {
    //       id: item.varieties.id.toString(),
    //       name: item.varieties.name
    //     }
    //   }
    // }
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

.nickname {
  font-size: 14px;
  text-align: left;
}

.variety {
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
.el-icon-delete {
  cursor: pointer;
  float: right;
}

.switch {
  display: flex;
  position: absolute;
  left: 0px;
  top: 25px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
</style>
