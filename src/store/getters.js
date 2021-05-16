const getters = {
  //登录状态
  LoginState(state) {
    return state.isLogin
  },
  //返回用户的信息
  showUserInfo(state) {
    return state.userInfo
  },
  //获取用户的私人歌单
  showPrivatePlayList(state) {
    return state.privatePlayList
  },  
  //搜索历史
  historySearch(state) {
    return state.searchHistory
  },
  //当前播放音乐id
  currMusic(state) {
    return state.currentMusic
  },
  //是否正在播放
  isPlay(state) {
    return state.isPlaying
  },
  //展示播放列表
  showPlayList(state) {
    return state.playList
  },
  //展示播放历史
  showPlayHistory(state) {
    return state.playHistory
  },
  //显示当前歌曲的已播放时间
  showNowDuration(state) {
    return state.nowDuration
  }
}

export default getters