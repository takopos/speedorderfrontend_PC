<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>採購管理</el-breadcrumb-item>
          <el-breadcrumb-item>一般採購記錄</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="inforWrap">
        <div class="nameList">
            <div class="nameItem nameItemSelect">
            <p>採購單狀態：</p>
            <el-select v-model="valueSupplier" placeholder="全部訂單">
              <el-option
                v-for="item in optionsSupplier"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
    
    
         
          <div class="nameItem">
          
            <el-button type="primary" round >查詢</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="purchaseDate" label="採購日期" width="130"></el-table-column>
            <el-table-column prop="purchaseOrdersNumber" label="採購單編號" width="100"></el-table-column>
            <el-table-column prop="trackingNumber" label="物流單號" width="150"></el-table-column>
            <el-table-column prop="supplierName" label="供應商名稱" width="150"></el-table-column>
            <el-table-column prop="money" label="金額" width="150">
                <el-input v-model="number" placeholder="0" style="width:100px;"></el-input>元
            </el-table-column>
            <el-table-column prop="count" label="狀態" width="150"></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >設定</el-button
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
      <el-dialog title="新增使用者" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="類型" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.region" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="權限設定" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择權限">
              <el-option label="管理員" value="shanghai"></el-option>
              <el-option label="預設" value="beijing"></el-option>
              <el-option label="一般" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="狀態" :label-width="formLabelWidth">
            <el-switch v-model="statusChanges" active-text="開通" inactive-text="停權">
            </el-switch>
          </el-form-item>
        </el-form>
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
    return {
      phone: "",
      number:'',
      checked:true,
      value1: true,
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
      statusChanges: true,
      tableData: [
        {
          purchaseDate: "1991-01-02",
          purchaseOrdersNumber: "張揚",
          trackingNumber: "12523252222",
          supplierName: "timi供应商",
          money: "300",
          count:"正常",
        }
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
      optionsProduct:[
        {
          value: "选项1",
          label: "未處理",
        }
        ],
        valueProduct:'',
      optionsSupplier:[
        {
          value: "选项2",
          label: "處理中",
        },
        {
          value: "选项1",
          label: "已取消",
        },
        {
          value: "选项1",
          label: "已備貨",
        },
      ],
      valueSupplier:'',
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
}
</style>
