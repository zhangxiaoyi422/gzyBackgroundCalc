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
        <div class="order-info" v-if="status4">
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
                <Button type="primary" size="small" class="change" v-if="postTypesStatus" @click="change">修改</Button>
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
                <li><label>审批意见：</label>{{message}}</li>
                <li v-if="auditRemarkStates" class="clearfix"><label class="detailLabel">建议说明：</label><span class="detailSpan">{{auditRemark}}</span></li>
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
        <div class="btn-wrapper" v-if="status1">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status2">
            <Button type="primary" @click="changePostTypes=true">邮寄发票</Button>
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status3">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status4">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <Modal v-model="changePostTypes" title="邮寄发票" @on-ok="changeSubmit('formValidate')" :loading="boxLoading" @on-cancel="reset('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="邮寄方式" prop="postType">
                    <Select v-model="formValidate.postType" autofocus="autofocus">
                        <Option value="0">EMS</Option>
                        <Option value="1">顺丰速运</Option>
                    </Select>
                </FormItem>
                <FormItem label="单号" prop="expressNumber">
                    <Input v-model="formValidate.expressNumber" placeholder="请输入单号"></Input>
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
    basePath_download() {
      return this.$store.state.basePath + "file/download.action";
    },
    basePath_preview() {
      return this.$store.state.basePath + "file/viewArchive.action";
    }
  },
  data() {
    return {
      filePath: "",
      showImgBox: false,
      fileList: [],
      invoiceRemark: "",
      invoiceType: "",
      spinShow: true,
      userId: this.$route.params.userId,
      //   状态
      status0: false,
      status1: false,
      status2: false,
      status3: false,
      status4: false,
      isPerson: false,
      //   下一步弹窗
      changePostTypes: false,
      boxLoading: true,
      postTypesStatus: false,
      loginName: "",
      //   邮寄状态
      postStatus: 2,
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
      expressNumber: "",
      deptName: "",
      postName: "",
      message: "",
      text: "",
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
                      //   console.log(this.userId);
                      this.$router.push({
                        name: "ConsumptionList",
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
      //   弹窗表单
      formValidate: {
        postType: 0,
        expressNumber: ""
      },
      ruleValidate: {
        expressNumber: [
          {
            required: true,
            message: "请输入单号",
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
      operationDetails: [],
      showOperationDetails: false,
      auditRemarkStates: false
    };
  },
  methods: {
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
            this.status = "待审批";
            this.status0 = true;
          }
          if (res.data.data.status == 1) {
            this.status = "开票失败";
            this.message = "不同意";
            this.status1 = true;
            this.auditRemarkStates = true;
          }
          if (res.data.data.status == 2) {
            this.status = "开票完成";
            this.message = "同意";
            this.status2 = true;
          }
          if (res.data.data.status == 3) {
            this.status = "已邮寄";
            this.message = "同意";
            this.status3 = true;
          }
          if (res.data.data.status == 4) {
            this.status = "待审批";
            this.status4 = true;
          }
          // 发票抬头
          if (res.data.data.invoiceTitle == 2) {
            this.invoiceTitle = "个人";
            this.isPerson = true;
          }
          if (res.data.data.invoiceTitle == 4) {
            this.invoiceTitle = "机构";
            this.isPerson = false;
          }
          if (res.data.data.invoiceType == 1) {
            this.invoiceType = "增值税普通发票";
          }
          if (res.data.data.invoiceType == 2) {
            this.invoiceType = "增值税专用发票";
          }
          if (res.data.data.govUserIdType == "121") {
            this.govUserIdType = "营业执照";
          }
          if (res.data.data.govUserIdType == "122") {
            this.govUserIdType = "组织机构代码证";
          }
          if (res.data.data.govUserIdType == "126") {
            this.govUserIdType = "统一社会信用证";
          }
          this.invoiceRemark = res.data.data.invoiceRemark;
          this.fileList = res.data.data.fileList;
          console.log(this.fileList);
          // ratepayerCode 纳税人识别号 contactPhone 电话 bankType 开户行 contactBankAccount 开户行账号 unitAddress 地址
          this.contact = res.data.data.contact;
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
          this.mailDate = res.data.data.mailDate;
          this.openingBank = res.data.data.openingBank;
          this.bankAccount = res.data.data.bankAccount;
          this.unitName = res.data.data.unitName;
          this.userType = res.data.data.userType;
          this.businessType = res.data.data.businessType;
          this.idCard = res.data.data.idCard;
          this.invoiceName = res.data.data.invoiceName;
          this.deptName = res.data.data.deptName;
          this.postName = res.data.data.postName;
          this.data1[0].yearMonth = res.data.data.yearMonth;
          this.data1[0].money = res.data.data.money;
          this.data1[0].updateDate = res.data.data.updateDate;
          this.data1[0].invoiceNum = res.data.data.invoiceNum;
          this.data1[0].amount = res.data.data.amount;
          this.expressNumber = res.data.data.expressNumber;
          this.test = res.data.data.test;
          if (this.test == 2) {
            this.postTypesStatus = false;
          }
          if (this.test == 1) {
            this.postTypesStatus = true;
          }
          if (this.data1[0].updateDate == "") {
            this.data1[0].updateDate = "-";
          }
          if (this.data1[0].invoiceNum == null) {
            this.data1[0].invoiceNum = "-";
          }
          if (res.data.data.postType == 0) {
            this.postType = "EMS";
            this.formValidate.postType = "0";
          }
          if (res.data.data.postType == 1) {
            this.postType = "顺丰速运";
            this.formValidate.postType = "1";
          }
          this.userName = res.data.data.userName;
          this.phone = res.data.data.phone;
          this.address = res.data.data.address;
          this.auditUser = res.data.data.auditUser;
          this.auditRemark = res.data.data.auditRemark;
          this.auditDate = res.data.data.auditDate;
          if (res.data.data.operationDetails.length > 0) {
            this.operationDetails = res.data.data.operationDetails;
            this.showOperationDetails = true;
          }
        });
    },
    back() {
      this.$router.push({
        name: "Billing"
      });
    },
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
    },
    change() {
      this.changePostTypes = true;
      this.postStatus = 3;
    },
    changeSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return this.changeLoading();
        } else {
          this.$http
            .post(
              "invoice/postInvoice.action",
              this.qs.stringify({
                invoiceId: this.userId,
                status: this.postStatus,
                postType: this.formValidate.postType,
                expressNumber: this.formValidate.expressNumber
              })
            )
            .then(res => {
              console.log(res);
              this.changeLoading();
              if (res.data.status == 0) {
                this.changePostTypes = false;
                this.$Message.success("提交成功!");
                this.getData();
                this.init();
              }
            });
        }
      });
    },
    init() {
      this.status0 = false;
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
      this.status4 = false;
      this.message = "";
      this.postTypesStatus = false;
      this.auditRemarkStates = false;
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    // 图片预览
    showImg(name, path) {
      let imgExt = new Array(
        ".bmp",
        ".jpg",
        ".jpeg",
        ".png",
        ".tiff",
        ".gif",
        ".pcx",
        ".tga",
        ".exif",
        ".fpx",
        ".svg",
        ".psd",
        ".cdr",
        ".pcd",
        ".dxf",
        ".ufo",
        ".eps",
        ".ai",
        ".raw"
      ); //图片文件的后缀名
      let fileName = name.toLowerCase();
      let i = fileName.lastIndexOf(".");
      let ext = "";
      if (i > -1) {
        ext = fileName.substring(i);
      }
      // 是图片则预览
      if (imgExt.indexOf(ext) >= 0) {
        console.log("是图片");
        console.log(path);
        this.filePath = path;
        this.showImgBox = true;
        // 不是图片则下载查看
      } else {
        console.log("不是图片");
        name = this.charTurn(name)
        if (ext == ".docx" || ext == ".doc") {
          console.log("是word ，下载");
          this.$http
            .post(
              "/file/download.action",
              this.qs.stringify({
                filePath: path,
                fileName: name
              })
            )
            .then(response => {
              console.log(response);
              this.url =
                this.basePath_download +
                "?filePath=" +
                path +
                "&fileName=" +
                name;
              $("#form").attr({ action: this.url });
              $("#form").submit();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("预览");
          this.$http
            .post(
              "/file/viewArchive.action",
              this.qs.stringify({
                filePath: path
              })
            )
            .then(response => {
              console.log(response);
              this.url = this.basePath_preview + "?filePath=" + path;
              $("#form").attr({ action: this.url });
              $("#form").submit();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "发票开具详情",
      thirdNavigation: "详情",
      name: "Billing",
      secondName: "ConsumptionList",
      second: true,
      third: true
    });
    this.getData();
    console.log(this.$store.state.limitList);
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