<template>
  <div id="Home">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li v-for="(item, index) in links" :class="[index == 0 ? 'layui-this' : '']" v-on:click="$goRoute(item.route)">{{item.text}}</li>
      </ul>
      <div class="layui-tab-content" style="height: 100px;">
        <div class="layui-tab-item layui-show">
          <router-view></router-view>
        </div>
        <div class="layui-tab-item">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      links: [
        {
          text: '基础知识',
          route: '/page1'
        },
        {
          text: '过滤器',
          route: '/page2'
        },
        {
          text: '组件化',
          route:'/Component'
        },
        {
          text: '生命周期',
          route:'/Lifecycle'
        },
        {
          text: '指令',
          route:'/Directives'
        },
        {
          text: '表单',
          route:'/Form'
        },
        {
          text: '组件',
          route:'/Template'
        }
      ]
    }
  }
}
</script>
