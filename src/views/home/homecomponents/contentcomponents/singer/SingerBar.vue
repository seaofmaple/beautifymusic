<template>
  <div id="singer-bar">
    <div class="languages">
      <div class="kind">语种 :</div>
      <div class="tags">
        <span v-for="(item,index) in languages" 
        :class="{'active': item[1] == currentLanguage}"
        @click="changeLanguage(item[1],index)"
        :key="index">
        {{item[0]}}
        </span>
      </div>
    </div>
    <div class="languages">
      <div class="kind">分类 :</div>
      <div class="tags">
        <span v-for="(item,index) in singerCategory" 
        :class="{'active': item[1] == currentCategory}"
        @click="changeCategory(item[1],index)"
        :key="index">
        {{item[0]}}
        </span>
      </div>
    </div>
    <div class="languages">
      <div class="kind">筛选 :</div>
      <div class="tags">
        <span v-for="(item,index) in firTags" 
        :class="{'active': item[1] == currentLetter}"
        @click="changeLetter(item[1],index)"
        :key="index">
        {{item[0]}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerBar',
  data() {
    return {
      currentLanguage: -1,
      currentCategory: -1,
      currentLetter: -1,
      singerCategory: [
        ["全部", -1],
        ["男歌手", 1],
        ["女歌手", 2],
        ["乐队", 3]
      ],
      languages: [
        ["全部", -1],
        ["华语", 7],
        ["欧美", 96],
        ["日本", 8],
        ["韩国", 16],
        ["其他", 0],
      ],
      firTags: [
        ["热门", -1],
        ["A", "a"],
        ["B", "b"],
        ["C", "c"],
        ["D", "d"],
        ["E", "e"],
        ["F", "f"],
        ["G", "g"],
        ["H", "h"],
        ["I", "i"],
        ["J", "j"],
        ["K", "k"],
        ["L", "l"],
        ["M", "m"],
        ["N", "n"],
        ["O", "o"],
        ["P", "p"],
        ["Q", "q"],
        ["R", "r"],
        ["S", "s"],
        ["T", "t"],
        ["U", "u"],
        ["V", "v"],
        ["W", "w"],
        ["X", "x"],
        ["Y", "y"],
        ["Z", "z"],
        ["#", 0],
      ],
    }
  },
  methods: {
    changeLanguage(tag, index) {
      this.$emit("cleanSingerInfo");
      this.currentLanguage = tag
      this.$emit('getSingerInfo', this.currentLanguage, this.currentCategory, this.currentLetter, 0)
    },
    changeCategory(tag, index) {
      this.$emit("cleanSingerInfo");
      this.currentCategory = tag
      this.$emit('getSingerInfo', this.currentLanguage, this.currentCategory, this.currentLetter, 0)
    },
    changeLetter(tag, index) {
      this.$emit("cleanSingerInfo");
      this.currentLetter = tag
      this.$emit('getSingerInfo', this.currentLanguage, this.currentCategory, this.currentLetter, 0)
    }
  }
} 

</script>
<style scoped>
.active {
  color: rgb(201, 20, 20);
  background-color: #fce6e6;
  border-radius: 5px;
  text-align: center;
}
.languages {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  width: 90%;

  margin-bottom: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.kind {
  height: 100%;
  text-align: center;
  line-height: 30px;
  width: 80px;
  grid-column: 1/2;
  float: left;
}
.tags {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  text-align: center;
  line-height: 30px;
  grid-column: 2/14;
  cursor: pointer;
}
</style>