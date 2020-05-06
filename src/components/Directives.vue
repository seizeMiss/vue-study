<template>
  <div id="directives">
    <!-- v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；
         如果在运行时条件很少改变，则使用 v-if 较好 -->
    <!-- 标签不打印 -->
    <p v-if="seen">现在你看到我了1</p>
    <p v-else>现在你看到我了2</p>
    <p v-if="!seen">现在你看到我了3</p>
    <!-- 标签会打印 -->
    <p v-show="seen">现在你看到我了4</p>
    <a v-on:[eventName]="focusA">{{eventName}} me</a>
    <!-- 简写 <a @[eventName]="focusA">{{eventName}} me</a> -->
    <!--
        在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
        除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
        可以像下面，v-bind进行简写
    -->
    <a :[className]="color">{{eventName}} me</a>
    <a v-bind:[className]="color">{{eventName}} me</a>

    <p>
      Ask a yes/no question:
      <input v-model="question" />
    </p>
    <p>{{ answer }}</p>
    <img v-if="isShow" :src="url" />

    <!-- 使用key属性之后，input标签将不会复用 -->
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input"/>
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input"/>
    </template>
    <button @click="changeLoginType">切换{{ loginTypeResult }}登录</button>
    <br/>
  </div>
</template>
  </div>
</template>
<style scoped>
.a-class {
  color: aqua;
}
</style>
<script>
import _ from 'lodash'
import axios from 'axios';
export default {
  name: 'directives',
  data() {
    return {
      seen: false,
      eventName: 'click',
      className: 'class',
      color: 'a-class',
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      isShow: false,
      url: '',
      loginType:'username'
    }
  },
  methods: {
    focusA() {
      this.seen = true;
    },
    getAnswer() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark,:-)';
        return;
      }

      this.answer = 'Thinking....';
      var vm = this;
      // axios get 请求
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer);
          vm.isShow = true;
          vm.url = _.capitalize(response.data.image);
        }).catch(function (error) {
          vm.answer = 'Error!Could not reach the API.' + error;
        })
    },
    changeLoginType(){
      this.loginType = this.loginType == 'username' ? 'aa' : 'username';
    }
  },
  watch: {
    question: function (newQuestion, oldQuesttion) {
      console.log(newQuestion);
      console.log(oldQuesttion);
      this.answer = 'Waiting for you to stop typing.....';
      this.debouncedGetAnswer();
    }
  },
  created: function () {
    // 设置频率去请求API
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  computed:{
    loginTypeResult:function(){
      return this.loginType == 'username' ? 'Email' : 'Username';
    }
  }
}
</script>
