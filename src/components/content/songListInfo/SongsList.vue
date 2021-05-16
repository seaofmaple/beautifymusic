<template>
  <div id="song-list">
    <div class="title">
      <div></div>
      <div>音乐标题</div>
      <div>歌手</div>
      <div>专辑</div>
      <div>时长</div>
    </div>
    <div v-for="(item, index) in lists" :key="index" class="song-list-item" @dblclick="playMusic(item.id)">
      <div class="index">{{index | showValue}}</div>
      <div class="song-name">
        <span class="name">{{item.name}}</span>
        <i class="play" v-if="item.mv" @click="lookMv(item.mv)">MV</i>
        <i class=" play-SQ" v-if="item.copyright == 0">SQ</i>
        <div class="handle">
          <div @click="addToPlay(item.id)">
            <img src="../../../assets/imgs/add.svg" alt="">
          </div>
          <div @click="like(index)" v-show="!isLike && currentIndex != index">
            <img src="../../../assets/imgs/heart.svg" alt="">
          </div>
          <div @click="like(index)" v-show="isLike  && currentIndex == index">
            <img src="../../../assets/imgs/heart_active.svg" alt="">
          </div>
        </div>
      </div>
      <div class="artist-name">
        <div v-for="(artist, index) in item.ar" :key="index" class="artists">
          <span>{{artist.name}}</span>
          <span v-if="index < item.ar.length - 1" > / </span>
        </div>
      </div>
      <div class="album-name">{{item.al.name}}</div>
      <div>{{item.dt  | showTime}}</div>       
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongsList',
  props: {
    lists: Array
  },
  data() {
    return {
      isLike: false,
      currentIndex: -1
    }
  },
  filters: {
    showValue(index) {
      return (index + 1) < 10 ? '0'+(index + 1) : (index + 1)
    },
    showTime(value) {
      let date = new Date(value)
      if( date.getSeconds() < 10) {
        return date.getMinutes() + ':' + '0' + date.getSeconds()
      } else {
        return date.getMinutes() + ':' + date.getSeconds()
      }
    }
  },
  methods: {
    like(index) {
      this.isLike = !this.isLike
      this.currentIndex = index
    },
    addToPlay(music) {
      this.$store.commit('addMusicToPlayList', music)
    },
    playMusic(music) {
      //将这个音乐加入播放历史
      this.$store.commit('changeCurrentMusic', music)
      this.$store.commit('addMusicToPlayList', music)
      this.$store.commit('addMusicToPlayHistory', music)
    },
    lookMv(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  }
}

</script>
<style scoped>title
#song-list {
  width: 100%;
  font-weight: 100;
}
.title{
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  font-weight: 100;
  display: inline-flex;
  border-top: 1px solid rgb(139, 139, 139);
  border-bottom: 1px solid  rgb(139, 139, 139);
}
.title div:first-child {
  width: 50px;
  border-right: 1px solid  rgb(139, 139, 139);
}
.title div:nth-child(2){
  padding-left: 5px;
  border-right: 1px solid  rgb(139, 139, 139);
  width: 500px;
}
.title div:nth-child(3),
.title div:nth-child(4){
  border-right: 1px solid  rgb(139, 139, 139);
  padding-left: 5px;
  width: 300px;
}
.title div:last-child {
  padding-left: 5px;
  width: 200px;
}
.index{
  text-align: right;
  width: 50px;
  padding-right: 5px;
  color: #585656;
}
.song-list-item {
  height: 40px;
  font-size: 14px;
  font-weight: 100;
  display: flex;
  position: relative;
  line-height: 40px;
}
.song-list-item:nth-child(odd) {
  background-color: #f3f3f3;
}
.play {
  position: absolute;
  height: 20px;
  width: 20px;
  top: 10px;
  left: 300px;
  line-height: 20px;
  margin-left: 20px;
  font-size: 12px;
  font-weight: normal;
  color: #a10c0c;
  cursor: pointer;
  padding: 0 2px;
  border: 2px solid #a10c0c;
  border-radius: 5px;
}
.play-SQ {
  position: absolute;
  height: 20px;
  width: 20px;
  line-height: 20px;
  right: 900px;
  top: 10px;
  margin-left: 20px;
  font-size: 12px;
  font-weight: normal;
  color: #d84d16;
  padding: 0 2px;
  border: 2px solid #d84d16;
  border-radius: 5px;
}
th {
  font-size: 18px;
  font-weight: 200;
}
tr:hover {
  background-color: #e4e2e2 !important;
}
.artists {
  display: inline-block;
}
.handle {
  float: right;
}
.handle img {
  width: 20px;
  margin-right: 5px;
}
.handle div{
   display: inline-block;
}
.song-name {
  width: 500px;
}
.name,.album-name,.artist-name{
  display: inline-block;
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.album-name {
  width: 306px !important;
}
.artist-name {
  width: 306px !important;
}
</style>