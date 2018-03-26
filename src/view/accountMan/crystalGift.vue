<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="search.comment" placeholder="用户名/用户名称" style="width: 200px" autofocus="autofocus" @keyup.native.13&&108="searchDate"></Input>
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
        <div class="apply" v-if="gift">
            <Button type="primary" @click="apply">赠送水晶币</Button>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current" v-if="pageState"></Page>
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
          label: "赠送成功"
        },
        {
          value: "2",
          label: "赠送失败"
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
          title: "用户名",
          key: "userName",
          align: "center"
        },
        {
          title: "用户名称",
          key: "userRealName",
          align: "center"
        },
        {
          title: "赠送水晶币",
          key: "token",
          align: "center"
        },
        {
          title: "申请时间",
          key: "applyTime",
          align: "center"
        },
        {
          title: "审批时间",
          key: "reviewedDate",
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
              if (this.$store.state.limitList.indexOf("1_3_1_3") >= 0) {
                if (params.row.shenhe == 1) {
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
                                name: "CrystalGiftDetail",
                                params: {
                                  userId: params.row.accountId
                                }
                              });
                            }
                          }
                        },
                        "撤销"
                      ),
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
                                name: "CrystalGiftDetailAuditing",
                                params: {
                                  userId: params.row.accountId
                                }
                              });
                            }
                          }
                        },
                        "审批"
                      )
                    ]);
                  } else {
                    return h("div", [
                      h(
                        "Button",
                        {
                          props: {
                            type: "success",
                            size: "small"
                          },
                          on: {
                            click: () => {
                              this.$router.push({
                                name: "CrystalGiftDetailAuditing",
                                params: {
                                  userId: params.row.accountId
                                }
                              });
                            }
                          }
                        },
                        "审批"
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
                              name: "CrystalGiftDetail",
                              params: {
                                userId: params.row.accountId
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
                            // 通过url参数传递用户id
                            // console.log(params.row.status);
                            this.$router.push({
                              name: "CrystalGiftDetail",
                              params: {
                                userId: params.row.accountId
                              }
                            });
                          }
                        }
                      },
                      "撤销"
                    )
                  ]);
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
                              name: "CrystalGiftDetail",
                              params: {
                                userId: params.row.accountId
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
                          name: "CrystalGiftDetail",
                          params: {
                            userId: params.row.accountId
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
      pageState: true,
      gift: false
    };
  },
  methods: {
    // 获取表格数据
    getTableDate(page) {
      this.current = page;
      this.$http
        .post(
          "/crystal/giveCrystalList.action",
          this.qs.stringify({
            pageNo: page,
            beginTime: this.start,
            endTime: this.end,
            userName: this.search.comment,
            userRealName: this.search.comment,
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
                val.status = "赠送成功";
              } else if (val.status == 2) {
                val.status = "赠送失败";
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
            console.log(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    apply() {
      this.$router.push({
        name: "CrystalGiftStep1"
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
      primaryNavigation: "运营管理",
      subNavigation: "体验赠送水晶币",
      name: "CrystalGift",
      second: true,
      third: false
    });
    // 表格初始化，显示第一页
    this.getTableDate(1);
    console.log(this.$store.state.limitList);
    for (let i = 0; i < this.$store.state.limitList.length; i++) {
      if (this.$store.state.limitList[i] == "1_3_1_2") {
        console.log(1);
        this.gift = true;
      }
    }
  }
};
</script>

<style scoped>
.apply {
  margin-bottom: 20px;
}
</style>