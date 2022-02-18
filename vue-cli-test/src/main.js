import Vue from 'vue'
// 导入 App.vue 根组件，将来要把 App.vue 中的模板结构，渲染到HTML页面中
import App from './App.vue'

import Test from './Test'

Vue.config.productionTip = false

new Vue({
  // 指定的组件，渲染到HTML页面中，直接替换  #app 的 div
  render: h => h(Test),
}).$mount('#app')
// Vue 实例的 $mount() 方法，作用和 el 属性是一样的