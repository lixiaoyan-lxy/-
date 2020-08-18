<template>
     <el-dialog
    :title="dialogType==='edit'?'修改商品信息':'商品创建'"
    :visible.sync="dialogForm"
    @open="open"
    @close="close"
  >
  <el-form :model="form" :rules="rules" ref="form">
    <!-- ID -->
        <el-form-item label="ID" prop="id" class="item-form">
          <el-input v-model="form.id" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 产品ID -->
        <el-form-item
          label="产品ID"
          prop="product_id"
          class="item-form"
        >
          <el-input v-model="form.product_id" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 价格 -->
        <el-form-item label="价格" prop="price" class="item-form">
          <el-input v-model="form.price" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name" class="item-form">
          <el-input v-model="form.name" size="small" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 产品编号 -->
        <el-form-item label="产品编号" prop="number" class="item-form">
          <el-input v-model="form.number" size="small" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editGoods,addGoods } from "@/api/goodslist";
import { getToken } from "@/utils/auth";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    },
    dialogType: {
      type: String,
      default: ""
    },
    fn: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      //弹框
      form: {
        id: "",
        product_id: "",
        name: "",
        price: "",
        number: "",
      },
      dialogForm: false,
      // formLabelWidth: "120px",
      // imageUrl: "",
      rules: {
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
  watch: {
    dialog(val, newval) {
      this.dialogForm = val;
    }
  },
  computed: {
    headers() {
      return {
        token: getToken()
      };
    }
  },
  mounted() {
    this.dialogForm = this.dialog;
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editGoods(this.form)
            .then(res => {
              if (res.code === 0) {
                this.fn();
                this.dialogForm = false;
                this.form = {};
                var keyData =
                  this.dialogType === "edit" ? "修改成功" : "用户创建成功";
                this.$notify({
                  title: "成功",
                  message: keyData,
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.dialogForm = false;
              var keyData =
                this.dialogType === "edit" ? "修改失败" : "用户创建失败";
              this.$notify.error({
                title: "失败",
                message: keyData,
                type: "success"
              });
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹框打开
    open() {
      if (this.dialogType == "edit") {
        (this.form.id = this.editData.id),
          (this.form.product_id = this.editData.product_id),
          (this.form.name = this.editData.name),
          (this.form.price = this.editData.price),
          (this.form.number = this.editData.number);
      }
    },
    // 弹框关闭
    close() {
      this.$emit("update:dialog", false);
    }
  }
};
</script>