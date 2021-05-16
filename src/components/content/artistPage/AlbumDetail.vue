<template>
  <div class="album-detail">
    <div class="top"> 
      <img :src="album.picUrl" @click="toSonglist(album.id)">
      <div>{{album.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumDetail',
  props: {
    album: Object
  },
  methods: {
    toSonglist(id) {
      this.$router.push(`/home/album?id=${id}`)
    }
  }
}

</script>
<style scoped>
.album-detail {
  padding: 10px;
}
.top {
  margin-top: 10px;
}
.top img {
  width: 200px;
  cursor: pointer;
}
</style>