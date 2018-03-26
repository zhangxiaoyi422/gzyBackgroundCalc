<template>
    <div>
        <form action="" method="post" id="form"></form>
        <div class="search-area clearfix">
            <Form ref="form" :model="form" :label-width="0">
                <input type='text' style='display:none'/>
                <ul class="ul">
                    <li class="li">
                        <label>关键字：</label>
                        <FormItem class="formItem" prop="keywords">
                            <Input v-model="form.keywords" placeholder="用户名/手机号" style="width: 200px" @keyup.native.13&&108="getTableDate(1)"></Input>
                        </FormItem>
                    </li>           
                    <li class="li">
                        <label>实名状态：</label>
                        <FormItem class="formItem" prop="auditStateDefault"> 
                            <Select v-model="form.auditStateDefault" style="width:200px;">
                                <Option v-for="item in form.auditState" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <label>注册来源：</label>
                        <FormItem class="formItem" prop="registerResourceDefault"> 
                            <Select v-model="form.registerResourceDefault" style="width:200px;">
                                <Option v-for="item in form.registerResource" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <label>用户类型：</label>
                        <FormItem class="formItem" prop="userTypeDefault"> 
                            <Select v-model="form.userTypeDefault" style="width:200px;">
                                <Option v-for="item in form.userType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <label>是否注销：</label>
                        <FormItem class="formItem" prop="isCacncelDefault"> 
                            <Select v-model="form.isCacncelDefault" style="width:200px;">
                                <Option v-for="item in form.isCacncel" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </li>
                    <li class="li">
                        <Button type="primary" @click="getTableDate(1)">查询</Button>
                        <Button type="primary" @click="searchArea_reset('form')">重置</Button>
                    </li>
                </ul>
            </Form>
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="JSON.stringify(this.resData) == '{}'"></Table>
        <Page :total="resData.totalCount" :current="current" :page-size="pageSize" show-total @on-change="jumpToPage" show-sizer :page-size-opts="[10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize" v-if="resData.totalCount"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showPage: true,
                pageSize:15,
                // 当前页码
                current: 1,
                resData:{},
                form:{
                    keywords:'',
                    // 实名状态select
                    auditState: [
                        {
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '1',
                            label: '已实名'
                        },
                        {
                            value: '0',
                            label: '未实名'
                        },
                    ],
                    auditStateDefault: '99',
                    // 注册来源select
                    registerResource: [
                        {
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '1',
                            label: '公证云网站'
                        },
                        {
                            value: '2',
                            label: '公证云APP'
                        },
                        {
                            value: '3',
                            label: '第三方网站'
                        },
                        {
                            value: '4',
                            label: '微信城市服务'
                        },
                        {
                            value: '5',
                            label: 'weui版微信'
                        },
                        {
                            value: '6',
                            label: '建行城市服务'
                        },
                        {
                            value: '7',
                            label: 'H5版本在线受理'
                        },
                        {
                            value: '8',
                            label: '支付宝城市服务'
                        },
                        {
                            value: '9',
                            label: '公证录音'
                        },
                        {
                            value: '10',
                            label: '公证签约'
                        },
                        {
                            value: '11',
                            label: '知识产权'
                        },
                        {
                            value: '12',
                            label: '新浪'
                        },
                        {
                            value: '13',
                            label: '旗舰店注册'
                        }
                    ],
                    registerResourceDefault: '99',
                    // 用户类型select
                    userType: [
                        {
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '2',
                            label: '个人用户'
                        },
                        // {
                        //     value: '3',
                        //     label: '电子送达用户'
                        // },
                        {
                            value: '4',
                            label: '机构用户'
                        },
                        // {
                        //     value: '5',
                        //     label: '公证书查询用户'
                        // },
                        // {
                        //     value: '6',
                        //     label: '中介机构用户'
                        // },
                        // {
                        //     value: '15',
                        //     label: '第三方用户'
                        // },
                    ],
                    userTypeDefault: '99',
                    // 是否注销select
                    isCacncel: [
                        {
                            value: '99',
                            label: '全部'
                        },
                        {
                            value: '0',
                            label: '未注销'
                        },
                        {
                            value: '1',
                            label: '已注销'
                        },
                    ],
                    isCacncelDefault: '99',
                }, 
                // 表格
                columns1: [
                    {
                        title: '用户名',
                        key: 'userAccount',
                        align: 'center',
                    },
                    {
                        title: '真实姓名',
                        key: 'realName',
                        align: 'center',
                    },
                    {
                        title: '手机号',
                        key: 'userMobile',
                        align: 'center',
                    },
                    {
                        title: '实名状态',
                        key: 'audiState',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.audiState) {
                            case '0':
                                return h('span', '未实名');break
                            case '1':
                                return h('span', '已实名');break
                            case '-':
                                return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '注册来源',
                        key: 'registerResource',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.registerResource) {
                            case '1':
                                return h('span', '公证云网站');break
                            case '2':
                                return h('span', '公证云APP');break
                            case '3':
                                return h('span', '第三方网站');break
                            case '4':
                                return h('span', '微信城市服务');break
                            case '5':
                                return h('span', 'weui版微信');break
                            case '6':
                                return h('span', '建行城市服务');break
                            case '7':
                                return h('span', 'H5版本在线受理');break
                            case '8':
                                return h('span', '支付宝城市服务');break
                            case '9':
                                return h('span', '公证录音');break
                            case '10':
                                return h('span', '公证签约');break
                            case '11':
                                return h('span', '知识产权');break
                            case '12':
                                return h('span', '新浪');break
                            case '13':
                                return h('span', '旗舰店注册');break
                            case '-':
                                return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '用户类型',
                        key: 'userType',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.userType) {
                                case '2':
                                    return h('span', '个人用户');break
                                case '3':
                                    return h('span', '电子送达用户');break
                                case '4':
                                    return h('span', '机构用户');break
                                case '5':
                                    return h('span', '公证书查询用户');break
                                case '6':
                                    return h('span', '中介机构用户');break
                                case '15':
                                    return h('span', '第三方用户');break
                                case '-':
                                    return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '是否注销',
                        key: 'isDelete',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.isDelete) {
                            case '0':
                                return h('span', '未注销');break
                            case '1':
                                return h('span', '已注销');break
                            case '-':
                                return h('span', '-');break
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        width : 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'PlatformClientManDetail',
                                                params: {
                                                    id: params.row.userId
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    }
                ],
                tableData1: []
            }
        },
        methods: {
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 重置
            searchArea_reset(name){
                this.$refs[name].resetFields();
            },
            // 分页跳转
            jumpToPage(page){
                this.getTableDate(page,this.order)
            },
            // 获取表格数据
            getTableDate(page,order) { 
                // 点击分页时，要把此时点击的页码赋值给current，不然点击搜索后页码不会跳回1
                this.current = page
                this.$http.post('/customer/ajax/queryPlatformCustomer.action', this.qs.stringify({
                    keyword:this.form.keywords,
                    auditState: this.form.auditStateDefault,
                    registerResource: this.form.registerResourceDefault,
                    userType:this.form.userTypeDefault,
                    isCacncel:this.form.isCacncelDefault,
                    pageNo: page,
                    pageSize: this.pageSize,
                })).then(response => {
                        console.log(response)
                    if (response.data.code == 200) {
                        this.resData =  response.data.data
                        this.tableData1 = response.data.data.queryPlatformCustomer  
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '客户管理',
                subNavigation: '平台客户管理',
                name: 'PlatformClientMan',
                second: true,
            });
            // 表格初始化，显示第一页
            this.getTableDate(1)
        },
    }
</script>

<style scoped>

</style>

