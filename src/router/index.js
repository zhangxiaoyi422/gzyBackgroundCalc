import Vue from "vue";
import Router from "vue-router";
import calcMenuHeight from "./../assets/js/calcMenuHeight";
import store from "./../store/store";
import axios from './../http'; // axios
// zxy页面start
import Layout from "../view/layout";
// import Login from "../view/login";
import MessageList from "../view/message/messageList";
import PerchargeSetting from "../view/accountMan/perchargeSetting";
import PerchargeSettingPayType from "../view/accountMan/perchargeSetting-payType";
import PerchargeSettingChargingNum from "../view/accountMan/perchargeSetting-chargingNum";
import ServiceSetting from "../view/accountMan/serviceSetting";
import ServiceSettingItem from "../view/accountMan/serviceSetting-item";
import ServiceSettingItemAdd from "../view/accountMan/serviceSetting-item-add";
import ServiceSettingItemModify from "../view/accountMan/serviceSetting-item-modify";
import ServiceSettingNotary from "../view/accountMan/serviceSetting-notary";
import ServiceSettingNotaryOrg from "../view/accountMan/serviceSetting-notary-org";
import ServiceSettingNotaryItem from "../view/accountMan/serviceSetting-notary-item";
import ServiceSettingNotaryDetail from "../view/accountMan/serviceSetting-notary-detail";
import ServiceSettingNotaryDetail2 from "../view/accountMan/serviceSetting-notary-detail2";
import ServiceSettingNotaryItemSetting from "../view/accountMan/serviceSetting-notary-item-setting";
import RefundQuery from "../view/refund/refundQuery";
import RefundApproval from "../view/refund/refundApproval";
import RefundQueryDetail from "../view/refund/refundQuery-detail";
import RefundApprovalDetail from "../view/refund/refundApproval-detail";
import DepartmentLimitsList from '../view/operationsMan/departmentLimits-list'
import DepartmentLimitsAdd from '../view/operationsMan/departmentLimits-add'
import DepartmentLimitsEdit from '../view/operationsMan/departmentLimits-edit'
import PostList from '../view/operationsMan/post-list.vue'
import PostAdd from '../view/operationsMan/post-add.vue'
import PostDetail from '../view/operationsMan/post-detail.vue'
import AccountList from '../view/operationsMan/account-list.vue'
import AccountAdd from '../view/operationsMan/account-add.vue'
import AccountDetail from '../view/operationsMan/account-detail.vue'
import PersonalInfo from '../view/operationsMan/personalInfo.vue'
import err404 from "../view/errPage/404";

import NotaryCurrCharge from '../view/financeStatement/notaryCurrCharge.vue'
import NotaryCurrChargeDetail from '../view/financeStatement/notaryCurrCharge-detail.vue'

import Consume from '../view/financeStatement/consume.vue'
import ConsumeDetail from '../view/financeStatement/consume-detail.vue'

import PhoneRecording from '../view/financeStatement/phoneRecording.vue'
import PhoneRecordingDetail from '../view/financeStatement/phoneRecording-detail.vue'

import NotaryCurrRefund from '../view/financeStatement/notaryCurrRefund.vue'
import NotaryCurrRefundDetail from '../view/financeStatement/notaryCurrRefund-detail.vue'

import BillingQuery from '../view/financeStatement/billingQuery.vue'
import BillingQueryDetail from '../view/financeStatement/billingQuery-detail.vue'

import CrystalPresented from '../view/financeStatement/crystalPresented.vue'
import CrystalPresentedDetail from '../view/financeStatement/crystalPresented-detail.vue'

import UserBalance from '../view/financeStatement/userBalance.vue'
import UserBalanceDetail from '../view/financeStatement/userBalance-detail.vue'

import BillCollect from '../view/financeStatement/billCollect.vue'

import Proportion from '../view/financeStatement/proportion.vue'
import ProportionDetail from '../view/financeStatement/proportion-detail.vue'

import Custody from '../view/financeStatement/custody.vue'
import CustodyUnfinished from '../view/financeStatement/custody-unfinished.vue'
import CustodyFinished from '../view/financeStatement/custody-finished.vue'
import CustodyFinishedDetail from '../view/financeStatement/custody-finished-detail.vue'
import CustodyUnfinishedDetail from '../view/financeStatement/custody-unfinished-detail.vue'

import TallyOrder from '../view/financeStatement/tallyOrder.vue'
import TallyOrderDetail from '../view/financeStatement/tallyOrder-detail.vue'
import TallyOrderDetailBillDetail from '../view/financeStatement/tallyOrder-detail-billDetail.vue'

import BillingMan from '../view/sysInfoSetting/billingMan.vue'
import EmailAddressMan from '../view/sysInfoSetting/emailAddressMan.vue'

import PlatformClientMan from '../view/clientMan/platformClientMan.vue'
import PlatformClientManDetail from '../view/clientMan/platformClientMan-detail.vue'
// zxy页面end wy页面start
import Billing from "../view/accountMan/billing";
import billingDetail from "../view/accountMan/billing-detail";
import ConsumptionList from "../view/accountMan/consumptionList";
import financeBilling from "../view/financeApproval/billing"
import financeBillingDetail from "../view/financeApproval/billing-detail"
import financeConsumptionList from "../view/financeApproval/consumptionList"
import Crystal from "../view/accountMan/crystal"
import CrystalDetail from "../view/accountMan/crystal-detail"
import CrystalRevokeDetail from "../view/accountMan/crystal-revokedetail"
import CrystalApply from "../view/accountMan/crystal-apply"
import FinanceApprovalCrystal from "../view/financeApproval/crystal"
import FinanceApprovalCrystalDetail from "../view/financeApproval/crystal-detail"

import ExperienceCrystal from "../view/accountMan/experienceCrysta";
import CrystalGift from "../view/accountMan/crystalGift";
import CrystalGiftDetail from "../view/accountMan/crystalGift-detail";
import CrystalGiftStep1 from "../view/accountMan/crystalGiftstep1";
// CrystalGiftBalance
import CrystalGiftBalance from "../view/accountMan/CrystalGift-balance";
import CrystalGiftDetailAuditing from "../view/accountMan/crystalGift-detailAuditing"
// wy页面end
Vue.use(Router);

//所有权限通用路由表 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
    {
        //重定向
        path: "/",
        redirect: "/index",
        hidden: true
    }, {
        //重定向
        path: "",
        redirect: "/index",
        hidden: true
    },
    // {     //登录     path: "/login",     name: "Login",     component: Login,
    // hidden: true },
    {
        //首页
        path: "/index",
        name: "Index",
        component: Layout,
        hidden: true
    }, {
        //消息列表
        path: "/message",
        name: "Message",
        nameCN: "消息列表",
        component: Layout,
        meta: {},
        hidden: true,
        children: [
            {
                //消息列表
                path: "/message/messageList",
                name: "MessageList",
                component: MessageList,
                meta: {},
                hidden: true
            }
        ]
    }

]

// meta为空，默认加载此路由： meta: {} 需要权限的页面，格式如下： meta: { permission: '4_2' };
// 只有超级管理员admin能查看的页面，格式如下： meta: { permission: 'admin' } ;
// 异步挂载的路由,动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        //运营管理
        path: "/accountMan",
        name: "运营管理",
        nameCN: "运营管理",
        component: Layout,
        meta: {
            permission: '1'
        },
        children: [
            // {     //重定向     path: '/accountMan/perchargeSetting',     redirect:
            // '/accountMan/perchargeSetting-payType',     name: "PerchargeSetting", hidden:
            // true },
            { //运营管理-公证币预充值配置
                path: "/accountMan/perchargeSetting",
                name: "PerchargeSetting",
                nameCN: '公证币预充值配置',
                component: PerchargeSetting,
                meta: {
                    permission: '1_1'
                },
                children: [
                    {
                        //运营管理-公证币预充值配置-支付方式
                        path: "/accountMan/perchargeSetting-payType",
                        name: "PerchargeSettingPayType",
                        nameCN: '支付方式',
                        component: PerchargeSettingPayType,
                        meta: {
                            permission: '1_1_1'
                        }
                    }, {
                        //运营管理-公证币预充值配置-充值数量
                        path: "/accountMan/perchargeSetting-chargingNum",
                        name: "PerchargeSettingChargingNum.aspx",
                        nameCN: '充值数量',
                        component: PerchargeSettingChargingNum,
                        meta: {
                            permission: '1_1_2'
                        }
                    }
                ]
            }, { //运营管理-服务收费配置
                path: "/accountMan/serviceSetting",
                name: "ServiceSetting",
                nameCN: '服务收费配置',
                component: ServiceSetting,
                meta: {
                    permission: '1_2'
                },
                children: [
                    {
                        //运营管理-服务收费配置-收费项目配置
                        path: "/accountMan/serviceSettingItem",
                        name: "ServiceSettingItem",
                        nameCN: '收费项目配置',
                        component: ServiceSettingItem,
                        meta: {
                            permission: '1_2_1'
                        }
                    }, {
                        //运营管理-服务收费配置-收费项目配置-新增
                        path: "/accountMan/serviceSettingItemAdd",
                        name: "ServiceSettingItemAdd",
                        nameCN: '收费项目配置-新增',
                        component: ServiceSettingItemAdd,
                        meta: {
                            permission: '1_2_1'
                        },
                        hidden: true
                    }, {
                        //运营管理-服务收费配置-收费项目配置-修改
                        path: "/accountMan/serviceSettingItemModify/:chargeId",
                        name: "ServiceSettingItemModify",
                        nameCN: '收费项目配置-修改',
                        component: ServiceSettingItemModify,
                        meta: {
                            permission: '1_2_1'
                        },
                        hidden: true
                    }, {
                        //运营管理-服务收费配置-公证机构收费
                        path: "/accountMan/serviceSettingNotary",
                        name: "ServiceSettingNotary",
                        nameCN: '公证机构收费配置',
                        component: ServiceSettingNotary,
                        redirect: '/accountMan/serviceSettingNotaryOrg',
                        meta: {
                            permission: '1_2_2'
                        },
                        children: [
                            {
                                //运营管理-服务收费配置-公证机构收费-按公证机构显示
                                path: "/accountMan/serviceSettingNotaryOrg",
                                name: "ServiceSettingNotaryOrg",
                                nameCN: '按公证机构显示',
                                component: ServiceSettingNotaryOrg,
                                meta: {
                                    permission: '1_2_2'
                                },
                                hidden: true
                            }, {
                                //运营管理-服务收费配置-公证机构收费-按公证机构显示-详情
                                path: "/accountMan/serviceSettingNotaryDetail/:chargeId/:orgName",
                                name: "ServiceSettingNotaryDetail",
                                nameCN: '按公证机构显示-详情',
                                component: ServiceSettingNotaryDetail,
                                meta: {
                                    permission: '1_2_2'
                                },
                                hidden: true
                            }, {
                                //运营管理-服务收费配置-公证机构收费-按收费项目显示
                                path: "/accountMan/serviceSettingNotaryItem",
                                name: "ServiceSettingNotaryItem",
                                nameCN: '按收费项目显示',
                                component: ServiceSettingNotaryItem,
                                meta: {
                                    permission: '1_2_2'
                                },
                                hidden: true
                            }, {
                                //运营管理-服务收费配置-公证机构收费-按收费项目显示-设置公证机构
                                path: "/accountMan/serviceSettingNotaryItemSetting/:chargeNum/:chargeName/:state/:chargeId",
                                name: "ServiceSettingNotaryItemSetting",
                                nameCN: '按收费项目显示-设置公证机构',
                                component: ServiceSettingNotaryItemSetting,
                                meta: {
                                    permission: '1_2_2'
                                },
                                hidden: true
                            }, {
                                //运营管理-服务收费配置-公证机构收费-按收费项目显示-设置公证机构-详情
                                path: "/accountMan/serviceSettingNotaryDetail2/:chargeId/:orgName/:chargeNum/:chargeName/:state/:chargId",
                                name: "ServiceSettingNotaryDetail2",
                                nameCN: '按收费项目显示-设置公证机构-详情',
                                component: ServiceSettingNotaryDetail2,
                                meta: {
                                    permission: '1_2_2'
                                },
                                hidden: true
                            }
                        ]
                    }
                ]
            }, {
                //运营管理-公证币退款查询
                path: "/accountMan/refundQuery",
                name: "RefundQuery",
                nameCN: '公证币退款查询',
                component: RefundQuery,
                meta: {
                    permission: '1_5'
                }
            }, {
                //运营管理-公证币退款查询-详情
                path: "/accountMan/refundQuery-detail:userId",
                name: "RefundQueryDetail",
                nameCN: '公证币退款查询-详情',
                component: RefundQueryDetail,
                meta: {
                    permission: '1_5'
                },
                hidden: true
            }, {
                //运营管理-发票开具
                path: "/accountMan/Billing",
                name: "Billing",
                nameCN: '发票开具',
                component: Billing,
                meta: {
                    permission: '1_6'
                }
            }, {
                //运营管理-发票开具详情
                path: "/accountMan/BillingDetail:userId",
                name: "billingDetail",
                nameCN: '发票开具-详情',
                component: billingDetail,
                meta: {
                    permission: '1_6'
                },
                hidden: true
            }, {
                //运营管理-发票开具消费明细
                path: "/accountMan/ConsumptionList:userId",
                name: "ConsumptionList",
                nameCN: '发票开具-消费明细',
                component: ConsumptionList,
                meta: {
                    permission: '1_6'
                },
                hidden: true
            }, {
                //运营管理-申领水晶币申请
                path: "/accountMan/crystal",
                name: "Crystal",
                nameCN: "申领水晶币申请",
                component: Crystal,
                meta: {
                    permission: '1_4'
                }
            }, {
                //运营管理-申领水晶币详情1
                path: "/accountMan/crystalDetail:userId",
                name: "CrystalDetail",
                nameCN: "申领水晶币申请-详情",
                component: CrystalDetail,
                meta: {
                    permission: '1_4'
                },
                hidden: true
            }, {
                //运营管理-申领水晶币撤销详情2
                path: "/accountMan/CrystalRevokeDetail:userId",
                name: "CrystalRevokeDetail",
                nameCN: "申领水晶币申请-详情",
                component: CrystalRevokeDetail,
                meta: {
                    permission: '1_4'
                },
                hidden: true
            }, {
                //运营管理-申领水晶币
                path: "/accountMan/CrystalApply",
                name: "CrystalApply",
                nameCN: "申领水晶币申请-申请",
                component: CrystalApply,
                meta: {
                    permission: '1_4_2'
                },
                hidden: true
            }, {
                //运营管理-体验赠送水晶币
                path: "/accountMan/Experience",
                name: "ExperienceCrystal",
                nameCN: "体验赠送水晶币",
                component: ExperienceCrystal,
                meta: {
                    permission: '1_3'
                },
                children: [
                    {
                        //运营管理-体验赠送水晶币-体验赠送
                        path: "/accountMan/CrystalGift",
                        name: "CrystalGift",
                        nameCN: "体验赠送",
                        component: CrystalGift,
                        meta: {
                            permission: '1_3_1'
                        }
                    }, {
                        //运营管理-体验赠送水晶币-赠送水晶币余额
                        path: "/accountMan/CrystalGiftBalance",
                        name: "CrystalGiftBalance",
                        nameCN: "赠送水晶币余额",
                        component: CrystalGiftBalance,
                        meta: {
                            permission: '1_3_2'
                        }
                    }
                ]
            }, {
                //运营管理-体验赠送水晶币-申请
                path: "/accountMan/CrystalGiftStep1",
                name: "CrystalGiftStep1",
                nameCN: "体验赠送水晶币-申请",
                component: CrystalGiftStep1,
                meta: {
                    permission: '1_3_1_2'
                },
                hidden: true
            }, {
                //运营管理-体验赠送水晶币-详情
                path: "/accountMan/CrystalGiftDetail:userId",
                name: "CrystalGiftDetail",
                nameCN: "体验赠送水晶币-详情",
                component: CrystalGiftDetail,
                meta: {
                    permission: '1_3_1'
                },
                hidden: true
            }, {
                //运营管理-体验赠送水晶币-审批
                path: "/accountMan/CrystalGiftAuditing:userId",
                name: "CrystalGiftDetailAuditing",
                nameCN: "体验赠送水晶币-审批",
                component: CrystalGiftDetailAuditing,
                meta: {
                    permission: '1_3_1_3'
                },
                hidden: true
            }
        ]
    }, {
        //财务审批
        path: "/financeApproval",
        name: "财务审批",
        nameCN: "财务审批",
        component: Layout,
        meta: {
            permission: '2'
        },
        children: [
            {
                //财务审批-公证币退款审批
                path: "/financeApproval/refundApproval",
                name: "RefundApproval",
                nameCN: '公证币退款审批',
                component: RefundApproval,
                meta: {
                    permission: '2_2'
                }
            }, {
                //财务审批-公证币退款审批-详情
                path: "/financeApproval/refundApproval-detail:userId",
                name: "RefundApprovalDetail",
                nameCN: '公证币退款审批-详情',
                component: RefundApprovalDetail,
                meta: {
                    permission: '2_2'
                },
                hidden: true
            }, {
                //财务审批-发票开具
                path: "/financeApproval/Billing",
                name: "financeBilling",
                nameCN: '发票开具',
                component: financeBilling,
                meta: {
                    permission: '2_3'
                }
            }, {
                //财务审批-发票开具详情
                path: "/financeApproval/BillingDetail:userId",
                name: "financeBillingDetail",
                nameCN: '发票开具-详情',
                component: financeBillingDetail,
                meta: {
                    permission: '2_3'
                },
                hidden: true
            }, {
                //财务审批-发票开具消费明细
                path: "/financeApproval/ConsumptionList:userId",
                name: "financeConsumptionList",
                nameCN: '发票开具-消费明细',
                component: financeConsumptionList,
                meta: {
                    permission: '2_3'
                },
                hidden: true
            }, {
                //财务审批-水晶币申领审批
                path: "/financeApproval/crystal",
                name: "FinanceApprovalCrystal",
                nameCN: '水晶币申领审批',
                component: FinanceApprovalCrystal,
                meta: {
                    permission: '2_1'
                }
            }, {
                //财务审批-申领水晶币详情1
                path: "/financeApproval/crystalDetail:userId",
                name: "FinanceApprovalCrystalDetail",
                nameCN: '申领水晶币申请-详情',
                component: FinanceApprovalCrystalDetail,
                meta: {
                    permission: '2_1'
                },
                hidden: true
            }
        ]
    }, {
        //客户管理
        path: "/clientMan",
        name: "客户管理",
        nameCN: "客户管理",
        component: Layout,
        meta: {
            permission: '6'
        },
        children: [
            {
                //客户管理-平台客户管理
                path: '/clientMan/platformClientMan',
                name: 'PlatformClientMan',
                nameCN: '平台客户管理',
                component: PlatformClientMan,
                meta: {
                    permission: '6_1'
                }
            }, {
                //客户管理-平台客户管理-详情
                path: '/clientMan/platformClientManDetail/:id',
                name: 'PlatformClientManDetail',
                nameCN: '平台客户管理-详情',
                component: PlatformClientManDetail,
                meta: {
                    permission: '6_1'
                },
                hidden: true
            }
        ]
    }, {
        //财务报表
        path: "/financeStatement",
        name: "财务报表",
        nameCN: "财务报表",
        component: Layout,
        meta: {
            permission: '3'
        },
        children: [
            // {     //财务报表-财务数据统计     path: '/financeStatement/NotaryCurrCharge',     name:
            // 'NotaryCurrCharge',     nameCN: '财务数据统计',     component: NotaryCurrCharge,
            //  meta: {         permission: '3_1'     } }, {     //财务报表-财务数据统计-详情     path:
            // '/financeStatement/NotaryCurrCharge',     name: 'NotaryCurrCharge',
            // nameCN: '财务数据统计-详情',     component: NotaryCurrCharge,     meta: {
            // permission: '3_1'     },     hidden: true },
            {
                //财务报表-公证币充值查询
                path: '/financeStatement/notaryCurrCharge',
                name: 'NotaryCurrCharge',
                nameCN: '公证币充值查询',
                component: NotaryCurrCharge,
                meta: {
                    permission: '3_2'
                }
            }, {
                //财务报表-公证币充值查询-详情
                path: '/financeStatement/notaryCurrChargeDetail/:orderSequence',
                name: 'NotaryCurrChargeDetail',
                nameCN: '公证币充值查询-详情',
                component: NotaryCurrChargeDetail,
                meta: {
                    permission: '3_2'
                },
                hidden: true
            }, {
                //财务报表-消费查询
                path: '/financeStatement/consume',
                name: 'Consume',
                nameCN: '消费查询',
                component: Consume,
                meta: {
                    permission: '3_3'
                }
            }, {
                //财务报表-消费查询-详情
                path: '/financeStatement/consume-detail/:accountHistoryId',
                name: 'ConsumeDetail',
                nameCN: '消费查询-详情',
                component: ConsumeDetail,
                meta: {
                    permission: '3_3'
                },
                hidden: true
            },
            {     //财务报表-电话录音成本查询     
                path: '/financeStatement/phoneRecording',     
                name: 'PhoneRecording', 
                nameCN: '电话录音成本查询',
                component: PhoneRecording,
                meta: {         
                    permission: '3_4'     
                } 
            }, {     //财务报表-电话录音成本查询-详情     
                path: '/financeStatement/phoneRecording-detail/:callInTime/:evidNo/:resource/:userType/:account/:parentAccount/:evidType/:comingPhone/:calledPhone/:calledPhoneTime/:thirdPartyMinute/:thirdPartySecond/:getThrough/:duration/:realName',
                name: 'PhoneRecordingDetail',
                nameCN: '电话录音成本查询-详情',
                component: PhoneRecordingDetail, 
                meta: {
                    permission: '3_4'     
                },     
                hidden: true 
            },
            {
                //财务报表-公证币退款查询
                path: '/financeStatement/notaryCurrRefund',
                name: 'NotaryCurrRefund',
                nameCN: '公证币退款查询',
                component: NotaryCurrRefund,
                meta: {
                    permission: '3_5'
                }
            }, {
                //财务报表-公证币退款查询-详情
                path: '/financeStatement/notaryCurrRefund-detail/:orderNum',
                name: 'NotaryCurrRefundDetail',
                nameCN: '公证币退款查询-详情',
                component: NotaryCurrRefundDetail,
                meta: {
                    permission: '3_5'
                },
                hidden: true
            }, {
                //财务报表-开票查询
                path: '/financeStatement/billingQuery',
                name: 'BillingQuery',
                nameCN: '开票查询',
                component: BillingQuery,
                meta: {
                    permission: '3_6'
                }
            }, {
                //财务报表-开票查询-详情
                path: '/financeStatement/billingQuery-detail/:invoiceId',
                name: 'BillingQueryDetail',
                nameCN: '开票查询-详情',
                component: BillingQueryDetail,
                meta: {
                    permission: '3_6'
                },
                hidden: true
            }, {
                //财务报表-水晶币赠送查询
                path: '/financeStatement/crystalPresented',
                name: 'CrystalPresented',
                nameCN: '水晶币赠送查询',
                component: CrystalPresented,
                meta: {
                    permission: '3_7'
                }
            }, {
                //财务报表-水晶币赠送查询-详情
                path: '/financeStatement/crystalPresented-detail',
                name: 'CrystalPresentedDetail',
                nameCN: '水晶币赠送查询-详情',
                component: CrystalPresentedDetail,
                meta: {
                    permission: '3_7'
                },
                hidden: true
            }, {
                //财务报表-用户账户余额查询
                path: '/financeStatement/userBalance',
                name: 'UserBalance',
                nameCN: '用户账户余额查询',
                component: UserBalance,
                meta: {
                    permission: '3_8'
                }
            }, {
                //财务报表-用户账户余额查询-详情
                path: '/financeStatement/userBalance-detail/:accountUserId',
                name: 'UserBalanceDetail',
                nameCN: '用户账户余额查询-详情',
                component: UserBalanceDetail,
                meta: {
                    permission: '3_8'
                },
                hidden: true
            }
        ]
    }, {
        //财务报表
        path: "/financeBill",
        name: "财务账单",
        nameCN: "财务账单",
        component: Layout,
        meta: {
            permission: '7'
        },
        children: [
            {
                //财务报表-法信账单汇总
                path: '/financeStatement/billCollect',
                name: 'BillCollect',
                nameCN: '法信账单汇总',
                component: BillCollect,
                meta: {
                    permission: '7_1'
                }
            }, {
                //财务报表-公证处分成汇总
                path: '/financeStatement/proportion',
                name: 'Proportion',
                nameCN: '公证处分成汇总',
                component: Proportion,
                meta: {
                    permission: '7_2'
                }
            }, {
                //财务报表-公证处分成汇总-详情
                path: '/financeStatement/proportion-detail/:dayTime',
                name: 'ProportionDetail',
                nameCN: '公证处分成汇总-详情',
                component: ProportionDetail,
                meta: {
                    permission: '7_2'
                },
                hidden: true
            }, {
                //财务报表-公证保管账单
                path: '/financeStatement/custody',
                name: 'Custody',
                nameCN: '公证保管账单',
                component: Custody,
                meta: {
                    permission: '7_3'
                },
                children: [
                    {
                        //财务报表-公证保管账单-未结算完结账单
                        path: '/financeStatement/custodyUnfinished',
                        name: 'CustodyUnfinished',
                        nameCN: '未结算完结账单',
                        component: CustodyUnfinished,
                        meta: {
                            permission: '7_3_1'
                        }
                    }, 
                    {
                        //财务报表-公证保管账单-未结算完结账单-详情
                        path: '/financeStatement/custodyUnfinishedDetail/:orgName/:monthTime',
                        name: 'CustodyUnfinishedDetail',
                        nameCN: '未结算完结账单-详情',
                        component: CustodyUnfinishedDetail,
                        meta: {
                            permission: '7_3_1'
                        },
                        hidden: true
                    },
                    {
                        //财务报表-公证保管账单-结算成功账单
                        path: '/financeStatement/custodyFinished',
                        name: 'CustodyFinished',
                        nameCN: '结算成功账单',
                        component: CustodyFinished,
                        meta: {
                            permission: '7_3_2'
                        }
                    },
                    {
                        //财务报表-公证保管账单-结算成功账单-详情
                        path: '/financeStatement/custodyFinishedDetail',
                        name: 'CustodyFinishedDetail',
                        nameCN: '结算成功账单-详情',
                        component: CustodyFinishedDetail,
                        meta: {
                            permission: '7_3_2'
                        },
                        hidden: true
                    }
                ]
            }, {
                //财务报表-结算订单
                path: '/financeStatement/tallyOrder',
                name: 'TallyOrder',
                nameCN: '结算订单',
                component: TallyOrder,
                meta: {
                    permission: '7_4'
                }
            }, {
                //财务报表-结算订单-详情
                path: '/financeStatement/tallyOrderDetail/:userId',
                name: 'TallyOrderDetail',
                nameCN: '结算订单',
                component: TallyOrderDetail,
                meta: {
                    permission: '7_4'
                },
                hidden: true
            }, {
                //财务报表-结算订单-详情-订单详情
                path: '/financeStatement/tallyOrderDetailBillDetail',
                name: 'TallyOrderDetailBillDetail',
                nameCN: '结算订单',
                component: TallyOrderDetailBillDetail,
                meta: {
                    permission: '7_4'
                },
                hidden: true
            }
        ]
    }, {
        //系统信息设置
        path: "/sysInfoSetting",
        name: "系统信息设置",
        nameCN: "系统信息设置",
        component: Layout,
        meta: {
            permission: '5'
        },
        children: [
            {
                //系统信息设置-发票信息管理
                path: '/sysInfoSetting/billingMan',
                name: 'BillingMan',
                nameCN: '发票信息管理',
                component: BillingMan,
                meta: {
                    permission: '5_1'
                }
            }, {
                //系统信息设置-邮寄地址管理
                path: '/sysInfoSetting/emailAddressMan',
                name: 'EmailAddressMan',
                nameCN: '邮寄地址管理',
                component: EmailAddressMan,
                meta: {
                    permission: '5_2'
                }
            }
        ]
    }, {
        //权限管理
        path: "/operationsMan",
        name: "账号管理",
        nameCN: "账号管理",
        component: Layout,
        meta: {
            permission: '4'
        },
        children: [
            {
                //权限管理-部门权限-列表
                path: '/operationsMan/departmentLimitsList',
                name: 'DepartmentLimitsList',
                nameCN: '部门权限',
                component: DepartmentLimitsList,
                meta: {
                    permission: 'admin'
                }
            }, {
                //权限管理-部门权限-新增
                path: '/operationsMan/departmentLimitsAdd',
                name: 'DepartmentLimitsAdd',
                nameCN: '部门权限-新增',
                component: DepartmentLimitsAdd,
                meta: {
                    permission: 'admin'
                },
                hidden: true
            }, {
                //权限管理-部门权限-编辑
                path: '/operationsMan/departmentLimitsEdit:deptId',
                name: 'DepartmentLimitsEdit',
                nameCN: '部门权限-编辑',
                component: DepartmentLimitsEdit,
                meta: {
                    permission: 'admin'
                },
                hidden: true
            }, {
                //权限管理-部门岗位-列表
                path: '/operationsMan/postList',
                name: 'PostList',
                nameCN: '部门岗位',
                component: PostList,
                meta: {
                    permission: '4_1'
                }
            }, {
                //权限管理-部门岗位-新增
                path: '/operationsMan/postAdd',
                name: 'PostAdd',
                nameCN: '部门岗位-新增',
                component: PostAdd,
                meta: {
                    permission: '4_1_2'
                },
                hidden: true
            }, {
                //权限管理-部门岗位-详情
                path: '/operationsMan/postDetail/:postId/:deptId',
                name: 'PostDetail',
                nameCN: '部门岗位-详情',
                component: PostDetail,
                meta: {
                    // 有岗位列表就有详情，所以他俩权限一样
                    permission: '4_1'
                },
                hidden: true
            }, {
                //权限管理-部门账号
                path: '/operationsMan/accountList',
                name: 'AccountList',
                nameCN: '部门账号',
                component: AccountList,
                meta: {
                    permission: '4_2'
                }
            }, {
                //权限管理-部门账号-新增
                path: '/operationsMan/accountAdd',
                name: 'AccountAdd',
                nameCN: '部门账号-新增',
                component: AccountAdd,
                meta: {
                    permission: '4_2_2'
                },
                hidden: true
            }, {
                //权限管理-部门账号-详情
                path: '/operationsMan/accountDetail/:userId/:deptId',
                name: 'AccountDetail',
                nameCN: '部门账号-详情',
                component: AccountDetail,
                meta: {
                    // 有部门账号就有详情，所以他俩权限一样
                    permission: '4_2'
                },
                hidden: true
            }, {
                //权限管理-个人信息
                path: '/operationsMan/personalInfo',
                name: 'PersonalInfo',
                nameCN: '个人信息',
                component: PersonalInfo,
                meta: {
                    permission: '4_3'
                }
            }
        ]
    }, {
        path: "*",
        name: "404",
        component: err404,
        hidden: true
    }
];

const router = new Router({
    mode: 'history',
    // base: __dirname,
    base: '/stmfe/',
    scorllBehavior: () => ({y: 0}),
    routes: constantRouterMap
});
export default router;

// 路由拦截
router.beforeEach((to, from, next) => {
    // if (to.path == '/login' || to.path == '/') {     next() } else {     //
    // 有token     if (store.state.token) {         calcMenuHeight();         if
    // (store.state.limitList.length === 0) {             //
    // 判断当前用户是否已拉取完user_info信息，获得权限表             store .dispatch('getInfo')
    // .then(res => { // 拉取info     const limitList = res;  //动态生成路由表 store
    // .dispatch('GenerateRoutes', limitList)                .then(() => { //
    // 生成可访问的路由表 router.addRoutes(store.state.addRouters) // 动态添加可访问路由表     //
    // console.log(store.state.routers)                             // 获取未读消息条数
    //              store.dispatch('SetUnreadMessage') next(to.path); // hack方法
    // 确保addRoutes已完成         })                 })   .catch(err => {
    // console.log(err);                 });         } else {            next()
    // //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面  } next();     } else {
    // next('/login');     } } 登录合并后新方法 判断是否有token
    if (store.state.token) {
        console.log('store中token 存在')
        calcMenuHeight();
        if (!store.state.userInfo) {
            // 判断当前用户是否已拉取完user_info信息，获得权限表
            store
                .dispatch('getInfo')
                .then(res => { // 拉取info

                    const limitList = res;
                    //动态生成路由表
                    store
                        .dispatch('GenerateRoutes', limitList)
                        .then(() => { // 生成可访问的路由表

                            router.addRoutes(store.state.addRouters) // 动态添加可访问路由表
                            // 获取未读消息条数
                            console.log('to.path1" ' + to.path)
                            next(to.path) // hack方法 确保addRoutes已完成
                            store.dispatch('SetUnreadMessage')
                                // .then(() => {
                                    // 不加to.path无法刷新
                                    
                                // })


                                // store
                                // .dispatch('SetUnreadMessage')
                                // .then(() => {
                                //     // 不加to.path无法刷新
                                //     console.log('to.path1" ' + to.path)
                                //     next(to.path) // hack方法 确保addRoutes已完成
                                // })

                        })
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('to.path2" ' + to.path)
            next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        }
    } else {
        console.log('store中token 不存在')

        let paramToken = window.location.search.substring(1) 
        console.log(paramToken)
        if(paramToken){     
            store.dispatch('SetStoreToken',paramToken).then(() => {
                next({name:"Index"});     
            }) 
        }else{     
            store.commit('SET_BASE_PATH')
            let basePath = store.state.basePath + 'alliance/logout.aspx'     
            window.location.href = basePath 
        }

        // store.dispatch('Login', ['admin', '111111']).then((res) => {
        //     if (res == true) {
        //         next({name: "Index"});
        //     }
        // })
    }
});