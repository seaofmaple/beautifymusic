<template>
  <div id="mv-page">
    <div class="top">
      <div class="left-detail">
        <div class="title">
          <div>MV</div>
          <div>{{mvInfo.name}}</div>
          <div>{{mvInfo.artistName}}</div>
        </div>
        <video :src="mvUrl" controls autoplay class="video"></video>
        <div class="mv-comment">
          <MvComment :comment="comments" @changePage="changePage"></MvComment>
        </div>
    </div>
    <div class="right-detail">
      <div class="description">
        <div class="desc-top">MV介绍</div>
        <span>发布时间:  {{mvInfo.publishTime}}</span>
        <span style="float: right;">播放次数:  {{mvInfo.playCount}}</span>
        <div class="mv-desc">简介: {{mvInfo.desc}}</div>
      </div>
      <div class="relative">
        <div class="relative-top">相关推荐</div>
        <SimilarMv :mvList="simiMv"></SimilarMv>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getMvUrl,
         getMvComments,
         getMvDetail,
         getSimilarMv } from '../../../network/mvPage'

import MvComment from './MvComments'
import SimilarMv from './SimilarMv'

export default {
  name: 'MvPage',
  data() {
    return {
      id: this.$route.query.id,
      mvUrl: '',
      mvInfo: {},
      comments: {},
      simiMv: []
    }
  },
  components: {
    MvComment,
    SimilarMv
  },
  methods: {
    //获取mv的url
    __getMvUrl() {
      getMvUrl(this.id).then(res => {
        this.mvUrl = res.data.url
      })
    },
    //获取mv的详细信息
    __getMvDetail() {
      getMvDetail(this.id).then(res => {
        this.mvInfo = res.data
      })
    },
    //获取评论信息
    __getMvComments() {
      getMvComments(this.id,0,20).then(res => {
        this.comments = res
      })
    },
    //获取相似mv
    __getSimilarMv() {
      getSimilarMv(this.id).then(res => {
        this.simiMv = res.mvs
      })
    },
    //评论翻页
    changePage(page) {
      getMvComments(this.id, page - 1, 20).then(res => {
        this.comments = res
      })
    },
  },
  created() {
    this.__getMvUrl()
    this.__getMvDetail()
    this.__getMvComments()
    this.__getSimilarMv()
  }
}

</script>
<style scoped>
#mv-page {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#mv-page::-webkit-scrollbar {
  display: none;
}
.top {
  display: flex;
}
.title {
  display: flex;
  margin-bottom: 20px;
}
.title div:first-child {
  width: 30px;
  height: 20px;
  font-weight: bold;
  margin-right: 15px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 7px;
  color: rgb(206, 13, 13);
  text-align: center;
  border: 1px solid rgb(206, 13, 13);
}
.title div:nth-child(2) {
  font-size: 24px;
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title div:nth-child(3) {
  font-size: 14px;
  color: rgb(56, 55, 55);
  height: 24px;
  line-height: 24px;
  margin-top: 9px;
  margin-left: 10px;
}
.video {
  width: 800px;
}
.right-detail {
  margin-left: 30px;
  width: 470px;
}
.desc-top, .relative-top{
  font-size: 25px;
  margin-top: 7px;
  margin-bottom: 10px;
  padding-bottom: 13px;
  border-bottom: 1px solid #000;
}
.description span{
  font-size: 14px;
  font-weight: 100;
  color: rgb(63, 63, 63);
}
.mv-desc {
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 25px;
  font-weight: 100;
  color: rgb(63, 63, 63);
}
.mv-desc::-webkit-scrollbar {
  display: none;
}
.mv-comment {
  width: 800px;
}
</style>