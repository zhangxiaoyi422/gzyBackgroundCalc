<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <div class="panel-title">
                <span>可赠送水晶币余额{{accountCoin}}币</span>
                <Button type="primary" size="large" @click="go" class="fr" style="margin-right:50px;" v-if="gift">前往申领</Button>
            </div>
        </div>
        <div class="button clearfix">
            <div class="fl left">
                <span>类型：</span>
                <Button :type="bt1" @click="getDate('','a')">全部</Button>
                <Button :type="bt2" @click="getDate('0','b')">支出</Button>
                <Button :type="bt3" @click="getDate('1','c')">收入</Button>
            </div>
            <div class="fl">
                <span>最近：</span>
                <Button :type="bt4" @click="getDay('WEEK','d')">7天</Button>
                <Button :type="bt5" @click="getDay('MONTH','e')">1个月</Button>
                <Button :type="bt6" @click="getDay('THREEMONTH','f')">3个月</Button>
                <Button :type="bt7" @click="getDay('YEAR','g')">1年</Button>
            </div>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current" v-if="pageState"></Page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      bt1: "primary",
      bt2: "ghost",
      bt3: "ghost",
      bt4: "primary",
      bt5: "ghost",
      bt6: "ghost",
      bt7: "ghost",
      // table加载效果
      loading: true,
      gift: false,
      //   分页当前页
      current: 1,
      // 总条数
      totalCount: 0,
      accountCoin: 0,
      // 表格
      columns1: [
        {
          title: "类型",
          key: "status",
          align: "center"
        },
        {
          title: "成交时间",
          key: "applyTime",
          align: "center"
        },
        {
          title: "水晶币变动",
          key: "coin",
          align: "center"
        },
        {
          title: "可赠送水晶币余额",
          key: "leftCoin",
          align: "center"
        },
        {
          title: "说明",
          key: "descripion",
          align: "center"
        }
      ],
      tableData1: [],
      pageState: true,
      status: "",
      day: "WEEK"
    };
  },
  methods: {
    go() {
      // Crystal
      this.$router.push({
        name: "Crystal"
      });
    },
    getDay(val, type) {
      this.day = val;
      if (type == "d") {
        this.bt4 = "primary";
        this.bt5 = "ghost";
        this.bt6 = "ghost";
        this.bt7 = "ghost";
      }
      if (type == "e") {
        this.bt4 = "ghost";
        this.bt5 = "primary";
        this.bt6 = "ghost";
        this.bt7 = "ghost";
      }
      if (type == "f") {
        this.bt4 = "ghost";
        this.bt5 = "ghost";
        this.bt6 = "primary";
        this.bt7 = "ghost";
      }
      if (type == "g") {
        this.bt4 = "ghost";
        this.bt5 = "ghost";
        this.bt6 = "ghost";
        this.bt7 = "primary";
      }
      this.getTableDate();
    },
    getDate(val, type) {
      this.status = val;
      console.log(type);
      if (type == "a") {
        this.bt1 = "primary";
        this.bt2 = "ghost";
        this.bt3 = "ghost";
      }
      if (type == "b") {
        this.bt1 = "ghost";
        this.bt2 = "primary";
        this.bt3 = "ghost";
      }
      if (type == "c") {
        this.bt1 = "ghost";
        this.bt2 = "ghost";
        this.bt3 = "primary";
      }
      this.getTableDate();
    },
    init() {
      this.day = "";
      this.status = "";
    },
    // 获取表格数据
    getTableDate(page) {
      this.$http
        .post(
          "/crystal/giveCrystalBalanceList.action",
          this.qs.stringify({
            pageNo: page,
            status: this.status,
            timeInterval: this.day
          })
        )
        .then(res => {
          console.log(res.data.data.list);
          this.loading = false;
          $.each(res.data.data.list, function(key, val) {
            if (val.status == 0) {
              val.status = "支出";
              val.coin = "-" + val.coin;
            }
            if (val.status == 1) {
              val.status = "收入";
              val.coin = "+" + val.coin;
            }
          });
          this.tableData1 = res.data.data.list;
          if (this.tableData1.length == 0) {
            this.pageState = false;
          } else {
            this.pageState = true;
          }
          this.totalCount = Number(res.data.data.totalCount);
          this.accountCoin = res.data.data.accountCoin;
        });
    }
  },
  mounted() {
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "运营管理",
      subNavigation: "体验赠送水晶币",
      name: "CrystalGiftBalance",
      second: true,
      third: false
    });
    // 表格初始化，显示第一页
    this.getTableDate(1);
    console.log(this.$store.state.limitList);
    for (let i = 0; i < this.$store.state.limitList.length; i++) {
      if (this.$store.state.limitList[i] == "1_4_2") {
        console.log(1);
        this.gift = true;
      }
    }
  }
};
</script>

<style scoped>
.button {
  border-top: 1px solid #e9eaec;
  padding-top: 30px;
}
.left {
  margin-right: 50px;
  margin-bottom: 20px;
}
</style>