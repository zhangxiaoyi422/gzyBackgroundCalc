<template>
    <Col span="5">
        <Menu ref="menu" accordion :active-name="getPosition.name" width="auto" :open-names="[getPosition.primaryNavigation]" @on-select="turnUrl">
            <Submenu name="运营管理">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    运营管理
                </template>
                <MenuItem name="1-1">公证币预充值配置</MenuItem>
                <MenuItem name="1-2">服务收费配置</MenuItem>
                <MenuItem name="1-3">体验赠送水晶币</MenuItem>
                <MenuItem name="1-4">申领水晶币申请</MenuItem>
                <MenuItem name="RefundQuery">公证币退款查询</MenuItem>
                <MenuItem name="Billing">发票开具查询</MenuItem>
                <MenuItem name="1-7">体验赠送水晶币</MenuItem>
                <MenuItem name="1-8">体验赠送水晶币</MenuItem>
            </Submenu>
            <Submenu name="财务审批">
                <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    财务审批
                </template>
                <MenuItem name="2-1">水晶币申领审批</MenuItem>
                <MenuItem name="RefundApproval">公证币退款审批</MenuItem>
                <MenuItem name="financeBilling">开具发票审批</MenuItem>
            </Submenu>
            <Submenu name="财务报表">
                <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    财务报表
                </template>
                <MenuItem name="3-1">公证币充值查询</MenuItem>
                <MenuItem name="3-2">消费查询</MenuItem>
                <MenuItem name="3-3">电话录音成本查询</MenuItem>
                <MenuItem name="3-4">公证币退款查询</MenuItem>
                <MenuItem name="3-5">开票查询</MenuItem>
                <MenuItem name="3-6">水晶币赠送查询</MenuItem>
                <MenuItem name="3-7">用户余额查询</MenuItem>
                <MenuItem name="3-8">账单汇总</MenuItem>
                <MenuItem name="3-9">公证处分成汇总</MenuItem>
            </Submenu>
            <Submenu name="权限管理">
                <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    权限管理
                </template>
                <MenuItem name="DepartmentLimitsList">部门权限</MenuItem>
                <MenuItem name="PostList">部门岗位</MenuItem>
                <MenuItem name="4-3">部门账号</MenuItem>
                <MenuItem name="4-4">个人信息</MenuItem>
            </Submenu>
        </Menu>
    </Col>
</template>
<script>    
import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                theme2: 'light',
            }
        },
        computed: {
            ...mapGetters([
                'getPosition',
                'getGeneratedRouters'
             ]),  
            //  activeMenuName(){
            //      let string = this.getPosition.primaryNavigation;
            //      let array = Array(string) 
            //      console.log(array)  
            //      return array;
            //  }
        },
        watch:{
            getPosition(){
                this.$nextTick(function(){
                    this.$refs.menu.updateOpened();
                    this.$refs.menu.updateActiveName();
                });
            }
        },
        // mounted() {
        //     calcMenuHeight();
        //     $(window).resize(function(){
        //         calcMenuHeight();
        //     });
        //     // 计算menu高度
        //     function calcMenuHeight(){
        //         setTimeout(function(){
        //             let winH = $(window).height();//console.log('winH' + winH)
        //             let docH = $(document).height();//console.log('docH' + docH)
        //             let menuLeftHeight = 0;
        //             if(winH > docH){
        //                 menuLeftHeight = winH - $('.headerNav').height() - $('.footerNav').height() - 2;
        //                 $('.ivu-menu-light').css('min-height', menuLeftHeight);//console.log(1111)
        //             }else{
        //                 menuLeftHeight = docH - $('.headerNav').height() - $('.footerNav').height() - 2;
        //                 $('.ivu-menu-light').css('min-height', menuLeftHeight);//console.log(2222)
        //             }
        //         },0);//页面加载完在计算menuList高度
        //     }
        // },
        methods: {
            turnUrl(names) {
                // 在右侧显示相应页面
                this.$router.push({
                    name: names
                });
            },
        }
    }
</script>

<style scoped>
    
</style>