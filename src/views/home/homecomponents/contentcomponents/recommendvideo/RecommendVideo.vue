<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo video"
      mode="horizontal"
      :router="true"
      active-text-color = "#d15050"
    >
      <el-menu-item index="/home/RecommendVideo/mv">MV</el-menu-item>
      <el-menu-item index="/home/RecommendVideo/video">视频</el-menu-item>
    </el-menu>
    <router-view id="third" :key="this.$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'RecommendVideo',
  computed: {
    key() {
      return this.$route.name ? this.$route.name+new Date() : this.$route+ new Date();
    }
  },
}

</script>
<style scoped>
.video {
  margin-left: 600px;
  width: 132px;
}
#third{
  width: 1300px;
  height: 540px;
  overflow-y: auto;
  position: relative;
}
#third::-webkit-scrollbar {
  display: none;
}
</style>