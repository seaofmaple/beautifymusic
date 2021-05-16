<template>
  <div id="mv">
    <div class="new-mv">
      <span>最新MV</span>
      <span v-for="(item, index) in newMvType" :key="index" 
      class="new-mv-tag" @click="chooseType(index)"
      :class="{'active': index == currentType}">
      {{item}}
      </span>
      <span @click="toAllMv(1, 0, 2)">更多></span>
    </div>
    <hr>
    <MvList :mvList="newMvList"></MvList>
    <div class="hot-mv">
      <span>热播MV</span>
      <span @click="toAllMv(currentType, 0, 1)">更多></span>
    </div>
    <hr>
    <MvList :mvList="hotMvData"></MvList>
    <div class="origin">
      <span>网易出品</span>
      <span @click="toAllMv(0, 4, 2)">更多></span>
    </div>
    <hr>
    <MvList :mvList="originData"></MvList>
    <div class="mv-rank">
      <span>MV排行榜</span>
      <span v-for="(item, index) in newMvType" :key="index" 
      class="new-mv-tag" @click="chooseMvRank(index)"
      :class="{'active': index == currentMvRank}">
      {{item}}
      </span>
      <span @click="toAllMvRankingList(0)">更多></span>
    </div>
    <hr>
    <MvRanking :mvRankList="mvRankList"></MvRanking>
  </div>
</template>

<script>
import { getMvList,
         getNewMv,
         getOriginMv,
         getMvRank } from '../../../../../network/home'

import MvList from './MvList'
import MvRanking from './MvRanking'

export default {
  name: 'Mv',
  components: {
    MvList,
    MvRanking
  },
  data() {
    return {
      newMvType:['内地','港台','欧美','日本','韩国'],
      choseType: ['ZH', 'GT', 'EA', 'JA', 'KO'], //选择的类型数据与上面对应
      currentType: 0,//当前最新mv
      currentMvRank: 0,//当前mv排行榜
      newMvData: {
        ZH: [], //内地
        GT: [], //港台
        EA: [], //欧美
        JA: [], //日本
        KO: []  //韩国
      },
      originData: [],
      hotMvData: [],
      mvRankData: {
        ZH: [], //内地
        GT: [], //港台
        EA: [], //欧美
        JA: [], //日本
        KO: []  //韩国
      },
      newMvList: [], //当前的newmv数据
      mvRankList: [] //当前的mv排行榜数据
    }
  },
  methods: {
    chooseType(index) {
      this.currentType = index
      const type = this.choseType[index]
      this.newMvList = this.newMvData[type]
    },
    chooseMvRank(index) {
      this.currentMvRank = index
      const type = this.choseType[index]
      this.mvRankList = this.mvRankData[type]
    },
    __getNewMv() {
      getNewMv('内地', 6).then(res => {
        this.newMvData.ZH = res.data
        this.newMvList = res.data
      })
      getNewMv('港台', 6).then(res => {
        this.newMvData.GT = res.data
      })
      getNewMv('欧美', 6).then(res => {
        this.newMvData.EA = res.data
      })
      getNewMv('日本', 6).then(res => {
        this.newMvData.JA = res.data
      })
      getNewMv('韩国', 8).then(res => {
        this.newMvData.KO = res.data
      })
    },
    __getOriginMv() {
      getOriginMv(6, 0).then(res => {
        this.originData = res.data
      }) 
    },
    __getHotMv() {
      getMvList('全部', '最热', '全部', 6, 0).then(res => {
        this.hotMvData = res.data
      })
    },
    __getMvRank() {
      getMvRank('内地',10).then(res => {
        this.mvRankData.ZH = res.data
        this.mvRankList = res.data
      })
      getMvRank('港台',10).then(res => {
        this.mvRankData.GT = res.data
      })
      getMvRank('欧美',10).then(res => {
        this.mvRankData.EA = res.data
      })
      getMvRank('日本',10).then(res => {
        this.mvRankData.JA = res.data
      })
      getMvRank('韩国',10).then(res => {
        this.mvRankData.KO = res.data
      })
    },
    toAllMv(areaActive,typeActive,orderActive) {
      this.$router.push({path:'/home/RecommendVideo/AllMv', query: {
        areaActive,
        typeActive,
        orderActive
      }})
    },
    toAllMvRankingList(area) {
      this.$router.push({
        path: '/home/RecommendVideo/AllMvRankList',
        query: {
          area
        }
      })
    }
  },
  created() {
    this.__getNewMv()
    this.__getOriginMv()
    this.__getMvRank()
    this.__getHotMv()
  }
}

</script>
<style scoped>
.new-mv span:first-child,
.hot-mv span:first-child,
.mv-rank span:first-child,
.origin span:first-child{
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
.new-mv span:last-child,
.hot-mv span:last-child,
.mv-rank span:last-child,
.origin span:last-child{
  font-size: 12px;
  font-weight: 100;
  float: right;
  cursor: pointer;
  margin-top: 18px;
}
.active {
  color: #242323;
  font-weight: bold;
}
</style>