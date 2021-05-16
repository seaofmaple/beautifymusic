<template>
  <div id="mv-list">
    <div class="mv-list-item" v-for="(item, index) in mvList" :key="index">
      <div class="icon">
        <i class="el-icon-video-camera"></i>
        <span class="play-count">{{item.playCount | showCount}}</span>
      </div>
      <div class="duration">{{item.duration | showTime}}</div>
      <img :src="item.imgurl" alt="" @click="toMvPage(item.id)">
      <div class="name">{{item.name}}</div>
      <div class="artist">{{item.artistName}}</div>
    </div>
    <el-pagination
      :page-size="9"
      :background="true"
      :current-page.sync="currentPage"
      @current-change="handleCurrentPage(currentPage)"
      layout="prev, pager, next"
      :total="total"
      class="page">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ArtistMv',
  props: {
    mvList: Array,
    total: Number
  },
  data() {
    return {
      currentPage: 0
    }
  },
  methods: {
    toMvPage(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    },
    handleCurrentPage(page) {
      this.$emit('changePage', page)
    }
  },
  filters: {
    showCount(value) {
      return value < 10000 ? value : (value/10000).toFixed(2) + '万'
    },
    showTime(value) {
      let date = new Date(value)
      if( date.getSeconds() < 10) {
        return date.getMinutes() + ':' + '0' + date.getSeconds()
      } else {
        return date.getMinutes() + ':' + date.getSeconds()
      }
    }
  }
}
</script>
<style scoped>
#mv-list {
  display: flex;
  flex-wrap: wrap;
}
.duration {
  position: absolute;
  color: #ffffff;
  top: 200px;
  left: 20px;
  text-shadow: 1px 1px 1px #000;
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
  height: 300px;
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
.page {
  margin-left: 400px;
  margin-bottom: 50px;
}
</style>