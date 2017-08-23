import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router';
import axios from 'axios'
Vue.use(ElementUI)

axios.defaults.baseURL = window.location.protocol + '//' +window.location.hostname+":3000";
Vue.prototype.$http = axios;
new Vue({
  router:routes,
  el: '#app',
  render: h => h(App)
})
