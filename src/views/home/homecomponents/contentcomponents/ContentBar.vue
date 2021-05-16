<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo find-music"
      mode="horizontal"
      :router="true"
      active-text-color = "#d15050"
    >
      <el-menu-item index="/home/homeContent/findMusic">个性推荐</el-menu-item>
      <el-menu-item index="/home/homeContent/songList">歌单</el-menu-item>
      <el-menu-item index="/home/homeContent/rankingList">排行榜</el-menu-item>
      <el-menu-item index="/home/homeContent/singerList">歌手</el-menu-item>
      <el-menu-item index="/home/homeContent/newSong">最新音乐</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ContentBar',
  props: {
    isFind: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
       
    }
  }
}

</script>
<style scoped>
.find-music{
  margin-left: 400px;
  width: 410px;
}
</style>