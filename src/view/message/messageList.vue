<template>
    <div class="message-list">
        <div class="handle-btn">
            <label>消息：</label>
            <Button :type="btn1" @click="stateAll">全部</Button>
            <Button :type="btn2" @click="stateNotRead">未读</Button>
            <Button :type="btn3" @click="stateAlreadyRead">已读</Button>
        </div>
        <div class="handle-btn">
            <label>业务：</label>
            <Button :type="btn4" @click="serviceAll">全部</Button>
            <Button :type="btn5" @click="serviceChristal">申领水晶币审批</Button>
            <Button :type="btn6" @click="serviceRefund">公证币退款审批</Button>
            <Button :type="btn7" @click="serviceBilling">开具发票审批</Button>
            <Button :type="btn8" @click="serviceTally">公证保管结算受理</Button>

        </div>
        <Table :columns="columns1" :data="tableData1" :show-header="false" style="margin-top:10px" :loading="loading" highlight-row @on-current-change="jumpToDetail"></Table>
        <Page :total="totalCount" :current="current" show-total @on-change="getTableDate" show-sizer :page-size-opts="[10, 15, 20, 50]" @on-page-size-change="getTableDateBypagesize"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                current:1,
                pageNow:1,
                pageSize:10,
                showPage:false,
                loading:true,
                btn1:'primary',
                btn2:'ghost',
                btn3:'ghost',
                btn4:'primary',
                btn5:'ghost',
                btn6:'ghost',
                btn7:'ghost',
                btn8:'ghost',
                state:'',
                service:'',
                totalCount:0,
                current:1,
                columns1: [{
                        title: '业务',
                        key: 'service'
                    },
                    {
                        title: '申请详情',
                        key: 'applyDetail'
                    },
                    {
                        title: '时间',
                        key: 'applyTime'
                    },
                    {
                        title: '消息状态',
                        key: 'state'
                    },
                    {
                        title: '操作',
                        key: '',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.state == '未读'){
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
                                            click: (e) => {
                                                e.stopPropagation();
                                                this.changeMessageState(params.row.messageId)
                                            }
                                        }
                                    }, '标为已读'),
                                ]);
                            }
                        }
                    }
                ],
                tableData1: [],
            }
        },
        computed: {},
        methods: {
            // 修改每页显示条数
            getTableDateBypagesize(pagesize){
                this.pageSize = pagesize
                this.getTableDate(1)
            },
            // 获取表格数据
            getTableDate(page) {
                // console.log('state '+this.state)
                // console.log('service '+this.service)
                this.current = page
                this.pageNow = page
                this.$http.post('/message/v_messageList.action', this.qs.stringify({
                    pageNo: page,
                    pageSize: this.pageSize,
                    state:this.state,
                    service:this.service
                })).then(response => {
                    if (response.data.status == 0) {

                        console.log(response)
                        let data = response.data.data.list
                        $.each(data, function(key, val) {
                            if (val.service == '0') {
                                val.service = '申请水晶币审批';
                            } else if (val.service == '1') {
                                val.service = '公证币退款审批';
                            } else if(val.service == '2') {
                                val.service = '开具发票审批';
                            } else if(val.service == '3') {
                                val.service = '公证保管结算受理';
                            }
                            if (val.state == '0') {
                                val.state = '未读';
                            } else if (val.state == '1') {
                                val.state = '已读';
                            }
                        })

                        console.log(data)
                        
                        this.tableData1 = data;
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
                    this.$Message.error({
                        content: '加载失败',
                        duration: 1,
                    });
                    console.log(error);
                })
            },
            // 获取全部已读未读列表
            stateAll(){
                this.state = '';
                this.getTableDate();
                this.btn1 = 'primary'
                this.btn2 = 'ghost'
                this.btn3 = 'ghost'
            },
            // 获取未读列表
            stateNotRead(){
                this.state = '0';
                this.getTableDate();
                this.btn1 = 'ghost'
                this.btn2 = 'primary'
                this.btn3 = 'ghost'
            },
            // 获取已读列表
            stateAlreadyRead(){
                this.state = '1';
                this.getTableDate();
                this.btn1 = 'ghost'
                this.btn2 = 'ghost'
                this.btn3 = 'primary'
            },
            // 获取全部业务列表
            serviceAll(){
                this.service = '';
                this.getTableDate();
                this.btn4 = 'primary'
                this.btn5 = 'ghost'
                this.btn6 = 'ghost'
                this.btn7 = 'ghost'
                this.btn8 = 'ghost'
            },
            // 获取申领水晶币审批
            serviceChristal(){
                this.service = '0';
                this.getTableDate();
                this.btn4 = 'ghost'
                this.btn5 = 'primary'
                this.btn6 = 'ghost'
                this.btn7 = 'ghost'
                this.btn8 = 'ghost'
            },
            // 获取公证币退款审批
            serviceRefund(){
                this.service = '1';
                this.getTableDate();
                this.btn4 = 'ghost'
                this.btn5 = 'ghost'
                this.btn6 = 'primary'
                this.btn7 = 'ghost'
                this.btn8 = 'ghost'
            },
            // 获取开具发票审批
            serviceBilling(){
                this.service = '2';
                this.getTableDate();
                this.btn4 = 'ghost'
                this.btn5 = 'ghost'
                this.btn6 = 'ghost'
                this.btn7 = 'primary'
                this.btn8 = 'ghost'
            },
            // 获取开具发票审批
            serviceTally(){
                this.service = '3';
                this.getTableDate();
                this.btn4 = 'ghost'
                this.btn5 = 'ghost'
                this.btn6 = 'ghost'
                this.btn7 = 'ghost'
                this.btn8 = 'primary'
            },
            // 跳转到审批页或详情页
            jumpToDetail(currentRow){
                console.log(currentRow)
                let name = ''
                if(currentRow.service == '申请水晶币审批'){
                    name = 'FinanceApprovalCrystalDetail'
                } else if (currentRow.service == '公证币退款审批') {
                    name = 'RefundApprovalDetail'
                } else if (currentRow.service == '开具发票审批') {
                    name = 'financeBillingDetail'
                } else if (currentRow.service == '公证保管结算受理') {
                    name = 'TallyOrderDetail'
                }
                this.$router.push({
                    name: name,
                    params:{
                        userId:currentRow.serviceId
                    }
                })
                // 更改消息状态
                this.$http.post('/message/v_updateState.action', this.qs.stringify({
                    id: currentRow.messageId
                })).then(response => {
                    if (response.data.status == 0) {
                        this.$store.dispatch('SetUnreadMessage')
                    }else{
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
            // 更改消息状态
            changeMessageState(messageId){
                this.$http.post('/message/v_updateState.action', this.qs.stringify({
                    id: messageId
                })).then(response => {
                    if (response.data.status == 0) {
                        console.log(response)
                        this.$store.dispatch('SetUnreadMessage').then(() => {
                            this.getTableDate(this.pageNow)
                        })
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
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '消息列表',
                // subNavigation: 'MessageList',
                // name: 'MessageList',
                // second: false,
                // third: false
            });
            // 表格初始化
            this.getTableDate(1)
        }
    }
</script>

<style scoped>
    #test {
        font-size: 20px;
        color: red
    }
</style>