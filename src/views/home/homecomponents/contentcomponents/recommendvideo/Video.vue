<template>
  <div id="video">
    <div class="tags" @click="chooseTags"> 
      <span>{{tagName}}</span>
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="tags-table" v-if="isChoose">
      <div class="all-video" :class="{'active': isActive == -1}"
      @click="chooseAll">全部视频</div>
      <table border="1" cellspacing="0" width="500" bordercolor="#a5a4a4">
         <tr v-for="(item, index) in videoTags" :key="index">
           <td v-for="(tag, i) in item" :key="i" align="center" @click="changeTag(tag.name, i, index, tag.id)" 
           :class="{'active': isActive == index*6+i}">
             <span>{{tag.name}}</span>
           </td>
         </tr>
      </table>
    </div>
    <div>
      <VideoList :videoList="videoList"></VideoList>
    </div>
  </div>
</template>

<script>
import { getVideoTags,
         getAllVideo,
         getVideoGroup } from '../../../../../network/home'

import VideoList from './VideoList';
export default {
  name: 'Video',
  data() {
    return {
      tagName: '全部视频',
      videoTags: [],
      isChoose: false,
      isActive: -1,
      videoList: []
    }
  },
  components: {
    VideoList
  },
  methods: {
    __getVideoTags() {
      getVideoTags().then(res => {
        const len = res.data.length / 6,
              result = res.data
        let temp = []
        for(let i = 0; i < len; i++) {
          for(let j = 0; j < 6; j ++) {
            temp.push(result[6*i+j])
          }
          this.videoTags.push(temp)
          temp = []
        }
      })
    },
    chooseAll() {
      this.isChoose = false
      this.tagName = '全部视频'
      this.isActive = -1
    },
    chooseTags() {
      this.isChoose = !this.isChoose
    },
    changeTag(name, i, index, id) {
      this.isChoose = false
      this.tagName = name
      this.isActive = index * 6 + i
      getVideoGroup(id).then(res => {
        this.videoList = res.datas
      })
    },
    __getAllVideo() {
      getAllVideo(0).then(res => {
        this.videoList = res.datas
      })
    }
  },
  created() {
    this.__getVideoTags()
    this.__getAllVideo()
  }
}

</script>
<style scoped>
.tags{
  width: 100px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  padding: 5px 3px;
  font-weight: 100;
  border: 1px solid #dbdada;
  box-shadow: 1px 1px #f2f2f2;
}
.el-icon-arrow-down {
  font-size: 18px;
  font-weight: bold;
}
.all-video {
   width: 500px;
   margin-left: 40px;
   cursor: pointer;
   text-align: center;
   height: 40px;
   line-height: 40px;
   font-size: 14px;
   font-weight: 100;
   border: 2px solid #a6a4a4;
}
.tags-table {
  margin-top: 30px;
  width: 600px;
  height: 400px;
  overflow: auto;
  background-color: #ffffff;
}
.tags-table::-webkit-scrollbar {
  display: none;
}
table {
  margin-left: 40px;
  margin-top: 15px;
}
td {
  height: 40px;
  font-size: 13px;
  cursor: pointer;
  width: 70px;
  font-weight: 100;
}
td:hover {
  background-color: rgb(230, 230, 230);
}
.active {
  border: 2px solid #e41b1b;
}
</style>