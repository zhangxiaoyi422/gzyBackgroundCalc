<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>申请日期：</label>
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" :value="start" @on-change="getStartDate"></DatePicker>&nbsp;至&nbsp;
                    <DatePicker type="date" placeholder="请选择日期" style="width: 200px" :value="end" @on-change="getEndDate"></DatePicker>
                </li>
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="refundAccount" placeholder="用户名" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                </li>
                <li class="li">
                    <label>用户类型：</label>
                    <Select v-model="model1" style="width:200px;">
                            <Option v-for="item in userType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </li>
                <li class="li">
                    <label>状态：</label>
                    <Select v-model="model2" style="width:200px">
                            <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </li>
                <li class="li">
                    <Button type="primary" @click="getTableDate(1)">查询</Button>
                </li>
            </ul>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="totalCount" :page-size="15" :current="current" show-total @on-change="getTableDate" v-if="showPage"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 是否显示分页，默认显示
                showPage: true,
                // 总条数
                totalCount: 0,
                // 当前页码
                current: 1,
                // 开始日期
                start: '',
                // 结束日期
                end: '',
                // 订单状态
                status: '',
                // 退款数额
                refundAccount: '',
                // 用户类型select
                userType: [{
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '个人'
                    },
                    {
                        value: '4',
                        label: '企业'
                    },
                    {
                        value: '6',
                        label: '政府'
                    },
                ],
                model1: '0',
                status: [{
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '处理中'
                    },
                    {
                        value: '2',
                        label: '退款完成'
                    },
                    {
                        value: '3',
                        label: '退款失败'
                    },
                ],
                model2: '0',
                // 表格
                loading: true,
                columns1: [{
                        title: '申请时间',
                        key: 'applyTime',
                        align: 'center',
                    },
                    {
                        title: '用户类型',
                        key: 'userType',
                        align: 'center',
                    },
                    {
                        title: '用户名',
                        key: 'refundAccount',
                        align: 'center',
                    },
                    {
                        title: '退款金额（元）',
                        key: 'refundMoney',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.status == '处理中') {
                                // 有权限显示审批
                                if (this.$store.state.limitList.indexOf("2_2_3") >= 0) {
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'success',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        name: 'RefundApprovalDetail',
                                                        params: {
                                                            userId: params.row.id
                                                        }
                                                    })
                                                }
                                            }
                                        }, '审批'),
                                    ]);
                                } else {
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        name: 'RefundApprovalDetail',
                                                        params: {
                                                            userId: params.row.id
                                                        }
                                                    })
                                                }
                                            }
                                        }, '查看'),
                                    ]);
                                }
                            } else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                // params 是一个对象，有三个参数。row：当前行数据。column：当前列数据 和 index：当前是第几行
                                                // tableData1:[]中，id没有接收，但是params.row.id里面有.id不显示，但可以找到这个属性。
                                                // this.$http.post('/refund/getRefundDetail.action', this.qs.stringify({
                                                //     id: params.row.id,
                                                // })).then(response => {
                                                // });
                                                // 通过url参数传递用户id
                                                // console.log(params.row.id)
                                                this.$router.push({
                                                    name: 'RefundApprovalDetail',
                                                    params: {
                                                        userId: params.row.id
                                                    }
                                                })
                                            }
                                        }
                                    }, '查看'),
                                ]);
                            }
                        }
                    }
                ],
                tableData1: []
            }
        },
        methods: {
            getStartDate(date) {
                this.start = date;
            },
            getEndDate(date) {
                this.end = date;
            },
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.post('/refund/getRefund.action', this.qs.stringify({
                    start: this.start,
                    end: this.end,
                    refundAccount: this.refundAccount,
                    userType: this.model1,
                    status: this.model2,
                    pageNo: page,
                    pageSize: 15
                })).then(response => {
                    if (response.data.status == 0) {
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        console.log(response)
                        $.each(response.data.data.list, function(key, val) {
                            if (val.userType == 2) {
                                val.userType = "个人";
                            } else if (val.userType == 4) {
                                val.userType = "企业";
                            } else if ((val.userType == 6)) {
                                val.userType = "政府";
                            }
                            if (val.status == 1) {
                                val.status = "处理中";
                            } else if (val.status == 2) {
                                val.status = "退款完成";
                            } else if ((val.status == 3)) {
                                val.status = "退款失败";
                            } else if ((val.status == 4)) {
                                val.status = "处理中";
                            }
                        })
                        this.tableData1 = response.data.data.list;
                        this.totalCount = Number(response.data.data.totalCount);
                        this.loading = false     
                    }else{
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务审批',
                subNavigation: '公证币退款审批',
                name: 'RefundApproval',
                second: true,
                third: false
            });
            // 表格初始化，显示第一页
            this.getTableDate(1)
        },
    }
</script>

<style>

</style>