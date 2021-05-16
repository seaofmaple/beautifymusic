<template>
  <div id="search-songs">
    <SongsList :lists="lists"></SongsList>
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
import SongsList from '../songListInfo/SongsList'
export default {
  name: 'SearchSongs',
  data() {
    return {
      currentPage: 0
    }
  },
  props: {
    lists: Array,
    total: Number
  },
  components:{
    SongsList
  },
  methods: {
    handleCurrentPage(page) {
      this.$emit('songsChange',page)
    }
  }
}

</script>
<style scoped>
.page {
  margin-left: 450px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>