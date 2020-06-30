<template>
  <div id="app">
    <p>--------------------只渲染一次,值不再发生变化-----------------------</p>
    <h3 v-once>{{message}}</h3>
    <input
      class="layui-input"
      type="text"
      v-bind:value="message"
      v-on:focus="focusInput"
      name="content"
      placeholder="请输入内容"
    />
    <br />
    <p>--------------------绑定class-----------------------</p>
    <div v-bind:class="{btext:sepText,aurora:!showGround}">{{message}}</div>
    <div v-bind:class="{btext:sepText,aurora:showGround}">{{message}}</div>
    <div v-bind:class="styleEffect">{{message}}</div>
    <div :class="[isColor ? colorA : colorB]">{{message}}</div>
    <p>--------------------绑定鼠标右、中、左键-----------------------</p>
    <button
      class="layui-btn layui-btn-normal"
      @click.right="rightMethod"
      @click.middle="middleMethod"
      @click="leftMethod"
    >{{message}}</button>
    <p>--------------------循环-----------------------</p>
    <ul>
      <li v-for="value in objs">{{value}}</li>
    </ul>
    <ul>
      <li v-for="(value, key, index) in objs">{{index}}:{{key}}:{{value}}</li>
    </ul>
    <p>--------------------computed-----------------------</p>
    <div>{{fullName}}</div>
    <p>--------------------方法(watch)-----------------------</p>
    <span>{{company}}</span>
    <br />
    <span>emp1:{{emp1}}</span>
    <br />
    <span>emp2:{{emp2}}</span>
    <br />
    <el-button @click="changeCompany">点我</el-button>
    <p>--------------------v-model和懒加载-----------------------</p>
    <br />
    输入：<el-input type="text" v-model="message" />
    <br />
    懒加载：<input class="layui-input" v-model.lazy="message" />
    <!-- v-model 实现数据的双向绑定 -->
    <!-- v-model 加上lazy等失去焦点才改变 -->
    <div>{{message}}</div>
  </div>
</template>
<style type="text/css">
#app > div {
  width: 200px;
  height: 80px;
}
.btext {
  color: darkorange; /*橙黄文字颜色*/
}
.aurora {
  background-color: darkturquoise; /*青蓝背景颜色*/
}
</style>
<script>
var layer;
layui.use(['layer'], function () {
  layer = layui.layer;
});

export default {
  name: "helloVue",
  data() {
    return {
      message: 'hello vue!!',
      sepText: true,
      showGround: false,
      styleEffect: {
        'btext': false,
        'aurora': true
      },
      isColor: true,
      colorA: "btext",
      colorB: "aurora",
      objs: {
        firstName: 'John',
        lastName: 'Doe',
        age: 26
      },
      company: '乡村爱情',
      emp1: '乡村爱情-赵四',
      emp2: '乡村爱情-刘能'
    }
  },
  methods: { // 具体方法，通常用于vue的基本主键
    focusInput() {
      this.message = 'hello world!!';
    },
    rightMethod() {
      this.message = '鼠标右键';
    },
    middleMethod() {
      this.message = '鼠标滚轮';
    },
    leftMethod() {
      this.message = '鼠标左键';
      layer.msg('已点击鼠标左键');
    },
    changeCompany() {
      this.company = '东北F2';
    }
  },
  computed: { // 某些属性的计算得到的结果,有缓存
    fullName: function () {
      return this.objs.firstName + " " + this.objs.lastName;
    }
  },
  watch: { // 通常用于某一个数据可能影响多个数据的值时
    company: function (newCompany) {
      this.emp1 = newCompany + '-赵四';
      this.emp2 = newCompany + '-刘能';
    }
  }
}

</script>
