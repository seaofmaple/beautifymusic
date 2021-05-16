<template>
  <div id="new-music">
    <div v-for="(item, index) in newList" :key="index" class="new-list">
      <img :src="item.picUrl" alt="" @dblclick="itemClick(item.id)">
      <div class="new-name">{{item.song.artists[0].name}}</div>
      <div class="artist">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { getNewMusic,
         getMusicUrl } from '../../../../../network/home'
export default {
  name: 'NewMusic',
  data() {
    return {
      newList: [],
      musicUrl: ''
    }
  },
  methods: {
    itemClick(id) {
      this.$store.commit('changeCurrentMusic',id)
    }
  },
  created() {
    getNewMusic(12).then(res => {
      this.newList = res.result
    })
  }
}

</script>
<style scoped>
#new-music {
  margin-top: 15px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 10px;
}
.new-list{
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
}
.new-list img {
  width: 80px;
  height: 80px;
}
.new-name {
  position: absolute;
  left: 100px;
  top: 60px;
}
.artist {
  position: absolute;
  left: 100px;
  top: 20px;
}
</style>