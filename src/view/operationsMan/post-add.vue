<template>
    <div class="relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" :label-width="110">
        <input type='text' style='display:none'/>
            <FormItem label="所属部门：" prop="deptName">
                <Select v-model="formItem.model1" style="width:200px;" v-if="showDeptSelect" @on-change="getPostList">
                    <Option v-for="item in formItem.deptName" :value="item.value" :key="item.value" style="width: 200px">{{ item.label }}</Option>
                </Select>
                {{deptName}}
            </FormItem>
            <FormItem label="岗位名称：" prop="postName">
                <Input v-model="formItem.postName" placeholder="字母区分大小写，最多18个字符" :maxlength="18" style="width:200px"></Input>
            </FormItem>
            <FormItem label="岗位描述：" prop="city">
                <Input v-model="formItem.remark" type="textarea" style="width:774px" :maxlength="120"></Input>                
            </FormItem>
            <FormItem label="已有部门岗位：" prop="city">
                <table>
                    <tr>
                        <th>部门岗位</th>
                    </tr>
                    <tr v-for="item in alreadyPost">
                        <td>{{item.postName}}</td>
                    </tr>
                </table>
            </FormItem>
        </Form>
        <div class="btn-wrapper">
            <Button type="primary" @click="save('formItem')" :disabled="forbiddenSubmit">保存</Button>
            <Button type="primary" @click="returnBack">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            const validateDeptName = (rule, value, callback) => {
                // 如果没选择部门，提示选择
                if (this.formItem.model1 == '') {
                    callback(new Error('请选择'));
                }else{
                    if(this.formItem.postName != ''){
                        this.$refs.formItem.validateField('postName');  
                        callback()                      
                    }else{
                        callback()
                    }
                }
            };
            const validatePostName = (rule, value, callback) => {
                // 如果没选择退款方式，提示选择
                let reg = /\s/;
                let postName = $.trim(this.formItem.postName)
                if (postName.replace(/ /g, "") == '') {
                    callback(new Error('请填写岗位名称'));
                }else if(reg.test(postName) == true){
                    callback(new Error('格式错误'));
                }else{
                    // 如果没选择部门，不进行验证岗位是否重复
                    if(this.formItem.model1 == ''){
                        callback() 
                    }
                    else{
                        console.log(this.formItem.model1)
                        this.$http.post('/auth/post/validatePost.action', this.qs.stringify({
                            postName:postName,
                            deptId:this.formItem.model1
                        })).then(response => {
                            // console.log(response)
                            if (response.data.data == false) {
                                callback()
                            } else {
                                callback(new Error('岗位已存在'))                                
                            }
                        }).catch(error => {
                            console.log(error);
                        })
                    } 
                }
            };
            return {
                forbiddenSubmit:false,
                spinShow:true,
                // 是否显示所属部门下拉框
                showDeptSelect:false,
                formItem:{
                    postName:'',
                    remark:'',
                    deptName: [
                        // {
                        //     value: '0',
                        //     label: '全部'
                        // },
                    ],
                    model1:'',
                    
                },
                alreadyPost:[],
                // 岗位名称select，要动态获取的吧？
                
                ruleCustom: {
                    deptName: [
                        { required: true, validator: validateDeptName, trigger: 'change' }
                    ],
                    postName: [
                        { required: true, validator: validatePostName, trigger: 'blur' }
                    ]
                },

            }
        },
        computed:{
            deptName(){
                return this.$store.state.userInfo.deptName
            }
        },
        methods: {
            addNewAccount(){
                this.$router.push({name:'PostAdd'})
            },
            getPostDetail(){
                this.$http.post('/auth/post/postDetail.action', this.qs.stringify({
                    postId:this.$route.params.postId,
                })).then(response => {
                    if (response.data.status == 0) {
                        this.formItem.deptName = response.data.data.deptName;
                        this.formItem.postName = response.data.data.postName;
                        this.formItem.remark = response.data.data.remark;
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取部门下已有岗位列表
            getPostList(){
                this.$http.post('/auth/post/getPostListByDept.action', this.qs.stringify({
                    deptId:this.formItem.model1,
                })).then(response => {
                    if (response.data.status == 0) {
                        this.alreadyPost = response.data.data
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 保存岗位信息
            save(name){
                this.$refs[name].validate((valid) => {
                // console.log(this.ruleCustom.deptName[0].validator)
                    if (valid) {
                        console.log('校验成功')
                        // 校验成功
                        this.forbiddenSubmit = true
                        this.$http.post('/auth/post/savePost.action', this.qs.stringify({
                            postName:this.formItem.postName,
                            deptId:this.formItem.model1,
                            remark:this.formItem.remark
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '保存成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$router.push({name:'PostList'})
                                    }
                                });
                                
                            }else{
                                console.log(response);
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                            this.forbiddenSubmit = false
                        })

                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
                
            },
            // 获取全部部门
            getDeptList(){
                this.$http.post('/auth/dept/getAllList.action').then(response => {
                    if (response.data.status == 0) {
                        let _this = this
                        $.each(response.data.data, function(key, val) {
                            // console.log(val.deptId)
                            // console.log(val.deptName)
                            _this.formItem.deptName.push({'value':val.deptId,'label':val.deptName})
                        })
                    }else{
                        console.log(response);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 返回
            returnBack(){
                this.$router.push({name:'PostList'})
            }

        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门岗位',
                thirdNavigation: '新增',
                name: 'PostList',
                second: true,
                third: true
            });
            // admin显示部门下拉框    
            if(this.$store.state.userInfo.admin == true){
                this.showDeptSelect = true
                this.getDeptList()              
            }else{
                // 不是超级管理员则设置deptId为登录用户deptId
                this.formItem.model1 = this.$store.state.userInfo.deptId
                // this.ruleCustom.deptName = []
                // console.log(this.ruleCustom.deptName[0].required)
                this.getPostList()
            }
            this.spinShow = false
        }
    }
</script>

<style scoped>
table{border:1px solid #E9E9E9;width:774px}
table th{backgroud: #E9E9E9;line-height:40px;background:#F7F7F7}
table td{border:1px solid #E9E9E9;line-height:40px;text-align:center}
</style>