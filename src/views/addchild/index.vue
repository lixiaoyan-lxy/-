<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台控制</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="nextForm" label-width="100px" :rules="formRules" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="10">
            <p>广告位编辑</p>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-back" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form-item label="广告位">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告名" prop="ad_name">
          <el-input style="width:240px" v-model="nextForm.ad_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="广告链接" prop="chair">
          <el-input style="width:240px" v-model="nextForm.chair" placeholder="请输入广告链接"></el-input>
        </el-form-item>
        <!-- 开始时间 -->
        <el-form-item label="开始时间">
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="nextForm.str_time"
              style="width:240px;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1"></el-col>
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="nextForm.end_time"
              style="width: 240px;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 广告类型 -->
        <el-form-item label="广告类型" prop="type">
            <el-input style="width:240px" v-model="nextForm.type" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
           <el-input style="width:240px" v-model="nextForm.sort" type="number"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="finalForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getNextList,adFormFinal } from "@/api/ad";
export default {
  data() {
    return {
      nextForm: {
        ad_name: "",
        chair: "",
        str_time: "",
        end_time: "",
        sort:"",
        type:"",
      },
      //   验证规则
      formRules: {
        adv_name: [
          { required: true, message: "广告名不能为空", trigger: "blur" },
        ],
        adv_type:[
            { required: true, message: "广告类型不能为空", trigger: "blur"}
        ]
      },
      options: [
        {
          value: "",
          label: "",
        },
      ],
      value:''
    };
  },
  created() {
    this.nextData();
  },
  methods: {
    nextData() {
      getNextList().then((res) => {
        console.log(res);
        if (res.code !== 200) {
          this.$message.error("获取失败!");
        }
        this.options = res.msg;
      });
    },
    finalForm() {
      console.log(this.nextForm)
      adFormFinal(this.nextForm).then((res) =>{
        console.log(this.nextForm)
      })
      this.$message.success('编辑成功')
        this.$router.push({ name:'Adv' })
    },
    goBack() {
      this.$router.push({ name: "Adv" });
    },
  },
};
</script>

<style scoped>
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