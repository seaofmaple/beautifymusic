<template>
  <div id="singer-list">
    <SingerBar @getSingerInfo="getSinger" ref="singerTag"
     @cleanSingerInfo="cleanSingerInfo"></SingerBar>
    <div class="singer-list infinite-list"
    v-infinite-scroll="load" 
    infinite-scroll-disabled="disabled"
    style="overflow:auto">
      <div v-for="(item, index) in singers" :key="index" 
      class="singer-item infinite-list-item">
        <img :src="item.picUrl" @click="toArtistPage(item.id)">
        <div class="singer-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SingerBar from './SingerBar'

import { getSingerList } from '../../../../../network/home'

export default {
  name: 'SingerList',
  data() {
    return {
      singers: [],
      loading: true,
      more: false,
      page: 0,
    }
  },
  components: {
    SingerBar
  },
  methods: {
    getSinger(language, category, letter,page) {
      getSingerList(language,category,letter, this.page).then(res => {
        this.singers = this.singers.concat(res.artists)
        this.more = res.more
      })
    },
    load() {
      if (this.more === false) return;
      console.log(this.more);
      this.getSinger(
        console.log(this.$refs.singerTag.languageTag,
        this.$refs.singerTag.genderTag,
        this.$refs.singerTag.firTag,
        this.page)
      )
      this.page++
    },
    cleanSingerInfo() {
      this.singers = []
    },
    toArtistPage(id) {
      this.$router.push(`/home/artistPage?id=${id}`)
    }
  },
  created() {
    this.getSinger(-1,-1,-1,0)
  }
}

</script>
<style scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
}
.singer-list img{
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 5px;
}
.singer-item{
  flex: 1;
  padding-left: 10px;
  padding-bottom: 20px;
}
.singer-name{
  margin-top: 10px;
}
</style>