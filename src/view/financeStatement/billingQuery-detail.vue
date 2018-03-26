<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title clearfix">
            <ul>
                <li>订单号：{{resData.orderNums}}</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>申请时间</th>
                    <th>开票时间</th>
                    <th>审核人员</th>
                    <th>开票状态</th>
                    <th>累计消费公证币（币）</th>
                    <th>累计消费金额（元）</th>
                    <th>发票号码</th>
                    <th>发票类型</th>
                </tr>
                <tr>
                    <td>{{resData.applyDate}}</td>
                    <td>{{resData.endDate}}</td>
                    <td>{{resData.auditName}}</td>
                    <td>
                        <span v-if="resData.status == '2'">开票完成</span>
                        <span v-if="resData.status == '3'">已邮寄</span>
                        <span v-if="resData.status == '-'">-</span>
                    </td>
                    <td>{{resData.notaryCurrency}}</td>
                    <td>{{resData.money}}</td>
                    <td>{{resData.invoiceNum}}</td>
                    <td>
                        <span v-if="resData.invoiceType == '1'">增值税普通发票</span>
                        <span v-if="resData.invoiceType == '2'">增值税专用发票</span>
                        <span v-if="resData.invoiceType == '-'">-</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="panel-title clearfix">
            <ul>
                <li>消费明细</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>所属月份</th>
                    <th>累计消费公证币（币）</th>
                    <th>累计消费金额（元）</th>
                    <th>发票号码</th>
                </tr>
                <tr>
                    <td>{{resData.yearDate}}</td>
                    <td>{{resData.notaryCurrency}}</td>
                    <td>{{resData.money}}</td>
                    <td>{{resData.invoiceNum}}</td>
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
                    <th>发票抬头</th>
                    <th>邮寄方式（到付）</th>
                    <th>邮寄单号</th>
                </tr>
                <tr>
                    <td>{{resData.loginName}}</td>
                    <td>
                        <span v-if="resData.registerResource == '1'">公证云网站</span>
                        <span v-if="resData.registerResource == '2'">公证云APP</span>
                        <span v-if="resData.registerResource == '3'">第三方网站</span>
                        <span v-if="resData.registerResource == '4'">微信城市服务</span>
                        <span v-if="resData.registerResource == '5'">weui版微信</span>
                        <span v-if="resData.registerResource == '6'">建行城市服务</span>
                        <span v-if="resData.registerResource == '7'">H5版本在线受理</span>
                        <span v-if="resData.registerResource == '8'">支付宝城市服务</span>
                        <span v-if="resData.registerResource == '9'">公证录音</span>
                        <span v-if="resData.registerResource == '10'">公证签约</span>
                        <span v-if="resData.registerResource == '11'">知识产权</span>
                        <span v-if="resData.registerResource == '12'">新浪</span>
                        <span v-if="resData.registerResource == '13'">旗舰店注册</span>
                        <span v-if="resData.registerResource == '-'">-</span>
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
                    <td>
                        <span v-if="resData.invoiceTitle == '2'">个人</span>
                        <span v-if="resData.invoiceTitle == '4'">机构</span>
                        <span v-if="resData.invoiceTitle == '-'">-</span>
                    </td>
                    <td>
                        <span v-if="resData.postType == '0'">EMS</span>
                        <span v-if="resData.postType == '1'">顺丰速运</span>
                        <span v-if="resData.postType == '-'">-</span>
                    </td>
                    <td>{{resData.expressNumber}}</td>
                </tr>
            </table>
        </div>
        <div>
            <div class="panel-title">
                开票流程
            </div>
            <div class="panel-word">
                <ul v-for="item in resData.operationDetails">
                    <li>{{item.operation}}</li>
                </ul>
            </div>
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
                this.$http.get('/invoice/invoiceReportDetail.action', {params:{
                    invoiceId: this.$route.params.invoiceId
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
            // 返回列表
            returnToList() {
                this.$router.push({
                    name: 'BillingQuery'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '开票查询',
                thirdNavigation: '详情',
                name: 'BillingQuery',
                second: true,
                third: true,
            });
            console.log(this.$route.params.invoiceId)
            this.getData()
        }
    }
</script>

<style scoped>

</style>