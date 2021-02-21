<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item> 基礎商品維護 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>商品名稱:</p>
            <el-input v-model="phone" placeholder="请输入商品名稱"></el-input>
          </div>
          <div class="nameItem">
            <p>商品類別:</p>
            <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="nameItem">
            <el-button type="primary" round @click="getUserList(0)">搜索</el-button>
            <el-button round class="btnItem">新增</el-button>
            <el-button type="" round > 批次匯入商品Excel 檔</el-button>
            <el-button type="" round >報表下載</el-button>
            <el-button type="" round >報表列印</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="kinds" label="類別" width="200"></el-table-column>
            <el-table-column prop="count" label="商品名稱" width="200"></el-table-column>
            <el-table-column prop="name" label="自訂代碼" width="200"></el-table-column>
            <el-table-column prop="kinds" label="上架" width="200"></el-table-column>
            <el-table-column prop="count" label="單價" width="200"></el-table-column>
            <el-table-column prop="name" label="稅率計算" width="200"></el-table-column>
            <el-table-column prop="name" label="說明" width="200"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="250">
              <template>
                <!-- slot-scope="scope" -->
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >編輯</el-button
                >
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >刪除</el-button
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
    <!-- 檢視彈窗: -->
     <div class="setWrap">
      <el-dialog title="商家審核" :visible.sync="dialogFormVisible">
        <div class="leftRightWrap">
          <div class="leftDialog">
            <el-form :model="form">
              <el-form-item label="店家名稱" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司統編" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="單位負責人" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="聯絡電話" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="電子郵件" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightDialog">
            <el-form :model="form">
              <el-form-item label="速訂ID" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="工商登記名稱" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="聯絡人" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="聯絡人手機" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="營業地址" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="footerContainer">
          <el-form :model="form">
            <el-form-item label="營業內容描述" :label-width="formLabelWidth">
              <el-input v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer optionsList">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">儲 存</el-button>
        </div>
      </el-dialog>
    </div> <div class="setWrap">
      <el-dialog title="商品編輯" :visible.sync="dialogFormVisible">
        <div class="leftRightWrap">
          <div class="leftDialog">
            <el-form :model="form">
              <el-form-item label="商品名稱" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="自訂商品代碼" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="結帳單位 " :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="稅率計算" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择稅率計算">
                  <el-option label="應稅" value="shanghai"></el-option>
                  <el-option label="免稅" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="購買數量上限" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="上下架" :label-width="formLabelWidth">
                <el-switch v-model="form.delivery" active-text="下架" inactive-text="上架"></el-switch>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightDialog">
            <el-form :model="form">
              <el-form-item label="商品種類" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择商品種類">
                  <el-option label="肉類" value="shanghai"></el-option>
                  <el-option label="茶葉" value="beijing"></el-option>
                  <el-option label="雜貨" value="shanghai"></el-option>
                  <el-option label="麵包" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="單價" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="受訂單位:" :label-width="formLabelWidth">
                <el-checkbox v-model="checked">若結帳單位與受訂單位不同時勾選填寫。Ex:魚用斤結帳，但受訂時是以條訂貨</el-checkbox>
                <el-input v-model="form.region" autocomplete="off" v-if="checked==true"></el-input>
              </el-form-item>
              <el-form-item label="購買數量下限" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="footerContainer">
          <el-form :model="form">
            <el-form-item label="說明" :label-width="formLabelWidth">
              <el-input v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer optionsList">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">儲 存</el-button>
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
      phone: "",
      value1: true,
      value2: true,
      dataList: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      statusChanges: true,
      checked:false,
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
      tableData: [
        {
          kinds: "email",
          name: "張揚",
          count: "23",
          permission: "管理員",
          status: "審核通過",
        },
      ],
        tableData2: [{
          goodsInfo: 'A001',
          name: '雞腿綜合特優100g/包限期優惠12日',
          fundationPrice: '100',
          price:'120'
        }],
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
  /deep/.el-form-item__label{
      width: 100px;
      text-align: left;
  }
}
.setWrap {
  .leftRightWrap {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  /deep/.el-dialog {
    width: 85%;
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
    bottom: 50px;
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
