<template>
    <div>
        <form action="" method="post" id="form"></form>
        <div class="search-area clearfix">
            <Form ref="form" :model="form" :rules="ruleCustom" :label-width="0">
                <ul class="ul">
                    <li class="li">
                        <label>关键字搜索：</label>
                        <FormItem class="formItem" prop="keywords">
                            <Input v-model="form.keywords" placeholder="公证机构" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>
                    </li> 
                    <li class="li">
                        <label>分成笔数：</label>
                        <FormItem class="formItem" prop="minMoneyToken">
                            <Input v-model="form.minMoneyToken" placeholder="" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>&nbsp;-&nbsp;
                        </FormItem>
                        <FormItem class="formItem" prop="maxMoneyToken">
                            <Input v-model="form.maxMoneyToken" placeholder="" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>                        
                    </li>
                    <li class="li">
                        <label>分成金额：</label>
                        <FormItem class="formItem" prop="minMoneyCry">
                            <Input v-model="form.minMoneyCry" placeholder="￥" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>&nbsp;-&nbsp;
                        </FormItem>
                        <FormItem class="formItem" prop="maxMoneyCry">
                            <Input v-model="form.maxMoneyCry" placeholder="￥" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>
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
            <span>{{this.$route.params.dayTime}}&nbsp;&nbsp;公证机构分成金额 &nbsp;&nbsp;合计（元）：{{resData.totalOrgMoney}}</span>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="totalCount" :current="current" :page-size="pageSize" show-total @on-change="jumpToPage" show-sizer :page-size-opts="[ 10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="showPage"></Page>
        <Modal v-model="showProportionBox" @on-cancel="showProportion_cancleTop" :title="proportionBoxTitle">
            <div style="margin:0 0 20px 0;font-size:16px">
                {{this.$route.params.dayTime}}&nbsp;&nbsp;合计（元）：{{resData2.totalOrgMoney}}
            </div>
            <div style="height:300px;overflow-y:auto;overflow-x:hidden">
                <Table :columns="columns2" :data="tableData2"></Table>
            </div>
            <div slot="footer">
            </div>
        </Modal>
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
            const validateMinMoneyToken = (rule, value, callback) => {
                if (this.form.minMoneyToken.replace(/ /g, "") == '') {
                    callback()
                }else{
                    let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/
                    if(reg.test(this.form.minMoneyToken) == false){
                        callback(new Error('格式有误'));
                    }else{
                        if(this.form.maxMoneyToken){
                            if(Number(this.form.minMoneyToken) > Number(this.form.maxMoneyToken)){
                                callback(new Error('范围有错'));
                            }
                            callback();
                        }
                        callback();
                    }
                }
            };
            const validateMaxMoneyToken = (rule, value, callback) => {
                if (this.form.maxMoneyToken.replace(/ /g, "") == '') {
                    callback()
                }else{
                    let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/
                    if(reg.test(this.form.maxMoneyToken) == false){
                        callback(new Error('格式有误'));
                    }else{
                        if(this.form.minMoneyToken){
                            this.$refs.form.validateField('minMoneyToken');
                        }
                        callback();
                    }
                }
            };
            const validateMinMoneyCry = (rule, value, callback) => {
                if (this.form.minMoneyCry.replace(/ /g, "") == '') {
                    callback()
                }else{
                    let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/
                    if(reg.test(this.form.minMoneyCry) == false){
                        callback(new Error('格式有误'));
                    }else{
                        if(this.form.maxMoneyCry){
                            if(Number(this.form.minMoneyCry) > Number(this.form.maxMoneyCry)){
                                callback(new Error('范围有错'));
                            }
                            callback();
                        }
                        callback();
                    }
                }
            };
            const validateMaxMoneyCry = (rule, value, callback) => {
                if (this.form.maxMoneyCry.replace(/ /g, "") == '') {
                    callback()
                }else{
                    let reg = /^([1-9]\d*|0)(\.\d{1,2})?$/
                    if(reg.test(this.form.maxMoneyCry) == false){
                        callback(new Error('格式有误'));
                    }else{
                        if(this.form.minMoneyCry){
                            this.$refs.form.validateField('minMoneyCry')
                        }
                        callback();
                    }
                }
            };
            return {
                // 弹窗
                showProportionBox:false,
                proportionBoxTitle:'',
                ruleCustom: {
                    minMoneyToken: [
                        { required: true, validator: validateMinMoneyToken, trigger: 'blur' }
                    ],
                    maxMoneyToken: [
                        { required: true, validator: validateMaxMoneyToken, trigger: 'blur' }
                    ],
                    minMoneyCry: [
                        { required: true, validator: validateMinMoneyCry, trigger: 'blur' }
                    ],
                    maxMoneyCry: [
                        { required: true, validator: validateMaxMoneyCry, trigger: 'blur' }
                    ]
                },
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
                    minMoneyToken: '',
                    maxMoneyToken: '',
                    minMoneyCry: '',
                    maxMoneyCry: '',
                    keywords: '',
                },
                // 表格
                loading: true,
                columns1: [{
                        title: '公证机构',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '分成笔数',
                        key: 'orgPercentCount',
                        align: 'center',
                    },
                    {
                        title: '分成金额（元）',
                        key: 'orgPercentMoney',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'center',
                        width : 200,
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
                                            this.showProportion(params.row.orgName)
                                        }
                                    }
                                }, '分成明细'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.exportBilling(params.row.orgName)
                                        }
                                    }
                                }, '导出日账单'),
                            ]);
                        }
                    }
                ],
                tableData1: [],
                columns2: [
                    {
                        title: '证据类型',
                        key: 'evidType',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.evidType) {
                                case '1':
                                    return h('span', '网页取证');break
                                case '2':
                                    return h('span', '版权保护');break
                                case '4':
                                    return h('span', '电话录音');break
                                case '5':
                                    return h('span', '手机拍照');break
                                case '6':
                                    return h('span', '手机录像');break
                                case '7':
                                    return h('span', '邮件证据');break
                                case '8':
                                    return h('span', '现场录音');break
                                case '9':
                                    return h('span', '文档证据');break
                                case '10':
                                    return h('span', '电子签约');break
                                case '11':
                                    return h('span', '图片存证');break
                                case '12':
                                    return h('span', '知识产权');break
                                case '13':
                                    return h('span', '短信证据');break
                                case '14':
                                    return h('span', '直播录像');break
                                case '15':
                                    return h('span', '手机屏幕录像');break
                                case '20':
                                    return h('span', '见证实录');break
                                case '-':
                                    return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '分成比例',
                        key: 'orgPercent',
                        align: 'center',
                    },
                    {
                        title: '分成笔数',
                        key: 'orgPercentCount',
                        align: 'center',
                    },
                    {
                        title: '分成金额',
                        key: 'orgPercentMoney',
                        align: 'center',
                    },
                ],
                tableData2: [],
                resData2:''
            }
        },
        methods: {
            // 公证处分成明细弹窗
            showProportion(orgName){
                this.showProportionBox = true
                this.proportionBoxTitle = orgName + '分成明细' 
                this.$http.get('/notarySummary/queryOrderDetailList.action', {params:{
                    dayTime: this.$route.params.dayTime,
                    orgName: orgName,
                }}).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        this.resData2 = response.data.data
                        this.tableData2 = response.data.data.list
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            showProportion_cancleTop(){
                this.showProportionBox = false
            },
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 导出Excel弹窗-确定
            exportBilling(orgName){
                this.$http.post('/notarySummary/exportOrder.action', this.qs.stringify({
                    dayTime: this.$route.params.dayTime,
                    orgName: orgName,
                })).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.url =  this.basePath + '?dayTime=' + this.$route.params.dayTime  + '&orgName=' + orgName
                        $('#form').attr({'action':this.url})
                        $('#form').submit()          
                    }
                }).catch(error => {
                    console.log(error);
                }) 
            },
            // 重置
            searchArea_reset(name){
                this.$refs[name].resetFields()
            },
            // 分页跳转
            jumpToPage(page){
                this.getTableDate(page,this.order)
            },
            // 获取表格数据
            getTableDate(page,order) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.get('/notarySummary/queryOrderDetail.action', {params:{
                    dayTime: this.$route.params.dayTime,
                    keywords: this.form.keywords,
                    minPercentCount: this.form.minMoneyToken,
                    maxPercentCount: this.form.maxMoneyToken,
                    minMoney: this.form.minMoneyCry,
                    maxMoney: this.form.maxMoneyCry,
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
                thirdNavigation: '详情',
                name: 'Proportion',
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