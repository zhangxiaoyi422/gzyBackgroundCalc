<template>
    <div>
        <form action="" method="post" id="form"></form>
        <div class="search-area clearfix">
            <Form ref="form" :model="form" :label-width="0">
                <ul class="ul">
                    <li class="li">
                        <label>查询日期：</label>
                        <FormItem class="formItem" prop="start">
                            <DatePicker type="date" placeholder="请选择日期" style="width: 200px" v-model="form.start" @on-clear="handleClearStart"></DatePicker>&nbsp;至&nbsp;
                        </FormItem>
                        <FormItem class="formItem" prop="end">
                            <DatePicker type="date" placeholder="请选择日期" style="width: 200px" v-model="form.end" @on-clear="handleClearEnd"></DatePicker>
                        </FormItem>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                        <Button type="primary" @click="searchArea_reset('form')">重置</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <div class="fun-tool border-top">
            <p class="tip"><Icon type="information-circled" style="margin-right:10px"></Icon>每日账单会在次日2点左右生成。</p>
            <span style="margin-right:20px">用户消费金额&nbsp;&nbsp;合计（元）：{{resData.totalMoney}}</span>
            <span>公证机构分成金额&nbsp;&nbsp;合计（元）：{{resData.totalOrgMoney}}</span>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="totalCount" :current="current" :page-size="pageSize" show-total @on-change="jumpToPage" show-sizer :page-size-opts="[ 10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="showPage"></Page>
    </div>
</template>

<script>
    import {today,yesterday,sevenDays,thirtyDays} from './../../assets/js/getDate.js'
    export default {
        computed: {
            basePath(){
                return this.$store.state.basePath + 'notarySummary/exportOrder.action'
            },
        },
        data() {
            return {
                url:'',
                // 是否显示分页，默认显示
                showPage: true,
                pageSize:15,
                // 总条数
                totalCount: 0,
                // 当前页码
                current: 1,
                resData:{},
                form:{
                    // 开始日期
                    start: '',
                    // 结束日期
                    end: '',
                },
                // 表格
                loading: true,
                columns1: [{
                        title: '日期',
                        key: 'dayTime',
                        align: 'center',
                    },
                    {
                        title: '用户消费笔数',
                        key: 'consumptionCount',
                        align: 'center',
                    },
                    {
                        title: '用户消费金额（元）',
                        key: 'consumptionMoney',
                        align: 'center',
                    },
                    {
                        title: '公证机构分成笔数',
                        key: 'orgPercentCount',
                        align: 'center',
                    },
                    {
                        title: '公证机构分成金额（元）',
                        key: 'orgPercentMoney',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'center',
                        width : 160,
                        render: (h, params) => {
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
                                                name: 'ProportionDetail',
                                                params: {
                                                    dayTime: params.row.dayTime
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.exportBilling(params.row.dayTime)
                                        }
                                    }
                                }, '导出日账单'),
                            ]);
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
            exportBilling(dayTime){
                console.log(dayTime)
                this.$http.post('/notarySummary/exportOrder.action', this.qs.stringify({
                    dayTime: dayTime,
                })).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.url =  this.basePath + '?dayTime=' + dayTime 
                        $('#form').attr({'action':this.url})
                        $('#form').submit()          
                    }
                }).catch(error => {
                    console.log(error);
                }) 
            },
            // 清空日期
            handleClearStart(){
                this.form.start = thirtyDays().t1
                this.btn_today = 'ghost'
                this.btn_yesterday = 'ghost'
                this.btn_aWeek = 'ghost'
                this.btn_aMonth = 'ghost'
            },
            // 清空日期
            handleClearEnd(){
                this.form.end = thirtyDays().t2
                this.btn_today = 'ghost'
                this.btn_yesterday = 'ghost'
                this.btn_aWeek = 'ghost'
                this.btn_aMonth = 'ghost'
            },
            // 选择时间段 今天 昨天 前7天 前30天
            chooseDateHandle(timeSlot){
                let dateObj = {}
                switch (timeSlot) {
                    case 'today':
                        this.btn_today = 'primary'
                        this.btn_yesterday = 'ghost'
                        this.btn_aWeek = 'ghost'
                        this.btn_aMonth = 'ghost'
                        dateObj = today()
                        this.form.start = dateObj.t1
                        this.form.end = dateObj.t2
                        break
                    case 'yesterday':
                        this.btn_today = 'ghost'
                        this.btn_yesterday = 'primary'
                        this.btn_aWeek = 'ghost'
                        this.btn_aMonth = 'ghost'
                        dateObj = yesterday()
                        this.form.start = dateObj.t1
                        this.form.end = dateObj.t2
                        break
                    case 'aWeek':
                        this.btn_today = 'ghost'
                        this.btn_yesterday = 'ghost'
                        this.btn_aWeek = 'primary'
                        this.btn_aMonth = 'ghost'
                        dateObj = sevenDays()
                        this.form.start = dateObj.t1
                        this.form.end = dateObj.t2
                        break
                    case 'aMonth':
                        this.btn_today = 'ghost'
                        this.btn_yesterday = 'ghost'
                        this.btn_aWeek = 'ghost'
                        this.btn_aMonth = 'primary'
                        dateObj = thirtyDays()
                        this.form.start = dateObj.t1
                        this.form.end = dateObj.t2
                        break
                }
            },
            // 重置
            searchArea_reset(name){
                this.$refs[name].resetFields()
                this.form.start = thirtyDays().t1
                this.form.end = thirtyDays().t2
            },
            // 分页跳转
            jumpToPage(page){
                this.getTableDate(page,this.order)
            },
            // 获取表格数据
            getTableDate(page,order) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.get('/notarySummary/queryOrder.action', {params:{
                    beginTime: this.form.start,
                    endTime: this.form.end,
                    pageNo: page,
                    pageSize: this.pageSize,
                }}).then(response => {
                    if (response.data.code == 200) {
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        console.log(response)
                        this.resData =  response.data.data
                        this.tableData1 = response.data.data.list
                        this.totalCount = Number(response.data.data.totalCount)
                        this.loading = false    
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '公证处分成汇总',
                name: 'Proportion',
                second: true,
            });
            // 默认显示最近30天数据
            this.chooseDateHandle('aMonth')
            // 表格初始化，显示第一页
            this.getTableDate(1)
        },
    }
</script>

<style>
</style>