<template>
  <div>{{ count }}</div>
  <div>{{ title }}</div>
  <div>{{ header.title }}</div>
  <el-button @click="changeColor" type="danger">changeColor</el-button>
  <div>{{ color }}</div>
  <div>{{ content }}</div>
  <div>{{ userInfo.name }}</div>
  <!-- diff 组件 -->
  <DiffCom :title="title" @submitData="handleSubmit" v-model="userInfo" />
</template>

<script setup>
import DiffCom from "./diff.vue";
// isRef  Checks if a value is a ref object.
// 判断一个对象是否是ref对象

// unref
// Returns the inner value if the argument is a ref, otherwise return the argument itself. This is a sugar function for val = isRef(val) ? val.value : val.
//如果unref的参数是ref对象 返回ref对象的内部值，就是value属性的值，
// 如果不是，就返回这个值，

// toRef
// Can be used to create a ref for a property on a source reactive object. The created ref is synced with its source property: mutating the source property will update the ref, and vice-versa.
//  可以将一个响应式对象上的属性转为ref对象

// toRefs
// Converts a reactive object to a plain object where each property of the resulting object is a ref pointing to the corresponding property of the original object. Each individual ref is created using toRef().
// 将一个响应式对象转为一个原生对象， 对象的每个属性是ref对象，

// eslint-disable-next-line no-unused-vars
import {
  ref,
  // eslint-disable-next-line no-unused-vars
  reactive,
  isRef,
  // eslint-disable-next-line no-unused-vars
  isReactive,
  unref,
  toRaw,
  // eslint-disable-next-line no-unused-vars
  toRef,
  // eslint-disable-next-line no-unused-vars
  toRefs,
} from "vue";
const content = ref("");
const handleSubmit = (data) => {
  console.log(data);
  content.value = data.content;
};
// isRef
const count = ref(0);
console.log("检查count是否是ref对象", isRef(count));

// unref
const unrefCount = unref(count);
console.log(unrefCount);

const userInfo = ref({ name: "huangtao" });
console.log(toRaw(unref(userInfo)));

// toRef
const header = {
  title: "",
  color: "red",
};
const title = toRef(header, "title");
title.value = "hello,world";
console.log("header", header.title);

// eslint-disable-next-line no-undef
const props = defineProps(/* ... */);
let foo = toRef(props, "foo");
console.log("foo", foo);
// 下面操作会发出警告
// Set operation on key "foo" failed: target is readonly.
// 因为props是只读的。
foo.value = "huangtao";
console.log(props);

// toRefs
// 下面的转换 控制台会警告
// toRefs() expects a reactive object but received a plain one.
// toRefs 希望接受的对象是一个响应式的对象，但是接受的是一个原生的对象
// 通过 reactive转换之后就不会发出警告了
const refsHeader = toRefs(reactive(header));
console.log("转换之后的对象", refsHeader);

// 解构
const { color } = refsHeader;
console.log(color.value);
const changeColor = () => {
  color.value = Math.random();
};
</script>
