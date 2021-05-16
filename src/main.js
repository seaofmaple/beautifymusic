import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element'
import { VueJsonp } from 'vue-jsonp'
import axios from 'axios';

axios.defaults.withCredentials = true;
Vue.use(VueJsonp)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
