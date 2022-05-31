<template>
  <div>
    <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>
    <el-dialog
      title="添加/修改猫咪信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <ImgUpload @onUpload="uploadImag" ref="imgUpload"></ImgUpload>
        </el-form-item>
        <el-form-item label="品种" :label-width="formLabelWidth" prop="variety">
          <el-input v-model="form.variety" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="颜色" :label-width="formLabelWidth" prop="color">
          <el-input v-model="form.color" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthdate">
          <el-input v-model="form.birthdate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文学名" :label-width="formLabelWidth" prop="scientificname">
          <el-input v-model="form.scientificname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拉丁学名" :label-width="formLabelWidth" prop="latinname">
          <el-input v-model="form.latinname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原产地" :label-width="formLabelWidth" prop="placeoforigin">
          <el-input v-model="form.placeoforigin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品种" :label-width="formLabelWidth" prop="vid">
          <el-select v-model="form.varieties.id" placeholder="请选择品种">
            <el-option label="中华田园猫" value="1"></el-option>
            <el-option label="英短" value="2"></el-option>
            <el-option label="美短" value="3"></el-option>
            <el-option label="布偶" value="4"></el-option>
            <el-option label="暹罗" value="5"></el-option>
            <el-option label="豹猫" value="6"></el-option>
            <el-option label="缅因猫" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input  type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>/**
 此组件增加或者修改图书的弹出表单
 */
import ImgUpload from './ImgUpload'

export default {
  name: 'EditForm',
  components: {ImgUpload},
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        nickname: '',
        cover: '',
        variety: '',
        color: '',
        birthdate: '',
        scientificname: '',
        latinname: '',
        placeoforigin: '',
        abs: '',
        varieties: {
          id: '',
          name: ''
        }
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    /**
     * 由@close触发
     * 目的是在关闭输入框时清空原来的内容。不然如果先修改一本书，又点击添加，表单里的内容会仍旧存在
     */
    clear () {
      this.form = {
        id: '',
        nickname: '',
        cover: '',
        variety: '',
        color: '',
        birthdate: '',
        scientificname: '',
        latinname: '',
        placeoforigin: '',
        abs: '',
        varieties: {
          id: '',
          name: ''
        }
      }
      // 此处解决没有触发到ImgUpload中的clear方法，导致上传后关闭结果未被清空的问题
      this.$refs.imgUpload.clear()
    },
    /**
     * 核心的方法是 onSubmit，提交数据，并触发父组件中定义的 onSubmit 事件，
     * 而这个事件对应的方法则是 loadBooks()，即查询出所有的书籍
     */
    onSubmit () {
      this.$axios
        .post('/cats', {
          id: this.form.id,
          nickname: this.form.nickname,
          cover: this.form.cover,
          variety: this.form.variety,
          color: this.form.color,
          birthdate: this.form.birthdate,
          scientificname: this.form.scientificname,
          latinname: this.form.latinname,
          placeoforigin: this.form.placeoforigin,
          abs: this.form.abs,
          varieties: this.form.varieties
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    },
    /**
     * 引用ImgUpload里面的data中的url
     */
    uploadImag () {
      this.form.cover = this.$refs.imgUpload.url
    }
  }
}
</script>

<style scoped>
.el-icon-circle-plus-outline {
  margin: 50px 0 0 20px;
  font-size: 100px;
  float: left;
  cursor: pointer;
}
</style>
