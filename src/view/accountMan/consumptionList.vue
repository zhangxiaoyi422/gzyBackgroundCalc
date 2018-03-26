<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title">
            {{yearMonth}}
        </div>
        <div class="panel-word">
            <div class="panel-title">
                实际消费金额合计：{{money}}元
            </div>
            <Table :columns="columns1" :data="data1"></Table>
            <Page :total="totalCount" :page-size="15" show-total @on-change="getData" :current="this.current"  v-if="pageState"></Page>
        </div>
        <div class="btn-wrapper">
            <Button type="primary" @click="back">返回</Button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageState: true,
      spinShow: true,
      userId: this.$route.params.userId,
      columns1: [
        {
          title: "用户名",
          key: "accountName",
          width: 100
        },
        {
          title: "消费时间",
          key: "createDate"
        },
        {
          title: "消费订单号",
          key: "orderSequence",
          width: 200
        },
        {
          title: "证据编号",
          key: "storageNumber"
        },
        {
          title: "实际消费公证币",
          key: "orderToken",
          align: "right"
        },
        {
          title: "实际消费金额（元）",
          key: "orderMoney",
          align: "right"
        },
        {
          title: "消费订单状态",
          key: "serviceState",
          align: "center"
        }
      ],
      data1: [],
      money: "0",
      tips: false,
      current: 1,
      totalCount: 1,
      yearMonth: ""
    };
  },
  methods: {
    getData(page) {
      this.$http
        .post(
          "invoice/statementInvoice.action",
          this.qs.stringify({
            pageSize: "15",
            pageNo: page,
            id: this.userId
          })
        )
        .then(res => {
          console.log(res);
          this.spinShow = false;
          // 状态
          $.each(res.data.data.list, function(key, val) {
            if (val.serviceState == 0) {
              val.serviceState = "正常";
            }
            if (val.serviceState == 1) {
              val.serviceState = "异常";
            }
          });
          this.data1 = res.data.data.list;
          this.yearMonth = res.data.data.yearMonth;
          if (this.data1.length == 0) {
            this.pageState = false;
          } else {
            this.pageState = true;
          }
          this.totalCount = res.data.data.totalCount;
          console.log(this.totalCount);
          this.money = res.data.data.money;
        });
    },
    back() {
      this.$router.push({
        name: "billingDetail",
        params: {
          userId: this.userId
        }
      });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      userId: this.userId,
      primaryNavigation: "运营管理",
      subNavigation: "发票开具详情",
      thirdNavigation: "详情",
      fourthNavigation: "消费详情",
      secondName: "billingDetail",
      name: "Billing",
      second: true,
      third: true,
      fourth: true
    });
    this.getData();
    console.log(this.$store.state.limitList);
  }
};
</script>

<style scoped>

</style>