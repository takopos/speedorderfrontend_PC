import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/pages/index')
		},{
			path: '/pages/forgetPassWord',
			name: 'forgetPassWord',
			component: () => import('@/pages/forgetPassWord')
		},
		,{
			path: '/pages/register',
			name: 'register',
			component: () => import('@/pages/register')
		},
		{
			path: '/pages/login',
			name: 'login',
			component: () => import('@/pages/login')
		},
	]
})
