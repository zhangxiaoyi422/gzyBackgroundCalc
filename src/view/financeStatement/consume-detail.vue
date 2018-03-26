<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title clearfix">
            <ul>
                <li>订单号：{{resData.orderSequence}}</li>
                <li>证据编号：{{resData.orderStorageNumber}}</li>
                <li>证据类型：
                    <span v-if="resData.evidType  == '1'">网页取证</span>
                    <span v-if="resData.evidType  == '2'">版权保护</span>
                    <span v-if="resData.evidType  == '4'">电话录音</span>
                    <span v-if="resData.evidType  == '5'">手机拍照</span>
                    <span v-if="resData.evidType  == '6'">手机录像</span>
                    <span v-if="resData.evidType  == '7'">邮件证据</span>
                    <span v-if="resData.evidType  == '8'">现场录音</span>
                    <span v-if="resData.evidType  == '9'">文档证据</span>
                    <span v-if="resData.evidType  == '10'">电子签约</span>
                    <span v-if="resData.evidType  == '11'">图片存证</span>
                    <span v-if="resData.evidType  == '12'">知识产权</span>
                    <span v-if="resData.evidType  == '13'">短信证据</span>
                    <span v-if="resData.evidType  == '14'">直播录像</span>
                    <span v-if="resData.evidType  == '15'">手机屏幕录像</span>
                    <span v-if="resData.evidType  == '20'">见证实录</span>
                    <span v-if="resData.evidType  == '-'">-</span>
                </li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>消费时间</th>
                    <th>实际消费总额（币）</th>
                    <th>实际消费公证币（币）</th>
                    <th>实际消费水晶币（币）</th>
                    <th>实际消费金额（元）</th>
                    <th>消费订单状态</th>
                    <th>完成时间</th>
                </tr>
                <tr>
                    <td>{{resData.createDate}}</td>
                    <td>{{resData.totalToken}}</td>
                    <td>{{resData.orderToken}}</td>
                    <td>{{resData.crystalMoney}}</td>
                    <td>{{resData.orderTokenMoney}}</td>
                    <td>
                        <span v-if="resData.serviceState == '0'">正常</span>
                        <span v-if="resData.serviceState == '1'">异常</span>
                        <span v-if="resData.serviceState == '-'">-</span>
                    </td>
                    <td>{{resData.orderValidTime}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title clearfix">
            <ul>
                <li>公证机构：{{resData.orderOrgName}}</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>所属公证机构</th>
                    <th>公证机构分成比例</th>
                    <th>实际消费公证币（币）</th>
                    <th>实际消费金额（元）</th>
                    <th>公证机构分成公证币（币）</th>
                    <th>公证机构分成金额（元）</th>
                    <th>法信分成公证币（币）</th>
                    <th>法信分成金额（元）</th>
                </tr>
                <tr>
                    <td>{{resData.orderOrgName}}</td>
                    <td>{{resData.percent}}</td>
                    <td>{{resData.orderToken}}</td>
                    <td>{{resData.orderTokenMoney}}</td>
                    <td>{{resData.orgPercentToken}}</td>
                    <td>{{resData.orgPercentTokenMoney}}</td>
                    <td>{{resData.fxPercentToken}}</td>
                    <td>{{resData.fxPercentTokenMoney}}</td>
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
                    <th>操作用户</th>
                    <th>注册来源</th>
                    <th>用户类型</th>
                    <th>实际消费水晶币（币）</th>
                    <th>实际消费公证币（币）</th>
                    <th>公证币余额（币）</th>
                    <th>水晶币余额（币）</th>
                    <th>欠公证币（币）</th>
                </tr>
                <tr>
                    <td>{{resData.orderAccount}}</td>
                    <td>{{resData.orderChildAccount}}</td>
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
                    <td>{{resData.crystalMoney}}</td>
                    <td>{{resData.orderToken}}</td>
                    <td>{{resData.modifyValueAfter}}</td>
                    <td>{{resData.crystalAfter}}</td>
                    <td>{{resData.token}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title clearfix">
            <ul>
                <li>证据消费详情</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>证据编号</th>
                    <th>证据类型</th>
                    <th>单价</th>
                    <th>单位</th>
                    <th>数量</th>
                    <th>实际消费总额（币）</th>
                </tr>
                <tr>
                    <td>{{resData.orderStorageNumber}}</td>
                    <td>
                        <span v-if="resData.evidType  == '1'">网页取证</span>
                        <span v-if="resData.evidType  == '2'">版权保护</span>
                        <span v-if="resData.evidType  == '4'">电话录音</span>
                        <span v-if="resData.evidType  == '5'">手机拍照</span>
                        <span v-if="resData.evidType  == '6'">手机录像</span>
                        <span v-if="resData.evidType  == '7'">邮件证据</span>
                        <span v-if="resData.evidType  == '8'">现场录音</span>
                        <span v-if="resData.evidType  == '9'">文档证据</span>
                        <span v-if="resData.evidType  == '10'">电子签约</span>
                        <span v-if="resData.evidType  == '11'">图片存证</span>
                        <span v-if="resData.evidType  == '12'">知识产权</span>
                        <span v-if="resData.evidType  == '13'">短信证据</span>
                        <span v-if="resData.evidType  == '14'">直播录像</span>
                        <span v-if="resData.evidType  == '15'">手机屏幕录像</span>
                        <span v-if="resData.evidType  == '20'">见证实录</span>
                        <span v-if="resData.evidType  == '-'">-</span>
                    </td>
                    <td>{{resData.unitPrice}}</td>
                    <td>{{resData.unit}}</td>
                    <td>{{resData.number}}</td>
                    <td>{{resData.totalToken}}</td>
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
                console.log(this.$route.params.accountHistoryId)
                this.$http.get('/consumption/order/queryOrderDetail.action', {params:{
                    accountHistoryId: this.$route.params.accountHistoryId
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
                    name: 'Consume'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '消费查询',
                thirdNavigation: '详情',
                name: 'Consume',
                second: true,
                third: true,
            });
            this.getData()
        }
    }
</script>

<style scoped>

</style>