<template>
  <div id="lyric">
    <div class="singel-top">
        <div class="bck-img" v-if="musicDetail[0] != undefined">
          <img
            :src="musicDetail[0].al.picUrl"
            style="width: 100%; filter: blur(80px); border-radius: 50%"
          />
        </div>
        <div class="singel-play-img" v-if="musicDetail[0] != undefined">
          <div :class="{ playBar: isPlaying, playBarReverse: !isPlaying }" ref="playBar">
            <img src="../../../assets/imgs/player_bar.png" />
          </div>
          <div
            class="play-disc"
            ref="playDisc"
            :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
          >
            <img src="../../../assets/imgs/disc.png" style="width: 350px; height: 350px" />
            <img
              style="
                position: absolute;
                top: 22%;
                left: 22%;
                width: 195px;
                height: 195px;
                border-radius: 50%;
              "
              :src="musicDetail[0].al.picUrl"
            />
          </div>
        </div>    
        <div class="singer-text">
          <div class="singel-title" v-if="musicDetail[0] != undefined">
            <span
              style="font-size: 25px; font-weight: 500; margin-right: 5%; color: #000"
              >{{ musicDetail[0].name }}</span
            >
            <span
              style="border: 1px solid red; font-size: 12px; color: red; padding: 1px 4px"
              >标准音质</span
            >
            <div style="margin: 19px 0; fontsize: 13px">
              <div
                style="
                  display: inline-block;
                  width: 140px;
                  color: #2559a4;
                  margin-right: 5%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                "
              >
                <span style="color: #000">专辑:</span
                ><span style="cursor: pointer" 
                v-if="musicDetail[0] != undefined"
                @click="toAlbumPage(musicDetail[0].al.id)">{{
                  musicDetail[0].al.name
                }}</span>
              </div>
              <div
                style="
                  display: inline-block;
                  color: #2559a4;
                  width: 170px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                "
              >
                <span style="color: #000">歌手:</span
                ><span
                  style="cursor: pointer"
                  v-if="musicDetail[0] != undefined"
                  @click="toArtistPage(musicDetail[0].ar[0].id)"
                  >{{ musicDetail[0].ar[0].name }}</span
                >
              </div>
            </div>
          </div>
        </div>  
    </div>    
    <div class="lyric-content">
      <div class="showLyric" ref="lyricScroll">
        <ul ref="lyric" v-if="lyricArr.length > 1">
          <li
            v-for="(item, index) in lyricArr"
            :key="index"
            :class="{'active': lyricIndex === index}"
            :ref="[lyricIndex === index ? 'lyricRef' : '']"
            >
            {{ item.c }}
          </li>
        </ul>
       <div v-else>纯音乐，请您欣赏</div>
     </div>
    </div>
    <div class="comments">
      <MvComments :comment="songComments" :songListid="id" @changePage="changePage"></MvComments>
    </div>
  </div>
</template>

<script>
import { getLyric,
         getSongComments } from '../../../network/home'
import { getSongDetail } from '../../../network/songListPage'

import MvComments from '../mvPage/MvComments'
export default {
  name: 'Lyric',
  data() {
    return {
      id: this.$route.query.id,
      lyric: '',
      //歌词数组
      lyricArr: [],
      //当前歌词数组的索引
      lyricIndex: 0,
      //歌曲评论
      songComments: {},
      musicDetail: {}
    }
  },
  components: {
    MvComments
  },
  watch: {
    nowDuration() {
      for(let i = 0; i < this.lyricArr.length; i++) {
        if(this.nowDuration <= this.lyricArr[i].t) {
          //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        if (this.nowDuration <= this.lyricArr[i].t) {
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i - 1;
          //动态绑定ref 根据距离顶部不同的位置来控制歌词滚动 (原生的滚动条动画效果未实现，需要的话可能需要换其他滚动条，eg:bater-scroll)
          //这里加入了一个效果就是滑下去查看歌词时，不会自动滑动 只有到了高亮显示在可视区才会滚动
          if (this.$refs.lyricRef[0].offsetTop > 100) {
            this.$refs.lyricScroll.scrollTop = this.$refs.lyricRef[0].offsetTop - 100;
          } else if (this.$refs.lyricRef[0].offsetTop < -100) {
            this.$refs.lyricScroll.scrollTop = this.$refs.lyricRef[0].offsetTop + 100;
          }
          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lyricArr.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
        }
      }
    }
  },
  computed: {
    nowDuration() {
      return this.$store.getters.showNowDuration
    },
    isPlaying() {
      return this.$store.getters.isPlay
    }
  },
  methods:{
    __getLyric() {
      getLyric(this.id).then(res => {
        if(res.lrc != undefined) {
          this.lyric = res.lrc.lyric
          this.createLrcObj(this.lyric)
        }
      })
    },
    toArtistPage(id) {
      this.$router.push(`/home/artistPage?id=${id}`)
    },
    toAlbumPage(id) {
      this.$router.push(`/home/album?id=${id}`)
    },
    //解析歌词
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (let i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (let k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (let k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(0),
            c: content === "" ? "\n" : content,
          });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      this.lyricArr = oLRC.ms;
    },
    changePage(page) {
      getSongComments(this.id, page - 1).then(res => {
      this.songComments = res
    })
    }
  },
  created() {
    this.__getLyric()
    getSongDetail(this.id).then(res => {
        this.musicDetail = res.songs
      })
    getSongComments(this.id, 0).then(res => {
      this.songComments = res
    })
  }
}

</script>
<style scoped>
#lyric {
  width: 1300px;
  height: 590px;
  overflow-y: auto;
  position: relative;
}
#lyric::-webkit-scrollbar {
  display: none;
}
.active {
  color: #ffffff;
}
.lyric-content {
  height: 380px;
  width: 500px;
  position: absolute;
  right: 100px;
  top: 120px;
  overflow-y: auto;
}
li {
  list-style: none;
  margin-top: 15px;
}
.lyric-content::-webkit-scrollbar {
  display: none;
}
.lyric {
  height: 40px;
  line-height: 40px;
}
.showLyric {
  width: 500px;
  height: 480px;
  overflow: hidden;
  margin-top: 25px;
  transition: scrollTop 0.2s;
}
.showLyric::-webkit-scrollbar {
  display: none;
}
.singer-left {
  width: 65%;
}
.singer-right {
  width: 33%;
  margin-left: 20px;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cecdd3;
  border-radius: 3px;
}
li {
  margin-top: 15px;
  list-style: none;
}
.singel-back {
  position: absolute;
  top: 0;
  right: 0;
}
.bck-img {
  position: absolute;
  width: 50%;
  top: 0;
  left: 40%;
  transform: translateX(-50%);
  z-index: 0;
}
.lyric {
  position: relative;
  z-index: 199;
}
.singer-text {
  width: 50%;
  margin-left: 25%;
}
.singel {
  position: fixed;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  margin-top: -20px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.singel:hover {
  overflow-y: overlay;
}
.singel-main {
  margin-left: 8%;
  margin-top: 2%;
  width: 70%;
}
.singel-top {
  display: flex;
  position: relative;
  margin-bottom: 5%;
}
.singel-play-img {
  margin-left: 35px;
  position: relative;
}
/* 拨动片 */
.playBar {
  position: absolute;
  top: 0px;
  left: 55%;
  z-index: 10;
  transform: rotate(-45deg);
  animation-name: bar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transform-origin: 0 0;
}
@keyframes bar {
  to {
    transform: rotate(0deg);
  }
}
.playBarReverse {
  position: absolute;
  top: 0px;
  left: 55%;
  z-index: 10;
  transform: rotate(0deg);
  animation-name: rebar;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transform-origin: 0 0;
}
@keyframes rebar {
  to {
    transform: rotate(-45deg);
  }
}
/* 唱片 */
.play-disc {
  margin-top: 50px;
  animation-name: record;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes record {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes record {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.showLyric:hover {
  overflow-y: overlay;
}
/* 底部信息 */
.singel-bottom {
  width: 100%;
}
/* 评论区 */
.showComment {
  width: 58%;
  float: left;
}
.comments {
  margin-top: 100px;
}
</style>