<template>
	<div>
		<div class="topWrap">
			<div class="navContent">
				<div class="companyLogoWrap">
					<img src="../assets/images/logo.png" alt="" />
				</div>
				

				<div class="user">
					 <!-- @click="addAgentMask = true" -->
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<div class="userPhone">
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-submenu >
							<template slot="title">歡迎 admin</template>
							<el-menu-item index="2-1">
								<router-link to="/pages/login">
									<i class="el-icon-switch-button">退出登录</i>
								</router-link>
							</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
						</el-submenu>
					  </el-menu>
					</div>
				</div>
				<div class="companyList">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-submenu >
							<template slot="title">諾迪科技股份有限公司 (總管理)</template>
							<el-menu-item index="2-1">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
						</el-submenu>
					  </el-menu>
				</div>
				<div class="speedOrderId">速訂ID:【 101102763 】</div>
				<div class="speedOrderId notes">
					<i class="el-icon-message-solid"></i>
				</div>


			</div>
			<div style="height: 89px;width: 100%;"></div>
		</div>
		<div class="leftWrap">
			<el-row class="tac">
				<el-col :span="12">
					<el-menu default-active="1" class="el-menu-vertical-demo" :default-active="this.$route.path" router @select="handleSelect">
						<div v-for="(item, i) in navList" :key="i">
							<el-submenu :index="item.name" v-if="item.second">
								<template slot="title">
									<i :class="item.icon"></i>
									<span>{{ item.navItem }}</span>
								</template>
								<el-menu-item-group>
									<el-menu-item :index="sec.name" v-for="(sec, j) in item.second" :key="j">{{ sec.navItem }}</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-menu-item v-else :index="item.name">
								<i :class="item.icon"></i>
								<span slot="title">{{ item.navItem }}</span>
							</el-menu-item>
						</div>
					</el-menu>
				</el-col>
			</el-row>
		</div>

		<div class="maskWrap" v-show="addAgentMask == true" @click="addAgentMask = false"></div>
		<div class="maskInfo" v-show="addAgentMask == true">
			<div class="positionStyle">
				<h5>修改密码</h5>
				<div class="infoWrap">
					<div class="nameItem">
						<p>输入旧密码</p>
						<el-input type="password" v-model="editor.oldPassWord" placeholder="请输入旧密码"></el-input>
					</div>
					<div class="nameItem">
						<p>输入新密码</p>
						<el-input type="password" v-model="editor.newPassWord" placeholder="请输入新密码"></el-input>
					</div>
					<div class="nameItem">
						<p>确认新密码</p>
						<el-input type="password" v-model="editor.reNewPassWord" placeholder="请再次输入新密码"></el-input>
					</div>
					<el-button type="primary" @click="reSetPassword()" class="sureSubmit">确认</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { apiReSetPassword } from '@/request/api';
import { Toast } from 'vant';
export default {
	name: 'menuList',
	data() {
		return {
			navList: [
				{
					name: '/',
					icon: 'el-icon-s-home',
					navItem: '首页'
				},
				{
					name: '1',
					navItem: ' 速訂會員管理 ',
					icon: 'el-icon-user',
					second: [{ name: '/pages/userList', navItem: ' 員工帳號管理 ' }, { name: '/pages/agentList', navItem: ' 企業總管理列表 ' }]
				},
				// {
				// 	name: '/pages/orderList',
				// 	icon: 'el-icon-document',
				// 	navItem: '订单列表'
				// },
				// {
				// 	name: '3',
				// 	navItem: '财务管理',
				// 	icon: 'el-icon-coin',
				// 	second: [{ name: '/pages/check', navItem: '提现审核' }, { name: '/pages/statistics', navItem: '订单统计' }]
				// },
				// {
				// 	name: '4',
				// 	navItem: '配置中心',
				// 	icon: 'el-icon-setting',
				// 	second: [
				// 		{ name: '/pages/productSet', navItem: '产品配置' },
				// 		{ name: '/pages/withdrawalSet', navItem: '提现配置' },
				// 		{ name: '/pages/serviceSet', navItem: '客服配置' }
				// 	]
				// },
				// {
				// 	name: '5',
				// 	navItem: '系统管理',
				// 	icon: 'el-icon-cpu',
				// 	second: [
				// 		{ name: '/pages/roleMannge', navItem: '角色管理' },
				// 		{ name: '/pages/userMannge', navItem: '用户管理' },
				// 		{ name: '/pages/optionsNotes', navItem: '操作日志' },
				// 		{ name: '/pages/loginNotes', navItem: '登录日志' }
				// 	]
				// }
			],
			addAgentMask: false,
			editor: {
				oldPassWord: '',
				newPassWord: '',
				reNewPassWord: ''
			},
		};
	},
	mounted() {},
	methods: {
		handleSelect(key, keyPath) {
			// console.log(key, keyPath);
		},
		reSetPassword(offset) {
			if (this.editor.newPassWord != this.editor.reNewPassWord) {
				Toast.fail('两次输入的密码不一致！');
			}
			apiReSetPassword({
				password: this.editor.oldPassWord,
				newPassword: this.editor.newPassWord
			}).then(res => {
				if (res.code == 200) {
					this.editor.oldPassWord = '';
					this.editor.newPassWord = '';
					this.editor.reNewPassWord = '';
					this.addAgentMask = false;
					Toast.success('修改成功！');
				}
			});
		}
	}
};
</script>

<style lang="less">
.topWrap {
	margin-bottom: 25px;
	.navFlex {
		//横向公用的css，less独特的语法
		float: left;
		display: flex;
		justify-content: space-between;
	}
	.navContent {
		position: fixed;
		top: 0px;
		height: 89px;
		line-height: 89px;
		width: 100%;
		background: #000000;
		z-index: 9999999;
		.companyLogoWrap {
			.navFlex;
			padding-left: 40px;
			img {
				// width: 58px;
				height: 36px;
				padding-top: 23px;
				display: block;
			}
			.companyTitle {
				font-size: 30px;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-left: 20px;
				letter-spacing: 5px;
			}
		}
		.user {
			.navFlex;
			float: right;
			margin-right: 3%;
			cursor: pointer;
			.el-avatar {
				margin-top: 22px;
			}
			.userPhone {
				// font-size: 16px;
				// font-weight: 400;
				// color: rgba(255, 255, 255, 1);
				// padding-left: 9px;
				margin-top: 16px;
				.el-menu{
				background-color: #000;
				}
				.el-submenu__title{
					color: #fff;
					border: 0px;
					background-color: #000;
				}
				.el-menu.el-menu--horizontal{
					border: 0px;
				}
			}
			.userPhone:hover {
				color: #c5c5c5 !important;
				transition: 0.3s;
			}
		}
		.companyList{
			// width: 130px;
			float: right;
			margin-top: 14px;
			float: right;
			.el-menu{
				background-color: #000;
			}
			.el-submenu__title{
				color: #fff;
				border: 0px;
				background-color: #000;
			}
			.el-menu.el-menu--horizontal{
				border: 0px;
			}
		}
		.speedOrderId{
			float: right;
			color: #fff;
			font-size: 16px;
			font-weight: 100;
		}
		.notes{
			margin-right: 20px
		}
		.loginOut {
			.navFlex;
			float: right;
			padding-right: 40px;
			img {
				width: 28px;
				height: 28px;
				padding-top: 30px;
			}
			.loginOutButton {
				font-size: 22px;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				padding-left: 10px;
				cursor: pointer;
			}
			.el-icon-switch-button {
				font-size: 28px;
				padding-top: 30px;
				color: #fff;
			}
		}
		.loginOut:hover {
			.el-icon-switch-button {
				color: #c5c5c5;
				transition: 0.3s;
			}
			.loginOutButton {
				color: #c5c5c5;
				transition: 0.3s;
			}
		}
	}
}

.leftWrap {
	width: 200px;
	min-height: 200px;
	// background-color: red;
	margin-left: 20px;
	float: left;
	.el-col-12 {
		width: 90%;
	}
	.el-menu-item {
		font-size: 16px;
	}
	.el-submenu__title {
		font-size: 16px;
	}
	.el-submenu {
		i {
			font-size: 20px;
		}
		.el-menu-item {
			width: 177px;
		}
	}
	// .el-submenu__icon-arrow {
	// 	font-size: 16px !important;
	// 	padding-top: 2px;
	// }
	// .el-submenu__title {
	// 	margin-top: 20px !important;
	// }
	// .menubar {
	// 	li:nth-child(3) {
	// 		margin-top: 20px;
	// 	}
	// }
	// .menuManneg {
	// 	margin-top: 20px;
	// }
}

.maskWrap {
	width: 100%;
	height: 100vh;
	background: #000;
	opacity: 0.3;
	position: fixed;
	top: 0px;
	z-index: 1;
}
.maskInfo {
	width: 40vw;
	min-height: 50vh;
	background-color: #fff !important;
	z-index: 2;
	position: relative;
	border-radius: 10px;
	top: 5vh;
	left: 30vw;
	.positionStyle {
		position: absolute;
		width: calc(100% - 20px);
		padding: 10px;
		h5 {
			padding: 20px;
			border-bottom: 1px solid #cacaca;
			margin-bottom: 20px;
			text-align: center;
		}
		.infoWrap {
			.nameItem {
				margin: 0 auto;
				width: 25vw;
				overflow: hidden;
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				p {
					float: left;
					font-size: 16px;
					padding-right: 20px;
				}
				.el-input {
					float: left;
					width: 15vw !important;
				}
				.setUserItem {
					position: absolute;
				}
				.setUser {
					position: absolute;
					left: 100px;
				}
			}
			.sureSubmit {
				margin-top: 40px;
				text-align: center;
				margin-left: 45%;
				.el-button {
					padding: 12px 40px;
				}
				.is-round {
					border-radius: 20px;
					padding: 15px 35px;
				}
			}
		}
	}
}
.el-menu-item.is-active {
    color: #e97435;
}
</style>
