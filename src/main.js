import Vue from 'vue';
import App from './App.vue';
import 'es6-promise/auto';
import store from "./streamStore.js";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapVue from 'bootstrap-vue';
//import ReconnectingWebSocket from '../public/js/reconnecting-websocket.min.js';
Vue.use(BootstrapVue)



import 'bootstrap-vue/dist/bootstrap-vue.css';

export const eventBus = new Vue();

Vue.config.productionTip = false
//Vue.use(ReconnectingWebSocket);

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
