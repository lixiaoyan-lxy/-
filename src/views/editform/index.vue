<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台控制</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 广告位编辑表单 -->
      <el-form :model="adForm" label-width="100px" :rules="formRules" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="10">
            <p>广告位编辑</p>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-back" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form-item label="广告位" prop="ggweizhi">
          <el-input style="width:240px" v-model="adForm.ggweizhi"></el-input>
        </el-form-item>
        <el-form-item label="宽度" prop="wid">
          <el-input style="width:240px" v-model="adForm.wid"></el-input>
        </el-form-item>
        <el-form-item label="高度" prop="hig">
          <el-input style="width:240px" v-model="adForm.hig"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="swit_val"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sumbitForm">提交</el-button>
          <el-button @click="resetForm(adForm)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { putList } from '@/api/ad'
export default {
  data() {
    return {
      adForm: {
        ggweizhi: "",
        wid: "",
        hig: "",
      },
      formRules: {
        ggweizhi: [
          { required: true, message: "广告位不能为空", trigger: "blur" },
        ],
        wid: [{ required: true, message: "宽度不能为空", trigger: "blur" }],
        hig: [{ required: true, message: "高度不能为空", trigger: "blur" }],
      },
      //switch开关状态
      swit_val: true,
    };
  },
  created() {},
  methods: {
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    goBack() {
         this.$router.push({ name:'Adv_position' })
    },
    sumbitForm() {
      console.log(this.adForm)
        putList(this.adForm).then((res) => {
        })
        this.$message.success('编辑成功')
        this.$router.push({ name:'Adv_position' })
    }
  },
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-left: 30px;
  margin-top: 15px;
  font-size: 12px;
}
.el-card {
  margin-top: 30px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-button {
  font-size: 10px;
}
</style>