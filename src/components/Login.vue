<template>
  <body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login-title">系统登陆</h3>
    <el-form-item>
      <el-input v-model="loginForm.username" auto-complete="off" placeholder="用户名" type="text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="loginForm.password" auto-complete="off" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
    <el-form-item style="width: 100%">
      <el-button style="width: 100%;background: #A5CAF1;border: none; " type="primary" v-on:click="login">登录</el-button>
      <router-link to="register"><el-button type="primary" style="width: 100%;background: #A5CAF1;border: none; ">注册</el-button> </router-link>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      checked: true,
      loginForm: {
        username: 'admin',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    /** 加入前端拦截器后：
     * 修改后的逻辑如下：
     * 1.点击登录按钮，向后端发送数据
     * 2.受到后端返回的成功代码时，触发 store 中的 login() 方法，把 loginForm 对象传递给 store 中的 user 对象
     * （*这里只是简单的实现，在后端我们可以通过用户名和密码查询数据库，获得 user 表的完整信息，比如用户昵称、用户级别等，返回前端，并传递给 user 对象，以实现更复杂的功能）
     * 3.获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
     */
    login () {
      const _this = this
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // var data = this.loginForm
            this.$alert('登录成功', '提示', {
              confirmButtonText: '确定'
            })
            _this.$store.commit('login', _this.loginForm)
            const path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #FEFFFF;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

#poster {
  background: url("../assets/loginimg/zhang-kaiyv-qRpvmxoZsek-unsplash.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0;
  border: 0
}
</style>
