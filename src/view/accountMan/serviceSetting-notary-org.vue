<template>
    <div>
        <div class="search-area clearfix">
            <Form :model="formItem1">
                <input type='text' style='display:none'/>
                <ul class="ul">
                    <li class="li">
                        <label>关键字：</label>
                        <Input v-model="formItem1.chargeItemName" placeholder="公证机构/收费项目名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                    </li>
                    <li class="li">
                        <label>是否收费：</label>
                        <Select v-model="formItem1.model1" style="width:200px">
                            <Option v-for="item in formItem1.collectFee" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li class="li">
                        <label>收费项目状态：</label>
                        <Select v-model="formItem1.model2" style="width:200px">
                            <Option v-for="item in formItem1.state" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading"></Table>
        <Page :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current"  v-if="showPage"></Page>
        <Modal v-model="modal2" title="公证机构收费设置" @on-cancel="setting_cancleTop">
            <Form ref="settingForm" :model="settingFormData" :rules="settingForm" class="clearfix">
                <FormItem prop="orgCharge">
                    <div style="height:300px;overflow-y:auto;overflow-x:hidden">
                        <Table ref="settingRowTable" highlight-row :columns="columns2" :data="tableData2" @on-current-change="settingTableChange"></Table>
                    </div>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="setting_ok('settingForm')" :disabled="forbiddenSubmit">确定</Button>
                <Button type="primary" @click="setting_cancle">关闭</Button>
            </div>
        </Modal>
        <Modal v-model="modal3" title="修改公证机构收费设置" @on-cancel="modify_cancleTop">
            <Form ref="modifyForm" :model="modifyFormData" :rules="modifyForm" class="clearfix">
                <Radio v-model="modifyFormData.cancleCharge" style="margin-bottom:15px" @click.native="chooseCancleCharge">取消公证机构收费</Radio>
                <FormItem prop="orgCharge">
                    <div style="height:300px;overflow-y:auto;overflow-x:hidden">
                        <Table ref="modifyRowTable" highlight-row :columns="columns2" :data="tableData2" @on-current-change="modifyTableChange"></Table>
                    </div>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="modify_ok('modifyForm')" :disabled="forbiddenSubmit">确定</Button>
                <Button type="primary" @click="modify_cancle">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateOrgCharge = (rule, value, callback) => {
                // 如果没选择，提示选择
                console.log("-------------")
                console.log(this.settingFormData.parameterValue)
                console.log("-------------")
                if(this.settingFormData.parameterValue == ''){
                    callback(new Error('请选择'));
                }
                callback()
            };
            const validateOrgCharge2 = (rule, value, callback) => {
                // 如果没选择，提示选择
                if(this.modifyFormData.cancleCharge == false){
                    if(this.modifyFormData.parameterValue == ''){
                        callback(new Error('请选择'));
                    }
                    callback()
                }else{
                    callback()                    
                }
            };
            return {
                // 是否显示分页，默认显示
                forbiddenSubmit:false,
                showPage: true,
                modal2:false,
                settingForm: {
                    orgCharge: [
                        { validator: validateOrgCharge, trigger: 'blur',required: true, }
                    ]
                },
                settingFormData: {
                    parameterOrgCode:'',
                    parameterOrgName:'',
                    parameterValue:''
                },
                modal3:false,
                modifyForm: {
                    orgCharge: [
                        { validator: validateOrgCharge2, trigger: 'blur',required: true, }
                    ]
                },
                modifyFormData: {
                    cancleCharge:false,
                    parameterOrgCode:'',
                    parameterOrgName:'',
                    parameterValue:''
                },
                columns2:[
                    {
                        title: '收费项目编号',
                        key: 'chargeNum',
                        align: 'center',
                    },
                    {
                        title: '收费项目名称',
                        key: 'chargeName',
                        align: 'center',
                    },
                    {
                        title: '收费项目类型',
                        key: 'chargeType',
                        align: 'center',
                    },
                    {
                        title: '收费项目状态',
                        key: 'state',
                        align: 'center',
                    }
                ],
                tableData2:[],
                loading:true,
                current:1,
                pageNow:1,
                formItem1: {
                    chargeItemName: '',
                    collectFee: [{
                            value: '0',
                            label: '全部'
                        },
                        {
                            value: 'ON',
                            label: '是'
                        },
                        {
                            value: 'OFF',
                            label: '否'
                        },
                    ],
                    model1: '0',
                    state: [{
                            value: '0',
                            label: '全部'
                        },
                        {
                            value: '1',
                            label: '关闭'
                        },
                        {
                            value: '2',
                            label: '开启'
                        },
                    ],
                    model2: '0',
                },
                columns1: [{
                        title: '公证机构',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '是否收费',
                        key: 'collectFee',
                        align: 'center',
                    },
                    {
                        title: '收费项目编号',
                        key: 'chargeNum',
                        align: 'center',
                    },
                    {
                        title: '收费项目名称',
                        key: 'chargeName',
                        align: 'center',
                    },
                    {
                        title: '收费项目状态',
                        key: 'state',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.collectFee == '否') {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.setting(params.row.orgId,params.row.orgName)
                                            }
                                        }
                                    }, '设置'),
                                ]);
                            } else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'ServiceSettingNotaryDetail',
                                                    params:{
                                                        chargeId:params.row.chargeId,
                                                        orgName:params.row.orgName
                                                    }
                                                })
                                            }
                                        }
                                    }, '详情'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modify(params.row.orgId,params.row.orgName,params.row.chargeNum,params.row.chargeId)
                                            }
                                        }
                                    }, '修改'),
                                ]);
                            }
                        }
                    }
                ],
                totalCount:0,
                tableData1: [],
            };
        },
        methods: {
            // 设置
            
            setting(orgId,orgName) {
                console.log('parameterValue ' + this.settingFormData.parameterValue)
                
                this.modal2 = true
                this.settingFormData.parameterOrgCode = orgId
                this.settingFormData.parameterOrgName = orgName
                this.$http.post('/charge/project/getChargeOrgAllList.action').then(response => {
                    // console.log(response)
                    if (response.data.status == 0) {
                        let data = response.data.data
                        $.each(data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                        })
                        this.tableData2 = data;
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 设置-确定
            setting_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        this.forbiddenSubmit = true
                        console.log('parameterOrgCode ' + this.settingFormData.parameterOrgName)
                        console.log('parameterValue ' + this.settingFormData.parameterValue)
                        this.$http.post('/parameter/org/setParameterProject.action',this.qs.stringify({
                            parameterOrgCode:this.settingFormData.parameterOrgCode,
                            parameterOrgName:this.settingFormData.parameterOrgName,
                            parameterValue:this.settingFormData.parameterValue
                        })).then(response => {
                            // if(){
                            //     this.$Message.success({
                            //         content: '请选择一个',
                            //         duration: 1,
                            //         onClose: () => {
                            //             this.forbiddenSubmit = false
                            //         }
                            //     });
                            // }else{

                            // }
                            // console.log(this.settingFormData.parameterValue )
                            this.$refs.settingRowTable.clearCurrentRow();
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '设置成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.modal2 = false
                                        this.getTableDate(this.pageNow)
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false
                                    }
                                });
                                console.log(response)
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
            // 修改
            modify(orgId,orgName,chargeNum,chargeId) {
                this.modal3 = true
                this.modifyFormData.parameterOrgCode = orgId
                this.modifyFormData.parameterOrgName = orgName
                this.modifyFormData.parameterValue = chargeId
                // this.settingFormData.parameterValue = chargeId
                this.$http.post('/charge/project/getChargeOrgAllList.action').then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        let data = response.data.data
                        let _this = this
                        $.each(data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                            if (chargeNum == val.chargeNum) {
                                val._highlight = true;
                            }
                        })
                        this.tableData2 = data;
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 修改-确定
            modify_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        this.forbiddenSubmit = true
                        console.log(this.modifyFormData.parameterValue)
                        this.$http.post('/parameter/org/editParameterProject.action',this.qs.stringify({
                            parameterOrgCode:this.modifyFormData.parameterOrgCode,
                            parameterOrgName:this.modifyFormData.parameterOrgName,
                            parameterValue:this.modifyFormData.parameterValue
                        })).then(response => {
                            console.log(response)
                            this.$refs.modifyRowTable.clearCurrentRow();
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '设置成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.modal3 = false
                                        this.getTableDate(this.pageNow)
                                        this.forbiddenSubmit = false
                                        this.modifyFormData.cancleCharge = false                
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false               
                                    }
                                });
                                console.log(response)
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
            settingTableChange(currentRow){
                console.log('tablechange')
                if(currentRow){
                    this.settingFormData.parameterValue = currentRow.chargeId

                }else{
                    this.settingFormData.parameterValue = ''                  
                }
                // console.log(this.settingFormData.parameterValue)
            },
            modifyTableChange(currentRow){
                if(currentRow){
                    if(this.modifyFormData.cancleCharge == true){
                        // this.$refs.modifyRowTable.clearCurrentRow();
                        this.modifyFormData.cancleCharge = false
                        this.modifyFormData.parameterValue = currentRow.chargeId                       
                    }else{
                        this.modifyFormData.parameterValue = currentRow.chargeId
                    }
                }else{
                    this.modifyFormData.parameterValue = ''
                }
            },
            // 设置-取消
            setting_cancle(){
                this.$refs.settingRowTable.clearCurrentRow();
                this.$refs['settingForm'].resetFields();
                this.modal2 = false
            },
            // 设置-取消X
            setting_cancleTop(){
                this.$refs.settingRowTable.clearCurrentRow(); 
                this.$refs['settingForm'].resetFields();                            
                this.modal2 = false
            },
            // 修改-取消
            modify_cancle(){
                this.$refs.modifyRowTable.clearCurrentRow();
                this.$refs['modifyForm'].resetFields();
                this.modifyFormData.cancleCharge = false
                this.modal3 = false
            },
            // 修改-取消X
            modify_cancleTop(){
                this.$refs.modifyRowTable.clearCurrentRow();
                this.$refs['modifyForm'].resetFields();
                this.modifyFormData.cancleCharge = false
                this.modal3 = false
            },
            // 选择取消公证机构收费单选框
            chooseCancleCharge(){
                console.log(111)
                this.$refs.modifyRowTable.clearCurrentRow();
            },
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.pageNow = page
                this.$http.post('/parameter/org/getOrgProjectList.action', this.qs.stringify({
                    pageNo: page,
                    pageSize: 15,
                    content: this.formItem1.chargeItemName,
                    collectFee:this.formItem1.model1,
                    state: this.formItem1.model2
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        let data = response.data.data.list
                        $.each(data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                            if (val.collectFee == 'ON') {
                                val.collectFee = '是';
                            } else if (val.collectFee == 'OFF') {
                                val.collectFee = '否';
                            }
                        })
                        this.tableData1 = data;
                        this.totalCount = response.data.data.totalCount
                        this.loading = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '服务收费配置',
                thirdNavigation: '公证机构收费配置',
                fourthNavigation:'按公证机构显示',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingNotary',
                // thirdName: 'serviceSettingNotaryOrg',
                second: true,
                third: true,
                fourth:true,
                forthTab:'ServiceSettingNotaryOrg'
            })
            this.getTableDate(1)
        }
    }
</script>

<style scoped>

</style>