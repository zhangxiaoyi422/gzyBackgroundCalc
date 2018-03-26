<template>
    <div class="refundQuery-detail detail-page relative">
        <form action="" method="post" id="form"></form>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="order-info" v-if="status0">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status4">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status0A">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status1">
            <ul>
                <li class="li1 error">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status2">
            <ul>
                <li class="li1 success">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status3">
            <ul>
                <li class="li1 success">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{orderNums}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="panel-title">
            开具发票用户
        </div>
        <div class="panel-word" v-if="businessType != '2'">
            <table>
                <tr>
                    <td>用户名：</td>
                    <td>{{loginName}}</td>
                    <td>注册来源：</td>
                    <td>{{registerResource}}</td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td>{{realName}}</td>
                    <td>手机号码：</td>
                    <td>{{mobile}}</td>
                </tr>
                <tr>
                    <td>证件类型：</td>
                    <td>
                        <span v-if="userType == '2'">{{userIdType}}</span>
                        <span v-if="userType == '4'">{{govUserIdType}}</span>
                    </td>
                    <td>证件号码：</td>
                    <td>{{businessNum}}</td>
                </tr>
                <tr>
                    <td>是否实名：</td>
                    <td>{{isRealName}}</td>
                    <td>身份证号码：</td>
                    <td>{{userCard}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-word" v-if="businessType == '2'">
            <table>
                <tr>
                    <td>政府全称：</td>
                    <td>{{unitName}}</td>
                    <td>注册来源：</td>
                    <td>{{registerResource}}</td>
                </tr>
                <tr>
                    <td>用户名：</td>
                    <td>{{loginName}}</td>
                    <td>手机号码：</td>
                    <td>{{mobile}}</td>
                </tr>
                <tr>
                    <td>组织机构代码：</td>
                    <td>{{businessNum}}</td>
                    <td>政府联系人：</td>
                    <td>{{contact}}</td>
                </tr>
                <tr>
                    <td>是否实名：</td>
                    <td>{{isRealName}}</td>
                    <td>邮箱：</td>
                    <td>{{email}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title">
            发票信息
            <Button type="primary" size="small" class="change" v-if="status2" @click="openChangeBilling">修改</Button>
        </div>
        <div class="panel-word">
            <!-- 个人 -->
            <ul v-if="invoiceTitle == '个人'">
                <li><label>发票抬头：</label>{{invoiceTitle}}</li>
                <li><label>发票类型：</label>{{invoiceType}}</li>
                <li><label>名称：</label>{{invoiceName}}</li>
                <li><span class="blue blod">{{status}}</span>&nbsp;&nbsp;{{auditRemark}}</li>
                <li><label><b>发票备注：</b></label>{{invoiceRemark}}</li>                
            </ul>
            <!-- 企业 -->
            <ul v-if="invoiceTitle == '机构' && (businessType == '1' || businessType == null)">
                <li><label>发票抬头：</label>{{invoiceTitle}}</li>
                <li><label>发票类型：</label>{{invoiceType}}</li>                
                <li><label>单位名称：</label>{{invoiceName}}</li>
                <li><label>开户行：</label>{{bankType}}</li>
                <li><label>纳税人识别号：</label>{{ratepayerCode}}</li>
                <li><label>开户行账号：</label>{{contactBankAccount}}</li>
                <li><label>电话：</label>{{contactPhone}}</li>
                <li><label>地址：</label>{{unitAddress}}</li>
                <li><span class="blue blod">{{status}}</span>&nbsp;&nbsp;{{auditRemark}}</li>
                <li><label><b>发票备注：</b></label>{{invoiceRemark}}</li>
            </ul>
            <!-- 政府 -->
            <ul v-if="invoiceTitle == '机构' && businessType == '2'">
                <li><label>发票抬头：</label>{{invoiceTitle}}</li>
                <li><label>发票类型：</label>{{invoiceType}}</li>                
                <li><label>单位名称：</label>{{invoiceName}}</li>
                <li><label>纳税人识别号：</label>{{ratepayerCode}}</li>
                <li><label>电话：</label>{{contactPhone}}</li>
                <li><label>开户行：</label>{{bankType}}</li>
                <li><label>开户行账号：</label>{{contactBankAccount}}</li>
                <li><label>地址：</label>{{unitAddress}}</li>
                <li><span class="blue blod">{{status}}</span>&nbsp;&nbsp;{{auditRemark}}</li>
                <li><label><b>发票备注：</b></label>{{invoiceRemark}}</li>
                <li class="clearfix"><label style="float:left"><b>上传凭证：</b></label>
                    <ul style="float:left">
                        <template v-for="item in fileList">
                            <li @click="showImg(item.name,item.path)" style="cursor:pointer">{{item.name}}</li>
                        </template>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="panel-word">
            <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="panel-title">
            邮寄信息
        </div>
        <div class="panel-word">
            <ul>
                <li><label>邮寄方式 <span class="red">（到付）</span>：</label>{{postType}}</li>
                <li><label>收件人：</label>{{userName}}</li>
                <li><label>联系电话：</label>{{phone}}</li>
                <li><label>地址：</label>{{address}}</li>
            </ul>
        </div>
        <div class="panel-word" v-if="status3">
            <div class="panel-title">
                已邮寄
            </div>
            <ul>
                <li><label>邮寄方式 <span class="red">（到付）</span>：</label>{{postType}}</li>
                <li><label>单号：</label>{{expressNumber}}</li>
                <li><label>邮寄日期：</label>{{mailDate}}</li>
            </ul>
        </div>
        <div class="panel-title">
            审批结果
        </div>
        <div class="panel-word clearfix">
            <ul>
                <li><label>审批人员：</label>{{auditUser}}</li>
                <li><label>审批部门：</label>{{deptName}}</li>
                <li><label>部门岗位：</label>{{postName}}</li>
                <li><label>审批意见：</label>{{requestStatus}}</li>
                <li v-if="auditRemarkStates"><label class="detailLabel">建议说明：</label><span class="detailSpan">{{auditRemark}}</span></li>
                <li><label>审批时间：</label>{{auditDate}}</li>
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
        <div class="btn-wrapper" v-if="status0">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status0A">
            <Button type="primary" @click="modal1=true">同意</Button>
            <Button type="primary" @click="modal2=true">不同意</Button>
        </div>
        <div class="btn-wrapper" v-if="status1">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status2">
            <!-- <Button type="primary" @click="changePostTypes=true">邮寄发票</Button> -->
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status3">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status4">
            <Button type="primary" @click="modal3=true">开具发票</Button>
            <Button type="primary" @click="back">返回</Button>
        </div>
        <Modal v-model="modal3" title="发票信息" @on-ok="ok3('formValidate2')" :loading="boxLoading" @on-cancel="reset">
            <div style="margin-bottom:20px;font-weight: bold;">
                已同意开票，请填写票据信息。
            </div>
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2">
                <FormItem label="开票日期" prop="date">
                    <DatePicker type="date" placeholder="请选择开票日期" v-model="formValidate2.date" style="width:485px;"></DatePicker>
                </FormItem>
                <FormItem label="开票号码" prop="number">
                    <Input v-model="formValidate2.number" placeholder="请输入开票号码"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="changeBilling" title="发票信息" @on-ok="submit('formValidate3')" :loading="boxLoading" @on-cancel="reset">
            <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate3" :label-width="80">
                <FormItem label="开票日期" prop="updateDate">
                    <DatePicker :value="formValidate3.updateDate" type="date" placeholder="请选择时间" v-model="formValidate3.updateDate" @on-change="getStartTime" style="width:408px;"></DatePicker>
                </FormItem>
                <FormItem label="开票号码" prop="invoiceNum">
                    <Input v-model="formValidate3.invoiceNum" placeholder="请输入单号"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal1" title="提示" @on-ok="ok1">
                    <p>确定同意？</p>
                </Modal>
        <Modal v-model="modal2" title="建议说明" @on-ok="refuse('formValidate4')" :loading="boxLoading" @on-cancel="reset4('formValidate4')">
            <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate4">
                <FormItem prop="desc">
                    <Input v-model="formValidate4.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入不同意说明，最多100个字符"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="showImgBox" title="图片预览"  class-name="vertical-center-modal">
            <img :src="'/api/file/viewArchive.action?filePath=' + filePath " style="width: 100%">
            <div slot="footer">
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
      spinShow: true,
      userId: this.$route.params.userId,
      //   状态
      status0: false,
      status0A: false,
      status1: false,
      status2: false,
      status3: false,
      status4: false,
      modal1: false,
      modal2: false,
      isPerson: false,
      modal3: false,
      changeBilling: false,
      auditRemarkStates: false,
      requestStatus: "",
      //   下一步弹窗
      boxLoading: true,
      /*orderNums	String	订单号
        createDate	Date	创建时间
        loginName	String	用户名
        registerResource	String	注册来源
        realName	String	姓名
        userMobile	String	手机号码
        userIdType	String	证件类型
        userCard	String	证件号码/身份证号码
        isRealName	String	是否实名
        invoiceTitle	String	发票抬头
        invoiceName	String	名称
        yearMonth	Date	所属月份
        money	String	累计消费公证币
        updateDate	String	开票日期
        invoiceNum	String	发票号码
        postType	String	邮寄方式
        userName	String	收件人
        phone	String	联系电话
        address	String	地址
        auditUser	String	审批人员
        status	String	审批意见
        auditRemark	String	建议说明
        auditDate	String	审批时间 */
      // ratepayerCode 纳税人识别号 contactPhone 电话 bankType 开户行 contactBankAccount 开户行账号 unitAddress 地址
      //企业
      userType:'',
    businessNum:'',
      govUserIdType:'',
      businessType:'',
      contact:'',
      ratepayerCode: "",
      contactPhone: "",
      bankType: "",
      contactBankAccount: "",
      unitAddress: "",
      mailDate: "",
      phone: "",
      postType: "",
      status: "",
      orderNums: "",
      auditUser: "",
      invoiceTitle: "",
      invoiceName: "",
      userIdType: "",
      userCard: "",
      auditDate: "",
      address: "",
      registerResource: "",
      mobile: "",
      userName: "",
      realName: "",
      createDate: "",
      isRealName: "",
      auditRemark: "",
      loginName: "",
      expressNumber: "",
      deptName: "",
      postName: "",
      message: "",
      invoiceType:'',
      invoiceRemark:'',
      operationDetails: [],
      fileList: [],
      showOperationDetails: false,
      data1: [
        {
          yearMonth: "",
          money: "",
          amount: "",
          updateDate: "",
          invoiceNum: ""
        }
      ],
      columns1: [
        {
          title: "所属月份",
          key: "yearMonth"
        },
        {
          title: "当月累计消费公证币",
          key: "money"
        },
        {
          title: "当月累计消费金额（￥）",
          key: "amount"
        },
        {
          title: "开票日期",
          key: "updateDate"
        },
        {
          title: "发票号码",
          key: "invoiceNum"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "financeConsumptionList",
                        params: {
                          userId: this.userId
                        }
                      });
                    }
                  }
                },
                "消费明细"
              )
            ]);
          }
        }
      ],
      // 弹窗表单
      formValidate: {
        postType: "1",
        expressNumber: ""
      },
      ruleValidate: {
        expressNumber: [
          {
            required: true,
            message: "请输入单号",
            trigger: "blur"
          }
        ]
      },
      formValidate2: {
        date: "",
        number: ""
      },
      ruleValidate2: {
        date: [
          {
            required: true,
            type: "date",
            message: "请选择",
            trigger: "change"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          {
            type: "string",
            max: 20,
            message: "最多20个字符。",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              console.log(value);
              if (value.trim() == "") {
                callback("输入内容不能为空");
              }
              callback(errors);
            }
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              console.log(value);
              if (value.trim().indexOf(" ") >= 0) {
                callback("不支持空格");
              }
              callback(errors);
            }
          }
        ]
      },
      formValidate3: {
        updateDate: "",
        invoiceNum: ""
      },
      value1: "",
      ruleValidate3: {
        updateDate: [
          {
            required: true,
            type: "date",
            message: "请选择时间",
            trigger: "change"
          }
        ],
        invoiceNum: [
          {
            required: true,
            message: "请输入开票号码",
            trigger: "blur"
          },
          {
            type: "string",
            max: 20,
            message: "最多20个字符。",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              if (value.trim().length > 20) {
                callback("不能超过20个字符");
              }
              callback(errors);
            }
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              console.log(value);
              if (value.trim().indexOf(" ") >= 0) {
                callback("不支持空格");
              }
              callback(errors);
            }
          }
        ]
      },
      formValidate4: {
        desc: ""
      },
      ruleValidate4: {
        desc: [
          {
            required: true,
            message: "请输入说明",
            trigger: "blur"
          },
          {
            type: "string",
            max: 100,
            message: "最多100个字符。",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //   更改弹窗loading
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
    },
    //   初始化数据为空
    init() {
      this.status0 = false;
      this.status0A = false;
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
      this.status4 = false;
      this.changeBilling = false;
    },
    // 表格重置
    reset4(name) {
      this.$refs[name].resetFields();
    },
    reset() {
      this.$refs["formValidate2"].resetFields();
      this.$refs["formValidate3"].resetFields();
      this.formValidate.postType = "1";
      this.formValidate.expressNumber = "";
      this.formValidate2.date = "";
      this.formValidate2.number = "";
      this.formValidate3.updateDate = "";
      this.formValidate3.invoiceNum = "";
      this.formValidate4.desc = "";
    },
    // 获取数据
    getData() {
      this.$http
        .post(
          "invoice/getInvoiceDetail.action",
          this.qs.stringify({
            id: this.userId
          })
        )
        .then(res => {
          console.log(res);
          this.spinShow = false;

          // 状态
          if (res.data.data.status == 0) {
            this.status = "未处理";
            this.requestStatus = "";
            if (this.$store.state.limitList.indexOf("2_3_3") >= 0) {
              this.status0 = false;
              this.status0A = true;
            } else {
              this.status0 = true;
              this.status0A = false;
            }
          }
          if (res.data.data.status == 4) {
            this.status = "未处理";
            this.requestStatus = "";
            if (this.$store.state.limitList.indexOf("2_3_3") >= 0) {
              this.status0 = false;
              this.status4 = true;
            } else {
              this.status0 = true;
              this.status4 = false;
            }
          }
          if (res.data.data.status == 1) {
            this.status = "开票失败";
            this.requestStatus = "不同意";
            this.status1 = true;
            this.auditRemarkStates = true;
          }
          if (res.data.data.status == 2) {
            this.status = "开票完成";
            this.requestStatus = "同意";
            this.status2 = true;
          }
          if (res.data.data.status == 3) {
            this.requestStatus = "同意";
            this.status = "已邮寄";
            this.status3 = true;
          }
          // 发票抬头
          if (res.data.data.invoiceTitle == 2) {
            this.invoiceTitle = "个人";
            this.isPerson = true;
            console.log(this.isPerson)
          }
          if (res.data.data.invoiceTitle == 4) {
            this.invoiceTitle = "机构";
            this.isPerson = false;
          }
          if (res.data.data.govUserIdType == '121') {
            this.govUserIdType = "营业执照";
          }
          if (res.data.data.govUserIdType == '122') {
            this.govUserIdType = "组织机构代码证";
          }
          if (res.data.data.govUserIdType == '126') {
            this.govUserIdType = "统一社会信用证";
          }
          // ratepayerCode 纳税人识别号 contactPhone 电话 bankType 开户行 contactBankAccount 开户行账号 unitAddress 地址
          this.contact =  res.data.data.contact;
          this.ratepayerCode = res.data.data.ratepayerCode;
          this.contactPhone = res.data.data.contactPhone;
          this.bankType = res.data.data.bankType;
          this.contactBankAccount = res.data.data.contactBankAccount;
          this.unitAddress = res.data.data.unitAddress;
          this.createDate = res.data.data.createDate;
          this.orderNums = res.data.data.orderNums;
          this.loginName = res.data.data.loginName;
          this.registerResource = res.data.data.registerResource;
          this.realName = res.data.data.realName;
          this.userMobile = res.data.data.userMobile;
          this.userIdType = res.data.data.userIdType;
          this.userCard = res.data.data.userCard;
          this.isRealName = res.data.data.isRealName;
          this.realNameType = res.data.data.realNameType;
          this.mobile = res.data.data.mobile;
          this.email = res.data.data.email;
          this.businessNum = res.data.data.businessNum;
          this.openingBank = res.data.data.openingBank;
          this.bankAccount = res.data.data.bankAccount;
          this.unitName = res.data.data.unitName;
          this.userType = res.data.data.userType;
          this.businessType = res.data.data.businessType;
          this.idCard = res.data.data.idCard;
          this.mailDate = res.data.data.mailDate;
          this.deptName = res.data.data.deptName;
          this.postName = res.data.data.postName;
          this.invoiceName = res.data.data.invoiceName;
          this.data1[0].yearMonth = res.data.data.yearMonth;
          this.data1[0].money = res.data.data.money;
          this.data1[0].updateDate = res.data.data.updateDate;
          this.data1[0].invoiceNum = res.data.data.invoiceNum;
          this.data1[0].amount = res.data.data.amount;
          this.expressNumber = res.data.data.expressNumber;
          if (this.data1[0].updateDate == "") {
            this.data1[0].updateDate = "-";
          }
          if (this.data1[0].invoiceNum == null) {
            this.data1[0].invoiceNum = "-";
          }
          if (res.data.data.postType == 0) {
            this.postType = "EMS";
          }
          if (res.data.data.postType == 1) {
            this.postType = "顺丰速运";
          }
          if(res.data.data.invoiceType == '1'){
              this.invoiceType = '增值税普通发票'
          }
          if(res.data.data.invoiceType == '2'){
              this.invoiceType = '增值税专用发票'
          }
          this.invoiceRemark = res.data.data.invoiceRemark
          this.userName = res.data.data.userName;
          this.phone = res.data.data.phone;
          this.address = res.data.data.address;
          this.auditUser = res.data.data.auditUser;
          this.auditRemark = res.data.data.auditRemark;
          this.auditDate = res.data.data.auditDate;
          this.fileList = res.data.data.fileList;
          if (res.data.data.operationDetails.length > 0) {
            this.operationDetails = res.data.data.operationDetails;
            this.showOperationDetails = true;
          }
        });
    },
    // 返回上一级
    back() {
      this.$router.push({
        name: "financeBilling"
      });
    },
    // 弹窗一提交
    changeSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          this.changeLoading();
          this.$http
            .post(
              "invoice/postInvoice.action",
              this.qs.stringify({
                invoiceId: this.userId,
                postType: this.formValidate.postType,
                expressNumber: this.formValidate.expressNumber
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.status) {
                this.changePostTypes = false;
                this.$Message.success("提交成功!");
                this.init();
                this.reset();
                this.getData();
              }
            });
        }
      });
    },
    // 审批同意提交
    ok3(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          console.log(this.userId);
          this.$http
            .post(
              "/invoice/auditInvoice.action",
              this.qs.stringify({
                invoiceId: this.userId,
                status: 2,
                updateDate: this.formValidate2.date,
                invoiceNum: this.formValidate2.number
              })
            )
            .then(res => {
              console.log(res);
              this.changeLoading();
              this.modal3 = false;
              if (res.data.status == 0) {
                this.changePostTypes = false;
                this.$Message.success("提交成功!");
                this.init();
                this.getData();
              } else {
                this.$Message.error(res.data.message);
                this.init();
                this.getData();
              }
            });
        }
      });
    },
    openChangeBilling() {
      this.changeBilling = true;
      this.value1 = this.data1[0].updateDate;
      //   console.log(this.va)
      this.formValidate3.updateDate = this.data1[0].updateDate;
      this.formValidate3.invoiceNum = this.data1[0].invoiceNum;
    },
    getStartTime: function(val) {
      this.formValidate.updateDate = val;
      console.log(this.formValidate.updateDate);
    },
    // 修改发票信息
    submit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          this.changeLoading();
          this.$http
            .post(
              "/invoice/updateInvoice.action",
              this.qs.stringify({
                invoiceId: this.userId,
                updateDate: this.formValidate3.updateDate,
                invoiceNum: this.formValidate3.invoiceNum
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.status == 0) {
                this.changeBilling = false;
                this.$Message.success("提交成功!");
                this.reset();
                this.getData();
              } else {
                this.$Message.success(res.data.message);
              }
            });
        }
      });
    },
    ok1() {
      this.$http
        .post(
          "/invoice/agreeInvoice.action",
          this.qs.stringify({
            invoiceId: this.userId
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.$Message.success(res.data.message);
            this.init();
            this.getData();
            this.modal3 = true;
          } else {
            this.$Message.error(res.data.message);
            this.init();
            this.getData();
          }
        });
    },
    // 拒绝
    refuse(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/invoice/auditInvoice.action",
              this.qs.stringify({
                invoiceId: this.userId,
                status: 1,
                auditRemark: this.formValidate4.desc
              })
            )
            .then(res => {
              console.log(res.data);
              if (res.data.status == 0) {
                this.changeLoading();
                this.$Message.success(res.data.message);
                this.modal2 = false;
                this.init();
                this.getData();
              } else {
                this.changeLoading();
                this.$Message.error(res.data.message);
                this.init();
                this.getData();
              }
            });
        }
        if (!valid) {
          return this.changeLoading();
        }
      });
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
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "财务审批",
      subNavigation: "发票开具详情",
      thirdNavigation: "详情",
      name: "financeBilling",
      second: true,
      third: true
    });
    this.getData();
  }
};
</script>

<style scoped>
.panel-word td {
  width: 100px;
}
label {
  display: inline-block;
  width: 135px;
}
.change {
  margin-left: 15px;
}
</style>