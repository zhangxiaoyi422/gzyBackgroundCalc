<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="deptName" placeholder="部门名称/业务模块" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                </li>
                <li class="li">
                    <Button type="primary" @click="getTableDate(1)">查询</Button>
                </li>
            </ul>
        </div>
        <div class="fun-tool">
            <Button type="primary" @click="addNewAccount">新增部门</Button>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
        <Page :total="totalCount" :current="current" show-total @on-change="getTableDate" show-sizer :page-size-opts="[10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="showPage"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 是否显示分页，默认显示
                showPage: true,
                pageSize: 10,
                loading: true,
                // 按部门名称,业务模块查询（2017.11.22 丙勇说：业务模块暂时不支持查询，暂时先只做部门名称）
                deptName: '',
                totalCount: 0,
                current: 1,
                tableData1: [],
                columns1: [{
                        title: '部门名称',
                        key: 'deptName',
                        align: 'center',
                        width: '200px'
                    },
                    {
                        title: '业务模块',
                        key: 'name',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        width: '200px',
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
                                                name: 'DepartmentLimitsEdit',
                                                params: {
                                                    deptId: params.row.deptId
                                                }
                                            })
                                        }
                                    }
                                }, '编辑'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            addNewAccount() {
                this.$router.push({
                    name: 'DepartmentLimitsAdd'
                })
            },
            // 修改每页显示条数
            getTableDateBypagesize(pagesize) {
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.post('/auth/dept/getDeptList.action', this.qs.stringify({
                    deptName: this.deptName,
                    pageNo: page,
                    pageSize: this.pageSize
                })).then(response => {
                    if (response.data.status == 0) {
                        if(response.data.data.totalCount == 0){
                            this.showPage = false
                        }else{
                            this.showPage = true
                        }
                        console.log(response)
                        this.tableData1 = response.data.data.list;
                        this.totalCount = response.data.data.totalCount;
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
                primaryNavigation: '账号管理',
                subNavigation: '部门权限',
                name: 'DepartmentLimitsList',
                second: true,
                third: false
            });
            // 初始化表格，获取第一页
            this.getTableDate(1);
        },
    }
</script>

<style>

</style>