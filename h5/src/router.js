import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from './page/index.vue'



// RoutesPicBrowse
const routes = [
    {path: '/', component: index},
    {path: '*', redirect: { path: '/' }}
];
export default new VueRouter({
    routes: routes
})
