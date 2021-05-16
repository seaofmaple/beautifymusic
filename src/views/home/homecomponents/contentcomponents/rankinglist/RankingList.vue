<template>
  <div id="ranking-list">
    <div class="title">官方榜</div>
    <div class="list">
      <div class="list-item" v-for="(item,index) in topList" :key="index">
        <RankingCategory :listDetail="item"></RankingCategory>
      </div>
    </div>
    <div>
      <div class="title">全球榜</div>
      <RecommendSongs :songs="otherList"></RecommendSongs>
    </div>
  </div>
</template>

<script>
import { getRankingTags } from '../../../../../network/home'

import RankingCategory from './RankingCategory'
import RecommendSongs from '../findMusic/RecommendSongs'

export default {
  name: 'RankingList',
  data() {
    return {
      list: [],
      topList: [],
      otherList:[]
    }
  },
  components: {
    RankingCategory,
    RecommendSongs
  },
  created() {
    getRankingTags().then(res => {
      this.list = res.list
      for(let i = 0; i < 4; i++) {
        this.topList.push(this.list[i])
      }
      for(let i = 4; i < this.list.length; i++) {
        this.otherList.push(this.list[i])
      }
    })
  }
}

</script>
<style scoped>
.list{
  display: flex;
  margin-bottom: 30px;
}
.list-item{
  flex: 1;
}
.title{
  font-size: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1.5px solid rgb(80, 79, 79);
}
</style>