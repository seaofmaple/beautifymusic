<template>
  <div id="album">
    <div class="top-detail">
      <div class="image">
        <img :src="albumInfo.picUrl" alt="">
      </div>
      <div class="list-detail" v-if="albumInfo != undefined">
        <span class="title-logo">专辑</span>
        <span class="title-name">{{albumInfo.name}}</span>
        <div class="creator" v-if="albumInfo.artist != undefined">
          <span class="creat-name">歌手：{{albumInfo.artist.name}}</span>
          <span class="creat-time">时间：{{albumInfo.publishTime | showTime}}</span>
        </div>
        <div class="choose-button">
          <span class="play-all" @click="playAll">播放全部</span>
          <span class="collect-all">收藏全部</span>
        </div>
        <div class="description">
          <span>简介:</span>
          <span>{{albumInfo.description}}</span>
        </div>
      </div>
    </div>
    <MenuBar :commentsNum="commentCount" :songsNum="albumInfo.size"
    @changeActive="changeActive"></MenuBar>
    <SongsList :lists="lists" v-show="currentActive=='1'"></SongsList>
    <CommentPage v-show="currentActive=='2'" :comment="comments" :songListid="id"
    @changePage="changePage"></CommentPage>
  </div>
</template>

<script>
import { getAlbumInfo,
         getAlbumComments } from '../../../network/artistPage';

import CommentPage from '../songListInfo/CommentPage'
import SongsList from '../songListInfo/SongsList'
import MenuBar from '../songListInfo/MenuBar'
export default {
  name: 'Album',
  components: {
    CommentPage,
    SongsList,
    MenuBar
  },
  data() {
    return {
      currentActive: '1',
      id: this.$route.query.id,
      albumInfo: {},
      comments: {},
      lists: [],
      commentCount: 0
    }
  },
  filters: {
    showTime(value) {
      let date = new Date(value)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  methods: {
    changePage(page) {
      getAlbumComments(this.id, page - 1, 20).then(res => {
        this.comments = res
      })
    },
    changeActive(index) {
      this.currentActive = index
    },
    __getAlbumInfo() {
      getAlbumInfo(this.id).then(res => {
        this.albumInfo = res.album
        this.commentCount = res.album.info.commentCount
        this.lists = res.songs
      })
    },
    __getAlbumComments() {
      getAlbumComments(this.id, 0, 20).then(res => {
        this.comments = res
      })
    },
    playAll() {

    }
  },
  created() {
    this.__getAlbumInfo()
    this.__getAlbumComments()
  }
}

</script>
<style scoped>
#album {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#album::-webkit-scrollbar {
  display: none;
}
.top-detail {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
.image img{
  width: 300px;
  display: inline-block;
}
.list-detail {
  margin-top: 4px;
  margin-left: 40px;
  width: 900px;
}
.title-logo {
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 2px;
  color: #db2323;
  border: 1px solid rgb(197, 49, 49);
}
.song-count, .play-count {
  margin-left: 15px;
  font-weight: 100;
  width: 48px;
  display: inline-block;
}
.choose-button, 
.creator,
.description{
  margin-top: 10px;
}
.play-all {
  cursor: pointer;
  display: inline-block;
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 2px 15px;
  font-weight: 100;
  background-color: #af2222;
  color: #ffffff;
}
.title-name {
  margin-left: 5px;
  font-size: 30px;
  width: 600px;
  display: inline-block;
}
.tags-item span:first-child{
  color: rgb(77, 77, 187);
  padding: 10px;
}
.creator *{
  vertical-align: -webkit-baseline-middle;
}
.creat-name {
  margin-left: 15px;
  font-size: 18px;
  color: #696868;
  font-weight: 200;
  margin-right: 20px;
}
.creat-time {
  font-size: 14px;
  font-weight: 100;
  color: #838282;
}
.creator img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.description {
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical; 
  -webkit-line-clamp:2;
}
.collect-all {
  width: 70px;
  height: 30px;
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid #aaa;
  border-radius: 2px;
  cursor: pointer;
}
</style>