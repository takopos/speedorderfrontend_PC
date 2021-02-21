import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: () => import('@/pages/login')
		},
		{
			path: '/pages/index',
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
			path: '/pages/userList',
			name: 'userList',
			component: () => import('@/pages/userList')
		},
		{
			path: '/pages/companyManneList',
			name: 'companyManneList',
			component: () => import('@/pages/companyManneList')
		},
		{
			path: '/pages/registerNewShop',
			name: 'registerNewShop',
			component: () => import('@/pages/registerNewShop')
		},
		{
			path: '/pages/fundatioPreserve',
			name: 'fundatioPreserve',
			component: () => import('@/pages/fundatioPreserve')
		},
		{
			path: '/pages/replayJoin',
			name: 'replayJoin',
			component: () => import('@/pages/replayJoin')
		},
		{
			path: '/pages/systemLogReport',
			name: 'systemLogReport',
			component: () => import('@/pages/systemLogReport')
		},
		{
			path: '/pages/outputValueReport',
			name: 'outputValueReport',
			component: () => import('@/pages/outputValueReport')
		},
		{
			path: '/pages/vendorReceiptMain',
			name: 'vendorReceiptMain',
			component: () => import('@/pages/vendorReceiptMain')
		},
		{
			path: '/pages/mailSetupSetting',
			name: 'mailSetupSetting',
			component: () => import('@/pages/mailSetupSetting')
		},
		{
			path: '/pages/setupSetting',
			name: 'setupSetting',
			component: () => import('@/pages/setupSetting')
		},
		{
			path: '/pages/notificationMain',
			name: 'notificationMain',
			component: () => import('@/pages/notificationMain')
		},
		{
			path: '/pages/supplieManng',
			name: 'supplieManng',
			component: () => import('@/pages/supplieManng')
		},
		{
			path: '/pages/clientManng',
			name: 'clientManng',
			component: () => import('@/pages/clientManng')
		},
		{
			path: '/pages/productTypeManng',
			name: 'productTypeManng',
			component: () => import('@/pages/productTypeManng')
		},
		{
			path: '/pages/productManng',
			name: 'productManng',
			component: () => import('@/pages/productManng')
		},
		{
			path: '/pages/orderManng',
			name: 'orderManng',
			component: () => import('@/pages/orderManng')
		},
		{
			path: '/pages/purchase',
			name: 'purchase',
			component: () => import('@/pages/purchase')
		},
		{
			path: '/pages/purchaseMain',
			name: 'purchaseMain',
			component: () => import('@/pages/purchaseMain')
		},
		{
			path: '/pages/chainStoreMain',
			name: 'chainStoreMain',
			component: () => import('@/pages/chainStoreMain')
		},
		{
			path: '/pages/chainGroupMain',
			name: 'chainGroupMain',
			component: () => import('@/pages/chainGroupMain')
		},
		{
			path: '/pages/chainOrderMain',
			name: 'chainOrderMain',
			component: () => import('@/pages/chainOrderMain')
		},
		{
			path: '/pages/chainPurchaseMain',
			name: 'chainPurchaseMain',
			component: () => import('@/pages/chainPurchaseMain')
		},
		{
			path: '/pages/branchOrder',
			name: 'branchOrder',
			component: () => import('@/pages/branchOrder')
		},
		{
			path: '/pages/monthlyReport',
			name: 'monthlyReport',
			component: () => import('@/pages/monthlyReport')
		},
		{
			path: '/pages/productReport',
			name: 'productReport',
			component: () => import('@/pages/productReport')
		},
		{
			path: '/pages/centralKitchenReport',
			name: 'centralKitchenReport',
			component: () => import('@/pages/centralKitchenReport')
		},
		{
			path: '/pages/manufactureMain',
			name: 'manufactureMain',
			component: () => import('@/pages/manufactureMain')
		},
		{
			path: '/pages/orderReceiptMain',
			name: 'orderReceiptMain',
			component: () => import('@/pages/orderReceiptMain')
		},
		{
			path: '/pages/deliveryMain',
			name: 'deliveryMain',
			component: () => import('@/pages/deliveryMain')
		},
		{
			path: '/pages/warehouseMain',
			name: 'warehouseMain',
			component: () => import('@/pages/warehouseMain')
		},
		
	]
	
})
