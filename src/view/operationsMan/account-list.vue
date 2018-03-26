<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="content" placeholder="用户名/姓名/岗位名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                </li>
                <li class="li" v-if="showDeptSelect">
                    <label>所属部门：</label>
                    <Select v-model="model1" style="width:200px;">
                            <Option v-for="item in deptName" :value="item.value" :key="item.value" style="width: 200px">{{ item.label }}</Option>
                        </Select>
                </li>
                <li class="li">
                    <label>账号状态：</label>
                    <Select v-model="model2" style="width:200px;">
                            <Option v-for="item in accountStatus" :value="item.value" :key="item.value" style="width: 200px">{{ item.label }}</Option>
                        </Select>
                </li>
                <li class="li">
                    <Button type="primary" @click="getTableDate(1)">查询</Button>
                </li>
            </ul>
        </div>
        <div class="fun-tool">
            <Button type="primary" @click="addNewAccount" v-if="permission">新增账号</Button>
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
                pageSize:10,
                permission:false,
                loading:true,
                // 显示冻结账号弹窗
                // frozenAccountBox:false,
                // 显示禁用账号弹窗                
                // forbiddenAccountBox:false,
                // 用户名/姓名/岗位名称
                content: '',
                totalCount: 0,
                current: 1,
                pageNow:1,
                showDeptSelect:false,
                // 岗位名称select
                deptName: [{
                    value: '0',
                    label: '全部'
                }, ],
                model1: '0',
                //账号状态
                accountStatus: [{
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '冻结'
                    },
                    {
                        value: '2',
                        label: '启用'
                    },
                    {
                        value: '3',
                        label: '禁用'
                    },
                ],
                model2: '0',
                tableData1: [],
                columns1: [{
                        title: '用户名',
                        key: 'userAccount',
                        align: 'center',
                    },
                    {
                        title: '姓名',
                        key: 'realName',
                        align: 'center',
                    },
                    {
                        title: '所属部门',
                        key: 'deptName',
                        align: 'center',
                    },
                    {
                        title: '账号状态',
                        key: 'status',
                        align: 'center',
                    },
                    {
                        title: '岗位名称',
                        key: 'postName',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            // status=0冻结
                            if(params.row.status == '冻结'){
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
                                                    name: 'AccountDetail',
                                                    params: {
                                                        userId: params.row.userId,
                                                        deptId: params.row.deptId
                                                    }
                                                })
                                            }
                                        }
                                    }, '详情'),
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
                                                this.openAccount(params.row.userId)                                                                                                
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
                                                this.forbiddenAccountBox(params.row.userId)                                                
                                            }
                                        }
                                    }, '禁用'),
                                ]);
                            // status=1启用
                                
                            }else if(params.row.status == '启用'){
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
                                                    name: 'AccountDetail',
                                                    params: {
                                                        userId: params.row.userId,
                                                        deptId: params.row.deptId
                                                    }
                                                })
                                            }
                                        }
                                    }, '详情'),
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
                                                this.frozenAccountBox(params.row.userId)
                                            }
                                        }
                                    }, '冻结'),
                                ]);
                            // status=2禁用
                                
                            }else if(params.row.status == '禁用'){
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
                                                    name: 'AccountDetail',
                                                    params: {
                                                        userId: params.row.userId,
                                                        deptId: params.row.deptId
                                                    }
                                                })
                                            }
                                        }
                                    }, '详情'),
                                ]);
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            // 开启账号            
            openAccount(userId){
                this.$http.post('/auth/user/editUserStatus.action', this.qs.stringify({
                    userId: userId,
                    status: '1'
                })).then(response => {
                    if (response.data.status == 0) {
                        this.getTableDate(this.pageNow)
                    }
                });
            },
            // 冻结账号弹窗
            frozenAccountBox(userId) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>冻结后，账号将暂时不可使用。<br>确定冻结账号？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.post('/auth/user/editUserStatus.action', this.qs.stringify({
                            userId: userId,
                            status: '0'
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.getTableDate(this.pageNow)
                            }
                        });
                    },
                    onCancel: () => {}
                });
            },
            // 禁用账号弹窗
            forbiddenAccountBox(userId) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>禁用后，账号将永久无法启用，但相关信息仍然保留。<br>确定禁用账号？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.post('/auth/user/editUserStatus.action', this.qs.stringify({
                            userId: userId,
                            status: '2'
                        })).then(response => {
                            if (response.data.status == 0) {
                                this.getTableDate(this.pageNow)
                            }
                        });
                    },
                    onCancel: () => {}
                });
            },
            addNewAccount() {
                this.$router.push({
                    name: 'AccountAdd'
                })
            },
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 获取表格数据
            getTableDate(page) {
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.pageNow = page
                this.$http.post('/auth/user/getUserList.action', this.qs.stringify({
                    content: this.content,
                    deptId: this.model1,
                    status: this.model2,
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
                        let data = response.data.data.list
                        $.each(data, function(key, val) {
                            if (val.status == '0') {
                                val.status = '冻结';
                            } else if (val.status == '1') {
                                val.status = '启用';
                            } else if (val.status == '2') {
                                val.status = '禁用';
                            }
                        })
                        this.tableData1 = data;
                        this.totalCount = response.data.data.totalCount;
                        this.loading = false
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取全部部门
            getDeptList() {
                this.$http.post('/auth/dept/getAllList.action').then(response => {
                    if (response.data.status == 0) {
                        let _this = this
                        $.each(response.data.data, function(key, val) {
                            _this.deptName.push({
                                'value': val.deptId,
                                'label': val.deptName
                            })
                        })
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门账号',
                name: 'AccountList',
                second: true,
                third: false
            });
 
            // admin显示部门下拉框    
            if (this.$store.state.userInfo.admin == true) {
                this.showDeptSelect = true
                this.getDeptList()
                this.getTableDate();
            } else {
                // 不是超级管理员则设置deptId为登录用户deptId
                this.model1 = this.$store.state.userInfo.deptId
                this.getTableDate();
            }
            if (this.$store.state.limitList.indexOf("4_2_2") >= 0) {
                // 如果有新增权限
                this.permission = true
            }
        },
    }
</script>

<style>

</style>