<template>
	<div>
		<menuList></menuList>
		<div class="mainWrap">
			<div class="stepWrap">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>系统管理</el-breadcrumb-item>
					<el-breadcrumb-item>登录日志</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="inforWrap">
				<div class="nameList">
					<div class="nameItem">
						<p>登录地址</p>
						<el-input v-model="ip" placeholder="请输入登录地址"></el-input>
					</div>
					<div class="nameItem">
						<p>用户名</p>
						<el-input v-model="userName" placeholder="请输入用户名"></el-input>
					</div>
					<div class="nameItem">
						<p>状态</p>
						<el-select v-model="value" placeholder="请选择" @change="select">
							<el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div class="nameItem timeItem">
						<p>操作时间</p>
						<el-date-picker
							v-model="value1"
							type="daterange"
							value-format="yyyy-MM-dd"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-option="onPick()"
						></el-date-picker>
					</div>

					<div class="nameItem">
						<el-button type="primary" round>搜索</el-button>
						<el-button round>重置</el-button>
					</div>
				</div>
				<div class="formList">
					<el-table :data="tableData" style="width: 1z00%">
						<el-table-column prop="index" label="访问编号"></el-table-column>
						<el-table-column prop="adminName" label="管理员名"></el-table-column>
						<el-table-column prop="ip" label="登录ip地址"></el-table-column>
						<el-table-column prop="type" label="登录状态"></el-table-column>
						<el-table-column prop="createTime" label="操作日期"></el-table-column>
					</el-table>
					<div class="pagesWrap">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-size="10"
							layout="total, prev, pager, next, jumper"
							:total="total"
						></el-pagination>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetAdminLoginLog } from '@/request/api';
import { Toast } from 'vant';
export default {
	name: 'myNav',
	data() {
		return {
			form: {
				resource: ''
			},
			userName: '',
			ip: '',
			value1: '',
			currentPage: 1,
			addAgentMask: false,
			editor: {
				roleName: '',
				EnglishName: '',
				phone: '',
				sex: ''
			},
			optionsStatus: [
				{
					value: '全部',
					label: '全部'
				},
				{
					value: '成功',
					label: '成功'
				},
				{
					value: '失败',
					label: '失败'
				}
			],
			value: '',
			valueRole: '',
			tableData: [],
			offSetReq: '',
			total: '',
		};
	},
mounted() {
		this.getAdminLoginLog(0)
	},
	methods: {
		//选择日期
		onPick(e) {
			console.log(this.value1)
		},
		//选择类型
		select(value) {
			console.log('value',value)
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.offSetReq = (val - 1) * 10;
			this.getAdminLoginLog(this.offSetReq);
		},
		//重置：
		reset() {
			this.value1 = '';
			this.value = "";
			this.userName= ''
			this.ip= ''
			this.getAdminLoginLog(0);
		},
		//数据列表
		getAdminLoginLog(offset) {
			if (!this.value1) {
				this.value1 = ['', '']
			}
			if(this.value=='全部'){
				this.value=""
			}
			apiGetAdminLoginLog({
					offset: offset,
					limit: 10,
					startTime: this.value1[0],
					endTime: this.value1[1],
					adminName:this.userName,
					ip:this.ip,
					type:this.value,
				}).then(res => {
				if (res.code == 200) {
					this.tableData = res.data.list;
					this.total = res.data.total;
					this.tableData.map((item,index) => {
						item.index = index
					});
				}
			});
		},
	}
};
</script>

<style lang="less" scoped="scoped">
.mainWrap {
	width: calc(98% - 300px);
}
/deep/.el-table::before {
	height: 0px !important;
}
.inforWrap {
	.nameList {
		border: 1px solid #cfcfcf;
		border-left: 0px;
		border-right: 0px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		margin-bottom: 30px;
		padding: 10px 0px;
		.nameItem {
			width: 300px;
			overflow: hidden;
			height: 60px;
			line-height: 60px;
			p {
				float: left;
				font-size: 16px;
				padding-right: 20px;
			}
			.el-input {
				float: left;
				width: 8vw !important;
			}
			/deep/.el-input__inner {
				width: 8vw !important;
			}
		}
		.timeItem {
			width: 400px;
			/deep/.el-input__inner {
				width: 12vw !important;
			}
		}
	}

	.formList {
		em {
			font-style: normal;
		}
		.el-table {
			overflow-y: scroll !important;
			max-height: 64vh;
		}
		.pagesWrap {
			margin-top: 50px;
		}
	}

	
}
</style>
