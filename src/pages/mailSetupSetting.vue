<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系統設定</el-breadcrumb-item>
          <el-breadcrumb-item>郵件設定</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="titleWrap">
      <span>郵件設定</span>
      <el-divider></el-divider>
    </div>
    <div class="setWrap">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="郵件Host">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="郵件Port">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="郵件帳號 ">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="郵件密碼">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="郵件協定">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="dialogFormVisible = false">修 改</el-button>
        </el-form-item>
      </el-form>
      
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
      tableData: [
        {
          kinds: "email",
          name: "張揚",
          count: "12523252222",
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
.titleWrap {
  margin-left: 19.5%;
  margin-top: 80px;
  font-size: 18px;
  font-weight: 500;
  padding-left: 10px;
}
.setWrap {
  width: 70%;
  margin-left: 19%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  /deep/.el-input__inner{
      width: 180% !important;
  }
}
</style>
