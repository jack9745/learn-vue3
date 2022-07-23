<template>
  <div>{{ bar }}</div>

  <el-button @click="changeUserName" type="primary">changeName</el-button>
  <div>{{ userName }}</div>

  <el-button @click="changeObjRefNum" type="primary">changeObjRefNum</el-button>
  <!-- changeRefObj -->
  <el-button @click="changeRefObj" type="primary">changeRefObj</el-button>

  <div>{{ objectRef.count }}</div>

  <!-- 是否自动解包呢   可以  感觉语法规定太多了-->
  <div>{{ obj.foo }}</div>

  <!-- 是否自动解包呢  不能-->
  <div>{{ obj.foo + 1 }}</div>

  <el-button @click="addBooks" type="primary"> addBooks</el-button>
  <ul>
    <li v-for="(item, index) in books" :key="index">{{ item }}</li>
  </ul>

  <!-- reactive -->
  <el-button @click="changeNestedA" type="danger"> changeNestedA</el-button>

  <div>{{ nestedObj.nest.a }}</div>
</template>

<script>
// ref
// Takes an inner value and returns a reactive and mutable ref object,
// which has a single property .value that points to the inner value.

// 接受任何类型的值，然后创建一个响应式的引用对象，它有一个value属性指向内部值
// value属性是响应式的，改变value会触发相应的副作用和更新视图

// The ref object is mutable - i.e. you can assign new values to .value.
//  It is also reactive - i.e. any read operations to .value is tracked,
//  and write operations will trigger associated effects.

// when holding object types,
// ref automatically converts its .value with reactive().
// 如果ref接受的参数是一个对象，那么内部将属性用reactive转为响应式的。

// Ref Unwrapping in Templates
// ref响应式对象将在模板中自动解包，所以不需要.value 来访问

// reactive
// 返回这个对象的响应式代理，接受一个对象作为参数
// The reactive conversion is "deep": it affects all nested properties
//  A reactive object also deeply unwraps any properties
//  that are refs while maintaining reactivity.
// 所有嵌套的属性将被转为响应式的，如果属性值是ref，那么将会自动解包

// It should also be noted that there is no ref unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like Map.
// 如果ref的参数是数组，或者map,将不会被自动解包

// watchEffect
// watchEffect() allows us to perform a side effect immediately while automatically tracking the effect's reactive dependencies. The above example can be rewritten as:
// 允许我们立即执行一次副作用，并且可以追踪副作用中依赖的变化，当依赖发生变化时，会再次执行副作用、

// watch vs. watchEffect
// 相同点是都可以执行副作用
// 不同点：watch函数不跟踪副作用里响应数据的变化，只有当我们监听的依赖发生变化时，才执行回调，它是将依赖追踪和副作用分开来

// watchEffect 是将依赖追踪和副作用结合到一起，只要依赖发生变化，就会重新执行副作用

// Stopping a Watcher

// Watchers declared synchronously inside setup() or <script setup> are bound to the owner component instance, and will be automatically stopped when the owner component is unmounted. In most cases, you don't need to worry about stopping the watcher yourself.

// The key here is that the watcher must be created synchronously: if the watcher is created in an async callback, it won't be bound to the owner component and must be stopped manually to avoid memory leaks.

// eslint-disable-next-line no-unused-vars
import { ref, reactive, watchEffect, effect } from "vue";
export default {
  setup() {
    // ref 参数是一个简单类型的参数
    const userName = ref("huangtao");
    watchEffect(() => {
      console.log("userName", userName.value);
    });
    const changeUserName = () => {
      userName.value = "jack" + Math.random();
    };
    const obj = {
      bar: ref(0),
      foo: ref(1),
    };
    const { bar } = obj;

    // eslint-disable-next-line no-unused-vars
    const callSomeFunction = (bar) => {
      console.log("函数内的打印值", bar);
      bar.value = 90;
    };
    // callSomeFunction(obj.bar);

    // ref 参数类型是一个对象
    const objectRef = ref({ count: 1 });
    console.log("objectRef", objectRef);
    const changeObjRefNum = () => {
      objectRef.value.count++;
    };
    const changeRefObj = () => {
      objectRef.value = {
        count: Math.random(),
      };
    };
    watchEffect(() => {
      console.log("objectRef", objectRef.value);
    });

    // reactive
    const books = reactive(["aaa", "bb"]);
    books.push("ccc");
    const addBooks = () => {
      books.push("ddd" + Math.random());
    };
    watchEffect(() => {
      // books 内存地址没有发生变化 所以不会执行副作用
      console.log("books", books);
    });

    const nestedObj = reactive({
      b: 0,
      nest: {
        a: 0,
      },
    });
    const changeNestedA = () => {
      nestedObj.nest.a++;
    };
    watchEffect(() => {
      // console.log(nestedObj.nest.a);
      // 也不会执行
      console.log("nestedObj", nestedObj.nest);
      // 如果只有下面这句，是不会触发副作用的，因为地址没有 发生改变
      // console.log(nestedObj);
    });
    let stop = null;
    setTimeout(() => {
      stop = watchEffect(() => {
        console.log("nestedObj", nestedObj.nest.a);
      }, 10);
      stop();
    });

    const count = ref(1);
    const objCount = reactive({ count });

    // ref will be unwrapped
    console.log(objCount.count === count.value); // true
    return {
      bar,
      userName,
      changeUserName,
      changeObjRefNum,
      objectRef,
      changeRefObj,
      obj,
      addBooks,
      books,
      changeNestedA,
      nestedObj,
    };
  },
};
</script>
