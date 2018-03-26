<template>
    <div>
        <Poptip placement="right" trigger="hover" content="次月5日00:00开始统计上个月消费状态为“正常”的消费订单。当月状态为“异常”的消费订单在用户补缴正常后所归属的月份进行结算。">
            <Icon type="information-circled" style="margin-right:10px;"></Icon>
        </Poptip>
        <form action="" method="post" id="form"></form>
        <div class="search-area clearfix">
            <Form ref="form" :model="form" :label-width="0">
                <input type='text' style='display:none'/>
                <ul class="ul">
                    <li class="li">
                        <label>公证机构：</label>
                        <FormItem class="formItem" prop="keywords">
                            <Input v-model="form.keywords" placeholder="公证机构名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>
                    </li> 
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <div class="fun-tool border-top">
            <p class="tip">发起申请提现的结算订单可前往“结算订单”查看订单详情。</p>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="JSON.stringify(this.resData) == '{}'"></Table>
        <Page :total="totalCount" :current="current" :page-size="pageSize" show-total @on-change="getTableDate" show-sizer :page-size-opts="[ 10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="this.resData.totalCount"></Page>
    </div>
</template>

<script>
    export default {
        computed: {
            basePath(){
                return this.$store.state.basePath + 'orgMonthSummary/exportOrder.action'
            },
        },
        data() {
            return {
                url:'',
                pageSize:15,
                // 总条数
                totalCount: 0,
                // 当前页码
                current: 1,
                resData:{},
                form:{
                    keywords:'',
                },
                // 表格
                columns1: [
                    {
                        title: '序号',
                        key:'seq',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公证机构',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '账单时间',
                        key: 'monthTime',
                        align: 'center',
                    },
                    {
                        title: '结算笔数',
                        key: 'orgPercentCount',
                        align: 'center',
                    },
                    {
                        title: '用户消费公证币（币）',
                        key: 'consumptionMoney',
                        align: 'center',
                    },
                    {
                        title: '用户抵扣水晶币（币）',
                        key: 'consumptionCrystalMoney',
                        align: 'center',
                    },
                    {
                        title: '公证保管费（元）',
                        key: 'orgPercentMoney',
                        align: 'center',
                    },
                    {
                        title: '法信分成金额（元）',
                        key: 'fxPercentMoney',
                        align: 'center',
                    },
                    {
                        title: '结算状态',
                        key: 'settlementStatus',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.settlementStatus) {
                            case '-1':
                                return h('span', '拒绝受理');break
                            case '-2':
                                return h('span', '已撤销');break
                            case '0':
                                return h('span', '未提现');break
                            case '1':
                                return h('span', '申请提现');break
                            case '2':
                                return h('span', '对账通过');break
                            case '3':
                                return h('span', '完成开票');break
                            case '4':
                                return h('span', '初审通过');break
                            case '5':
                                return h('span', '结算成功');break
                            case '-':
                                return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'center',
                        width : 180,
                        render: (h, params) => {
                            if(params.row.consumptionMoney == 0 && params.row.consumptionCrystalMoney == 0){
                                return h('div', '-')
                            }else{
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
                                                    name: 'CustodyUnfinishedDetail',
                                                    params: {
                                                        orgName: params.row.orgName,
                                                        monthTime: params.row.monthTime,
                                                    }
                                                })
                                            }
                                        }
                                    }, '账单明细'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.exportBilling(params.row.monthTime,params.row.orgName)
                                            }
                                        }
                                    }, '导出账单'),
                                ]);
                            }
                            
                        }
                    }
                ],
                tableData1: []
            }
        },
        methods: {
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 导出Excel弹窗-确定
            exportBilling(monthTime, orgName){
                this.$http.post('/orgMonthSummary/exportOrder.action', this.qs.stringify({
                    monthTime: monthTime,
                    orgName: orgName
                })).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.url =  this.basePath + '?monthTime=' + monthTime  + '&orgName=' + orgName
                        $('#form').attr({'action':this.url})
                        $('#form').submit()          
                    }
                }).catch(error => {
                    console.log(error);
                }) 
            },
            // 获取表格数据
            getTableDate(page) {
                this.current = page
                this.$http.get('/orgMonthSummary/queryOrder.action', {params:{
                    orgName: this.form.keywords,
                    orgId: '',//此参数公证处后台用到，这里不用
                    settlementStatus: '0',
                    pageNo: page,
                    pageSize: this.pageSize,
                }}).then(response => {
                    if (response.data.code == 200) {
                        console.log(response)
                        this.resData =  response.data.data
                        this.tableData1 = response.data.data.list
                        this.totalCount = Number(response.data.data.totalCount)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '公证保管账单',
                thirdNavigation: '未结算完结账单',
                secondName: 'CustodyUnfinished',
                second: true,
                third: true,
            });
            // 表格初始化，显示第一页
            this.getTableDate(1)
        },
    }
</script>

<style>
</style>