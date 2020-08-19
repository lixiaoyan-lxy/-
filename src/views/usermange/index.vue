<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <!-- 搜索与添加 -->
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <!-- clear在点击由 clearable 属性生成的清空按钮时触发 -->
                            <el-input placeholder="请输入内容" v-model="queryInfo.user" clearable @clear="getLists">
                                <el-button slot="append" icon="el-icon-search" @click="getLists"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" icon="el-icon-plus" @click="addDialogUser = true ">添加</el-button>
                        </el-col>
                    </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" stripe border>
                <el-table-column label="#" type="index">
                </el-table-column>
                <el-table-column prop="username" label="用户昵称">
                </el-table-column>
                <el-table-column prop="id" label="Id">
                    <!-- <template slot-scope="scope">
                        <el-tag :type="scope.row.is_super === '1' ? 'success' : ''">{{scope.row.is_super}}</el-tag>
                    </template> -->
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="add_time" label="注册时间">
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="success" icon="el-icon-s-claim">调整资金</el-button> -->
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdiUser(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.page"
            :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" 
            :total="queryInfo.total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogUser" width="50%" @close="addDialogClosed">
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
                <el-form-item label="用户昵称" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model=" addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>   
            <span slot="footer">
              <el-button @click="addDialogUser = false">取 消</el-button>
              <el-button type="primary" @click="addUser()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户信息的对话框 -->
        <el-dialog title="修改用户信息" :visible.sync="ediDialogVisible" width="50%" @close="editDialogClose">
            <el-form :model="editForm" :rules="addFormRules" ref="editUserRef" label-width="80px">
                <el-form-item label="用户昵称" prop="username">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="ediDialogVisible= false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { GetUserList, UserAdd, EidtUserss, DeleteUser } from "../../api/usermange";
export default {
    data(){
        return {
            //获取用户列表的参数对象
            queryInfo:{
                user:"",
                status:"",
                currentPage:1,
                total:1,
                page:1,
                pageSize:2
            },
            userlist:[],
            // total:0,  
            //控制添加用户对话框的显示与隐藏
            addDialogUser:false,
            //添加用户的表单数据
            addForm:{
                username:'',
                password:'',
                phone:'',
                email:'',
                // 性别
                sex:'',
            },
            // 添加用户、修改用户信息的验证规则对象
            addFormRules:{
                username:[
                    { required: true, message: '请输入用户昵称', trigger: 'blur'},
                    { min: 1, max: 8, message: '长度在1到8个字符之间', trigger: 'blur'}
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在6到18个字符之间', trigger:'blur'}
                ],
                phone:[
                    { required: true, message: '请输入电话', trigger:'blur'},
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger:'blur'},
                ],
                sex:[
                    { required: true, message: '请选择性别', trigger:'change'},
                ]
            },
            // 控制修改用户信息的显示与隐藏
            ediDialogVisible:false,
            editForm:{},
        }
    },
    created() {
         this.getLists();
    },
    methods:{
        //获取列表信息
        getLists(){
            let listData = {
                page:this.queryInfo.page,
                pageSize:this.queryInfo.pageSize,
                keyword:this.queryInfo.user,
                status:this.queryInfo.status
            };
            GetUserList(listData)
            .then(res => {
                if(res.code === 200) {
                    this.userlist = res.data;
                    this.queryInfo.total = res.count;
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        //监听pagesize的改变事件
        handleSizeChange(newSize){
            // console.log(newSize)
            this.queryInfo.pageSize = newSize;
            this.getLists();
        },
        //监听页码值得改变事件
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryInfo.page = newPage;
            this.getLists();
        },
        //监听添加用户的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        },
        //点击添加用户表单的确定按钮，添加用户
        addUser(){
            this.$refs.addFormRef.validate(valid => {
                // console.log(valid)
                if(!valid) return
                // var data=this.addForm
                // UserAdd(data)
                // .then(res =>{
                //     if(res.code === 0){
                //         this.$message.success('添加用户成功！')
                //     }
                //     // if(res.status === 200){
                //     //     this.$message.success('添加用户成功!')
                //     // }
                // })
                // .catch(
                //     this.$message.error('添加用户失败！')
                // )
                // this.addDialogUser = false;
                // this.getLists()
                UserAdd(this.addForm)
                .then(res => {
                    if(res.code === 200){
                        this.addForm = {};
                        this.addDialogUser = false;
                        this.$message.success('添加用户成功！')
                    }
                })
                .catch(error => {
                    this.addDialogUser = false;
                    this.$message.error('添加用户失败！');
                    console.log(error);
                })
                this.getLists()
            })
        },
        // 展示修改用户信息的对话框
        showEdiUser(data){
            this.editForm = data;
            this.ediDialogVisible = true
        },
        // 监听修改用户信息对话框的关闭事件
        editDialogClose(){
            this.$refs.editUserRef.resetFields()
        },
        // 验证修改信息并提交
        editUserInfo(){
            this.$refs.editUserRef.validate(valid =>{
                // console.log(valid)
                if(!valid) return
                EidtUserss(this.editForm)
                .then(res =>{
                    if(res.code === 200){
                        this.ediDialogVisible = false;
                        this.$message.success('修改成功')
                    }
                })
                .catch(error => {
                    this.ediDialogVisible = false;
                    this.$message.error('修改失败！')
                    console.log(error);
                })
                this.getLists();
            })
        },
        //删除用户
        delUser(data){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( () => {
                DeleteUser({ id: data})
                .then(res => {
                    if(res.code === 200) {
                        this.$message.success('删除成功！');
                        this.getLists();
                    }
                })
                .catch(error => {
                    this.$message.error('删除失败！')
                });
            })
            .catch( () => {
                this.$message('已取消了删除')
            });
        }
    }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
margin-top:30px;
margin-left:15px;
}
.el-card{
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    margin-top:30px;
    // width: 1500px;
}
.el-table{
    margin-top:15px;
}
// .el-button{
//     margin-left:0px;
// }
.el-pagination {
    margin-top:25px;
}
</style>