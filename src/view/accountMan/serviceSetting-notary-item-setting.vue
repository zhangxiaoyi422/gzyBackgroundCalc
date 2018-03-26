<template>
    <div>
        <input type="text" style="display:none"/>
        <div class="chargeInfo">
            <span>{{chargeNum}}</span>
            <span>{{chargeName}}</span>
            <span>{{state}}</span>
        </div>
        <div class="search-area clearfix">
            <Form :model="formItem1">
                <input type='text' style='display:none'/>
                <ul class="ul">
                    <li class="li">
                        <label>关键字：</label>
                        <Input v-model="formItem1.chargeItemName" placeholder="公证机构/收费项目名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                    </li>
                    <li class="li">
                        <label>收费项目状态：</label>
                        <Select v-model="formItem1.model2" style="width:200px">
                                <Option v-for="item in formItem1.state" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <div v-if="!showRemoveAllBtn">
            <Button type="primary" @click="addNotary">添加公证机构</Button>
            <Button type="primary" @click="removeGroup">批量移除</Button>
        </div>
        <div v-if="showRemoveAllBtn">
            <Button type="primary" @click="removeAll">移除</Button>
            <Button type="primary" @click="removeCancle">取消</Button>
        </div>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading" @on-selection-change="selectionChange_1"></Table>
        <Page :total="this.totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current" v-if="showPage"></Page>
        <div class="btn-wrapper">
            <Button type="primary" @click="returnBack">返回</Button>
        </div>
        <Modal v-model="showAddNotaryBox" title="选择公证机构" @on-cancel="addNotary_cancleTop" width="700">
            <Form ref="addNotaryForm" :model="addNotaryForm" :rules="addNotaryForm" class="clearfix">
                <input type="text" style="display:none"/>
                <div class="search-area clearfix">
                    <ul class="ul">
                        <li class="li">
                            <label>关键字：</label>
                            <Input v-model="addNotaryForm.chargeItemName" placeholder="公证机构" style="width: 200px" @keyup.native.13&&108="addNotary"></Input>
                        </li>
                        <li class="li">
                            <label>是否收费：</label>
                            <Select v-model="addNotaryForm.collectFee_defaultVal" style="width:195px">
                                <Option v-for="item in addNotaryForm.collectFee" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </li>
                        <li class="li">
                            <Button type="primary" @click="addNotary">查询</Button>
                            <Button type="primary" @click="addNotaryForm_reset">重置</Button>
                        </li>
                    </ul>
                </div>
                <div style="height:300px;overflow-y:auto;overflow-x:hidden">
                    <Table ref="selection" :columns="columns2" :data="tableData2" @on-selection-change="selectionChange_2"></Table>
                </div>
                <div style="margin:20px 0 0 0">
                已选 {{addNotaryForm.selectionNum}} 个
                </div>               
            </Form>
            <div slot="footer">
                <Button type="primary" @click="addNotary_ok" :disabled="addNotary_ok_disabled">添加</Button>
                <Button type="primary" @click="addNotary_cancle">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 是否显示分页，默认显示
                showPage: true,
                // serviceSetting-notary-item传过来的参数
                chargeNum:this.$route.params.chargeNum,
                chargeName:this.$route.params.chargeName,
                state:this.$route.params.state,
                // 隐藏removeAll按钮
                showRemoveAllBtn:false,
                // 添加公证机构弹窗
                showAddNotaryBox:false,
                // 禁用添加按钮
                addNotary_ok_disabled:true,
                orgIds_1:[],
                orgIds_2:[],
                addNotaryForm:{
                    selectionNum:0,
                    chargeItemName:'',
                    collectFee: [{
                            value: '0',
                            label: '全部'
                        },
                        {
                            value: 'ON',
                            label: '是'
                        },
                        {
                            value: 'OFF',
                            label: '否'
                        },
                    ],
                    collectFee_defaultVal: 'OFF',
                },
                columns2:[
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        // render: (h, params) => {
                        //     if (params.row.collectFee == '否') {
                        //         return h('div', [
                        //             h('Checkbox', {

                        //             }),

                        //         ]);
                        //     }
                        // }
                        
                    },
                    {
                        title: '公证机构',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '是否收费',
                        key: 'collectFee',
                        align: 'center',
                    },
                    {
                        title: '收费项目编号',
                        key: 'chargeNum',
                        align: 'center',
                    },
                    {
                        title: '收费项目名称',
                        key: 'chargeName',
                        align: 'center',
                    },
                ],
                tableData2:[],
                loading: true,
                current: 1,
                pageNow:1,
                formItem1: {
                    chargeItemName: '',
                    collectFee: [{
                            value: '0',
                            label: '全部'
                        },
                        {
                            value: 'ON',
                            label: '是'
                        },
                        {
                            value: 'OFF',
                            label: '否'
                        },
                    ],
                    model1: '0',
                    state: [{
                            value: '0',
                            label: '全部'
                        },
                        {
                            value: '1',
                            label: '关闭'
                        },
                        {
                            value: '2',
                            label: '开启'
                        },
                    ],
                    model2: '0',
                },
                columns1: [
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    // Vue.set(vm. data, 'b', 2);
                    {
                        title: '公证机构',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '收费项目编号',
                        key: 'chargeNum',
                        align: 'center',
                    },
                    {
                        title: '收费项目名称',
                        key: 'chargeName',
                        align: 'center',
                    },
                    {
                        title: '收费项目状态',
                        key: 'state',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
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
                                            this.remove(params.row.orgId, params.row.chargeId,params.row.orgName)
                                        }
                                    }
                                }, '移除'),
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
                                                name: 'ServiceSettingNotaryDetail2',
                                                params:{
                                                    chargeId:params.row.chargeId,
                                                    orgName:params.row.orgName,
                                                    chargeNum:this.$route.params.chargeNum,
                                                    chargeName:this.$route.params.chargeName,
                                                    state:this.$route.params.state,
                                                    chargId:this.$route.params.chargeId
                                                }
                                            });
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    }
                ],
                totalCount: 0,
                tableData1: [],
            };
        },
        methods: {
            // 添加公证机构弹窗
            addNotary(page){
                this.showAddNotaryBox = true
                console.log(this.addNotaryForm.collectFee_defaultVal)
                this.$http.post('/parameter/org/getOrgProjectAllList.action', this.qs.stringify({
                    // chargeId:this.$route.params.chargeId,
                    content: this.addNotaryForm.chargeItemName,
                    collectFee:this.addNotaryForm.collectFee_defaultVal,
                    // state:''
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        let data = response.data.data


                            $.each(data, function(key, val) {
                                if (val.collectFee == 'ON') {
                                    val.collectFee = '是';
                                    val._disabled = true
                                } else if (val.collectFee == 'OFF') {
                                    val.collectFee = '否';
                                }
                            })
                            this.tableData2 = data;
                            this.orgIds_2 = []
                            this.addNotaryForm.selectionNum = 0
                            this.addNotary_ok_disabled = true
                            // $('.ivu-checkbox-wrapper').removeClass('.ivu-checkbox-checked')
                            // 去掉状态为是的select框
                            // for(let i=0;i<selectArray.length;i++){
                            //     console.log($('.ivu-table-tbody tr').eq(i).find('.ivu-checkbox-wrapper'))
                            //     $('.ivu-table-tbody tr').eq(i).find('.ivu-checkbox-wrapper').css('background','red')
                            // }
                        
                        
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 添加公证机构弹窗-选中项发生变化时
            selectionChange_2(selection){
                this.addNotaryForm.selectionNum = selection.length
                // 没选中任何项，添加按钮是灰色的不可点击
                if(this.addNotaryForm.selectionNum == 0){
                    this.addNotary_ok_disabled = true
                }else{
                    this.addNotary_ok_disabled = false                  
                }
                this.orgIds_2 = []
                for(let i = 0;i<selection.length;i++){
                    this.orgIds_2.push(selection[i].orgId)
                }
                // console.log(this.orgIds_2)
            },
            // 添加公证机构弹窗-重置
            addNotaryForm_reset(){
                this.addNotaryForm.chargeItemName = ''
                this.addNotaryForm.collectFee_defaultVal = 'OFF'
            },
            // 添加公证机构弹窗-确定
            addNotary_ok(name) {
                // console.log(String(this.orgIds_2))
                this.addNotary_ok_disabled = true
                this.$http.post('/parameter/org/setOrgList.action', this.qs.stringify({
                    orgIds: String(this.orgIds_2),
                    projectId: this.$route.params.chargeId,
                })).then(response => {
                    if (response.data.status == 0) {
                        this.$Message.success({
                            content: '设置成功',
                            duration: 1,
                            onClose: () => {
                                this.getTableDate(this.pageNow)
                                this.showAddNotaryBox = false
                                this.orgIds_2 = []
                                this.addNotaryForm.selectionNum = 0
                                this.addNotaryForm.chargeItemName = ''
                                // this.addNotary_ok_disabled = true
                                this.tableData2 = []
                                this.$refs.selection.selectAll(false);
                            }
                        });
                    } else {
                        this.$Message.error({
                            content: '设置失败',
                            duration: 1,
                            onClose: () => {

                            }
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 单个移除
            remove(orgId,chargeId,orgName){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>移除后公证机构不收取此类型费用。确定移除？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.post('/parameter/org/delProjectOrgs.action', this.qs.stringify({
                            orgIds: orgId,
                        })).then(response => {
                            console.log(response)
                            if (response.data.status == 0) {

                                this.$Message.success({
                                    content: '移除成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.getTableDate(this.pageNow)
                                    }
                                });
                            }else{
                                this.$Message.error('操作失败');
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    },
                    onCancel: () => {}
                });
            },
            // 批量移除,显示移除取消按钮和多选框
            removeGroup(){
                this.showRemoveAllBtn = true
                if(this.columns1[0].type == 'selection'){
                    return
                }else{
                    this.columns1.unshift({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    });
                }     
            },
            // 选中项发生变化时
            selectionChange_1(selection){
                this.orgIds_1 = []
                for(let i = 0;i<selection.length;i++){
                    this.orgIds_1.push(selection[i].orgId)
                }
                console.log(this.orgIds_1)
            },
            // 移除按钮
            removeAll(){
                console.log(this.orgIds_1)
                if(this.orgIds_1 == ''){
                    this.$Modal.info({
                        title: '提示',
                        content: '<p>请选择公证机构。</p>',
                    });
                }else{
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>移除后公证机构不收取此类型费用。确定移除？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.$http.post('/parameter/org/delProjectOrgs.action', this.qs.stringify({
                                orgIds: String(this.orgIds_1),
                            })).then(response => {
                                console.log(response)
                                if (response.data.status == 0) {
                                    this.$Message.success({
                                        content: '移除成功',
                                        duration: 1,
                                        onClose: () => {
                                            this.getTableDate(1)
                                            this.orgIds_1 = ''
                                        }
                                    });
                                }else{
                                    this.$Message.error('操作失败');
                                }
                            }).catch(error => {
                                console.log(error);
                            });
                        },
                        onCancel: () => {}
                    });
                }
            },
            // 取消移除按钮
            removeCancle(){
                this.showRemoveAllBtn = false
                this.columns1.shift({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }); 
            },
            // 设置-取消
            addNotary_cancle() {
                this.showAddNotaryBox = false
                this.orgIds_2 = []
                this.addNotaryForm.selectionNum = 0
                this.addNotaryForm.chargeItemName = ''
                this.addNotaryForm.collectFee_defaultVal = 'OFF'
                this.addNotary_ok_disabled = true
                this.tableData2 = []
                this.$refs.selection.selectAll(false);
            },
            // 设置-取消X
            addNotary_cancleTop() {
                this.showAddNotaryBox = false
                this.orgIds_2 = []
                this.addNotaryForm.selectionNum = 0
                this.addNotaryForm.chargeItemName = ''
                this.addNotaryForm.collectFee_defaultVal = 'OFF'
                this.addNotary_ok_disabled = true
                this.tableData2 = []                
                this.$refs.selection.selectAll(false);                
            },
            // 返回
            returnBack() {
                this.$router.push({
                    name: 'ServiceSettingNotaryItem',
                })
            },
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.pageNow = page
                this.$http.post('/charge/project/getChargeOrgList.action', this.qs.stringify({
                    chargeId:this.$route.params.chargeId,
                    pageNo: page,
                    pageSize: 15,
                    content: this.formItem1.chargeItemName,
                    state: this.formItem1.model2
                })).then(response => {
                    // console.log(response)
                    if (response.data.status == 0) {
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        let data = response.data.data.list
                        $.each(data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                        })
                        this.tableData1 = data;
                        this.totalCount = response.data.data.totalCount
                        this.loading = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '服务收费配置',
                thirdNavigation: '公证机构收费配置',
                fourthNavigation: '按收费项目显示',
                fifthNavigation:'设置公证机构',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingNotary',
                thirdName: 'ServiceSettingNotaryItem',
                second: true,
                third: true,
                fourth: true,
                fifth:true,
                forthTab:'ServiceSettingNotaryItem'

            })
            this.getTableDate(1)
        }
    }
</script>

<style scoped>
.chargeInfo span{display:inline-block;margin-right:10px;font-size:18px;font-weight:bold;margin-bottom:20px}
</style>