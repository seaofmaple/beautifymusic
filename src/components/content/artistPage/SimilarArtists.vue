<template>
  <div id="similar-artists">
    <div class="artist" v-for="(item, index) in simiArtists" :key="index" @click="toArtistPage(item.id)">
      <img :src="item.picUrl" alt="">
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimilarArtists',
  props: {
    simiArtists: Array
  },
  methods: {
    toArtistPage(id) {
      this.$router.push(`/home/artistPage?id=${id}`)
    }
  }
}

</script>
<style scoped>
#similar-artists {
  display: flex;
  flex-wrap: wrap;
}
.artist {
  padding: 5px;
  cursor: pointer;
}
.artist img{
  width: 200px;
  height: 200px;
}
.name {
  width: 200px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>