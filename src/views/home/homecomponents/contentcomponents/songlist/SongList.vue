<template>
  <div id="song-list">
    <div>
      <div>
        <div>
          <button @click="tagChange">{{tagName}} ></button>
        </div>
      </div>
      <div class="tags-list" v-show="isShow">
        <TagsList :tagKind="tagKind" @changeTag="changeTag"> </TagsList>
      </div>
      <div id="lists">
      <div>
        <RecommendSongs :songs="lists"></RecommendSongs>
      </div>
      <el-pagination
      :page-size="30"
      :background="true"
      :current-page.sync="currentPage"
      @current-change="handleCurrentPage($event)"
      layout="prev, pager, next"
      :total="totalList"
      class="page">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import { getSongList } from '../../../../../network/home'

import TagsList from './TagsList';
import RecommendSongs from '../findMusic/RecommendSongs'
export default {
  name: 'SongList',
  components: {
    TagsList,
    RecommendSongs
  },
  data() {
    return {
      tagName: '全部歌单',
      isShow: false,
      tagKind: '全部歌单',
      lists: [],
      totalList: 0,
      currentPage: 1
    }
  },
  methods: {
    tagChange() {
      this.isShow = !this.isShow
    },
    changeTag(name) {
      this.tagName = name
      this.tagKind = name
      this.isShow = !this.isShow
      this.__getSongList(name, 0, 30)
      this.currentPage = 1
    },
    __getSongList(name,page,count) {
      getSongList(name,page,count).then(res => {
      this.lists = res.playlists
      this.totalList = res.total
    })
    },
    handleCurrentPage(page,$event) {
      this.__getSongList(this.tagKind, page - 1, 30)
    }
  },
  created() {
    this.__getSongList(this.tagKind, 0, 30)
  }
}

</script>
<style scoped>
button{
  width: 100px;
  height: 30px;
  background-color: #fff;
  border-radius: 5px;
}
.page{
  margin-left: 400px;
  margin-top: 30px;
  margin-bottom: 50px;
}
.hotCategory{
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  line-height: 50px;
  /* margin-left: 200px; */
}
.hot-tags{
  width: 80px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ec4141;
  color: #fff;
}
</style>