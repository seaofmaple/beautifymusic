<template>
  <div id="mv-ranking">
    <div class="mv-ranking-item" v-for="(item, index) in mvRankList" :key="index">
      <div class="ranking">
        {{index + 1 | showRank}}
      </div>
      <div class="score-img">
        <div class="score">
          <span>热度: </span>
          <span>{{item.score}}</span>
        </div>
        <img :src="item.cover" alt="" @click="toMvPage(item.id)">
      </div>
      <div class="name-artist">
        <div class="name">{{item.name}}</div>
        <div class="artist">{{item.artistName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvRanking',
  props: {
    mvRankList: Array
  },
  methods: {
    toMvPage(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  },
  filters: {
    showRank(value) {
      return value < 10 ? '0' + value : value
    }
  }
}

</script>
<style scoped>
#mv-ranking {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.ranking {
  font-size: 40px;
  margin-top: 40px;
  font-style: italic;
  color: #696969;
}
.score-img {
  position: relative;
  margin-left: 15px;
}
.score-img img {
  width: 300px;
  height: 150px;
  cursor: pointer;
}
.mv-ranking-item {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
}
.score {
  position: absolute;
  z-index: 10;
  color: #ffffff;
  font-size: 13px;
  right: 10px;
  text-shadow: 1px 1px 1px #000;
}
.name-artist {
  margin-top: 30px;
  width: 200px;
  margin-left: 25px;
}
.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.artist {
  font-size: 14px;
  font-weight: 100;
  margin-top: 5px;
}
</style>