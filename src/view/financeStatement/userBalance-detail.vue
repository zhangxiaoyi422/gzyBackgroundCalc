<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>日期</th>
                    <th>用户名</th>
                    <th>注册来源</th>
                    <th>用户类型</th>
                    <th>公证币余额（币）</th>
                    <th>水晶币余额（币）</th>
                    <th>是否欠币</th>
                    <th>冻结币（币）</th>
                </tr>
                <tr>
                    <td>{{resData.nowTime}}</td>
                    <td>{{resData.accountName}}</td>
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
                    <td>{{resData.token}}</td>
                    <td>{{resData.present}}</td>
                    <td>
                        <span v-if="resData.debt == '0'">已欠币</span>
                        <span v-if="resData.debt == '1'">未欠币</span>
                        <span v-if="resData.debt == '-'">-</span>
                    </td>
                    <td>{{resData.frostMoney}}</td>
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
                this.$http.post('/am/ajax/findById.action', this.qs.stringify({
                    accountUserId: this.$route.params.accountUserId
                })).then(response => {
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
                    name: 'UserBalance'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '用户余额查询',
                thirdNavigation: '详情',
                name: 'UserBalance',
                second: true,
                third: true,
            });
            this.getData()
        }
    }
</script>

<style scoped>

</style>