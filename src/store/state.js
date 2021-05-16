const state = {
  //当前登录状态
  isLogin: sessionStorage.getItem('isLogin') ? JSON.parse(sessionStorage.getItem('isLogin')) : false,
  //当前用户信息
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
  //用户私人歌单
  privatePlayList: sessionStorage.getItem('privatePlayList') ? JSON.parse(sessionStorage.getItem('privatePlayList')) : [],
  //搜索历史
  searchHistory: [],
  //当前正在播放的音乐的id
  currentMusic: 0,
  //是否正在播放
  isPlaying: false,
  //播放列表
  playList: [],
  //播放历史
  playHistory: [],
  //当前歌曲的进度
  nowDuration: 0
}

export default state