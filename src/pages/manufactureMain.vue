<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item> 生產管理 </el-breadcrumb-item>
          <el-breadcrumb-item> 生產管理 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>店家名稱:</p>
            <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="item in optionsOrderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem">
            <p>商品類別:</p>
            <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="item in optionsOrderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem nameItemSelect">
            <p>查詢時間:</p>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="nameItem" style="margin-left: 6%">
            <el-button type="primary" round>出貨</el-button>
            <el-button type="primary" round>報表查詢</el-button>
          </div>
        </div>
        <div class="formList">
          <div class="searchWrap">
            <el-input v-model="input" placeholder="搜索"></el-input>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="kinds"
              label="類別(類別總訂購數)"
              width="200"
            ></el-table-column>
            <el-table-column prop="name" label="品項編號" width="200"></el-table-column>
            <el-table-column prop="count" label="品項" width="200"></el-table-column>
            <el-table-column
              prop="permission"
              label="總訂數"
              width="200"
            ></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >分店統計</el-button
                >
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
    <div class="setWrap">
      <el-dialog title="數量調整" :visible.sync="dialogFormVisible">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="kinds" label="訂單編號" width="200"></el-table-column>
          <el-table-column prop="name" label="分店名稱" width="200"></el-table-column>
          <el-table-column prop="count" label="品項" width="200"></el-table-column>
          <el-table-column prop="permission" label="訂購數量" width="200"></el-table-column>
          <el-table-column prop="permission" label="出貨數量" width="200">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer optionsList">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { apiGetUserList,apiSetUserStatus } from '@/request/api'; // 导入我们的api接口
export default {
  name: "myNav",
  data() {
    const cityOptions = [
      "未處理",
      "處理中",
      "已取消",
      "已備貨",
      "配送中",
      "已送達",
      "已簽收",
      "異常退貨處理中",
      "結帳請款中",
      "發票已開立",
      "收款完成",
      "歸檔",
    ];
    return {
      checkAll: false,
      checkedCities: ["未處理", "處理中"],
      cities: cityOptions,
      isIndeterminate: true,
      radio: "1",
      name1: "",
      phone: "",
      value1: true,
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
      dialogOrderVisible: false,
      statusChanges: true,
      value2: "",
      visible: false,
      optionsOrderStatus: [
        {
          value: "选项1",
          label: "全部訂單",
        },
        {
          value: "选项2",
          label: "處理中",
        },
        {
          value: "选项3",
          label: "未處理",
        },
      ],
      optionsChildShop: [
        {
          value: "选项1",
          label: "全部廠商",
        },
        {
          value: "选项2",
          label: "塔科早餐(台北店)",
        },
        {
          value: "选项3",
          label: "無敵風火輪",
        },
      ],
      tableData: [
        {
          kinds: "email",
          name: "張揚",
          count: "23",
          permission: "管理員",
          status: "審核通過",
        },
      ],
      tableData2: [
        {
          productName: "辣条",
          price: "20",
          number: "30",
          count: "30/入",
          tax: "免稅",
          subtotal: "200",
          notes: "爆漿起司餐包",
        },
        {
          productName: "辣条",
          price: "20",
          number: "30",
          count: "30/入",
          tax: "免稅",
          subtotal: "200",
          notes: "爆漿起司餐包",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      total: "",
      offSetReq: "",
      value: "",
      orderInfoData: [
        {
          proCode: "001",
          proName: "大飒飒",
          unitPrice: "100",
          orderCount: "20",
          shipmentNumber: "1",
          checkOutNumber: "2",
          subtotal: "0",
          proNotes: "0",
          sureCheckOut: "0",
        },
      ],
    };
  },
  mounted() {
    // this.getUserList(0)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    sendOut() {
      this.$confirm("訂單確定送出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    countOver() {
      this.$confirm("訂單[ 20310014174]確定要結帳?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    changeStatus() {
      console.log(111);
      this.statusChanges = !this.statusChanges;
      console.log("statusChanges", this.statusChanges);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.offSetReq = (val - 1) * 10;
      this.getUserList(this.offSetReq);
    },
    //选择日期
    onPick(e) {
      // console.log(this.value1)
    },
    //重置：
    reset() {
      this.phone = "";
      this.value1 = "";
      // this.getUserList(0)
    },
    //数据列表：
    getIndexData() {
      axios
        .post(
          this.$hostName + "/SpeedOrderService/api_app/queryVendorAccountList",
          {
            offset: offset,
            limit: 10,
            tel: this.phone,
            startTime: this.value1[0],
            endTime: this.value1[1],
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          if (res.data.res == 1) {
            this.$router.push("/pages/index");
          } else {
            this.$message.error("登入錯誤,請檢查賬戶或密碼!");
            // this.$message({
            //   message: res.message,
            //   type: "warning",
            // });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped="scoped">
em {
  font-style: normal;
}
.inforWrap {
  .nameList {
    border: 1px solid #cfcfcf;
    border-left: 0px;
    border-right: 0px;
    width: 100%;
    margin-top: 20px;
    padding: 10px 0px;
    overflow: hidden;
    .nameItem {
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      float: left;
      margin-right: 50px;
      p {
        float: left;
        font-size: 16px;
        padding-right: 10px;
      }
      .el-input {
        float: left;
        width: 100px !important;
      }
    }

    .nameItemSelect {
      /deep/.el-input {
        float: left;
        width: 100px !important;
      }
    }
  }

  .formList {
    margin-top: 40px;
    .btnWrap {
      float: left;
      margin: 20px 0px;
    }
    .searchWrap {
      width: 30%;
      float: right;
      border: 1px solid #000;
      border-radius: 20px;
      margin: 20px 0px;
      /deep/.el-input__inner {
        border-radius: 20px;
      }
    }
    .ice {
      background-color: #409eff;
      color: #fff;
    }
    .noIce {
      background-color: #67c23a;
      color: #fff;
    }
    .el-table {
      overflow-y: scroll !important;
      max-height: 54vh;
    }
    .el-table::before {
      opacity: 0;
    }
  }

  .pagesWrap {
    margin-top: 20px;
  }
}
.setWrap {
  .el-input {
    width: 50%;
  }
  /deep/.el-dialog{
      width: 75%;
  }
}
</style>
