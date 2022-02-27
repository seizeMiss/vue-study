<template>
  <div class="app-container">
    <h1>App 根组件 -- 来自子组件 Left 的消息： {{msgFromSon}}</h1>

    <button @click="flag = !flag">Toggle Flag</button>
    <Test info="你好" v-if="flag"></Test>
    <hr>
    <input type="text" v-if="inputVisible" @blur="showButton" ref="iptRef" />
    <button v-else @click="showInput">展示输入框</button>

    <hr>
    <button @click="resetCount">重置Left的count值</button>

    <hr />
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <!-- 3. 以标签形式，使用注册好的组件 -->
      <Left @sendParent="getMessage" ref="leftRef"></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
// 1. 导入需要使用的 .vue 组件
import Left from "@/components/Left";
import Right from "@/components/Right";
import Test from "@/components/Test";

export default {
  name: 'App',
  // 2. 注册组件
  components: {
    Left,
    Right,
    Test
  },
  data() {
    return {
      flag: false,
      msgFromSon: '',
      inputVisible: false
    }
  },
  methods: {
    showButton() {
      this.inputVisible = false
    },
    showInput() {
      // 1. 切换布尔值，把文本框展示出来
      this.inputVisible = true

      // 2. 让展示出来的文本框，自动获取焦点
      this.$nextTick(() => {
        // 使用自定义的 ref 获取该 DOM 节点
        this.$refs.iptRef.focus()
      })
    },
    resetCount() {
      console.log(this.$refs.leftRef)
      this.$refs.leftRef.count = 0
    },
    getMessage(val) {
      this.msgFromSon = val
    }
  }
}
</script>

<style lang="less">
.app-container {
  padding: 1px 20px 20px;
  background-color: #efefef;
}
.box {
  display: flex;
}
</style>
