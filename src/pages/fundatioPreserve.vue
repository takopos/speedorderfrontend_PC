<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="stepWrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>企業帳號管理</el-breadcrumb-item>
          <el-breadcrumb-item>基本資料維護</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="titleWrap">
      <span>基本資料維護</span>
      <el-divider></el-divider>
    </div>
    <div class="setWrap">
      <div class="fromLeftWrap">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="店家名稱">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商家種類 ">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司統編">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="單位負責人 ">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="聯絡電話">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="電子郵件">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="總部名稱">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="是否顯示訂單價格">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="店家密碼">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商家擁有者ID (預設建立人)">
            <el-input v-model="form.name"></el-input>
            <el-button type="primary" size="small">變更</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="fromRightWrap">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="速訂ID">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="註冊時間">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工商登記名稱">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="聯絡人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="聯絡人手機">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="營業地址">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="連鎖品牌">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
           <el-form-item class="hostData" label="是否設定客戶預期出貨日為必填">
             <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item class="hostData" label="是否直接轉採購單">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="營業內容描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">儲存</el-button>
          </el-form-item>
        </el-form>
      </div>
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
    //数据列表：
    getIndexData() {
      axios.post(
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
  width: 75%;
  margin-left: 19%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .fromLeftWrap {
    width: 45%;
  }
  .fromRightWrap {
    width: 45%;
  }
}
.hostData{
    /deep/.el-form-item__label{
        width: 123px !important;
    }
}
</style>
