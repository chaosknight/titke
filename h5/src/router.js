import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from './page/index.vue'
import update from './page/update.vue'
import orderlist from './page/orderlist.vue'
import view from './page/orderview.vue'
import setting_default from './page/setting_default.vue'
import setting_sug from './page/setting_sug.vue'

// RoutesPicBrowse
const routes = [
    {path: '/', component: orderlist},
    {path:'/order_edit/:id',component:update},
    {path:'/order_new',component:index},
    {path:'/order_view/:id',component:view},
    {path: '/order_list', component: orderlist},
    {path: '/setting_default', component: setting_default},
    {path:'/setting_sug', component: setting_sug},
    {path: '*', redirect: { path: '/' }}
];
export default new VueRouter({
    routes: routes
})
