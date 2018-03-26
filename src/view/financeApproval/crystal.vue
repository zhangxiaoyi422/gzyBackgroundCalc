<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="search.comment" placeholder="申请人姓名" style="width: 200px" autofocus="autofocus" @keyup.native.13&&108="searchDate"></Input>
                </li>
                <li class="li">
                    <label>申请日期：</label>
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="getData1"></DatePicker>&nbsp;至&nbsp;
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change="getData2"></DatePicker>
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
        <Page v-if="pageState" :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current"></Page>
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
          comment: "",
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
      status: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待审批"
        },
        {
          value: "1",
          label: "申领成功"
        },
        {
          value: "2",
          label: "申领失败"
        },
        {
          value: "3",
          label: "已撤销"
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
          title: "申请部门",
          key: "deptName",
          align: "center"
        },
        {
          title: "申请人",
          key: "realName",
          align: "center"
        },
        {
          title: "申领水晶币",
          key: "token",
          align: "center"
        },
        {
          title: "申请说明",
          key: "comment",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        },
        {
          title: "操作",
          key: "",
          align: "center",
          render: (h, params) => {
            if (params.row.status == "待审批") {
              if (this.$store.state.limitList.indexOf("2_1_3") >= 0) {
                if (params.row.shenhe == 1) {
                  return h("div", [
                    h(
                      "Button",
                      {
                        props: {
                          type: "success",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            this.$router.push({
                              name: "FinanceApprovalCrystalDetail",
                              params: {
                                userId: params.row.id
                              }
                            });
                          }
                        }
                      },
                      "审批"
                    )
                  ]);
                }
                if (params.row.shenhe == 2) {
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
                            // console.log(params.row.id);
                            this.$router.push({
                              name: "FinanceApprovalCrystalDetail",
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
              } else {
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
                          // console.log(params.row.id);
                          this.$router.push({
                            name: "FinanceApprovalCrystalDetail",
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
            } else {
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
                        // console.log(params.row.id);
                        this.$router.push({
                          name: "FinanceApprovalCrystalDetail",
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
          "/crystal/getRequestCrystalList.action",
          this.qs.stringify({
            pageNo: page,
            beginTime: this.start,
            endTime: this.end,
            realName: this.search.comment,
            requestStatus: this.search.status
          })
        )
        .then(res => {
          console.log(res);
          this.loading = false;
          if (res.data.status == 0) {
            $.each(res.data.data.list, function(key, val) {
              if (val.status == 0) {
                val.status = "待审批";
                this.operation = true;
              } else if (val.status == 1) {
                val.status = "申领成功";
              } else if (val.status == 2) {
                val.status = "申领失败";
              } else if (val.status == 3) {
                val.status = "已撤销";
              }
            });
            this.tableData1 = res.data.data.list;
            if (this.tableData1.length == 0) {
              this.pageState = false;
            } else {
              this.pageState = true;
            }
            this.totalCount = Number(res.data.data.totalCount);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 开始获取时间
    getData1(val) {
      this.start = val;
    },
    // 获取结束事件
    getData2(val) {
      this.end = val;
    },
    // 搜索
    searchDate() {
      this.current = 1;
      this.getTableDate();
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "财务审批",
      subNavigation: "水晶币申领审批",
      name: "FinanceApprovalCrystal",
      second: true,
      third: false
    });
    // 表格初始化，显示第一页
    this.getTableDate(1);
  }
};
</script>

<style scoped>
.apply {
  margin-bottom: 20px;
}
</style>