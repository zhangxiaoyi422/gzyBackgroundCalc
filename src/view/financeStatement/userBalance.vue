<template>
    <div>
        <form action="" method="post" id="form"></form>
        <div class="search-area clearfix">
            <Form ref="form" :model="form" :rules="ruleCustom" :label-width="0">
                <ul class="ul">
                    <li class="li">
                        <label>关键字搜索：</label>
                        <FormItem class="formItem" prop="keywords">
                            <Input v-model="form.keywords" placeholder="用户名" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>
                    </li>            
                    <li class="li">
                        <label>公证币余额：</label>
                        <FormItem class="formItem" prop="minMoneyToken">
                            <Input v-model="form.minMoneyToken" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>&nbsp;-&nbsp;
                        </FormItem>
                        <FormItem class="formItem" prop="maxMoneyToken">
                            <Input v-model="form.maxMoneyToken" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>                        
                    </li>
                    <li class="li">
                        <label>水晶币余额：</label>
                        <FormItem class="formItem" prop="minMoneyCry">
                            <Input v-model="form.minMoneyCry" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>&nbsp;-&nbsp;
                        </FormItem>
                        <FormItem class="formItem" prop="maxMoneyCry">
                            <Input v-model="form.maxMoneyCry" style="width: 80px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem> 
                    </li>
                    <li class="li">
                        <label>是否欠币：</label>
                        <FormItem class="formItem" prop="debtDefault"> 
                            <Select v-model="form.debtDefault" style="width:200px;">
                                <Option v-for="item in form.debt" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <label>用户类型：</label>
                        <FormItem class="formItem" prop="userTypeDefault"> 
                            <Select v-model="form.userTypeDefault" style="width:200px">
                                <Option v-for="item in form.userType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <label>注册来源：</label>
                        <FormItem class="formItem" prop="userResourceDefault"> 
                            <Select v-model="form.userResourceDefault" style="width:200px">
                                <Option v-for="item in form.userResource" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                        <Button type="primary" @click="searchArea_reset('form')">重置</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <div class="fun-tool border-top clearfix">
            <div class="fr">
                <Button type="primary" @click="exportExcel">导出excel</Button>
                <Button type="primary" @click="settingShowItem">设置显示</Button>
            </div>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading" @on-sort-change="sort"></Table>
        <Page :total="totalCount" :current="current" :page-size="pageSize" show-total @on-change="jumpToPage" show-sizer :page-size-opts="[ 10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="showPage"></Page>
        <Modal v-model="exportExcelBox" title="导出选择项" @on-cancel="exportExcelBox_cancelTop" width="680" class="exportExcelBox">
            <div class="exportItem">
                <Checkbox v-model="num" disabled>序号</Checkbox> 
                <CheckboxGroup v-model="exportShowItem_now" @on-change="checkAllGroupChange_export">
                    <template v-for="item in respFieldDesc">
                        <Checkbox :label="item.value" :disabled="item.value == 'nowTime'">{{item.label}}</Checkbox>
                    </template>
                </CheckboxGroup>
            </div>
            <div slot="footer">
                <Checkbox :value="checkAll_export" @click.prevent.native="handleCheckAll_export" style="float:left;line-height:30px">全选</Checkbox>
                <Button type="primary" @click="exportExcelBox_ok">确定导出</Button>
                <Button type="primary" @click="exportExcelBox_cancel">取消</Button>
            </div>
        </Modal>
        <Modal v-model="settingShowItemBox" title="设置显示项" @on-cancel="settingShowItemBox_cancelTop" width="680" class="exportExcelBox">
            <p class="tip"><Icon type="information-circled" style="margin-right:10px"></Icon>选项个数太多有可能导致表单宽度超出页面显示范围</p>
            <div class="exportItem">
                <CheckboxGroup v-model="settingShowItem_now" @on-change="checkAllGroupChange_setting">
                               
                    <template v-for="item in respFieldDesc">
                        <Checkbox :label="item.value" :disabled="item.value == 'nowTime'">{{item.label}}</Checkbox>
                    </template>
                </CheckboxGroup>
            </div>
            <div slot="footer">
                <Checkbox :value="checkAll_setting" @click.prevent.native="handleCheckAll_setting" style="float:left;line-height:30px">全选</Checkbox>
                <Button type="ghost" @click="reset_ok">恢复默认选项</Button>
                <Button type="primary" @click="settingShowItemBox_ok">确定</Button>
                <Button type="primary" @click="settingShowItemBox_cancel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {today,yesterday,sevenDays,thirtyDays} from './../../assets/js/getDate.js'
    export default {
        computed: {
            basePath(){
                return this.$store.state.basePath + 'am/ajax/exportAmAccount.action'
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
                // 设置
                settingShowItemBox:false,
                checkAll_setting:false,
                settingShowItem_all:[],
                settingShowItem_default:['nowTime','accountName','token','present','debt','frostMoney'],
                settingShowItem_now:['nowTime','accountName','token','present','debt','frostMoney'],
                settingShowItem_old:['nowTime','accountName','token','present','debt','frostMoney'],
                // 导出
                num:true,
                exportExcelBox:false,
                checkAll_export:false,
                exportShowItem_all:[],
                exportShowItem_default:['nowTime','accountName','token','present','debt','frostMoney'],
                exportShowItem_now:['nowTime','accountName','token','present','debt','frostMoney'],

                // 排序方式，默认倒序
                order:'desc',
                btn_today:'ghost',
                btn_yesterday:'ghost',
                btn_aWeek:'ghost',
                btn_aMonth:'ghost',
                // 是否显示分页，默认显示
                showPage: true,
                pageSize:15,
                // 总条数
                totalCount: 0,
                // 当前页码
                current: 1,
                resData:{},
                respFieldDesc:[],
                form:{
                    keywords:'',
                    minMoneyToken:'',
                    maxMoneyToken:'',
                    minMoneyCry:'',
                    maxMoneyCry:'',
                    // 是否欠币select
                    debt: [{
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '0',
                            label: '已欠币'
                        },
                        {
                            value: '1',
                            label: '未欠币'
                        },
                    ],
                    debtDefault: '99',
                    // 用户类型select
                    userType: [{
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '2',
                            label: '个人用户'
                        },
                        {
                            value: '3',
                            label: '电子送达用户'
                        },
                        {
                            value: '4',
                            label: '机构用户'
                        },
                        {
                            value: '5',
                            label: '公证书查询用户'
                        },
                        {
                            value: '6',
                            label: '中介机构用户'
                        },
                        {
                            value: '15',
                            label: '第三方用户'
                        },
                    ],
                    userTypeDefault: '99',
                    // 注册来源
                    userResource: [{
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '1',
                            label: '公证云网站'
                        },
                        {
                            value: '2',
                            label: '公证云APP'
                        },
                        {
                            value: '3',
                            label: '第三方网站'
                        },
                        {
                            value: '4',
                            label: '微信城市服务'
                        },
                        {
                            value: '5',
                            label: 'weui版微信'
                        },
                        {
                            value: '6',
                            label: '建行城市服务'
                        },
                        {
                            value: '7',
                            label: 'H5版本在线受理'
                        },
                        {
                            value: '8',
                            label: '支付宝城市服务'
                        },
                        {
                            value: '9',
                            label: '公证录音'
                        },
                        {
                            value: '10',
                            label: '公证签约'
                        },
                        {
                            value: '11',
                            label: '知识产权'
                        },
                        {
                            value: '12',
                            label: '新浪'
                        },
                        {
                            value: '13',
                            label: '旗舰店注册'
                        }
                    ],
                    userResourceDefault: '99',
                },
                // 表格
                loading: true,
                columns1: [],
                tableData1: []
            }
        },
        methods: {
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 对选中项排序
            sortByIndex(item_now){
                let array = []
                let sortedArray = []
                for(let i = 0;i < item_now.length;i++){
                    let _this = this
                    $.each(_this.respFieldDesc, function(key, val) {
                        if(item_now[i] == val.value){
                            array.push({value:item_now[i],index:key})
                        }
                    });
                }
                array.sort(function(a,b){
                    return a.index-b.index
                });
                item_now = []
                $.each(array, function(key, val) {
                    item_now.push(val.value)
                });
                console.log(item_now)
                return item_now
            },
            // 设置显示项弹窗-确定
            settingShowItemBox_ok(){
                if(this.settingShowItem_now.length < 2){
                    if($('.ivu-message-notice-content').length == 0){
                        this.$Message.error("显示项太少，请继续勾选。")
                    }
                    return
                }
                this.settingShowItem_old = this.settingShowItem_now
                this.settingShowItemBox = false
                this.columns1 = []
                this.settingShowItem_now = this.sortByIndex(this.settingShowItem_now)
                let colWidth = 160
                if(this.settingShowItem_now.length <= 6){
                    colWidth = 210
                }
                if(this.settingShowItem_now.length <= 4){
                    colWidth = 300
                }
                if(this.settingShowItem_now.length <= 2){
                    colWidth = 490
                }
                for(let i = 0;i < this.settingShowItem_now.length;i++){
                    let _this = this
                    $.each(this.respFieldDesc, function(key, val) {
                        if(_this.settingShowItem_now[i] == val.value){
                            if(_this.settingShowItem_now[i] == 'createDate'){
                                _this.columns1.push({
                                    title: '消费时间',
                                    key: 'createDate',
                                    sortable : 'custom',
                                    width : colWidth,
                                    align: 'center',
                                });
                            }else{
                                _this.columns1.push({
                                    title: val.label,
                                    key: val.value,
                                    width : colWidth,
                                    align: 'center',
                                });
                            }
                        }
                    });
                }
                this.columns1.push(
                    {
                        title: '操作',
                        key: 'handle',
                        width : colWidth,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'UserBalanceDetail',
                                                params: {
                                                    accountUserId: params.row.accountUserId
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    }
                )
            },
            // 设置显示项弹窗-取消
            settingShowItemBox_cancel(){
                this.settingShowItem_now = this.settingShowItem_old
                if(this.settingShowItem_now.length == this.settingShowItem_all.length){
                    this.checkAll_setting = true
                }else{
                    this.checkAll_setting = false
                }
                this.settingShowItemBox = false
            },
            // 设置显示项弹窗-取消顶部X
            settingShowItemBox_cancelTop(){
                this.settingShowItem_now = this.settingShowItem_old
                if(this.settingShowItem_now.length == this.settingShowItem_all.length){
                    this.checkAll_setting = true
                }else{
                    this.checkAll_setting = false
                }
                this.settingShowItemBox = false
            },
            // 设置显示项弹窗-恢复默认选项
            reset_ok(){
                this.settingShowItem_now = this.settingShowItem_default
                this.checkAllGroupChange_setting()
            },
            // 设置显示弹窗 全选操作
            handleCheckAll_setting() {
                if (this.checkAll_setting == false) {
                    this.settingShowItem_now = this.settingShowItem_all
                    this.checkAll_setting = true
                } else {
                    this.settingShowItem_now = ['nowTime']
                    this.checkAll_setting = false
                }
                console.log(this.settingShowItem_now)
            },
            // 设置弹窗 选中项发生变化
            checkAllGroupChange_setting(){
                if(this.settingShowItem_now.length == this.settingShowItem_all.length){
                    this.checkAll_setting = true
                }else{
                    this.checkAll_setting = false
                }
            },
            // 显示 导出Excel弹窗
            exportExcel(){
                this.exportShowItem_now = this.exportShowItem_default
                if(this.exportShowItem_now.length == this.exportShowItem_all.length){
                    this.checkAll_export = true
                }else{
                    this.checkAll_export = false
                }
                this.exportExcelBox = true
            },
            // 导出Excel弹窗-确定
            exportExcelBox_ok(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.exportShowItem_now = this.sortByIndex(this.exportShowItem_now)
                        let exportHeaders = ''
                        for(let i = 0;i < this.exportShowItem_now.length;i++){
                            let _this = this
                            $.each(this.respFieldDesc, function(key, val) {
                                if(_this.exportShowItem_now[i] == val.value){
                                    exportHeaders = exportHeaders + val.label + '-' +  val.value + ','
                                }
                            });
                        }
                        
                        this.$http.post('/am/ajax/exportAmAccount.action', this.qs.stringify({
                            accountName:this.form.keywords,
                            beginToken: this.form.minMoneyToken,
                            endToken: this.form.maxMoneyToken,
                            beginPresent: this.form.minMoneyCry,
                            endPresent: this.form.maxMoneyCry,
                            debt:this.form.debtDefault,
                            userType:this.form.userTypeDefault,
                            userResource:this.form.userResourceDefault,
                            exportHeaders:exportHeaders
                        })).then(response => {
                            console.log(response)
                            if (response.status == 200) { 
                                this.url =  this.basePath + '?accountName=' + this.form.keywords + '&beginToken=' + this.form.minMoneyToken 
                                                    + '&endToken=' + this.form.maxMoneyToken + '&beginPresent=' + this.form.minMoneyCry 
                                                    + '&endPresent=' + this.form.maxMoneyCry + '&debt=' + this.form.debtDefault 
                                                    + '&userType=' + this.form.userTypeDefault
                                                    + '&userResource=' + this.form.userResourceDefault
                                                    + '&exportHeaders=' + exportHeaders
                                $('#form').attr({'action':this.url})
                                $('#form').submit()          
                                this.exportExcelBox = false
                            }
                        }).catch(error => {
                            console.log(error);
                        }) 
                    }else{
                        this.exportExcelBox = false
                    }
                })
            },
            // 导出Excel弹窗-取消
            exportExcelBox_cancel(){
                this.exportShowItem_now = this.exportShowItem_default
                if(this.exportShowItem_now.length == this.exportShowItem_all.length){
                    this.checkAll_export = true
                }else{
                    this.checkAll_export = false
                }
                this.exportExcelBox = false
            },
            // 导出Excel弹窗-取消顶部X
            exportExcelBox_cancelTop(){
                this.exportShowItem_now = this.exportShowItem_default
                if(this.exportShowItem_now.length == this.exportShowItem_all.length){
                    this.checkAll_export = true
                }else{
                    this.checkAll_export = false
                }
                this.exportExcelBox = false
            },
            // 显示 设置弹窗
            settingShowItem(){
                this.settingShowItemBox = true
            },
            // 导出弹窗 选中项发生变化
            checkAllGroupChange_export(){
                console.log(this.exportShowItem_now)
                if(this.exportShowItem_now.length == this.exportShowItem_all.length){
                    this.checkAll_export = true
                }else{
                    this.checkAll_export = false
                }
            },
            // 导出弹窗 全选操作
            handleCheckAll_export() {
                if (this.checkAll_export == false) {
                    this.exportShowItem_now = this.exportShowItem_all
                    this.checkAll_export = true
                } else {
                    this.exportShowItem_now = ['nowTime']
                    this.checkAll_export = false
                }
                console.log(this.exportShowItem_now)
            },
            // 重置
            searchArea_reset(name){
                this.$refs[name].resetFields();
                this.btn_today = 'ghost'
                this.btn_yesterday = 'ghost'
                this.btn_aWeek = 'ghost'
                this.btn_aMonth = 'ghost'
            },
            // 排序
            sort(column){
                // console.log(column)
                // console.log(column.key)
                console.log(column.order)
                this.order = column.order
                this.getTableDate(1,this.order)
            },
            // 分页跳转
            jumpToPage(page){
                this.getTableDate(page,this.order)
            },
            // 获取表格数据
            getTableDate(page,order) {
                console.log('---------------------')
                console.log(this.pageSize)
                console.log(this.form.keywords)
                console.log(this.form.minMoneyToken)
                console.log(this.form.maxMoneyToken)
                console.log(this.form.minMoneyCry)
                console.log(this.form.maxMoneyCry)
                console.log(this.form.debtDefault)
                console.log(this.form.userTypeDefault)
                console.log(this.form.userResourceDefault)
                console.log('---------------------')
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                        this.current = page
                        this.$http.post('/am/ajax/findPageAmAccount.action', this.qs.stringify({
                            accountName:this.form.keywords,
                            beginToken: this.form.minMoneyToken,
                            endToken: this.form.maxMoneyToken,
                            beginPresent: this.form.minMoneyCry,
                            endPresent: this.form.maxMoneyCry,
                            debt:this.form.debtDefault,
                            userType:this.form.userTypeDefault,
                            userResource:this.form.userResourceDefault,
                            pageNo: page,
                            pageSize: this.pageSize,
                        })).then(response => {
                                console.log(response)
                                console.log(response.data.respFieldDesc)
                            if (response.data.code == 200) {
                                if(response.data.data.totalCount == 0){
                                    this.showPage = false
                                }else{
                                    this.showPage = true
                                }
                                let _this = this
                                this.respFieldDesc = JSON.parse(response.data.respFieldDesc)
                                this.settingShowItem_all = []
                                this.exportShowItem_all = []
                                $.each(this.respFieldDesc, function(key, val) {
                                    _this.settingShowItem_all.push(val.value)
                                    _this.exportShowItem_all.push(val.value)
                                });
                                $.each(response.data.data.value, function(key, val) {
                                    switch (val.userResource) {
                                        case '1':
                                            val.userResource = '公证云网站'; break
                                        case '2':
                                            val.userResource = '公证云APP'; break
                                        case '3':
                                            val.userResource = '第三方网站'; break
                                        case '4':
                                            val.userResource = '微信城市服务'; break
                                        case '5':
                                            val.userResource = 'weui版微信'; break
                                        case '6':
                                            val.userResource = '建行城市服务'; break
                                        case '7':
                                            val.userResource = 'H5版本在线受理'; break
                                        case '8':
                                            val.userResource = '支付宝城市服务'; break
                                        case '9':
                                            val.userResource = '公证录音'; break
                                        case '10':
                                            val.userResource = '公证签约'; break
                                        case '11':
                                            val.userResource = '知识产权'; break
                                        case '12':
                                            val.userResource = '新浪'; break
                                        case '13':
                                            val.userResource = '旗舰店注册'; break
                                        case '-':
                                            val.userResource = '-'; break
                                    }
                                    switch (val.userType) {
                                        case '2':
                                            val.userType = '个人用户'; break
                                        case '3':
                                            val.userType = '电子送达用户'; break
                                        case '4':
                                            val.userType = '机构用户'; break
                                        case '5':
                                            val.userType = '公证书查询用户'; break
                                        case '6':
                                            val.userType = '中介机构用户'; break
                                        case '15':
                                            val.userType = '第三方用户'; break
                                        case '-':
                                            val.userType = '-'; break
                                    }
                                    switch (val.debt) {
                                        case '0':
                                            val.debt = '已欠币'; break
                                        case '1':
                                            val.debt = '未欠币'; break
                                        case '-':
                                            val.debt = '-'; break
                                    }
                                });  

                                this.resData =  response.data.data
                                this.tableData1 = response.data.data.value
                                this.settingShowItemBox_ok()
                                this.totalCount = Number(response.data.data.totalCount)
                                this.loading = false    
                            }
                        }).catch(error => {
                            console.log(error);
                        })
                     }
                });
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '财务报表',
                subNavigation: '用户账户余额查询',
                name: 'UserBalance',
                second: true,
            });
            // 表格初始化，显示第一页
            this.getTableDate(1)
        },
    }
</script>

<style scoped>

</style>

