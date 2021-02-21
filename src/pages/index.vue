<template>
  <div>
    <menuList></menuList>
    <div class="mainWrap">
      <div class="title">資訊總覽</div>
      <el-divider></el-divider>
      <div class="cardList">
        <div class="cradItem">
          <div class="left">
            <i class="el-icon-s-shop"></i>
          </div>
          <div class="right">
            <p>所有店家數</p>
            <p>50</p>
          </div>
        </div>
        <div class="cradItem">
          <div class="left">
            <i class="el-icon-s-order"></i>
          </div>
          <div class="right">
            <p>所有訂單數</p>
            <p>50</p>
          </div>
        </div>
        <div class="cradItem">
          <div class="left">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="right">
            <p>所有用戶數</p>
            <p>50</p>
          </div>
        </div>
      </div>
      <div class="LoginWayList">
        <div class="cradItem cradItemActiv">
          <div class="left">
            <img src="../assets/images/android.png" alt="" />
          </div>
          <div class="right">Line</div>
        </div>
        <div class="cradItem">
          <div class="left">
            <img src="../assets/images/Email.png" alt="" class="greyEmail" />
          </div>
          <div class="right">EMail</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetIndexData } from "@/request/api"; // 导入我们的api接口
export default {
  name: "App",
  data() {
    return {
      resListData: "",
      host: this.$hostName, //服务器地址
    };
  },
  created() {},
  mounted() {
    this.getIndexData();
  },
  methods: {
    //請求首頁數據：
    getIndexData() {
      axios.post(
          this.$hostName + "/SpeedOrderService/api_app/login",
          {
            code: this.countNum,
            pwd: this.passWord,
            type: 0,
            device: 3,
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
          }
        });
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.title {
  margin: 0 8px;
  font-size: 24px;
  font-weight: lighter;
  color: #9f4344 !important;
}
.cardList {
  width: 55%;
  display: flex;
  justify-content: space-between;
  .cradItem {
    border: 1px dashed rgb(172, 168, 168);
    padding: 20px 20px;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    .left {
      margin-top: 5px;
      text-align: center;
      i {
        font-size: 40px;
        color: #e97435;
      }
    }
    .right {
      // width: 200px;
      text-align: center;
      margin-left: 10px;
      p:nth-child(2) {
        color: #e97435;
        font-size: 24px;
        margin-top: 5px;
      }
      p:nth-child(1) {
        color: #000;
        font-size: 16px;
      }
    }
  }
}
.LoginWayList {
  margin-top: 30px;
  font-size: 16px;
  .cradItem {
    background-color: #ececec;
    padding: 20px 20px;
    border-radius: 15px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    float: left;
    margin-right: 20px;
    .left {
      img {
        width: 30px;
      }
      .greyEmail {
        width: 28px;
        padding-top: 5px;
      }
    }
    .right {
      text-align: center;
      margin-left: 10px;
      margin-top: 8px;
    }
  }
  .cradItemActiv {
    background-color: #9abc32;
  }
}
</style>
