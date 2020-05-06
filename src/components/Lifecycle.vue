<template>
  <div id="lifecycle">
    <span>{{a}}</span><button v-on:click="changeVal">Change it</button>
  </div>
</template>

<script>
var data = {
  a:1
};

var layer;
layui.use('layer', function(){
  layer = layui.layer;
});

export default {
  name:'lifecycle',
  data(){
    return data;
  },
  created:function(){
    layer.msg('a created is ' + data.a);
  },
  mounted:function(){
    layer.msg('a mounted is ' + data.a);
  },
  updated:function(){
    layer.msg('a updated is ' + data.a);
  },
  destroyed:function(){
    layer.msg('a destoryed is ' + data.a);
  },
  methods:{
    changeVal(){
      data.a = 2;
    }
  }
}

</script>
