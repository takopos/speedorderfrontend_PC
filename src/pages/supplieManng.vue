<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>上下游廠商管理</el-breadcrumb-item>
          <el-breadcrumb-item> 供應商管理 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="inforWrap">
        <div class="nameList">
          <div class="nameItem">
            <p>供貨商名稱:</p>
            <el-input v-model="phone" placeholder="请输入供貨商名稱"></el-input>
          </div>
          <div class="nameItem" style="margin-left: 20%">
            <p>速訂ID:</p>
            <el-input v-model="phone" placeholder="请输入速訂ID"></el-input>
          </div>
          <div class="nameItem">
            <el-button type="primary" round @click="getUserList(0)">搜索</el-button>
            <el-button round class="btnItem">新增供應商</el-button>
          </div>
        </div>
        <div class="formList">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="kinds" label="店家名稱" width="250"></el-table-column>
            <el-table-column prop="count" label="供應商" width="200"></el-table-column>
            <el-table-column prop="name" label="速訂ID" width="100"></el-table-column>
            <el-table-column
              prop="permission"
              label="狀態"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="統編"
              width="200"
            ></el-table-column>
            <el-table-column prop="options" fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >檢視</el-button>
                  <el-button @click="dialogFormVisible = true" type="text" size="small"
                  >刪除</el-button>
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
      <el-dialog title="廠商基本資料" :visible.sync="dialogFormVisible">
        <div class="left">
          <el-form :model="form">
            <el-form-item label="店家名稱" :label-width="formLabelWidth">
              <em>人人麵包</em>
            </el-form-item>
            <el-form-item label="商家種類" :label-width="formLabelWidth">
              <em>2</em>
            </el-form-item>
            <el-form-item label="公司統編" :label-width="formLabelWidth">
              <em>1511423659</em>
            </el-form-item>
            <el-form-item label="單位負責人" :label-width="formLabelWidth">
              <em>吳先生</em>
            </el-form-item>
            <el-form-item label="聯絡電話" :label-width="formLabelWidth">
              <em>0933783215</em>
            </el-form-item>
            <el-form-item label="電子郵件" :label-width="formLabelWidth">
              <em>a0933783215@gmail.com</em>
            </el-form-item>
            <el-form-item label="訂貨須知 " :label-width="formLabelWidth">
              <em>餐包專賣店</em>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form :model="form">
            <el-form-item label="速訂ID" :label-width="formLabelWidth">
              <em>103103154</em>
            </el-form-item>
           <el-form-item label="商家屬性" :label-width="formLabelWidth">
              <em>正式店家</em>
            </el-form-item>
            <el-form-item label="工商登記名稱" :label-width="formLabelWidth">
              <em>人人麵包專業烘焙有限公司</em>
            </el-form-item>
           <el-form-item label="聯絡人 " :label-width="formLabelWidth">
              <em>張先生</em>
            </el-form-item>
            <el-form-item label="聯絡人手機號 " :label-width="formLabelWidth">
              <em>0933783215</em>
            </el-form-item>
           <el-form-item label="營業地址 " :label-width="formLabelWidth">
              <em>桃園市中壢區月眉路三段213號</em>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer optionsList">
          <el-button @click="dialogFormVisible = false">確 定</el-button>
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
      currentPage: 1,
      dataList: "",
      dialogFormVisible: false,
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
  /deep/.el-dialog__body {
    overflow: hidden;
  }
  /deep/.el-dialog {
    width: 60% !important;
  }
  .el-input {
    width: 50%;
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
/deep/.el-form-item__label{
    font-weight: 600 !important;
}
</style>
