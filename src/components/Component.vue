<template>
  <div id="component">
    <span>{{message}}</span>
    <button v-on:click="changeValue">Change it</button>
    <ol>
      <todo-item v-for="item in groceryList"
                 v-bind:todo="item"
                 v-bind:key="item.id"
      ></todo-item>
    </ol>
    <a @click.self.prevent="doThis">点击自身</a><br/>
    <a @click.once="doThis">点击一次</a>
    <!-- 阻止单击事件继续传播 -->
    <a @click.stop="doThis">点击阻止</a>
    <input v-on:keyup.enter="pressEnter" placeholder="监听enter键"/>
  </div>
</template>

<script>
import Vue from 'vue';
// 自定义组件
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props:['todo'],
  template:'<li>{{todo.text}}</li>'
});

var data = {
      message:'hello component',
      groceryList:[
        {id:0,text:'蔬菜'},
        {id:1,text:'奶酪'},
        {id:2,text:'其他'},
      ]
}

// Object.freeze(data);

export default {
  name:'component',
  data(){
    return data
  },
  methods:{
    changeValue(){
      data.message = 'change component';
    },
    doThis(){
      alert('doThis');
    },
    pressEnter(){
      alert('press enter');
    }
  }
}

data.message = 'other component';
data.groceryList.push({id:3,text:'牛奶'});
// data.groceryList.reverse();
data.groceryList = data.groceryList.filter(function(val){
  return val.id>2;
});
Vue.set(data.groceryList, data.groceryList.length, {id:5, text:'水果'});
data.groceryList.splice(data.groceryList.length, 1, {id:6,text:'饮料'});
</script>
