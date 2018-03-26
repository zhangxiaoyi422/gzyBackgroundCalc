<template>
    <div class="relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="panel-word">
            <Form ref="formItem1" :model="formItem1" :rules="ruleCustom1" :label-width="120">
            <input type='text' style='display:none'/>
                <FormItem style="margin-bottom:0;" label="收费项目编号：">
                    {{formItem1.chargeId}}
                </FormItem>
                <FormItem prop="chargeName" label="收费项目名称：" style="margin-bottom:10px">
                    <Input v-model="formItem1.chargeName" placeholder="不超过15个字" style="width:300px;" :maxlength="15"></Input>
                </FormItem>
                <FormItem style="margin-bottom:0;" label="收费项目类型：">
                    {{formItem1.typeName}}
                </FormItem>
                <FormItem style="margin-bottom:0;" label="消费计算规则：">
                    {{formItem1.typeRule}}
                </FormItem>
            </Form>
        </div>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px"></Table>
        <div class="btn-wrapper">
            <Button type="primary" @click="save('formItem1')" :disabled="forbiddenSubmit">保存</Button>
            <Button type="primary" @click="cancle">取消</Button>
        </div>
        <Modal v-model="modal2" title="配置" @on-cancel="cancelTop">
            <Form ref="formItem2" :model="formItem2" :rules="ruleCustom2" class="clearfix" :label-width="100">
                <FormItem label="服务编号：" style="margin-bottom:0">
                    {{formItem2.serverNum}}
                </FormItem>
                <FormItem label="服务名称：" style="margin-bottom:0">
                    {{formItem2.itemName}}
                </FormItem>
                <FormItem label="单价：" prop="taxPrice">
                    <Input v-model="formItem2.taxPrice" placeholder="正整数，不输入单价即为0" style="width:200px;margin-right:5px" :maxlength="6"></Input>
                    {{formItem2.itemUnitName}}
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
                            <td>{{100 - (isNaN(formItem2.percent)?0:formItem2.percent)}}%</td>
                        </tr>
                    </table>
                </FormItem>
                <Checkbox v-model="formItem2.checkbox">同步开启此项服务收费。</Checkbox>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="config_ok('formItem2')">确定</Button>
                <Button type="primary" @click="config_cancle">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateChargeName = (rule, value, callback) => {
                let chargeName = $.trim(this.formItem1.chargeName)
                if (this.formItem1.chargeName.replace(/ /g, "") == '') {
                    callback(new Error('请输入'));
                }else if(chargeName.indexOf(' ') > -1){
                    callback(new Error('格式错误'));
                }else{
                    callback()
                }
            };
            const validateTaxPrice = (rule, value, callback) => {
                // let reg = /^[0-9]\d*$/;
                // 可以为0但是不能为001 002等
                let reg = /^(\d|([1-9]\d+))?$/
                if (this.formItem2.taxPrice.replace(/ /g, "") == '') {
                    callback();
                }else if (reg.test(this.formItem2.taxPrice) == false) {
                    callback(new Error('格式错误'));
                }else{
                    callback()
                }
            };
            const validatePercent = (rule, value, callback) => {
                let reg = /^(\d|([1-9]\d+))?$/
                if (reg.test(this.formItem2.percent) == false) {
                    callback(new Error('格式错误'));
                } else if (this.formItem2.percent > 100) {
                    callback(new Error('请输入0-100之间的数字'));
                }else{
                    callback()
                }
            };
            return {
                ruleCustom1: {
                    chargeName: [{
                        required: true,
                        validator: validateChargeName,
                        trigger: 'blur'
                    }],
                },
                ruleCustom2: {
                    taxPrice: [{
                        required: true,
                        validator: validateTaxPrice,
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
                // 禁用提交按钮
                forbiddenSubmit:false,          
                formItem2: {
                    // 当前行索引
                    rowIndex: '',
                    serverNum: '',
                    itemName: '',
                    itemUnitName: '',
                    taxPrice: '',
                    percent: 0,
                    // 同步开启此项服务收费
                    checkbox: false,
                },
                // 收费项目类型数据
                formItem1: {
                    typeCode: '',
                    chargeId: '',
                    chargeName: '',
                    typeName: '',
                    typeRule: ''
                },
                columns1: [{
                        title: '服务编号',
                        key: 'serverNum',
                        align: 'center',
                    },
                    {
                        title: '服务名称',
                        key: 'itemName',
                        align: 'center',
                    },
                    {
                        title: '单价',
                        key: 'taxPrice',
                        align: 'center',
                    },
                    {
                        title: '单位',
                        key: 'itemUnitName',
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
                            if (params.row.taxPrice == null) {
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
                                                this.config(params.index, params.row.serverNum, params.row.itemName, params.row.itemUnitName)
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
                                                    this.changeState(params.index, params.row.chargeId, params.row.state)
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
                                                    this.modifyConfig(params.index, params.row.serverNum, params.row.itemName, params.row.itemUnitName, params.row.state)
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
                                                    this.changeState(params.index, params.row.chargeId, params.row.state)
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
                                                    this.modifyConfig(params.index, params.row.serverNum, params.row.itemName, params.row.itemUnitName, params.row.state)
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
            config(rowIndex, serverNum, itemName, itemUnitName) {
                this.modal2 = true
                this.formItem2.checkbox = false
                // rowIndex是当前配置行索引
                this.formItem2.rowIndex = rowIndex
                this.formItem2.serverNum = serverNum
                this.formItem2.itemName = itemName
                this.formItem2.itemUnitName = itemUnitName
            },
            // 配置弹窗-确定
            config_ok(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // 未输入单价，单价即为0
                        
                        if (this.formItem2.taxPrice == '') {
                            this.formItem2.taxPrice = 0
                        }else if(Number(this.formItem2.taxPrice) == 0){
                            this.formItem2.taxPrice = 0
                        }
                        if(Number(this.formItem2.percent) == 0){
                            console.log(this.formItem2.percent)
                            this.formItem2.percent = 0
                        }
                        this.tableData1[this.formItem2.rowIndex].taxPrice = $.trim(this.formItem2.taxPrice)
                        this.tableData1[this.formItem2.rowIndex].percent = $.trim(this.formItem2.percent)
                        if (this.formItem2.checkbox == true) {
                            this.tableData1[this.formItem2.rowIndex].state = '开启';
                        } else {
                            this.tableData1[this.formItem2.rowIndex].state = '关闭';
                        }
                        this.modal2 = false
                        this.$refs['formItem2'].resetFields();
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
            // 修改配置弹窗
            modifyConfig(rowIndex, serverNum, itemName, itemUnitName, state) {
                this.modal2 = true
                // rowIndex是当前配置行索引
                this.formItem2.rowIndex = rowIndex
                this.formItem2.serverNum = serverNum
                this.formItem2.itemName = itemName
                this.formItem2.itemUnitName = itemUnitName
                this.formItem2.taxPrice = this.tableData1[rowIndex].taxPrice
                this.formItem2.percent = this.tableData1[rowIndex].percent
                if (state == '开启') {
                    this.formItem2.checkbox = true
                } else {
                    this.formItem2.checkbox = false
                }
            },
            // 开启关闭按钮
            changeState(rowIndex, chargeId, state) {
                if (state == '关闭') {
                    this.tableData1[rowIndex].state = '开启'
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定关闭收费？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            this.tableData1[rowIndex].state = '关闭'
                        },
                        onCancel: () => {}
                    });
                }
            },
            // 获取表格数据
            getTableDate(page) {
                this.$http.post('/charge/project/getImItemList.action', this.qs.stringify({
                    chargeType: this.formItem1.typeCode,
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        $.each(response.data.data, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                        })
                        this.tableData1 = response.data.data;
                        this.spinShow = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取收费项目类型数据
            getChargeItemTypeData(page) {
                this.$http.post('/charge/project/getProjectType.action').then(response => {
                    // console.log(response)
                    if (response.data.status == 0) {
                        this.formItem1.typeCode = response.data.data[0].typeCode
                        this.formItem1.chargeId = response.data.data[0].chargeId
                        this.formItem1.typeName = response.data.data[0].typeName
                        this.formItem1.typeRule = response.data.data[0].typeRule
                    } else {
                        console.log(response)
                    }
                    this.getTableDate()
                }).catch(error => {
                    console.log(error);
                })
            },
            // 页面保存
            save(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // 禁用提交按钮
                        this.forbiddenSubmit = true
                        let list = this.tableData1
                        for (var i = 0; i < list.length; i++) {
                            for (var key in list[i]) {
                                delete list[i]["createDate"];
                                delete list[i]['createUser']
                                delete list[i]['isDelete']
                                delete list[i]['itemId']
                                delete list[i]['itemPutOffTime']
                                delete list[i]['itemPutOnTime']
                                delete list[i]['itemStatus']
                                delete list[i]['itemTypeName']
                                delete list[i]['itemType']
                                delete list[i]['itemUnitCode']
                                delete list[i]['updateDate']
                                delete list[i]['updateUser']
                                delete list[i]['version']
                            }
                        }
                        $.each(list, function(key, val) {
                            if (val.state == '开启') {
                                val.state = '1';
                            } else if (val.state == '关闭') {
                                val.state = '0';
                            }
                        })
                        console.log(JSON.stringify(list))
                        this.$http.post('/charge/project/addChargeProject.action', this.qs.stringify({
                            chargeNum: this.formItem1.chargeId,
                            chargeName: $.trim(this.formItem1.chargeName),
                            chargeType: this.formItem1.typeCode,
                            chargeRule: this.formItem1.typeRule,
                            list: JSON.stringify(list)
                        })).then(response => {
                            console.log(response)
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '新增成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.$router.push({
                                            name: 'ServiceSettingItem'
                                        })
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.data,
                                    duration: 1,
                                    onClose: () => {
                                        this.forbiddenSubmit = false
                                    }
                                });
                                console.log(response)
                            }
                        }).catch(error => {
                            this.$Message.error({
                                content: '操作失败',
                                duration: 1,
                            });
                            this.forbiddenSubmit = false
                            console.log(error);
                        })
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 页面取消
            cancle() {
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
                fourthNavigation: '新增',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingItem',
                second: true,
                third: true,
                fourth: true
            })
            this.getChargeItemTypeData()
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
    .panel-word {
        line-height: 45px
    }
    .ivu-form-item-error-tip {
        position: absolute;
        left: 100px!important
    }
</style>