<template>
  <div>
    <ul class="manage-wrapper">
      <li class="" v-for="(item, index) in appList" :key="index">
        <div class="title">
          <span>{{item.projectName}}</span>
        </div>
        <ul class="app-wrapper">
          <li v-for="(appInfo,jIndex) in item.projectApps || []" :key="jIndex">
            <app-item :appInfo="appInfo"></app-item>
          </li>
         
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { defineComponent, onMounted, ref,reactive } from "vue";
import appListJSON from "@/mock/appList";
import AppItem from "./AppItem.vue";
export default defineComponent({
  components: {
    AppItem,
  },

  // setup 前面为什么不能加上 async,加上了之后也不报错，但是页面出不来效果
  setup() {
    const appList = ref([]);
    // 模拟请求 ，请求需要时间
    const getAppList = async function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (appListJSON) {
            resolve(appListJSON);
          } else {
            reject(new Error("error"));
          }
        }, 50);
      });
    };
    onMounted(async () => {
      console.log("这里是onMounted钩子");
      const result = await getAppList();
      if(Number(result.state) ===1){
        appList.value = result.data.validProject
      }
      console.log("appList", appList.value);
    });
    return { appList };
  },
});
</script>
<style lang="less" scoped>
.manage-wrapper {
  margin: 0 10%;
  padding-top: 50px;

  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .app-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
