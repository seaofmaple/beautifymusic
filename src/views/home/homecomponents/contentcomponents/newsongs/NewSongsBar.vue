<template>
  <div id="new-song-bar">
    <span class="new-song" :class="{'active': isActive}" @click="changeSong">新歌速递</span>
    <span class="new-album" :class="{'active': !isActive}" @click="changeAlbum">新碟上架</span>
  </div>
</template>

<script>
export default {
  name: 'NewSongBar',
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    changeSong() {
      this.isActive = true
      const active = this.isActive
      this.$emit('showOther', active)
    },
    changeAlbum() {
      this.isActive = false
      const active = this.isActive
      this.$emit('showOther', active)
    }
  }
}

</script>
<style scoped>
#new-song-bar {
  width: 200px;
  height: 30px;
  font-size: 14px;
  font-weight: 100;
  line-height: 30px;
  box-shadow: 1px 1px 1px 1px;
  border-radius: 5px;
  position: relative;
  left: 40%;
  overflow-y: overlay;
}
.new-album, .new-song{
  display: inline-block;
  width: 100px;
  text-align: center;
  background-color: rgb(248, 245, 245);
  cursor: pointer;
}
.new-album {
  border-radius: 0 5px 5px 0;
}
.new-song {
  border-radius: 5px 0 0 5px;
}
.active {
  background-color: rgb(114, 114, 114);
  color: #ffffff;
}
</style>