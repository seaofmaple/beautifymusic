<template>
  <div id="search-mv">
    <div v-for="(item, index) in mvs" :key="index" class="video-item">
      <div class="image" @click="toMvPage(item.id)">
        <div class="count">
          <i class="el-icon-video-camera"></i>
          <span>{{item.playCount | showValue}}</span>
        </div>
        <img :src="item.cover" alt="">
      </div>
      <div class="video-info">
        <div class="title">
          <div v-if="item.type == 0" class="mv-icon">MV</div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="artist">{{item.artistName}}</div>
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
  name: 'SearchMv',
  props: {
    total: Number,
    mvs: Array
  },
  data() {
    return {
      currentPage: 0
    }
  },
  methods: {
    handleCurrentPage(page) {
      this.$emit('mvChange', page)
    },
    toMvPage(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  },
  filters:{
    showValue(value) {
      if(value > 10000) {
        return (value / 10000).toFixed(2) + '万'
      } else {
        return value
      }
    }
  }
}

</script>
<style scoped>
#search-mv {
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
.name{
  font-weight: 100;
  margin-left: 5px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist {
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
}
.page {
  margin-left: 450px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>