<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title clearfix">
            <ul>
                <li>订单号：{{resData.orderNum}}</li>
                <li>支付订单号：{{resData.payNum}}</li>
                <li>支付方式：
                    <span v-if="resData.payType == 'ALIPAY'">支付宝</span>
                    <span v-if="resData.payType == '-'">-</span>
                </li>
                <li>充值类型：
                    <span v-if="resData.rechargeType == '0'">预充值</span>
                    <span v-if="resData.rechargeType == '1'">消费充值</span>
                    <span v-if="resData.rechargeType == '2'">补缴欠币</span>
                    <span v-if="resData.rechargeType == '-'">-</span>
                </li>
                <li class="fr">（单位：元）</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>充值时间</th>
                    <th>充值金额</th>
                    <th>支付手续费率</th>
                    <th>支付手续费</th>
                    <th>实际收入金额</th>
                </tr>
                <tr>
                    <td>{{resData.finishedPayingTime}}</td>
                    <td>{{resData.money}}</td>
                    <td>{{resData.payRate}}</td>
                    <td>{{resData.poundage}}</td>
                    <td>{{resData.income}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title clearfix">
            <ul>
                <li>用户信息</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>用户名</th>
                    <th>注册来源</th>
                    <th>用户类型</th>
                    <th>充值金额（元）</th>
                    <th>充值公证币（币）</th>
                    <th>公证币余额（币）</th>
                    <th>水晶币余额（币）</th>
                </tr>
                <tr>
                    <td>{{resData.createUser}}</td>
                    <td>
                        <span v-if="resData.userResource == '1'">公证云网站</span>
                        <span v-if="resData.userResource == '2'">公证云APP</span>
                        <span v-if="resData.userResource == '3'">第三方网站</span>
                        <span v-if="resData.userResource == '4'">微信城市服务</span>
                        <span v-if="resData.userResource == '5'">weui版微信</span>
                        <span v-if="resData.userResource == '6'">建行城市服务</span>
                        <span v-if="resData.userResource == '7'">H5版本在线受理</span>
                        <span v-if="resData.userResource == '8'">支付宝城市服务</span>
                        <span v-if="resData.userResource == '9'">公证录音</span>
                        <span v-if="resData.userResource == '10'">公证签约</span>
                        <span v-if="resData.userResource == '11'">知识产权</span>
                        <span v-if="resData.userResource == '12'">新浪</span>
                        <span v-if="resData.userResource == '13'">旗舰店注册</span>
                        <span v-if="resData.userResource == '-'">-</span>
                    </td>
                    <td>
                        <span v-if="resData.userType == '2'">个人用户</span>
                        <span v-if="resData.userType == '3'">电子送达用户</span>
                        <span v-if="resData.userType == '4'">机构用户</span>
                        <span v-if="resData.userType == '5'">公证书查询用户</span>
                        <span v-if="resData.userType == '6'">中介机构用户</span>
                        <span v-if="resData.userType == '15'">第三方用户</span>
                        <span v-if="resData.userType == '-'">-</span>
                    </td>
                    <td>{{resData.money}}</td>
                    <td>{{resData.orderToken}}</td>
                    <td>{{resData.modifyAfterToken}}</td>
                    <td>{{resData.crystalAfter}}</td>
                </tr>
            </table>
        </div>
        <div class="btn-wrapper">
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spinShow: true,
                resData: {},
            }
        },
        methods: {
            // 获取详情数据
            getData() {
                this.$http.get('/recharge/order/rechargeDetail.action', {params:{
                    orderSequence: this.$route.params.orderSequence
                }}).then(response => {
                    if (response.data.code == 200) {
                        console.log(response)
                        console.log(response)
                        console.log(response)
                        this.resData = response.data.data
                        this.spinShow = false
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            // 返回公证币退款审批列表
            returnToList() {
                this.$router.push({
                    name: 'NotaryCurrCharge'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '公证币充值查询',
                thirdNavigation: '详情',
                name: 'NotaryCurrCharge',
                second: true,
                third: true,
            });
            this.getData()
        }
    }
</script>

<style scoped>

</style>