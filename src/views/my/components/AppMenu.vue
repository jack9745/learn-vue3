<template>
  <div class="item-menu">
    <ul class="item-ul">
      <li>
        <el-icon class="common-icon"><edit-pen /></el-icon>
        <span>修改名称和图标</span>
      </li>
      <li>
        <el-icon class="common-icon"><document-copy /></el-icon>
        <span>复制应用</span>
      </li>
      <li style="color: red">
        <el-icon class="common-icon" style="color: red"><delete /></el-icon>
        <span>删除应用</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { EditPen, DocumentCopy, Delete } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
export default {
  components: {
    ElIcon,
    EditPen,
    DocumentCopy,
    Delete,
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
  },
};
</script>

<style scoped lang="less">
.common-icon {
  cursor: pointer;
  color: #9e9e9e;
  font-size: 1.2em;
  margin-right: 5px;
}

.item-menu {
  width: 180px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 0;
  font-size: 14px;
  .item-ul {
    & > li {
      height: 36px;
      line-height: 36px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #1890ff;
        color: white !important;

        .common-icon {
          color: white !important;
        }
      }
    }
  }
}
</style>
