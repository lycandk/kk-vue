<template>
  <el-upload class="img-upload"
             ref="upload"
             action="http://localhost:8443/api/admin/content/cats/covers"
             :on-preview="handlePreview"
             :on-remove="handleRemove"
             :before-remove="beforeRemove"
             :on-success="handleSuccess"
             multiple
             :limit="1"
             :on-exceed="handleExceed"
             :file-list="fileList" >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
/**
 * 上传文件的逻辑很简单：前端向后端发送 post 请求，后端对接收到的数据进行处理（压缩、格式转换、重命名等），
 * 并保存到服务器中指定的位置，再把该位置对应的 URL 返回给前端即可。
 * 利用 element 提供的组件 <el-upload> 可以轻松搞定前端。该组件的详细文档地址如下：
 * https://element.eleme.cn/#/zh-CN/component/upload
 * action 属性指定了上传操作对应的 api。各种事件钩子可以顾名思义。我们主要用了 :before-remove、:on-success、:on-exceed 几种，
 * 其它的可以根据需要自行编写。
 * 还有一个重要的属性是 multiple，和 :limit 属性配合使用可以检测上传文件的数量。
 * 根据 :on-success 事件对应的方法，当该组件接收到后端返回的成功信息时，会触发父组件 EditForm.vue 的 onUpload 事件，
 * 把接收到的 URL 赋给图书信息表单的 cover 字段，这个 URL 需要我们在后端根据资源存放位置生成。提交后，数据库里就会保存服务器上的资源对应的 URL。
 */
export default {
  name: 'ImgUpload',
  data () {
    return {
      fileList: [],
      url: ''
    }
  },
  methods: {
    handleRemove (file, fileList) {
    },
    handlePreview (file) {},
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ?`)
    },
    handleSuccess (response) {
      this.url = response
      this.$emit('onUpload')
      this.$message('上传成功')
    },
    clear () {
      this.$refs.upload.clearFiles()
    }
  }
}

</script>

<style scoped>

</style>
