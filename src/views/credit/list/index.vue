<template>
  <div class="classification">
    <div class="container">
      <el-card shadow="hover">
        <el-row type="flex" justify=" space-between">
          <el-col :span="22">
            <el-input
              placeholder="输入订单号"
              style="width:200px;margin-right:10px"
              size="small"
              v-model="form.number"
            ></el-input>

            <el-button size="small" icon="el-icon-search" @click="findData"
              >条件查询</el-button
            >
          </el-col>
        </el-row>
        <!-- 表单 -->
        <div class="table-box">
          <el-table style="width:100%" border :data="options">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column label="商品名称" min-width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template></el-table-column
            >
            <el-table-column label="订单号" min-width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template></el-table-column
            >

            <el-table-column label="积分" min-width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.int }}</span>
              </template>
            </el-table-column>
            <el-table-column label="加入时间" min-width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
              </template></el-table-column
            >
            <el-table-column label="操作" min-width="120" align="center">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit"
                  size="small"
                  @click="toInfo(scope.row.id)"
                  >查看详细信息</el-button
                >
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
    <div>
      <el-dialog title="订单详情" :visible.sync="dialogVisible" width="60%">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <div class="infos">
                <span>订单号：{{ detailsForm.orderid }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="infos">
                <span
                  >状态：<el-tag :type="sizeType(detailsForm.size)">{{
                    sizeText(detailsForm.size)
                  }}</el-tag></span
                >
              </div>
            </el-col>
            <el-col :span="8">
              <div class="infos">
                <span>加入时间：{{ detailsForm.time }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <div class="infos">
                <span>订单用户名：{{ detailsForm.name }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="infos" v>
                <span>联系电话：{{ detailsForm.phone }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="infos">
                <span>取货地址：{{ detailsForm.adress }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <div>
          <el-table style="width:100%" :data="detailsTable">
            <el-table-column label="商品名称" prop="goods"> </el-table-column>
            <el-table-column label="规格" prop="status"> </el-table-column>
            <el-table-column label="积分" prop="int"> </el-table-column>
            <el-table-column label="购买数量" prop="num"> </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { shopping } from "@/api/credit";
import { goodsList } from "@/api/goodslist";

export default {
  name: "classification",
  data() {
    return {
      isAdd: false,
      options: [],
      formData: null,
      currentPage: 1,
      dialogVisible: false,
      /* 查询信息 */
      form: {
        number: null,
        select: null,
        time: null
      },
    

      /* 详情表数据 */
      detailsForm: {},
      /* 详情表格数据 */
      detailsTable: [],
      // 默认分页条数
      page: {
        pageSize: 10, //每页显示条数
        total: null, //总条数
        current: 1 //要查询的页
      }
    };
  },
  created() {
    /* 初始化数据 */
    this._init_();
  },
  methods: {
    _init_() {
      this.getData();
    },
    /* 获取数据 */
    getData() {
     
      var current_page = null;
      var per_page = null;
      var data = {
        current_page: this.page.current,
        per_page: this.page.pageSize
      };
      shopping(data)
        .then(res => {
          
          this.options = res.data;
          this.page.total = res.data.length;
        })
       
    },
    /* 打开详情页 */
    toInfo(val) {
      this.dialogVisible = true;
      this.detailsTable = [];
      this.detailsForm = {};
      if (this.isAdd) {
        this.detailsForm = Object.assign({}, this.options[0]);
        var obj = new Object();
        obj.goods = this.options[0].goods;
        obj.int = this.options[0].int;
        obj.num = this.options[0].num;
        obj.status = this.options[0].status;
        this.detailsTable.push(obj);
      } else {
        this.detailsForm = Object.assign({}, this.options[val - 1]);
        var obj = new Object();
        obj.goods = this.options[val - 1].goods;
        obj.int = this.options[val - 1].int;
        obj.num = this.options[val - 1].num;
        obj.status = this.options[val - 1].status;
        this.detailsTable.push(obj);
      }
    },
    /* 过滤筛选 */
    findData() {
      this.isAdd = true;
      var orderid = this.form.number;
      var status = null;
      status = this.form.select;
      var data = {
        orderid
      };

      shopping(data).then(res => {
        this.options = res.data;
      });
    },
    /* 分页 */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getData();
    },

    sizeText(val) {
      switch (val) {
        case 1:
          return "已发货";
          break;
        case 2:
          return "待发货";
          break;
        case 3:
          return "已下单";
          break;
        case 4:
          return "运输中";
          break;
        case 5:
          return "待退货";
          break;
      }
    },
    sizeType(val) {
      switch (val) {
        case 1:
          return "";
          break;
        case 2:
          return "success";
          break;
        case 3:
          return "info";
          break;
        case 4:
          return "warning";
          break;
        case 5:
          return "danger";
          break;
      }
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
.infos {
  margin-bottom: 20px;
}
.page {
  margin-top: 10px;
}
</style>
