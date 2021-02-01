<template>
	<div>
		<menuList></menuList>
		<div class="mainWrap">
			<div class="title">資訊總覽</div>
			<el-divider></el-divider>
			<div class="cardList">
				<div class="cradItem">
					<div class="left">
						<i class="el-icon-s-shop"></i>
					</div>
					<div class="right">
						<p>所有店家數</p>
						<p>50</p>
					</div>
				</div>
				<div class="cradItem">
					<div class="left">
						<i class="el-icon-s-order"></i>
					</div>
					<div class="right">
						<p>所有訂單數 </p>
						<p>50</p>
					</div>
				</div>
				<div class="cradItem">
					<div class="left">
						<i class="el-icon-s-custom"></i>
					</div>
					<div class="right">
						<p>所有用戶數</p>
						<p>50</p>
					</div>
				</div>
			</div>
			<div class="LoginWayList">
				<div class="cradItem cradItemActiv">
					<div class="left">
						<img src="../assets/images/android.png" alt="" />
					</div>
					<div class="right">
						Line
					</div>
				</div>
				<div class="cradItem">
					<div class="left">
						<img src="../assets/images/Email.png" alt="" class="greyEmail" />
					</div>
					<div class="right">
						EMail
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetIndexData } from '@/request/api'; // 导入我们的api接口
export default {
	name: 'App',
	data() {
		return {
			resListData: '',
		};
	},
	created() {},
	mounted() {
		this.getIndexData();
	},
	methods: {
		getIndexData() {
			//请求首页数据：
			apiGetIndexData({}).then(res => {
				if (res.code == 200) {
					this.resListData = res.data;
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		},
	}
};
</script>

<style lang="less" scoped="scoped">
.title{
    margin: 0 8px;
    font-size: 24px;
    font-weight: lighter;
    color: #9F4344 !important;
}
.cardList {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.cradItem {
		border: 1px dashed rgb(172, 168, 168);
		padding: 20px 20px;
		border-radius: 15px;
		display: flex;
		justify-content: space-around;
		.left{
			margin-top: 5px;
			text-align: center;
			i{
			 font-size: 40px;
			 color: #e97435;
			}
		}
		.right{
			// width: 200px;
			text-align: center;
			margin-left: 10px;
			p:nth-child(2) {
				color: #e97435;
				font-size: 24px;
				margin-top: 5px;
			}
			p:nth-child(1) {
				
				color: #000;
				font-size: 16px;
			}
		}

	}
}
.LoginWayList{
	margin-top: 30px;
	font-size: 16px;
	.cradItem {
		background-color: #ececec;
		padding: 20px 20px;
		border-radius: 15px;
		color: #fff;
		display: flex;
		justify-content: space-between;
		float: left;
		margin-right: 20px;
		.left{
			img{
				width: 30px;
			}
			.greyEmail{
				width: 28px;
				padding-top: 5px;
			}
		}
		.right{
			text-align: center;
			margin-left: 10px;
			margin-top: 8px;
		}
	}
	.cradItemActiv{
		background-color: #9ABC32;
	}
}
</style>
