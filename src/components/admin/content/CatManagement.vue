<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>猫咪管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <edit-form @onSubmit="loadCats()" ref="edit"></edit-form>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="cats"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{ props.row.abs }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="猫咪昵称（展开查看描述）"
          fit>
        </el-table-column>
        <el-table-column
          prop="variety"
          label="品种"
          width="100">
        </el-table-column>
        <el-table-column
          prop="scientificname"
          label="中文学名"
          fit>
        </el-table-column>
        <el-table-column
          prop="latinname"
          label="拉丁学名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="placeoforigin"
          label="原产地"
          fit>
        </el-table-column>
        <el-table-column
          prop="color"
          label="颜色"
          fit>
        </el-table-column>
        <el-table-column
          prop="birthdate"
          label="出生日期"
          fit>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="abs"-->
<!--          label="简介"-->
<!--          fit>-->
<!--        </el-table-column>-->
        <!--<el-table-column-->
          <!--prop="abs"-->
          <!--label="摘要"-->
          <!--show-overflow-tooltip-->
          <!--fit>-->
        <!--</el-table-column>-->
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editCat(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteCat(scope.row.id)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import EditForm from './EditForm'
export default {
  name: 'CatManagement',
  components: {EditForm},
  data () {
    return {
      cats: []
    }
  },
  mounted () {
    this.loadCats()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    deleteCat (id) {
      this.$confirm('此操作将永久删除该猫咪信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/admin/content/cats/delete', {id: id}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.loadCats()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editCat (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        nickname: item.nickname,
        variety: item.variety,
        scientificname: item.scientificname,
        latinname: item.latinname,
        placeoforigin: item.placeoforigin,
        color: item.color,
        birthdate: item.birthdate,
        abs: item.abs,
        varieties: {
          id: item.varieties.id.toString(),
          name: item.varieties.name
        }
      }
      // this.$refs.edit.category = {
      //   id: item.category.id.toString()
      // }
    },
    loadCats () {
      const _this = this
      this.$axios.get('/cats').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.cats = resp.data.result
          console.log(resp.data.result)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
