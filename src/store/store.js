import Vue from 'vue'
import Vuex from 'vuex'
import router from "./../router/index"; // 路由列表
import { asyncRouterMap, constantRouterMap } from './../router/index';
import axios from './../http'; // axios
// import deepClone from './../assets/js/objClone'; // 对象深拷贝
import deepClone from 'lodash.clonedeep'; // 对象深拷贝

Vue.use(Vuex) //让vue通过use中间件使用vuex

//这里定义初始值
const state = {
    // basePath配置
    // basePath : 'http://192.168.88.166:9984/',//开发环境
    // basePath : 'http://192.168.88.222:9984/',//测试环境
    // basePath : 'https://admin.egongzheng.com/gzy/',//正式环境
    basePath:'',
    token: sessionStorage.getItem('token') || '',
    // 设置面包屑与菜单展开选中项
    position: {
        userId: "",
        primaryNavigation:'',               //1级显示文本
        second:false,           //二级显示隐藏
        name:'',//二级英文名字，跳转用
        subNavigation:'',                   //2级显示文本     
        secondName: "",//三级英文名字，跳转用
        thirdName:'',
        forthName:'',
        third:false,            //三级显示隐藏
        thirdNavigation:'',                 //3级显示文本 
        fourth:false,              //四级显示隐藏
        fourthNavigation: "",                //4级显示文本
        fifthNavigation:'',
        fifth:false,
        forthTab:''//4级路由tab切换
    },
    // 用户可访问路由表
    userInfo:'',
    limitList:[],
    routers: constantRouterMap,
    addRouters: [],
    // 未读消息条数
    unReadMessage:'',
    // 右下角审批弹窗
    popMessage:[]
};

//返回改变后的数值
const getters = {
    // 获取导航
    getPosition(){
        var position = state.position;
        return position
    },
    getGeneratedRouters(state){
        return state.routers
    },
    // 获取用户信息
    getUserInfo(state){
        let userInfo = deepClone(state.userInfo);
        if (userInfo.status == '0') {
            userInfo.status = '冻结';
        } else if (userInfo.status == '1') {
            userInfo.status = '启用';
        } else if (userInfo.status == '2') {
            userInfo.status = '禁用';
        }
        return userInfo
    }
};

//更改vuex的store中的状态唯一方法是提交mutation。
const mutations = {
    // 设置面包屑,和菜单active项
    SET_POSITION(state,payload){
        state.position = payload;
        state.activeMenuName = payload.primaryNavigation;
        state.activeMenuItemName = payload.name;
    },
    // 设置token
    SET_TOKEN(state,payload){
        sessionStorage.setItem('token',payload);
        state.token = payload
    },
    // 清空token
    REMOVE_TOKEN(state){
        sessionStorage.removeItem('token');
        state.token = '';
    },
    // 设置用户信息
    SET_USER_INFO(state, payload){
      state.userInfo = payload;
    },
    // 设置基础路径 ，改为固定值，每次上线手动修改
    // SET_BASE_PATH(state, payload){
    //   state.basePath = payload;
    //   sessionStorage.setItem('basePath',payload);
    // },
    // 设置用户权限表
    SET_LIMIT_LIST(state, limitList){
      state.limitList = limitList;
    },
    // 设置路由表
    SET_ROUTERS(state, payload){
      state.addRouters = payload;
      state.routers = constantRouterMap.concat(payload);
      console.log('打印路由表 ↓ ：')
      console.log(state.routers)
    },
    // 设置未读消息条数
    SET_UNREADMESSAGE(state, payload){
      state.unReadMessage = payload
    },
    // 设置右下角审批弹窗消息
    SET_POPMESSAGE(state, payload){
      state.popMessage = payload
    },
    // 删除最顶层弹窗消息
    DELETE_TOP_POPMESSAGE(state, payload){
        state.popMessage.splice(payload,1)
    },
    // 设置
    SET_BASE_PATH(state) {
        let hostname = window.location.hostname
        console.log('hostname ↓ :')
        
        if(hostname == '192.168.88.166' || hostname =='localhost') {  //开发环境
            state.basePath = 'http://192.168.88.166:9984/';
        } else if(hostname == '192.168.88.222') { //测试环境
            state.basePath = 'http://192.168.88.222:9984/';
        } else if(hostname == 'admin.egongzheng.com') { //正式环境
            state.basePath = 'https://admin.egongzheng.com/gzy/';
        }
        console.log(state.basePath)
    }
};
function hasPermission(limitList, route) {
    if (route.meta && route.meta.permission) {
        // 判断获取的用户权限表里是否有这一项路由 ,indexOf 可以匹配数组，返回的是数组下标 -1为没找到
        if( limitList.indexOf(route.meta.permission) >= 0 ){
            return true
        }else{
            return false
        }
        // return limitList.some(limitList => route.meta.limitList.indexOf(limitList) > 0)
    } else {
        return true
    }
}


//action 类似于mutation。又有不同： 1.action提交的是mutaiton，而不是直接变更状态。 2.action可以包含任意异步操作
const actions = {
    // 设置未读消息条数
    SetUnreadMessage({commit,state},unReadMessageCount){
        return new Promise((resolve, reject) => {
            axios.post('/message/v_messageList.action').then(response => {
                if(response.data.status == 0){
                    let _this = this
                    let message = []
                    $.each(response.data.data.allUnReadMessage, function(key, val) {
                        if (val.service == '0') {
                            val.service = '申请水晶币审批';
                            _this.hrefHead = 'FinanceApprovalCrystalDetail'
                        } else if (val.service == '1') {
                            val.service = '公证币退款审批';
                            _this.hrefHead = 'RefundApprovalDetail'
                        } else if (val.service == '2') {
                            val.service = '开具发票审批';
                            _this.hrefHead = 'financeBillingDetail'
                        } else if (val.service == '3') {
                            val.service = '公证保管结算受理';
                            _this.hrefHead = 'TallyOrderDetail'
                        }
                        message.push({
                            'title': val.service,
                            'text': val.applyDetail,
                            'name': _this.hrefHead,
                            'serviceId' : val.serviceId,
                            'messageId' : val.messageId
                        })
                    })
                    commit('SET_UNREADMESSAGE', response.data.data.unReadTotalCount)
                    commit('SET_POPMESSAGE', message)
                    resolve();
                }else{
                    resolve();
                }
            }).catch(function(error) {
                reject(error);
            });
            
        });
    },
    //返回用户可访问路由表, 三级路由↓
    GenerateRoutes({ commit,state }, limitList) {

    let asyncRouterMap_copy = deepClone(asyncRouterMap)
        return new Promise(resolve => {
            const accessedRouters = asyncRouterMap_copy.filter(v => {

                console.log('是否是admin: ' + state.userInfo.admin)
                if (state.userInfo.admin == true) return true;
                if (hasPermission(limitList, v)) {
                    if (v.children && v.children.length > 0) {
                        v.children = v.children.filter(child => {
                            if (hasPermission(limitList, child)) {
                                if (child.children && child.children.length > 0) {
                                    child.children = child.children.filter(child_child => {
                                        if (hasPermission(limitList, child_child)) {
                                            // console.log(child_child)
                                            return child_child
                                        }
                                        return false;
                                    });
                                    return child
                                } else {
                                    return child
                                }
                            }
                            return false;
                        });
                        return v
                    } else {
                        return v
                    }
                }
                return false;
            });

            commit('SET_ROUTERS', accessedRouters);
            // console.log(accessedRouters)
            resolve();
        })
    },
    // 获取用户信息与权限
    getInfo({commit}){
        let _this = this;
        return new Promise((resolve, reject) => {
            axios.post('/user/ajax/getBaseInfo.action').then(response=>{

                console.log('获取用户信息成功，打印用户信息 ↓ ：');
                console.log(response)

                commit('SET_USER_INFO', response.data.data);
                commit('SET_BASE_PATH');
                let limitList = []
                
                if(response.data.data.menuIds){ 
                    limitList = response.data.data.menuIds.split(",") 
                }
        
                commit('SET_LIMIT_LIST', limitList);
                console.log('打印用户权限 ↓ ：')
                console.log(limitList)
                resolve(limitList);

            }).catch(error=>{
                reject(error);
            })          
        });     
    },
    // 登出
    LoginOut({commit,state}){//
        return new Promise((resolve, reject) => {
            axios.get('/login/ajax/doLogOut.action',{
                params:{
                    userId:state.userInfo.id,
                    token:state.token
                }
            }).then(response => {
                // console.log(response)
                commit('SET_POPMESSAGE',[])
                commit('REMOVE_TOKEN');
                commit('SET_LIMIT_LIST',[]);
                commit('SET_USER_INFO',{});
                // 不加SET_ROUTERS 会报错, donot mutate state outside mutations
                commit('SET_ROUTERS',[]);
                commit('SET_POSITION',{});
                resolve();
            }).catch(function(error) {
                console.log(error);
            });
            
        });
    },
    // 登录
    Login({commit},[userAccount,userPassword]){
        return new Promise((resolve, reject) => {
            axios.get('/login/ajax/doLogin.action',{
                params:{
                    userAccount:userAccount,
                    userPassword:userPassword
                }
            }).then(response => {
                console.log(response)
                if(response.data.status == 0){
                    commit('SET_TOKEN',response.data.data.token);
                    resolve(true)
                }else{
                    // alert('帐号被冻结,无法使用')
                    alert(response.data.message)
                    resolve(false)
                }
                // let redirect = decodeURIComponent(this.$route.query.redirect || '/index');//对URI解码,跳转到原访问地址，如果没有则调到首页 
            }).catch(function(error) {
                alert(error)
                console.log(error);
            });
        });
    },
    // 主系统登录后这边只需要把sessionStorage中的token存到stroe里
    SetStoreToken({commit},paramToken){
        return new Promise((resolve, reject) => {
            if(paramToken){
                commit('SET_TOKEN',paramToken);
                resolve()
            }else{
                alert('没有token,无法跳转')        
            }
        });
    }
}

export default new Vuex.Store({
    // strict: true, //应用了严格模式，就不可以在mutations外改变state中的值，否则会报错
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions,
    getters
})
