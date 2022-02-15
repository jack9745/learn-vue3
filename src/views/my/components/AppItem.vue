<template>
  <div
    class="app-item"
    @click="goToApp"
    @mouseenter="appMouseenter"
    @mouseleave="appMouseleave"
  >
    <el-icon v-if="showStar" class="star common-icon"><star-filled /></el-icon>
    <el-icon
      @click.stop="handleShowOperateDialog"
      v-if="showOperate"
      class="ellipsis common-icon"
      ><more-filled
    /></el-icon>
    <ul class="icon-wrapper">
      <li class="app-icon" :style="{ backgroundColor: appInfo.iconColor }">
        <img :src="appInfo.iconUrl" width="50" alt="" />
      </li>
      <li>{{ appInfo.name }}</li>
    </ul>

    <!-- 单击三个点的菜单 dialog -->
    <div class="app-menu-wrapper" v-if="showOperateDialog">
      <app-menu></app-menu>
    </div>
  </div>
</template>
<script>
import { MoreFilled, StarFilled } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppMenu from "./AppMenu.vue";

export default defineComponent({
  components: { MoreFilled, ElIcon, StarFilled, AppMenu },
  props: {
    appInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  // 选项式api的缺点
  // 当页面变得越来越复杂时，当逻辑变的越来越复杂时，逻辑关注点会越来越碎片化，
  // 比如在computed里有点逻辑，在watch里也有逻辑，在methods里也有方法逻辑，经常要跳来跳去

  // 组合式api可以将相关逻辑收集到一起，这样方便 维护和查看。
  // setup 注意点 在setup中不能通过this获取组件实例，因为setup调用的时候，组件还么有实例化
  // setup的第一个参数props 第二个参数是context

  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    const showStar = ref(false);
    const showOperate = ref(false);
    // 显示菜单弹窗
    const showOperateDialog = ref(false);
    const router = useRouter();
    const route = useRoute();
    console.log(route);
    function appMouseenter() {
      showStar.value = true;
      showOperate.value = true;
    }

    function appMouseleave() {
      showStar.value = false;
      showOperate.value = false;
    }
    const goToApp = () => {
      router.push({
        path: "/app",
      });
    };
    const handleShowOperateDialog = () => {
      showOperateDialog.value = true;
    };
    return {
      showOperate,
      showStar,
      showOperateDialog,
      appMouseenter,
      appMouseleave,
      goToApp,
      handleShowOperateDialog,
    };
  },
});
</script>
<style lang="less" scoped>
.common-icon {
  cursor: pointer;
  color: #9e9e9e;
  font-size: 1.2em;
  &:hover {
    color: #0819ff;
  }
}
.ellipsis {
  right: 5px;
  position: absolute;
}

.star {
  position: absolute;
  left: 5px;
}
.app-item {
  position: relative;
  padding-top: 5px;
  width: 132px;
  height: 160px;
  margin-right: 20px;
  margin-bottom: 10px;
  transform: translateY(0px);
  transition: transform 0.2s linear;
  background-color: white;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
    background-color: #f5f5f5;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    padding-top: 20px;
    .app-icon {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background-color: rgb(76, 175, 80);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .app-menu-wrapper {
    position: absolute;
    right: -200px;
    top: 0;
    z-index: 100;
  }
}
</style>
