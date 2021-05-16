<template>
  <div id="all-mv-rank-list">
    <div class="mv-rank">
      <span>MV排行榜</span>
      <span v-for="(item, index) in area" :key="index" 
      class="new-mv-tag" @click="chooseMvRank(index)"
      :class="{'active': index == currentMvRank}">
      {{item}}
      </span>
    </div>
    <hr>
    <MvRanking :mvRankList="mvRankList"></MvRanking>
  </div>
</template>

<script>
import {getMvRank} from '../../../../../network/home'

import MvRanking from './MvRanking';
export default {
  name: 'AllMvRankList',
  data() {
    return {
      area: [ '内地', '港台', '欧美', '日本', '韩国'],
      currentMvRank: this.$route.query.area,
      mvRankList: []
    }
  },
  components: {
    MvRanking
  },
  methods: {
    chooseMvRank(index) {
      this.currentMvRank = index
      this.__getMvRank()
    },
    __getMvRank() {
      let areaType = this.area[this.currentMvRank]
      getMvRank(areaType,50).then(res => {
        this.mvRankList = res.data
      })
    }
  },
  created() {
    this.__getMvRank()
  }
}

</script>
<style scoped>
.mv-rank span:first-child {
  font-size: 25px;
  font-weight: 100;
}
.new-mv-tag {
  margin-left: 10px;
  display: inline-block;
  width: 50px;
  font-size: 15px;
  font-weight: 100;
  color: #696868;
  border-right: 1px solid #c5c5c5;
  cursor: pointer;
}
.active {
  color: #242323;
  font-weight: bold;
}
</style>