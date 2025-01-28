import {createRouter, createWebHistory} from 'vue-router'
import register from './components/register.vue'
import home from './components/home.vue'



const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'frontView', component: home},
    {path: '/registerLogin', name: 'regLogin', component: register}
  
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router