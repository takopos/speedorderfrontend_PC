<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>連鎖交易管理</el-breadcrumb-item>
          <el-breadcrumb-item> 連鎖採購管理 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>採購單狀態:</p>
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
          <div class="nameItem" style="margin-left: 6%">
            <el-button type="primary" round @click="getUserList(0)">查詢</el-button>
            <el-button type="primary" round @click="dialogShoppingVisible=true">採購</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="kinds" label="採購日期" width="150"></el-table-column>
            <el-table-column prop="name" label="採購單編號" width="100"></el-table-column>
            <el-table-column prop="count" label="物流單號" width="100"></el-table-column>
            <el-table-column
              prop="permission"
              label="供應商名稱"
              width="100"
            ></el-table-column>
            <el-table-column prop="status" label="金額" width="100"></el-table-column>
            <el-table-column prop="status" label="狀態" width="100"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="300">
              <template slot-scope="">
                <el-button type="text" size="small" @click="dialogGradeVisible = true"
                  >評分</el-button
                >
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >複製採購單</el-button
                >
                <el-button type="text" size="small" @click="dialogOrderVisible=true"
                  >採購單明細</el-button
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
      <el-dialog title="購買評分" :visible.sync="dialogGradeVisible">
        <div class="notesWrap">
          <div class="left">評分:</div>
          <div class="right rightStar">
            <el-rate v-model="valueStar"></el-rate>
          </div>
        </div>
        <div class="notesWrap">
          <div class="left">留言:</div>
          <div class="right">
            <el-input v-model="input" placeholder="請输入内容"></el-input>
          </div>
        </div>
        <div class="footerBtn">
          <el-button type="" slot="reference" @click="dialogGradeVisible=false">取 消</el-button>
          <el-button type="primary" slot="reference" @click="sendOut()" style="margin-right:20px;">送 出</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 订单明细： -->
    <div class="setWrap2">
      <el-dialog title="訂單明細" :visible.sync="dialogOrderVisible">
        <div class="leftRightWrap">
          <div class="leftDialog">
            <el-form :model="form">
              <el-form-item label="供應商:" :label-width="formLabelWidth">
                <em>塔科總部</em>
              </el-form-item>
              <el-form-item label="電話：" :label-width="formLabelWidth">
                <em>110</em>
              </el-form-item>
              <el-form-item label="訂單編號:" :label-width="formLabelWidth">
                <em>002</em>
              </el-form-item>
              <el-form-item label="物流編號:" :label-width="formLabelWidth">
                 <em>0988998765</em>
              </el-form-item>
              <el-form-item label="下單日期" :label-width="formLabelWidth">
                 <em>2020.03.21</em>
              </el-form-item>
              <el-form-item label="下單姓名:" :label-width="formLabelWidth">
                 <em>admin</em>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightDialog">
            <el-form :model="form">
              <el-form-item label="地址:" :label-width="formLabelWidth">
                <em>台北</em>
              </el-form-item>
              <el-form-item label="負責人:" :label-width="formLabelWidth">
                <em>robin</em>
              </el-form-item>
              <el-form-item label="訂單狀態:" :label-width="formLabelWidth">
                <em>未處理</em>
              </el-form-item>
              <el-form-item label="派車/物流選擇:" :label-width="formLabelWidth">
                <em>塔科</em>
              </el-form-item>
              <el-form-item label="客戶期望送達時間:" :label-width="formLabelWidth">
                <em>2020.03.02</em>
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
            <el-table-column prop="" label="結帳數量" width="100">
              <el-input v-model="orderInfoData[0].checkOutNumber" placeholder="請输入内容"></el-input>個
            </el-table-column>
            <el-table-column prop="" label="小計" width="100">
               <el-input v-model="orderInfoData[0].subtotal" placeholder="請输入内容" :disabled="true"></el-input>
            </el-table-column>
            <el-table-column prop="" label="商品留言" width="100">
               <el-input v-model="orderInfoData[0].proNotes" placeholder="請输入内容"></el-input>
            </el-table-column>
          </el-table>
          <div class="lineWrap">小計：6,400</div>
          <div class="lineWrap">稅額：320</div>
          <div class="lineWrap">訂單總計：6,720</div>
        </div>
        <div class="footerContainer footerContainer2">
          <div class="notesWrap">
              <div class="left">購買留言：</div>
              <div class="right">
                留言内容
              </div>
          </div>  
          <div class="notesWrap">
              <div class="left">店家留言：:</div>
              <div class="right">
                留言内容
              </div>
          </div> 
        </div>
      </el-dialog>
    </div>

    <!-- 採購: -->
    <div class="setWrap3">
      <el-dialog title="採購" :visible.sync="dialogShoppingVisible">
        <div class="inforWrap">
        <div class="nameList">
            <div class="nameItem nameItemSelect">
            <p>供應商:</p>
            <el-select v-model="valueSupplier" placeholder="請選擇">
              <el-option
                v-for="item in optionsSupplier"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem nameItemSelect">
            <p>商品類別:</p>
            <el-select v-model="valueProduct" placeholder="請選擇">
              <el-option
                v-for="item in optionsProduct"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem">
            <p>商品關鍵詞:</p>
            <el-input v-model="phone" placeholder="请输入商品關鍵詞："></el-input>
          </div>
          <div class="nameItem">
            <p>常購商品</p>
             <el-checkbox v-model="checked"></el-checkbox>
          </div>
          <div class="nameItem">
            <el-button type="primary" round icon="el-icon-shopping-cart-2">加入購物車</el-button>
            <el-button type="primary" round >查詢</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="kinds" label="商家名稱" width="210"></el-table-column>
            <el-table-column prop="name" label="商品" width="210"></el-table-column>
            <el-table-column prop="count" label="單價" width="250"></el-table-column>
            <el-table-column prop="permission" label="數量" width="250">
                <el-input v-model="number" placeholder="0" style="width:100px;"></el-input>盒
            </el-table-column>
          </el-table>
        </div>
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
      name1: "",
      phone: "",
      value1: true,
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
      dialogOrderVisible: false,
      dialogGradeVisible: false,
      dialogShoppingVisible:false,
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
       optionsSupplier:[
        {
          value: "选项1",
          label: "全部廠商",
        },
        {
          value: "选项1",
          label: "塔科供應商",
        },
        {
          value: "选项1",
          label: "塔科供應商2",
        },
      ],
      valueSupplier:'',
       optionsProduct:[
        {
          value: "选项1",
          label: "全部商品",
        }
        ],
        valueProduct:'',
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
  /deep/.el-dialog__body {
    overflow: hidden;
  }
  /deep/.el-dialog {
    width: 70% !important;
  }
  .el-input {
    width: 50%;
  }
  .titleBg {
    background-color: #555;
    height: 30px;
    line-height: 30px;
    color: #fff;
    padding-left: 15px;
    margin-bottom: 20px;
  }
  .lineWrap {
    // background-color: rgb(243, 240, 240);
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: right;
    border-top: 1px solid rgb(209, 204, 204);
    padding-right: 20px;
  }
  .footerBtn {
    width: 100%;
    height: 100px;
    button {
      float: right;
      margin-top: 20px;
    }
  }
  .notesWrap {
    margin-top: 30px;
    overflow: hidden;
    padding-left: 20px;
    .left {
      float: left;
    }
    .right {
      float: left;
      margin-left: 20px;
      .el-input {
        width: 300%;
      }
    }
    .rightStar {
      margin-left: 20px;
    }
  }
}
.setWrap2 {
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
    top:500px;
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
    top: 733px;
    .notesWrap{
      margin-top: 30px;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
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
.setWrap3{
     /deep/.el-dialog {
    width: 65%;
  }
  /deep/.el-dialog__body {
    overflow: hidden !important;
    display: flex;
    justify-content: space-between;
  }
  /deep/.el-select {
    width: 55%;
  }
  .inforWrap {
      width: 100%;
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
