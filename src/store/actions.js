const actions = {
  incrementSearchHistory(context,searchContent) {
    setTimeout(() => {
      context.commit('incrementSearchHistory',searchContent)
    },1000)
  },
  // 保存进度条当前进度
  saveNowDuration({ commit }, payload) {
    commit('saveNowDuration', payload)
},
// 改变当前加载状态
isPlayButton({ commit }, payload) {
  commit('isPlayButton', payload)
},
}

export default actions