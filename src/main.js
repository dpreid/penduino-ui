import Vue from 'vue';
import App from './App.vue';

import store from "./streamStore.js";


import 'bootstrap';
//import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import 'es6-promise/auto';
export const eventBus = new Vue();

Vue.config.productionTip = false
//Vue.use(ReconnectingWebSocket);

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
