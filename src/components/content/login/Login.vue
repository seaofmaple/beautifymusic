<template>
  <div id="login">
    <i class="el-icon-close" @click="closeLogin"></i>
    <div class="top-phone">
      <div class="el-icon-mobile-phone"></div>
    </div>
    <form class="login-form">
      <div class="user-name">
        <i class="el-icon-mobile-phone phone"></i>
        <input type="text" placeholder="请输入手机号" v-model="login_form.phone">
      </div>
      <div class="password">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="请输入密码" v-model="login_form.password" autocomplete>
      </div>
      <div class="submit" @click="toLogin">登录</div>
    </form>
  </div>
</template>

<script>
import { checkLogin,
         getUserPrivatePlayList } from '../../../network/login'
export default {
  name: 'Login',
  methods: {
    closeLogin() {
      this.$emit('close')
    },
    toLogin() {
      checkLogin(this.login_form.phone, this.login_form.password).then(res => {
        if(res.code == 200) {
          this.$store.commit('setUserInfo', res.profile)
          sessionStorage.setItem('userInfo', JSON.stringify(res.profile))
          sessionStorage.setItem('isLogin', JSON.stringify(true))
          sessionStorage.setItem('token', JSON.stringify(res.token))
          this.$store.commit('changeLoginState', true)
          this.__getUserPrivatePlayList(res.profile.userId)
        } else {

        }
      })
    },
    __getUserPrivatePlayList(uid) {
      getUserPrivatePlayList(uid).then(res => {
            this.$store.commit('addPrivatePlayList', res.playlist)
            sessionStorage.setItem('privatePlayList', JSON.stringify(res.playlist))
          })
    }
  },
  data() {
    return {
      login_form: {
        phone: '',
        password: ''
      }
    }
  }
}

</script>
<style scoped>
#login{
  position: absolute;
  right: 500px;
  top: 70px;
  box-shadow: 0 2px 2px 2px #a8a6a6;
  z-index: 10;
  width: 500px;
  height: 500px;
  background-color: #ffffff;
}
.top-phone {
  font-size: 150px;
  width: 400px;
  height: 200px;
  position: absolute;
  color: #db4545;
  top: 100px;
  left: 50px;
  background-image: url('../../../assets/imgs/login.png');
}
.top-phone div{
  position: absolute;
  left: 120px;
}
.el-icon-close {
  cursor: pointer;
  font-size: 30px;
  float: right;
}
input {
  outline: none;
  margin-top: 10px;
  padding-left: 20px;
  width: 200px;
  height: 30px;
}
.submit{
  background-color: rgb(216, 68, 68);
  border-radius: 2px;
  padding: 5px;
  width: 150px;
  text-align: center;
  margin-left: 50px;
  font-size: 14px;
  margin-top: 15px;
  color: #ffffff;
}
.phone, .el-icon-lock{
  position: relative;
  left: 20px;
}
.login-form {
  position: absolute;
  left: 125px;
  top: 300px;
}
</style>