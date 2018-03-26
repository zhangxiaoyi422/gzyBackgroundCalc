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
        <div class="btn-wrapper">
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
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
            return {
                filePath:'',
                showImgBox:false,
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
                showOperationDetails: false,
                operationDetails: [],
                spinShow: true,
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
                showApprovalRemark: false,
                showApprovalTime: false,
                type: '',
                // 审批意见 同意或不同意
                approveAdvice: '',
                resData: {},
                resData_all:{},
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '公证币退款查询',
                thirdNavigation: '详情',
                name: 'RefundQuery',
                second: true,
                third: true
            });
            this.getDate();
        },
        methods: {
            // 获取订单数据
            getDate() {
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
                        this.approveAdvice = '';
                        this.showApprovalRemark = false,
                            this.showApprovalTime = false,
                            this.returnBtn = false;
                        this.agreeBtn = true;
                        this.confirmRefundBtn = false;
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
                        this.returnBtn = false;
                        this.agreeBtn = false;
                        this.confirmRefundBtn = true;
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
                }).catch(error => {
                    console.log(error);
                });
            },
            // 返回公证币退款审批列表
            returnToList() {
                this.$router.push({
                    name: 'RefundQuery'
                })
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
                            this.url =  this.basePath_download + '?filePath=' + path  + '&fileName=' + name
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

</style>