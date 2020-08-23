<template>
  <div class="box ">
    <div class="container">
      <el-card shadow="hover">
        <!-- 按钮 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="toForm"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-plus"
              size="small"
              @click="deletes"
              >批量删除</el-button
            >
          </el-col>
        </el-row>
        <!-- 表格 -->
        <div class="table-box">
          <el-table
            style="width:100%"
            :data="tableDate"
            border
            ref="tableRef"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="积分序号" min-width="55"
              ><template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template></el-table-column
            >
            <el-table-column label="加入时间"
              ><template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
              </template></el-table-column
            >
            <el-table-column label="积分分类" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否禁用" min-width="120">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStates(scope.row.id, scope.row.status)"
                ></el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 添加信息 -->
    <el-dialog :visible.sync="dialogVisible">
      <el-card shadow="hover">
        <el-row type="flex" justify="space-between">
          <el-col :span="4">
            <span>积分商品分类编辑</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form :model="form" label-width="140px">
          <el-form-item label="分类名称：">
            <el-input
              v-model="form.name"
              style="width:200px"
              size="small"
              placeholder="输入分类名"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="Submit"
              >提交</el-button
            >
            <el-button size="small" @click="form.name = null">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { integral, changeState } from "@/api/credit";

export default {
  name: "tabel",
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      selectionTable: [],
      show: false,
      // 默认分页条数
      page: {
        pageSize: 10, //每页显示条数
        total: 4, //总条数
        current: 1 //要查询的页
      },

      tableDate: [],

      /* 添加的数据 */
      form: {
        name: null
      }
    };
  },
  created() {
    /* 初始化页面 */
    this._init_();
  },

  methods: {
    _init_() {
      this.getList();
    },
    getList(val) {
      var current_page = null;
      var per_page = null;
      var name = null;
      var id = null;
      var s_id = null;
      var s_state = null;
      var text = null;

      if (val == "name") {
        name = this.form.name;
        text = "类型添加成功";
      } else if (val == "delete") {
        text = "数据删除成功";
        id = this.selectionTable;
      }
      var data = {
        current_page: this.page.current,
        per_page: this.page.pageSize,
        name,
        id,
        s_id,
        s_state
      };
      integral(data).then(res => {
        if (text != null) {
          this.$message({
            message: text,
            center: true,
            type: "success"
          });
        }

        this.tableDate = res.data;
        for (var i; i < this.tableDate.length; i++) {
          if (this.tableDate[i].status == 1) {
            this.tableDate[i].status = true;
          } else {
            this.tableDate[i].status = false;
          }
        }
      
        this.page.total = res.data.length;
      });
    },
    /* 表单淡出 */
    toForm() {
      this.dialogVisible = true;
    },
    /* 状态改变 */
    changeStates(Id, Status) {
     

      var id = Id;
      var status;
      if (Status) {
        status = 1;
      } else {
        status = 0;
      }
      var current_page = null;
      var per_page = null;
      var data = {
        current_page: this.page.current,
        per_page: this.page.pageSize,
        id,
        status
      };
      /* 改变用户状态 */
      changeState(data).then(res => {
        this.$message({
          showClose: true,
          message: "状态修改成功",
          type: "success"
        });
        this.page.total = res.length;
        for (var i; i < res.length; i++) {
          if (res[i].status == 1) {
            res[i].status = true;
          } else {
            res[i].status = false;
          }
        }
      });
      this.tableDate = res;
    },
    /* 增加 */
    Submit() {
      var name = "name";
      this.getList(name);
      this.dialogVisible = false;
    },

    /* 批量删除 */
    deletes() {
      if (this.selectionTable.length == 0) {
        this.$message.error("未选中数据");
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var name = "delete";
            this.getList(name);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
              center: true
            });
          });
      }
    },

    handleSelectionChange(val) {
      var arr = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].id);
      }
      this.selectionTable = arr;

      console.log(this.selectionTable);
    },

    /* 分页 */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    }
  }
};
</script>
<style scoped>
.container {
  margin: 20px;
}
.table-box {
  margin-top: 10px;
}
.page {
  margin-top: 10px;
}
</style>
