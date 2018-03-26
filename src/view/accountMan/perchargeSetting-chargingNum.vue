<template>
    <div>
        <Button type="primary" @click="addCharge" style="margin:0 0 10px 0">新增</Button>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading"></Table> 
        <Modal v-model="modal1" title="新增" @on-cancel="cancelTop">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="clearfix" :label-width="100">
            <input type='text' style='display:none'/>
                <FormItem label="序号：">
                    {{formItem.totalCount + 1}}
                </FormItem>  
                <FormItem prop="money" label="充值金额：">
                    <Input v-model="formItem.money" placeholder="请输入正整数" style="width:200px;margin-right:5px" :maxlength="5"></Input>元<span style="margin-left:10px;color:#999">例如：50元</span>
                </FormItem> 
                <FormItem label="充值公证币：">
                    {{isNaN(formItem.money*10)?'':formItem.money*10}}
                </FormItem>               
            </Form>
            <div slot="footer">
                <Button type="primary" @click="addCharge_ok('formItem')" :disabled="forbiddenSubmit">确定</Button>
                <Button type="primary" @click="addCharge_cancle">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            const validateMoney = (rule, value, callback) => {
                // 如果没填写，提示
                let reg = /^[1-9]\d*$/;
                 
                if (this.formItem.money.replace(/ /g, "") == '') {
                    callback(new Error('请输入充值金额'));
                }else if(reg.test(this.formItem.money) == false){
                    callback(new Error('请输入正整数'));                
                }else{
                    this.$http.post('/configure/isRepeatePrice.action', this.qs.stringify({
                        taxPrice:this.formItem.money,
                    })).then(response => {
                        console.log(response)
                        if (response.data.data == false) {
                            callback(new Error('充值金额重复'));
                        } else{
                            callback()
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            };
            return {
                forbiddenSubmit:false,
                loading:true,
                ruleCustom: {
                    money: [
                        { required: true, validator: validateMoney, trigger: 'blur' }
                    ]
                },
                // 新增充值数量弹窗
                modal1:false,
                formItem:{
                    totalCount:0,
                    money:'',
                },
                columns1: [{
                        type: 'index',
                        title:'序号',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '充值金额',
                        key: 'taxPrice',
                        align: 'center',                        
                    },
                    {
                        title: '充值公证币',
                        key: 'token',
                        align: 'center',                        
                    },
                    {
                        title: '状态',
                        key: 'priceStatus',
                        align: 'center',                        
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.priceStatus == '开启'){
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
                                                this.changeState(params.row.item_price_id,params.row.priceStatus)
                                            }
                                        }
                                    }, '关闭'),
                                ]);
                            }else if(params.row.priceStatus == '关闭'){
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
                                                this.changeState(params.row.item_price_id,params.row.priceStatus)
                                            }
                                        }
                                    }, '开启'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.deleteChargeNum(params.row.item_price_id)
                                            }
                                        }
                                    }, '删除'),
                                ]);
                            }
                        }
                    }
                ],
                tableData1: [],
            };
        },
        methods: {
            // 显示新增弹窗
            addCharge(){
                this.modal1 = true
            },
            // 新增弹窗-确定
            addCharge_ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // 禁用提交按钮
                        this.forbiddenSubmit = true
                        this.$http.post('/configure/v_addNewTokenItem.action', this.qs.stringify({
                            taxPrice:this.formItem.money,
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.$Message.success({
                                    content: '新增成功',
                                    duration: 1,
                                    onClose: () => {
                                        this.modal1 = false
                                        this.$refs['formItem'].resetFields();
                                        this.getTableDate()
                                        this.forbiddenSubmit = false
                                    }
                                });
                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                    onClose: () => {
                                        this.modal1 = false
                                        this.$refs['formItem'].resetFields();
                                        this.forbiddenSubmit = false
                                    }
                                });
                                console.log(response)
                            }
                        }).catch(error => {
                            this.$Message.error({
                                content: error,
                                duration: 1,
                                onClose: () => {
                                    this.modal1 = false
                                    this.$refs['formItem'].resetFields();
                                    this.forbiddenSubmit = false
                                }
                            });
                            console.log(error);
                        })
                    } else {
                        // 校验失败
                        // this.$Message.error('校验失败');
                    }
                });
            },
            // 新增弹窗-取消
            addCharge_cancle(){
                this.$refs['formItem'].resetFields();
                this.modal1 = false
            },
            // 新增弹窗-标题栏X                        
            cancelTop(){
                this.$refs['formItem'].resetFields();
            },
            // 改变开启关闭状态          
            changeState(itemPriceId,priceStatus){
                if(priceStatus == '开启'){
                    priceStatus = 'INVALID'
                }else if(priceStatus == '关闭'){
                    priceStatus = 'VALID'                    
                }
                this.$http.post('/configure/updateStatus.action', this.qs.stringify({
                    itemPriceId: itemPriceId,
                    priceStatus: priceStatus
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        this.getTableDate()
                    }else{
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    this.$Message.error({
                        content: error,
                        duration: 1,
                    });
                    console.log(error);
                })
            },
            // 删除充值金额
            deleteChargeNum(itemPriceId){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定删除？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.post('/configure/deleteItem.action', this.qs.stringify({
                            itemPriceId: itemPriceId,
                        })).then(response => {
                            console.log(response)
                            if (response.data.status == 0) {
                                // 删除成功
                                this.getTableDate()

                            }else{
                                this.$Message.error({
                                    content: response.data.message,
                                    duration: 1,
                                });
                                console.log(response)
                            }
                        }).catch(error => {
                            this.$Message.error({
                                content: error,
                                duration: 1,
                            });
                            console.log(error);
                        })
                    },
                    onCancel: () => {}
                });
            },
            // 获取表格数据
            getTableDate(page) {
                this.$http.post('/configure/rechargeConfigure.action').then(response => {
                    if (response.data.status == 0) {

                        console.log(response)
                        $.each(response.data.data.list, function(key, val) {
                            if (val.priceStatus == 'VALID') {
                                val.priceStatus = '开启';
                            } else if (val.priceStatus == 'INVALID') {
                                val.priceStatus = '关闭';
                            }
                        })

                        this.tableData1 = response.data.data.list;
                        this.loading = false;
                        this.formItem.totalCount = response.data.data.totalCount
                    }else{
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    this.$Message.error({
                        content: error,
                        duration: 1,
                    });
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '公证币预充值配置',
                thirdNavigation: '充值数量',
                // name: 'PerchargeSetting',
                secondName: 'PerchargeSettingChargingNum',
                second: true,
                third: true
            })
            this.getTableDate()
        }
    }
</script>

<style scoped>
    #test {
        font-size: 20px;
        color: red
    }
</style>