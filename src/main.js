import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import './stylus/main.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
}).$mount('#app');

const $ = require('jquery');
window.$ = $;