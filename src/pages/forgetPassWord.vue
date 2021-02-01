<template>
  <div class="forgetWrap">
    <div class="login">
      <img src="../assets/images/logo.png" alt="" class="logo" />
      <div class="title">重設使用者密碼</div>
      <div class="inputItem">
        <img src="../assets/images/Email.png" alt="" class="inputImg" />
        <el-input v-model="countNum" placeholder="請輸入EMail帳號"></el-input>
      </div>
      <el-button type="primary" round @click="loginClick()">重設密碼</el-button>
     
      <div class="canDoWhat"><i>注:</i> 我們可以使用你的用戶名稱或連結到你帳號的電子郵件地址，協助你重設密碼。</div>
    </div>
  </div>
</template>

<script>
import { apiLogin, apiGetVerifyCode, apiGetUserList } from "@/request/api"; // 导入我们的api接口
export default {
  name: "App",
  data() {
    return {
      countNum: "", //账号
      passWord: "", //密码
      verifyCode: "", //验证码
      verifyCodeImg: "", //验证码图片
      host: this.$hostName, //服务器地址
    };
  },
  created() {
    this.verifyCodeImg = `https://query.cdmeixiaoya.com${apiGetVerifyCode}`;
  },
  mounted() {
    if (localStorage.getItem("userName")) {
      this.countNum = localStorage.getItem("userName");
      this.passWord = localStorage.getItem("passWord");
    }
  },
  methods: {
    //刷新验证码：
    refresh() {
      var d = new Date();
      var n = d.getTime();
      this.verifyCodeImg = `https://query.cdmeixiaoya.com${apiGetVerifyCode}?${n}`;
    },

    loginClick() {
      apiLogin({
        userName: this.countNum,
        password: this.passWord,
        verifyCode: this.verifyCode,
      }).then((res) => {
        // 获取数据成功后的其他操作
        if (res.code == 200) {
          localStorage.setItem("userName", this.countNum);
          localStorage.setItem("passWord", this.passWord);
          this.$router.push("/");
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scope>
.forgetWrap {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  padding: 30px;
  .login {
    width: 635px;
    height: 410px;
    background: rgba(0, 0, 0, 0.68);
    box-shadow: 0px 8px 35px 0px rgba(56, 70, 100, 0.1);
    border-radius: 20px;
    position: relative;
    left: 30%;
    top: 45%;
    transform: translateY(-50%);
    text-align: center;
    .logo {
      width: 120px;
      height: 30px;
      padding-top: 20px;
    }
    .title {
      padding: 15px 0;
      color: #f4f4f4;
      letter-spacing: 1.2pt;
      font-size: 20px;
      margin: 5px 0px 25px 0px;
      font-weight: bold;
    }
    .inputItem {
      width: 60%;
      height: 50px;
      margin-bottom: 10px;
      margin: 0 auto;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      border-radius: 35px;
      background-color: #e97435;
      border-color: #e97435;
      .inputImg {
        width: 32px;
        height: 30px;
        padding: 10px;
      }
      .el-input {
        font-size: 16px;
        width: calc(100% - 35px);
        color: #999;
        border-color: #e97435;
        .el-input__inner {
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          border-radius: 0px 35px 35px 0px;
          .el-input__inner {
            padding-left: 65px;
          }
        }
        .el-input__prefix {
          left: 40px;
          font-size: 24px;
        }
      }
    }

    button {
    font-size: 20px;
    font-weight: 400;
    width: 60%;
    height: 50px;
      background: #ec8148;
      border-radius: 35px;
      border-color: #ec8148;
    }
    button:hover {
      background: #e97435;
    }
    
    .el-divider--horizontal {
      width: 60%;
      margin-left: 20%;
    }
    .el-divider__text.is-left {
      left: 30%;
    }
    .el-divider__text {
      background: rgba(0, 0, 0, 0.68);
    }
    
    .canDoWhat{
      color: #f4f4f4;
      font-size: 14px;
      margin-top: 50px;
      i{
        font-style: normal;
        color: #e97435;
      }
    }
  }
}
</style>
