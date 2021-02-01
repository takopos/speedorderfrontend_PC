/**   
 * api接口统一管理
 */
import {
	get,
	post
} from './http'

export const apiSetAdminStatus = p => post('/api/admin/setAdminStatus',p);//系统配置-用户管理-更改状态
export const apiSetAdminDel = p => post('/api/admin/setAdminDel',p);//系统配置-用户管理-删除
export const apiGetAdminLog = p => post('/api/admin/getAdminLog',p);//系统配置-操作日志
export const apiGetAdminLoginLog = p => post('/api/admin/getAdminLoginLog',p);//系统配置-登录日志


// SD:——————————————————————————————————————————
export const apiLogin = p => post('/SpeedOrderService/api_app/login', p);  //登录接口