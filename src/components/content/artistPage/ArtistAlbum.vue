<template>
  <div id="artist-album">
    <div class="top"> 
      <div class="left">
        <img src="../../../assets/imgs/top.png">
      </div>
      <div class="right" v-if="isLookAll">
        <div class="title">热门50首</div>
        <div class="top-item" v-for="(item, index) in topTen" :key="index" @dblclick="playMusic(item.id)">
          <span class="index">{{index + 1}}</span>
          <span v-if="item != undefined">{{item.name}}</span>
          <i class="play" v-if="item != undefined && item.mv" @click="lookMv(item.mv)">MV</i>
          <span class="time" v-if="item != undefined">{{item.dt | showTime}}</span>
        </div>
        <div v-if="top.length > 10 && isLookAll" @click="isLookAll = false" class="all">查看全部</div>
      </div>
      <div class="right" v-else>
        <div class="title">热门50首</div>
        <div class="top-item" v-for="(item, index) in top" :key="index" @dblclick="playMusic(item.id)">
          <span class="index">{{index + 1}}</span>
          <span v-if="item != undefined">{{item.name}}</span>
          <i class="play" v-if="item != undefined && item.mv" @click="lookMv(item.mv)">MV</i>
          <span class="time" v-if="item != undefined">{{item.dt | showTime}}</span>
        </div>
      </div>
    </div>
    <div class="artist-album">
      <div v-for="(item,index) in hotAlbums" :key="index">
        <AlbumDetail :album="item"></AlbumDetail>
      </div>
      <router-view></router-view>
    </div>
    <el-pagination
      :page-size="20"
      :background="true"
      :current-page.sync="currentPage"
      @current-change="handleCurrentPage(currentPage)"
      layout="prev, pager, next"
      :total="albumNum"
      class="page"
      v-if="albumNum > 20">
      </el-pagination>
  </div>
</template>

<script>
import AlbumDetail from './AlbumDetail'
export default {
  name: 'ArtistAlbum',
  props: {
    hotAlbums: Array,
    top: Array,
    albumNum: Number
  },
  data() {
    return {
      isLookAll: true,
      currentPage: 0
    }
  },
  components: {
    AlbumDetail
  },
  computed: {
    topTen() {
      let topTen = []
      for(let i = 0; i < 10; i++) {
        topTen.push(this.top[i])
      }
      return topTen
    }
  },
  methods: {
    lookMv(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    },
    handleCurrentPage(page) {
      this.$emit('albumChange',page)
    },
    playMusic(music) {
      //将这个音乐加入播放历史
      this.$store.commit('changeCurrentMusic', music)
      this.$store.commit('addMusicToPlayList', music)
      this.$store.commit('addMusicToPlayHistory', music)
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
  }
}

</script>
<style scoped>
.top {
  margin-top: 10px;
  display: flex;
}
.right {
  margin-left: 50px;
}
.index{
  margin-right: 20px;
}
.title {
  margin-top: 10px;
  margin-bottom: 20px;
}
.top-item {
  height: 30px;
  width: 800px;
  font-size: 14px;
  font-weight: 100;
  line-height: 30px;
}
.top-item span:first-child {
  margin-left: 20px;
}
.top-item span:last-child {
  margin-right: 20px;
}
.top .top-item:nth-child(even) {
  background-color: rgb(228, 225, 225);
}
.play {
  height: 20px;
  width: 20px;
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
.time {
  float: right;
}
.all{
  margin-top: 5px;
  font-style: italic;
  cursor: pointer;
}
.artist-album{
  display: flex;
  flex-wrap: wrap;
}
.page {
  margin-left: 400px;
  margin-bottom: 50px;
}
</style>