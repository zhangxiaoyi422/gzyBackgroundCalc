<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="order-info" v-if="status0">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status1">
            <ul>
                <li class="li1 success">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status2">
            <ul>
                <li class="li1 error">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status3">
            <ul>
                <li class="li1 normal">
                    <Icon type="information-circled"></Icon>{{status}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="panel-title">
            赠送水晶币用户
        </div>
        <div class="order-info" v-if="perNoReal">
            <div class="panel-title">
                用户信息
            </div>
            <div class="ul">
                <div class="li">
                    用户名：{{loginName}}
                </div>
                <div class="li">
                    注册来源：{{registerResource}}
                </div>
                <div class="li">
                    姓名：{{realName}}
                </div>
                <div class="li">
                    手机号码：{{mobile}}
                </div>
                <div class="li">
                    证件类型：{{userIdType}}
                </div>
                <div class="li">
                    证件号码：{{userCard}}
                </div>
                <div class="li">
                    是否实名：否
                </div>
            </div>
        </div>
        <div class="order-info" v-if="perReal">
            <div class="panel-title">
                用户信息
            </div>
            <div class="ul">
                <div class="li">
                    用户名：{{loginName}}
                </div>
                <div class="li">
                    注册来源：{{registerResource}}
                </div>
                <div class="li">
                    姓名：{{realName}}
                </div>
                <div class="li">
                    手机号码：{{mobile}}
                </div>
                <div class="li">
                    证件类型：{{userIdType}}
                </div>
                <div class="li">
                    证件号码：{{userCard}}
                </div>
                <div class="li">
                    是否实名：{{isRealName}}
                </div>
                <div class="li">
                    实名方式：{{realNameType}}
                </div>
                <div class="li">
                    身份证号码：{{userCard}}
                </div>
            </div>
        </div>
        <div class="order-info" v-if="GNoReal">
            <div class="panel-title">
                用户信息
            </div>
            <div class="ul">
                <div class="li">
                    用户名：{{loginName}}
                </div>
                <div class="li">
                    注册来源：{{registerResource}}
                </div>
                <div class="li">
                    企业名称：{{unitName}}
                </div>
                <div class="li">
                    邮箱：{{email}}
                </div>
                <div class="li">
                    营业执照注册号：{{businessNum}}
                </div>
                <div class="li">
                    是否实名：{{isRealName}}
                </div>
                <div class="li">
                    联系人：{{realName}}
                </div>
                <div class="li">
                    手机号码：{{mobile}}
                </div>
            </div>
        </div>
        <div class="order-info" v-if="GReal">
            <div class="panel-title">
                用户信息
            </div>
            <div class="ul">
                <div class="li">
                    用户名：{{loginName}}
                </div>
                <div class="li">
                    注册来源：{{registerResource}}
                </div>
                <div class="li">
                    企业名称：{{unitName}}
                </div>
                <div class="li">
                    邮箱：{{email}}
                </div>
                <div class="li">
                    营业执照注册号：{{businessNum}}
                </div>
                <div class="li">
                    是否实名：{{isRealName}}
                </div>
                <div class="li">
                    实名方式：{{realNameType}}
                </div>
                <div class="li">
                    对公账号：{{openingBank}}{{bankAccount}}
                </div>
                <div class="li">
                    联系人：{{realName}}
                </div>
                <div class="li">
                    手机号码：{{mobile}}
                </div>
            </div>
        </div>
        <div class="panel-title">
            赠送信息
        </div>
        <div class="panel-word">
            <ul>
                <li><label>赠送水晶币：</label>{{token}}</li>
                <li><label>赠送说明：</label>{{comment}}</li>
            </ul>
        </div>
        <div class="panel-title">
            审批结果
        </div>
        <div class="panel-word">
            <ul>
                <li><label>审批人员：</label>{{reviewedRealName}}</li>
                <li><label>审批部门：</label>{{deptName}}</li>
                <li><label>审批岗位：</label>{{postName}}</li>
                <li><label>审批意见：</label>{{statusText}}</li>
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
        <!-- 待审核 -->
        <div class="btn-wrapper" v-if="status0">
            <Button type="primary" @click="modal1=true">同意</Button>
            <Button type="primary" @click="modal2=true">不同意</Button>
        </div>
        <Modal v-model="modal1" title="提示" @on-ok="ok1">
            <p>确定同意？</p>
        </Modal>
        <Modal v-model="modal2" title="建议说明" @on-ok="refuse('formValidate')" :loading="boxLoading" @on-cancel="cancel2('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入不同意说明，最多100个字符"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      spinShow: true,
      modal1: false,
      modal2: false,
      userId: this.$route.params.userId,
      //   状态
      status0: false,
      status1: false,
      status2: false,
      status3: false,
      perNoReal: false,
      perReal: false,
      GNoReal: false,
      GReal: false,
      //   requestOrder	String	订单号
      // createDate	string	创建时间
      //loginName	String	用户名
      //registerResource	String	注册来源
      //realName	String	姓名/联系人
      //mobile	String	手机号码
      //userIdType	String	证件类型
      //userCard	String	证件号码/身份证号码
      //isRealName	String	是否实名
      //realNameType	String	实名方式
      //email	String	邮箱
      //businessNum	String	营业执照注册号
      //openingBank	String	实名开户行
      //bankAccount	String	实名开户账号
      //unitName	String	机构名称
      //userType	String	用户类型 （2.个人，4.机构)
      //businessType	String	机构用户类型（1.企业2.政府)
      //idCard	String	个人实名的身份证号
      //   token	string	赠送水晶币
      //comment	string	赠送说明
      //reviewedRealName	string	审批人员
      //deptName	string	审批部门
      //postName	string	部门岗位
      //status	string	审批意见 0：待审核 1：赠送成功 2:赠送失败 3：已撤销
      //reviewedRemark	string	建议说明
      //reviewedDate	string	审批时间
      //cancelDate	string	撤销时间
      requestOrder: "",
      createDate: "",
      loginName: "",
      registerResource: "",
      realName: "",
      mobile: "",
      userIdType: "",
      userCard: "",
      isRealName: "",
      realNameType: "",
      email: "",
      businessNum: "",
      openingBank: "",
      bankAccount: "",
      unitName: "",
      userType: "",
      businessType: "",
      idCard: "",
      token: "",
      comment: "",
      reviewedRealName: "",
      deptName: "",
      postName: "",
      status: "",
      reviewedRemark: "",
      reviewedDate: "",
      cancelDate: "",
      operationDetails: [],
      showOperationDetails: false,
      boxLoading: true,
      formValidate: {
        desc: ""
      },
      ruleValidate: {
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
      },
      statusText: ""
    };
  },
  methods: {
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
    },
    getData() {
      this.$http
        .post(
          "/crystal/giveCrystalDetail.action",
          this.qs.stringify({
            AccountId: this.userId
          })
        )
        .then(res => {
          console.log(this.userId);
          this.spinShow = false;
          console.log(res);
          if (res.data.data.status == 0) {
            this.status0 = true;
            res.data.data.status = "待审核";
          }
          if (res.data.data.status == 1) {
            this.status1 = true;
            res.data.data.status = "赠送成功";
          }
          if (res.data.data.status == 2) {
            this.status2 = true;
            res.data.data.status = "赠送失败";
          }
          if (res.data.data.status == 3) {
            this.status3 = true;
            res.data.data.status = "已撤销";
          }
          this.requestOrder = res.data.data.requestOrder;
          this.createDate = res.data.data.createDate;
          this.status = res.data.data.status;
          this.loginName = res.data.data.loginName;
          this.registerResource = res.data.data.registerResource;
          this.realName = res.data.data.realName;
          this.mobile = res.data.data.mobile;
          this.realNameType = res.data.data.realNameType;
          this.userIdType = res.data.data.userIdType;
          this.userCard = res.data.data.userCard;
          this.isRealName = res.data.data.isRealName;
          this.businessNum = res.data.data.businessNum;
          this.email = res.data.data.email;
          this.openingBank = res.data.data.openingBank;
          this.bankAccount = res.data.data.bankAccount;
          this.unitName = res.data.data.unitName;
          this.userType = res.data.data.userType;
          this.businessType = res.data.data.businessType;
          this.idCard = res.data.data.idCard;
          this.token = res.data.data.token;
          this.comment = res.data.data.comment;
          this.reviewedRealName = res.data.data.reviewedRealName;
          this.deptName = res.data.data.deptName;
          this.postName = res.data.data.postName;
          this.reviewedRemark = res.data.data.reviewedRemark;
          this.reviewedDate = res.data.data.reviewedDate;
          this.cancelDate = res.data.data.cancelDate;
          if (this.userType == 2) {
            if (this.isRealName == "否") {
              this.perNoReal = true;
            }
            if (this.isRealName == "是") {
              this.perReal = true;
            }
          }
          if (this.userType == 4) {
            if (this.isRealName == "否") {
              this.GNoReal = true;
            }
            if (this.isRealName == "是") {
              this.GReal = true;
            }
          }
          if (res.data.data.operationDetails.length > 0) {
            this.operationDetails = res.data.data.operationDetails;
            this.showOperationDetails = true;
          }
        });
    },
    back() {
      this.$router.push({
        name: "CrystalGift"
      });
    },
    ok1() {
      this.$http
        .post(
          "crystal/auditGiveCrystal.action",
          this.qs.stringify({
            AccountId: this.userId,
            requestStatus: 1
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.$Message.success(res.data.message);
            this.$router.push({
              name: "CrystalGiftDetail",
              params: {
                userId: this.userId
              }
            });
          } else {
            this.$Message.error(res.data.message);
            this.init();
            this.getData();
          }
        });
    },
    init() {
      this.status0 = false;
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
      this.perNoReal = false;
      this.perReal = false;
      this.GNoReal = false;
      this.GReal = false;
    },
    cancel2(name) {
      this.formValidate.desc = "";
      this.$refs[name].resetFields();
    },
    refuse(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/crystal/auditGiveCrystal.action",
              this.qs.stringify({
                AccountId: this.userId,
                requestStatus: 2,
                reviewedRemark: this.formValidate.desc
              })
            )
            .then(res => {
              console.log(res.data);
              if (res.data.status == 0) {
                this.changeLoading();
                this.$Message.success(res.data.message);
                this.modal2 = false;
                this.$router.push({
                  name: "CrystalGiftDetail",
                  params: {
                    userId: this.userId
                  }
                });
              } else {
                this.changeLoading();
                this.$Message.error(res.data.message);
                this.init();
              }
            });
        }
        if (!valid) {
          return this.changeLoading();
        }
      });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "体验赠送水晶币",
      thirdNavigation: "审核",
      name: "CrystalGift",
      secondName: "CrystalGiftDetail",
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