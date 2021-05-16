<template>
  <div id="search-page">
    <div class="total">
      <div v-show="currentActive == '1'" v-if="songs != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{songs.songCount}}首单曲</div>
      <div v-show="currentActive == '2'" v-if="artists != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{artists.artistCount}}位歌手</div>
      <div v-show="currentActive == '3'" v-if="albums != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{albums.albumCount}}张专辑</div>
      <div v-show="currentActive == '4'" v-if="videos != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{videos.videoCount}}个视频</div>
      <div v-show="currentActive == '5'" v-if="mvs != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{mvs.mvCount}}个MV</div>
      <div v-show="currentActive == '6'" v-if="songLists != undefined">
        搜索<span>"{{keyWord}}"</span>,找到{{songLists.playlistCount}}个歌单</div>
    </div>
    <el-menu
      :default-active="currentActive"
      class="el-menu-demo search"
      mode="horizontal"
      active-text-color = "#d15050"
      @select="changeIndex"
    >
      <el-menu-item index="1">单曲</el-menu-item>
      <el-menu-item index="2">歌手</el-menu-item>
      <el-menu-item index="3">专辑</el-menu-item>
      <el-menu-item index="4">视频</el-menu-item>
      <el-menu-item index="5">MV</el-menu-item>
      <el-menu-item index="6">歌单</el-menu-item>
    </el-menu>
    <div class="info">
      <SearchSongs :lists="songs.songs" :total="songs.songCount" 
      v-show="currentActive == '1'" @songsChange="songsChange" />
      <SearchArtist :artists="artists.artists" :total="artists.artistsCount"
       v-show="currentActive == '2'" @artistsChange="artistsChange" />
      <SearchAlbum :album="albums.albums" :total="albums.albumCount" 
       v-show="currentActive == '3'" @albumChange="albumChange" />
      <SearchVideo v-show="currentActive == '4'" :total="videos.videoCount"  
       :videos="videos.videos" @videoChange="videoChange"/>
      <SearchMv v-show="currentActive == '5'" :total="mvs.mvCount"  
       :mvs="mvs.mvs" @mvChange="mvChange"/>
      <SearchSongList v-show="currentActive == '6'" :total="songLists.playlistCount" 
       :songLists="songLists.playlists" @songListChange="songListChange"/>
    </div>
  </div>
</template>

<script>
import { getSearchInfo } from '../../../network/searchPage'

import SearchSongs from './SearchSongs'
import SearchArtist from './SearchArtist'
import SearchAlbum from './SearchAlbum'
import SearchVideo from './SearchVideo'
import SearchMv from './SearchMv'
import SearchSongList from './SearchSongList'
export default {
  name: 'SearchPage',
  data() {
    return {
      keyWord: this.$route.query.keyWord,
      currentActive: '1',
      songs: {},
      albums: {},
      mvs: {},
      artists: {},
      songLists: {},
      videos: {}
    }
  },
  components:{
    SearchSongs,
    SearchArtist,
    SearchAlbum,
    SearchVideo,
    SearchMv,
    SearchSongList
  },
  methods: {
    //当前的页面
    changeIndex(index) {
      this.currentActive = index
    },
    //获取第一页的单曲
    __getSongs() {
      getSearchInfo(this.keyWord, 0, 30, 1).then(res => {
        this.songs = res.result
      })
    },
    //点击单曲页面的翻页
    songsChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 1).then(res => {
        this.songs = res.result
      })
    },
    //获取第一页的专辑
    __getAlbums() {
      getSearchInfo(this.keyWord, 0, 30, 10).then(res => {
        this.albums = res.result
      })
    },
    //专辑页面的翻页
    albumChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 10).then(res => {
        this.albums = res.result
      })
    },
    //获取第一页的mv
    __getMvs() {
      getSearchInfo(this.keyWord, 0, 30, 1004).then(res => {
        this.mvs = res.result
      })
    },
    //mv页面的翻页
    mvChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 1004).then(res => {
        this.mvs = res.result
      })
    },
    //获取第一页的歌手
    __getArtists() {
      getSearchInfo(this.keyWord, 0, 30, 100).then(res => {
        this.artists = res.result
      })
    },
    //歌手页面的翻页
    artistsChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 100).then(res => {
        this.artists = res.result
      })
    },
    //获取第一页的歌单
    __getSongList() {
      getSearchInfo(this.keyWord, 0, 30, 1000).then(res => {
        this.songLists = res.result
      })
    },
    //歌单翻页
    songListChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 1000).then(res => {
        this.songLists = res.result
      })
    },
    //获取第一页的视频
    __getVideo() {
      getSearchInfo(this.keyWord, 0, 30, 1014).then(res => {
        this.videos = res.result
      })
    },
    //视频翻页
    videoChange(page) {
      getSearchInfo(this.keyWord, page - 1, 30, 1014).then(res => {
        this.videos = res.result
      })
    }
  },
  created() {
    this.__getMvs()
    this.__getArtists()
    this.__getSongList()
    this.__getVideo()
    this.__getSongs()
    this.__getAlbums()
  }
}

</script>
<style scoped>
#search-page {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#search-page::-webkit-scrollbar {
  display: none;
}
.total {
  margin-top: 5px;
  font-weight: 100;
}
.total span {
  color: rgb(55, 43, 224);
  font-size: 14px;
}
</style>