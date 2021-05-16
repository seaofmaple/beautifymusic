<template>
  <div id="private-send">
    <div v-for="(item, index) in sendList" :key="index" class="send-list">
      <img :src="item.picUrl" alt="" @click="sendClick(item.id)">
      <div class="send-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { getPrivateSend } from '../../../../../network/home'
export default {
  name: 'PrivateSend',
  data() {
    return {
      sendList: []
    }
  },
  methods: {
    sendClick(id) {
      this.$router.push(`/home/mvPage?id=${id}`)
    }
  },
  created() {
    getPrivateSend(3).then(res => {
      this.sendList = res.result
    })
  }
}

</script>
<style scoped>
#private-send{
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.send-list{
  flex: 1;
}
.send-list img{
  width: 400px;
  flex-grow: 1;
  cursor: pointer;
}
.send-name {
  font-size: 20px;
  width: 400px;
  margin-top: 20px;
}
</style>