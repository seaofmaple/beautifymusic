<template>
  <div id="song-list-info">
    <div class="top-detail">
      <div class="image">
        <img :src="songListInfo.coverImgUrl" alt="">
      </div>
      <div class="list-detail">
        <span class="title-logo">歌单</span>
        <span class="title-name">{{songListInfo.name}}</span>
        <span class="song-count">歌曲数{{songListInfo.trackCount}}</span>
        <span class="play-count">播放数 {{songListInfo.playCount}}</span>
        <div class="tags">
          <span>标签:</span>
          <span v-for="(item, index) in songListInfo.tags" :key="index"
          class="tags-item">
          <span>{{item}}</span>
          <span v-if="index < songListInfo.trackCount - 2">/</span>
          </span>
        </div>
        <div class="creator" v-if="songListInfo.creator !== undefined">
          <img :src="songListInfo.creator.avatarUrl" alt="">
          <span class="creat-name">{{songListInfo.creator.nickname}}</span>
          <span class="creat-time">{{songListInfo.createTime | showTime}}创建</span>
        </div>
        <div class="choose-button">
          <span class="play-all" @click="playAll">播放全部</span>
          <span class="collect-all">收藏全部</span>
        </div>
        <div class="description">
          <span>简介:</span>
          <span>{{songListInfo.description}}</span>
        </div>
      </div>
    </div>
    <MenuBar :commentsNum="songListInfo.commentCount" :songsNum="songListInfo.trackCount"
    @changeActive="changeActive"></MenuBar>
    <SongsList :lists="lists" v-show="currentActive=='1'"></SongsList>
    <CommentPage v-show="currentActive=='2'" :comment="comments" :songListid="currentId"
    @changePage="changePage"></CommentPage>
  </div>
</template>

<script>
import { getSongListDetail,
         getSongDetail,
         getSongListComment } from '../../../network/songListPage'

import MenuBar from './MenuBar'
import SongsList from './SongsList'
import CommentPage from './CommentPage'

export default {
  name: 'SongListInfo',
  data() {
    return {
      //歌单id
      currentId: this.$route.query.id,
      //歌单基本信息
      songListInfo: {},
      //歌单里面歌曲id的字符串
      ids: '',
      //歌单歌曲信息
      lists: [],
      //歌单评论信息
      comments: {},
      //歌曲(1)还是评论(2)
      currentActive: 1
    }
  },
  components: {
    MenuBar,
    SongsList,
    CommentPage
  },
  filters: {
    showTime(value) {
      let date = new Date(value)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  methods: {
    async __getSongsList() {
      await getSongListDetail(this.currentId).then(res => {
        this.songListInfo = res.playlist
        this.songListInfo.trackIds.forEach(item => {
          this.ids += item.id + ','
        })
      });
      this.__getSongDetail()
    },
    __getSongDetail(){
      getSongDetail(this.ids.substr(0, this.ids.length - 1)).then(res => {
        this.lists = res.songs
      })
    },
    changeActive(index) {
      this.currentActive = index
    },
    __getSongListComment() {
      getSongListComment(this.currentId,0,20).then(res => {
        this.comments = res
      })
    },
    changePage(page) {
      getSongListComment(this.currentId, page - 1, 20).then(res => {
        this.comments = res
      })
    },
    playAll() {
      this.$store.commit('clearPlayList')
      this.$store.commit('changeCurrentMusic', this.songListInfo.trackIds[0].id)
      this.$store.commit('addMusicToPlayHistory', this.songListInfo.trackIds[0].id)
      this.songListInfo.trackIds.forEach(item => {
          this.$store.commit('addMusicToPlayList', item.id)
        })
    }
  },
  created() {
    this.__getSongsList()
    this.__getSongListComment()
  }
}

</script>
<style scoped>
#song-list-info {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#song-list-info::-webkit-scrollbar {
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
.song-count {
  margin-left: 50px;
  padding-right: 10px;
  border-right:1px solid #a3a3a3 ;
}
.choose-button, 
.tags,
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