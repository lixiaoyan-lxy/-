<template>
  <el-card class="box-card">
    <!-- 头 -->
    <div slot="header" class="clearfix">
      <span>物流管理</span>
      <el-button style="float: right; padding: 3px 10px" type="text" icon="el-icon-circle-plus" @click="addInformation">添加物流信息</el-button>
    </div>
    <!-- 内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="发货日期" width="180" />
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="address1" label="发货地址" />
      <el-table-column prop="address2" label="收货地址" />
      <el-table-column prop="state" label="发送状态">
        <!-- slot-scope="scope"作用域插槽 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 'true'">以发货</el-tag>
          <el-tag v-else type="danger">未发货</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" @click="deleteInformation(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="listQuery.pageSize"
      :current-page="listQuery.pageNum"
      :page-sizes="[1, 3, 5, 7]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { logistics, deleteForm } from '@/api/logistics'

export default {
  data() {
    return {
      total: 0,
      listQuery: {
        pageNum: 1, // 当前是第几页
        pageSize: 7// 每页几条数据
      },
      tableData: []
    }
  },
  created() {
    this.getLogistics()
  },
  methods: {
    // 获取页面数据
    getLogistics() {
      logistics(this.listQuery).then(res => {
        this.tableData = res.msg.data
        this.total = res.msg.total
        // 对拿到的res.data进行一番操作或者渲染
      })
    },
    // 添加信息
    addInformation() {
      this.$router.push({ path: 'addInformation' })
    },
    // 编辑数据
    edit(id, name) {
      console.log(id)
      console.log(name);
      this.$router.push({
        path: 'edit',
        name: 'editIndex',
        params: {
          movieId: id
        }
      })
    },
    // 删除数据
    deleteInformation(data) {
      console.log(data)
      deleteForm({ id: data }).then((res) => {
        this.getLogistics()
        console.log(res)
      })
      this.$message.success('已删除!')
      console.log('delete')
    },
    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val// 每页几条
      this.getLogistics()
      console.log(val)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val// 当前哪叶
      this.getLogistics()
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: calc(100vh - 90px);
  margin: 20px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
