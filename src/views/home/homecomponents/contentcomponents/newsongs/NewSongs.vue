<template>
  <div id="new-songs">
    <div class="category">
      <span v-for="(item, index) in category" :key="index" 
      class="category-item" @click="ChangeItem(index, item[1])"
      :class="{'active': currentIndex == index}">
      {{item[0]}}
      </span>
    </div>
    <div class="play-all">
      <img src="../../../../../assets/imgs/video-play.svg">
      <span @click="playAll">播放全部</span>
    </div>
    <div class="list infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <div  v-for="(item, index) in songs" :key="index" class="infinite-list-item" @click="showSongId(item.album.id)">
        <div class="rank-num">{{index + 1 | showRank}}</div>
        <img src="../../../../../assets/imgs/video-play.svg" alt="" class="video-play">
        <img :src="item.album.picUrl"> 
        <span class="song-name">{{item.name}}</span>
        <span class="sing-artist">{{item.artists[0].name}}</span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from '../../../../../network/home'

export default {
  name: 'NewSongs',
  data() {
    return {
      songs: [],
      category: [
        ['全部', 0],
        ['华语', 7],
        ['欧美', 96],
        ['日本', 8],
        ['韩国', 16]
      ],
      currentIndex: 0
    }
  },
  filters: {
    showRank(value) {
      if(value < 10) {
        return '0' + value
      } else{
        return value
      }
    }
  },
  methods: {
    playAll() {
      console.log(this.songs);
    },
    load () {
      // this.songs += 2
    },
    showSongId(id) {
      console.log(id);
    },
    ChangeItem(index,type) {
      this.currentIndex = index
      this.__getNewSongs(type)
    },
    __getNewSongs(type) {
      getNewSongs(type).then(res => {
      this.songs = res.data
    })
    }
  },
  created() {
    this.__getNewSongs(0)
  }
}

</script>
<style scoped>
.video-play{
  position: absolute;
  width: 30px !important;
  left: 41px;
  opacity: 0.7;
  z-index: 9;
}
.video-play img {
  width: 30px;
}
.category{
  width: 100%;
  height: 50px;
  line-height: 40px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgb(126, 123, 123);
}
.category-item{
  display: inline-block;
  width: 80px;
  padding-bottom: 10px ;
  cursor: pointer;
  text-align: center;
}
.active {
  border-bottom: 3px solid rgb(126, 126, 126);
}
.infinite-list-item img{
  width: 50px;
  height: 50px;
  margin-left: 50px;
  position: absolute;
  cursor: pointer;
}
.list{
  font-size: 12px;
  font-weight: 100;
}
.list .infinite-list-item:nth-child(odd) {
  background-color: rgb(245, 246, 246);
}
.infinite-list-item {
  margin-top: 10px;
}
.play-all { 
  cursor: pointer;
  height: 50px;
  margin-top: 10px;
  line-height: 50px;
  font-weight: 100;
  font-style: italic;
}
.play-all img {
  width: 25px;
  height: 25px;
  position: relative;
}
.rank-num {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-weight: 100;
  margin-left: 20px;
  position: relative;
}
.infinite-list-item:hover{
  cursor: pointer;
  background-color: rgb(224, 223, 223) !important;
}
.song-name {
  display: inline-block;
  margin-left: 120px;
  width: 180px;
}
.sing-artist {
  margin-left: 300px;
  height: 50px;
  line-height: 50px;
}
.sing-time {
  float: right;
}
</style>