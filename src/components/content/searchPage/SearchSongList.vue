<template>
  <div id="search-songlist">
    <div class="songlist-item" v-for="(item, index) in songLists" :key="index" @click="toSonglistPage(item.id)">
      <div class="image">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="name">{{item.name}}</div>
      <div class="count">{{item.trackCount}}首</div>
      <div class="creator">
        <span>by</span>
        <span>{{item.creator.nickname}}</span>
      </div>
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
  name: 'SearchSongList',
  props: {
    total: Number,
    songLists: Array
  },
  data() {
    return {
      currentPage: 0
    }
  },
  methods: {
    handleCurrentPage(page) {
      this.$emit('songListChange', page)
    },
    toSonglistPage(id) {
      this.$router.push(`/home/songsListInfo?id=${id}`)
    }
  }
}

</script>
<style scoped>
.songlist-item {
  display: flex;
  font-size: 14px;
  font-weight: 100;
  height: 100px;
  line-height: 100px;
}
.image img{
  width: 100px;
  cursor: pointer;
}
.songlist-item:nth-child(even) {
  background-color: rgb(221, 220, 220);
}
.name{
  width: 700px;
  margin-left: 10px;
  cursor: pointer;
}
.count {
  width: 100px;
}
.creator span:first-child {
  margin-right: 5px;
  color: rgb(73, 72, 72);
} 
.page {
  margin-left: 450px;
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>