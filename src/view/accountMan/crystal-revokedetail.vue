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
        <div class="panel-title">
            <div class="panel-title">
                <Poptip trigger="hover" content='每月1日，系统自动向运营部的“可赠送体验水晶币余额”加入水晶币100000.00币'>
                    申请信息&nbsp;
                    <Icon type="information-circled" color="#2D8CF0"></Icon>
                </Poptip>
            </div>
        </div>
        <div class="panel-word clearfix">
            <ul>
                <li><label>申请部门：</label>{{deptName}}</li>
                <li><label>水晶币：</label>{{token}}</li>
                <li><label class="detailLabel">申请说明：</label><span class="detailSpan">{{comment}}</span></li>
            </ul>
        </div>
        <div class="panel-title">
            审批结果
        </div>
        <div class="panel-word">
            <ul>
                <li><label>审批人员：</label>{{reviewedRealName}}</li>
                <li><label>审批部门：</label>{{reviewedDeptName}}</li>
                <li><label>部门岗位：</label>{{postName}}</li>
                <li><label>审批意见：</label></li>
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
            <Button type="primary" @click="modal1 = true" v-if="buttonStatus">撤销</Button>
            <Button type="primary" @click="back">返回</Button>
        </div>
        <Modal v-model="modal1" title="提示" @on-ok="ok">
            <p>确定撤销？</p>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      spinShow: true,
      userId: this.$route.params.userId,
      //   状态
      status0: false,
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
      reviewedRemark: "",
      revieweDate: "",
      cancelDate: "",
      id: "",
      // 确认撤消弹框
      modal1: false,
      buttonStatus: true,
      operationDetails: [],
      showOperationDetails: false
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
          console.log(res.data.data);
          if (res.data.data.requestStatus == 0) {
            this.status0 = true;
            res.data.data.requestStatus = "待审批";
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
        name: "Crystal"
      });
    },
    ok() {
      console.log(this.userId);
      this.$http
        .post(
          "crystal/auditCrystal.action",
          this.qs.stringify({
            crystalMoneyRequestId: this.userId,
            requestStatus: "3"
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.$Message.success("撤销成功");
            this.buttonStatus = false;
            this.status0 = false;
            this.$router.push({
              name: "CrystalDetail"
            });
          } else {
            this.$Message.error(res.data.message);
          }
        });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "申领水晶币申请",
      thirdNavigation: "详情",
      name: "Crystal",
      secondName: "CrystalDetails",
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