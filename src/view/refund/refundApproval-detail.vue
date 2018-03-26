<template>
    <div class="refundQuery-detail detail-page relative">
        <form action="" method="post" id="form"></form>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="order-info">
            <ul>
                <li class="li1">
                    <Icon type="information-circled"></Icon>{{resData.status}}</li>
                <li>订单号：{{resData.orderNum}}</li>
                <li>创建时间：{{resData.createDate}}</li>
            </ul>
        </div>
        <div class="panel-title">
            公证币退款用户
        </div>
        <div class="panel-word">
            <table v-if="type1">
                <tr>
                    <td>用户名：</td>
                    <td>{{resData.userAccount}}</td>
                    <td>注册来源：</td>
                    <td>{{resData.registerResource}}</td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td>{{resData.realName}}</td>
                    <td>手机号码：</td>
                    <td>{{resData.mobile}}</td>
                </tr>
                <tr>
                    <td>证件类型：</td>
                    <td>{{resData.userIdType}}</td>
                    <td>证件号码：</td>
                    <td>{{resData.userCard}}</td>
                </tr>
                <tr>
                    <td>是否实名：</td>
                    <td>{{resData.isRealName}}</td>
                </tr>
            </table>
            <table v-if="type2">
                <tr>
                    <td>用户名：</td>
                    <td>{{resData.userAccount}}</td>
                    <td>注册来源：</td>
                    <td>{{resData.registerResource}}</td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td>{{resData.realName}}</td>
                    <td>手机号码：</td>
                    <td>{{resData.mobile}}</td>
                </tr>
                <tr>
                    <td>证件类型：</td>
                    <td>{{resData.userIdType}}</td>
                    <td>证件号码：</td>
                    <td>{{resData.userCard}}</td>
                </tr>
                <tr>
                    <td>是否实名：</td>
                    <td>{{resData.isRealName}}</td>
                    <td>实名方式：</td>
                    <td>{{resData.realNameType}}</td>
                </tr>
                <tr>
                    <td>身份证号码：</td>
                    <td>{{resData.idCard}}</td>
                </tr>
            </table>
            <table v-if="type3">
                <tr>
                    <td>用户名：</td>
                    <td>{{resData.userAccount}}</td>
                    <td>注册来源：</td>
                    <td>{{resData.registerResource}}</td>
                </tr>
                <tr>
                    <td>{{bussinessName}}：</td>
                    <td>{{resData.unitName}}</td>
                    <td>邮箱：</td>
                    <td>{{resData.email}}</td>
                </tr>
                <tr>
                    <td>营业执照注册号：</td>
                    <td>{{resData.businessNum}}</td>
                    <td>是否实名：</td>
                    <td>{{resData.isRealName}}</td>
                </tr>
                <tr>
                    <td>联系人：</td>
                    <td>{{resData.realName}}</td>
                    <td>手机号码：</td>
                    <td>{{resData.mobile}}</td>
                </tr>
            </table>
            <table v-if="type4">
                <tr>
                    <td>用户名：</td>
                    <td>{{resData.userAccount}}</td>
                    <td>注册来源：</td>
                    <td>{{resData.registerResource}}</td>
                </tr>
                <tr>
                    <td>企业名称：</td>
                    <td>{{resData.unitName}}</td>
                    <td>邮箱：</td>
                    <td>{{resData.email}}</td>
                </tr>
                <tr>
                    <td>营业执照注册号：</td>
                    <td>{{resData.businessNum}}</td>
                    <td>是否实名：</td>
                    <td>{{resData.isRealName}}</td>
                </tr>
                <tr>
                    <td>实名方式：</td>
                    <td>{{resData.realNameType}}</td>
                    <td>对公账号：</td>
                    <td>{{resData.publicAccount}}</td>
                </tr>
                <tr>
                    <td>联系人：</td>
                    <td>{{resData.realName}}</td>
                    <td>手机号码：</td>
                    <td>{{resData.mobile}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title">
            退款信息
        </div>
        <div class="panel-word clearfix">
            <ul>
                <!-- <li><label>退款账户：</label>{{resData.refundBankName}} &nbsp;&nbsp;&nbsp;&nbsp;{{perOrBus}}{{resData.refundBankAccount}} {{resData.isRealBank}}</li> -->
                <li><label>退款账户：</label>{{resData.refundAccount}}</li>
                <li><label>退款金额：</label>{{resData.money}} 元 &nbsp;&nbsp;&nbsp;&nbsp;相应冻结公证币{{resData.gzbMoney}}</li>
                <li><label>退款说明：</label>{{resData.refundReason}}</li>
                <li><label style="float:left">上传凭证：</label>
                    <ul style="float:left" >
                        <template v-for="item in resData_all.fileList">
                            <li @click="showImg(item.name,item.path)" style="cursor:pointer">{{item.name}}</li>
                        </template>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="panel-title">
            用户充值记录
        </div>
        <div class="panel-word clearfix">
            <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px"></Table>
            <div class="btn-wrapper">
                <a href="javascript:;" style="color:#333" @click="seeMore">查看更多记录</a>
            </div>
        </div>
        <div class="panel-title">
            审批结果
        </div>
        <div class="panel-word">
            <ul>
                <li><label>审批人员：</label>{{resData.auditUser}}</li>
                <li><label>审批部门：</label>{{resData.auditDepartment}}</li>
                <li><label>部门岗位：</label>{{resData.station}}</li>
                <li><label>审批意见：</label>{{approveAdvice}}</li>
                <li v-if="showApprovalRemark"><label style="float:left;width:70px;">建议说明：</label><span style="float:left;width:calc(100% - 70px)">{{resData.remark}}</span></li>
                <li v-if="showApprovalTime" class="clear"><label>审批时间：</label>{{resData.auditDate}}</li>
            </ul>
        </div>
        <div class="panel-title" v-if="refundResult">
            退款结果
        </div>
        <div class="panel-word" v-if="refundResult">
            <ul>
                <li>{{resData.status}}</li>
                <li><label>退款方式：</label>{{resData.refundType}}</li>
                <li><label>流水号：</label>{{resData.refundNum}}</li>
            </ul>
        </div>
        <div v-if="showOperationDetails">
            <div class="panel-title">
                日志
            </div>
            <div class="panel-word">
                <ul v-for="item in operationDetails">
                    <li>{{item.operation}}</li>
                </ul>
            </div>
        </div>
        <div class="btn-wrapper" v-if="returnBtn">
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="agreeBtn">
            <Button type="primary" @click="agreePopBox">同意</Button>
            <Button type="primary" @click="notAgreePopBox">不同意</Button>
        </div>
        <div class="btn-wrapper" v-if="confirmRefundBtn">
            <Button type="primary" @click="fillInfoPopBox">确定已退款</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <Modal v-model="modal2" title="退款信息" @on-cancel="fillInfoPopBox_cancleTop">
            <p class="tip">已同意退款，请填写以下信息。</p>
            <Form ref="formItem" :model="formItem" :label-width="162" :rules="ruleCustom" class="clearfix">
                <div class="popbox1-word">
                    <FormItem prop="payType" label="退款方式：">
                        <div class="popbox1-word-item">
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="支付宝">支付宝</Radio>
                            </RadioGroup>
                        </div>
                        <div class="popbox1-word-item">
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="银行转账">银行转账</Radio>
                            </RadioGroup>，
                            <Select v-model="formItem.select" style="width:190px">
                                <Option value="建设银行">建设银行</Option>
                            </Select>
                        </div>
                        <div class="popbox1-word-item">
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="其他" style="margin-right:0;width:15px"></Radio>
                            </RadioGroup>
                            <Input v-model="formItem.input1" placeholder="其他，最多30个字符" style="width:260px" :maxlength="30"></Input>
                        </div>
                    </FormItem>
                </div>
                <div class="popbox1-word">
                    <FormItem prop="flowNum" label="流水号：">
                        <Input v-model="formItem.input2" placeholder="其他，最多30个字符" style="width:278px" :maxlength="30"></Input>
                    </FormItem>
                </div>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="fillInfoPopBox_ok('formItem')">确定</Button>
                <Button type="primary" @click="fillInfoPopBox_cancle">稍后填写</Button>
            </div>
        </Modal>
        <Modal v-model="modal3" title="建议说明" @on-cancel="notAgreePopBox_cancleTop('formItem2')">
            <Form ref="formItem2" :model="formItem2" :rules="ruleCustom2" class="clearfix">
                <FormItem prop="advice">
                    <Input v-model="formItem2.input" type="textarea" :rows="4" placeholder="请输入不同意说明，最多100个字符" :maxlength="100"></Input>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="notAgreePopBox_ok('formItem2')">确定</Button>
                <Button type="primary" @click="notAgreePopBox_cancle('formItem2')">取消</Button>
            </div>
        </Modal>
        <Modal v-model="showImgBox" title="图片预览"  class-name="vertical-center-modal">
            <img :src="'/api/file/viewArchive.action?filePath=' + filePath " style="width: 100%">
            <div slot="footer">
            </div>
        </Modal>
        <Modal v-model="seeMoreBox" title="充值记录"  class-name="vertical-center-modal">
            <p>
                列表显示最近30天的充值记录，更多充值记录请前往“财务报表-公证币充值查询”
            </p>
            <div style="height:350px;;overflow-y:auto;overflow-x:hidden">
                <Table :columns="columns1" :data="tableData2" :show-header="true" style="margin-top:10px"></Table>            
            </div>
            <div slot="footer">
                <Button type="primary" @click="seeMoreBox_ok">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        computed: {
            basePath_download(){
                return this.$store.state.basePath + 'file/download.action'
            },
            basePath_preview(){
                return this.$store.state.basePath + 'file/viewArchive.action'
            },
        },
        data() {
            const validatePayType = (rule, value, callback) => {
                // 如果没选择退款方式，提示选择
                let reg = /\s/;
                let input1 = $.trim(this.formItem.input1)                
                if (this.formItem.radio == '') {
                    callback(new Error('请选择'));
                }
                if (this.formItem.radio == '支付宝') {
                    this.type = "支付宝";
                    callback();
                } else if (this.formItem.radio == '银行转账') {
                    this.type = this.formItem.select;
                    callback();
                } else if (this.formItem.radio == '其他') {
                    if (input1.replace(/ /g, "") == '') {
                        callback(new Error('请填写退款方式'));
                    }
                    this.type = input1;
                    callback();
                }
            };
            const validateFlowNum = (rule, value, callback) => {
                let input2 = $.trim(this.formItem.input2)
                let reg = /\s/;
                if (input2 == '') {
                    callback(new Error('请输入'));
                } else if (input2.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback();
            };
            const validateAdvice = (rule, value, callback) => {
                if (this.formItem2.input.replace(/ /g, "") == '') {
                    callback(new Error('请输入说明')); 
                }else{
                    callback();                     
                }
                    callback();                     
            };
            return {
                seeMoreBox:false,
                columns1:[
                    {
                        title: '充值时间',
                        key: 'rechargeTime',
                        align: 'center',
                    },
                    {
                        title: '充值订单号',
                        key: 'orderSequence',
                        align: 'center',
                    },
                    {
                        title: '充值金额',
                        key: 'money',
                        align: 'center',
                    },
                ],
                tableData1:[],
                tableData2:[],
                // 日志显示
                showOperationDetails:true,
                operationDetails:[],
                spinShow: true,
                // 同意不同意按钮
                agreeBtn:false,
                // 返回按钮
                returnBtn:false,
                // 确定已退款按钮
                confirmRefundBtn:false,
                // 弹窗
                modal2: false,
                modal3: false,
                formItem: {
                    input1: '',
                    input2: '',
                    select: '建设银行',
                    radio: ''
                },
                formItem2: {
                    input: ''
                },
                //未实名认证的个人用户
                type1: false,
                //已通过银联实名认证的个人用户
                type2: false,
                //未实名认证的机构用户
                type3: false,
                //已通过小额打款实名认证的企业用户
                type4: false,
                // 读取url中的参数
                userId: this.$route.params.userId,
                bussinessName: '',
                // 个人或企业
                perOrBus: '',
                // 退款结果显示
                refundResult: false,
                // 审批结果 建议说明显示隐藏
                showApprovalRemark:false,
                showApprovalTime:false,
                type: '',
                // 审批意见 同意或不同意
                approveAdvice:'',
                resData: {},
                resData_all:{},
                ruleCustom: {
                    payType: [
                        { validator: validatePayType, trigger: 'blur' }
                    ],
                    flowNum: [
                        { validator: validateFlowNum, trigger: 'blur' }
                    ],
                },
                ruleCustom2: {
                    advice: [
                        { validator: validateAdvice, trigger: 'blur' }
                    ]
                },
                showImgBox:false,
                filePath:''
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务审批',
                subNavigation: '公证币退款审批',
                thirdNavigation: '详情',
                name: 'RefundApproval',
                second: true,
                third: true
            });
            this.getDate();
            console.log(this.$store.state.limitList);
        },
        methods: {
            // 获取订单数据
            getDate(){
                this.$http.post('/refund/getRefundDetail.action', this.qs.stringify({
                    id: this.userId,
                })).then(response => {
                    console.log(response)
                    this.resData = response.data.data.userRefundMap
                    this.resData_all = response.data.data
                    this.tableData1 = response.data.data.rechargeList.slice(0,2)
                    this.tableData2 = response.data.data.rechargeList
                    if (this.resData.status == 1) {
                        this.resData.status = '处理中'; 
                        this.showApprovalRemark = false,                                                 
                        this.showApprovalTime = false,                        
                        this.approveAdvice = '';
                        // this.returnBtn = false;
                        
                        // this.confirmRefundBtn = false; 
                        if (this.$store.state.limitList.indexOf("2_2_3") >= 0) {
                            this.agreeBtn = true;
                        } else {
                            this.returnBtn = true;
                        }
                    } else if (this.resData.status == 2) {
                        this.resData.status = '退款完成';
                        this.approveAdvice = '同意'; 
                        this.showApprovalRemark = false,                                                 
                        this.showApprovalTime = true,                      
                        this.refundResult = true;
                        this.returnBtn = true;
                        this.agreeBtn = false;
                        this.confirmRefundBtn = false;                        
                    } else if (this.resData.status == 3) {
                        this.resData.status = '退款失败';
                        this.approveAdvice = '不同意';
                        this.showApprovalRemark = true,                                              
                        this.showApprovalTime = true,                                              
                        this.refundResult = false;
                        this.returnBtn = true;
                        this.agreeBtn = false;
                        this.confirmRefundBtn = false; 
                        // 已同意未填写退款信息（稍后填写）
                    } else if (this.resData.status == 4) {
                        this.resData.status = '处理中';
                        this.approveAdvice = '同意'; 
                        this.showApprovalRemark = false,                                              
                        this.showApprovalTime = true,                                               
                        this.refundResult = false;
                        // this.returnBtn = false;
                        // this.agreeBtn = false;
                        if (this.$store.state.limitList.indexOf("2_2_3") >= 0) {
                            this.confirmRefundBtn = true; 
                        } else {
                            this.returnBtn = true;
                        }
                    }
                    if (this.resData.isRealBank == 0) {
                        this.resData.isRealBank = '（已通过实名认证）';
                    } else if (this.resData.isRealBank == 1) {
                        this.resData.isRealBank = '';
                    }
                    if (this.resData.businessType == 1) {
                        this.bussinessName = '企业名称';
                    } else if (this.resData.businessType == 2) {
                        this.bussinessName = '政府全称';
                    }
                    // 未实名认证的个人用户
                    if (this.resData.isRealName == '否' && this.resData.userType == 2) {
                        this.type1 = true;
                        //已通过银联实名认证的个人用户
                    } else if (this.resData.isRealName == '是' && this.resData.userType == 2 && this.resData.realNameType == '银联') {
                        this.type2 = true;
                        //未实名认证的机构用户
                    } else if (this.resData.isRealName == '否' && this.resData.userType == 4) {
                        this.type3 = true;
                        //已通过小额打款实名认证的企业用户 
                    } else if (this.resData.isRealName == '是' && this.resData.userType == 4 && this.resData.businessType == 1 && this.resData.realNameType == '小额打款') {
                        this.type4 = true;
                    }
                    if (this.resData.userType == 2) {
                        this.perOrBus = '银行卡：';
                    } else if (this.resData.userType == 4) {
                        this.perOrBus = '对公账户：';
                    }
                    if (response.data.data.operationDetails.length > 0) {
                        this.operationDetails = response.data.data.operationDetails;
                        this.showOperationDetails = true;
                    }
                    this.spinShow = false
                });
            },
            // 返回公证币退款审批列表
            returnToList() {
                this.$router.push({
                    name: 'RefundApproval'
                })
            },
            // 同意退款申请弹窗
            agreePopBox() {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定同意？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        
                        this.$http.post('/refund/agreeOperate.action', this.qs.stringify({
                            id: this.userId,
                        })).then(response => {
                            // console.log(response)
                            if (response.data.status == 0) {
                                
                                this.$Message.success({
                                    content: '操作成功',
                                    duration: 0.5,
                                    onClose: () => {
                                        this.fillInfoPopBox()
                                        this.resData.status = '处理中';
                                        this.approveAdvice = '同意'; 
                                        this.showApprovalRemark = false,                                              
                                        this.showApprovalTime = true,                                               
                                        this.refundResult = false;
                                        this.returnBtn = false;
                                        this.agreeBtn = false;
                                        this.confirmRefundBtn = true; 
                                        this.resData.auditDate = response.data.data.auditDate;
                                        this.getDate()
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    },
                    onCancel: () => {}
                });
            },
            // 填写退款信息弹窗
            fillInfoPopBox(){
                this.modal2 = true;
            },
            // 填写退款信息弹窗-确定btn
            fillInfoPopBox_ok (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        this.$http.post('/refund/auditRefund.action', this.qs.stringify({
                            id: this.userId,
                            status: 2,
                            type: this.type,
                            refundNum: this.formItem.input2
                        })).then(response => {
                            // console.log(this.type)
                            // console.log(response)
                            if (response.data.status == 0) {
                                this.modal2 = false;
                                this.$Message.success({
                                    content: '退款成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.getDate()
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                        // this.$Message.success('Success!');
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 填写退款信息弹窗-稍后填写btn
            fillInfoPopBox_cancle() {
                this.formItem.input1 = ''
                this.formItem.input2 = ''
                this.formItem.radio = ''
                this.modal2 = false; 
            },
            // 填写退款信息弹窗-右上角Xbtn
            fillInfoPopBox_cancleTop() {
                this.formItem.input1 = ''
                this.formItem.input2 = ''
                this.formItem.radio = ''
                this.modal2 = false; 
            },
            // 不同意退款申请弹窗
            notAgreePopBox(){
                this.modal3 = true;                                
            },
            // 不同意退款申请弹窗-确定btn
            notAgreePopBox_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // console.log(this.formItem2.input)
                        this.$http.post('/refund/auditRefund.action', this.qs.stringify({
                            id: this.userId,
                            status: 3,
                            remark: this.formItem2.input
                        })).then(response => {
                            console.log(response)
                            if (response.data.status == 0) {
                                this.modal3 = false;
                                this.$Message.success({
                                    content: '提交成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.getDate()
                                        this.$refs['formItem2'].resetFields()
                                        this.formItem2.input = ''
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.modal3 = false;
                                        this.$refs['formItem2'].resetFields()
                                        this.formItem2.input = ''
                                    }
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 不同意退款申请弹窗-取消btn
            notAgreePopBox_cancle(name) {
                this.modal3 = false;  
                this.$refs[name].resetFields()
                this.formItem2.input = ''
            },
            notAgreePopBox_cancleTop(name){
                this.modal3 = false;  
                this.$refs[name].resetFields()
                this.formItem2.input = ''
            },
            // 图片预览
            showImg(name,path){
                let imgExt = new Array('.bmp','.jpg','.jpeg','.png','.tiff','.gif','.pcx','.tga','.exif','.fpx','.svg','.psd','.cdr','.pcd','.dxf','.ufo','.eps','.ai','.raw');//图片文件的后缀名
                let fileName = name.toLowerCase();
                let i = fileName.lastIndexOf(".");
                let ext = ''
                if(i > -1){
                    ext = fileName.substring(i);
                }
                // 是图片则预览
                if(imgExt.indexOf(ext) >= 0){
                    console.log('是图片')
                    console.log(path)
                    this.filePath = path
                    this.showImgBox = true
                    // 不是图片则下载查看
                }else{
                    console.log('不是图片')
                    name = this.charTurn(name)
                    if(ext == '.docx' || ext == '.doc'){
                        console.log('是word ，下载')
                        this.$http.get('/file/download.action', {params:{
                            filePath: path,
                            fileName: name
                        }}).then(response => {
                            console.log(response)
                            this.url =  this.basePath_download + '?filePath=' + path + '&fileName=' + name
                            $('#form').attr({'action':this.url})
                            $('#form').submit()          
                        }).catch(error => {
                            console.log(error)
                        })
                    }else{console.log('预览')
                        this.$http.get('/file/viewArchive.action', {params:{
                            filePath: path,
                        }}).then(response => {
                            console.log(response)
                            this.url =  this.basePath_preview + '?filePath=' + path 
                            $('#form').attr({'action':this.url})
                            $('#form').submit()          
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            },
            // 查看更多纪录
            seeMore(){
                this.seeMoreBox = true
            },
            // 查看更多纪录 - 确定按钮
            seeMoreBox_ok(){
                this.seeMoreBox = false        
            }
        }
    }
</script>

<style scoped>
    .popbox1-label {
        float: left;
        line-height: 40px;
        width: 70px;
        text-align: right;
        margin-right: 10px
    }
    .popbox1-word {
        float: left
    }
    .popbox1-word-item {
        margin-bottom: 5px
    }
    .tip {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 10px;
        margin-left: 90px;
    }
</style>