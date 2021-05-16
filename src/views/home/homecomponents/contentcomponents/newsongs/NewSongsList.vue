<template>
  <div id="new-songs-list">
    <NewSongBar @showOther="switchItem"></NewSongBar>
    <NewSongs v-show="isShow"></NewSongs>
    <NewAlbums v-show="!isShow"></NewAlbums>
  </div>
</template>

<script>
import NewSongBar from './NewSongsBar'
import NewSongs from './NewSongs'
import NewAlbums from './NewAlbums'


export default {
  name: 'NewSongsList',
  components: {
    NewSongBar,
    NewSongs,
    NewAlbums
  },
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    switchItem(active) {
      this.isShow = active
    }
  }
}

</script>
<style scoped>
</style>