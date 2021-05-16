<template>
  <div>
    <div id="content">
      <ContentBar></ContentBar>
      <router-view id="second" :key="key"/>
    </div>
  </div>
</template>

<script>
import ContentBar from './contentcomponents/ContentBar';
export default {
  name: 'HomeContent',
  computed: {
    key() {
      return this.$route.name ? this.$route.name+new Date() : this.$route + new Date();
    }
  },
  components: {
    ContentBar
  }
}

</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
#content{
  width: 1300px;
  height: 600px;
  overflow-y: auto;
  position: relative;
}
</style>