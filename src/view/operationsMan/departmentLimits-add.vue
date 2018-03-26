<template>
    <div class="refund-query relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="clearfix" :label-width="100">
        <input type='text' style='display:none'/>
            <FormItem prop="departmentName" label="部门名称：">
                <Input v-model="formItem.deptName" placeholder="最多18个字符，字母区分大小写" style="width:200px" :maxlength="18"></Input>
            </FormItem>
            <FormItem label="业务权限分配：">
            <table>
                <CheckboxGroup v-model="checkItem_1" @on-change="checkAllGroupChange_1">
                <tr>
                    <th>业务模块</th>
                    <th>菜单</th>
                    <th>子菜单</th>
                    <th colspan="3">操作权限</th>
                </tr>
                <tr class="row1 yunying">
                    <td rowspan="9" width="122"><Checkbox label="1" @click.prevent.native="handleCheckAll_1">运营管理</Checkbox></td>
                    <td rowspan="2" width="176"><Checkbox label="1_1">公证币预充值配置</Checkbox></td>
                    <td width="166"><Checkbox label="1_1_1">支付方式</Checkbox></td>
                    <td width="121">&nbsp;</td>
                    <td width="121">&nbsp;</td>
                    <td width="121">&nbsp;</td>
                </tr>
                <tr class="row2">               
                    <td><Checkbox label="1_1_2">充值数量</Checkbox></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr class="row3">               
                    <td rowspan="2"><Checkbox label="1_2">服务收费配置</Checkbox></td>
                    <td><Checkbox label="1_2_1">收费组合配置</Checkbox></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr class="row4">               
                    <td><Checkbox label="1_2_2">公证机构收费</Checkbox></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr class="row5">               
                    <td rowspan="2"><Checkbox label="1_3">体验赠送水晶币</Checkbox></td>
                    <td><Checkbox label="1_3_1">体验赠送</Checkbox></td>
                    <td></td>
                    <td><Checkbox label="1_3_1_2">申请</Checkbox></td>
                    <td><Checkbox label="1_3_1_3">审批</Checkbox></td>
                </tr>
                <tr class="row6">               
                    <td><Checkbox label="1_3_2">赠送水晶币余额</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row7">               
                    <td><Checkbox label="1_4">申领水晶币申请</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td><Checkbox label="1_4_2">申请</Checkbox></td>
                    <td></td>
                </tr>
                <tr class="row7">               
                    <td><Checkbox label="1_5">公证币退款查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row7">               
                    <td><Checkbox label="1_6">发票开具查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkItem_2" @on-change="checkAllGroupChange_2">
                <tr class="row8 shenpi">     
                    <td rowspan="3" width="122"><Checkbox label="2" @click.prevent.native="handleCheckAll_2">财务审批</Checkbox></td>                          
                    <td width="176"><Checkbox label="2_1">申领水晶币审批</Checkbox></td>
                    <td width="166"></td>
                    <td width="121"></td>
                    <td width="121"></td>
                    <td width="121"><Checkbox label="2_1_3">审批</Checkbox></td>
                </tr>
                <tr class="row9">               
                    <td><Checkbox label="2_2">公证币退款审批</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Checkbox label="2_2_3">审批</Checkbox></td>
                </tr>
                <tr class="row10">               
                    <td><Checkbox label="2_3">开具发票审批</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Checkbox label="2_3_3">审批</Checkbox></td>
                </tr>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkItem_6" @on-change="checkAllGroupChange_6">
                <tr class="row23 kehuguanli"> 
                    <td width="122"><Checkbox label="6" @click.prevent.native="handleCheckAll_6">客户管理</Checkbox></td>                                                        
                    <td width="176"><Checkbox label="6_1">平台客户管理</Checkbox></td>
                    <td width="166"></td>
                    <td width="121"></td>
                    <td width="121"></td>
                    <td width="121"><Checkbox label="6_1_3">编辑</Checkbox></td>
                </tr>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkItem_3" @on-change="checkAllGroupChange_3">
                <tr class="row11 baobiao">   
                    <td rowspan="8" width="122"><Checkbox label="3" @click.prevent.native="handleCheckAll_3">财务报表</Checkbox></td>                          
                    <td width="176"><Checkbox label="3_1">财务数据统计</Checkbox></td>
                    <td width="166"></td>
                    <td width="121"></td>
                    <td width="121"></td>
                    <td width="121"></td>
                </tr>
                <tr class="row12">               
                    <td><Checkbox label="3_2">公证币充值查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row13">               
                    <td><Checkbox label="3_3">消费查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row14">               
                    <td><Checkbox label="3_4">电话录音成本查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row15">               
                    <td><Checkbox label="3_5">公证币退款查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row16">               
                    <td><Checkbox label="3_6">开票查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row17">               
                    <td><Checkbox label="3_7">水晶币赠送查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="row18">               
                    <td><Checkbox label="3_8">用户账户余额查询</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </CheckboxGroup>
                <!-- 财务账单 权限7 -->
                <CheckboxGroup v-model="checkItem_7" @on-change="checkAllGroupChange_7">
                    <tr class="row11 baobiao">
                        <td rowspan="6" width="122">
                            <Checkbox label="7" @click.prevent.native="handleCheckAll_7">财务账单</Checkbox>
                        </td>
                        <td width="176">
                            <Checkbox label="7_1">法信账单汇总</Checkbox>
                        </td>
                        <td width="166"></td>
                        <td width="121"></td>
                        <td width="121"></td>
                        <td width="121"></td>
                    </tr>
                    <tr class="row21">
                        <td>
                            <Checkbox label="7_2">公证处分成汇总</Checkbox>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="row22">               
                        <td rowspan="2"><Checkbox label="7_3">公证保管账单</Checkbox></td>
                        <td><Checkbox label="7_3_1">未结算完结账单</Checkbox></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="row22">
                        <td><Checkbox label="7_3_2">结算成功账单</Checkbox></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="row22">               
                        <td><Checkbox label="7_4">结算订单</Checkbox></td>
                        <td></td>
                        <td><Checkbox label="7_4_1">对账审核</Checkbox></td>
                        <td><Checkbox label="7_4_2">出纳初审</Checkbox></td>
                        <td><Checkbox label="7_4_3">复核汇款</Checkbox></td>
                    </tr>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkItem_5" @on-change="checkAllGroupChange_5">
                <tr class="row23 xitongxinxishezhi"> 
                    <td rowspan="2" width="122"><Checkbox label="5" @click.prevent.native="handleCheckAll_5">系统信息设置</Checkbox></td>                                                        
                    <td width="176"><Checkbox label="5_1">发票信息管理</Checkbox></td>
                    <td width="166"></td>
                    <td width="121"></td>
                    <td width="121"></td>
                    <td width="121"><Checkbox label="5_1_3">编辑</Checkbox></td>
                </tr>
                <tr class="row24">               
                    <td><Checkbox label="5_2">邮寄地址管理</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Checkbox label="5_2_3">编辑</Checkbox></td>
                </tr>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkItem_4">
                <tr class="row23 zhanghaoguanli"> 
                    <td rowspan="3" width="122"><Checkbox label="4" disabled>账号管理</Checkbox></td>                                                        
                    <td width="176"><Checkbox label="4_1" disabled>部门岗位</Checkbox></td>
                    <td width="166"></td>
                    <td width="121"></td>
                    <td width="121"><Checkbox label="4_1_2" disabled>新增</Checkbox></td>
                    <td width="121"><Checkbox label="4_1_3" disabled>编辑</Checkbox></td>
                </tr>
                <tr class="row24">               
                    <td><Checkbox label="4_2" disabled>部门账号</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td><Checkbox label="4_2_2" disabled>新增</Checkbox></td>
                    <td><Checkbox label="4_2_3" disabled>编辑</Checkbox></td>
                </tr>
                <tr class="row25">               
                    <td><Checkbox label="4_3" disabled>个人信息</Checkbox></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </CheckboxGroup>
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
            const validateDepartmentName = (rule, value, callback) => {
                // 如果没选择退款方式，提示选择
                let reg = /\s/;
                let deptName = $.trim(this.formItem.deptName)
                console.log(deptName)
                console.log(reg.test(deptName))
                if (deptName.replace(/ /g, "") == '') {
                    callback(new Error('请填写部门名称'));
                }else if (reg.test(deptName) == true) {
                    callback(new Error('格式错误'));
                }else{
                    this.$http.post('/auth/dept/validateDept.action', this.qs.stringify({
                        deptName: deptName,
                    })).then(response => {
                        console.log(response)
                        if (response.data.data == false) {
                            callback()
                        } else {
                            callback(new Error('部门已存在'))                                
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            };
            return {
                forbiddenSubmit:false,
                spinShow:true,
                formItem:{
                    deptName:'',
                },
                // menuId:'',
                ruleCustom: {
                    departmentName: [
                        { required: true, validator: validateDepartmentName, trigger: 'blur' }
                    ]
                },
                // 共有52个选框
                checkItem_1: [],
                checkItem_2: [],
                checkItem_3: [],
                checkItem_4: ['4', '4_1','4_1_2','4_1_3','4_2','4_2_2','4_2_3','4_3'],
                checkItem_5: [],
                checkItem_6: [],
                checkItem_7: [],
                checkAll_1:false,
                checkAll_2:false,
                checkAll_3:false,
                checkAll_4:false,
                checkAll_5:false,
                checkAll_6:false,
                checkAll_7:false,
            }
        },
        methods: {
            // 全选操作
            handleCheckAll_1 () {

                if (this.checkAll_1 == false) {
                    this.checkItem_1 = ['1', '1_1', '1_1_1','1_1_2','1_2','1_2_1','1_2_2','1_3','1_3_1','1_3_1_2','1_3_1_3','1_3_2','1_4','1_4_2','1_5','1_6']
                    this.checkAll_1 = true
                } else {
                    this.checkItem_1 = [];
                    this.checkAll_1 = false                    
                }
                console.log(this.checkItem_1)
            },
            handleCheckAll_2 () {
                if (this.checkAll_2 == false) {
                    this.checkItem_2 = ['2', '2_1','2_1_3','2_2','2_2_3','2_3','2_3_3']
                    this.checkAll_2 = true
                } else {
                    this.checkItem_2 = [];
                    this.checkAll_2 = false
                }
                console.log(this.checkItem_2)
                
            },
            handleCheckAll_3 () {
                if (this.checkAll_3 == false) {
                    this.checkItem_3 = ['3','3_1','3_2','3_3','3_4','3_5','3_6','3_7','3_8']
                    this.checkAll_3 = true                    
                } else {
                    this.checkItem_3 = [];
                    this.checkAll_3 = false                    
                }
                console.log(this.checkItem_3)
                
            },
            handleCheckAll_4 () {
                if (this.checkAll_4 == false) {
                    this.checkItem_4 = ['4', '4_1','4_1_2','4_1_3','4_2','4_2_2','4_2_3','4_3'];
                    this.checkAll_4 = true                    
                } else {
                    this.checkItem_4 = [];
                    this.checkAll_4 = false                    
                }
                console.log(this.checkItem_4)
                
            },
            handleCheckAll_5 () {
                if (this.checkAll_5 == false) {
                    this.checkItem_5 = ['5', '5_1','5_1_3','5_2','5_2_3'];
                    this.checkAll_5 = true                    
                } else {
                    this.checkItem_5 = [];
                    this.checkAll_5 = false                    
                }
                console.log(this.checkItem_5)
            },
            handleCheckAll_6 () {
                if (this.checkAll_6 == false) {
                    this.checkItem_6 = ['6', '6_1','6_1_3'];
                    this.checkAll_6 = true                    
                } else {
                    this.checkItem_6 = [];
                    this.checkAll_6 = false                    
                }
                console.log(this.checkItem_6)    
            },
            handleCheckAll_7 () {
                if (this.checkAll_7 == false) {
                    this.checkItem_7 = ['7', '7_1','7_2','7_3','7_3_1','7_3_2','7_4','7_4_1','7_4_2','7_4_3'];
                    this.checkAll_7 = true                    
                } else {
                    this.checkItem_7 = [];
                    this.checkAll_7 = false                    
                }
                console.log(this.checkItem_7)    
            },
            checkAllGroupChange_1(data) {
                if (data.length === 16) {
                    this.checkAll_1 = true;
                } else {
                    this.checkAll_1 = false;
                }
                console.log(this.checkItem_1)
            },
            checkAllGroupChange_2(data) {
                if (data.length === 7) {
                    this.checkAll_2 = true;
                } else {
                    this.checkAll_2 = false;
                }
                console.log(this.checkItem_2)
            },
            checkAllGroupChange_3(data) {
                if (data.length === 18) {
                    this.checkAll_3 = true;
                } else {
                    this.checkAll_3 = false;
                }
                console.log(this.checkItem_3)
            },
            checkAllGroupChange_4(data) {
                if (data.length === 8) {
                    this.checkAll_4 = true;
                } else {
                    this.checkAll_4 = false;
                }
                console.log(this.checkItem_4)
            },
            checkAllGroupChange_5(data) {
                if (data.length === 5) {
                    this.checkAll_5 = true;
                } else {
                    this.checkAll_5 = false;
                }
                console.log(this.checkItem_5)
            },
            checkAllGroupChange_6(data) {
                if (data.length === 3) {
                    this.checkAll_6 = true;
                } else {
                    this.checkAll_6 = false;
                }
                console.log(this.checkItem_6)
            },
            checkAllGroupChange_7(data) {
                if (data.length === 3) {
                    this.checkAll_7 = true;
                } else {
                    this.checkAll_7 = false;
                }
                console.log(this.checkItem_7)
            },
            // 保存权限表
            save(name){
                let checkItem = this.checkItem_1.concat(this.checkItem_2,this.checkItem_3,this.checkItem_4,this.checkItem_5,this.checkItem_6,this.checkItem_7)
                console.log(String(checkItem))

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        this.forbiddenSubmit = true
                        this.$http.post('/auth/dept/saveDept.action', this.qs.stringify({
                            deptName:$.trim(this.formItem.deptName),
                            menuIds: String(checkItem)
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '保存成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$router.push({
                                            name: 'DepartmentLimitsList'
                                        })
                                    }
                                });
                            }else{
                                console.log(response)
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
            // 返回列表页
            returnBack(){
                this.$router.push({name:'DepartmentLimitsList'})
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门权限',
                thirdNavigation: '新增',
                name: 'DepartmentLimitsList',
                second: true,
                third: true
            });
            this.spinShow = false
        },
    }
</script>

<style scoped>
table{width:100%}
table th{background:#F8F8F9;height:30px;vertical-align:middle;border:1px solid #ccc}
table td{text-align:center;height:30px;vertical-align:middle;border:1px solid #ccc}
</style>