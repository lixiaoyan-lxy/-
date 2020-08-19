<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告中心</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-plus" @click="gotoPage">添加</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="formList" border stripe>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="广告名称" prop="ad_name"></el-table-column>
        <el-table-column label="链接" prop="chair"></el-table-column>
        <el-table-column label="开始时间" prop="str_time"></el-table-column>
        <el-table-column label="结束时间" prop="end_time"></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="editForm(scope.row.id)">编辑</el-button>
            <el-button icon="el-icon-delete" @click="deleteForm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAdvList,deletethisform } from "@/api/ad";
export default {
  data() {
    return {
      formList: [],
    };
  },
  created() {
    this.advData();
  },
  methods: {
    advData() {
      getAdvList().then((res) => {
        console.log(res);
        if (res.code !== 200) {
          return this.$$message.error("获取失败!");
        }
        this.formList = res.msg.items;
      });
    },
    //删除
     deleteForm(data) {
       this.$confirm("将删除此商品, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
           deletethisform({ id:data }).then((res) => {
         console.log(res)
       })
        this.$message.success("已删除!");
        this.advData();
        })
         .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    gotoPage() {
      this.$router.push({ name: "addchild" });
    },
    editForm(id) {
      console.log(id)
    this.$router.push({ name: "editchild" });
    }
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-left: 30px;
  margin-top: 15px;
  font-size: 12px;
}
.el-card {
  margin-top: 15px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-button {
  font-size: 10px;
}
.el-table {
  margin-top: 20px;
}
</style>