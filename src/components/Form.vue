<template>
  <div id="form">
    <!-- v-model 会忽略所有表单元素的 value、checked、selected attribute
    的初始值而总是将 Vue 实例的数据作为数据来源-->
    <p>---------------输入框------------------</p>
    <input v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
    <p>---------------多行输入框------------------</p>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ text }}</p>
    <br />
    <textarea v-model="text" placeholder="add multiple lines"></textarea>
    <br />
    <p>---------------复选框------------------</p>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    <br />
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    <br />
    <span>Checked names: {{ checkedNames }}</span>
    <br />
    <p>---------------单选框------------------</p>
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <br />
    <span>Picked: {{ picked }}</span>
    <br />
    <p>---------------选择框------------------</p>
    <select v-model="selected">
      <!-- 如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。
      因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。-->
      <option disabled value>请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
      <option>D</option>
    </select>
    <span>Selected: {{ selected }}</span>
    <br />
    <p>---------------Vue-select选择框------------------</p>
    <v-select :options="optionList" v-model="vueSelected"></v-select>
    <span>Selected: {{ vueSelected }}</span>
    <br />
    <p>---------------多选选择框 @input="selected_student"------------------</p>
    <v-select
      :placeholder="placeholder"
      multiple
      :options="options"
      label="name"
      v-model="students"
    ></v-select>
    <div id="value">{{students}}</div>
    <div id="value">{{students_id}}</div>
    <br />
    <p>--------复选框------</p>
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" id="toggle" />
    <label for="toggle">{{toggle}}</label>
    <p>是否选中：{{toggle}}</p>
    <br />
    <p>--------lazy------</p>
    <input v-model.lazy="lay_msg" />
    <p>lay_msg is: {{ lay_msg }}</p>
    <br />
    <p>-------- number -- 只能填写 number ------</p>
    <input v-model.number="number_msg" type="number" />
    <p>number_msg is: {{ number_msg }}</p>
    <br />
    <p>-------- trim --------</p>
    <input v-model.trim="trim_msg" />
    <p>trim_msg is: {{ trim_msg }}</p>
    <br />
  </div>
</template>
<script>
import Vue from 'Vue';
import vSelect from 'vue-select';
import "vue-select/dist/vue-select.css";
// Vue.component('v-select', vSelect);

export default {
  name: 'form',
  components: {
    vSelect
  },
  data() {
    return {
      message: '',
      lay_msg: '',
      number_msg: '',
      trim_msg: '',
      text: '',
      checked: false,
      checkedNames: [],
      picked: '',
      selected: '',
      vueSelected: '',
      toggle: '',
      optionList: ['A', 'B', 'C'],
      options: [
        { "student_id": 1, "name": "Vence" },
        { "student_id": 2, "name": "Job" },
        { "student_id": 3, "name": "Jack" },
      ],
      placeholder: 'Choose a student..',
      students: [],
    }
  },
  computed: {
    students_id: function () {
      let objs = [];
      for (var val of this.students) {
        objs.push(val.student_id);
      }
      return objs;
    }
  }
  /*  mounted:function(){
     var student_filter = function(obj){
       return this.students.indexOf(obj.student_id) > -1;
     }
     this.student_obj = this.options.filter(student_filter, this);
   },
   methods:{
     selected_student:function(values){
       this.students = values.map(function(obj){
         return obj.student_id;
       });
     }
   } */
}
</script>
