<template>
	<div>
		222
	</div>
</template>

<script>
export default {
	name: 'myNav',
	data() {
		return {
			
		};
	},
	mounted() {},
	methods: {
	}
};
</script>

<style lang="less">
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
	background: rgba(62, 114, 242, 1);
	z-index: 9999999;
	.companyLogoWrap {
		.navFlex;
		padding-left: 40px;
		img {
			width: 58px;
			height: 54px;
			padding-top: 17px;
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
		.el-avatar {
			margin-top: 22px;
		}
		.userPhone {
			font-size: 22px;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			padding-left: 9px;
		}
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

</style>
