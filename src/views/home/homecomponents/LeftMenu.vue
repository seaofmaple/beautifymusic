<template>
  <div id="left-menu">
    <header class="recommend">推荐</header>
    <div class="find-music" :class="{'active':isActive}" @click="changeToFind">
      <i class="el-icon-headset music"></i>
      <span>发现音乐</span>
    </div>
    <div class="recommend-video" :class="{'active': !isActive}" @click="changeToRecommend">
      <i class="el-icon-video-camera video"></i>
      <span>推荐视频</span>
    </div>
    <span class="my-music">我的音乐</span>
    <div class="my-music-cloud">
      <span>我的音乐云盘</span>
    </div>
    <span class="create-songs">创建的歌单</span>
    <div class="pravite-playlist">
      <div class="list-item" v-for="(item, index) in priratePlaylist" :key="index" @click="toPlayList(item.id)">
        <div class="music-icon">
          <img src="../../../assets/imgs/music-icon.svg" alt="">
        </div>
        <div v-if="index != 0">{{item.name}}</div>
        <div v-if="index == 0">我喜欢的音乐</div>
      </div>
    </div>
    <div class="songs-list" v-if="this.$store.getters.isPlay || currentMusic != null">
      <div v-if="currentMusic">
        <img :src="currentMusic[0].al.picUrl" alt="" @click="toLyric">
      </div>
      <div v-if="currentMusic">
        <div class="name">{{currentMusic[0].name}}</div>
        <div class="artist">{{currentMusic[0].ar[0].name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongDetail } from '../../../network/songListPage';
export default {
  name: 'LeftMenu',
  props: {
    listSongs: Array //我的歌单
  },
  data() {
    return {
      isActive: true, 
      currentMusic: null
    }
  },
  computed: {
    currentMusicId() {
      return this.$store.getters.currMusic
    },
    priratePlaylist() {
      return this.$store.getters.showPrivatePlayList
    }
  },
  methods: {
    changeToFind() {
      this.isActive = true
      this.$emit('changeToFind')
      this.$router.push('/home/homeContent/findMusic')
    },
    changeToRecommend() {
      this.isActive = false
      this.$emit('changeToRecommend')
      this.$router.push('/home/RecommendVideo/mv')
    },
    toLyric() {
      let id = this.currentMusicId
      this.$router.push(`/home/lyric?id=${id}`)
    },
    toPlayList(id) {
      this.$router.push(`/home/songsListInfo?id=${id}`)
    }
  },
  watch: {
    currentMusicId(newValue, oldValue) {
      getSongDetail(this.currentMusicId).then(res => {
        this.currentMusic = res.songs
      })
    }
  }
}

</script>
<style scoped>
#left-menu{
  width: 200px;
  background-color: rgb(252, 249, 249);
  height: calc(100vh - 150px);
}
.recommend, .my-music, .create-songs{
  font-size: 14px;
  color: #a3a3a3;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}
.find-music,.recommend-video, .my-music-cloud{
  width: 196px;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.music,.video{
  font-size: 20px;
  margin-right: 5px;
}
.active{
  background-color: rgb(226, 223, 223);
  border-left: 4px solid rgb(204, 50, 50);
}
.songs-list {
  border-top: 1px solid rgb(126, 125, 125);
  background-color: #ffffff;
  display: flex;
  height: 70px;
  width: 204px;
  position: absolute;
  bottom: 71px;
  z-index: 10;
}
.songs-list img {
  width: 70px;
  cursor: pointer;
}
.name, .artist {
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 5px;
  font-size: 14px;
  font-weight: 100;
  margin-top: 15px;
}
.pravite-playlist {
  font-size: 13px;
  color: #4d4b4b;
  height: 218px;
  width: 200px;
  overflow-y: auto;
  font-weight: 100;
}
.pravite-playlist::-webkit-scrollbar{
  display: none;
}
.list-item {
  display: flex;
  flex-wrap: nowrap;
  height: 30px;
  cursor: pointer;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list-item:hover  {
  background-color: rgb(221, 219, 219);
}
.music-icon img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 10px;
}
</style>