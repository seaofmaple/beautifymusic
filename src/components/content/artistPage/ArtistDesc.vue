<template>
  <div id="artist-desc">
    <div class="top-desc">
      <div class="title">{{artistInfo.name}}简介</div>
      <p>{{artistInfo.briefDesc}}</p>
    </div>
    <div class="desc-item" v-for="(item, index) in artistDesc" :key="index">
      <div class="title">{{item.ti}}</div>
      <p>{{item.txt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistDesc',
  props: {
    artistDesc: Array,
    artistInfo: Object
  }
}

</script>
<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
p{
  font-size: 14px;
  line-height: 35px;
  color: rgb(70, 68, 68);
  white-space: pre-line;
}
</style>