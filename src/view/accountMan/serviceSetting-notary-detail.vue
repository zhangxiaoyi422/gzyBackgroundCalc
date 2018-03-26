<template>
    <div class="relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-word">
            <Form ref="formItem1" :model="formItem1" :label-width="140">
                <div style="font-size:20px;margin:0 0 12px 44px;">
                    {{formItem1.orgName}}
                </div>
                <ul class="clearfix">
                    <li>
                        <FormItem style="margin-bottom:0;" label="收费项目编号：">
                            {{formItem1.chargeNum}}
                        </FormItem>
                    </li>
                    <li>
                        <FormItem style="margin-bottom:0;" label="收费项目名称：">
                            {{formItem1.chargeName}}
                        </FormItem>
                    </li>
                    <li>
                        <FormItem style="margin-bottom:0;" label="收费项目类型：">
                            {{formItem1.chargeTypeName}}
                        </FormItem>
                    </li>
                    <li>
                        <FormItem style="margin-bottom:0;" label="收费项目状态：">
                            {{formItem1.state}}
                        </FormItem>
                    </li>
                    <li style="width:100%">
                        <FormItem style="margin-bottom:0;" label="消费计算规则：">
                            {{formItem1.chargeRule}}
                        </FormItem>
                    </li>
                </ul>
            </Form>
        </div>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px"></Table>
        <div class="btn-wrapper">
            <Button type="primary" @click="returnBack">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spinShow:false,
                // 收费项目类型数据
                formItem1: {
                    orgName:'',
                    chargeNum: '',
                    chargeName: '',
                    chargeRule: '',
                    state:'',
                    chargeTypeName:''
                },
                columns1: [{
                        title: '服务编号',
                        key: 'serverNum',
                        align: 'center',
                    },
                    {
                        title: '服务名称',
                        key: 'serverName',
                        align: 'center',
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        align: 'center',
                    },
                    {
                        title: '单位',
                        key: 'unit',
                        align: 'center',
                    },
                    {
                        title: '实际消费公证币公证机构分成 %',
                        key: 'percent',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'state',
                        align: 'center',
                    },
                ],
                tableData1: [],
            };
        },
        methods: {
            // 获取表格数据
            getTableDate(page) {
                this.$http.post('/charge/project/getProjectDetail.action', this.qs.stringify({
                    chargeId: this.$route.params.chargeId,
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        let data = response.data.data.serverList
                        $.each(data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                        })
                        this.tableData1 = data;
                        this.formItem1.chargeNum = response.data.data.chargeNum
                        this.formItem1.chargeRule = response.data.data.chargeRule
                        this.formItem1.chargeName = response.data.data.chargeName
                        this.formItem1.chargeTypeName = response.data.data.chargeTypeName 

                        this.formItem1.orgName = this.$route.params.orgName
                        

                        if(response.data.data.state == '1'){
                            this.formItem1.state = '开启'
                        }else{
                            this.formItem1.state = '关闭'                            
                        }
                        this.spinShow = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 返回
            returnBack() {
                this.$router.push({
                    name: 'ServiceSettingNotaryOrg'
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '服务收费配置',
                thirdNavigation: '公证机构收费配置',
                fourthNavigation:'按公证机构显示',
                fifthNavigation: '详情',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingNotary',
                thirdName: 'ServiceSettingNotaryOrg',
                second: true,
                third: true,
                fourth: true,
                fifth:true,
                forthTab:'ServiceSettingNotaryOrg',

            })
            this.getTableDate()
            // this.getChargeItemTypeData()
        }
    }
</script>

<style scoped>
    .config-table {
        width: 100%;
        margin-bottom: 10px
    }
    .config-table th {
        background: #F8F8F9;
        height: 40px;
        vertical-align: middle;
        border: 1px solid #ccc
    }
    .config-table td {
        text-align: center;
        height: 40px;
        vertical-align: middle;
        border: 1px solid #ccc
    }
    .panel-word ul li {
        width: 50%;
        float: left
    }
    .ivu-form-item-error-tip {
        position: absolute;
        left: 100px!important
    }
</style>