import Vue from 'vue'
import Vuex from 'vuex'
// import VueAnalytics from "vue-analytics"
import NProgress from 'vue-nprogress'
import VueRouter from 'vue-router'
import { store } from './store/index'

import App from './App.vue'


import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

import VueTimeago from 'vue-timeago'

import Trend from 'vuetrend';
Vue.use(Trend);

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja'),
  }
})
Vue.use(NProgress);
Vue.use(VueRouter);

// The matching uses path-to-regexp, which is the matching engine used
// by express as well, so the same matching rules apply.
// For detailed rules, see https://github.com/pillarjs/path-to-regexp
const router = new VueRouter({    
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'HomeOverview',
      component: HomePage
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    }
  ]
})

new Vue({
  router:router,
  store:store,  
  el: '#app',
  render: h => h(App)
});
