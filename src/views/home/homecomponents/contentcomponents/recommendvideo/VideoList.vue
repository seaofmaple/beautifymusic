<template>
  <div id="video-list">
    <div class="mv-list-item" v-for="(item, index) in videoList" :key="index">
      <div class="icon">
        <i class="el-icon-video-camera"></i>
        <span class="play-count">{{item.data.durationms | showCount}}</span>
      </div>
      <img :src="item.data.coverUrl" alt="" @click="toVideoPage(item.data.vid)">
      <div class="name">{{item.data.title}}</div>
      <div class="artist" v-if="item.data.creator != undefined">by  {{item.data.creator.nickname}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  props: {
    videoList: Array
  },
  methods: {
    toVideoPage(id) {
      this.$router.push(`/home/videoPage?id=${id}`)
    }
  },
  filters: {
    showCount(value) {
      return value < 10000 ? value : (value/10000).toFixed(2) + '万'
    }
  }
}

</script>
<style scoped>
#video-list {
  display: flex;
  flex-wrap: wrap;
}
.name {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mv-list-item img{
  width: 400px;
  height: 225px;
  flex-grow: 1;
  cursor: pointer;
}
.mv-list-item {
  padding: 10px;
  width: 400px;
  height: 255px;
  position: relative;
}
.icon {
  position: absolute;
  right: 20px;
  top: 15px;
  color: #ffffff;
}
.play-count {
  text-shadow: 1px 1px 1px #000;
}
.artist {
  margin-top: 5px;
  font-size: 14px;
  color: #707070;
}
</style>