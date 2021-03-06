// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js'; //引入vuex
import router from "./router"; // 路由列表
// import $ from "jquery";//不需引入，在webpack.base.conf.js中配置全局jquery即可
import iView from 'iview'; //引入iviewui框架
import 'iview/dist/styles/iview.css'; //引入iview.css框架
import './assets/css/reset.css'; //引入reset.css
import './assets/css/common.css'; //引入common.css
import axios from './http'; // axios
import qs from "qs";
import deepClone from './assets/js/objClone'; // 对象深拷贝
import charTurn from './assets/js/charTurn'; // 转义字符

Vue.config.productionTip = false //提示信息
// Vue.prototype.$ = $;
Vue.prototype.$http = axios;
Vue.prototype.qs = qs;
Vue.prototype.deepClone = deepClone;
Vue.prototype.charTurn = charTurn;
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    template: "<App/>",
    components: {
        App
    }
});
