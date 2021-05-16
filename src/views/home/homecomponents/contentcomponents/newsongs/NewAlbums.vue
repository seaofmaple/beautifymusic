<template>
  <div id="new-albums">
    <div class="category">
      <span v-for="(item, index) in category" :key="index" 
      class="category-item" @click="ChangeItem(index, item[1])"
      :class="{'active': currentIndex == index}">
      {{item[0]}}
      </span>
    </div>
    <div class="week-album">
      <div class="week" v-if="currentIndex == 0">本周新碟</div>
      <div class="now" v-else>
        <div class="month">{{month}}</div>
        <div class="year">{{year}}</div>
      </div>
      <div class="album">
        <div class="album-item" v-for="(item, index) in albums" :key="index"> 
          <img :src="item.picUrl" alt="">
          <div class="album-name">{{item.name}}</div>
          <div class="artist">{{item.artists[0].name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbums } from '../../../../../network/home'
export default {
  name: 'NewAlbums',
  data() {
    return {
      albums: [],
      category: [
        ['全部', 'ALL'],
        ['华语', 'ZH'],
        ['欧美', 'EA'],
        ['日本', 'JP'],
        ['韩国', 'KR']
      ],
      currentIndex: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
    }
  },
  methods: {
    __getAlbums(area, limit, page) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      getAlbums(area, limit, page, year, month).then(res => {
        this.albums = res.weekData ? res.weekData : res.monthData
      })
    },
    ChangeItem(index, type) {
      this.currentIndex = index
      console.log(type);
      this.__getAlbums(type, 48, 0)
    }
  },
  created() {
    this.__getAlbums('ALL', 48, 0)
  }
}

</script>
<style scoped>
.month {
  font-size: 50px;
  font-weight: bold;
}
.year {
  font-size: 30px;
  font-weight: 100;
  color: #838080;
  font-style: italic;
  text-shadow: 1px 1px 1px #000;
}
.category{
  width: 100%;
  height: 50px;
  line-height: 40px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgb(126, 123, 123);
}
.category-item{
  display: inline-block;
  width: 80px;
  padding-bottom: 10px ;
  cursor: pointer;
  text-align: center;
}
.active {
  border-bottom: 3px solid rgb(126, 126, 126);
}
.week-album {
  margin-top: 30px;
  display: flex;
}
.week{
  display: inline-block;
  width: 30px;
  font-size: 30px;
  margin-left: 20px;
}
.album {
  width: 100px;
  margin-left: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.album-item  {
  margin-left: 10px;
  width: 250px;
  height: 350px;
}
.album-item img {
  width: 250px;
  height: 250px;
}
.album-name, .artist {
  width: 250px;
  font-weight: 100;
}
.artist  {
  margin-top: 5px;
}
</style>