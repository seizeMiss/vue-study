<template>
  <div id="components-demo">
    <p>--------------组件示例------------------</p>
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>

    <p>--------------组件值传递----------------</p>
    <blog-post title="My journey with Vue" content="hello, this is My journey with Vue"></blog-post>
    <blog-post title="Blogging with Vue" content="hello, this is Blogging with Vue"></blog-post>
    <p>-------------实际使用-------------------</p>
    <blog-post
      v-for="post in posts"
      :key="post.id"
      v-bind:title="post.title"
      v-bind:content="post.content"
    ></blog-post>
    <blog-post v-bind:title="post.title" :content="post.content"></blog-post>
    <p>---------------单向数据流-----------------</p>
    <button-counter2 :count2="count2"></button-counter2>
    <p>--------------子组件向外传值--------------</p>
    <!--需要在自定义模版标签上添加一个自定义事件来接收count值-->
    <button-counter3 :count3="count3" @increment-click="countHandle"></button-counter3>
    <p>子组件传递的值：{{ count3 }}</p>

    <p>--------------单个根元素----------</p>
    <div :style="{fontSize:postFontSize + 'em'}">
    <blog-post2 v-for="post in posts" v-bind:key="post.id" v-bind:post="post" @enlarge-text="onEnlargeText"></blog-post2>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

Vue.component('button-counter', {
  // 一个组件的data选项必须是一个函数
  // 若没有该规则，会影响到其他组件实例
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

Vue.component('blog-post', {
  props: {title:String, content:String},
  template: '<div><h3>{{ title }}</h3><p>{{ content }}</p></div>'
})

Vue.component('blog-post2', {
  props: ['post'],
  template: `
    <div>
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text', 0.1)">Enlarge text</button>
      <p>{{ post.content }}</p>
    </div>
    `
})

Vue.component('button-counter2', {
  props: ['count2'],
  data: function () {
    return {
      counter: this.count2
    }
  },
  template: '<button v-on:click="changeCount">You clicked me {{ counter }} times.</button>',
  methods: {
    changeCount: function () {
      this.counter++;
    },
  }
});

Vue.component('button-counter3', {
  props: ['count3'],
  template: '<button v-on:click="changeCount">You clicked me {{ counter2 }} times.</button>',
  methods: {
    changeCount: function () {
      this.count3++;
      // 需要在子组件的点击触发事件changeCount()里做一个“通知”处理
      this.$emit('increment-click');
    },

  },
  computed: {
    counter2: function () {
      return this.count3;
    }
  },
});

let data = {
  count2: 1,
  count3: 0,
  posts: [
    { id: 1, title: 'My journey with Vue', content: 'hello, this is My journey with Vue' },
    { id: 2, title: 'Blogging with Vue', content: 'hello, this is Blogging with Vue' }
  ],
  post: { id: 3, title: 'Why Vue is so fun', content: 'Hello, this is Why Vue is so fun' },
  postFontSize:1
}

export default {
  name: "components-demo",
  data() {
    return data
  },
  methods: {
    countHandle: function () {
      this.count3++;
    },
    onEnlargeText:function(enlargeAmount){
      this.postFontSize += enlargeAmount;
    }
  }
}

// 动态值的改变
data.posts[0].title = 'Why Vue is so fun';
data.posts[0].content = 'Hello, this is Why Vue is so fun';
data.count2 = 10;


</script>


