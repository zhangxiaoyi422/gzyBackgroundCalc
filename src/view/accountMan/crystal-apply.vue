<template>
  <div class="refundQuery-detail detail-page relative">
    <div class="order-info">
      <ul>
        <li class="li1 normal">
          <Icon type="information-circled"></Icon>申请领取
        </li>
      </ul>
    </div>
    <div class="information">
      <div class="panel-title">
        <Poptip trigger="hover" content='每月1日，系统自动向运营部的“可赠送体验水晶币余额”加入水晶币100000.00币'>
          申请信息&nbsp;
          <Icon type="information-circled" color="#2D8CF0"></Icon>
        </Poptip>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <input type='text' style='display:none' />
        <FormItem label="水晶币" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入正整数" class="input" :maxlength="9"></Input>
          <span>币</span>
        </FormItem>
        <FormItem label="申请说明" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入申请说明，最多500个字符"></Input>
        </FormItem>
      </Form>
      <div class="panel-title">
        审批人员
        <Button class="button" @click="openBox" type="primary">选择</Button>
      </div>
    </div>
    <div class="table">
      <Table :columns="columns1" :data="selectList"></Table>
    </div>
    <div class="nextButton">
      <Button class="button" type="primary" @click="submit('formValidate')" :loading="boxLoading2">提交申请</Button>
      <Button class="button" @click="back">取消</Button>
    </div>
    <Modal v-model="modal1" title="审批人员" @on-ok="ok" @on-cancel="cancel" :loading="boxLoading">
      <div>
        <div class="boxButton">
          <span>
            <Button type="primary" @click="selectDepartment('')">全部</Button>
          </span>
          <span v-for="item in department" style="margin-right: 5px;">
            <Button type="primary" @click="selectDepartment(item)">{{item}}</Button>
          </span>
        </div>
        <Table highlight-row ref="selection" height="200" :columns="columns4" :data="data1" @on-current-change="selectData"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.userId,
      currentRow: "",
      formValidate: {
        name: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入水晶币数量",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              if (!/^[1-9]\d*$/.test(value)) {
                callback("请输入正整数");
              }
              if (value > 999999999) {
                callback("金额不能超过999999999");
              }
              callback(errors);
            }
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入申请说明",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              if (value.length > 500) {
                callback("不得超过500个字符");
              }
              callback(errors);
            }
          }
        ]
      },
      modal1: false,
      //   所有部门
      department: [],
      deptName: "",
      columns4: [
        {
          title: "部门",
          key: "deptName",
          width: 158
        },
        {
          title: "岗位",
          key: "postName",
          width: 158
        },
        {
          title: "用户名",
          key: "realName",
          width: 158
        }
      ],
      columns1: [
        {
          title: "审批部门",
          key: "deptName"
        },
        {
          title: "审批岗位",
          key: "postName"
        },
        {
          title: "审批人员",
          key: "realName"
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
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      selectList: [],
      boxLoading: true,
      boxLoading2: false,
      storageNo: ""
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "Crystal"
      });
    },
    openBox() {
      this.$http
        .post(
          "/crystal/checkCrystal.action",
          this.qs.stringify({
            url: "crystal/auditCrystal.action",
            deptName: this.deptName
          })
        )
        .then(res => {
          this.modal1 = true;
          var _this = this;
          console.log(res.data.data.list);
          $.each(res.data.data.list, function(key, val) {
            if (val.deptName != null) {
              if (_this.department.indexOf(val.deptName) == -1) {
                _this.department.push(val.deptName);
              }
            }
            if (val.userId == _this.storageNo) {
              val._highlight = true;
            }
          });
          this.data1 = res.data.data.list;
        });
    },
    selectDepartment(val) {
      console.log(val);
      this.$http
        .post(
          "/crystal/checkCrystal.action",
          this.qs.stringify({
            url: "crystal/auditCrystal.action",
            deptName: val
          })
        )
        .then(res => {
          this.data1 = res.data.data.list;
        });
    },
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
    },
    ok() {
      this.storageNo = this.currentRow.userId;
      console.log(this.storageNo);
      this.selectList = [];
      this.selectList.push(this.currentRow);
      if (this.selectList.length == 0) {
        this.$Message.error({
          content: "请选择审批人员！",
          duration: 1,
          onClose: () => {
            this.changeLoading();
          }
        });
      }
      if (this.selectList.length > 0) {
        this.boxLoading = false;
        this.modal1 = false;
      }
    },
    cancel() {},
    // 选择表单数据
    selectData(currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.boxLoading2 = true;
          if (this.storageNo != "") {
            this.$http
              .post(
                "crystal/addCrystalMoney.action",
                this.qs.stringify({
                  token: this.formValidate.name,
                  comment: this.formValidate.desc,
                  reviewedId: this.storageNo
                })
              )
              .then(res => {
                console.log(res);
                if (res.data.status == 0) {
                  this.$Message.success("提交成功");
                  this.$router.push({
                    name: "CrystalRevokeDetail",
                    params: {
                      userId: res.data.data.id
                    }
                  });
                } else {
                  this.$Message.error("提交失败");
                }
              });
          } else {
            this.$Message.error({
              content: "请选择审批人员！",
              duration: 1,
              onClose: () => {
                this.boxLoading2 = false;
              }
            });
          }
        }
      });
      //   console.log(this.formValidate.name);
      //   console.log(this.formValidate.desc);
      //   console.log(this.userId);
    },
    remove() {
      this.selectList = [];
      this.storageNo = "";
    },
    back() {
      this.$router.push({
        name: "Crystal"
      });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "申领水晶币申请",
      thirdNavigation: "申请",
      name: "Crystal",
      secondName: "CrystalDetails",
      second: true,
      third: true
    });
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

.information {
  width: 600px;
  margin: 0 auto;
}

.input {
  float: left;
  width: 90%;
  margin-right: 15px;
}

.button {
  margin-left: 10px;
}

.boxButton {
  margin-bottom: 10px;
}

.table {
  width: 600px;
  margin: 0 auto;
}

.nextButton {
  margin-top: 100px;
  text-align: center;
}
.ivu-table table {
  table-layout: auto;
}
</style>
