<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="order-info" v-if="status0">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{requestStatus}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status0A">
            <ul>
                <li class="li1 warn">
                    <Icon type="information-circled"></Icon>{{requestStatus}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status1">
            <ul>
                <li class="li1 success">
                    <Icon type="information-circled"></Icon>{{requestStatus}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status2">
            <ul>
                <li class="li1 error">
                    <Icon type="information-circled"></Icon>{{requestStatus}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="order-info" v-if="status3">
            <ul>
                <li class="li1 normal">
                    <Icon type="information-circled"></Icon>{{requestStatus}}</li>
                <li>订单号：{{requestOrder}}</li>
                <li>创建时间：{{createDate}}</li>
            </ul>
        </div>
        <div class="panel-title">
            <Poptip trigger="hover" content='每月1日，系统自动向运营部的“可赠送体验水晶币余额”加入水晶币100000.00币'>
                申请信息&nbsp;
                <Icon type="information-circled" color="#2D8CF0"></Icon>
            </Poptip>
        </div>
        <div class="panel-word clearfix">
            <ul>
                <li><label>申请部门：</label>{{deptName}}</li>
                <li><label>水晶币：</label>{{token}}</li>
                <li class="clearfix"><label class="detailLabel">申请说明：</label><span class="detailSpan">{{comment}}</span></li>
            </ul>
        </div>
        <div class="panel-title">
            审批结果
        </div>
        <div class="panel-word clearfix">
            <ul>
                <li><label>审批人员：</label>{{reviewedRealName}}</li>
                <li><label>审批部门：</label>{{reviewedDeptName}}</li>
                <li><label>部门岗位：</label>{{postName}}</li>
                <li><label>审批意见：</label>{{requestStatus2}}</li>
                <li v-if="reviewedRemarkState"><label class="detailLabel">建议说明：</label><span class="detailSpan">{{reviewedRemark}}</span></li>
                <li><label>审批时间：</label>{{revieweDate}}</li>
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
            <Button type="primary" @click="agree">同意</Button>
            <Button type="primary" @click="disagree">不同意</Button>
        </div>
        <div class="btn-wrapper" v-if="status1">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status2">
            <Button type="primary" @click="back">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="status3">
            <Button type="primary" @click="back">返回</Button>
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
      userId: this.$route.params.userId,
      status0A: false,
      //   状态
      status0: false,
      status1: false,
      status2: false,
      status3: false,
      reviewedRemarkState: false,
      //   参数名	类型	说明
      // requestOrder	String	申领订单号
      // createDate	String	创建时间
      // requestRealName	String	申请人
      // deptName	String	申领人部门
      // token	String	申领金额
      // comment	String	申请说明
      // reviewedRealName	String	审批人员
      // reviewedDeptName	String	审批部门
      // postName	String	部门岗位
      // requestStatus	String	审批意见
      // reviewedRemark	String	审批说明
      // revieweDate	String	审批时间
      // cancelDate	String	撤销时间
      requestOrder: "",
      createDate: "",
      requestRealName: "",
      deptName: "",
      token: "",
      comment: "",
      reviewedRealName: "",
      reviewedDeptName: "",
      postName: "",
      requestStatus: "",
      requestStatus2: "",
      reviewedRemark: "",
      revieweDate: "",
      cancelDate: "",
      operationDetails: [],
      showOperationDetails: false,
      //   同意弹窗
      modal1: false,
      id: "",
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
      boxLoading: true,
      modal2: false
    };
  },
  methods: {
    getData() {
      this.$http
        .post(
          "/crystal/requestCrystalDetail.action",
          this.qs.stringify({
            id: this.userId
          })
        )
        .then(res => {
          this.spinShow = false;
          console.log(res);
          if (res.data.data.requestStatus == 0) {
            res.data.data.requestStatus = "待审核";
            this.requestStatus2 = "";
            console.log(this.$store.state.limitList);
            if (this.$store.state.limitList.indexOf("2_1_3") >= 0) {
              if (res.data.data.shenhe == 1) {
                this.status0A = true;
              } else {
                this.status0 = true;
              }
            } else {
              this.status0 = true;
            }
          }
          if (res.data.data.requestStatus == 1) {
            this.status1 = true;
            this.requestStatus2 = "同意";
            res.data.data.requestStatus = "申领成功";
          }
          if (res.data.data.requestStatus == 2) {
            this.status2 = true;
            this.requestStatus2 = "不同意";
            res.data.data.requestStatus = "申领失败";
            this.reviewedRemarkState = true;
          }
          if (res.data.data.requestStatus == 3) {
            this.status3 = true;
            res.data.data.requestStatus = "已撤销";
            this.requestStatus2 = "";
          }
          this.requestOrder = res.data.data.requestOrder;
          this.createDate = res.data.data.createDate;
          this.requestRealName = res.data.data.requestRealName;
          this.deptName = res.data.data.deptName;
          this.token = res.data.data.token;
          this.comment = res.data.data.comment;
          this.requestStatus = res.data.data.requestStatus;
          this.reviewedRealName = res.data.data.reviewedRealName;
          this.reviewedDeptName = res.data.data.reviewedDeptName;
          this.postName = res.data.data.postName;
          this.reviewedRemark = res.data.data.reviewedRemark;
          this.revieweDate = res.data.data.revieweDate;
          this.cancelDate = res.data.data.cancelDate;
          this.id = res.data.data.id;
          if (res.data.data.operationDetails.length > 0) {
            this.operationDetails = res.data.data.operationDetails;
            this.showOperationDetails = true;
          }
        });
    },
    back() {
      this.$router.push({
        name: "FinanceApprovalCrystal"
      });
    },
    agree() {
      this.modal1 = true;
    },
    ok1() {
      //   console.log(this.id);
      this.$http
        .post(
          "/crystal/auditCrystal.action",
          this.qs.stringify({
            crystalMoneyRequestId: this.id,
            requestStatus: "1"
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$Message.success(res.data.message);
            this.init();
          } else {
            this.$Message.error(res.data.message);
            this.init();
          }
        });
    },
    disagree() {
      this.modal2 = true;
    },
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
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
              "/crystal/auditCrystal.action",
              this.qs.stringify({
                crystalMoneyRequestId: this.userId,
                requestStatus: "2",
                reviewedRemark: this.formValidate.desc
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.status == 0) {
                this.changeLoading();
                this.$Message.success("提交成功");
                this.modal2 = false;
                this.init();
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
    },
    init() {
      this.status0A = false;
      this.status0 = false;
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
      this.reviewedRemarkState = false;
      this.getData();
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "财务审批",
      subNavigation: "水晶币申领审批",
      thirdNavigation: "详情",
      name: "FinanceApprovalCrystal",
      secondName: "FinanceApprovalCrystalDetail",
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