<template>
    <div class="detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-word">
            <table v-if="">
                <tr>
                    <td>用户名：</td>
                    <td>{{userInfo.userAccount}}</td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td>{{userInfo.realName}}</td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td>******
                        <Button type="primary" @click="changePassword">修改密码</Button>
                    </td>
                </tr>
                <tr>
                    <td>手机号码：</td>
                    <td>{{userInfo.telephone?userInfo.telephone:'--无--'}}</td>
                </tr>
                <tr>
                    <td>所属部门：</td>
                    <td>{{userInfo.deptName?userInfo.deptName:'--无--'}}</td>
                </tr>
                <tr>
                    <td>账号状态：</td>
                    <td>{{userInfo.status}}</td>
                </tr>
            </table>
        </div>
        <Modal v-model="modal1" title="修改密码" :width="350" :mask-closable="false" @on-cancel="cancelTop">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="clearfix" :label-width="90">
                <FormItem prop="oldPassWord" label="旧密码：">
                    <Input v-model="formItem.oldPassWord" type="password" style="width:200px"></Input>
                </FormItem> 
                <FormItem prop="newPassWord" label="新密码：">
                    <Input v-model="formItem.newPassWord" type="password" style="width:200px"></Input>
                </FormItem> 
                <FormItem prop="confirmPassWord" label="确认密码：">
                    <Input v-model="formItem.confirmPassWord" type="password" style="width:200px"></Input>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="ok('formItem')" :disabled="forbiddenSubmit">确定</Button>
                <Button type="primary" @click="cancle">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateOldPassWord = (rule, value, callback) => {
                if (this.formItem.oldPassWord == '') {
                    callback(new Error('请输入')); 
                }else{
                    if(this.formItem.newPassWord != ''){
                        this.$refs.formItem.validateField('newPassWord');    
                        callback();                                            
                    }else{
                        callback();
                    }
                }                   
            };
            const validateNewPassWord = (rule, value, callback) => {
                if (this.formItem.newPassWord == '') {
                    callback(new Error('请输入')); 
                }else{
                    if(this.formItem.newPassWord == this.formItem.oldPassWord){
                        callback(new Error('新密码与旧密码相同')); 
                    }else if(this.formItem.confirmPassWord != ''){
                        this.$refs.formItem.validateField('confirmPassWord');
                        callback();                        
                    }else{
                        callback()                   
                    }
                }                  
            };
            const validateConfirmPassWord = (rule, value, callback) => {
                if (this.formItem.confirmPassWord == '') {
                    callback(new Error('请输入')); 
                }else if(value !== this.formItem.newPassWord){
                    callback(new Error('两次输入的新密码不一致'));                     
                }else{
                    callback();
                }
            };
            return {
                forbiddenSubmit:false,
                spinShow:true,
                modal1: false,
                formItem: {
                    oldPassWord: '',
                    newPassWord: '',
                    confirmPassWord: '',
                },
                // 校验规则
                ruleCustom: {
                    oldPassWord: [
                        { validator: validateOldPassWord, trigger: 'blur' }
                    ],
                    newPassWord: [
                        { validator: validateNewPassWord, trigger: 'blur' }
                    ],
                    confirmPassWord: [
                        { validator: validateConfirmPassWord, trigger: 'blur' }
                    ],
                },
            }
        },
        computed:{
            userInfo(){
                return this.$store.getters.getUserInfo
            }
        },
        methods: {
            // 修改密码
            changePassword(){
                this.modal1 = true

            },
            // 修改密码-确定            
            ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // console.log(this.formItem.oldPassWord)
                        // console.log(this.formItem.newPassWord)
                        this.forbiddenSubmit = true
                        this.$http.post('/auth/user/editUserPassword.action', this.qs.stringify({
                            userId: this.$store.state.userInfo.id,
                            oldPassword: this.formItem.oldPassWord,
                            newPassword: this.formItem.newPassWord
                        })).then(response => {
                            if (response.data.status == 0) {
                                console.log(response)
                                this.$Message.success({
                                    content: '密码修改成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.modal1 = false
                                        this.$refs['formItem'].resetFields();
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }else{
                                console.log(response)
                                // this.validateOldPassWord = (callback) => {
                                //     callback(new Error('旧密码错误')); 
                                // }                                           
                                this.$Message.error({
                                    content: response.data.data,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }
                        }).catch(error => {
                            this.forbiddenSubmit = false
                            console.log(error);
                        })
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 修改密码-底部取消            
            cancle(){
                this.$refs['formItem'].resetFields();
                this.modal1 = false;                
            },
            // 修改密码-标题栏X                        
            cancelTop(){
                this.$refs['formItem'].resetFields();
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '个人信息',
                name: 'PersonalInfo',
                second: true,
                third: false
            });
            this.spinShow = false
        },
    }
</script>

<style scoped>
    table {
        border: 1px solid #E9E9E9;
    }
    table th {
        backgroud: #E9E9E9;
        line-height: 40px;
        background: #F7F7F7
    }
    table td {
        border: 1px solid #E9E9E9;
        line-height: 40px;
        text-align: center
    }
</style>