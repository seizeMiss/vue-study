### 什么是VUE

#### 1.构建用户界面

- 用vue往HTML页面填充数据，非常的方便

#### 2.框架

- 框架是一套线程的解决方案，程序也只能遵守框架的规范，去编写自己的业务功能
- 要学习vue，就是在学习vue框架中规定的用法
- vue的指令，组件（对UI结构的复用）、路由、Vuex、vue组件库

### vue的两个特性

1. 数据驱动视图

   - 数据的变化会**驱动视图**的自动更新

   - 好处：开发者只管把数据维护好，那么页面结构会被Vue自动渲染出来
   - 属于单向的数据绑定

2. 双向数据绑定

> 在网页中，form表单负责**采集数据**，Ajax负责**提交数据**
>
> 好处：开发者不再需要手动操作 DOM 元素，来获取表单元素最新的值

- js 数据的变化，会自动渲染到页面上

- 页面上表单采集的数据发生变化的时候，会被 vue 自动获取到，并更新到 js 数据中

  > 注意：数据驱动视图和双向数据绑定的底层原理是 MVVM

### MVVM

- **Model** 表示当前页面渲染所依赖的数据源
- **View** 表示当前页面所渲染的 DOM 结构
- **ViewModel** 表示 vue 的实例，他是MVVM的核心，把当前页面的数据源和页面结构连接在一起

### Vue的指令和过滤器

#### 1.指令

##### 1.内容渲染指令

​	v-text: 覆盖元素的默认值

​	{{}}(插值表达式): 只是内容的占位符，不会覆盖原来的内容呢

​	v-html: 可以渲染包含html的内容

##### 2.属性绑定指令

> 注意：插值表达式只能用在元素的节点中，不能用在属性节点中

在 vue 中，可以使用 v-bind: 指令，为元素动态绑定值

可以使用 : 作为简写，是单向绑定指令

在使用 v-bind 属性绑定期间，如果绑定内容需要进行动态拼接，则字符串的外面应该包裹单引号，例如

```html
<div :title="'box' + index">这是一个div</div>
```



##### 3.事件绑定指令

v-on 绑定事件，可以使用 @ 代替

$event: 远程 DOM 的事件对象，让方法可以传递本身的事件对象

应用场景：如果默认的时间对象 e 被覆盖了，则可以手动传递一个 $event。

```html
<button @click='add(n, $event)'></button>

methods: {
	add(n, e) {
		e.preventDefault()
		this.count += n
	}
}
```

事件修饰符：例如 @click.prevent

.prevent 阻止默认行为

```html
<a @click.prevent='xxx'></a>
```

.stop 阻止事件冒泡，例如阻止点击事件冒泡，内外层同时声明点击事件，点击内部事件，外部事件也被执行

```html
<a @click.stop ='xxx'></a>
```

按键修饰符

@keyup.esc @keyup.enter 等

##### 4.双向绑定指令

v-model: 在不操作 DOM 数据的条件下，快速获取表单的数据

适用于表单元素：input textarea select

v-model 修饰符

.number: 将用户输入的内容转成 number

.trim: 自动过滤用户输入的前后空白字符

.lazy: 在 change 时而非 input 时更新，减缓更新

##### 5.条件渲染指令

1.v-show 的原理是：动态为元素添加或者移除 display：none 样式，实现元素的显示和隐藏

> 如果要频繁的显示和隐藏使用v-show性能会好些

2.v-if 的原理是：每次动态创建或者移除元素，实现元素的显示和隐藏

> 如果进入页面的时候，某些元素默认不需要被展示，而且后期这个元素很可能不需要被展示出来，此时v-if性能会好一些

3.在实际开发中，绝大多数情况，不用考虑性能问题，直接使用v-if

##### 6.列表渲染指令

v-for 示例 v-for=“(item, index) in list”

> 官方建议，如果使用 v-for 指令，那么一定绑定一个 :key 属性（既提高性能，又防止列表状态混乱），
>
> 而且，尽量把 id 作为 key 的值, key的类型只能是字符串或者整型类型
>
> key的值是不能重复的
>
> index的值当做 key 的值没有任何意义，跟内容没有一一绑定，会代码超出预期的情况

#### 2.过滤器

应用场景：插值表达值 和 v-bind 属性绑定

1.要定义到 filters 节点下，本质是一个函数

2.在过滤器函数中，一定要有return 值

3.在过滤器的形参中，就可以获取到 “|” 前面待处理的那个值



私有过滤器



全局过滤器：多个vue实例之间共享过滤器

```js
Vue.filter('capitalize', (str) => {
    return str.chatAt(0).toUpperCase() + str.slice(1)
})
```

4.如果全局过滤器和私有过滤器名字一直，此时按照“就近原则”，调用的是私有过滤器

#### 3.侦听器

侦听器本质是一个函数，监听那个变量的变化，就是用那个变量的变量名作为watch里面的方法名

```javascript
// 侦听器定义的位置
watch: {
	username(newVal, oldVal) {
		console.log(newVal, oldVal)
	} 
}
```

应用场景：实时请求后台，查看用户名是否存在

1.方法格式的侦听器

> 缺点1：无法在刚进入页面的时候，自动触发
>
> 缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器

2.对象格式的侦听器

> 好处：可以通过**immediate** 选项，让侦听器自动触发
>
> 侦听对象时，如果属性发生变化，都会触发侦听器

```javascript
username: {
	handler: function(newVal, oldVal) {
		console(newVal, oldVal)
	},
    // 默认 false, 控制侦听器自动触发一次
	immediate: true,
    // 开启深度监听，只要对象的属性发生了变化，都会触发“对象侦听器”
    deep: true
}
```

侦听对象子属性的变化，必须包裹一层单引号

```javascript
'info.username'(newVal) {
	console.log(newVal)
}
```

#### 4.计算属性

计算属性定义的时候，要定义成方法格式

```javascript
// 计算属性定义的位置
computed: {
	rgb() {
		return `rgb(${this.r}, ${this.g}, ${this.b})`
	} 
}
```

在使用计算属性的时候，当做普通的属性使用即可

好处：

1.实现了代码的附庸

2.只要计算属性的依赖数据源发生了变化，自动属性会重新求值

#### 5.axios

> 调用axios方法得到的是一个 Promise 对象

##### 基本使用

1.发起GET请求

```javascript
axios({
    method: 'GET',
    url: 'xxx',
    params: {}
}).then(function(res) {
    console.log(res)
});
```

2.发起POST请求  

```javascript
// 如果调用某个方法的返回值是 Promise 实例，则前面可以添加 await
// await 只能用在被 async 修饰的方法中
// 解构赋值的时候，使用 ：重命名
const { data : res } = await axios({
    method: 'POST',
    url: 'xxx',
    data: {
        name: 'zs',
        age: 20
    }
});
console.log(res.data)
```



### Vue-cli 的使用

#### 基础

1.在终端下运行如下命令，创建指定名称的项目：

```
vue create 项目名称
```

2.vue项目中src目录构成：

```
assets 文件夹： 存放项目中用到的静态资源文件，例如：css样式表、图片资源
components 文件夹：封装的，可复用的组件,，都放在该目录下
main.js: 是项目的入口文件，整个项目的运行，要先执行 main.js
App.vue 是项目的根组件
```

3.vue项目的运行流程

通过main.js 把 App.vue 渲染到 index.html 的指定区域中



#### Vue 组件

##### 三个组成部分

**template**： 组件的模板结构，需要外层包含仅仅一个 DIV

**script**： 组件的javascript行为

**style**： 组件的样式



##### 父子组件传值

###### 父传子

子组件定义

```javascript
// props 是"自定义属性"，允许使用者通过自定义属性，为当前组件指定初始值
// 自定义属性的名字，是封装者自定义的（只要名称合法即可）
// props 中的数据，可以直接在模板结构中被使用
// 注意：props 是只读的，不要直接修改 props 的值，否则终端会报错！
// 要修改props的值，只需要把该值传到 data 中即可 
props: {
    // 自定义属性A : { /* 配置选项 */ },
    // 自定义属性B : { /* 配置选项 */ },
    // 自定义属性C : { /* 配置选项 */ },
    init: {
      // 如果外界使用 Count 组件的时候，没有传递 init 属性，则默认值生效
      default: 0,
      // init 的值类型必须是 Number 数字
      type: Number,
      // 必填项校验
      required: true
    }
  }
```

父组件可以通过在子组件的标签中设置属性就可以就行传值

> 注意： 单页面程序，组件间会存在样式冲突
>
> 解决：可以在子组件设置样式为 scope

###### 子传父

子组件向父组件共享数据使用自定义事件

```javascript

export default {
    data() {
        return {
            msg: 'Hello Vue.js'
        }
    },
    methods: {
        sendMsg() {
            this.$emit('share', this.msg)
        }
    }
}
```

```javascript
<Son @share='getMessage'>

export default {
    data() {
        return {
            msgFromSon: ''
        }
    },
    methods: {
        getMessage(msg) {
            this.msgFromSon = val
        }
    }
}
```



###### 兄弟组件

1.创建eventBus.js 模块， 并向外共享一个 Vue 实例对象

```javascript
import Vue from 'vue'
export default new Vue()
```

2.在数据发送方，调用 bus.$emit('事件名称', 要发送的数据)方法触发自定义事件

```javascript
import bus from './eventBus.js'
export default {
    data() {
        return {
            msg: 'Hello Vue.js'
        }
    },
    methods: {
        sendMsg() {
            bus.$emit('share', this.msg)
        }
    }
}
```



3.在数据接收方，调用 bus.$on('事件名称', 事件处理函数)方法注册一个自定义事件

```javascript
import bus from './eventBus.js'
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
```



##### 生命周期

创建阶段 --> 更新阶段 --> 销毁阶段

图示：

![](D:\study\front\vue-study\lifecycle.png)



















