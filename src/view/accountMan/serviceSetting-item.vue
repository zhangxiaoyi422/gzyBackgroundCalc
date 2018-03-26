<template>
    <div>
        <div class="search-area clearfix">
            <Form :model="formItem1">
                <input type='text' style='display:none'/>
                <ul class="ul">
                    <li class="li">
                        <label>关键字：</label>
                        <Input v-model="formItem1.chargeItemName" placeholder="收费项目编号/收费项目名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                    </li>
                    <li class="li">
                        <label>收费项目状态：</label>
                        <Select v-model="formItem1.model1" style="width:200px">
                            <Option v-for="item in formItem1.status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <Button type="primary" @click="addChargeItem" style="margin:0 0 10px 0">新增收费项目</Button>
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading"></Table>
        <Page :total="totalCount" :page-size="15" :current="current" show-total @on-change="getTableDate" v-if="showPage"></Page>
        <Modal v-model="showAllNotaryBox" @on-cancel="showAllNotary_cancleTop">
            <div style="margin:20px 0;font-size:16px">
                使用收费项目 “ {{chargeName}} ” 的公证处：
            </div>
            <div style="height:300px;overflow-y:auto;overflow-x:hidden">
                <Table :columns="columns2" :data="tableData2"></Table>
            </div>
            <div slot="footer">
                <Button type="primary" @click="showAllNotary_ok">确定</Button>
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
                // 显示所有已设置此收费的项目的公证机构
                showAllNotaryBox: false,
                chargeName: '',
                columns2: [{
                    title: '公证机构',
                    key: 'parameterOrgName',
                    align: 'center',
                }],
                tableData2: [],                
                loading: true,
                formItem1: {
                    chargeItemName: '',
                    status: [{
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
                    model1: '0',
                },
                current: 1,
                pageNow:1,
                totalCount:0,
                columns1: [{
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
                        title: '收费项目类型',
                        key: 'chargeType',
                        align: 'center',
                    },
                    {
                        title: '收费项目状态',
                        key: 'state',
                        align: 'center',
                    },
                    {
                        title: '公证机构数量',
                        key: 'orgCount',
                        align: 'center',
                    },
                    {
                        title: '设置为此收费项目的所有公证机构',
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
                                            this.showAllNotary(params.row.chargeId, params.row.chargeName)
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.state == '开启') {
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
                                                this.chargeItemState(params.row.chargeId, params.row.state)
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
                                                this.chargeItemModify(params.row.chargeId)
                                            }
                                        }
                                    }, '修改'),
                                ]);
                            } else if (params.row.state == '关闭') {
                                if (params.row.orgCount == '0') {
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
                                                    this.chargeItemState(params.row.chargeId, params.row.state)
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
                                                    this.chargeItemModify(params.row.chargeId)
                                                }
                                            }
                                        }, '修改'),
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
                                                    this.chargeItemDelete(params.row.chargeId)
                                                }
                                            }
                                        }, '删除'),
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
                                                    this.chargeItemState(params.row.chargeId, params.row.state)
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
                                                    this.chargeItemModify(params.row.chargeId)
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
            // 显示已被设置为此收费项目的所有公证机构弹窗
            showAllNotary(chargeId, chargeName) {
                this.showAllNotaryBox = true
                this.chargeName = chargeName
                this.$http.post('/charge/project/getProjectOrgList.action', this.qs.stringify({
                    chargeId: chargeId,
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        if(response.data.data){
                            this.tableData2 = response.data.data
                        }
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
            showAllNotary_cancleTop() {
                this.showAllNotaryBox = false
                this.tableData2 = []                
            },
            showAllNotary_ok() {
                this.showAllNotaryBox = false  
                this.tableData2 = []                            
            },
            // 开启关闭按钮
            changeState(rowIndex, state) {
                if (state == '关闭') {
                    this.tableData1[rowIndex].state = '开启'
                } else {}
            },
            // 开启关闭收费项目
            chargeItemState(chargeId, state) {
                if (state == '开启') {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定关闭收费？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            state = '0'
                            this.$http.post('/charge/project/editProjectState.action', this.qs.stringify({
                                chargeId: chargeId,
                                state: state,
                            })).then(response => {
                                console.log(response)
                                if (response.data.status == 0) {
                                    this.getTableDate(this.pageNow)
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
                        onCancel: () => {}
                    });
                } else if (state == '关闭') {
                    state = '1'
                    this.$http.post('/charge/project/editProjectState.action', this.qs.stringify({
                        chargeId: chargeId,
                        state: state,
                    })).then(response => {
                        console.log(response)
                        if (response.data.status == 0) {
                            this.getTableDate(this.pageNow)
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
                }
            },
            // 修改收费项目
            chargeItemModify(chargeId) {
                this.$router.push({
                    name: 'ServiceSettingItemModify',
                    params: {
                        chargeId: chargeId
                    }
                })
            },
            // 删除收费项目
            chargeItemDelete(chargeId) {
                this.$http.post('/charge/project/delCharge.action', this.qs.stringify({
                    chargeId: chargeId,
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        this.$Message.success({
                            content: '删除成功',
                            duration: 1,
                            onClose: () => {
                                this.getTableDate(this.pageNow)
                            }
                        });
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
            // 新增收费项目
            addChargeItem() {
                this.$router.push({
                    name: 'ServiceSettingItemAdd'
                })
            },
            // 获取表格数据
            getTableDate(page) {
                // debugger
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.pageNow = page
                this.$http.post('/charge/project/getProjectList.action', this.qs.stringify({
                    pageNo: page,
                    pageSize: 15,
                    content: this.formItem1.chargeItemName,
                    state: this.formItem1.model1
                })).then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        console.log(response.data.data.totalCount)
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        $.each(response.data.data.list, function(key, val) {
                            if (val.state == '0') {
                                val.state = '关闭';
                            } else if (val.state == '1') {
                                val.state = '开启';
                            }
                        })
                        this.tableData1 = response.data.data.list;
                        this.totalCount = response.data.data.totalCount
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
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '运营管理',
                subNavigation: '服务收费配置',
                thirdNavigation: '收费项目配置',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingItem',
                second: true,
                third: true
            })
            this.getTableDate(1)
        }
    }
</script>

<style scoped>

</style>