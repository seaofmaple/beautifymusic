<template>
  <div id="search-albun">
    <div  v-for="(item, index) in album" :key="index" class="art-item" @click="toAlbumPage(item.id)">
      <div class="image">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="name">
        <span>{{item.name}}</span>
        <span>{{item.artist.name}}</span>
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
  name: 'SearchAlbum',
  props: {
    album: Array,
    total: Number
  },
  data() {
    return {
      currentPage: 0
    }
  },
  methods: {
    handleCurrentPage(page) {
      this.$emit('albumChange',page)
    },
    toAlbumPage(id) {
      this.$router.push(`/home/album?id=${id}`)
    }
  }

}

</script>
<style scoped>
.art-item:nth-child(even) {
  background-color: rgb(229, 226, 226);
}
.art-item {
  display: flex;
  cursor: pointer;
}
.image img {
  width: 80px;
  height: 80px;
}
.name {
  margin-left: 50px;
  height: 80px;
  line-height: 80px;
}
.name span:last-child {
  position: absolute;
  right: 200px;
}
.page {
  margin-left: 450px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>