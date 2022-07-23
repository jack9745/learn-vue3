<template>
  <el-button @click="addData" type="primary"> Add data</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div style="margin-bottom: 100px"></div>

  <el-table :data="listData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <el-button @click="routeToForm" type="primary">routeToForm</el-button>
  <el-button @click="getQuery" type="primary">getQuery</el-button>
  <el-button @click="resetData" type="primary">resetData</el-button>

  <el-button @click="changeQ" type="primary">changeQ</el-button>
  <div>{{ question }}</div>

  <!-- changeNum -->
  <el-button @click="changeNum" type="primary">changeNum</el-button>
  <div>{{ obj.count }}</div>
</template>

<script setup>
// This should be differentiated with a getter that returns a reactive object - in the latter case, the callback will only fire if the getter returns a different object:

//  watch(
//   () => state.someObject,
//   () => {
//     // fires only when state.someObject is replaced
//   }
// )

// You can, however, force the second case into a deep watcher by explicitly using the deep option:

// watch(
//   () => state.someObject,
//   (newValue, oldValue) => {
//     // Note: `newValue` will be equal to `oldValue` here
//     // *unless* state.someObject has been replaced
//   },
//   { deep: true }
// )

// eslint-disable-next-line no-unused-vars
import { ref, reactive, watch, watchEffect, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

const addData = () => {
  tableData.value.push({
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  });
  formData.list.push({
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  });
};
const router = useRouter();
const route = useRoute();
const routeToForm = () => {
  router.push({
    name: "form",
  });
};
const getQuery = () => {
  console.log(route.query);
};
let data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const tableData = ref(data);
const formData = reactive({
  list: [
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
});

// 将formData中的每个属性转为 ref对象，可以直接在模板中使用
const { list: listData } = toRefs(formData);
// 可以深度监听一个数组的变化
watch(tableData.value, () => {
  console.log("数据发生了变化");
});
const resetData = () => {
  // tableData;
  // 让数组置空，然后数组变化了之后依然可以被监听，数组的内存地址没有发生变化
  // tableData.value.length = 0;
  tableData.value = [];
  // 重置了之后还是监听不到 formData.list的变化
  formData.list = [];
};
// 好像不可以深度监听一个数组的变化
watchEffect(() => {
  // tableData.value.length = 0; 内存的地址没有发生变化
  console.log("执行了副作用", tableData.value); // 只有重新赋值才会执行副作用
});

const question = ref("question");
//

const changeQ = () => {
  question.value = "ssd" + Math.random();
};
// 简单类型的就这样监听
watch(question, (data) => {
  console.log("question发生了变化" + data);
});

const obj = reactive({ count: 0 });

// this won't work because we are passing a number to watch()
// 监听响应式对象中的某个属性要这样
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
// 监听整个formData可以监听到list的变化

// 要这样，不管是重新赋值，还是数组内部发生了变化都可以监听的到
watch(
  () => formData.list,
  () => {
    console.log("list数据发生了变化");
  },
  {
    deep: true,
  }
);

// eslint-disable-next-line no-unused-vars
watch(obj, (newValue, oldValue) => {
  console.log("深度监听一个对象");
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
});
const changeNum = () => {
  obj.count++;
};
</script>
