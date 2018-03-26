<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="search.comment" placeholder="申请说明" style="width: 200px" autofocus="autofocus" @keyup.native.13&&108="searchDate"></Input>
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
        <div class="apply" v-if="applyState">
            <Button type="primary" @click="apply">申领水晶币</Button>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" v-bind:current="this.current" v-if="pageState"></Page>
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
      applyState: false,
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
              if (this.$store.state.limitList.indexOf("1_4_2") >= 0) {
                if (params.row.faqi == 1) {
                  return h("div", [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            this.$router.push({
                              name: "CrystalRevokeDetail",
                              params: {
                                userId: params.row.id
                              }
                            });
                          }
                        }
                      },
                      "撤销"
                    )
                  ]);
                }
                if (params.row.faqi == 2) {
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
                            // console.log(params.row.status);
                            this.$router.push({
                              name: "CrystalDetail",
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
                          // console.log(params.row.status);
                          this.$router.push({
                            name: "CrystalDetail",
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
                        // console.log(params.row.status);
                        this.$router.push({
                          name: "CrystalDetail",
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
            Comment: this.search.comment,
            requestStatus: this.search.status
          })
        )
        .then(res => {
          console.log(res);
          console.log(this.$store.state.limitList);
          this.loading = false;
          for (let i = 0; i < this.$store.state.limitList.length; i++) {
            if (this.$store.state.limitList[i] == "1_4_2") {
              this.applyState = true;
            }
          }
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
          } else {
            // console.log(res.data.message);
            this.$Message.error(res.data.message);
          }
        });
    },
    apply() {
      this.$router.push({
        name: "CrystalApply"
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
      this.getTableDate(1);
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "申领水晶币申请",
      name: "Crystal",
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