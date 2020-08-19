<template>
  <div class="table-container">
    <!-- 筛选条件查询 -->
    <div>
   
      <div class="queryForm">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.uuid" placeholder="请输入订单号" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              size='mini'
              @click="handleQuery"

            >
              条件筛选
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 数据列表 -->
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      @selection-change="setSelectRows"
    >

      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>

      
      <!-- 序号 -->
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.row.serial }}
        </template>
      </el-table-column>

      <!-- 订单号 -->
      <el-table-column
        show-overflow-tooltip
        prop="uuid"
        label="订单号"
      ></el-table-column>

      <!-- 商品名称 -->
      <el-table-column
        show-overflow-tooltip
        label="商品名称"
        prop="shop_name"
      ></el-table-column>

      <!-- 商品图片 -->
      <el-table-column show-overflow-tooltip label="商品图片">
        <template slot-scope="scope">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="scope.row.img_url"
          ></el-image>
        </template>
      </el-table-column>

      <!--  价格-->
      <el-table-column
        show-overflow-tooltip
        label="价格"
        prop="price"
      ></el-table-column>

      <!-- 订单状态 -->
      <el-table-column show-overflow-tooltip label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_status|typeFilter(scope.row.order_status)">
            {{ scope.row.order_status | statusFilter(scope.row.order_status) }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 加入时间 -->
      <el-table-column
        show-overflow-tooltip
        label="加入时间"
        prop="datetime"
        width="200"
      ></el-table-column>

      <!-- 操作 -->
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="180px"
        fixed="right"
      >

        <template slot-scope="scope">
          <!-- 查看订单 -->
          <el-button type="success" @click="handleView(scope.row)">
            查看订单
          </el-button>
          <!-- <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button> -->
        </template>
      </el-table-column>

    </el-table>

    
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- <table-edit ref="edit"></table-edit> -->
  </div>
</template>

<script>
  import { getList,check } from "@/api/mgtOrder/index";
  // import TableEdit from "./components/TableEdit";
  export default {
    name: "MgtOrder",
    components: {
      // TableEdit,
    },
    // 局部过滤器
    filters: {
      //  状态过滤器
       typeFilter(status) {
        const statusMap = {
          1: "success",
          2: "danger",
          3: "info",
        };
        return statusMap[status];
      },
      statusFilter(status) {
        const statusMap = {
          1: "支付成功",
          2: "等待支付",
          3: "取消支付",
        };
        return statusMap[status];
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0, //总条数
        background: true,
        selectRows: "", //勾选内容
        queryForm: {
          pageNo: 1,
          pageSize: 5,
          uuid: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      // 请求订单数据
      async fetchData() {
        this.listLoading = true;
        var query={
current_page:this.queryForm.pageNo,
per_page:this.queryForm.pageSize,

        }
        const { data, totalCount } = await getList(query);
        // console.log("先打印看一下", data);
        this.list = data;
        console.log(this.list,"打印")
        const imageList = [];
        data.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
        this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
    
      setSelectRows(val) {
        this.selectRows = val;
      },
      // 查看订单
      handleView(query) {
        let row = JSON.stringify(query);
        this.$router.push({
          path: "indexItemViewOrder",
          query: {
            add: decodeURIComponent(row),
          },
        });
       
      },
    // 分页
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      // 查询订单
      handleQuery() {
let uuid=this.queryForm.uuid;
console.log("uuid",uuid)
check(uuid).then(res=>{
  console.log("回调！",res);
})
        // this.queryForm.pageNo = 1;
        // this.fetchData();
      },

     
    },
  };
</script>
<style lang="scss">
 .queryForm{
   margin: 20px;
 }
</style>