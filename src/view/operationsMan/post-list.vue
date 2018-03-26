<template>
    <div class="refund-query">
        <div class="search-area clearfix">
            <ul class="ul">
                <li class="li">
                    <label>关键字：</label>
                    <Input v-model="postName" placeholder="岗位名称" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                </li>
                <li class="li" v-if="showDeptSelect">
                    <label>部门：</label>
                    <Select v-model="model1" style="width:200px;">
                        <Option v-for="item in deptName" :value="item.value" :key="item.value" style="width: 200px">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="li">
                    <Button type="primary" @click="getTableDate(1)">查询</Button>
                </li>
            </ul>
        </div>
        <div class="fun-tool">
            <Button type="primary" @click="addNewPost" v-if="permission">新增岗位</Button>
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
                showPage:true,
                // 页码
                pageSize:10,
                permission:false,
                loading:true,
                // 是否显示部门下拉框，默认false不显示
                showDeptSelect:false,
                // 部门名称
                postName: '',
                totalCount:0,
                current:1,
                // 岗位名称select，要动态获取的吧？
                deptName: [
                    {
                        value: '0',
                        label: '全部'
                    },
                ],
                model1: '0',
                tableData1:[],
                columns1: [
                    {
                        title: '岗位名称',
                        key: 'postName',
                        align: 'center',
                    },
                    {
                        title: '所属部门',
                        key: 'deptName',
                        align: 'center',
                    },
                    {
                        title: '岗位描述',
                        key: 'remark',
                        align: 'center',
                        ellipsis: true,
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
                                                name: 'PostDetail',
                                                params: {
                                                    postId: params.row.postId,
                                                    deptId:params.row.deptId
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            addNewPost(){
                this.$router.push({name:'PostAdd'})
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
                this.$http.post('/auth/post/getPostList.action', this.qs.stringify({
                    postName: this.postName,
                    deptId: this.$store.state.userInfo.admin?this.model1:this.$store.state.userInfo.deptId,
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
                    }else{
                        this.$Message.error({
                            content: response.data.message,
                            duration: 1,
                        });
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取全部部门
            getDeptList(){
                this.$http.post('/auth/dept/getAllList.action').then(response => {

                    let _this = this
                    $.each(response.data.data, function(key, val) {
                        _this.deptName.push({'value':val.deptId,'label':val.deptName})
                    })
                    
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '账号管理',
                subNavigation: '部门岗位',
                name: 'PostList',
                second: true,
                third: false
            });
            // 初始化表格，获取第一页
            this.getTableDate(1);
            // admin显示部门下拉框    
            if(this.$store.state.userInfo.admin == true){
                this.showDeptSelect = true
                this.getDeptList()
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