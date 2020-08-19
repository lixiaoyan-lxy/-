<template>
  <el-card class="box-card">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="发货时间" prop="date">
        <el-input v-model="ruleForm.date" style="width:240px" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:240px" />
      </el-form-item>
      <el-form-item label="发货地址" prop="address1">
        <el-input v-model="ruleForm.address1" style="width:240px" />
      </el-form-item>
      <el-form-item label="收货地址" prop="address2">
        <el-input v-model="ruleForm.address2" style="width:240px" />
      </el-form-item>
      <el-form-item label="发送状态" prop="state">
        <el-tag>未发货</el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存编辑</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { editForm } from '@/api/logistics'

export default {
  data() {
    return {
      id: '',
      ruleForm: {
        date: '',
        name: '',
        address1: '',
        address2: '',
        state: 'true'
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        address1: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入收货地址', trigger: 'blur' }
        ],
        data: [
          { required: true, message: '请输入时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取前面id值
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.movieId
      // 将数据放在当前组件的数据内
      this.id = routerParams
    },
    // 提交
    submitForm() {
      editForm(this.id).then(res => {
        console.log('编辑成功！！！')
        this.$router.push({ path: 'index' })
      })
    },
    // 取消
    resetForm(formName) {
      this.$router.push({ path: 'index' })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: calc(100vh - 90px);
  margin: 20px;
}
</style>
