<template>
    <div class="refund-query relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="clearfix" :label-width="100">
            <input type='text' style='display:none'/>
            <FormItem prop="userAccount" label="用户名：">
                <Input v-model="formItem.userAccount" placeholder="数字或英文（区分大小写），最多18个字符" style="width:260px" :maxlength="18"></Input>
            </FormItem>
            <FormItem prop="realName" label="姓名：">
                <Input v-model="formItem.realName" placeholder="最多18个字符，字母区分大小写" style="width:260px" :maxlength="18"></Input>
            </FormItem>
            <FormItem label="密码：">
                <Input v-model="formItem.userPassword" style="width:260px" type="password" disabled></Input>
                <span style="margin-left:20px;display:inline-block">（初始密码为111111）</span>
            </FormItem>
            <FormItem prop="telephone" label="手机号码：">
                <Input v-model="formItem.telephone" style="width:260px" :maxlength="11"></Input>
            </FormItem>
            <FormItem prop="deptName" label="所属部门：">
                <Select v-model="formItem.model2" style="width:260px;" @on-change="handleDeptChange" v-if="showDeptSelect">
                        <Option v-for="item in formItem.deptName" :value="item.value" :key="item.value" style="width: 260px">{{ item.label }}</Option>
                    </Select> {{deptName}}
            </FormItem>
            <FormItem prop="postName" label="岗位名称：">
                <Select v-model="formItem.model1" style="width:260px;">
                        <Option v-for="item in formItem.postName" :value="item.value" :key="item.value" style="width: 260px">{{ item.label }}</Option>
                    </Select>
                    <span v-if="showAddPostTip" style="color:red;margin-left:10px;">请前往“部门岗位”页面新增岗位</span>
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
                            <td rowspan="9" width="122">
                                <Checkbox label="1" v-if="showItem.show1" :disabled="!showItem.show1" @click.prevent.native="handleCheckAll_1">运营管理</Checkbox>
                            </td>
                            <td rowspan="2" width="176">
                                <Checkbox label="1_1" v-if="showItem.show1_1" :disabled="!showItem.show1_1">服务收费配置</Checkbox>
                            </td>
                            <td width="166">
                                <Checkbox label="1_1_1" v-if="showItem.show1_1_1" :disabled="!showItem.show1_1_1">支付方式</Checkbox>
                            </td>
                            <td width="121">&nbsp;</td>
                            <td width="121">&nbsp;</td>
                            <td width="121">&nbsp;</td>
                        </tr>
                        <tr class="row2">
                            <td>
                                <Checkbox label="1_1_2" v-if="showItem.show1_1_2">充值数量</Checkbox>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr class="row3">
                            <td rowspan="2">
                                <Checkbox label="1_2" v-if="showItem.show1_2">服务收费配置</Checkbox>
                            </td>
                            <td>
                                <Checkbox label="1_2_1" v-if="showItem.show1_2_1">收费组合配置</Checkbox>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr class="row4">
                            <td>
                                <Checkbox label="1_2_2" v-if="showItem.show1_2_2">公证机构收费</Checkbox>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr class="row5">
                            <td rowspan="2">
                                <Checkbox label="1_3" v-if="showItem.show1_3">体验赠送水晶币</Checkbox>
                            </td>
                            <td>
                                <Checkbox label="1_3_1" v-if="showItem.show1_3_1">体验赠送</Checkbox>
                            </td>
                            <td>
                            </td>
                            <td>
                                <Checkbox label="1_3_1_2" v-if="showItem.show1_3_1_2">申请</Checkbox>
                            </td>
                            <td>
                                <Checkbox label="1_3_1_3" v-if="showItem.show1_3_1_3">审批</Checkbox>
                            </td>
                        </tr>
                        <tr class="row6">
                            <td>
                                <Checkbox label="1_3_2" v-if="showItem.show1_3_2">赠送水晶币余额</Checkbox>
                            </td>
                            <td>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row7">
                            <td>
                                <Checkbox label="1_4" v-if="showItem.show1_4">申领水晶币申请</Checkbox>
                            </td>
                            <td></td>
                            <td>
                            </td>
                            <td>
                                <Checkbox label="1_4_2" v-if="showItem.show1_4_2">申请</Checkbox>
                            </td>
                            <td></td>
                        </tr>
                        <tr class="row7">               
                            <td><Checkbox label="1_5" v-if="showItem.show1_5">公证币退款查询</Checkbox></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row7">               
                            <td><Checkbox label="1_6" v-if="showItem.show1_6">发票开具查询</Checkbox></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="checkItem_2" @on-change="checkAllGroupChange_2">
                        <tr class="row8 shenpi">
                            <td rowspan="3" width="122">
                                <Checkbox label="2" @click.prevent.native="handleCheckAll_2"  v-if="showItem.show2">财务审批</Checkbox>
                            </td>
                            <td width="176">
                                <Checkbox label="2_1" v-if="showItem.show2_1">申领水晶币审批</Checkbox>
                            </td>
                            <td width="166"></td>
                            <td width="121">
                            </td>
                            <td width="121"></td>
                            <td width="121">
                                <Checkbox label="2_1_3" v-if="showItem.show2_1_3">审批</Checkbox>
                            </td>
                        </tr>
                        <tr class="row9">
                            <td>
                                <Checkbox label="2_2" v-if="showItem.show2_2">公证币退款审批</Checkbox>
                            </td>
                            <td></td>
                            <td>
                            </td>
                            <td></td>
                            <td>
                                <Checkbox label="2_2_3" v-if="showItem.show2_2_3">审批</Checkbox>
                            </td>
                        </tr>
                        <tr class="row10">
                            <td>
                                <Checkbox label="2_3" v-if="showItem.show2_3">开具发票审批</Checkbox>
                            </td>
                            <td></td>
                            <td>
                            </td>
                            <td></td>
                            <td>
                                <Checkbox label="2_3_3" v-if="showItem.show2_3_3">审批</Checkbox>
                            </td>
                        </tr>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="checkItem_6" @on-change="checkAllGroupChange_6">
                    <tr class="row23 kehuguanli"> 
                        <td width="122"><Checkbox label="6" @click.prevent.native="handleCheckAll_6" v-if="showItem.show6">客户管理</Checkbox></td>                                                        
                        <td width="176"><Checkbox label="6_1" v-if="showItem.show6_1">平台客户管理</Checkbox></td>
                        <td width="166"></td>
                        <td width="121"></td>
                        <td width="121"></td>
                        <td width="121"><Checkbox label="6_1_3" v-if="showItem.show6_1_3">编辑</Checkbox></td>
                    </tr>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="checkItem_3" @on-change="checkAllGroupChange_3">
                        <tr class="row11 baobiao">
                            <td rowspan="13" width="122">
                                <Checkbox label="3" @click.prevent.native="handleCheckAll_3" v-if="showItem.show3">财务报表</Checkbox>
                            </td>
                            <td width="176">
                                <Checkbox label="3_1" v-if="showItem.show3_1">财务数据统计</Checkbox>
                            </td>
                            <td width="166"></td>
                            <td width="121"></td>
                            <td width="121"></td>
                            <td width="121"></td>
                        </tr>
                        <tr class="row12">
                            <td>
                                <Checkbox label="3_2" v-if="showItem.show3_2">公证币充值查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row13">
                            <td>
                                <Checkbox label="3_3" v-if="showItem.show3_3">消费查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row14">
                            <td>
                                <Checkbox label="3_4" v-if="showItem.show3_4">电话录音成本查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row15">
                            <td>
                                <Checkbox label="3_5" v-if="showItem.show3_5">公证币退款查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row16">
                            <td>
                                <Checkbox label="3_6" v-if="showItem.show3_6">开票查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row17">
                            <td>
                                <Checkbox label="3_7" v-if="showItem.show3_7">水晶币赠送查询</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row18">
                            <td>
                                <Checkbox label="3_8" v-if="showItem.show3_8">用户账户余额查询</Checkbox>
                            </td>
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
                                <Checkbox label="7" @click.prevent.native="handleCheckAll_7" v-if="showItem.show7">财务账单</Checkbox>
                            </td>
                            <td width="176">
                                <Checkbox label="7_1" v-if="showItem.show7_1">法信账单汇总</Checkbox>
                            </td>
                            <td width="166"></td>
                            <td width="121"></td>
                            <td width="121"></td>
                            <td width="121"></td>
                        </tr>
                        <tr class="row21">
                            <td>
                                <Checkbox label="7_2" v-if="showItem.show7_2">公证处分成汇总</Checkbox>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row22">               
                            <td rowspan="2"><Checkbox label="7_3" v-if="showItem.show7_3">公证保管账单</Checkbox></td>
                            <td><Checkbox label="7_3_1" v-if="showItem.show7_3_1">未结算完结账单</Checkbox></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row22">
                            <td><Checkbox label="7_3_2" v-if="showItem.show7_3_2">结算成功账单</Checkbox></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="row22">               
                            <td><Checkbox label="7_4" v-if="showItem.show7_4">结算订单</Checkbox></td>
                            <td></td>
                            <td><Checkbox label="7_4_1" v-if="showItem.show7_4_1">对账审核</Checkbox></td>
                            <td><Checkbox label="7_4_2" v-if="showItem.show7_4_2">出纳初审</Checkbox></td>
                            <td><Checkbox label="7_4_3" v-if="showItem.show7_4_3">复核汇款</Checkbox></td>
                        </tr>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="checkItem_5" @on-change="checkAllGroupChange_5">
                    <tr class="row23 xitongxinxishezhi"> 
                        <td rowspan="2" width="122"><Checkbox label="5" @click.prevent.native="handleCheckAll_5" v-if="showItem.show5">系统信息设置</Checkbox></td>                                                        
                        <td width="176"><Checkbox label="5_1" v-if="showItem.show5_1">发票信息管理</Checkbox></td>
                        <td width="166"></td>
                        <td width="121"></td>
                        <td width="121"></td>
                        <td width="121"><Checkbox label="5_1_3" v-if="showItem.show5_1_3">编辑</Checkbox></td>
                    </tr>
                    <tr class="row24">               
                        <td><Checkbox label="5_2" v-if="showItem.show5_2">邮寄地址管理</Checkbox></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Checkbox label="5_2_3" v-if="showItem.show5_2_3">编辑</Checkbox></td>
                    </tr>
                    </CheckboxGroup>
                    <CheckboxGroup v-model="checkItem_4" @on-change="checkAllGroupChange_4">
                        <tr class="row23 zhanghaoguanli">
                            <td rowspan="3" width="122">
                                <Checkbox label="4" @click.prevent.native="handleCheckAll_4" v-if="showItem.show4">账号管理</Checkbox>
                            </td>
                            <td width="176">
                                <Checkbox label="4_1" v-if="showItem.show4_1">部门岗位</Checkbox>
                            </td>
                            <td width="166"></td>
                            <td width="121">
                            </td>
                            <td width="121">
                                <Checkbox label="4_1_2" v-if="showItem.show4_1_2">新增</Checkbox>
                            </td>
                            <td width="121">
                                <Checkbox label="4_1_3" v-if="showItem.show4_1_3">编辑</Checkbox>
                            </td>
                        </tr>
                        <tr class="row24">
                            <td>
                                <Checkbox label="4_2" v-if="showItem.show4_2">部门账号</Checkbox>
                            </td>
                            <td></td>
                            <td>
                            </td>
                            <td>
                                <Checkbox label="4_2_2" v-if="showItem.show4_2_2">新增</Checkbox>
                            </td>
                            <td>
                                <Checkbox label="4_2_3" v-if="showItem.show4_2_3">编辑</Checkbox>
                            </td>
                        </tr>
                        <tr class="row25">
                            <td>
                                <Checkbox label="4_3" disabled v-if="showItem.show4_3">个人信息</Checkbox>
                            </td>
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
            const validateUserAccount = (rule, value, callback) => {
                let reg = /^[a-zA-Z0-9]+$/
                let userAccount = $.trim(this.formItem.userAccount)
                if (userAccount.replace(/ /g, '') == '') {
                    callback(new Error('请填写'));
                } else if (reg.test(userAccount) == false) {
                    callback(new Error('格式错误'));
                } else {
                    this.$http.post('/auth/user/validateUser.action', this.qs.stringify({
                        userAccount: userAccount,
                    })).then(response => {
                        // console.log(response)
                        if (response.data.data == false) {
                            callback()
                        } else {
                            callback(new Error('该用户名已被使用'))
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            };
            const validateRealName = (rule, value, callback) => {
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/                
                let realName = $.trim(this.formItem.realName)
                if (realName.replace(/ /g, '') == '') {
                    callback(new Error('请填写'));
                } else if (reg.test(realName) == false) {
                    callback(new Error('格式错误'));
                } else {
                    callback()
                }
            };
            const validateTelephone = (rule, value, callback) => {
                let reg = /^1\d{10}$/
                let telephone = $.trim(this.formItem.telephone)                
                if (telephone.replace(/ /g, '') == '') {
                    callback(new Error('请填写'));
                }else if (reg.test(telephone) == false) {
                    callback(new Error('手机号码格式错误'));
                } else {
                    callback()
                }
            };
            const validateDeptName = (rule, value, callback) => {
                if (this.formItem.model2 == '') {
                    callback(new Error('请选择'));
                } else {
                    callback()
                }
            };
            const validatePostName = (rule, value, callback) => {
                if (this.formItem.model1 == '') {
                    callback(new Error('请选择'));
                } else {
                    callback()
                }
            };
            return {
                showAddPostTip:false,
                forbiddenSubmit:false,
                spinShow:true,
                // 显示部门下拉框
                showDeptSelect: false,
                formItem: {
                    userAccount: '',
                    userPassword: '111111',
                    realName: '',
                    telephone: '',
                    // 为“所属部门”对应下的岗位名称。
                    postName: [
                        // {
                        //     value: '1',
                        //     label: '会计'
                        // },
                    ],
                    // 默认显示请选择                    
                    model1: '',
                    // 超级管理员admin登录显示数据库里全部部门名称，有操作权限的某部门人员登录显示当前登录人员所在的部门，且不可切换
                    deptName: [
                        // {
                        //     value: '1',
                        //     label: '会计'
                        // },
                    ],
                    // 默认显示请选择
                    model2: ''
                },
                // 校验项
                ruleCustom: {
                    userAccount: [{
                        required: true,
                        validator: validateUserAccount,
                        trigger: 'blur'
                    }],
                    realName: [{
                        required: true,
                        validator: validateRealName,
                        trigger: 'blur'
                    }],
                    telephone: [{
                        required: true,
                        validator: validateTelephone,
                        trigger: 'blur'
                    }],
                    deptName: [{
                        required: true,
                        validator: validateDeptName,
                        trigger: 'change'
                    }],
                    postName: [{
                        required: true,
                        validator: validatePostName,
                        trigger: 'change'
                    }]
                },
                // 共有52个选框
                checkItem_1: [],
                checkItem_2: [],
                checkItem_3: [],
                checkItem_4: ['4','4_3'],
                checkItem_5: [],
                checkItem_6: [],
                checkItem_7: [],
                checkAll_1: false,
                checkAll_2: false,
                checkAll_3: false,
                checkAll_4: false,
                checkAll_5: false,
                checkAll_6: false,
                checkAll_7: false,
                optionalItem_1:[],
                optionalItem_2:[],
                optionalItem_3:[],
                optionalItem_4:[],
                optionalItem_5:[],
                optionalItem_6:[],
                optionalItem_7:[],
                showItem: {
                    show1: false,
                    show1_1: false,
                    show1_1_1: false,
                    show1_1_2: false,
                    show1_2: false,
                    show1_2_1: false,
                    show1_2_2: false,
                    show1_3: false,
                    show1_3_1: false,
                    show1_3_1_2: false,
                    show1_3_1_3: false,
                    show1_3_2: false,
                    show1_4: false,
                    show1_4_2: false,
                    show1_5: false,
                    show1_6: false,
                    show2: false,
                    show2_1: false,
                    show2_1_3: false,
                    show2_2: false,
                    show2_2_3: false,
                    show2_3: false,
                    show2_3_3: false,
                    show3: false,
                    show3_1: false,
                    show3_2: false,
                    show3_3: false,
                    show3_4: false,
                    show3_5: false,
                    show3_6: false,
                    show3_7: false,
                    show3_8: false,
                    show7: false,
                    show7_1: false,
                    show7_2: false,
                    show7_3: false,
                    show7_3_1: false,
                    show7_3_2: false,
                    show7_4: false,
                    show7_4_1: false,
                    show7_4_2: false,
                    show7_4_3: false,
                    show4: false,
                    show4_1: false,
                    show4_1_2: false,
                    show4_1_3: false,
                    show4_2: false,
                    show4_2_2: false,
                    show4_2_3: false,
                    show4_3: false,
                    show5: false,
                    show5_1: false,
                    show5_1_3: false,
                    show5_2: false,
                    show5_2_3: false,
                    show6: false,
                    show6_1: false,
                    show6_1_3: false,
                }
            }
        },
        computed: {
            deptName() {
                return this.$store.state.userInfo.deptName
            },
            deptId() {
                return this.$store.state.userInfo.deptId
            },
            parentId() {
                return this.$store.state.userInfo.id
            },
        },
        methods: {
            // 全选操作
            handleCheckAll_1() {
                if (this.checkAll_1 == false) {
                    this.checkItem_1 = this.optionalItem_1
                    this.checkAll_1 = true
                } else {
                    this.checkItem_1 = [];
                    this.checkAll_1 = false
                }
                console.log(this.checkItem_1)
            },
            handleCheckAll_2() {
                if (this.checkAll_2 == false) {
                    this.checkItem_2 = this.optionalItem_2
                    this.checkAll_2 = true
                } else {
                    this.checkItem_2 = [];
                    this.checkAll_2 = false
                }
                console.log(this.checkItem_2)
            },
            handleCheckAll_3() {
                if (this.checkAll_3 == false) {
                    this.checkItem_3 = this.optionalItem_3
                    this.checkAll_3 = true
                } else {
                    this.checkItem_3 = [];
                    this.checkAll_3 = false
                }
                console.log(this.checkItem_3)
            },
            handleCheckAll_4() {
                if (this.checkAll_4 == false) {
                    this.checkItem_4 = this.optionalItem_4
                    this.checkAll_4 = true
                } else {
                    this.checkItem_4 = ['4','4_3'];
                    this.checkAll_4 = false
                }
                console.log(this.checkItem_4)
            },
            handleCheckAll_5() {
                if (this.checkAll_5 == false) {
                    this.checkItem_5 = this.optionalItem_5
                    this.checkAll_5 = true
                } else {
                    this.checkItem_5 = [];
                    this.checkAll_5 = false
                }
                console.log(this.checkItem_5)
            },
            handleCheckAll_6() {
                if (this.checkAll_6 == false) {
                    this.checkItem_6 = this.optionalItem_6
                    this.checkAll_6 = true
                } else {
                    this.checkItem_6 = [];
                    this.checkAll_6 = false
                }
                console.log(this.checkItem_6)
            },
            handleCheckAll_7() {
                if (this.checkAll_7 == false) {
                    this.checkItem_7 = this.optionalItem_7
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
                if (data.length === 9) {
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
                if (data.length === 10) {
                    this.checkAll_7 = true;
                } else {
                    this.checkAll_7 = false;
                }
                console.log(this.checkItem_7)
            },
            // 保存账号
            save(name) {
                // console.log(this.formItem.userAccount)
                // console.log($.trim(this.formItem.userAccount))
                let checkItem = this.checkItem_1.concat(this.checkItem_2,this.checkItem_3, this.checkItem_4,this.checkItem_5,this.checkItem_6,this.checkItem_7)
                // console.log(String(checkItem))
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        this.forbiddenSubmit = true
                        this.$http.post('/auth/user/addUser.action', this.qs.stringify({
                            userAccount: $.trim(this.formItem.userAccount),
                            userPassword: this.formItem.userPassword,
                            realName: $.trim(this.formItem.realName),
                            telephone: $.trim(this.formItem.telephone),
                            postId: this.formItem.model1,
                            parentId: this.parentId,
                            menuIds: String(checkItem)
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '保存成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$router.push({
                                            name: 'AccountList'
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
                            this.$Message.error({
                                content: '操作失败',
                                duration: 1,
                                onClose: () => {
                                    this.forbiddenSubmit = false
                                }
                            });
                            console.log(error);
                        })
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 获取部门下已有岗位列表
            getPostList() {
                this.$http.post('/auth/post/getPostListByDept.action', this.qs.stringify({
                    deptId: this.formItem.model2,
                })).then(response => {
                    if (response.data.status == 0) {
                        let _this = this
                        $.each(response.data.data, function(key, val) {
                            _this.formItem.postName.push({
                                'value': val.postId,
                                'label': val.postName
                            })
                        })
                    }else{
                        console.log(response)
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                    }
                }).catch(error => {
                    // this.$Message.error({
                    //     content: '加载部门岗位列表失败',
                    //     duration: 1,
                    // });
                    console.log(error);
                })
            },
            // 获取全部部门
            getDeptList() {
                this.$http.post('/auth/dept/getAllList.action').then(response => {
                    if (response.data.status == 0) {
                        let _this = this
                        $.each(response.data.data, function(key, val) {
                            _this.formItem.deptName.push({
                                'value': val.deptId,
                                'label': val.deptName
                            })
                        })
                        this.spinShow = false
                    }else{
                        console.log(response)
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 部门下拉菜单切换，更改所选部门下的职位
            handleDeptChange() {
                // console.log(this.formItem.model2)
                this.$http.post('/auth/post/getPostListByDept.action', this.qs.stringify({
                    deptId: this.formItem.model2
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        let _this = this;
                        this.formItem.postName = [];
                        // 如果部门岗位为空，弹框提示
                        if(response.data.data == null){
                            // this.$Message.info({
                            //     content: '请前往“部门岗位”页面新增岗位',
                            //     duration: 3,
                            // });
                            this.showAddPostTip = true
                        }else{
                            this.showAddPostTip = false
                            
                            $.each(response.data.data, function(key, val) {
                                _this.formItem.postName.push({
                                    'value': val.postId,
                                    'label': val.postName
                                })
                            })
                        }
                        
                    }else{
                        console.log(response)
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                    }   
                }).catch(error => {
                    console.log(error);
                })
                this.getLimitList()
            },
            // 获取部门权限表
            getLimitList() {
                // console.log(this.$route.params.deptId)
                this.$http.post('/auth/dept/getDeptDetail.action', this.qs.stringify({
                    deptId: this.$store.state.userInfo.admin?this.formItem.model2:this.deptId,
                })).then(response => {
                    if (response.data.status == 0) {
                        console.log(response);
                        this.formItem.input = response.data.data.deptName
                        this.oldDeptName = response.data.data.deptName
                        let array = response.data.data.menuIds.split(","); // 在每个逗号(,)处进行分解。
                        console.log(array)
                        // 可供选择的checkbox
                        this.checkItem_1 = [],
                        this.checkItem_2 = [],
                        this.checkItem_3 = [],
                        this.checkItem_4 = ['4','4_3'],
                        this.checkItem_5 = [],
                        this.checkItem_6 = [],
                        this.checkItem_7 = [],
                        this.optionalItem_1 = []
                        this.optionalItem_2 = []
                        this.optionalItem_3 = []
                        this.optionalItem_4 = []
                        this.optionalItem_5 = []
                        this.optionalItem_6 = []
                        this.optionalItem_7 = []
                        for(let i = 0;i < array.length;i++){
                            if(array[i].substring(0,1) == '1'){                                
                                this.optionalItem_1.push(array[i])
                            }else if(array[i].substring(0,1) == '2'){
                                this.optionalItem_2.push(array[i])
                            }else if(array[i].substring(0,1) == '3'){
                                this.optionalItem_3.push(array[i])
                            }else if(array[i].substring(0,1) == '4'){
                                this.optionalItem_4.push(array[i])
                            }else if(array[i].substring(0,1) == '5'){
                                this.optionalItem_5.push(array[i])
                            }else if(array[i].substring(0,1) == '6'){
                                this.optionalItem_6.push(array[i])
                            }else if(array[i].substring(0,1) == '7'){
                                this.optionalItem_7.push(array[i])
                            }
                        }
                        for (let key in this.showItem) {
                            this.showItem[key] = false
                        }
                        for (let i = 0; i < array.length; i++) {

                            array[i] = 'show' + array[i]

                            // 开始遍历对象 
                            for (let key in this.showItem) { 
                                if (key == array[i]) {
                                    this.showItem[key] = true
                                    console.log(this.showItem[key])
                                }    
                            } 
                        }
                        this.spinShow = false
                    }else{
                        console.log(response)
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                    } 
                }).catch(error => {
                    console.log(error);
                })
            },
            // 返回账户列表页
            returnBack() {
                this.$router.push({
                    name: 'AccountList'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门账号',
                thirdNavigation: '新增',
                name: 'AccountList',
                second: true,
                third: true
            });
            // admin显示部门下拉框    
            if (this.$store.state.userInfo.admin == true) {
                this.showDeptSelect = true
                this.getDeptList()
            } else {
                // 不是超级管理员则设置deptId为登录用户deptId
                this.formItem.model2 = this.$store.state.userInfo.deptId
                this.getPostList()
                this.getLimitList()
            }
        },
    }
</script>

<style scoped>
    table {
        width: 100%
    }
    table th {
        background: #F8F8F9;
        height: 30px;
        vertical-align: middle;
        border: 1px solid #ccc
    }
    table td {
        text-align: center;
        height: 30px;
        vertical-align: middle;
        border: 1px solid #ccc
    }
</style>