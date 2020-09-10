<template>
    <div>
        <!-- 面包屑导航区 -->
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户中心</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb> -->

        <!-- 卡片视图区 -->
        <el-card>
            <!-- 添加角色 -->
            <el-row>
                <el-col :span="24">
                  <el-button type="primary" icon="el-icon-plus" @click="addDialogRole = true">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区 -->
            <el-table :data="rolelist" stripe border>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="角色名" prop="role"></el-table-column>
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="描述" prop="describe"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" round @click="showEditRols(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" round @click="delRole(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加角色的对话框 -->
        <el-dialog title="添加角色" :visible.sync="addDialogRole" width="50%" @close="addRoleClosed">
            <el-form ref="addRoleRef" :model="addRoleForm" :rules="addRoleRules" label-width="80px">
              <el-form-item label="角色名" prop="role">
                <el-input v-model="addRoleForm.role"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="describe">
                <el-input v-model="addRoleForm.describe"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="addDialogRole = false">取 消</el-button>
              <el-button type="primary" @click="addRoles()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改角色信息的对话框 -->
        <el-dialog title="修改角色信息" :visible.sync="editDialogRole" width="50%" @close="editRoleDialogClose">
          <el-form :model="editRoleForm" :rules="addRoleRules" ref="editRoleFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名" prop="role">
              <el-input v-model="editRoleForm.role"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="editRoleForm.describe"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="editDialogRole = false">取 消</el-button>
            <el-button type="primary" @click="editRolesInfo">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import { GetRolesLest, DeleteRole, AddRole, EditRoles } from "../../api/roles"
export default {
  data(){
    return {
      //所有的角色列表
      rolelist:[],
      // 控制添加角色对话框的显示与隐藏
      addDialogRole:false,
      // 添加角色的表单数据
      addRoleForm:{
       role:'',
       describe:'',
      },
      // 添加角色表单的验证规测
      addRoleRules:{
        role:[
          { required: true, message: '请输入角色名', trigger: 'blur'},
          { min: 1, max: 8, message: '长度在1到8个字符之间', trigger: 'blur'}
        ],
        describe:[
          { required: true, message: '请输出对角色的描述', trigger: 'blur'},
          { min: 2, max: 60, message: '长度在2到60个字符之间', trigger: 'blur'}
        ]
      },
      //控制修改角色信息对话框的显示与隐藏
      editDialogRole:false,
      editRoleForm:{},
    }
  },
  created(){
    this.getrolelist()
  },
  methods:{
    //获取角色列表
    getrolelist(){
      GetRolesLest()
      .then(res => {
        // console.log(res);
        if(res.code === 200){
          this.rolelist = res.data;
          // console.log(this.rolelist);
        }
      })
      .catch(error => {
        consloe.log(error)
        this.$message.error('获取角色列表失败！');
      })
    },
    // 监听添加角色的关闭事件
    addRoleClosed(){
      this.$refs.addRoleRef.resetFields();
    },
    // 点击确认按钮，添加角色 
    addRoles(){
      this.$refs.addRoleRef.validate(valid => {
        // console.log(valid);
        if(valid === true){
           AddRole(this.addRoleForm)
           .then( res => {
             if(res.code === 200){
               this.addRoleForm = {};
               this.addDialogRole = false;
               this.$message.success('添加角色成功！');
               this.getrolelist();
             }
           })
           .catch(error => {
              this.addDialogRole = false;
              this.$message.error('添加角色失败！');
           })
        }
        // if(!valid) return
        // AddRole(this.addRoleForm)
        // .then(res => {
        //   if(res.code === 200){
        //     this.addRoleForm = {};
        //     this.addDialogRole = false;
        //     this.$message.success('添加角色成功!')
        //   }
        // })
        // .catch( error => {
        //   this.addDialogRole = false;
        //   this.$message.error('添加用户失败！');
        //   console.log(error)
        // })
        // this.getrolelist()
      })
    },
    // 展示修改角色信息的对话框
    showEditRols(data){
      this.editRoleForm = data;
      this.editDialogRole = true
    },
    // 监听修改角色信息对话框的关闭事件
    editRoleDialogClose(){
      this.$refs.editRoleFormRef.resetFields()
    },
    // 点击确定按钮，验证修改信息并提交
   editRolesInfo(){
      this.$refs.editRoleFormRef.validate(valid => {
        // console.log(valid);
        if(valid === true) {
          EditRoles(this.editRoleForm)
          .then(res => {
            if(res.code === 200){
              this.editDialogRole = false;
              this.$message.success('修改成功');
            }
          })
          .catch(error => {
            this.editDialogRole = false;
            this.$message.error('修改失败');
            console.log(error)
          })
          this.getrolelist();
        }
      })
    },

    // 删除角色
    delRole(data){
       this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( () => {
          DeleteRole({ id: data })
          .then( res => {
            if(res.code === 200) {
              this.$message.success('删除成功！');
              this.getrolelist();
            }
          })
          .catch(error => {
            this.$message.error('删除失败！')
          });
        })
        .catch( () => {
          this.$message('已取消了删除');
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
  margin-top: 30px;
  margin-left: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin-top: 30px;
}
.el-table{
  margin-top: 15px;
}
</style>