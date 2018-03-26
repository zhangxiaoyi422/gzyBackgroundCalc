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
        <Table :columns="columns1" :data="tableData1" :show-header="true" style="margin-top:10px" :loading="loading"></Table>
        <Page :total="totalCount" :page-size="15" show-total @on-change="getTableDate" :current="this.current"  v-if="showPage"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 是否显示分页，默认显示
                showPage: true,
                loading:true,
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
                        title: '公证机构数量',
                        key: 'orgCount',
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
                                            this.$router.push({
                                                name: 'ServiceSettingNotaryItemSetting',
                                                params:{
                                                    chargeNum:params.row.chargeNum,
                                                    chargeName:params.row.chargeName,
                                                    state:params.row.state,
                                                    chargeId:params.row.chargeId
                                                }
                                            });
                                        }
                                    }
                                }, '设置公证机构'),
                            ]);
                        }
                    }
                ],
                current:1,
                totalCount:0,
                tableData1: [],
            };
        },
        methods: {
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.post('/charge/project/getProjectList.action', this.qs.stringify({
                    pageNo: page,
                    pageSize: 15,
                    content: this.formItem1.chargeItemName,
                    state: this.formItem1.model1
                })).then(response => {
                    console.log(response)
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
                        this.totalCount = response.data.data.totalCount
                        this.tableData1 = data;
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
                fourthNavigation:'按收费项目显示',
                // name: 'PerchargeSetting',
                secondName: 'ServiceSettingNotary',
                // thirdName: 'serviceSettingNotaryItem',
                second: true,
                third: true,
                fourth:true,
                forthTab:'ServiceSettingNotaryItem'

            })
            this.getTableDate(1)
        }
    }
</script>

<style scoped>

</style>