import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from './page/index.vue'
import orderlist from './page/orderlist.vue'
import view from './page/orderview.vue'


// RoutesPicBrowse
const routes = [
    {path: '/', component: orderlist},
    {path:'/order_edit/:id',component:index},
    {path:'/order_new',component:index},
    {path:'/order_view/:id',component:view},
    {path: '/order_list', component: orderlist},
    {path: '*', redirect: { path: '/' }}
];
export default new VueRouter({
    routes: routes
})
