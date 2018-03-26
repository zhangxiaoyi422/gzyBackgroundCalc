<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title clearfix">
            <ul>
                <li>订单号：{{resData.requestOrder}}</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>赠送时间</th>
                    <th>赠送水晶币（币）</th>
                    <th>赠送说明</th>
                </tr>
                <tr>
                    <td>{{resData.reviewedDate}}</td>
                    <td>{{resData.token}}</td>
                    <td>{{resData.comment}}</td>
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
                </tr>
                <tr>
                    <td>{{resData.userName}}</td>
                    <td>
                        <span v-if="resData.userRegisterResource == '1'">公证云网站</span>
                        <span v-if="resData.userRegisterResource == '2'">公证云APP</span>
                        <span v-if="resData.userRegisterResource == '3'">第三方网站</span>
                        <span v-if="resData.userRegisterResource == '4'">微信城市服务</span>
                        <span v-if="resData.userRegisterResource == '5'">weui版微信</span>
                        <span v-if="resData.userRegisterResource == '6'">建行城市服务</span>
                        <span v-if="resData.userRegisterResource == '7'">H5版本在线受理</span>
                        <span v-if="resData.userRegisterResource == '8'">支付宝城市服务</span>
                        <span v-if="resData.userRegisterResource == '9'">公证录音</span>
                        <span v-if="resData.userRegisterResource == '10'">公证签约</span>
                        <span v-if="resData.userRegisterResource == '11'">知识产权</span>
                        <span v-if="resData.userRegisterResource == '12'">新浪</span>
                        <span v-if="resData.userRegisterResource == '13'">旗舰店注册</span>
                        <span v-if="resData.userRegisterResource == '-'">-</span>
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
                this.$http.get('/crystal/crystalReportDetail.action', {params:{
                    AccountId: this.$route.params.accountId
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
                    name: 'CrystalPresented'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '水晶币赠送查询',
                thirdNavigation: '详情',
                name: 'CrystalPresented',
                second: true,
                third: true,
            });
            this.getData()
        }
    }
</script>

<style scoped>

</style>