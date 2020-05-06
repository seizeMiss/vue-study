
<template>
  <div id="demo">
    {{message1 | showTime}}
    <br />
    {{message2 | showTime}}
    <br />
    {{message}}
    <br />
    reverse message:"{{ reverseMessage1() }}"
    <br />
    reverse message:"{{message | reverse}}"
    <br />
    {{message | reverse | length | merge('请忽略。')}}
    <!-- 可以进行传参 -->
    <br />
    <span>{{ showTime() }}</span>
    <span>{{ now }}</span>
  </div>
</template>
<script>

var data = {
  message1: "你好",
  message2: "测试",
  message: '测试一个测试文件',
  now:Date.now()
}

export default {
  name: 'Page2',
  data() {
    return data
  },
  methods: {
    reverseMessage1() {
      return reverseMessage(this.message);
    },
    showTime(){
      return Date.now();
    }
  },
  computed:{
    currentTime:function(){
      return Date.now();
    }
  },
  filters: {
    reverse: function (value) {
      return reverseMessage(value);
    },
    length: function (value) {
      value = value.toString();
      return "文本\"" + value + "\"的长度:" + value.length;
    },
    merge: function (value, value2) {
      return value + ',' + value2;
    }
  }
}

data.message = '上海自来水来自海上';

function reverseMessage(value) {
  value = value.toString();
  return value.split('').reverse().join('');
}
</script>
