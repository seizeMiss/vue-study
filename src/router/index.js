import Vue from 'vue'
import Router from 'vue-router'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import Component from '@/components/Component'
import Lifecycle from '@/components/Lifecycle'
import Directives from '@/components/Directives'
import Form from '@/components/Form'
import Template from '@/components/Template'
import RouterTest from '@/components/RouterTest'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {
          path: '/page1',
          name: 'page1',
          component: page1,
        },
        {
          path: '/page2',
          name: 'page2',
          component: page2,
        },
        {
          path: '/Component',
          name: 'component',
          component: Component,
        },
        {
          path: '/Lifecycle',
          name: 'lifecycle',
          component: Lifecycle,
        },
        {
          path: '/Directives',
          name: 'directives',
          component: Directives,
        },
        {
          path: '/Form',
          name: 'form',
          component: Form,
        },{
          path: '/Template',
          name: 'template',
          component: Template,
        },{
          path: '/RouterTest',
          name: 'routertest',
          component: RouterTest,
        },
      ]

    },

  ],
  mode:'history'
})
