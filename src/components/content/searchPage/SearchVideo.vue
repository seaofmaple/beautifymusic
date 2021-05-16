<template>
  <div id="search-video">
    <div v-for="(item, index) in videos" :key="index" class="video-item">
      <div class="image" @click="toMvPage(item.vid,item.type)">
        <div class="count">
          <i class="el-icon-video-camera"></i>
          <span>{{item.playTime | showValue}}</span>
        </div>
        <img :src="item.coverUrl" alt="">
      </div>
      <div class="video-info">
        <div class="title">
          <div v-if="item.type == 0" class="mv-icon">MV</div>
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>
    <el-pagination
      :page-size="30"
      :background="true"
      :current-page.sync="currentPage"
      @current-change="handleCurrentPage(currentPage)"
      layout="prev, pager, next"
      :total="total"
      class="page"
      v-show="total > 30">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SearchVideo',
  props: {
    total: Number,
    videos: Array
  },
  data() {
    return {
      currentPage: 0
    }
  },
  filters: {
    showValue(value) {
      if(value > 10000) {
        return (value / 10000).toFixed(2) + '万'
      } else {
        return value
      }
    }
  },
  methods: {
    toMvPage(id, type) {
      if(type == 0) {
        this.$router.push(`/home/mvPage?id=${id}`)
      } else {
        console.log(id);
      }
    },
    handleCurrentPage(page) {
      this.$emit('videoChange', page)
    }
  }
}

</script>
<style scoped>
#search-video {
  display: flex;
  flex-wrap: wrap;
}
.video-item {
  padding: 10px;
  position: relative;
}
.image img {
  width: 200px;
  cursor: pointer;
}
.count {
  position: absolute;
  right: 20px;
  font-size: 12px;
  text-shadow: 1px 1px 1px #000;
  top: 15px;
  font-weight: 100;
  color: #ffffff;
}
.title{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  display: flex;
}
.mv-icon {
  font-size: 12px;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: rgb(230, 17, 17);
  border: 1px solid rgb(230, 17, 17);
}
.title div:last-child{
  font-weight: 100;
  margin-left: 5px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.page {
  margin-left: 450px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>