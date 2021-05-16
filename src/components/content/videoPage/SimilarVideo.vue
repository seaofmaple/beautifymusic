<template>
  <div id="similar-mv">
    <div class="mv" v-for="(item, index) in similarVideo" :key="index">
      <div class="left">
        <img :src="item.coverUrl" alt="" @click="toVideoPage(item.vid)">
        <i class="el-icon-video-camera icon">{{item.durationms | showValue}}</i>
      </div>
      <div class="right">
        <div>{{item.title}}</div>
        <div>{{item.playTime | showTime}}</div>
        <div>{{item.creator[0].userName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimiVideo',
  props: {
    similarVideo: Array
  },
  filters: {
    showValue(value) {
      if(value > 10000) {
        const newValue = (value / 10000).toFixed(2)
        return newValue + '万'
      } else {
        return value
      }
    },
    showTime(value) {
      let date = new Date(value)
      if( date.getSeconds() < 10) {
        return date.getMinutes() + ':' + '0' + date.getSeconds()
      } else {
        return date.getMinutes() + ':' + date.getSeconds()
      }
    }
  },
  methods: {
    toVideoPage(id) {
      this.$router.push(`/home/videoPage?id=${id}`)
    }
  }
}

</script>
<style scoped>
.mv {
  display: flex;
  margin-bottom: 20px;
}
.left {
  position: relative;
}
.icon {
  position: absolute;
  top: 5px;
  left: 145px;
  font-size: 12px;
  color: #ffffff;
}
.left img {
  cursor: pointer;
  width: 220px;
}
.right {
  margin-left: 20px;
}
</style>