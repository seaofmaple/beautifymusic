<template>
  <div id="home-top-bar">
    <img src="../../../assets/imgs/header.png" alt="">
    <span class="title">beautify-music</span>
    <i class="el-icon-arrow-left" style="cursor: pointer;" @click="back"></i>
    <input type="text" placeholder="搜索歌曲" 
    autocomplete="off" v-model="inputValue" ref="searchVal" @focus="getFocus">
    <i class="elsearch el-icon-search" @click="search"></i>
    <div class="hot-songs" v-show="isShow">
      <div class="search-history" v-show="searchList.length !== 0">
        <span class="search-title">搜索历史</span>
        <i class="el-icon-delete" @click="deleteSearch"></i>
        <div class="history-item">
          <div v-for="(item, index) in searchList" :key="index" class="history-detail">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="search-history-item"></div>
      <div class="hot-ranking">热搜榜</div>
      <div class="hot-ranking-item">
        <div v-for="(item,index) in hotSearch" :key="index" class="hot-words" @click="hotSearchClick(item.searchWord)">
          <div :class="{topThree: index < 3}"
          class="left">{{index + 1}}</div>
          <div class="right">
            <span :class="{topword: index < 3}">{{item.searchWord}}</span>
            <span class="score">{{item.score}}</span>
            <div v-if="item.iconUrl" class="icon">
              <img :src="item.iconUrl" alt="">
            </div>
            <div class="content">{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="login" @click="loginClick" v-if="!LoginState">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <div class="login-info">未登录</div>
    </div>
    <div class="login_active" @click="logoutClick" v-else>
        <el-image :src="userInfo.avatarUrl"
        style="width: 35px; height: 35px; border-radius: 50%;
        position: absolute; right:200px; top:15px;"></el-image>
        <div class="login-name">{{userInfo.nickname}}</div>
    </div>
    <div class="logout-page" v-if="isLogout">
      <el-image :src="userInfo.avatarUrl"
        style="width: 55px; height: 55px; border-radius: 50%;
        position: absolute; right:220px; top:15px;"></el-image>
        <div  style="width: 105px; height: 55px;
        position: absolute; right:90px; top:30px;"
        >{{userInfo.nickname}}</div>
      <div class="level">
        <i class="el-icon-medal"></i>
        <span>等级:</span>
        <span class="level-number">Lv.{{level}}</span>
      </div>
      <div class="logout">
        <i class="el-icon-switch-button"></i>
        <span>退出登录</span>
      </div>
    </div>
    <Login v-if="isLogin && !LoginState" @close="isLogin = false"></Login>
  </div>
</template>

<script>
import { getHotSearch } from '../../../network/home'
import { getUserDetail } from '../../../network/login'

import { _debounce, _throttle } from '../../../utils/index'

import Login from '../../../components/content/login/Login';
export default {
  name: 'HesdTopBar',
  data() {
    return {
      value: [],
      //搜索信息
      inputValue: '',
      //热搜列表
      hotSearch: [],
      //用户等级
      level: 0,
      isShow: false,
      isClose: false,
      isLogin: false,
      isLogout: false
    }
  },
  components: {
    Login
  },
  computed: {
    searchList() {
      return this.$store.getters.historySearch
    },
    userInfo() {
      return this.$store.getters.showUserInfo
    },
    LoginState() {
      return this.$store.getters.LoginState
    }
  },
  methods: {
    getFocus() {
      this.isShow = true
    },
    // getBlur() {
    //   this.isShow = false
    // },
    back() {
      this.$router.back()
    },
    //点击热搜榜
    hotSearchClick(value) {
      this.$store.dispatch('incrementSearchHistory', value)
      this.$router.push(`/home/searchPage?keyWord=${value}`)
      this.inputValue = value
      this.isShow = false
    },
    logoutClick() {
      this.isLogout = !this.isLogout
      getUserDetail(this.userInfo.userId).then(res => {
        this.level = res.level
      })
    },
    //让搜索按钮在一定时间里触发一次
    search: _throttle(function() {
      if(this.inputValue != '') {
        this.$store.dispatch('incrementSearchHistory', this.inputValue)
        this.$router.push(`/home/searchPage?keyWord=${this.inputValue}`)
        this.isShow = false
      } else {
        alert("搜索不能为空")
      }
      },1000),
    deleteSearch() {
      if(confirm('你确定要删除吗?')) {
        this.$store.commit('deleteHistory')
      }
    },
    __getHotSearch() {
      getHotSearch().then(res => {
        this.hotSearch = res.data
      })
    },
    loginClick() {
      this.isLogin = true
    }
  },
  created() {
    this.__getHotSearch()
  }
}

</script>
<style scoped>
#home-top-bar {
  background-color: #d15050;
  height: 60px;
}
#home-top-bar img{
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-left: 20px;
}
#home-top-bar .title{
  font-size: 30px;
  color: #fff;
  margin-top: 5px;
}
input{
  width: 225px;
  height: 23px;
  border-radius: 12px;
  position: absolute;
  top: 25px;
  margin-left: 150px;
  opacity: 0.5;
  outline: none;
  line-height: 23;
}
.el-icon-arrow-left{
  margin-left: 80px;
  position: absolute;
  top: 33px;
}
.elsearch {
  position: absolute;
  left: 635px;
  top: 32px;
  cursor: pointer;
  opacity: 0.5;
  color: aliceblue;
}
.login{
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 150px;
}
.login-info {
  color: #fff;
  width: 50px;
  position: absolute;
  top: 10px;
  right: -50px;
}
.topword {
  font-weight: bold;
}
.hot-songs {
  width: 400px;
  height: 500px;
  overflow: auto;
  position: absolute;
  left: 420px;
  top: 60px;
  border-radius: 5px 5px 5px 0;
  z-index: 10;
  background: #ffffff;
}
.search-history {
  font-weight: 100;
  color: #5a5959;
}
.el-icon-delete {
  margin-left: 15px;
  cursor: pointer;
}
.hot-ranking {
  margin: 0;
  font-weight: 100;
  color: #5a5959;
}
.icon img {
  width: 30px !important;
  height: 15px !important;
  float:right;
  
}
.hot-words {
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
  width: 380px;
  height: 50px;
  display: flex;
}
.hot-words:hover {
  background-color: rgb(235, 233, 233);
}
.topThree {
  color:#d42828;
  font-weight: bold;
}
.left {
  margin-left: 15px;
  margin-top: 10px;
  margin-right: 15px;
}
.right {
  width: 360px;
}
.score {
  margin-left: 20px;
  font-size: 12px;
  color: #a8a8a8;
}
.content {
  margin-top: 5px;
  font-size: 12px;
}
.history-item {
  display: flex;
  flex-wrap: nowrap;
}
.history-detail {
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  margin-left: 20px;
  border: 1.5px solid rgb(133, 133, 133);
}
.history-detail:hover {
  background-color: rgb(238, 237, 237);
}
.hot-ranking-item {
  margin-top: 10px;
}
.search-title, .hot-ranking {
  margin-left: 10px;
}
.search-history-item {
  margin-top: 20px;
}
.login-name {
  padding: 2px;
  position: absolute;
  cursor: pointer;
  right:130px; 
  top:20px;
  font-weight: 100;
  color: #ffffff;
  font-size: 12px;
}
.logout-page {
  width: 300px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  right: 20px;
  top: 60px;
  z-index: 20;
  box-shadow: 1px 1px 1px 0;
  border-radius: 5px;
}
.level {
  margin-top: 100px;
  height: 50px;
  font-size: 14px;
  font-weight: 100;
  line-height: 50px;
}
.logout {
  border-top: 1px solid rgb(150, 150, 150);
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 100;
  line-height: 50px;
}
.el-icon-switch-button,.el-icon-medal {
  font-size: 20px;
  margin-right: 5px;
  color: #474646;
}
.logout:hover {
  background-color: rgb(231, 229, 229);
  color: #ffffff;
  border-radius: 0 0 5px 5px;
  text-shadow: 1px 1px 1px #000;
}
.level-number {
  float: right;
  margin-right: 50px;
  font-weight: bold;
  font-style: italic;
  color: #838282;
}
</style>