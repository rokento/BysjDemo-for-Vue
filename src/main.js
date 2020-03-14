import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './elementUI/Elementui'



import('./css/commoncss.css')
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
