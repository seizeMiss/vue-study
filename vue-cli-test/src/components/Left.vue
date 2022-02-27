<template>
  <div class="left-container">
    <h3>Left 组件 --- {{count}}</h3>
    <hr />

    <MyCount :init="count"></MyCount>

    <button @click="sendMsg1">发送给父组件</button>
    <button @click="sendMsg2">发送给兄弟组件</button>
  </div>
</template>

<script>
import bus from "./eventBus.js";

export default {
  data() {
    return {
      count: 9,
      msg: 'Hello Vue.js'
    }
  },
  methods: {
    sendMsg1() {
      this.$emit('sendParent', this.msg)
    },
    sendMsg2() {
      bus.$emit('share', this.msg)
    }
  }
}
</script>

<!-- 防止组件样式冲突 -->
<style lang="less" scoped>
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}

h3 {
  color: red;
}

// h5[data-v-3c83f0b7]
// [data-v-3c83f0b7] h5

// 当使用第三方组件库的时候，如果有修改第三方组件默认样式的需求，需要用到 /deep/
/deep/ h5 {
  color: gray;
}
</style>
