import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router';
import axios from 'axios'
import Vuex from 'vuex';
Vue.use(ElementUI)
Vue.use(Vuex)
//axios.defaults.baseURL = window.location.protocol + '//' +window.location.hostname+":3000";
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$http = axios;
import stores from './store'
const store = new Vuex.Store(stores)

store.dispatch('loadsetting');
new Vue({
  store:store,
  router:routes,
  el: '#app',
  render: h => h(App)
})
