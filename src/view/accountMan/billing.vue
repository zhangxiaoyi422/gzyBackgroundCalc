<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="search.invoiceName" placeholder="发票名称/发票号码" style="width: 200px" @keyup.native.13&&108="searchDate"></Input>
                </li>
                <li class="li">
                    <label>申请日期：</label>
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="getData1"></DatePicker>&nbsp;至&nbsp;
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="getData2"></DatePicker>
                </li>
                <li class="li">
                    <label>所属月份：</label>
                    <DatePicker type="month" placeholder="选择月份" style="width: 200px" v-model="search.yearMonth"></DatePicker>
                </li>
                <li class="li">
                    <label style="width:65px;">状态：</label>
                    <Select v-model="search.status" style="width:200px" placeholder="全部">
                        <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="li">
                    <Button type="primary" @click="searchDate">查询</Button>
                </li>
            </ul>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current" v-if="pageState"></Page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // table加载效果
      loading: true,
      search: [
        {
          // 关键字
          invoiceName: "",
          //   所属月份
          yearMonth: "",
          //   状态
          status: ""
        }
      ],
      operation: false,
      //   分页当前页
      current: 1,
      // 总条数
      totalCount: 0,
      // 开始日期
      start: "",
      // 结束日期
      end: "",
      // 订单状态
      status: "",
      // 退款数额
      refundAccount: "",
      // 用户类型select
      userType: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "2",
          label: "个人"
        },
        {
          value: "4",
          label: "企业"
        },
        {
          value: "6",
          label: "政府"
        }
      ],
      status: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "未处理"
        },
        {
          value: "1",
          label: "开票失败"
        },
        {
          value: "2",
          label: "开票完成"
        },
        {
          value: "3",
          label: "已邮寄"
        }
      ],
      model2: "0",
      // 表格
      columns1: [
        {
          title: "申请时间",
          key: "applyTime",
          align: "center"
        },
        {
          title: "所属月份",
          key: "yearMonth",
          align: "center"
        },
        {
          title: "开票金额（元）",
          key: "money",
          align: "center"
        },
        {
          title: "发票名称",
          key: "invoiceName",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        },
        {
          title: "开票日期",
          key: "updateDate",
          align: "center"
        },
        {
          title: "发票号码",
          key: "invoiceNum",
          align: "center"
        },
        {
          title: "操作",
          key: "",
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
                      // 通过url参数传递用户id
                      //   console.log(params.row.id);
                      this.$router.push({
                        name: "billingDetail",
                        params: {
                          userId: params.row.id
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      tableData1: [],
      pageState: true
    };
  },
  methods: {
    // 获取表格数据
    getTableDate(page) {
      this.current = page;
      this.$http
        .post(
          "/invoice/getInvoice.action",
          this.qs.stringify({
            pageNo: page,
            beginTime: this.start,
            endTime: this.end,
            invoiceNum: this.search.invoiceName,
            invoiceName: this.search.invoiceName,
            yearMonth: this.search.yearMonth,
            status: this.search.status
          })
        )
        .then(response => {
          console.log(response);
          this.loading = false;
          if (response.data.status == 0) {
            $.each(response.data.data.list, function(key, val) {
              if (val.status == 0) {
                val.status = "未处理";
                this.operation = true;
              } else if (val.status == 1) {
                val.status = "开票失败";
              } else if (val.status == 2) {
                val.status = "开票完成";
              } else if (val.status == 3) {
                val.status = "已邮寄";
              } else if (val.status == 4) {
                val.status = "未处理";
              }
            });
            this.tableData1 = response.data.data.list;
            console.log(this.tableData1);
            if (this.tableData1.length == 0) {
              this.pageState = false;
            } else {
              this.pageState = true;
            }
            this.totalCount = Number(response.data.data.totalCount);
            // console.log(this.totalCount);
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData1(val) {
      this.start = val;
    },
    getData2(val) {
      this.end = val;
    },
    searchDate() {
      this.current = 1;
      this.getTableDate();
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "发票开具查询",
      name: "Billing",
      second: true,
      third: false
    });
    // 表格初始化，显示第一页
    this.getTableDate(1);
    console.log(this.$store.state.limitList);
  }
};
</script>

<style scoped>

</style>