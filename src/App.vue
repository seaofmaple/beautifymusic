<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from './views/home/Home'
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
html,body{
  margin:0;
  padding:0;
}
.el-slider__button {
  width: 10px !important;
  height: 10px !important;
  border: 2px solid rgb(198, 47, 47) !important;
}

.el-slider__runway {
  background: #8b8a89;
}

.el-slider__bar {
  background-color: #ff4e4e !important;
}

.volume .el-slider__button {
  width: 5px !important;
  height: 5px !important;
  border: 1px solid #ec4141 !important;
  background: #ec4141;
}

.volume .el-slider__runway {
  background: #e6e6e8;
}
</style>
