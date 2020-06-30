<template>
  <div id="app">
  <router-view></router-view>
</div>
</template>
<script>
import VueRouter from 'vue-router'
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
export default {

}
</script>
