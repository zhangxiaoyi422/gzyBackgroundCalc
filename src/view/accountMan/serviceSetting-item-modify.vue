<template>
    <div class="relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-word">
            <Form ref="formItem1" :model="formItem1" :label-width="140">
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
                        <FormItem style="margin-bottom:0;" label="已设置公证机构数量：">
                            {{formItem1.orgCount}}
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
        <Modal v-model="modal2" title="配置/修改" @on-cancel="cancelTop">
            <Form ref="formItem2" :model="formItem2" :rules="ruleCustom2" class="clearfix" :label-width="100">
                <FormItem label="服务编号：" style="margin-bottom:0">
                    {{formItem2.serverNum}}
                </FormItem>
                <FormItem label="服务名称：" style="margin-bottom:0">
                    {{formItem2.serverName}}
                </FormItem>
                <FormItem label="单价：" prop="unitPrice">
                    <Input v-model="formItem2.unitPrice" placeholder="正整数，不输入单价即为0" style="width:200px;margin-right:5px" :maxlength="6"></Input>
                    {{formItem2.unit}}
                </FormItem>
                <FormItem prop="percent">
                    <table class="config-table">
                        <tr>
                            <th>分成机构</th>
                            <th>实际消费公证币分成比例</th>
                        </tr>
                        <tr>
                            <td>公证机构</td>
                            <td>
                                <Input v-model="formItem2.percent" style="width:100px;margin-right:5px" :maxlength="3"></Input>%
                            </td>
                        </tr>
                        <tr>
                            <td>法信</td>
                            <td>{{100 - formItem2.percent}}%</td>
                        </tr>
                    </table>
                </FormItem>
                <Checkbox v-model="formItem2.checkbox">同步开启此项服务收费。</Checkbox>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="config_ok('formItem2')" :disabled="forbiddenSubmit">确定</Button>
                <Button type="primary" @click="config_cancle">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateUnitPrice = (rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (String(this.formItem2.unitPrice).replace(/ /g, "") == '') {
                    callback();
                }
                if (reg.test(this.formItem2.unitPrice) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validatePercent = (rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (reg.test(this.formItem2.percent) == false) {
                    callback(new Error('格式错误'));
                } else if (this.formItem2.percent > 100) {
                    callback(new Error('请输入0-100之间的数字'));
                }
                callback()
            };
            return {
                forbiddenSubmit:false,
                ruleCustom2: {
                    unitPrice: [{
                        required: true,
                        validator: validateUnitPrice,
                        trigger: 'blur'
                    }],
                    percent: [{
                        required: true,
                        validator: validatePercent,
                        trigger: 'blur'
                    }]
                },
                spinShow:true,
                // 配置弹窗显示隐藏
                modal2: false,
                // 配置弹窗数据                
                formItem2: {
                    // 当前行索引
                    rowIndex: '',
                    serverNum: '',
                    serverName: '',
                    unit: '',
                    unitPrice: '',
                    percent: 0,
                    serverId:'',
                    // 同步开启此项服务收费
                    checkbox: false,
                },
                // 收费项目类型数据
                formItem1: {
                    chargeNum: '',
                    chargeName: '',
                    chargeRule: '',
                    orgCount:'',
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
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            // 没有单价，显示配置按钮
                            if (params.row.unitPrice == null) {
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
                                                this.config(params.index, params.row.serverNum, params.row.serverName, params.row.unit, params.row.serverId)
                                            }
                                        }
                                    }, '配置'),
                                ]);
                            } else {
                                if (params.row.state == '关闭') {
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
                                                    this.changeState(params.index, params.row.state, params.row.serverId)
                                                }
                                            }
                                        }, '开启'),
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
                                                    this.modifyConfig(params.index, params.row.serverNum, params.row.serverName,params.row.unitPrice, params.row.unit,params.row.percent, params.row.state, params.row.serverId)
                                                }
                                            }
                                        }, '修改'),
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
                                                    this.changeState(params.index, params.row.state, params.row.serverId)
                                                }
                                            }
                                        }, '关闭'),
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
                                                    this.modifyConfig(params.index, params.row.serverNum, params.row.serverName,params.row.unitPrice, params.row.unit,params.row.percent, params.row.state, params.row.serverId)
                                                }
                                            }
                                        }, '修改'),
                                    ]);
                                }
                            }
                        }
                    }
                ],
                tableData1: [],
            };
        },
        methods: {
            // 显示配置弹窗
            config(rowIndex, serverNum, serverName, unit ,serverId) {
                this.modal2 = true
                this.formItem2.checkbox = false
                this.formItem2.unitPrice = ''
                this.formItem2.percent = 0
                // rowIndex是当前配置行索引

                this.formItem2.serverNum = serverNum
                this.formItem2.serverName = serverName
                this.formItem2.unit = unit
                this.formItem2.serverId = serverId
            },
            // 配置弹窗-确定
            config_ok(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.forbiddenSubmit = true
                        // 校验成功
                        let state = ''
                        if(this.formItem2.checkbox == true){
                            state = '1'
                        }else{
                            state = '0'     
                        }
                        if(this.formItem2.unitPrice == ''){
                            this.formItem2.unitPrice = '0'
                        }
                        console.log('serverId: ' + this.formItem2.serverId)
                        console.log('state: ' + state)
                        console.log('percent: ' + this.formItem2.percent)
                        this.$http.post('/charge/project/editChargeServer.action', this.qs.stringify({
                            serverId: this.formItem2.serverId,
                            state:state,
                            percent:this.formItem2.percent,
                            unitPrice:this.formItem2.unitPrice
                        })).then(response => {
                            console.log(response)
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '修改成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.modal2 = false
                                        this.getTableDate()
                                        this.forbiddenSubmit = false
                                    }
                                });
                                
                            } else {
                                this.$Message.success({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }
                        }).catch(error => {
                            this.forbiddenSubmit = false
                            console.log(error);
                        })
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 配置弹窗-取消
            config_cancle() {
                this.modal2 = false
                this.$refs['formItem2'].resetFields();
            },
            // 配置弹窗-右上角X
            cancelTop() {
                this.modal2 = false
                this.$refs['formItem2'].resetFields();
            },
        // this.modifyConfig(params.index, params.row.serverNum, params.row.serverName, params.row.unit, params.row.state, params.row.serverId)
            
            // 修改配置弹窗
            modifyConfig(rowIndex, serverNum, serverName, unitPrice, unit,percent, state, serverId) {

                this.modal2 = true
                // rowIndex是当前配置行索引
                this.formItem2.serverNum = serverNum
                this.formItem2.serverName = serverName
                this.formItem2.unit = unit
                this.formItem2.unitPrice = unitPrice
                this.formItem2.percent = percent
                this.formItem2.serverId = serverId
                console.log(state)
                if (state == '开启') {
                    this.formItem2.checkbox = true
                } else {
                    this.formItem2.checkbox = false
                }
            },
            // 开启关闭按钮
            changeState(rowIndex, state, serverId) {
                if (state == '关闭') {
                    this.$http.post('/charge/project/editServerState.action', this.qs.stringify({
                        serverId: serverId,
                        state:'1',
                    })).then(response => {
                        console.log(response)
                        if (response.data.status == 0) {
                            this.getTableDate()
                        } else {
                            this.$Message.error({
                                content: response.data.message,
                                duration: 1,
                            });
                        }
                    }).catch(error => {
                        this.$Message.error({
                            content: '操作失败',
                            duration: 1,
                        });
                        console.log(error);
                    })
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定关闭收费？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.$http.post('/charge/project/editServerState.action', this.qs.stringify({
                                serverId: serverId,
                                state:'0',
                            })).then(response => {
                                console.log(response)
                                if (response.data.status == 0) {
                                        this.getTableDate()
                                } else {
                                    this.$Message.error({
                                        content: response.data.message,
                                        duration: 1,
                                    });
                                }
                            }).catch(error => {    
                                this.$Message.error({
                                    content: '操作失败',
                                    duration: 1,
                                });                          
                                console.log(error);
                            })
                        },
                        onCancel: () => {}
                    });
                }
                
            },
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
                        this.tableData1 = data
                        this.formItem1.chargeNum = response.data.data.chargeNum
                        this.formItem1.chargeRule = response.data.data.chargeRule
                        this.formItem1.chargeName = response.data.data.chargeName
                        this.formItem1.orgCount = response.data.data.orgCount 
                        this.formItem1.chargeTypeName = response.data.data.chargeTypeName 
                        

                        if(response.data.data.state == '1'){
                            this.formItem1.state = '开启'
                        }else{
                            this.formItem1.state = '关闭'                            
                        }
                        this.spinShow = false
                    } else {
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                            onClose: () => {
                            }
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    this.$Message.error({
                        content: '加载失败',
                        duration: 1,
                    });
                    console.log(error);
                })
            },
            // 返回
            returnBack() {
                this.$router.push({
                    name: 'ServiceSettingItem'
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '服务收费配置',
                thirdNavigation: '收费项目配置',
                fourthNavigation: '详情',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingItem',
                second: true,
                third: true,
                fourth: true
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