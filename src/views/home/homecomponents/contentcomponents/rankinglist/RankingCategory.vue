<template>
  <div id="ranking-category">
    <img :src="listDetail.coverImgUrl" alt="" @click="toRankList(listDetail.id)">
    <div class="songs-list">
      <div class="songs" v-for="(item, index) in listDetail.tracks" :key="index">
        <div style="color:red; font-size: 18px; width: 30px">{{index + 1}} </div>
        <div class="song-name">{{item.first}}</div>
        <div class="singer">{{item.second}}</div>
      </div>
    </div>
    <div class="look-all" @click="lookAll">查看全部 ></div>
  </div>
</template>

<script>
export default {
  name: 'RankingCategory',
  props: {
    listDetail: Object
  },
  methods: {
    toRankList(id) {
      this.$router.push(`/home/songsListInfo?id=${id}`)
    },
    lookAll() {
      this.$router.push(`/home/songsListInfo?id=${this.listDetail.id}`)
    }
  }
}

</script>
<style scoped>
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
  width: 300px;
}
.songs{
  width: 300px;
  display: flex;
  font-size: 14px;
  font-weight: 100;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(151, 149, 149);
}
.song-name {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.singer{
  float: right;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.look-all {
  width: 300px;
  height: 50px;
  line-height: 50px;
  position: relative;
  left: 220px;
  cursor: pointer;
}
</style>