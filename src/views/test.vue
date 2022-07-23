<template>
  <el-button @click="changeNum" type="primary">changeNum</el-button>
  <div>{{ state.count.value }}</div>
  <div>{{ name }}</div>
  <el-button type="danger" @click="changeName">changeName</el-button>
  <el-button type="primary" @click="triggerChange"
    >forceTriggerButton</el-button
  >
  <div>{{ shallow.greet }}</div>
  <el-button @click="changeUser" type="primary">changeUser</el-button>
  <div>{{ userInfo.name }},{{ userInfo.age }}</div>
  <ul>
    <li v-for="(item, key) in userInfo.family" :key="key">
      {{ item }}
    </li>
  </ul>
  <el-button @click="handleReadonlyData" type="primary"
    >changeOnlyReadonlyData</el-button
  >
  <div>{{ readonlyData.birthday }}</div>
  <!-- 视图不发生变化 -->
  <div>{{ readonlyData.cityInfo.province }}</div>
  <div>{{ readonlyData.cityInfo.num }}</div>
</template>
<script>
import {
  shallowRef,
  watchEffect,
  // eslint-disable-next-line no-unused-vars
  triggerRef,
  shallowReactive,
  shallowReadonly,
  isReadonly,
  toRaw,
} from "vue";

// shallowRef
//  也是创建一个响应式的对象，不过这个对象的响应式是浅层的，
// 不会为对象的属性建立响应式关系
// Shallow version of ref(). 什么是shallowRef 翻译成中文就是浅引用
// 场景，我们有时候想监听一个对象的变化，而不想监听对象属性的变化，

// triggerRef
// Force trigger effects that depends on a shallow ref.
// This is typically used after making deep mutations
// to the inner value of a shallow ref.
// 对 shallowRef创建的响应式对象，深层属性的值发生变化，触发副作用

// shallowReactive
// 不会为深层次的属性建立响应式关系
// 接受一个对象作为参数，只有最外层的属性是响应式的。深层次的属性没有响应性
// there is no deep conversion: only root-level properties are reactive
// for a shallow reactive object

// 使用注意事项
// Shallow data structures should only be used for root level state in a component
// 浅层数据结构应该只在根层级的状态中被使用，避免嵌套到一个深层次的响应式数据中去，这样就变得难以理解和调试

// Avoid nesting it inside a deep reactive object as it creates a tree with inconsistent reactivity behavior which can be difficult to understand and debug.

// shallowReadonly 接受一个对象作为参数
// 状态数据是没有响应式关系的
//  Shallow version of readonly().
// there is no deep conversion: only root-level properties are made readonly.
// 只有最外层的属性是只读的, 虽然可以改变值，但是视图不发生变化

//toRaw
// Returns the raw, original object of a Vue-created proxy.
// 返回 Vue创建的代理的原始对象
// toRaw() can return the original object from proxies created by reactive(), readonly(), shallowReactive() or shallowReadonly().
// 能返回这个四个api创建的代理数据的原始对象

// This is an escape hatch that can be used to temporarily read without incurring proxy access / tracking overhead or write without triggering changes.
// 可以用于临时读取数据，而不必增加额外的开销

export default {
  components: {
    // ElButton,
  },
  // Reactivity API: Advanced 响应式高级API
  setup() {
    const name = shallowRef("huangtao");
    name.value = "jack huang";
    watchEffect(() => {
      console.log("用户的名字发生了变化" + name.value);
    });
    name.value = "jack huang";
    console.log(name);
    // 只有重新给状态数据赋值，才会触发副作用
    const changeName = () => {
      name.value = "jack huang" + Math.random();
    };
    const state = shallowRef({ count: { value: 1 } });

    console.log(state);
    const changeNum = () => {
      // 这样写视图不更新
      // state.value.count.value++;
      // 这样写视图才会更新
      state.value = { count: { value: Math.random() } };
    };
    watchEffect(() => {
      console.log(state.value);
    });
    console.log("state", state);
    // state.value = { count: 3 };
    const shallow = shallowRef({
      greet: "hello,world",
    });

    // // Logs "Hello, world" once for the first run-through
    watchEffect(() => {
      // 我们可以看到这里会被触发三次
      console.log(shallow.value.greet);
    });
    // This won't trigger the effect because the ref is shallow

    // Logs "Hello, universe"
    // 可以理解强制触发更新
    const triggerChange = () => {
      shallow.value.greet = "Hello, universe" + Math.random();
      // 强制触发更新 建立响应关系
      triggerRef(shallow);
    };

    shallow.value = { greet: "my name is huangtao" };

    // shallowReactive
    const userInfo = shallowReactive({
      name: "huangtao",
      age: 20,
      family: {
        fatherName: "sdfsfd",
        motherName: "sdfsdfsdf",
      },
    });
    watchEffect(() => {
      // console.log(userInfo.age);
      console.log(userInfo.family.fatherName);
      // console.log(userInfo.family);
    });
    const changeUser = () => {
      // 会触发副作用
      userInfo.age++;
      // 会触发副作用
      // userInfo.family = {
      //   fatherName: "aaaa",
      //   motherName: "bbbb",
      // };
      // 深层次的属性也有响应 ？？？ 可以更新视图，但是不会触发副作用 不会触发watchEffect 里的回调
      userInfo.family.fatherName = "aaa" + Math.random();
    };

    // shallowReadonly
    const readonlyData = shallowReadonly({
      birthday: "2019.09",
      cityInfo: {
        num: 0,
        province: "湖北省",
        city: "仙桃市",
      },
    });
    const isBool = isReadonly(readonlyData.cityInfo.province);
    console.log(isBool); // false

    const isBoolTwo = isReadonly(readonlyData.birthday);
    console.log("isBoolTwo", isBoolTwo); // false
    const handleReadonlyData = () => {
      // readonlyData.birthday = "2019.10";
      // 视图不更新啊 ，有什么用？？
      readonlyData.cityInfo.province = "hubei";
      readonlyData.cityInfo.num++;
      // 控制台会警告 只读属性不能赋值
      // readonlyData.cityInfo = {
      //   province: "hubei",
      //   city: "xiantao",
      // };
      console.log(readonlyData);
    };

    // toRaw 传给后端的数据可能需要这样转换
    const data = toRaw(readonlyData);
    console.log("原始对象为", data);
    return {
      state,
      name,
      shallow,
      userInfo,
      readonlyData,
      changeUser,
      changeName,
      triggerChange,
      handleReadonlyData,
      changeNum,
    };
  },
};
</script>
