<template>
    <div class="refundQuery-detail detail-page relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-title clearfix">
            <ul>
                <li>证据编号：{{resData.evidNo}}</li>
                <li>证据类型：{{resData.evidType}}</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>主叫时间</th>
                    <th>第三方平台通话时长</th>
                    <th>第三方平台实际计费时长（分）</th>
                </tr>
                <tr>
                    <td>{{resData.callInTime}}</td>
                    <td>{{resData.thirdPartySecond}}</td>
                    <td>{{resData.thirdPartyMinute}}</td>
                </tr>
            </table>
        </div>
        <div class="panel-title clearfix">
            <ul>
                <li>电话呼叫信息</li>
            </ul>
        </div>
        <div class="panel-word no-padding">
            <table class="center">
                <tr>
                    <th>主叫号码</th>
                    <th>被叫号码</th>
                    <th>主叫号码归属</th>
                    <th>被叫是否接通</th>
                    <th>被叫号实际通话时长</th>
                    <th>用户通话计费时长（分钟）</th>
                </tr>
                <tr>
                    <td>{{resData.comingPhone}}</td>
                    <td>{{resData.calledPhone}}</td>
                    <td>{{resData.realName}}</td>
                    <td>{{resData.getThrough}}</td>
                    <td>{{resData.calledPhoneTime}}</td>
                    <td>{{resData.duration}}</td>
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
                    <th>被叫是否接通</th>
                    <th>被叫号实际通话时长</th>
                    <th>公证币余额（币）</th>
                    <th>水晶币余额（币）</th>
                </tr>
                <tr>
                    <td>{{resData.parentAccount}}</td>
                    <td>{{resData.account}}</td>
                    <td>{{resData.resource}}</td>
                    <td>{{resData.userType}}</td>
                    <td>{{resData.getThrough}}</td>
                    <td>{{resData.calledPhoneTime}}</td>
                    <td>{{resData.token}}</td>
                    <td>{{resData.present}}</td>
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
                this.$http.post('/tel/ajax/TelRecording.action', this.qs.stringify({
                    callInTime: this.$route.params.callInTime,
                    evidNo: this.$route.params.evidNo,
                    resource: this.$route.params.resource,
                    userType: this.$route.params.userType,
                    account: this.$route.params.account,
                    parentAccount: this.$route.params.parentAccount,
                    evidType: this.$route.params.evidType,
                    comingPhone: this.$route.params.comingPhone,
                    calledPhone: this.$route.params.calledPhone,
                    calledPhoneTime: this.$route.params.calledPhoneTime,
                    thirdPartyMinute: this.$route.params.thirdPartyMinute,
                    thirdPartySecond: this.$route.params.thirdPartySecond,
                    getThrough: this.$route.params.getThrough,
                    duration: this.$route.params.duration,
                    realName: this.$route.params.realName
                })).then(response => {
                    if (response.data.code == 200) {
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
                    name: 'PhoneRecording'
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '电话录音成本查询',
                thirdNavigation: '详情',
                name: 'PhoneRecording',
                second: true,
                third: true,
            });
            this.getData()
        }
    }
</script>

<style scoped>

</style>