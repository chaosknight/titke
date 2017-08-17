import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './router';
Vue.use(ElementUI)

new Vue({
  router:routes,
  el: '#app',
  render: h => h(App)
})
