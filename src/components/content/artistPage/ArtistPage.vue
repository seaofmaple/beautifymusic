<template>
  <div id="artist-page">
    <div class="top-detail">
      <div class="left">
        <img :src="artistInfo.picUrl" alt="">
      </div>
      <div class="right">
        <div class="name">
          <span>歌手</span>
          <span>{{artistInfo.name}}</span>
        </div>
        <div class="collect" @click="collect">
          收藏
        </div>
        <div class="total">
          <div>单曲数: {{artistInfo.musicSize}}</div>
          <div>专辑数: {{artistInfo.albumSize}}</div>
          <div>mv数: {{artistInfo.mvSize}}</div>
        </div>
      </div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="changeIndex">
      <el-menu-item index="1">专辑</el-menu-item>
      <el-menu-item index="2">MV</el-menu-item>
      <el-menu-item index="3">歌手详情</el-menu-item>
      <el-menu-item index="4">相似歌手</el-menu-item>
    </el-menu>
    <ArtistAlbum v-show="activeIndex == '1'" :hotAlbums="hotAlbums" :top="top" 
    :albumNum="artistInfo.albumSize" @albumChange="albumChange"></ArtistAlbum>
    <ArtistMv v-show="activeIndex == '2'" :mvList="hotMvs" 
    :total="artistInfo.mvSize" @changePage="changePage"></ArtistMv>
    <ArtistDesc v-show="activeIndex == '3'" :artistDesc="artistDesc" 
    :artistInfo="artistInfo"></ArtistDesc>
    <SimilarArtists v-show="activeIndex == '4'" :simiArtists="simiArtists"></SimilarArtists>
  </div>
</template>

<script>
import { getArtistSongs,
         getArtistAlbum,
         getArtistDesc,
         getArtistMv,
         getSimilarArtists } from '../../../network/artistPage'

import ArtistAlbum from './ArtistAlbum'
import ArtistMv from './ArtistMv'
import ArtistDesc from './ArtistDesc'
import SimilarArtists from './SimilarArtists'
export default {
  name: 'ArtistPage',
  data() {
    return {
      //歌手id
      id: this.$route.query.id,
      //歌手信息
      artistInfo: {},
      //歌手热门50首单曲
      top: [],
      //歌手专辑
      hotAlbums: [],
      //歌手mv
      hotMvs: [],
      //歌手描述
      artistDesc: [],
      //相似歌手信息
      simiArtists: [],
      //当前活跃菜单
      activeIndex: '1',
    }
  },
  components: {
    ArtistAlbum,
    ArtistMv,
    ArtistDesc,
    SimilarArtists
  },
  methods: {
    //获取歌手的相关信息
    __getArtistSongs() {
      getArtistSongs(this.id).then(res => {
        this.artistInfo = res.artist
        this.top = res.hotSongs
      })
    },
    //获取歌手的专辑
    __getArtistAlbum() {
      getArtistAlbum(this.id, 0, 20).then(res => {
        this.hotAlbums = res.hotAlbums
      })
    },
    //获取歌手mv
    __getArtistMv() {
      getArtistMv(this.id, 0 ,9).then(res => {
        this.hotMvs = res.mvs
      })
    },
    //获取歌手的介绍
    __getArtistDesc() {
      getArtistDesc(this.id).then(res => {
        this.artistDesc = res.introduction
      })
    },
    //mv页面翻页
    changePage(page) {
      getArtistMv(this.id, page - 1 ,9).then(res => {
        this.hotMvs = res.mvs
      })
    },
    //专辑翻页
    albumChange(page) {
      getArtistAlbum(this.id, page - 1, 20).then(res => {
        this.hotAlbums = res.hotAlbums
      })
    },
    //获取相似歌手
    __getSimilarArtists() {
      getSimilarArtists(this.id).then(res => {
        this.simiArtists = res.artists
      })
    },
    collect() {
      console.log('aaa');
    },
    changeIndex(index) {
      this.activeIndex = index
    }
  },
  created() {
    this.__getArtistSongs()
    this.__getArtistAlbum()
    this.__getArtistDesc()
    this.__getArtistMv()
    this.__getSimilarArtists()
  }
}

</script>
<style scoped>
#artist-page {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#artist-page::-webkit-scrollbar {
  display: none;
}
.top-detail{
  display: flex;
}
.left img {
  width: 200px;
  height: 200px;
}
.right {
  margin-left: 50px;
}
.name span:first-child {
  display: inline-block;
  width: 40px;
  height: 20px;
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  line-height: 20px;
  padding: 5px 10px;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  background-color: rgb(196, 23, 23);
}
.el-menu--horizontal>.el-menu-item.is-active  {
  border-bottom: 2px solid rgb(224, 23, 23);
}
.name span:last-child{
  margin-left: 20px;
}
.collect {
  width: 80px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  margin-top: 20px;
  border: 1px solid rgb(100, 99, 99);
}
.total {
  font-size: 14px;
  margin-top: 20px;
  font-weight: 100;
}
.total div {
  margin-top: 5px;
}
</style>