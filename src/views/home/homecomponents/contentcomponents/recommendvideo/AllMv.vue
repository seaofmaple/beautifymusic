<template>
  <div id="all-mv">
    <div class="title">全部MV</div>
    <hr>
    <div class="area">
      <span>地区:</span>
      <span class="area-item" v-for="(item, index) in area" :key="index"
      :class="{'active' : index == areaActive}" @click="changeArea(index)">{{item}}</span>
    </div>
    <div class="type">
      <span>类型:</span>
      <span class="type-item" v-for="(item, index) in type" :key="index"
      :class="{'active' : index == typeActive}" @click="changeType(index)">{{item}}</span>
    </div>
    <div class="order">
      <span>排序:</span>
      <span class="order-item" v-for="(item, index) in order" :key="index"
      :class="{'active' : index == orderActive}" @click="changeOrder(index)">{{item}}</span>
    </div>
    <MvList :mvList="allMvData"></MvList>
  </div>
</template>

<script>
import { getMvList } from '../../../../../network/home'

import MvList from './MvList'
export default {
  name: 'AllMv',
  data() {
    return {
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      type: ['全部', '官方版', '原生', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新'],
      areaActive: this.$route.query.areaActive,
      typeActive: this.$route.query.typeActive,
      orderActive: this.$route.query.orderActive,
      allMvData: []
    }
  },
  components: {
    MvList
  },
  methods: {
    changeArea(index) {
      this.areaActive = index
      this.__getMvList()
    },
    changeType(index) {
      this.typeActive = index
      this.__getMvList()
    },
    changeOrder(index) {
      this.orderActive = index
      this.__getMvList()
    },
    __getMvList() {
      let currentArea = this.area[this.areaActive],
          currentType = this.type[this.typeActive],
          currentOrder = this.order[this.orderActive]
      console.log(currentArea, currentType, currentOrder);
      getMvList(currentArea,currentType,currentOrder,30,0).then(res => {
        this.allMvData = res.data
      })
    }
  },
  created() {
    this.__getMvList()
  }
}

</script>
<style scoped>
.title {
  font-size: 25px;
  font-weight: 100;
}
.area, .type, .order{
  margin-top: 10px;
}
span {
  display: inline-block;
  width: 60px;
  font-size: 14px;
  height: 16px;
  padding: 5px;
  border-radius: 2px;
  text-align: center;
  line-height: 16px;
  color: #616161;
  cursor: pointer;
}
.active {
  background-color: #706e6e;
  color: #ffffff;
}
</style>