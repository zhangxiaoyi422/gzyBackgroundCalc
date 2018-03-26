<template>
    <div class="refundQuery-detail detail-page">
        <div class="order-info">
            <ul>
                <li class="li1 normal">
                    <Icon type="information-circled"></Icon>申请赠送
                </li>
            </ul>
        </div>
        <div class="panel-title">
            赠送水晶币用户
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <input type='text' style='display:none'/>
            <FormItem label="用户类型：">
                <RadioGroup v-model="accountType">
                    <Radio label="person">个人用户</Radio>
                    <Radio label="org">机构主账号</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="用户名或手机号：" prop="name" v-if="accountType == 'person'">
                <Input v-model="formValidate.name" placeholder="请输入完整用户名或手机号" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="用户名或邮箱：" prop="name" v-if="accountType == 'org'">
                <Input v-model="formValidate.name" placeholder="请输入完整用户名或邮箱" style="width:300px;"></Input>
            </FormItem>
            <div class="btn-wrapper">
                <Button class="button" type="primary" @click="submit('formValidate')">查询</Button>
                <Button class="button" type="primary" @click="remove">重置</Button>
            </div>
        </Form>
        <div class="Button">
        </div>
        <div class="panel-title">
            共{{dataNumber}}条查询结果
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
                    <span v-if="businessNum1">
                        企业名称：{{unitName}}
                        </span>
                    <span v-if="businessNum2">
                        政府全称：{{unitName}}
                        </span>
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
                    对公账号：{{openingBank}}&nbsp;{{bankAccount}}
                </div>
                <div class="li">
                    联系人：{{realName}}
                </div>
                <div class="li">
                    手机号码：{{mobile}}
                </div>
            </div>
        </div>
        <div v-if="gift">
            <div class="panel-title">
                赠送消息
            </div>
            <div class="order-info">
                <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="100">
                    <FormItem label="赠送水晶币：" prop="token">
                        <Input v-model="formValidate2.token" placeholder="输入正整数" class="input" :maxlength="9"></Input>
                        <span>币</span>
                       
                    </FormItem>
                     <FormItem style="margin-bottom:0">
                       <div>可赠送水晶币余额：<span class="leftCoin">{{leftCoin}}</span>币</div>
                    </FormItem>
                    <FormItem label="赠送说明：" prop="Comment">
                        <RadioGroup v-model="formValidate2.Comment">
                            <div>
                                <Radio label="reason1">公证员体验业务，公证机构：<span class="location">{{Locations}}</span></Radio>
                                <Button class="button" @click="searchLocation('鹭江公证处')">选择公证处</Button>
                            </div>
                            <div>
                                <Radio label="reason2">合作用户，体验业务</Radio>
                            </div>
                            <div>
                                <Radio label="reason3">演示或体验线上业务。</Radio>
                            </div>
                            <div>
                                <Radio label="reason4">研发部，测试或体验线上业务</Radio>
                            </div>
                            <div>
                                <Radio label="reason5">其他:</Radio>
                                <Input placeholder="最多30个汉字" style="width: 240px" class="in1" :maxlength="30"></Input>
                            </div>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
            <div class="panel-title">
                审批人员
                <Button class="button" @click="openBox2" type="primary">选择</Button>
            </div>
            <div class="table">
                <Table :columns="columns1" :data="selectLists"></Table>
            </div>
        </div>
        <div class="nextButton">
            <Button class="button" type="primary" @click="modal3=true" v-if="gift">提交申请</Button>
            <Button class="button" type="primary" @click="back">返回</Button>
        </div>
        <Modal v-model="modal1" title="选择公证处" @on-ok="ok1" @on-cancel="cancel1" :loading="boxLoading">
            <Input v-model="search" placeholder="请输入公证机构名称" style="width: 405px"></Input>
            <Button type="primary" @click="searchLocation('search')" :loading="loading" class="fr">搜索</Button>
            <div style="margin-top:10px;" class="buttons">
                <Button type="ghost" size="small" class="ALL" @click="openBox1('ALL')">全国</Button>
                <Button type="ghost" size="small" class="A" @click="openBox1('A')">A</Button>
                <Button type="ghost" size="small" class="B" @click="openBox1('B')">B</Button>
                <Button type="ghost" size="small" class="C" @click="openBox1('C')">C</Button>
                <Button type="ghost" size="small" class="D" @click="openBox1('D')">D</Button>
                <Button type="ghost" size="small" class="E" @click="openBox1('E')">E</Button>
                <Button type="ghost" size="small" class="F" @click="openBox1('F')">F</Button>
                <Button type="ghost" size="small" class="G" @click="openBox1('G')">G</Button>
                <Button type="ghost" size="small" class="H" @click="openBox1('H')">H</Button>
                <Button type="ghost" size="small" class="I" @click="openBox1('I')">I</Button>
                <Button type="ghost" size="small" class="J" @click="openBox1('J')">J</Button>
                <Button type="ghost" size="small" class="K" @click="openBox1('K')">K</Button>
                <Button type="ghost" size="small" class="L" @click="openBox1('L')">L</Button>
                <Button type="ghost" size="small" class="M" @click="openBox1('M')">M</Button>
                <Button type="ghost" size="small" class="N" @click="openBox1('N')">N</Button>
                <Button type="ghost" size="small" class="O" @click="openBox1('O')">O</Button>
                <Button type="ghost" size="small" class="P" @click="openBox1('P')">P</Button>
                <Button type="ghost" size="small" class="Q" @click="openBox1('Q')">Q</Button>
                <Button type="ghost" size="small" class="R" @click="openBox1('R')">R</Button>
                <Button type="ghost" size="small" class="S" @click="openBox1('S')">S</Button>
                <Button type="ghost" size="small" class="T" @click="openBox1('T')">T</Button>
                <Button type="ghost" size="small" class="U" @click="openBox1('U')">U</Button>
                <Button type="ghost" size="small" class="V" @click="openBox1('V')">V</Button>
                <Button type="ghost" size="small" class="W" @click="openBox1('W')">W</Button>
                <Button type="ghost" size="small" class="X" @click="openBox1('X')">X</Button>
                <Button type="ghost" size="small" class="Y" @click="openBox1('Y')">Y</Button>
                <Button type="ghost" size="small" class="Z" @click="openBox1('Z')">Z</Button>
            </div>
            <div class="content">
                <span v-for="item in searchData">
                    <Button type="ghost" v-bind:class="item.orgId" @click="chooseLocation(item.orgName,item.orgId)">{{item.orgName}}</Button>
                </span>
            </div>
        </Modal>
        <Modal v-model="modal2" title="审批人员" @on-ok="ok2" @on-cancel="cancel2" :loading="boxLoading">
            <div>
                <div class="boxButton">
                    <span style="margin-bottom:5px">
                        <Button type="primary" @click="selectDepartment('')">全部</Button>
                    </span>
                    <span v-for="item in department" style="margin-right: 5px;margin-bottom:5px">
                        <Button type="primary" @click="selectDepartment(item)">{{item}}</Button>
                    </span>
                </div>
                <Table highlight-row ref="selection" height="200" :columns="columns4" :data="data1" @on-current-change="selectData"></Table>
            </div>
        </Modal>
        <Modal v-model="modal3" title="提示" @on-ok="ok3('formValidate2')">
            <p>提交后不能修改。确定提交？</p>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
    accountType:'person',
      reason1: "公证员体验业务，公证机构：",
      reason2: "合作用户，体验业务",
      reason3: "演示或体验线上业务。",
      reason4: "研发部，测试或体验线上业务",
      reason5: "其他：",
      text: "",
      modal1: false,
      modal2: false,
      modal3: false,
      userId: this.$route.params.userId,
      formValidate: {
        name: ""
      },
      formValidate2: {
        token: "",
        Comment: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        token: [
          {
            required: true,
            type: "string",
            message: "请输入",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              if (!/^[1-9]\d*$/.test(value)) {
                callback("请输入正整数");
              }
              if (Number(value) > $(".leftCoin").text()) {
                callback("超过可赠送水晶币余额");
              }
              callback(errors);
            }
          }
        ],
        Comment: [
          {
            required: true,
            message: "请选择赠送说明",
            trigger: "change"
          },
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              if (value == "reason1") {
                if (
                  $(".location")
                    .text()
                    .trim() == ""
                ) {
                  callback("请选择公证处");
                }
              }
              if (value == "reason5") {
                if (
                  $(".in1 .ivu-input")
                    .val()
                    .trim() == ""
                ) {
                  callback("请输入其他原因");
                }
                if (
                  $(".in1 .ivu-input")
                    .val()
                    .trim().length > 30
                ) {
                  callback("最多30个汉字");
                }
              }
              callback(errors);
            }
          }
        ]
      },
      dataNumber: 0,
      gift: false,
      //   gift: true,
      perNoReal: false,
      perReal: false,
      GNoReal: false,
      GReal: false,
      businessType1: false,
      businessType2: false,
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
      leftCoin: "",
      //   box1
      search: "",
      Location: "",
      Locations: "",
      searchData: [],
      //   box2
      storageNo: "",
      data1: [],
      boxLoading: true,
      loading: false,
      deptName: "",
      department: [],
      columns4: [
        {
          title: "部门",
          key: "deptName",
          width: 163
        },
        {
          title: "岗位",
          key: "postName",
          width: 163
        },
        {
          title: "用户名",
          key: "realName",
          width: 160
        }
      ],
      selectList: [],
      selectLists: [],
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
                      this.selectLists = [];
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    selectDepartment(val) {
      console.log(val);
      this.$http
        .post(
          "/crystal/checkCrystal.action",
          this.qs.stringify({
            url: "crystal/auditGiveCrystal.action",
            deptName: val
          })
        )
        .then(res => {
          console.log(res);
          this.data1 = res.data.data.list;
        });
    },
    back() {
      this.$router.push({
        name: "Crystal"
      });
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            let accountType ;
            if(this.accountType == 'person'){
                accountType = '2'
            }else{
                accountType = '4'
            }
          this.$http
            .post(
              "crystal/getUserInfo.action",
              this.qs.stringify({
                userAccont: this.formValidate.name,
                userType: accountType
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.errCode == 0) {
                this.gift = true;
                this.dataNumber = 1;
                this.loginName = res.data.data.loginName;
                this.registerResource = res.data.data.registerResource;
                this.realName = res.data.data.realName;
                this.realNameType = res.data.data.realNameType;
                this.mobile = res.data.data.mobile;
                this.email = res.data.data.email;
                this.userIdType = res.data.data.userIdType;
                this.userCard = res.data.data.userCard;
                this.isRealName = res.data.data.isRealName;
                this.businessNum = res.data.data.businessNum;
                this.openingBank = res.data.data.openingBank;
                this.bankAccount = res.data.data.bankAccount;
                this.unitName = res.data.data.unitName;
                this.userType = res.data.data.userType;
                this.businessType = res.data.data.businessType;
                this.idCard = res.data.data.idCard;
                this.leftCoin = res.data.data.leftCoin;
              }
              this.init();
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
              if (this.businessType == 1) {
                this.businessNum1 = true;
                this.businessNum2 = false;
              }
              if (this.businessType == 2) {
                this.businessNum1 = false;
                this.businessNum2 = true;
              }
              if (res.data.errCode == 1) {
                this.dataNumber = 0;
                this.perNoReal = false;
                this.perReal = false;
                this.GNoReal = false;
                this.GReal = false;
                this.gift = false;
              }
            });
        }
      });
    },
    ok3(name) {
      this.submit2(name);
    },
    init() {
      this.perNoReal = false;
      this.perReal = false;
      this.GNoReal = false;
      this.GReal = false;
    },
    submit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.selectList.length == 0) {
            this.$Message.warning("请选择审批人员");
          } else {
            if (this.formValidate2.Comment == "reason1") {
              this.formValidate2.Comment =
                "公证员体验业务，公证机构：" +
                $(".location")
                  .text()
                  .trim();
            }
            if (this.formValidate2.Comment == "reason2") {
              this.formValidate2.Comment = "合作用户，体验业务";
            }
            if (this.formValidate2.Comment == "reason3") {
              this.formValidate2.Comment = "演示或体验线上业务。";
            }
            if (this.formValidate2.Comment == "reason4") {
              this.formValidate2.Comment = "研发部，测试或体验线上业务";
            }
            if (this.formValidate2.Comment == "reason5") {
              this.formValidate2.Comment =
                "其他：" +
                $(".in1 .ivu-input")
                  .val()
                  .trim();
            }
            console.log(this.formValidate2.token);
            console.log(this.formValidate2.Comment);
            console.log(this.storageNo);
            console.log(this.loginName);
            this.$http
              .post(
                "/crystal/giveCrystalToUser.action",
                this.qs.stringify({
                  token: this.formValidate2.token,
                  Comment: this.formValidate2.Comment,
                  allianceUserId: this.storageNo,
                  userName: this.loginName
                })
              )
              .then(res => {
                console.log(res);
                if (res.data.status == 0) {
                  this.$Message.success(res.data.message);
                  this.$router.push({
                    name: "CrystalGiftDetail",
                    params: {
                      userId: res.data.data.id
                    }
                  });
                } else {
                  this.$Message.error(res.data.message);
                }
              });
          }
        }
      });
    },
    remove() {
      this.formValidate.name = "";
    },
    back() {
      this.$router.push({
        name: "CrystalGift"
      });
    },
    searchLocation(val) {
      if (val == "search") {
        if (this.search == "") {
          val = "";
        } else {
          val = this.search;
        }
      }
      console.log(val);
      this.$http
        .post(
          "/crystal/findAllOrgLikeName.action",
          this.qs.stringify({
            orgName: val
          })
        )
        .then(res => {
          console.log(111);
          console.log(res);
          console.log(111);
          this.modal1 = true;
          if (res.data.status == 0) {
            this.searchData = res.data.data.list;
            console.log(this.searchData);
          } else {
            this.loading = true;
            this.searchData = [];
            this.$Message.error({
              content: res.data.message,
              duration: 1,
              onClose: () => {
                this.loading = false;
              }
            });
          }
        });
    },
    openBox1(val) {
      if (val == "") {
        val = "ALL";
      }
      this.$http
        .post(
          "/crystal/orgForLetter.action",
          this.qs.stringify({
            spelling: val
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.searchData = res.data.data.list;
          console.log(this.searchData);
        });
      val = "." + val;
      $(val)
        .addClass("ivu-btn-primary")
        .removeClass("ivu-btn-ghost")
        .siblings()
        .addClass("ivu-btn-ghost")
        .removeClass("ivu-btn-primary");
      console.log(val);
    },
    chooseLocation(val, id) {
      id = "." + id;
      console.log(id);
      $(id)
        .addClass("ivu-btn-primary")
        .removeClass("ivu-btn-ghost")
        .parent()
        .siblings()
        .children()
        .addClass("ivu-btn-ghost")
        .removeClass("ivu-btn-primary");
      this.Location = val;
    },
    ok1() {
      this.search = "";
      if (this.Location.length == 0) {
        this.$Message.error({
          content: "请选择公证处！",
          duration: 1,
          onClose: () => {
            this.changeLoading();
          }
        });
      } else {
        $(".buttons button")
          .addClass("ivu-btn-ghost")
          .removeClass("ivu-btn-primary");
        $(".content span button")
          .addClass("ivu-btn-ghost")
          .removeClass("ivu-btn-primary");
        this.Locations = this.Location;
        this.boxLoading = false;
        this.modal1 = false;
      }
    },
    cancel1() {
      this.search = "";
      $(".buttons button")
        .addClass("ivu-btn-ghost")
        .removeClass("ivu-btn-primary");

      $(".content span button")
        .addClass("ivu-btn-ghost")
        .removeClass("ivu-btn-primary");
    },
    openBox2() {
      this.$http
        .post(
          "/crystal/checkCrystal.action",
          this.qs.stringify({
            url: "crystal/auditGiveCrystal.action",
            deptName: this.deptName
          })
        )
        .then(res => {
          this.modal2 = true;
          var _this = this;
          console.log(res.data.data);
          $.each(res.data.data.list, function(key, val) {
            if (_this.selectLists.length > 0) {
              if (_this.selectLists[0].userId == val.userId) {
                val._highlight = true;
              }
            }
            if (val.deptName != null) {
              if (_this.department.indexOf(val.deptName) == -1) {
                _this.department.push(val.deptName);
              }
            }
          });
          this.data1 = res.data.data.list;
        });
    },
    ok2() {
      if (this.selectList.length == 0) {
        // this.$Message.error("请选择审批人员！");
        // return this.changeLoading();
        this.$Message.error({
          content: "请选择审批人员！",
          duration: 1,
          onClose: () => {
            this.changeLoading();
          }
        });
      } else {
        this.selectLists = this.selectList;
        this.boxLoading = false;
        this.modal2 = false;
      }
    },
    cancel2() {
      this.department = [];
      this.selectList = [];
      this.storageNo = "";
    },
    // 选择表单数据
    selectData(currentRow, oldCurrentRow) {
      this.storageNo = currentRow.userId;
      this.selectList = [];
      this.selectList.push(currentRow);
    },
    remove2() {
      this.selectList = [];
      this.storageNo = "";
    },
    changeLoading() {
      this.boxLoading = false;
      this.$nextTick(() => {
        this.boxLoading = true;
      });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "体验赠送水晶币",
      thirdNavigation: "申请",
      name: "CrystalGift",
      secondName: "CrystalGiftStep1",
      second: true,
      third: true
    });
  }
};
</script>

<style scoped>
.panel-word td {
  width: 100px;
}
.change {
  margin-left: 15px;
}
.information {
  width: 800px;
  margin: 0 auto;
}
.button {
  margin-left: 10px;
}
.button button {
  margin-bottom: 10px;
}

.boxButton {
  margin-bottom: 10px;
}
.nextButton {
  margin-top: 100px;
  text-align: center;
}
.input {
  float: left;
  width: 90%;
  margin-right: 15px;
}
.content {
  min-height: 100px;
  background: #f7f7f7;
  margin-top: 10px;
}
.buttons button {
  margin-bottom: 5px;
}
.content button {
  margin: 2px;
  width: 158px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.boxButton span {
  margin-bottom: 10px;
}
</style>