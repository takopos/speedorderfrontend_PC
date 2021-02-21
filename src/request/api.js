/**   
 * api接口统一管理
 */
import {
	get,
	post
} from './http'

export const apiGetVerifyCode ='/api/common/getVerifyCode';  //验证码图片
// export const apiLogin = p => post('/api/admin/login', p);  //登录接口
export const apiReSetPassword = p => post('/api/admin/reSetPassword',p); //重置密码
export const apiGetIndexData = p => post('/api/admin/getIndexData',p);//首页

// SD:——————————————————————————————————————————
export const apiLogin = p => post('/SpeedOrderService/api_app/login', p);  //登录接口