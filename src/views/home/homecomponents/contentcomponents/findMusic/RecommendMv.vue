<template>
  <div id="recommend-mv">
    <div v-for="(item, index) in mvs" :key="index" class="mv-list">
      <div class="el-icon-caret-right icon-right">{{item.playCount}}</div>
      <img :src="item.picUrl" alt="" @click="mvClick(item.id)">
      <div>{{item.name}}</div>
      <div style="margin-top:15px;font-size:14px">{{item.artistName}}</div>
    </div>
  </div>
</template>

<script>
import { getRecommendMv } from '../../../../../network/home'
export default {
  name: 'RecommendMv',
  data() {
    return {
      mvs: []
    }
  },
  methods: {
    mvClick(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  },
  created() {
    getRecommendMv().then(res => {
      const data = res.result
      for(let i = 0; i < 3; i++) {
        this.mvs.push(data[i])
      }
    })
  }
}

</script>
<style scoped>
#recommend-mv {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.mv-list {
  flex: 1;
  padding: 10px 0;
  position: relative;
}
.mv-list img{
  flex-grow: 1;
  width: 400px;
  border-radius: 5px;
  cursor: pointer;
}
.icon-right{
  position: absolute;
  top: 20px;
  right: 50px;
  color: rgb(255, 255, 255);
  text-shadow: rgb(0 0 0) 0px 0px 2px;
}
</style>