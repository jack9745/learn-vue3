<template>
  <div>
    <!--  -->
    <div>我是diff组件</div>
    <div>{{ title }}</div>
    <el-button @click="handleData" type="danger">handleData</el-button>
    <div>{{ userInfo.name }}</div>
    <el-button @click="changeParentUserName"> changeParentUserName</el-button>
  </div>
</template>

<script setup>
import { toRef } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  title: String,
  modelValue: Object,
});
const title = toRef(props, "title");
const userInfo = toRef(props, "modelValue");
console.log(userInfo);

// 向父组件发射事件

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue", "submitData"]);
console.log(emit);
const handleData = () => {
  emit("submitData", { content: "我是来自组件diff的内容" + Math.random() });
};
const changeParentUserName = () => {
  userInfo.value.name = "abc" + Math.random();
  emit("update:modelValue", userInfo);
};
// vue2.0 VS vue3.0
// 组合式API，可以分为四种
// 核心API，就是我们最常用的， computed ,watch,watchEffect,ref,reactive,readonly
// 工具函数  isRef unref isReadonly toRef toRefs
// 高级API shallowRef shallowReactive shallowReadonly toRaw triggerRef
// 组合式的生命周期钩子函数 onMounted 等

// 1 vue3模板支持多个根节点
// teleport 组件 将ui渲染在组件以外的其他地方，比如挂载到body上，
// 这对我们写模态框快速定位到某个地方非常有用
</script>
