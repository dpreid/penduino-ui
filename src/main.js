import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";

//import ReconnectingWebSocket from '../public/js/reconnecting-websocket.min.js';

export const eventBus = new Vue();

Vue.config.productionTip = false
//Vue.use(ReconnectingWebSocket);

new Vue({
  render: h => h(App),
}).$mount('#app')
