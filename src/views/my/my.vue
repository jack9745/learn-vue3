<template>
  <!-- 布局 -->
  <div class="app-wrapper">
    <aside class="left-aside"></aside>
    <main class="main">
      <AppList />
    </main>
  </div>
</template>

<script>
import AppList from "./components/AppList.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    AppList,
  },
  setup() {
    const list = ref(["jack", "rose"]);
    return { list };
  },
});
</script>
<style scoped lang="less">
.app-wrapper {
  display: flex;
  .left-aside {
    width: 200px;
    height: 100vh;

    background-color: #eee;
  }
  .main {
    flex: 1 1 auto;
  }
}
</style>
