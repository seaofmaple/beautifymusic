<template>
  <div>
    <RecommendSwipper></RecommendSwipper>
    <div class="re-song-list">推荐歌单</div>
    <RecommendSongs></RecommendSongs>
    <div class="re-song-list">独家放送</div>
    <PrivateSend></PrivateSend>
    <div class="re-song-list">最新音乐</div>
    <NewMusic></NewMusic>
    <div class="re-song-list">推荐MV</div>
    <RecommendMv></RecommendMv>
  </div>
</template>

<script>
import RecommendSwipper from './RecommendSwipper';
import RecommendSongs from './RecommendSongs';
import RecommendMv from './RecommendMv';
import PrivateSend from './PrivateSend';
import NewMusic from './NewMusic';

export default {
  name: 'FindMusic',
  components: {
    RecommendSwipper,
    RecommendSongs,
    RecommendMv,
    PrivateSend,
    NewMusic
  }
}

</script>
<style scoped>
.re-song-list{
  font-size: 20px;
  color: rgb(80, 79, 79);
  padding: 15px;
  border-bottom: 1px solid rgb(211, 208, 208);
}
</style>