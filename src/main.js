// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/MainFrame'
import axios from 'axios'
import VueAxios from 'vue-axios'
import post from './components/postContent'

Vue.use(VueRouter)
Vue.use(VueAxios,axios)

const routes = [{
  path: '/',
  component: Home
},{
  path: '/:board',
  component: Home
},{
  path: '/post/:postId',
  component: post
}

]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
