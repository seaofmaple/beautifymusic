const mutations = {
  //改变登录状态
  changeLoginState(state, payload) {
    state.isLogin = payload
  },
  //登录信息
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  //添加用户的私人歌单
  addPrivatePlayList(state, payload) {
    state.privatePlayList = payload
  },
  //添加搜索历史
  incrementSearchHistory(state,searchContent) {
    for(let i of state.searchHistory) {
      if(i == searchContent) return;
    }
    state.searchHistory.unshift(searchContent)
  },
  //删除搜索历史
  deleteHistory(state) {
    state.searchHistory = []
  },
  //暂停播放按钮 
  isPlayButton(state, payload) {
    state.isPlaying = payload
  },
  //改变当前播放的音乐
  changeCurrentMusic(state, music) {
    state.currentMusic = music
    state.isPlaying = true
  },
  //给播放列表添加音乐
  addMusicToPlayList(state, music) {
    for(let id of state.playList) {
      if(id == music) return;
    }
    state.playList.push(music)
  },
  //向播放历史列表里面添加记录
  addMusicToPlayHistory(state, music) {
    for(let id of state.playHistory) {
      if(id == music) return;
    }
    state.playHistory.push(music)
  },
  //清空播放历史
  clearPlayHistory(state) {
    state.playHistory = []
  },
  //清空播放列表
  clearPlayList(state) {
    state.playList = []
  },
  // 保存当前播放进度
  saveNowDuration(state, nowDuration) {
    state.nowDuration = nowDuration
},
}

export default mutations