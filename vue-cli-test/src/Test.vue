<template>
  <div class="text-box">这是一个 Test 页面 -- {{ username }}</div>
  <button @click="changeName">修改用户名</button>
</template>

<script>
export default {
  name: "Test",
  // 注意： .vue 组件中的 data 不能像之前一样，不能指向对象
  /*data: {
    username: 'zhangsan'
  }*/
  // 注意： 组件中的 data 必须是一个函数
  data() {
    // return 出去可以使用对象格式
    return {
      username: 'zhangsan'
    }
  },
  methods: {
   changeName() {
     // 在组件中，this 就表示当前组件的实例对象
     console.log(this)
     this.username = '哇哈哈'
   }
  }
}
</script>

<style scoped>
.text-box {
  background-color: pink;
}
</style>