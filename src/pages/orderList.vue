<template>
	<div>
		<menuList></menuList>
		<div class="mainWrap">
			<div class="stepWrap">
				<el-breadcrumb separator="/"><el-breadcrumb-item>订单列表</el-breadcrumb-item></el-breadcrumb>
			</div>
			<div class="inforWrap">
				<div class="nameList">
					<div class="nameItem">
						<p>会员手机号</p>
						<el-input v-model="phone" placeholder="请输入手机号"></el-input>
					</div>
					<div class="nameItem timeItem">
						<p>注册时间</p>
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
						<el-button type="primary" round @click="getOrderList(0)">搜索</el-button>
						<el-button round @click="reset()">重置</el-button>
					</div>
				</div>
				<div class="formList">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="orderSn" label="订单编号" width="220"></el-table-column>
						<el-table-column prop="tel" label="手机号" width="180"></el-table-column>
						<el-table-column prop="sex" label="性别" width="100"></el-table-column>
						<el-table-column prop="card" label="身份号码" width="250"></el-table-column>
						<el-table-column prop="price" label="消费金额(元)" width="180"></el-table-column>
						<el-table-column prop="createTime" label="查询时间" width="250"></el-table-column>
						<el-table-column prop="options" label="操作" width="250">
							<template slot-scope="scope">
								<el-button class="ice" @click="viewInfo(scope.row.id)">查看详情</el-button>
							</template>
						</el-table-column>
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
		<div class="maskWrap" v-if="addAgentMask == true" @click="addAgentMask = false"></div>
		<div class="maskInfo" v-if="addAgentMask == true">
			<div class="positionStyle" v-if="addAgentMask == true">
				<h5>基础信息{{addAgentMask}}</h5>
				<div class="infoWrap">
					<template>
						<el-table :data="tableDataInfo" height="120" border style="width: 100%">
							<el-table-column prop="orderNum" label="订单编号"></el-table-column>
							<el-table-column prop="tel" label="手机号"></el-table-column>
							<el-table-column prop="sex" label="性别"></el-table-column>
							<el-table-column prop="idNum" label="身份证号"></el-table-column>
							<el-table-column prop="time" label="查询时间"></el-table-column>
						</el-table>
					</template>
				</div>

				<div class="title">
					<span @click="moneywho_p = 0">
						风险多头回溯
						<em class="sanjiao" v-show="moneywho_p == 0"></em>
					</span>
					<span @click="moneywho_p = 1">
						金融借还行为统计
						<em class="sanjiao" v-show="moneywho_p == 1"></em>
					</span>
				</div>
				<!-- 金融借还行为统计-标题: -->
				<div class="titleChild" v-show="moneywho_p == 1">
					<span :class="{ activ: moneywho == 0 }" @click="moneywho = 0">综合情况</span>
					<span :class="{ activ: moneywho == 1 }" @click="moneywho = 1">贷款机构数统计</span>
					<span :class="{ activ: moneywho == 2 }" @click="moneywho = 2">近期是否有逾期</span>
					<span :class="{ activ: moneywho == 3 }" @click="moneywho = 3">交易失败机构数统计</span>
					<span :class="{ activ: moneywho == 4 }" @click="moneywho = 4">交易失败笔数统计</span>
					<span :class="{ activ: moneywho == 5 }" @click="moneywho = 5">交易失败金额统计</span>
					<span :class="{ activ: moneywho == 6 }" @click="moneywho = 6">还款成功笔数统计</span>
					<span :class="{ activ: moneywho == 7 }" @click="moneywho = 7">还款成功金额统计</span>
					<span :class="{ activ: moneywho == 8 }" @click="moneywho = 8">交易信息统计</span>
				</div>
				<!-- 金融借还行为统计-数据: -->
				<div v-if="statisticsInfo&&moneywho_p == 1">
					<!-- 金融借还行为统计：综合情况 -->
					<div class="dataList" v-show="moneywho == 0">
						<div class="dataItem">
							<span>信用风险评分:</span>
							<span>{{ statisticsInfo.general_info.credit_score}}</span>
						</div>
						<div class="dataItem">
							<span>履约金额综合指数:</span>
							<span>{{ statisticsInfo.general_info.performance_amount_index }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保分:</span>
							<span>{{ statisticsInfo.general_info.loan_guarantee_score }}</span>
						</div>
						<div class="dataItem">
							<span>大额分期分</span>
							<span>{{ statisticsInfo.general_info.large_stages_score }}</span>
						</div>
						<div class="dataItem">
							<span>小额分期分</span>
							<span>{{ statisticsInfo.general_info.small_stages_score }}</span>
						</div>
						<div class="dataItem">
							<span>信用贷款天数</span>
							<span>{{ statisticsInfo.general_info.credit_loan_days }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：贷款机构数统计 -->
					<div class="dataList" v-show="moneywho == 1">
						<div class="dataItem">
							<span>贷款机构总数</span>
							<span>{{ statisticsInfo.loan_orgnum.total }}</span>
						</div>
						<div class="dataItem">
							<span>消金类贷款机构总数</span>
							<span>{{ statisticsInfo.loan_orgnum.consumer_finance_total }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保类贷款机构总数</span>
							<span>{{ statisticsInfo.loan_orgnum.loan_guarantee_total }}</span>
						</div>
						<div class="dataItem">
							<span>最近7天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近14天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day21 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day30 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天贷款机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.day180 }}</span>
						</div>
						<div class="dataItem">
							<span>贷款已结清机构数</span>
							<span>{{ statisticsInfo.loan_orgnum.settle }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：近期是否有逾期 -->
					<div class="dataList" v-show="moneywho == 2">
						<div class="dataItem">
							<span>最近7天是否逾期</span>
							<span>{{ statisticsInfo.overdue_info.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近14天是否逾期</span>
							<span>{{ statisticsInfo.overdue_info.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天是否逾期</span>
							<span>{{ statisticsInfo.overdue_info.day30 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：交易失败机构数统计 -->
					<div class="dataList" v-show="moneywho == 3">
						<div class="dataItem">
							<span>最7天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近14天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day21 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day30 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天交易失败机构数</span>
							<span>{{ statisticsInfo.tradefailed_orgnum.day180 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：交易失败笔数统计 -->
					<div class="dataList" v-show="moneywho == 4">
						<div class="dataItem">
							<span>交易失败总笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.total }}</span>
						</div>
						<div class="dataItem">
							<span>最7天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近14天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day21 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day30 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天交易失败笔数</span>
							<span>{{ statisticsInfo.tradefailed_count.day180 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：交易失败金额统计 -->
					<div class="dataList" v-show="moneywho == 5">
						<div class="dataItem">
							<span>最7天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day7 }}</span>
						</div>

						<div class="dataItem">
							<span>最近14天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day21 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天交易失败金额</span>
							<span>{{ statisticsInfo.tradefailed_amount.day180 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：还款成功笔数统计 -->
					<div class="dataList" v-show="moneywho == 6">
						<div class="dataItem">
							<span>还款成功总笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.total }}</span>
						</div>

						<div class="dataItem">
							<span>最近7天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近14天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day21 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day30 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天还款成功笔数</span>
							<span>{{ statisticsInfo.repaysuccess_count.day180 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：还款成功金额统计 -->
					<div class="dataList" v-show="moneywho == 7">
						<div class="dataItem">
							<span>最近7天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.total }}</span>
						</div>

						<div class="dataItem">
							<span>最近14天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.day7 }}</span>
						</div>
						<div class="dataItem">
							<span>最近21天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.day14 }}</span>
						</div>
						<div class="dataItem">
							<span>最近30天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.day30 }}</span>
						</div>
						<div class="dataItem">
							<span>最近90天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.day90 }}</span>
						</div>
						<div class="dataItem">
							<span>最近180天还款成功金额</span>
							<span>{{ statisticsInfo.repaysuccess_amount.day180 }}</span>
						</div>
					</div>
					<!-- 金融借还行为统计：交易信息统计 -->
					<div class="dataList" v-show="moneywho == 8">
						<div class="dataItem">
							<span>最近交易距今总天数</span>
							<span>{{ statisticsInfo.trade_info.total_days_recently }}</span>
						</div>
						<div class="dataItem">
							<span>最后一次交易失败后还款总次数</span>
							<span>{{ statisticsInfo.trade_info.repay_times_last_failed }}</span>
						</div>
						<div class="dataItem">
							<span>交易失败到下一次还款成功最短天数</span>
							<span>{{ statisticsInfo.trade_info.shortest_days_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>交易失败到下一次还款成功最长天数</span>
							<span>{{ statisticsInfo.trade_info.longest_days_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>交易失败到下一次还款成功平均天数</span>
							<span>{{ statisticsInfo.trade_info.average_days_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>消金类贷款机构最后⼀次交易失败后还款次数</span>
							<span>{{ statisticsInfo.trade_info.repay_times_xj_last_failed }}</span>
						</div>
						<div class="dataItem">
							<span>消金类贷款机构交易失败到下一次还款成功最短天数</span>
							<span>{{ statisticsInfo.trade_info.shortest_days_xj_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>消金类贷款机构交易失败到下一次还款成功最长天数</span>
							<span>{{ statisticsInfo.trade_info.longest_days_xj_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>消金类贷款机构交易失败到下一次还款成功平均天数</span>
							<span>{{ statisticsInfo.trade_info.average_days_xj_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保类贷款机构最后⼀次交易失败后还款次数</span>
							<span>{{ statisticsInfo.trade_info.repay_times_xddb_last_failed }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保类贷款机构交易失败到下一次还款成功最短天数</span>
							<span>{{ statisticsInfo.trade_info.shortest_days_xddb_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保类贷款机构交易失败到下一次还款成功最长天数</span>
							<span>{{ statisticsInfo.trade_info.longest_days_xddb_failed_to_success }}</span>
						</div>
						<div class="dataItem">
							<span>小贷担保类贷款机构交易失败到下一次还款成功平均天数</span>
							<span>{{ statisticsInfo.trade_info.average_days_xddb_failed_to_success }}</span>
						</div>
					</div>
				</div>

				<!-- 风险多头回溯-数据: -->
				<div v-if="backInfo&&moneywho_p == 0">
					<div class="dataList">
						<div class="dataItem">
							<span>注册机构总数</span>
							<span>{{ backInfo.reg_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>最近注册距今天数</span>
							<span>{{ backInfo.reg_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最早注册距今天数</span>
							<span>{{ backInfo.reg_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最近注册距今天数</span>
							<span>{{ backInfo.reg_bank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最早注册距今天数</span>
							<span>{{ backInfo.reg_bank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最近注册距今天数</span>
							<span>{{ backInfo.reg_unbank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最早注册距今天数</span>
							<span>{{ backInfo.reg_unbank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>最近申请时间距今天数</span>
							<span>{{ backInfo.app_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最早申请时间距今天数</span>
							<span>{{ backInfo.app_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>申请总次数</span>
							<span>{{ backInfo.app_counts }}</span>
						</div>
						<div class="dataItem">
							<span>申请机构总数</span>
							<span>{{ backInfo.app_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>申请最大金额</span>
							<span>{{ backInfo.app_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>申请最大金额距今最近天数</span>
							<span>{{ backInfo.app_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>申请最大金额距今最早天数</span>
							<span>{{ backInfo.app_small_money }}</span>
						</div>
						<div class="dataItem">
							<span>申请最小金额距今最近天数</span>
							<span>{{ backInfo.app_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>申请最小金额距今最早天数</span>
							<span>{{ backInfo.app_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最近申请距今天数</span>
							<span>{{ backInfo.app_bank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最早申请距今天数</span>
							<span>{{ backInfo.app_bank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请机构总数</span>
							<span>{{ backInfo.app_bank_counts }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请最大金额</span>
							<span>{{ backInfo.app_bank_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请最大金额距今最近天数</span>
							<span>{{ backInfo.app_bank_biggest_money_recently_day }}</span>
						</div>

						<div class="dataItem">
							<span>银行申请最大金额距今最早天数</span>
							<span>{{ backInfo.app_bank_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请最小金额</span>
							<span>{{ backInfo.app_bank_small_money }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请最小金额距今最近天数</span>
							<span>{{ backInfo.app_bank_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行申请最小金额距今最早天数</span>
							<span>{{ backInfo.app_bank_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行申请机构总数</span>
							<span>{{ backInfo.app_unbank_counts }}</span>
						</div>

						<div class="dataItem">
							<span>非银行申请最大金额</span>
							<span>{{ backInfo.app_unbank_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>非银行申请最大金额距今最近天数</span>
							<span>{{ backInfo.app_unbank_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行申请最大金额距今最早天数</span>
							<span>{{ backInfo.app_unbank_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行申请最小金额</span>
							<span>{{ backInfo.app_unbank_small_money }}</span>
						</div>

						<div class="dataItem">
							<span>非银行申请最小金额距今最近天数</span>
							<span>{{ backInfo.app_unbank_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行申请最小金额距今最早天数</span>
							<span>{{ backInfo.app_unbank_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最近申请距今天数</span>
							<span>{{ backInfo.app_unbank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最早申请距今天数</span>
							<span>{{ backInfo.app_unbank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>放款总次数</span>
							<span>{{ backInfo.loan_counts }}</span>
						</div>
						<div class="dataItem">
							<span>放款机构总数</span>
							<span>{{ backInfo.loan_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>最大放款金额</span>
							<span>{{ backInfo.loan_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>放款最大金额距今最近天数</span>
							<span>{{ backInfo.loan_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>放款最大金额距今最早天数</span>
							<span>{{ backInfo.loan_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>放款最小金额</span>
							<span>{{ backInfo.loan_small_money }}</span>
						</div>
						<div class="dataItem">
							<span>放款最小金额距今最近天数</span>
							<span>{{ backInfo.loan_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>放款最小金额距今最早天数</span>
							<span>{{ backInfo.loan_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>最近放款距今天数</span>
							<span>{{ backInfo.loan_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最早放款距今天数</span>
							<span>{{ backInfo.loan_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最近放款距今天数</span>
							<span>{{ backInfo.loan_bank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最早放款距今天数</span>
							<span>{{ backInfo.loan_bank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款机构数</span>
							<span>{{ backInfo.loan_bank_counts }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最大金额</span>
							<span>{{ backInfo.loan_bank_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最大金额距今最近天数</span>
							<span>{{ backInfo.loan_bank_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最大金额距今最早天数</span>
							<span>{{ backInfo.loan_bank_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最小金额</span>
							<span>{{ backInfo.loan_bank_small_money }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最小金额距今最近天数</span>
							<span>{{ backInfo.loan_bank_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行放款最小金额距今最早天数</span>
							<span>{{ backInfo.loan_bank_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行放款机构总数</span>
							<span>{{ backInfo.loan_unbank_counts }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最大放款金额</span>
							<span>{{ backInfo.loan_unbank_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>非银行放款最大金额距今最近天数</span>
							<span>{{ backInfo.loan_unbank_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行放款最大金额距今最早天数</span>
							<span>{{ backInfo.loan_unbank_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行放款最小金额</span>
							<span>{{ backInfo.loan_unbank_small_money }}</span>
						</div>

						<div class="dataItem">
							<span>非银行放款最小金额距今最近天数</span>
							<span>{{ backInfo.loan_unbank_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行放款最小金额距今最早天数</span>
							<span>{{ backInfo.loan_unbank_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最近放款距今天数</span>
							<span>{{ backInfo.loan_unbank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最早放款距今天数</span>
							<span>{{ backInfo.loan_unbank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>驳回总次数</span>
							<span>{{ backInfo.reject_counts }}</span>
						</div>
						<div class="dataItem">
							<span>驳回机构总数</span>
							<span>{{ backInfo.reject_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>最近驳回距今天数</span>
							<span>{{ backInfo.reject_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最早驳回距今天数</span>
							<span>{{ backInfo.reject_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最近驳回距今天数</span>
							<span>{{ backInfo.reject_bank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行最早驳回距今天数</span>
							<span>{{ backInfo.reject_bank_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>银行驳回机构总数</span>
							<span>{{ backInfo.reject_bank_counts }}</span>
						</div>
						<div class="dataItem">
							<span>非银行驳回机构总数</span>
							<span>{{ backInfo.reject_unbank_counts }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最近驳回距今天数</span>
							<span>{{ backInfo.reject_unbank_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>非银行最早驳回距今天数</span>
							<span>{{ backInfo.overdue_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最近逾期距今天数</span>
							<span>{{ backInfo.overdue_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>最早逾期距今天数</span>
							<span>{{ backInfo.overdue_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>逾期总次数</span>
							<span>{{ backInfo.overdue_counts }}</span>
						</div>
						<div class="dataItem">
							<span>逾期机构总数</span>
							<span>{{ backInfo.overdue_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最大金额</span>
							<span>{{ backInfo.overdue_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最大金额距今最近天数</span>
							<span>{{ backInfo.overdue_biggest_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最大金额距今最早天数</span>
							<span>{{ backInfo.overdue_biggest_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最小金额</span>
							<span>{{ backInfo.overdue_small_money }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最小金额距今最近天数</span>
							<span>{{ backInfo.overdue_small_money_recently_day }}</span>
						</div>
						<div class="dataItem">
							<span>逾期最小金额距今最早天数</span>
							<span>{{ backInfo.overdue_small_money_history_day }}</span>
						</div>
						<div class="dataItem">
							<span>欠款总次数</span>
							<span>{{ backInfo.arrearage_counts }}</span>
						</div>
						<div class="dataItem">
							<span>欠款机构总数</span>
							<span>{{ backInfo.arrearage_platform_counts }}</span>
						</div>
						<div class="dataItem">
							<span>最大金额欠款</span>
							<span>{{ backInfo.arrearage_biggest_money }}</span>
						</div>
						<div class="dataItem">
							<span>最小欠款金额</span>
							<span>{{ backInfo.arrearage_small_money }}</span>
						</div>

						<div class="dataItem">
							<span>近7天注册机构数</span>
							<span>{{ backInfo.reg_platform_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月注册机构数</span>
							<span>{{ backInfo.reg_platform_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月注册机构数</span>
							<span>{{ backInfo.reg_platform_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月注册机构数</span>
							<span>{{ backInfo.reg_platform_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月注册机构数</span>
							<span>{{ backInfo.reg_platform_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月注册机构数</span>
							<span>{{ backInfo.reg_platform_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月注册机构数</span>
							<span>{{ backInfo.reg_platform_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天申请次数</span>
							<span>{{ backInfo.app_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月申请次数</span>
							<span>{{ backInfo.app_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月申请次数</span>
							<span>{{ backInfo.app_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月申请次数</span>
							<span>{{ backInfo.app_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月申请次数</span>
							<span>{{ backInfo.app_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月申请次数</span>
							<span>{{ backInfo.app_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月申请次数</span>
							<span>{{ backInfo.app_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天申请机构数</span>
							<span>{{ backInfo.app_platform_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月申请机构数</span>
							<span>{{ backInfo.app_platform_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月申请机构数</span>
							<span>{{ backInfo.app_platform_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月申请机构数</span>
							<span>{{ backInfo.app_platform_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月申请机构数</span>
							<span>{{ backInfo.app_platform_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月申请机构数</span>
							<span>{{ backInfo.app_platform_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月申请机构数</span>
							<span>{{ backInfo.app_platform_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天放款次数</span>
							<span>{{ backInfo.loan_counts_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月放款次数</span>
							<span>{{ backInfo.loan_counts_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月放款次数</span>
							<span>{{ backInfo.loan_counts_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月放款次数</span>
							<span>{{ backInfo.loan_counts_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月放款次数</span>
							<span>{{ backInfo.loan_counts_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月放款次数</span>
							<span>{{ backInfo.loan_counts_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月放款次数</span>
							<span>{{ backInfo.loan_counts_month24 }}</span>
						</div>

						<div class="dataItem">
							<span>近7天放款机构数</span>
							<span>{{ backInfo.loan_platform_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月放款机构数</span>
							<span>{{ backInfo.loan_platform_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月放款机构数</span>
							<span>{{ backInfo.loan_platform_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月放款机构数</span>
							<span>{{ backInfo.loan_platform_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月放款机构数</span>
							<span>{{ backInfo.loan_platform_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月放款机构数</span>
							<span>{{ backInfo.loan_platform_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月放款机构数</span>
							<span>{{ backInfo.loan_platform_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天驳回次数</span>
							<span>{{ backInfo.reject_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月驳回次数</span>
							<span>{{ backInfo.reject_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月驳回次数</span>
							<span>{{ backInfo.reject_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月驳回次数</span>
							<span>{{ backInfo.reject_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月驳回次数</span>
							<span>{{ backInfo.reject_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月驳回次数</span>
							<span>{{ backInfo.reject_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月驳回次数</span>
							<span>{{ backInfo.reject_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天驳回机构数</span>
							<span>{{ backInfo.reject_platform_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月驳回机构数</span>
							<span>{{ backInfo.reject_platform_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天逾期次数</span>
							<span>{{ backInfo.overdue_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月逾期次数</span>
							<span>{{ backInfo.overdue_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月逾期次数</span>
							<span>{{ backInfo.overdue_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月逾期次数</span>
							<span>{{ backInfo.overdue_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月逾期次数</span>
							<span>{{ backInfo.overdue_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月逾期次数</span>
							<span>{{ backInfo.overdue_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月逾期次数</span>
							<span>{{ backInfo.overdue_month24 }}</span>
						</div>
						<div class="dataItem">
							<span>近7天逾期机构数</span>
							<span>{{ backInfo.overdue_platform_week }}</span>
						</div>
						<div class="dataItem">
							<span>近1月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month }}</span>
						</div>
						<div class="dataItem">
							<span>近3月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month3 }}</span>
						</div>
						<div class="dataItem">
							<span>近6月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month6 }}</span>
						</div>
						<div class="dataItem">
							<span>近12月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month12 }}</span>
						</div>
						<div class="dataItem">
							<span>近18月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month18 }}</span>
						</div>
						<div class="dataItem">
							<span>近24月逾期机构数</span>
							<span>{{ backInfo.overdue_platform_month24 }}</span>
						</div>
					</div>
				</div>
				
				<div class="dataList" v-if="(!statisticsInfo&&moneywho_p==1)||(!backInfo&&moneywho_p==0)">
					本数据库中未查得此订单信息...
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetOrderList, apiGetOrderInfo } from '@/request/api';
export default {
	name: 'myNav',
	data() {
		return {
			moneywho_p: 0,
			moneywho: 0, //订单详情，点击的是哪一项
			statisticsInfo: '', //金融借贷行为
			backInfo: '', //风险多头回溯
			phone: '',
			value1: '',
			currentPage: 1,
			addAgentMask:false,
			offSetReq: '',
			total: '',
			tableData: [],
			tableDataInfo: [
				{
					orderNum: '',
					tel: '',
					sex: '',
					idNum: '',
					time: ''
				}
			],
			orderInfo: ''
		};
	},
	created() {
		this.addAgentMask=false
	},
	mounted() {
		this.getOrderList(0);
	},
	methods: {
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.offSetReq = (val - 1) * 10;
			this.getOrderList(this.offSetReq);
		},
		//选择日期
		onPick(e) {
			// console.log(this.value1)
		},
		//重置：
		reset() {
			this.name = '';
			this.phone = '';
			this.value1 = '';
			this.getOrderList(0);
		},
		//数据列表
		getOrderList(offset) {
			if (!this.value1) {
				this.value1 = ['', ''];
			}
			apiGetOrderList({
				offset: offset,
				limit: 10,
				tel: this.phone,
				startTime: this.value1[0],
				endTime: this.value1[1]
			}).then(res => {
				if (res.code == 200) {
					this.dataList = res.data.list;
					this.total = res.data.total;
					this.dataList.map(item => {
						item.options = '';
						if (item.sex == 1) {
							item.sex = '男';
						} else {
							item.sex = '女';
						}
					});
					this.tableData = this.dataList;
					// this.viewInfo(this.tableData[0].id); //先请求任一一个详情，避免订单详情部分html没有参数 停止渲染
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		},
		//查看详情：
		viewInfo(orederId) {
			this.addAgentMask = true;
			apiGetOrderInfo({
				orderId: orederId
			}).then(res => {
				if (res.code == 200) {
					console.log('this.addAgentMask', this.addAgentMask);
					this.tableDataInfo[0].orderNum = res.data.orderSn;
					this.tableDataInfo[0].tel = res.data.tel;
					if (res.data.sex == 0) {
						this.tableDataInfo[0].sex = '女';
					} else {
						this.tableDataInfo[0].sex = '男';
					}
					this.tableDataInfo[0].idNum = res.data.card;
					this.tableDataInfo[0].time = res.data.createTime;
					this.statisticsInfo = res.data.statisticsInfo.statisticsData.result; //金融借贷行为
					this.backInfo = res.data.backInfo.backData.result; //风险多头回溯
					// if(res.data.statisticsInfo.statisticsData.result&&res.data.backInfo.backData.result){
					// 	this.statisticsInfo = res.data.statisticsInfo.statisticsData.result; //金融借贷行为
					// 	this.backInfo = res.data.backInfo.backData.result; //风险多头回溯
					// }else if(res.data.statisticsInfo.statisticsData.result&&!res.data.backInfo.backData.result){
					// 	this.statisticsInfo = ""
					// 	this.backInfo = ""
					// 	this.statisticsInfo = res.data.statisticsInfo.statisticsData.result; //金融借贷行为
					// 	this.backInfo = res.data.backInfo.backData.result; //风险多头回溯
					// }
					
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.mainWrap {
	width: calc(98% - 300px);
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
		}
		.timeItem {
			width: 400px;
			.el-range-editor.el-input__inner {
				width: 14vw;
			}
		}
	}

	.formList {
		.ice {
			background-color: #409eff;
			color: #fff;
		}
		.el-table {
			overflow-y: scroll !important;
			max-height: 64vh;
		}
		.pagesWrap {
			margin-top: 20px;
		}
		.el-table--border::after,
		.el-table--group::after,
		.el-table::before {
			background-color: #fff;
			opacity: 0;
		}
	}
}

.maskWrap {
	width: 100%;
	height: 100vh;
	background: #000;
	opacity: 0.3;
	position: fixed;
	top: 0px;
	z-index: 99999999;
}
.maskInfo {
	width: 80%;
	min-height: 80vh;
	background-color: #fff !important;
	z-index: 999999999;
	position: relative;
	border-radius: 10px;
	top: 0vh;
	left: 10%;
	.positionStyle {
		position: absolute;
		width: calc(100% - 20px);
		padding: 10px;
		overflow-y: scroll;
		h5 {
			padding: 20px;
			border-bottom: 1px solid #cacaca;
			margin-bottom: 20px;
		}
		.title {
			margin-top: 20px;
			margin-bottom: 20px;
			span {
				font-size: 16px;
				margin-right: 20px;
				background: #3e72f2;
				display: inline-block;
				border-radius: 20px;
				padding: 5px 10px 10px 10px;
				color: #fff;
				cursor: pointer;
				position: relative;
			}
			.sanjiao {
				width: 0;
				height: 0;
				border-width: 10px;
				border-style: solid;
				border-color: transparent transparent #fff transparent;
				position: absolute;
				bottom: 0;
				left: calc(50% - 5px);
			}
		}

		.titleChild {
			width: 100%;
			span {
				font-size: 13px;
				margin-right: 5px;
				display: inline-block;
				border-radius: 20px;
				color: #3e72f2;
				text-decoration: underline;
				cursor: pointer;
			}
			span:hover {
				color: #3e72f2;
			}
			.activ {
				color: #fff;
				background-color: #3e72f2;
				text-decoration: none;
				padding: 5px 10px;
			}
			.activ:hover {
				color: #fff;
			}
		}
		.dataList {
			margin-top: 50px;
			font-size: 16px;
			width: 100%;
			overflow-y: scroll;
			height: 42vh;
			.dataItem {
				width: 30%;
				float: left;
				padding-bottom: 10px;
				margin-right: 5%;
			}
			.dataItem:nth-child(3n) {
				float: right;
				margin-right: 0%;
			}
		}
	}
}
</style>
