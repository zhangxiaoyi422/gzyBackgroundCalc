<template>
    <div>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading"></Table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:true,
                columns1: [{
                        title: '序号',
                        key: 'applyId',
                        align: 'center',
                    },
                    {
                        title: '支付方式',
                        key: 'applyType',
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
                            if (params.row.status == '开启') {
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
                                                this.paytypeClose(params.row.applyId)
                                            }
                                        }
                                    }, '关闭'),
                                ]);
                            } else if (params.row.status == '关闭') {
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
                                                this.paytypeOpen(params.row.applyId)
                                            }
                                        }
                                    }, '开启'),
                                ]);
                            }
                        }
                    }
                ],
                tableData1: [],
            };
        },
        methods: {
            // 获取表格数据
            getTableDate(page) {
                this.$http.post('/configure/applyConfigure.action').then(response => {
                    if (response.data.status == 0) {
                        // console.log(response)
                        $.each(response.data.data, function(key, val) {
                            if (val.status == '0') {
                                val.status = '开启';
                            } else if (val.status == '1') {
                                val.status = '关闭';
                            }
                        })
                        this.tableData1 = response.data.data;
                        this.loading = false
                    }else{
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
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
            // 支付方式开启
            paytypeOpen(applyId) {
                this.$http.post('/configure/updateApplyStatus.action', this.qs.stringify({
                    applyId: applyId,
                    status: '0'
                })).then(response => {
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
                        content: '操作失败',
                        duration: 1,
                    });
                    console.log(error);
                })
            },
            // 支付方式关闭
            paytypeClose(applyId) {
                this.$http.post('/configure/updateApplyStatus.action', this.qs.stringify({
                    applyId: applyId,
                    status: '1'
                })).then(response => {
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
                        content: '操作失败',
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
                thirdNavigation: '支付方式',
                // name: 'PerchargeSetting',
                secondName: 'PerchargeSettingPayType',
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