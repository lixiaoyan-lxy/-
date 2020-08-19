<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告中心</el-breadcrumb-item>
      <el-breadcrumb-item>广告位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-plus" @click="adForm">添加</el-button>
        </el-col>
      </el-row> 
      <!-- 表格 -->
      <el-table :data="adList" border stripe>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="广告位" prop="ggweizhi"></el-table-column>
        <el-table-column label="宽度" prop="wid"></el-table-column>
        <el-table-column label="高度" prop="hig"></el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="switchChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="ediForm(scope.row.id)">编辑广告</el-button>
            <el-button icon="el-icon-delete" @click="deleteForm(scope.row.id)">删除广告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getAdList, getAdListById, removeById } from "@/api/ad";
export default {
  data() {
    return {
      //存儲數據
      adList: [],
      queryInfo: {
        pagenum: 1, //当前页数
        pagesize: 20, //每页显示的条数
      },
      total:0
    };
  },
  created() {
    this.adData();
  },
  methods: {
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.adData();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.adData();
    },
    //获取表单数据
    adData() {
      getAdList(this.queryInfo).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          this.$message.error("获取失败!");
        }
        this.total = res.msg.total
        this.adList = res.msg.data.items;
        
      });
    },
    //添加
    adForm() {
      this.$router.push({ name: "addform" });
    },
    //编辑广告
    ediForm(id) {
      // console.log(id)
      getAdListById(id).then((res) => {
        console.log(res);
      });
      this.$router.push({ name: "editform" });
    },
    switchChange(userInfo) {
      console.log(userInfo);
    },
    // 删除
    deleteForm(data) {
     this.$confirm("将删除此商品, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
           removeById({ id:data }).then((res) => {
         console.log(res)
       })
        this.$message.success("已删除!");
        this.adData();
        })
         .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
.el-pagination {
  margin-top: 15px;
}
</style>
