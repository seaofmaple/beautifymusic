<template>
<div id="home-swiper">
    <el-carousel height="200px" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <el-image :src="item.pic"></el-image>
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>

<script>
import {getHomeMessage} from '../../../../../network/home'
export default {
  name: 'RecommendSwipper',
  data() {
    return {
      banners : []
    }
  },
  created() {
    getHomeMessage().then(res => {
      getHomeMessage().then(res => {
      this.banners = res.data.blocks[0].extInfo.banners
    })
    })
  }
}
</script>
<style scoped>
#home-swiper{
  flex: 1;
  width: 1200px;
  margin-left: 100px;
  margin-top: 20px;
}
</style>