<template>
  <div id="recommend-songs">
    <div v-for="(item, index) in songLists" :key="index" class="songs-detail">
      <div class="play-count el-icon-headset">{{item.playCount | showCount}}</div>
      <img :src="item.picUrl ? item.picUrl : item.coverImgUrl" alt="" @click="toSongListPage(item.id)" 
      @mouseenter="showIcon(index)" @mouseleave="reducePlay">
      <div class="list-name">{{item.name}}</div>
      <div class="video-play" v-show="currentIndex == index">
        <img src="../../../../../assets/imgs/video-play.svg" alt="" style="width: 40px; height: 40px">
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendSongs } from '../../../../../network/home'
export default {
  name: 'RecommendSongs',
  data() {
    return {
      csongLists: [],
      currentIndex: -1
    }
  },
  props: {
    songs: Array
  },
  filters: {
    showCount(value) {
      if(value > 10000) {
        const newValue = (value / 10000).toFixed(2)
        return newValue + '万'
      } else {
        return value
      }
    }
  },
  computed: {
    songLists() {
      return this.songs ? this.songs : this.csongLists
    },
    name() {
      return 
    }
  },
  methods: {
    toSongListPage(id) {
      this.$router.push(`/home/songsListInfo?id=${id}`)
    },
    showIcon(index) {
      this.currentIndex = index
    },
    reducePlay() {
      this.currentIndex = -1
    }
  },
  created() {
    getRecommendSongs(12).then(res => {
      this.csongLists = res.result
    })
  }
}

</script>
<style scoped>
#recommend-songs{
  margin-top: 30px;
  display: flex;
  width: calc(100%-200px);
  flex-wrap: wrap;
}
.play-count{
  font-size: 13x;
  color: #ffffff;
  position: absolute;
  top: 20px;
  right: 10px;
  text-shadow: rgb(0 0 0) 0px 0px 2px;
}
#recommend-songs img{
  width: 200px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
  flex-grow: 1;
}
#recommend-songs .list-name {
  margin-top: 5px;
  width: 200px;
  font-size: 14px;
}
.songs-detail{
  position: relative;
  padding: 10px 0;
  width: 200px;
  height: 290px;
  margin-right: 10px;
}
.video-play{
  position: absolute;
  bottom: 80px;
  right: -8px;
  transform: translate(-50%, -50%);
  animation-name: play;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes play {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>