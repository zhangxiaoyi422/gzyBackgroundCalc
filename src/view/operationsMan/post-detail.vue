<template>
    <div class="relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" :label-width="110">
        <input type='text' style='display:none'/>
            <FormItem label="所属部门：">
                {{formItem.deptName}}
            </FormItem>
            <FormItem label="岗位名称：" prop="postName" style="width:300px" :maxlength="18">
                <Input v-model="formItem.postName"></Input>
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
            <Button type="primary" @click="save('formItem')" v-if="permission" :disabled="forbiddenSubmit">保存</Button>
            <Button type="primary" @click="returnBack">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            const validatePostName = (rule, value, callback) => {
                // 如果没选择退款方式，提示选择
                let reg = /\s/;
                let postName = $.trim(this.formItem.postName)
                if (postName.replace(/ /g, "") == '') {
                    callback(new Error('请填写岗位名称'));
                }else if(reg.test(postName) == true){
                    callback(new Error('格式错误'));
                }else{
                    if(this.oldPostName == postName){
                        callback()
                    }else{
                        this.$http.post('/auth/post/validatePost.action', this.qs.stringify({
                            postName:postName,
                            deptId:this.$route.params.deptId
                        })).then(response => {
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
                permission:false,
                spinShow:true,
                oldPostName:'',
                formItem:{
                    deptName:'',
                    postName:'',
                    remark:'',
                },
                // 已有岗位
                alreadyPost:'',
                ruleCustom: {
                    postName: [
                        { required: true, validator: validatePostName, trigger: 'blur' }
                    ]
                },

            }
        },
        methods: {
            addNewAccount(){
                this.$router.push({name:'PostAdd'})
            },
            // 获取岗位详情
            getPostDetail(){
                this.$http.post('/auth/post/postDetail.action', this.qs.stringify({
                    postId:this.$route.params.postId,
                })).then(response => {
                    if (response.data.status == 0) {
                        this.formItem.deptName = response.data.data.deptName;
                        this.formItem.postName = response.data.data.postName;
                        this.formItem.remark = response.data.data.remark;
                        this.oldPostName = response.data.data.postName;
                        this.spinShow = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取部门下所有岗位列表
            getPostList(){
                this.$http.post('/auth/post/getPostListByDept.action', this.qs.stringify({
                    deptId:this.$route.params.deptId,
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
                    if (valid) {
                        // 校验成功
                        this.forbiddenSubmit = true
                        this.$http.post('/auth/post/editPost.action', this.qs.stringify({
                            postId:this.$route.params.postId,
                            // 原来岗位名称和修改后岗位名称一样，说明没修改，传空值
                            postName:(this.oldPostName == this.formItem.postName)?'':$.trim(this.formItem.postName),
                            deptId:this.$route.params.deptId,
                            remark:$.trim(this.formItem.remark)
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '保存成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$router.push({name:'PostList'})
                                    }
                                });

                            } else {
                                console.log(response)
                                this.forbiddenSubmit = false
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
            // 返回
            returnBack(){
                this.$router.push({name:'PostList'})
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门岗位',
                thirdNavigation: '详情',
                name: 'PostList',
                second: true,
                third: true
            });
            // 获取岗位详情
            this.getPostDetail();
            // 获取部门下已有岗位列表
            this.getPostList();
            
            if (this.$store.state.limitList.indexOf("4_1_3") >= 0) {
                // 如果有编辑权限
                this.permission = true
            }
        },
    }
</script>

<style scoped>
table{border:1px solid #E9E9E9;width:774px}
table th{backgroud: #E9E9E9;line-height:40px;background:#F7F7F7}
table td{border:1px solid #E9E9E9;line-height:40px;text-align:center}
</style>