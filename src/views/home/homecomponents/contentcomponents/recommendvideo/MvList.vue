<template>
  <div id="mv-list">
    <div class="mv-list-item" v-for="(item, index) in mvList" :key="index">
      <div class="icon">
        <i class="el-icon-video-camera"></i>
        <span class="play-count">{{item.playCount | showCount}}</span>
      </div>
      <img :src="item.cover" alt="" @click="toMvPage(item.id)">
      <div class="name">{{item.name}}</div>
      <div class="artist">{{item.artistName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvList',
  props: {
    mvList: Array
  },
  methods: {
    toMvPage(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  },
  filters: {
    showCount(value) {
      return value < 10000 ? value : (value/10000).toFixed(2) + '万'
    }
  }
}

</script>
<style scoped>
#mv-list {
  display: flex;
  flex-wrap: wrap;
}
.name {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mv-list-item img{
  width: 400px;
  height: 225px;
  flex-grow: 1;
  cursor: pointer;
}
.mv-list-item {
  padding: 10px;
  width: 400px;
  height: 300px;
  position: relative;
}
.icon {
  position: absolute;
  right: 20px;
  top: 15px;
  color: #ffffff;
}
.play-count {
  text-shadow: 1px 1px 1px #000;
}
.artist {
  margin-top: 5px;
  font-size: 14px;
  color: #707070;
}
</style>