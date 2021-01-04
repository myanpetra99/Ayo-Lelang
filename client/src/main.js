// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io'
import * as io from "socket.io-client";
Vue.use(new VueSocketIO({
  debug: true,
  connection: io('http://localhost:8081'), //options object is Optional
})
);

Vue.config.productionTip = false

Vue.use(VueAxios,axios);

window.axios = require('axios')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
