<template>
    <div>
        <div class="fun-tool">新增/修改发票信息：</div>
        <Form ref="form" :model="form" :rules="ruleCustom" label-position="right" :label-width="120">
            <FormItem label="纳税人识别号：" prop="input1">
                <Input v-model="form.input1" style="width:260px" placeholder="数字、字母（区分大小写），不超过20个字" :maxlength="20"></Input>
            </FormItem>
            <FormItem label="名称：" prop="input2">
                <Input v-model="form.input2" style="width:260px" placeholder="不支持空格，不超过60个字符" :maxlength="60"></Input>
            </FormItem>
            <FormItem label="开户银行：" prop="input3">
                <Input v-model="form.input3" style="width:260px" placeholder="请输入开户银行，具体到支行名称" :maxlength="60"></Input>
            </FormItem>
            <FormItem label="银行账户：" prop="input4">
                <Input v-model="form.input4" style="width:260px" placeholder="请输入银行卡账号" :maxlength="20"></Input>
            </FormItem>
            <FormItem label="单位地址：" prop="unitAddress">
                <Input v-model="form.unitAddress" style="width:260px" placeholder="输入单位地址" :maxlength="60"></Input>
            </FormItem>
            <FormItem label="电话号码：" prop="contactMobile">
                <Input v-model="form.contactMobile" style="width:260px" placeholder="输入联系电话或手机号" :maxlength="20"></Input>
            </FormItem>
            <FormItem label="货物名称：" prop="input5">
                <Input v-model="form.input5" style="width:260px" placeholder="输入开票货物名称" :maxlength="60"></Input>
            </FormItem>
            <Checkbox v-model="form.setDefaultBillingInfo">设为默认发票信息</Checkbox>
        </Form>    
        <div class="btn-wrapper"> 
            <Button type="primary" @click="save('form')">保存</Button>
        </div>
        <div class="fun-tool border-top" v-if="resData.totalCount">
            已保存了 {{resData.totalCount}} 条发票信息
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
    </div>
</template>

<script>
    export default {
        data() {
            const validateInput1 = (rule, value, callback) => {
                if (this.form.input1.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9a-zA-Z]+$/
                if (reg.test(this.form.input1) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateInput2 = (rule, value, callback) => {
                if (this.form.input2.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.input2.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateInput3 = (rule, value, callback) => {
                if (this.form.input3.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.input3.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateInput4 = (rule, value, callback) => {
                if (this.form.input4.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9]*$/
                if (reg.test(this.form.input4) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateUnitAddress = (rule, value, callback) => {
                if (this.form.unitAddress.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.unitAddress.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateContactMobile = (rule, value, callback) => {
                if (this.form.contactMobile.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9]*$/
                if (reg.test(this.form.contactMobile) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateInput5 = (rule, value, callback) => {
                if (this.form.input5.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.input5.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            return {
                ruleCustom: {
                    input1: [
                        { required: true, validator: validateInput1, trigger: 'blur' }
                    ],
                    input2: [
                        { required: true, validator: validateInput2, trigger: 'blur' }
                    ],
                    input3: [
                        { required: true, validator: validateInput3, trigger: 'blur' }
                    ],
                    input4: [
                        { required: true, validator: validateInput4, trigger: 'blur' }
                    ],
                    unitAddress: [
                        { required: true, validator: validateUnitAddress, trigger: 'blur' }
                    ],
                    contactMobile: [
                        { required: true, validator: validateContactMobile, trigger: 'blur' }
                    ],
                    input5: [
                        { required: true, validator: validateInput5, trigger: 'blur' }
                    ],
                },
                loading:false,
                resData:{},
                form:{
                    input1:'',
                    input2:'',
                    input3:'',
                    input4:'',
                    unitAddress:'',
                    contactMobile:'',
                    input5:'',
                    setDefaultBillingInfo:false,
                    invoiceInfoId:''
                },
                columns1: [
                    {
                        title: '纳税人识别号',
                        key: 'taxpayerIdentifyNumber',
                        align: 'center',
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '开户银行',
                        key: 'bankName',
                        align: 'center',
                    },
                    {
                        title: '银行账户',
                        key: 'bankAccount',
                        align: 'center',
                    },
                    {
                        title: '单位地址',
                        key: 'unitAddress',
                        align: 'center',
                    },
                    {
                        title: '电话号码',
                        key: 'contactMobile',
                        align: 'center',
                    },
                    {
                        title: '货物名称',
                        key: 'productName',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        width : 160,
                        align: 'center',
                        render: (h, params) => {
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
                                            this.modify(params.row.taxpayerIdentifyNumber,params.row.name,params.row.bankName,params.row.bankAccount,params.row.unitAddress,params.row.contactMobile,params.row.productName,params.row.isDefault,params.row.invoiceInfoId)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.invoiceInfoId)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    },
                    {
                        title: ' ',
                        key: 'isDefault',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.isDefault) {
                            // case '0':
                            //     return h('span', '非默认');break
                            case '1':
                                return h('span', '默认');break
                            }
                        }
                    },
                ],
                tableData1: []
            }
        },
        methods:{
            save(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.get('/invoice/ajax/saveOrUpdateInvoiceInfoManager.action', {params:{
                            invoiceInfoId: this.form.invoiceInfoId,
                            taxpayerIdentifyNumber: this.form.input1,
                            name: this.form.input2,
                            bankName: this.form.input3,
                            bankAccount: this.form.input4,
                            unitAddress: this.form.unitAddress,
                            contactMobile: this.form.contactMobile,
                            productName: this.form.input5,
                            isDefault: this.form.setDefaultBillingInfo
                        }}).then(response => {
                            if (response.status == 200) { 
                                if($('.ivu-message-notice-content').length == 0){
                                    this.$Message.success({
                                        content: "保存成功",
                                        duration: 1,
                                        onClose: () => {
                                            this.form.input1 = ''
                                            this.form.input2 = ''
                                            this.form.input3 = ''
                                            this.form.input4 = ''
                                            this.form.unitAddress = ''
                                            this.form.contactMobile = ''
                                            this.form.input5 = ''
                                            this.form.setDefaultBillingInfo = false
                                            this.form.invoiceInfoId = ''
                                            this.getTableDate()
                                        }
                                    });
                                }       
                            }
                        }).catch(error => {
                            console.log(error);
                        }) 
                    }
                })
            },
            // 修改
            modify(taxpayerIdentifyNumber,name,bankName,bankAccount,unitAddress,contactMobile,productName,isDefault,invoiceInfoId){
                this.form.input1 = taxpayerIdentifyNumber
                this.form.input2 = name
                this.form.input3 = bankName
                this.form.input4 = bankAccount
                this.form.unitAddress = unitAddress
                this.form.contactMobile = contactMobile
                this.form.input5 = productName
                if(isDefault == '0'){
                    isDefault = false
                }else{
                    isDefault = true
                }
                this.form.setDefaultBillingInfo = isDefault
                this.form.invoiceInfoId = invoiceInfoId
                this.$refs['form'].validate()
            },
            // 删除
            delete(invoiceInfoId){
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p>确定删除该发票信息？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.get('/invoice/ajax/delInvoiceInfoManager.action', {params:{
                            invoiceInfoId: invoiceInfoId,
                        }}).then(response => {
                            console.log(response)
                            if (response.data.code == 200) {
                                if($('.ivu-message-notice-content').length == 0){
                                    this.$Message.success({
                                        content: "删除成功",
                                        duration: 1,
                                        onClose: () => {
                                            if(invoiceInfoId == this.form.invoiceInfoId){
                                                this.form.input1 = ''
                                                this.form.input2 = ''
                                                this.form.input3 = ''
                                                this.form.input4 = ''
                                                this.form.unitAddress = ''
                                                this.form.contactMobile = ''
                                                this.form.input5 = ''
                                                this.form.invoiceInfoId = ''
                                                this.form.setDefaultBillingInfo = false
                                            }
                                            this.getTableDate()
                                        }
                                    })
                                }
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    },
                    onCancel: () => {}
                })
            },
            // 获得所有发票信息
            getTableDate(){
                this.$http.get('/invoice/ajax/findAllInvoiceInfos.action').then(response => {
                    if (response.data.code == 200) {
                        console.log(response)
                        this.resData =  response.data.data
                        this.tableData1 = response.data.data.list
                        this.totalCount = Number(response.data.data.totalCount)
                    }
                }).catch(error => {
                    console.log(error);
                })       
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '系统信息设置',
                subNavigation: '发票信息管理',
                name: 'BillingMan',
                second: true,
            });
            // 表格初始化，显示第一页
            this.getTableDate()
        },
    }
</script>

<style scoped>
</style>