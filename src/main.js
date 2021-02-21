// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Api from './api/index.js';
// Vue.prototype.$api = Api;


//引入elementUI:
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入vant消息提示：
import Vant from 'vant';
import 'vant/lib/index.css';

//注册全局组件
import myNav from "./components/myNav";
import menuList from "./components/menuList"
Vue.component('myNav',myNav)
Vue.component('menuList',menuList)

Vue.use(ElementUI);  
Vue.use(Vant);
Vue.config.productionTip = false


//服务器域名地址：
Vue.prototype.$hostName = "http://35.236.184.115"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
