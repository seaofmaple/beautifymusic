<template>
  <div id="mv-page">
    <div class="top">
      <div class="left-detail">
        <div class="title">
          <div>视频</div>
          <div>{{mvInfo.title}}</div>
          <div v-if="mvInfo.creator != undefined">{{mvInfo.creator.nickname}}</div>
        </div>
        <video :src="mvUrl" controls autoplay class="video"></video>
        <div class="mv-comment">
          <MvComment :comment="comments" @changePage="changePage"></MvComment>
        </div>
    </div>
    <div class="right-detail">
      <div class="description">
        <div class="desc-top">视频介绍</div>
        <span>发布时间:  {{mvInfo.publishTime | showTime}}</span>
        <span style="float: right;">播放次数:  {{mvInfo.durationms | showValue}}</span>
        <div class="mv-desc">简介: {{mvInfo.description}}</div>
      </div>
      <div class="relative">
        <div class="relative-top">相关推荐</div>
        <SimilarVideo :similarVideo="simiMv"></SimilarVideo>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getVideoDetail,
         getVideoUrl,
         getVideoComment,
         getVideoRelative } from '../../../network/video'

import MvComment from '../mvPage/MvComments'
import SimilarVideo from './SimilarVideo'

export default {
  name: 'VideoPage',
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
    SimilarVideo
  },
  filters: {
    showTime(value) {
      let date = new Date(value)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    showValue(value) {
      if(value > 10000) {
        const newValue = (value / 10000).toFixed(2)
        return newValue + '万'
      } else {
        return value
      }
    }
  },
  methods: {
    //获取视频的url
    __getVideoUrl() {
      getVideoUrl(this.id).then(res => {
        this.mvUrl = res.urls[0].url
      })
    },
    //获取视频的详细信息
    __getVideoDetail() {
      getVideoDetail(this.id).then(res => {
        this.mvInfo = res.data
      })
    },
    //获取评论信息
    __getVideoComment() {
      getVideoComment(this.id,0,20).then(res => {
        console.log(res);
        this.comments = res
      })
    },
    //获取相似视频
    __getVideoRelative() {
      getVideoRelative(this.id).then(res => {
        console.log(res);
        this.simiMv = res.data
      })
    },
    // 评论翻页
    changePage(page) {
      getVideoComment(this.id, page - 1, 20).then(res => {
        this.comments = res
      })
    },
  },
  created() {
    this.__getVideoUrl()
    this.__getVideoDetail()
    this.__getVideoComment()
    this.__getVideoRelative()
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