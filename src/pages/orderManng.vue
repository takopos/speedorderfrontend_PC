<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
          <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>店家名稱:</p>
             <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="item in optionsShopName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem nameItemSelect">
            <p>訂單狀態:</p>
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
                <p>派車/物流選擇:</p>
                <el-select v-model="value" placeholder="請選擇">
                <el-option
                    v-for="item in optionsLogistics"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
                </el-select>
           </div>
          <div class="nameItem">
            <p>訂單類型:</p>
            <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="item in optionsOrderKinds"
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
              v-model="valueDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="nameItem">
            <el-button type="primary" round @click="getUserList(0)">搜索</el-button>
            <el-button round @click="reset()">重置</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="shopName"
              label="訂單日期"
              width="150"
            ></el-table-column>
            <el-table-column prop="Id" label="速訂ID" width="150"></el-table-column>
            <el-table-column prop="status" label="狀態" width="200"></el-table-column>
            <el-table-column
              prop="shopKinds"
              label="訂單類型"
              width="200"
            ></el-table-column>
            <el-table-column prop="count" label="訂單編號" width="150"></el-table-column>
            <el-table-column prop="phone" label="物流單號" width="150"></el-table-column>
            <el-table-column prop="phone" label="買方名稱" width="150"></el-table-column>
            <el-table-column prop="phone" label="金額" width="150"></el-table-column>
            <el-table-column prop="phone" label="狀態" width="150"></el-table-column>
            <el-table-column prop="phone" label="發票號碼" width="150"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >訂單明細</el-button
                >
                <el-button type="text" size="small" @click="open">結帳</el-button>
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
      <el-dialog title="訂單明細" :visible.sync="dialogFormVisible">
        <div class="leftRightWrap">
          <div class="leftDialog">
            <el-form :model="form">
              <el-form-item label="所屬連鎖總部" :label-width="formLabelWidth">
                <em>塔科總部</em>
              </el-form-item>
              <el-form-item label="總部聯絡人" :label-width="formLabelWidth">
                <em>admin</em>
              </el-form-item>
              <el-form-item label="店家名稱：" :label-width="formLabelWidth">
                <em>塔科早餐(台北店)</em>
              </el-form-item>
              <el-form-item label="聯絡電話:" :label-width="formLabelWidth">
                 <em>0988998765</em>
              </el-form-item>
              <el-form-item label="聯絡人" :label-width="formLabelWidth">
                 <em>Robin</em>
              </el-form-item>
              <el-form-item label="訂單編號:" :label-width="formLabelWidth">
                 <em>20310014001</em>
              </el-form-item>
              <el-form-item label="物流單號" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightDialog">
            <el-form :model="form">
              <el-form-item label="總部統編:" :label-width="formLabelWidth">
                <em>20310014001</em>
              </el-form-item>
              <el-form-item label="店家統編:" :label-width="formLabelWidth">
                <em>20310014001</em>
              </el-form-item>
              <el-form-item label="聯絡地址:" :label-width="formLabelWidth">
                <em>台北</em>
              </el-form-item>
              <el-form-item label="負責人:" :label-width="formLabelWidth">
                <em>塔科</em>
              </el-form-item>
              <el-form-item label="訂單狀態:" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="請選擇">
                    <el-option
                        v-for="item in optionsOrderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="派車/物流選擇:" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="請選擇">
                    <el-option
                        v-for="item in optionsLogistics"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="預計出貨時間:" :label-width="formLabelWidth">
                 <el-date-picker
                    v-model="valueDate2"
                    type="date"
                    placeholder="选择日期">
                 </el-date-picker>
              </el-form-item>
               <el-form-item label="時段:" :label-width="formLabelWidth">
                <el-select v-model="valueTime" placeholder="請選擇">
                    <el-option
                        v-for="item in optionsTime"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="dialogAddVisible = true" style="float:right;">新增商品</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footerContainer">
          <el-table :data="orderInfoData" style="width: 100%" border>
            <el-table-column prop="proCode" label="產品代號" width="100"></el-table-column>
            <el-table-column prop="proName" label="產品名稱" width="100"></el-table-column>
            <el-table-column prop="" label="單價" width="100">
              <el-input v-model="orderInfoData[0].unitPrice" placeholder="請输入内容"></el-input>/個
            </el-table-column>
            <el-table-column prop="" label="訂購數量" width="100">
              <el-input v-model="orderInfoData[0].orderCount" placeholder="請输入内容"></el-input>/個
            </el-table-column>
            <el-table-column prop="shipmentNumber" label="出貨數量" width="100">
               <el-input v-model="orderInfoData[0].orderCount" placeholder="請输入内容"></el-input>已出貨數量
            </el-table-column>
            <el-table-column prop="" label="結帳數量" width="100">
              <el-input v-model="orderInfoData[0].checkOutNumber" placeholder="請输入内容"></el-input>個
            </el-table-column>
            <el-table-column prop="" label="小計" width="100">
               <el-input v-model="orderInfoData[0].subtotal" placeholder="請输入内容" :disabled="true"></el-input>
            </el-table-column>
            <el-table-column prop="" label="商品留言" width="100">
               <el-input v-model="orderInfoData[0].proNotes" placeholder="請输入内容"></el-input>
            </el-table-column>
            <el-table-column prop="sureCheckOut" label="確認出貨" width="100">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-table-column>
          </el-table>
          <div class="lineWrap">小計：6,400</div>
          <div class="lineWrap">稅額：320</div>
          <div class="lineWrap">訂單總計：6,720</div>
        </div>
        <div class="footerContainer footerContainer2">
          <div class="notesWrap">
              <div class="left">購買店家留言：</div>
          </div> 
          <div class="notesWrap">
              <div class="left">單備註：</div>
              <div class="right">
                <el-input v-model="input" placeholder="請输入内容"></el-input>
              </div>
          </div> 
           <div class="notesWrap">
              <div class="left">評分:</div>
              <div class="right rightStar">
                <el-rate v-model="valueStar"></el-rate>
              </div>
          </div> 
          <div class="notesWrap">
              <div class="left">評分建議:</div>
              <div class="right">
                <el-input v-model="input" placeholder="請留言..."></el-input>
              </div>
          </div> 
          <div class="notesWrap" style="margin-bottom: 50px;">
              <el-button @click="dialogFormVisible = false">列印出貨單</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">儲 存</el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="訂單明細" :visible.sync="dialogAddVisible">
         <el-form :model="form">
              <el-form-item label="物流單號" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-table :data="orderInfoData" style="width: 100%" border>
                  <el-table-column prop="proCode" label=" 商品" width="100"></el-table-column>
                  <el-table-column prop="proName" label="單價" width="100"></el-table-column>
                  <el-table-column prop="unitPrice" label="數量" width="100"></el-table-column>
                </el-table>
              </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer optionsList">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddVisible = false">儲 存</el-button>
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
    return {
      valueStar:null,
      checked: true,
      dialogAddVisible:false,
      valueDate:'',
      valueDate2:'',
      phone: "",
      value1: true,
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
      statusChanges: true,
      tableData: [
        {
          shopName: "寳淘店",
          Id: "52",
          status: "審核通過",
          shopKinds: "總管理",
          count: "張揚",
          phone: "151233335",
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
      optionsOrderStatus:[
        {
          value: "选项1",
          label: "全部訂單",
        },
         {
          value: "选项2",
          label: "未處理",
        },
         {
          value: "选项3",
          label: "處理中",
        },
         {
          value: "选项4",
          label: "已取消",
        },
         {
          value: "选项5",
          label: "已備貨",
        },
         {
          value: "选项6",
          label: "配送中",
        },
         {
          value: "选项7",
          label: "已送達",
        },
         {
          value: "选项8",
          label: "已簽收",
        },
        {
          value: "选项9",
          label: "異常退貨處理中",
        },
         {
          value: "选项10",
          label: "結帳請款中",
        },
         {
          value: "选项11",
          label: "發票已開立",
        },
         {
          value: "选项12",
          label: "收款完成",
        },
         {
          value: "选项13",
          label: "歸檔",
        }
      ],
      optionsLogistics:[
          {
          value: "选项1",
          label: "全部訂單",
          }
      ],
      optionsTime:[
        {
          value: "选项1",
          label: "不限時段",
        },
        {
          value: "选项2",
          label: "早上",
        },
        {
          value: "选项3",
          label: "下午",
        },
        {
          value: "选项4",
          label: "晚上",
        },
      ],
      valueTime:'',
      optionsShopName:[
        {
          value: "选项1",
          label: "全部廠商",
        },
        {
          value: "选项2",
          label: "測試客戶1",
        },
        {
          value: "选项3",
          label: "富士",
        },
      ],
      optionsOrderKinds:[
        {
          value: "选项1",
          label: "全部訂單",
        },
         {
          value: "选项2",
          label: "一般訂單",
        },
         {
          value: "选项3",
          label: "連鎖品牌訂單",
        },
      ],
      orderInfoData:[
         {
            proCode:"001",
            proName:"大飒飒",
            unitPrice:"100",
            orderCount:"20",
            shipmentNumber:"1",
            checkOutNumber:"2",
            subtotal:"0",
            proNotes:"0",
            sureCheckOut:"0",
          }
      ],
      value: "",
    };
  },
  mounted() {
    // this.getUserList(0)
  },
  methods: {
    open() {
      this.$confirm("訂單[ 20310014001]確定要結帳?", "確認", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
em{
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
  position: relative;
  .leftRightWrap {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    width: 100%;
    // position: absolute;
  }
  /deep/.el-dialog {
    width: 65%;
  }
  /deep/.el-dialog__body {
    overflow: hidden !important;
    display: flex;
    justify-content: space-between;
  }
  /deep/.el-select {
    width: 67%;
  }
  .el-input {
    width: 65%;
  }
  .leftDialog {
    float: left;
    width: 45%;
  }
  .rightDialog {
    float: right;
    width: 45%;
  }
  .footerContainer {
    position: absolute;
    width: 100%;
    top:640px;
    left:0px;
    // bottom: 50px;
    .lineWrap{
      // background-color: rgb(243, 240, 240);
      background-color: #fff;
      height: 40px;
      line-height: 40px;
      text-align: right;
      border-top: 1px solid rgb(209, 204, 204);
      padding-right: 20px;
    }
  }
  .footerContainer2{
    width: 100%;
    background-color: #fff;
    position: absolute;
    top: 900px;
    .notesWrap{
      margin-top: 30px;
      overflow: hidden;
      padding-left: 20px;
      .left{
        float: left;
      } 
      .right{
        float: left;
        margin-left: 20px;
        .el-input{
          width: 300%;
        }
      }
      .rightStar{
        margin-left: 20px;
      }
    }

  }
}
.el-dialog__footer {
  bottom: 0px;
  position: absolute;
  right: 0px;
  padding: 10px 20px 0px;
}
/deep/.el-dialog__body {
  padding: 30px 20px 50px 20px;
}
</style>
