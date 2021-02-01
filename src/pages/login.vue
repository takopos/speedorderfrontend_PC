<template>
  <div class="loginWrap">
    <div class="login">
      <img src="../assets/images/logo.png" alt="" class="logo" />
      <div class="title">速訂使用者帳號登錄</div>
      <div class="inputItem">
        <img src="../assets/images/bar_one_id.png" alt="" class="inputImg" />
        <el-input v-model="countNum" placeholder="請輸入EMail帳號"></el-input>
      </div>
      <div class="inputItem">
        <img src="../assets/images/bar_two_password.png" alt="" class="inputImg" />
        <el-input v-model="passWord" placeholder="請輸入密碼" show-password></el-input>
      </div>
      <el-button type="primary" round @click="loginClick()">登錄</el-button>
      <div class="forget">
        <router-link to="forgetPassWord">
          <p>忘記密碼</p>
        </router-link>
        <router-link to="register">
          <p>沒有帳號嗎?註冊</p>
        </router-link>
      </div>
      <div class="lineWrap">
        <p class="leftLine"></p>
        <p class="otherLoginWay">其他登錄方式</p>
        <p class="rightLine"></p>
      </div>
      <div class="lineLoginWay">
        <el-button type="primary" round>LINE</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { apiLogin } from "@/request/api"; // api接口
export default {
  name: "App",
  data() {
    return {
      countNum: "", //账号
      passWord: "", //密码
      host: this.$host, //服务器地址
    };
  },
  mounted() {
    if (localStorage.getItem("userName")) {
      this.countNum = localStorage.getItem("userName");
      this.passWord = localStorage.getItem("passWord");
    }
  },
  methods: {
    loginClick() {
        this.$router.push('/')
        return
      this.$api
        .apiLogin({
          code: this.countNum,
          pwd: this.passWord,
          type: 0,
          device: 3,
        })
        .then((res) => {
          // console.log("登录", res);
          // localStorage.setItem('userName', this.countNum)
					// localStorage.setItem('passWord', this.passWord)
					// this.$router.push('/')
        });
    },
  },
};
</script>

<style lang="less" scope>
.loginWrap {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  padding: 30px;
  .login {
    width: 635px;
    height: 530px;
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
      background-color: #fff;
      border-color: #e97435;
      .inputImg {
        width: 50px;
        height: 50px;
        border-radius: 35px 0px 0px 35px;
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
    .forget {
      width: 60%;
      text-align: center;
      color: #f4f4f4;
      letter-spacing: 1.2pt;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin: 25px auto;
      p {
        margin-top: 10px;
        cursor: pointer;
      }
      p:hover {
        color: #e97435;
      }
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
    .lineWrap {
      width: 60%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        width: 30%;
        height: 1px;
      }
      .leftLine {
        background-color: #fff;
      }
      .otherLoginWay {
        width: 40%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
      .rightLine {
        background-color: #fff;
      }
    }
    .lineLoginWay {
      margin-top: 25px;
      button {
        letter-spacing: 5px;
        padding: 0px;
        font-size: 14px;
        font-weight: 400;
        width: 60%;
        height: 30px;
        line-height: 30px;
        background: #1bda1b;
        border-radius: 15px;
        border-color: #1bda1b;
      }
      button:hover {
        background: #1fb91f;
      }
    }
  }
}
</style>
