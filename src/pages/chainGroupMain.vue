<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>連鎖交易管理</el-breadcrumb-item>
          <el-breadcrumb-item>群組編輯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>群組名稱:</p>
            <el-input v-model="phone" placeholder="群組名稱" width="150"></el-input>
          </div>
          <div class="nameItem">
            <el-button round @click="reset()">新增群組</el-button>
            <el-button type="primary" round @click="getUserList(0)">搜索</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="VendorName"
              label="群組名稱"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="StoreType"
              label="群組代碼"
              width="150"
            ></el-table-column>
            <el-table-column prop="status" label="說明" width="200"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="300">
              <template slot-scope="">
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >編輯</el-button
                >
                <el-button type="text" size="small">刪除</el-button>
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
    <div class="setWrap" style="float: right">
      <el-row type="flex" justify="space-between">
        <el-dialog title="群組編輯" :visible.sync="dialogFormVisible">
          <div class="maskTopWrap">
            <div class="nameList">
              <div class="nameItem">
                <p>群組名稱:</p>
                <el-input v-model="phone" placeholder="群組名稱" width="150"></el-input>
              </div>
              <div class="nameItem">
                <p>群組代碼:</p>
                <el-input v-model="phone" placeholder="群組代碼" width="150"></el-input>
              </div>
              <div class="nameItem">
                <el-button round @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" round @click="getUserList(0)">儲存</el-button>
              </div>
            </div>
          </div>
          <div class="groupSetWrap">
            <div class="groupSetTitle">
              <div class="groupBtn1">群組設定</div>
              <div class="groupBtn3" @click="(shopGroupShow = true), (offerShow = false)">
                商品供貨群組設定
              </div>
              <div class="groupBtn2" @click="(offerShow = true), (shopGroupShow = false)">
                商家群組設定
              </div>
            </div>
            <!-- 商品供貨群組設定: -->
            <div class="formWrap" v-if="offerShow">
              <div class="left">
                <div class="titleRight">供貨商群組</div>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 90%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column
                    prop="VendorName"
                    label="店家名稱"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    prop="StoreType"
                    label="統編"
                    width="180"
                  ></el-table-column>
                </el-table>
              </div>
              <div class="right">
                <div class="titleRight">連鎖分店群組</div>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 90%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column
                    prop="VendorName"
                    label="店家名稱"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    prop="StoreType"
                    label="統編"
                    width="180"
                  ></el-table-column>
                </el-table>
              </div>
            </div>

            <!-- 商家群組設定: -->
            <div class="formWrap" v-if="shopGroupShow">
              <div class="titleRight" style="width: 99%">供貨商品群組</div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                  prop="VendorName"
                  label="商品類別"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="StoreType"
                  label="商品名稱"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="StoreType"
                  label="商品代碼"
                  width="100"
                ></el-table-column>
                <el-table-column prop="StoreType" label="分店價格" width="200">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.groupName"
                      placeholder="群組名稱"
                      width="150"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="StoreType" label="進貨價" width="200">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.groupName"
                      placeholder="進貨價"
                      width="100"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="StoreType" label="供應商設定" width="150">
                  <template slot-scope="scope">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in scope.row.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="StoreType" label="總部出貨倉" width="100">
                  <template slot-scope="scope">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in scope.row.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="StoreType" label="是否委託代收款" width="100">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" round @click="getUserList(0)" class="maskSave">儲存</el-button>
            </div>
          </div>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { apiGetUserList,apiSetUserStatus } from '@/request/api'; // 导入我们的api接口
export default {
  name: "myNav",
  data() {
    return {
      offerShow: true, //显示商品供貨群組設定表格
      shopGroupShow: false, //显示商品供貨群組設定表格
      phone: "",
      value1: true,
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
      statusChanges: true,
      tableData: [
        {
          VendorName: "塔科早餐(台北店)",
          StoreType: "店家",
          status: "審核通過",
          number: "5555555",
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  mounted() {
    // this.getUserList(0)
  },
  methods: {
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
        width: 200px !important;
      }
    }
    .nameItemSelect {
      /deep/.el-input {
        float: left;
        width: 120px !important;
      }
    }
  }

  .formList {
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
    position: absolute;
    bottom: 5vh;
  }
}

.setWrap {
  .el-input {
    width: 50%;
  }
  .maskTopWrap {
    .nameList {
      border-left: 0px;
      border-right: 0px;
      width: 100%;
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
          width: 200px !important;
        }
      }
      .nameItemSelect {
        /deep/.el-input {
          float: left;
          width: 120px !important;
        }
      }
    }
  }
}
.setWrap {
  /deep/.el-dialog__body {
    overflow: hidden;
  }
  /deep/.el-dialog {
    width: 70% !important;
  }
  .el-input {
    width: 50%;
  }
  .groupSetWrap {
    .groupSetTitle {
      font-size: 14px;
      color: #fff;
      background-color: #555;
      height: 50px;
      line-height: 50px;
      margin-top: 30px;
      .groupBtn1 {
        float: left;
        margin-left: 10px;
      }
      .groupBtn2 {
        float: right;
        margin-right: 10px;
        color: #67c23a;
        font-weight: 600;
        cursor: pointer;
      }
      .groupBtn2:hover {
        color: #fff;
      }
      .groupBtn3:hover {
        color: #fff;
      }
      .groupBtn3 {
        float: right;
        margin-right: 10px;
        color: #67c23a;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .formWrap {
      .titleRight {
        font-size: 14px;
        color: #fff;
        background-color: #555;
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        width: 89%;
        padding-left: 10px;
      }
      .left {
        width: 50%;
        float: left;
      }
      .right {
        width: 50%;
        float: right;
      }
    }
  }
  .maskSave{
      float: right;
      margin-top: 30px;
  }
}
</style>
