<template>
  <div>
    <!-- 卡片区域 -->
    <el-card>
     <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->
      <el-table border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop=""></el-table-column>
          <el-table-column label="商品价格" prop=""></el-table-column>
          <el-table-column label="商品重量" prop=""></el-table-column>
          <el-table-column label="商品创建时间" prop=""></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
      
  }
};
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 15px;
}
</style>