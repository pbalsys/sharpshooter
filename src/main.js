import Vue from 'vue'
import App from './App'
import 'flexboxgrid2/flexboxgrid2.min.css'
Vue.config.productionTip = false

Vue.filter('round', function (value) {
  if (!value) return ''
  return Math.round(value * 100) / 100
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
