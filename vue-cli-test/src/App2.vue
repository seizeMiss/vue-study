<template>
  <div class="app-container">
    <Header title="购物车案例"></Header>
    <Goods v-for="item in cartList" :key="item.id"
           :id="item.id"
           :title="item.goods_name"
           :pic="item.goods_img"
           :price="item.goods_price"
           :state="item.goods_state"
           :count="item.goods_count"
           @state-change="calStatistical"
    ></Goods>
    <Footer
      :all="selectedCount"
      :amount="totalPrice"
      :isfull="isFull"
      @full-change="fullChange"
    ></Footer>
  </div>
</template>

<script>
// 1. 导入需要使用的 .vue 组件
import Header from "@/components/Header/Header"
import Goods from "@/components/Goods/Goods"
import Footer from "@/components/Footer/Footer"
import axios from 'axios'
import eventBus from "@/components/eventBus";

export default {
  name: 'App',
  // 2. 注册组件
  components: {
    Header,
    Goods,
    Footer
  },
  data() {
    return {
      cartList: [],
    }
  },
  created() {
    this.initCartList()
    // 兄弟组件传值
    eventBus.$on('share', val => {
      this.cartList.some((item, index) => {
        if(val.id === item.id) {
          item.goods_count = val.value
        }
      })
    })
  },
  computed: {
    // 统计属性放在 computed 中
    isFull() {
      return this.cartList.every(item => item.goods_state)
    },
    totalPrice() {
      // 先过滤 filter， 在累加 reduce
      return this.cartList.filter(item => item.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0)
    },
    selectedCount() {
      // 先过滤 filter， 在累加 reduce
      return this.cartList.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count, 0)
    }
  },
  methods: {
    // 封装请求列表数据的方法
    async initCartList() {
      const {data: res} = await axios.get("https://www.escook.cn/api/cart")
      if (res.status === 200) {
        this.cartList = res.list
        // this.setFooterVal()
      }
    },
    calStatistical(obj) {
      this.cartList.some((item, index) => {
        if (item.id === obj.id) {
          item.goods_state = obj.value
        }
      })
    },
    fullChange(val) {
      this.cartList.forEach(item => item.goods_state = val)
    },
    setFooterVal() {
      this.isFull = this.cartList.every(item => item.goods_state)
      this.totalPrice = this.cartList.filter(item => item.goods_state).reduce((total, item) => total += item.goods_price, 0)
      this.selectedCount = this.cartList.filter(item => item.goods_state).reduce((total, item) => total += 1, 0)
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}

</style>
