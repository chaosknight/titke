import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from './page/index.vue'
import orderlist from './page/orderlist.vue'


// RoutesPicBrowse
const routes = [
    {path: '/', component: index},
    {path:'/order_edit/:id',component:index},
    {path: '/order_list', component: orderlist},
    {path: '*', redirect: { path: '/' }}
];
export default new VueRouter({
    routes: routes
})
