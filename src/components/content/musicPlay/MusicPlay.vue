<template>
  <div id="music-play">
    <div class="play-control">
      <img src="../../../assets/imgs/lastSong.svg" alt="" @click="lastSong">
      <img src="../../../assets/imgs/songStop.svg" alt="" v-show="!isPlaying" @click="play">
      <img src="../../../assets/imgs/songPlay .svg" alt="" v-show="isPlaying" @click="stop">
      <img src="../../../assets/imgs/nextSong.svg" alt="" @click="nextSong">
    </div>
    <div class="progress-bar">
      <audio :src="musicUrl" autoplay 
      @timeupdate="durationUpdate"
      @ended="getNextSong"
      ref="audio"></audio>
    </div>
    <div class="time-progress">
      <span class="left-time">{{musicDuration * 1000 | showTime}}</span>
      <el-slider
        class="time-progress-bar"
        v-model="musicDuration"
        :show-tooltip="false"
        :max="Math.floor(rightTime / 1000)"
        :step="1"
        @change="changeVolume"
      ></el-slider>
      <span class="right-time">{{rightTime | showTime}}</span>
    </div>
    <div class="volume">
      <img src="../../../assets/imgs/volume.svg"  v-show="volumeSize != 0" @click="muteVolume">
      <img src="../../../assets/imgs/mute.svg" v-show="volumeSize == 0" @click="cancelMute">
      <el-slider
        class="volum-progress"
        v-model="volumeSize"
        :max="100"
        :step="1"
        @change="changeVolume"
      ></el-slider>
    </div>
    <div class="play-style">
      <el-tooltip
      class="item"
      effect="light"
      content="顺序播放"
      placement="top"
      :open-delay="500">
        <div v-show="playStyle == 0" @click="changeStyle">
           <img src="../../../assets/imgs/orderPlay.svg">
        </div>
      </el-tooltip>
      <el-tooltip
      class="item"
      effect="light"
      content="列表循环"
      placement="top"
      :open-delay="500">
        <div v-show="playStyle == 1" @click="changeStyle">
           <img src="../../../assets/imgs/listPlay.svg">
        </div>
      </el-tooltip>
      <el-tooltip
      class="item"
      effect="light"
      content="单曲循环"
      placement="top"
      :open-delay="500">
        <div v-show="playStyle == 2" @click="changeStyle">
           <img src="../../../assets/imgs/singlePlay.svg">
        </div>
      </el-tooltip>
      <el-tooltip
      class="item"
      effect="light"
      content="随机播放"
      placement="top"
      :open-delay="500">
        <div v-show="playStyle == 3" @click="changeStyle">
           <img src="../../../assets/imgs/radomPlay.svg">
        </div>
      </el-tooltip>
    </div>
    <div class="plist-icon" @click="showPlistPage">
      <img src="../../../assets/imgs/plist.svg" alt="">
    </div>
    <div class="plist-page" v-if="isShowPlist">
      <div class="plist-nav">
        <span class="plist" :class="{'active': !isShowHlist}" @click="changePlist">播放列表</span>
        <span class="hlist" :class="{'active': isShowHlist}" @click="changeHlist">历史记录</span>
      </div>
      <div v-if="!isShowHlist">
        <PList :songs="songs" @clearAll="clearAll"></PList>
      </div>
      <div v-else>
        <HList  :playHistorySongs="playHistorySongs"></HList>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl,
         getSongDetail } from '../../../network/songListPage'

import PList from './PList'
import HList from './HList'
export default {
  name: 'MusicPlay',
  data() {
    return {
      musicUrl: '',
      //是否显示播放列表
      isShowPlist: false,
      //是否显示历史记录
      isShowHlist: false,
      //播放列表id
      ids: '',
      songs: [],
      //播放方式Size
      playStyle: 0,
      //音量大小
      volumeSize: 50,
      //当前音量
      nowVolume: 50,
      //播放历史id
      playHistoryIds: '',
      //播放历史
      playHistorySongs: [],
      //当前播放时长
      musicDuration: 0,
      //歌曲总时间
      rightTime: 0,
      //进度条是否被拖动
      isChange: false
    }
  },
  components: {
    PList,
    HList
  },
  methods: {
    showPlistPage() {
      this.isShowPlist = !this.isShowPlist
    },
    changePlist() {
      this.isShowHlist = false
    },
    changeHlist() {
      this.isShowHlist = true
    },
    changeStyle() {
      this.playStyle = (this.playStyle + 1) % 4
    },
    //音量改变时
    changeVolume() {
      this.nowVolume = this.volumeSize;
      this.$refs.audio.volume = this.volumeSize / 100;
    },
    //静音
    muteVolume() {
      this.volumeSize = 0;
      this.$refs.audio.volume = this.volumeSize / 100;
    },
    // 取消静音
    cancelMute() {
      this.volumeSize = this.nowVolume;
      this.$refs.audio.volume = this.volumeSize / 100;
    },
    //获取下一首歌
    getNextSong() {
      if(this.playList.length == 1) {
        this.$store.dispatch('isPlayButton', false)
      } else {
        let i = 0
        for(i; i < this.playList.length; i++) {
          if(this.$store.getters.currMusic == this.playList[i]) {
            break
          }
        }
        this.$store.commit('changeCurrentMusic', this.playList[i + 1])
      }
    },
    __getSongDetail() {
      for(let id of this.playList) {
        this.ids += id + ','
      }
      getSongDetail(this.ids.substr(0,this.ids.length - 1)).then(res => {
        this.songs = res.songs
      })
    },
    //更新当前时长
    durationUpdate() {
      if (this.isChange === true) return;
      this.musicDuration = Math.floor(this.$refs.audio.currentTime);
      this.$store.dispatch("saveNowDuration", this.musicDuration);
    },
    //暂停播放
    stop() {
      this.$refs.audio.pause();
      this.$store.dispatch('isPlayButton', false)
    },
    //继续播放
    play() {
      if(this.playList.length == 0) {
        alert("播放列表为空")
      } else if(this.isPlaying) {
        this.$store.commit('changeCurrentMusic', this.playList[0])
        this.$refs.audio.play();
        this.$store.dispatch('isPlayButton', true)
      } else {
        this.$refs.audio.play();
        this.$store.dispatch('isPlayButton', true)
      }
    },
    //上一首
    lastSong() {
      if(this.playList.length == 1) {
        alert("播放列表里面只有一首歌哦")
      } else {
        for(let i in this.playList) {
          if(this.$store.getters.currMusic == this.playList[i]) {
            if(i == 0) {
              alert("这是第一首歌哦")
            } else {
              this.$store.commit('changeCurrentMusic', this.playList[i - 1])
            }
          }
        }
      }
    },
    //下一首
    nextSong() {
      if(this.playList.length == 1) {
        alert("播放列表里面只有一首歌哦")
      } else {
        let i = 0
        for(i; i < this.playList.length; i++) {
          if(this.$store.getters.currMusic == this.playList[i]) {
            break
          }
        }
        this.$store.commit('changeCurrentMusic', this.playList[i + 1])
      }
    },
    clearAll() {
      this.musicUrl = ''
    },
    __getSongHistory() {
      for(let id of this.playHistory) {
        this.playHistoryIds += id + ','
      }
      getSongDetail(this.playHistoryIds.substr(0,this.playHistoryIds.length - 1)).then(res => {
        this.playHistorySongs = res.songs
      })
    }
  },
  computed: {
    musicInfo() {
      return this.$store.getters.currMusic
    },
    isPlaying() {
      return this.$store.getters.isPlay
    },
    playList() {
      return this.$store.getters.showPlayList
    },
    playHistory() {
      return this.$store.getters.showPlayHistory
    },
    nowDuration() {
      return this.$store.getters.showNowDuration
    },
  },
  filters: {
    showTime(value) {
      let date = new Date(value)
      if( date.getSeconds() < 10) {
        return date.getMinutes() + ':' + '0' + date.getSeconds()
      } else {
        return date.getMinutes() + ':' + date.getSeconds()
      }
    }
  },
  watch: {
    musicInfo() {
      getMusicUrl(this.musicInfo).then(res => {
        this.musicUrl = res.data[0].url
      })
      getSongDetail(this.musicInfo).then(res => {
        this.rightTime = res.songs[0].dt
      })
    },
    playList() {
      this.ids = ''
      this.__getSongDetail()
    },
    playHistory() {
      this.playHistoryIds = ''
      this. __getSongHistory()
    }
  }
}

</script>
<style scoped>
#music-play {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #ffffff;
  border-top: 1px solid rgb(145, 142, 142);
}
.play-control {
  position: absolute;
  left: 5px;
  bottom: 5px;
}
.play-control img {
  margin-left: 25px;
  cursor: pointer;
  width: 50px;
  height: 50px;
}
.play-control img:first-child,
.play-control img:last-child{
  width: 40px !important;
}
.plist-icon img {
  width: 20px;
  height: 20px;
  margin-top: 30px;
  float: right;
  margin-right: 50px;
}
.progress-bar audio{
  width: 900px;
  position: absolute;
  margin-left: 250px;
  bottom: 10px;
}
.plist-page {
  width: 500px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  right: 0;
  z-index: 10;
  bottom: 70px;
}
.plist-nav {
  margin-left: 200px;
  margin-top: 10px;
  font-size: 14px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px;
}
.plist {
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  width: 80px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;

}
.hlist {
  display: inline-block;
  text-align: center;
  padding: 5px 10px;
  width: 80px;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}
.active {
  background-color: rgb(161, 160, 160);
  color: #ffffff;
}
.play-style img{
  width: 20px;
  height: 20px;
}
.item {
  position: absolute;
  bottom: 15px;
  right: 100px;
}
.volume {
  display: flex;
}
.volume img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 400px;
  bottom: 15px;
}
.volum-progress {
  width: 100px;
  position: absolute;
  right:  280px;
  bottom: 7px;
  color: #da1919;
}
.time-progress-bar {
  width: 700px;
  position: absolute;
  right: 500px;
  bottom: 7px;
}
.right-time {
  position: absolute;
  right: 460px;
  font-size: 14px;
  font-weight: 100;
  bottom: 16px;
}
.left-time {
  position: absolute;
  right: 1210px;
  font-size: 14px;
  font-weight: 100;
  bottom: 16px;
}
</style>