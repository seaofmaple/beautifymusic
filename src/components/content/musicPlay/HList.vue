<template>
  <div id="p-list">
    <div class="top-bar">
      <div class="total">总共{{total}}首</div>
      <div class="clear-all" @click="clearAll">
        <i class="el-icon-delete"></i>
        <span>清空</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item, index) in playHistorySongs" :key="index" @dblclick="play(item.id)">
        <div class="name">{{item.name}}</div>
        <div class="artist">{{item.ar[0].name}}</div>
        <div class="play-time">{{item.dt | showTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongDetail } from '../../../network/songListPage'

export default {
  name: 'PList',
  props: {
    playHistorySongs: Array
  },
  computed: {
    total() {
      return this.$store.getters.showPlayHistory.length
    }
  },
  filters: {
    showTime(value) {
      let date = new Date(value)
      if( date.getSeconds() < 10) {
        return date.getMinutes() + ':' + '0' + date.getSeconds()
      } else {
        return date.getMinutes() + ':' + date.getSeconds()
      }
    }
  },
  methods: {
    clearAll() {
      this.$store.commit('clearPlayHistory')
    },
    play(id) {
      this.$store.commit('changeCurrentMusic', id)
      this.$store.commit('addMusicToPlayList', id)
      this.$store.commit('addMusicToPlayHistory', id)
    }
  }
}

</script>
<style scoped>
.top-bar {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 100;
  height: 25px;
  line-height: 25px;
  display: flex;
  border-top:  1px solid #ddd;
  border-bottom:  1px solid #ddd;
}
.total {
  margin-left: 20px;
  width: 500px;
  border-right: 1px solid #ddd;
}
.clear-all {
  cursor: pointer;
  width: 100px;
  float: right;
}
.el-icon-delete {
  margin-left: 5px;
  margin-right: 10px;
}
.list-item {
  display: flex;
  font-size: 12px;
  color: rgb(119, 119, 118);
  background-color: #fff;
  height: 30px;
  font-weight: 100;
  line-height: 30px;
}
.list .list-item:nth-child(even) {
  background-color: rgb(238, 236, 236);
}
.list {
  height: 520px;
  overflow: auto;
}
.name {
  margin-left: 20px;
  width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist {
  width: 150px;
}
.play-time {
  width: 50px;
}
.el-icon-caret-right {
  color: rgb(219, 21, 21);
  font-size: 18px;
  margin-top: 5px;
}
</style>