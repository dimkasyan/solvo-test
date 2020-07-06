import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/HomePage.vue'
import SessionLog from '../components/SessionLog/SessionLog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Главная страница',
    component: Home
  },
  {
    path: '/sessionlog',
    name: 'Журнал посещений',
    component: SessionLog
  },
  { path: '*', redirect: '/' }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
