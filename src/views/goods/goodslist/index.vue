<template>
  <div>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" :info="true" :model="qureyInfo">
        <el-col :span="9">
          <el-input placeholder="请输入商品名称" v-model="qureyInfo.keyword" @input="getGoodsList()">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-button style="float: right;" @click="addDialogGoods = true" type="success">添加商品</el-button>
      </el-row>

      <!-- 商品列表区域 -->
      <el-table border stripe v-loading="loading" :data="tableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="产品ID" prop="product_id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="产品编号" prop="number"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--删除  -->
            <el-button type="danger" icon="el-icon-delete" circle @click="delGood(scope.row.id)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="editGoods(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="qureyInfo.page"
        :page-sizes="[2,4,8]"
        :page-size="qureyInfo.pageSize"
        class="productPag"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      
    </el-card>

    <!-- 编辑弹框 -->
    <Dialog
      :dialog.sync="dialogEditVisible"
      :editData="editData"
      :dialogType="dialogType"
      :fn="getGoodsList"
    ></Dialog>

    <!-- 添加商品的对话框 -->
    <el-dialog title="添加商品" :visible.sync="addDialogGoods" width="50%" @close="addDialogClosed">
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
        <!-- ID -->
        <el-form-item label="ID" prop="id" class="item-form">
          <el-input v-model="addForm.id" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 产品ID -->
        <el-form-item label="产品ID" prop="product_id" class="item-form">
          <el-input v-model="addForm.product_id" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 价格 -->
        <el-form-item label="价格" prop="price" class="item-form">
          <el-input v-model="addForm.price" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name" class="item-form">
          <el-input v-model="addForm.name" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 产品编号 -->
        <el-form-item label="产品编号" prop="number" class="item-form">
          <el-input v-model="addForm.number" size="small" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogGoods = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, deleteGoods, selectGoods,addGoods } from "@/api/goodslist";
import Dialog from "./dialog";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      // 搜索
      qureyInfo: {
        keyword: "",
        id: "",
        name: "",
        price: "",
        page:1,
        pageSize:2,
      },
      //table数据
      tableData: [],
      // 分页
      currentPage: 1,
      // count: 0,
      total: 0,
      // 产品id
      productId: null,
      loading: false,
      // 新增弹框
      // dialogFormVisible: false,
      // editType: "add",
      // 编辑
      dialogEditVisible: false,
      dialogType: "edit",
      editData: {},

      // 添加
      addForm: {
        id: "",
        product_id: "",
        name: "",
        price: "",
        number: "",
      },
      // 控制添加商品对话框的显示与隐藏
      addDialogGoods:false,
      // 规则
       addFormRules: {
        name: [
          { required: true, message: "请输入商品名", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        product_id: [{ required: true, message: "请输入产品ID", trigger: "blur" }],
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        number: [{ required: true, message: "请输入产品编号", trigger: "blur" }],
      }
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.loading = true;
      goodsList(this.qureyInfo)
        .then((res) => {
          if (res.code === 0) {
            this.total = res.count;
            this.page = res.page;
            this.pageSize = res.pageSize;
            console.log(res)
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
          console.log(error);
        });
    },
    /**
     * 分页
     */
    handleSizeChange(val) {
      this.qureyInfo.pageSize = val;
      this.getGoodsList();
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      this.qureyInfo.page = val;
      this.getGoodsList();
    },
    /**
     * 删除用户
     */
    delGood(data) {
      console.log(data);
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

    /**
     * 编辑商品
     */
    editGoods(data) {
      this.editData = data;
      this.dialogEditVisible = true;
    },

    //监听添加的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        },
        //点击添加的确定按钮，添加商品
        addGoodsInfo(){
            this.$refs.addFormRef.validate(valid => {
                // console.log(valid)
                if(!valid) return
                addGoods(this.addForm)
                .then(res => {
                    if(res.code === 0){
                        this.addForm = {};
                        this.addDialogGoods = false;
                        this.$message.success('添加商品成功！')
                    }
                })
                .catch(error => {
                    this.addDialogGoods = false;
                    this.$message.error('添加商品失败！');
                    console.log(error);
                })
                this.getGoodsList()
            })
        },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.productPag {
  margin-top: 20px;
  margin-left: 50px;
}
</style>