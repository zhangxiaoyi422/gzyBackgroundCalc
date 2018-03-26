<template>
    <div class="detail-page">
        <div class="order-info" v-if="resData.settlementStatus == '-1'">
            <ul>
                <li class="li1">
                    <Icon type="information-circled" style="margin-right:10px;"></Icon>订单状态：拒绝受理</li>
                <li>订单类型：订单关闭 <span style="color:#ccc;margin-left:20px">关闭时间：{{resData.settlementCloseTime}}</span></li>
                <li>原因：{{resData.remark}}</li>
                <li>订单号：{{resData.settlementOrderNumber}}<span style="color:#ccc;margin-left:20px">创建时间：{{resData.createDateTime}}</span></li>
            </ul>
        </div>
        <div class="order-info" v-if="resData.settlementStatus == '0'">
            <ul>
                <li class="li1">
                    <Icon type="information-circled"></Icon>订单状态：撤销提现</li>
                <li>订单类型：订单关闭 <span style="color:#ccc;margin-left:20px">关闭时间：{{resData.settlementCloseTime}}</span></li>
                <li>订单号：{{resData.settlementOrderNumber}}<span style="color:#ccc;margin-left:20px">创建时间：{{resData.createDateTime}}</span></li>
            </ul>
        </div>
        <div class="order-info" v-if="resData.settlementStatus == '5'">
            <ul>
                <li class="li1">
                    <Icon type="information-circled"></Icon>订单状态：结算成功</li>
                <li>订单类型：交易成功 <span style="color:#ccc;margin-left:20px">关闭时间：{{resData.settlementCloseTime}}</span></li>
                <li>订单号：{{resData.settlementOrderNumber}}<span style="color:#ccc;margin-left:20px">创建时间：{{resData.createDateTime}}</span></li>
            </ul>
        </div>
        <div class="process-bar clearfix" v-if="resData.settlementStatus != '-1' && resData.settlementStatus != '0' && resData.settlementStatus != '5'">
            <div class="process-bar-1">
                <span style="margin-right:20px">订单号：{{resData.settlementOrderNumber}}</span>
                <span>创建时间：{{resData.createDateTime}}</span>
            </div>
            <div class="process-bar-2">
                <Steps :current="currentStep">
                    <Step title="申请提现" :content="resData.createDateTime"></Step>
                    <Step title="对账通过" :content="resData.applicationPassTime"></Step>
                    <Step title="完成开票" :content="resData.invoicedTime"></Step>
                    <Step title="初审通过" :content="resData.firstTrialTime"></Step>
                    <Step title="结算成功" :content="resData.settlementCloseTime"></Step>
                </Steps>
            </div>
        </div>
        <div class="panel-title">
            申请对象
        </div>
        <div class="panel-word">
            公证机构：{{resData.orgName}}
        </div>
        <div class="panel-title">
            账单信息
        </div>
        <div class="panel-word">
            <Table :columns="columns1" :data="tableData1" :loading="JSON.stringify(this.resData) == '{}'"></Table>
        </div>
        <div class="panel-title">
            提现信息
        </div>
        <div class="panel-word">
            <table>
                <tr>
                    <td width="10%">账户名称：</td>
                    <td width="30%">{{resData.accountName}}</td>
                    <td width="10%">开户银行：</td>
                    <td width="30%">{{resData.bankName}}</td>
                </tr>
                <tr>
                    <td>银行账号：</td>
                    <td>{{resData.bankAccount}}</td>
                    <td>付款交易流水号：</td>
                    <td>{{resData.paymentTransactionNumber}}</td>
                </tr>
                <tr>
                    <td>所属银行：</td>
                    <td>{{resData.affiliatedBank}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title" v-if="resData.settlementStatus != '-1' && resData.settlementStatus != '0' && resData.settlementStatus != '1'">
            发票信息
        </div>
        <div class="panel-word" v-if="resData.settlementStatus != '-1' && resData.settlementStatus != '0' && resData.settlementStatus != '1'">
            <Form ref="form" :model="form" :rules="ruleCustom" :label-width="0">
            <table>
                <tr>
                    <td width="10%">纳税人识别号：</td>
                    <td width="30%">{{resData.taxpayerIdentifyNumber}}</td>
                    <td width="10%">货物名称：</td>
                    <td width="30%">{{resData.productName}}</td>
                </tr>
                <tr>
                    <td>名称：</td>
                    <td>{{resData.invoiceName}}</td>
                    <td>电话号码：</td>
                    <td>{{resData.contactMobile}}</td>
                </tr>
                <tr>
                    <td>开户银行：</td>
                    <td>{{resData.invoiceBankName}}</td>
                    <td>发票类型：</td>
                    <td>
                        <span v-if="resData.invoiceType == '1'">增值税普通发票</span>
                        <span v-if="resData.invoiceType == '2'">增值税专用发票</span>
                        <span v-if="resData.invoiceType == '-'">-</span>
                    </td>
                </tr>
                <tr>
                    <td>银行账户：</td>
                    <td>{{resData.invoiceBankAccount}}</td>
                    <td>* 发票号码：</td>
                    <td v-if="resData.settlementStatus == '3'">
                        <FormItem class="formItem" prop="invoiceNumber">                     
                            <Input v-model="form.invoiceNumber" style="width: 200px" :maxlength="20"></Input>
                        </FormItem>
                    </td>
                    <td v-if="resData.settlementStatus != '3'">
                        {{resData.invoiceNumber}}
                    </td>
                </tr>
                <tr>
                    <td>单位地址：</td>
                    <td>{{resData.unitAddress}}</td>
                </tr>
            </table>
            </Form>
        </div>
        <div class="panel-title" v-if="resData.settlementStatus != '-1' && resData.settlementStatus != '0' && resData.settlementStatus != '1'">
            邮寄信息
        </div>
        <div class="panel-word" v-if="resData.settlementStatus != '-1' && resData.settlementStatus != '0' && resData.settlementStatus != '1'">
            <table>
                <tr>
                    <td width="10%">收件人：</td>
                    <td width="30%">{{resData.postalName}}</td>
                    <td width="10%">邮政编码：</td>
                    <td width="30%">{{resData.zipCode}}</td>
                </tr>
                <tr>
                    <td>邮寄地址：</td>
                    <td>{{resData.postalAddress}}</td>
                    <td>联系电话：</td>
                    <td>{{resData.phone}}</td>
                </tr>
            </table>
        </div>
        <div class="btn-wrapper" v-if="resData.settlementStatus == '1' && this.$store.state.limitList.indexOf('7_4_1') >= 0">
            <Button type="primary" @click="step1_ok">通过</Button>
            <Button type="primary" @click="step1_cancel">拒绝</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="resData.settlementStatus == '3' && this.$store.state.limitList.indexOf('7_4_2') >= 0">
            <Button type="primary" @click="step3_ok('form')">初审确认</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="resData.settlementStatus == '4' && this.$store.state.limitList.indexOf('7_4_3') >= 0">
            <Button type="primary" @click="step4_ok_online">银企直连汇款</Button>
            <Button type="primary" @click="step4_ok_offline">已线下汇款</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="this.$store.state.limitList.indexOf('7_4_1') < 0 || this.$store.state.limitList.indexOf('7_4_2') < 0 || this.$store.state.limitList.indexOf('7_4_3') < 0 || resData.settlementStatus == '5' || resData.settlementStatus == '-1' || resData.settlementStatus == '0' || resData.settlementStatus == '2'" >
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div>
            <div class="panel-title">
                日志
            </div>
            <div class="panel-word">
                <ul v-for="item in resData.operationDetails">
                    <li>{{item.operation}}</li>
                </ul>
            </div>
        </div>
        <Modal v-model="refundReasonBox" class-name="vertical-center-modal" title="退回说明" @on-cancel="refundReasonBox_cancleTop('formRefund')">
            <Form ref="formRefund" :model="formRefund" :rules="formRefundRule" class="clearfix">
                <FormItem prop="reason">
                    <Input v-model="formRefund.reason" type="textarea" :rows="4" placeholder="请输入退回订单的说明，最多100个字符" :maxlength="100"></Input>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="refundReasonBox_ok('formRefund')">确定</Button>
                <Button type="primary" @click="refundReasonBox_cancel('formRefund')">取消</Button>
            </div>
        </Modal>
        <Modal v-model="settingBillBox" title="提示" @on-cancel="settingBillBox_cancleTop">
            <div class="">
                您还未设置公证保管费的发票信息，请前往<b>“系统信息设置-发票信息管理”</b>中设置后再审批。
            </div>
            <div slot="footer">
                <Button type="primary" @click="settingBillBox_ok">立即设置</Button>
                <Button type="primary" @click="settingBillBox_cancel">稍后设置</Button>
            </div>
        </Modal>
        <Modal v-model="settingEmailBox" title="提示" @on-cancel="settingEmailBox_cancleTop">
                您还未设置公证保管费的发票邮寄地址，请前往<b>“系统信息设置-邮寄地址管理”</b>中设置后再审批。
            <div slot="footer">
                <Button type="primary" @click="settingEmailBox_ok">立即设置</Button>
                <Button type="primary" @click="settingEmailBox_cancel">稍后设置</Button>
            </div>
        </Modal>
        <Modal v-model="offlineMoney" title="汇款信息" @on-cancel="offlineMoney_cancelTop('formOfflineMoney')" class="exportExcelBox">
            <p class="tip">已同意退款，请填写以下信息。</p>
            <Form ref="formOfflineMoney" :model="formOfflineMoney" :label-width="162" :rules="formOfflineMoneyRule" class="clearfix">
                <FormItem prop="flowNum" label="付款交易流水号：">
                    <Input v-model="formOfflineMoney.flowNum" placeholder="支持数字、英文（不区分大小写），不支持空格，不超过30个字符" style="width:278px" :maxlength="30"></Input>
                </FormItem>
                <FormItem prop="remark" label="备注：">
                    <Input v-model="formOfflineMoney.remark" placeholder="不超过60个字" style="width:278px" :maxlength="60"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="offlineMoney_ok('formOfflineMoney')">确定</Button>
                <Button type="primary" @click="offlineMoney_cancel('formOfflineMoney')">稍后填写</Button>
            </div>
        </Modal>
        <!-- 银企直连汇款 弹窗 -->
        <Modal v-model="onlineMoney" title="汇款确认" @on-cancel="onlineMoney_cancel" class="exportExcelBox">
            <Form :label-width="162" class="clearfix">
                <FormItem prop="flowNum" label="账户余额：">
                    <span v-if="notEnough" style="color:red">{{onlineMoneyData.balance}}  元</span>
                    <span v-if="!notEnough">{{onlineMoneyData.balance}}  元</span>
                </FormItem>
                <FormItem prop="remark" label="汇款金额：">
                    {{onlineMoneyData.orgPercentMoney}}  元
                </FormItem>
                <FormItem prop="remark" label="账户名称：">
                    {{onlineMoneyData.accountName}}
                </FormItem>
                <FormItem prop="remark" label="银行账号：">
                    {{onlineMoneyData.bankAccount}}
                </FormItem>
                <FormItem prop="remark" label="开户银行：">
                    {{onlineMoneyData.bankName}}
                </FormItem>
                <p style="color:red;text-align:center" v-if="notEnough">请确保银企直连的账户余额充足再汇款。</p>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="onlineMoney_ok" v-if="!notEnough">汇款</Button>
                <Button type="primary" @click="onlineMoney_cancel" v-if="!notEnough">取消</Button>
                <Button type="primary" @click="onlineMoney_iknow" v-if="notEnough">我知道了</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateReason = (rule, value, callback) => {
                if (this.formRefund.reason.replace(/ /g, "") == '') {
                    callback(new Error('请输入退回说明'))
                }
                if (this.formRefund.reason.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()                                  
            }
            const validateFlowNum = (rule, value, callback) => {
                if (this.formOfflineMoney.flowNum.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.formOfflineMoney.flowNum.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                let reg = /^[0-9a-zA-Z]+$/
                if (reg.test(this.formOfflineMoney.flowNum) == false) {
                    callback(new Error('格式错误'));
                }
                callback()                                  
            }
            const validateRemark = (rule, value, callback) => {
                if (this.formOfflineMoney.remark.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.formOfflineMoney.remark.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()                                  
            }
            const validateInvoiceNumber = (rule, value, callback) => {
                if (this.form.invoiceNumber.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9a-zA-Z]+$/
                if (reg.test(this.form.invoiceNumber) == false) {
                    callback(new Error('格式错误'));
                }
                callback()                                  
            }
            return {
                onlineMoney:false,
                onlineMoneyData:{},
                notEnough:false,
                ruleCustom: {
                    invoiceNumber: [
                        { required: true, validator: validateInvoiceNumber, trigger: 'blur' }
                    ],
                },
                form:{
                    invoiceNumber: '',
                },
                offlineMoney:false,
                settingBillBox:false,
                settingEmailBox:false,
                // 退款说明弹窗
                refundReasonBox:false,
                formRefund: {
                    reason: '',
                },
                formRefundRule: {
                    reason: [
                        { validator: validateReason, trigger: 'blur' }
                    ]
                },
                formOfflineMoney: {
                    flowNum: '',
                    remark: '',
                },
                formOfflineMoneyRule: {
                    flowNum: [
                        { validator: validateFlowNum, trigger: 'blur' }
                    ],
                    remark: [
                        { validator: validateRemark, trigger: 'blur' }
                    ],
                },
                showReturnBtn:true,
                currentStep:0,
                resData:{},
                // 表格
                columns1: [
                    {
                        title: '序号',
                        key: 'number',
                        align: 'center',
                    },
                    {
                        title: '账单时间',
                        key: 'monthTime',
                        align: 'center',
                    },
                    {
                        title: '结算笔数',
                        key: 'orgPercentCount',
                        align: 'center',
                        
                    },
                    {
                        title: '公证保管实收公证币数（币）',
                        key: 'orgPercentToken',
                        align: 'center',
                    },
                    {
                        title: '公证保管费结算金额（元）',
                        key: 'orgPercentMoney',
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
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'TallyOrderDetailBillDetail',
                                                params: {
                                                    orgName: this.resData.orgName,
                                                    monthTime: params.row.monthTime,
                                                    id: this.$route.params.userId
                                                }
                                            })
                                        }
                                    }
                                }, '账单明细'),
                            ]);
                        }
                    }
                ],
                tableData1: []
            }
        },
        methods: {
            // 获取表格数据
            getData() {
                this.$http.post('/settlement/ajax/applicationDetail.action', this.qs.stringify({
                    id: this.$route.params.userId,
                })).then(response => {
                    if (response.data.code == 200) {
                        console.log(response)
                        this.resData =  response.data.data
                        this.form.invoiceNumber =  this.resData.invoiceNumber

                        if(this.resData.settlementStatus == '-1'){
                            
                        }else if(this.resData.settlementStatus == '0'){
                                                        
                        }else if(this.resData.settlementStatus == '1'){
                            // 申请待受理
                            this.currentStep = 0
                            this.showReturnBtn = false
                        }else if(this.resData.settlementStatus == '2'){
                            this.currentStep = 1
                        }else if(this.resData.settlementStatus == '3'){
                            this.currentStep = 2
                        }else if(this.resData.settlementStatus == '4'){
                            this.currentStep = 3
                        }else if(this.resData.settlementStatus == '5'){
                            // this.currentStep = 4
                        }
                        this.tableData1 = response.data.data.list 
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            // 通过按钮
            step1_ok(){
                this.$http.post('/settlement/ajax/isDefaultMessage.action', this.qs.stringify({
                    id: this.resData.id,
                })).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        this.$Modal.confirm({
                            title: '提示',
                            content: '<p>确定账单无误？</p>',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                this.$http.post('/settlement/ajax/applicationPass.action', this.qs.stringify({
                                    id: this.resData.id,
                                })).then(response => {
                                    console.log(response)
                                    if (response.data.code == 200) {
                                        if($('.ivu-message-notice-content').length == 0){
                                            this.$Message.success({
                                                content: "提交成功",
                                                duration: 1,
                                                onClose: () => {
                                                    this.getData()
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
                    }else if(response.data.code == 10001){
                        if(response.data.errorMsg == ' 发票信息管理数据未设置'){
                            this.settingBillBox = true
                        }else if(response.data.errorMsg == ' 地址管理数据未设置'){
                            this.settingEmailBox = true
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            // 设置 发票信息管理-确定按钮
            settingBillBox_ok(){
                this.$router.push({
                    name: 'BillingMan'
                })
            },
            // 设置 发票信息管理-取消按钮
            settingBillBox_cancel(){
                this.settingBillBox = false
            },
            // 设置 发票信息管理-取消按钮X
            settingBillBox_cancleTop(){
                this.settingBillBox = false
            },
            // 设置 邮寄地址管理-确定按钮
            settingEmailBox_ok(){
                this.$router.push({
                    name: 'EmailAddressMan'
                })
            },
            // 设置 邮寄地址管理-取消按钮
            settingEmailBox_cancel(){
                this.settingEmailBox = false
            },
            // 设置 邮寄地址管理-取消按钮X
            settingEmailBox_cancleTop(){
                this.settingEmailBox = false
            },
            // 拒绝按钮
            step1_cancel(){
                this.$http.post('/settlement/ajax/isDefaultMessage.action', this.qs.stringify({
                    id: this.resData.id,
                })).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        this.refundReasonBox = true  
                    }else if(response.data.code == 10001){
                        if(response.data.errorMsg == ' 发票信息管理数据未设置'){
                            this.settingBillBox = true
                        }else if(response.data.errorMsg == ' 地址管理数据未设置'){
                            this.settingEmailBox = true
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            // 初审确认-确定按钮
            step3_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Modal.confirm({
                            title: '提示',
                            content: '<p>确定已收到发票，且所有信息无误？</p>',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                this.$http.post('/settlement/ajax/firstTrial.action', this.qs.stringify({
                                    id: this.resData.id,
                                    invoiceNumber: this.form.invoiceNumber,
                                })).then(response => {
                                    console.log(response)
                                    if (response.data.code == 200) {
                                        if($('.ivu-message-notice-content').length == 0){
                                            this.$Message.success({
                                                content: "提交成功",
                                                duration: 1,
                                                onClose: () => {
                                                    this.getData()
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
                    }
                })
            },
            // 已线下汇款-确定按钮
            step4_ok_offline(){
                this.offlineMoney = true
            },
            // 汇款弹窗-确定
            offlineMoney_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/settlement/ajax/toBeCompound.action', this.qs.stringify({
                            id: this.resData.id,
                            number: this.formOfflineMoney.flowNum,
                            remark: this.formOfflineMoney.remark
                        })).then(response => {
                            console.log(response)
                            if (response.data.code == 200) {
                                this.$Message.success({
                                    content: '汇款成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$refs[name].resetFields()
                                        this.offlineMoney = false
                                        this.getData()
                                    }
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                })
            },
            // 汇款弹窗-稍后填写
            offlineMoney_cancel(name){
                this.offlineMoney = false
                this.$refs[name].resetFields()
            },
            // 汇款弹窗-右上角X
            offlineMoney_cancelTop(name){
                this.offlineMoney = false
                this.$refs[name].resetFields()
            },
            // 银企直连汇款
            step4_ok_online(){
                this.$http.post('/settlement/ajax/toBankDirectConfirm.action', this.qs.stringify({
                    id: this.$route.params.userId
                })).then(response => {
                    console.log(response)
                    this.onlineMoneyData = response.data.data
                    // 账户余额比转账金额少
                    if(this.onlineMoneyData.balance < this.onlineMoneyData.orgPercentMoney){
                        this.notEnough = true
                    }
                    this.onlineMoney = true
                }).catch(error => {
                    console.log(error)
                })
            },
            // 银企直连汇款 - 确认按钮
            onlineMoney_ok(){
                this.$http.post('/settlement/ajax/toBankDirectRemittance.action', this.qs.stringify({
                    id: this.$route.params.userId
                })).then(response => {
                    console.log(response)
                    // this.onlineMoney = true
                }).catch(error => {
                    console.log(error)
                })
            },
            // 银企直连汇款 - 取消按钮
            onlineMoney_cancel(){
                this.onlineMoney = false
            },
            // 银企直连汇款 - 我知道了按钮
            onlineMoney_iknow(){
                this.onlineMoney = false
            },
            // 退款说明-确定按钮
            refundReasonBox_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('/settlement/ajax/applicationUnPass.action', this.qs.stringify({
                            id: this.resData.id,
                            refundReason: this.formRefund.reason
                        })).then(response => {
                            console.log(response)
                            if (response.data.code == 200) {
                                this.$Message.success({
                                    content: '提交成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$refs[name].resetFields()
                                        this.refundReasonBox = false
                                        this.getData()
                                    }
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                })
            },
            // 退款说明-取消按钮
            refundReasonBox_cancel(name){
                this.refundReasonBox = false
                this.$refs[name].resetFields()
            },
            // 退款说明-取消按钮X
            refundReasonBox_cancleTop(name){
                this.refundReasonBox = false 
                this.$refs[name].resetFields()
            },
            // 返回列表
            returnToList() {
                this.$router.push({
                    name: 'TallyOrder'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '结算订单',
                thirdNavigation: '详情',
                name: 'TallyOrder',
                second: true,
                third: true,
            });
            this.getData()
        },
    }
</script>

<style scoped>
</style>

