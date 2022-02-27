<template>
  <div class="right-container">
    <h3>Right 组件 --- 来自Left数据：{{ msgFromLeft }}</h3>
    <hr />

    <MyCount :init="6"></MyCount>
  </div>
</template>

<script>
import bus from './eventBus'
export default {
  data() {
    return {
      msgFromLeft: ''
    }
  },
  created() {
    bus.$on('share', val => {
      this.msgFromLeft = val
    })
  }
}
</script>

<style lang="less">
.right-container {
  padding: 0 20px 20px;
  background-color: lightskyblue;
  min-height: 250px;
  flex: 1;
}

h5 {
  color: pink;
}
</style>
