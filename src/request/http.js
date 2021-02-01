// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
// import {
// 	Toast
// } from 'vant';
import ElementUI from 'element-ui';
import {
	Toast
} from 'vant';
// 环境的切换

axios.defaults.baseURL = 'http://35.236.184.115/';
// if ( process.env.NODE_ENV === 'production' ) {
//   axios.defaults.baseURL = 'http://query.cdmeixiaoya.com/';
// } else {
//   axios.defaults.baseURL = 'http://localhost:8080';
// }


//设置请求超时
axios.defaults.timeout = 10000;


//设置请求头  
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
// import store from '@/store/index';


// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断vuex中是否存在token        
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
		// const token = store.state.token;        
		// token && (config.headers.Authorization = token); 
		return config;
	},
	error => {
		return Promise.error(error);
	})

// 响应拦截器
var that = this
axios.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
		// 否则的话抛出错误
		if (response.data.code === 200) {
			return Promise.resolve(response);
		} else if (response.data.code == 401) {
			window.location.hash = '/pages/login'
			Toast.fail('请先登录！');
		} else if (response.data.code == 400) {
			Toast.fail(response.data.message);
		} else {
			Toast.fail('系统错误！');
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是2开头的的情况
	// 这里可以跟你们的后台开发人员协商好统一的错误状态码    
	// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
	// 下面列举几个常见的操作，其他需求可自行扩展
	error => {
		return Promise.reject(error.response);
	});

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
