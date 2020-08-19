<template>
  <div>
    <!-- 订单面板 -->
    <el-card>
      <el-page-header content="订单详情" @back="goBack"></el-page-header>
      <el-divider></el-divider>
      <!-- 订单状态 -->
      <el-form ref="formOrders" v-model="formOrders" label-width="80px">
        <!-- el-row -->
        <el-row :gutter="5">
          <el-col :span="8">
            <!--订单号  -->
            <el-form-item label="订单号:">
              <span>{{ formOrders.uuid }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态：">
             
              <el-tag :type="formOrders.order_status|typeFilter(formOrders.order_status)">
            {{ formOrders.order_status | statusFilter(formOrders.order_status) }}
          </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 用户 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="用户：">
              <span>{{ formOrders.name }}</span>
            </el-form-item>
          </el-col>
          <!-- 联系电话： -->
          <el-col :span="8">
            <el-form-item label="联系电话：" width="120">
              <span>{{ formOrders.telephone }}</span>
            </el-form-item>
          </el-col>
          <!-- 取货地址： -->
          <el-col :span="8">
            <el-form-item label="取货地址：" width="120">
              <span>{{ formOrders.address }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="备注：">
              <span>{{ formOrders.remarks }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格内容 -->
      <el-table :data="formData" style="width: 100%;">
        <el-table-column
          prop="shop_name"
          label="商品名称"
          width="width"
        ></el-table-column>

        <el-table-column
          prop="prop"
          label="规格"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="shop_number"
          label="购买数量"
          width="width"
        ></el-table-column>
      </el-table>
      <!-- 右侧总计数 -->
      <el-row :gutter="10">
        <el-col :span="4" :offset="20">
          <span>总计：</span>
          <span>￥100</span>
        </el-col>
      </el-row>
      <!-- 快递信息 -->
      <h2>快递信息</h2>
      <el-divider></el-divider>
      <el-divider>暂无快递信息</el-divider>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: "ViewOrders",
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
        formOrders: null,
        formData: [],
      };
    },
    created() {
      this.onload();
    },
   
    methods: {
      onload() {
        let list = decodeURIComponent(this.$route.query.add);
        console.log(list);
        let obj = JSON.parse(list);
        this.formOrders = obj;

        this.formData = [obj];
      },

      // 返回上级
      goBack() {
        this.$router.go(-1);
      },
    },
  };
</script>
<style scoped></style>
