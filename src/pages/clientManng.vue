<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>上下游廠商管理</el-breadcrumb-item>
          <el-breadcrumb-item> 客戶管理 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>客戶名稱:</p>
            <el-input v-model="phone" placeholder="请输入供貨商名稱"></el-input>
          </div>
          <div class="nameItem" style="margin-left: 20%">
            <p>速訂ID:</p>
            <el-input v-model="phone" placeholder="请输入速訂ID"></el-input>
          </div>
          <div class="nameItem">
            <el-button type="primary" round @click="getUserList(0)">搜索</el-button>
            <el-button round class="btnItem">新增客戶</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="kinds" label="店家名稱" width="250"></el-table-column>
            <el-table-column prop="count" label="供應商" width="200"></el-table-column>
            <el-table-column prop="name" label="速訂ID" width="100"></el-table-column>
            <el-table-column prop="permission" label="狀態" width="100"></el-table-column>
            <el-table-column prop="status" label="統編" width="100"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="250">
              <template>
                <!-- slot-scope="scope" -->
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >檢視</el-button
                >
                <el-button @click="dialogFormVisible2 = true" type="text" size="small"
                  >報價單</el-button
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
      <el-dialog title="客戶資訊維護" :visible.sync="dialogFormVisible">
        <div class="leftRightWrap">
          <div class="leftDialog">
            <el-form :model="form">
              <el-form-item label="店家名稱" :label-width="formLabelWidth">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="商家種類" :label-width="formLabelWidth">
                <em>供應商</em>
              </el-form-item>
              <el-form-item label="公司統編" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="單位負責人" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="聯絡電話" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="電子郵件" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否開立發票" :label-width="formLabelWidth">
                <el-switch
                  style="display: block"
                  v-model="value2"
                  active-color="#13ce66"
                  inactive-color="#F5F7FA"
                  active-text="是"
                  inactive-text="否"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="發票開立方式" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="電子發票寄送Email" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="結帳方式" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否開放預購" :label-width="formLabelWidth">
                <el-switch
                  style="display: block"
                  v-model="value2"
                  active-color="#13ce66"
                  inactive-color="#F5F7FA"
                  active-text="是"
                  inactive-text="否"
                >
                </el-switch>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightDialog">
            <el-form :model="form">
              <el-form-item label="速訂ID" :label-width="formLabelWidth">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="商家屬性" :label-width="formLabelWidth">
                <em>虛擬店家</em>
              </el-form-item>
              <el-form-item label="工商登記名稱" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="聯絡人" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="聯絡人手機" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="營業地址" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="計稅方式" :label-width="formLabelWidth">
                <el-input
                  v-model="form.region"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="發票開立統編" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="發票寄送地址" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="隔日訂單截止收單時間" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="dialogFormVisible = false">儲 存</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 報訂單彈窗: -->
    <div class="setWrap">
      <el-dialog title="供貨商品群組" :visible.sync="dialogFormVisible2">
        <el-table
          ref="multipleTable"
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="goodsInfo" label="商品資訊/自訂代碼" width="200"> </el-table-column>
          <el-table-column prop="name" label="供應別名" width="350"> </el-table-column>
          <el-table-column prop="fundationPrice" label="基本價格"  width="200" show-overflow-tooltip>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </el-table-column>
          <el-table-column prop="price" label="報價"  width="100" show-overflow-tooltip></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer optionsList">
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
  .leftRightWrap {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    width: 100%;
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
  /deep/.el-form-item__content {
    line-height: 18px;
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
  /deep/.el-form-item__label {
    width: 100px;
    line-height: 18px !important;
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
