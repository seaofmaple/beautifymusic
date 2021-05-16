<template>
  <div id="home">
    <HeadTopBar></HeadTopBar>
    <div class="content">
      <LeftMenu @changeToRecommend="changeToRecommend" @changeToFind="changeToFind"></LeftMenu>
      <router-view :key="key"></router-view>
      <MusicPlay></MusicPlay>
    </div>
  </div>
</template>

<script>
import {getHomeMessage,
        getHotSearch} from '../../network/home'

import MusicPlay from "../../components/content/musicPlay/MusicPlay";

import HeadTopBar from "./homecomponents/HeadTopBar";
import LeftMenu from "./homecomponents/LeftMenu";
import HomeContent from "./homecomponents/HomeContent";
import ContentBar from "./homecomponents/contentcomponents/ContentBar";

export default {
  name: 'Home',
  components: {
    MusicPlay,
    HeadTopBar,
    LeftMenu,
    HomeContent,
    ContentBar
  },
  data() {
    return {
      isFind: true
    }
  },
  methods: {
    changeToRecommend() {
      this.isFind = false
    },
    changeToFind() {
      this.isFind = true
    }
  },
  computed: {
    key() {
      return this.$route.name ? this.$route.name+new Date() : this.$route + new Date();
    }
  },
}

</script>
<style scoped>
.content{
  display: flex;
}
</style>