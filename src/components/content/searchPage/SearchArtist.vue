<template>
  <div id="search-artist">
    <div  v-for="(item, index) in artists" :key="index" class="art-item" @click="toArtistPage(item.id)">
      <div class="image">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="name">
        <span>{{item.name}}</span>
        <i class="el-icon-user"></i>
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
  name: 'SearchArtist',
  props: {
    artists: Array,
    total: Number
  },
  data() {
    return {
      currentPage: 0
    }
  },
  methods: {
    handleCurrentPage(page) {
      this.$emit('songsChange',page)
    },
    toArtistPage(id) {
      this.$router.push(`/home/artistPage?id=${id}`)
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
</style>