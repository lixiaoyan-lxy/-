<template>
  <div>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" :info="true" :model="qureyInfo" class="qureyInfo">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="qureyInfo.keyword" @input="getGoodsmanage()">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->

      <el-table border stripe v-loading="loading" :data="tableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="产品编号" prop="number"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="danger" icon="el-icon-delete" circle @click="delGood(scope.row.id)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="editSwitch(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2,4,8]"
        :page-size="5"
        class="productPag"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { selGoods } from "@/api/goodsmanage";
export default {
  data() {
    return {
      // 搜索
      qureyInfo: {
        keyword: "",
        page: 1,
        pageSize: 10,
      },
    //   table 数据
    tableData: [],
    loading: false,
    currentPage: 1,
     total: null,
      // 产品id
      productId: null,
    };
  },
  created() {
    this.getGoodsmanage();
  },
  methods: {
    getGoodsmanage(val) {
      this.loading = true;
      selGoods(this.qureyInfo)
        .then((res) => {
          if (res.code === 0) {
            this.total = res.count;
            this.tableData = res.data;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$notify.error({
            title: "错误",
            message: "商品列表查询失败",
          });
          console.loading(error);
        });
    },
    delGood(data) {
      console.log(data)
      this.$confirm("将删除此商品, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGoods({ id: data })
            .then((res) => {
              if (res.code === 0) {
                this.getGoodsList();
              }
            })
            .catch((error) => {
              this.$notify.error({
                title: "错误",
                message: "删除此商品失败",
              });
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editSwitch(data) {
      EditUserStatus({
        id: data.id,
        status: data.status == 1 ? 0 : 1
      })
        .then(res => {
          if (res.code === 0) {
            this.getLists();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange() {
        this.qureyInfo.pageSize = val,
        this.getGoodsmanage()
    },
    handleCurrentChange(val) {
        this.qureyInfo.page = val,
        this.getGoodsmanage()
    }
  },
};
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 15px;
}
</style>