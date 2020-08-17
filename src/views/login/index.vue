<template>
  <div class="login-container">
    <div class="ornamet">
      <h1 class="login-title">电商管理平台</h1>
      <el-image :src="imgSrc"></el-image>
    </div>
    <div class="login-form-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">用户登录</h3>
        </div>
        <div class="from-container">
          <el-form-item prop="username" class="username-container">
            <span >
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password" class="password-container">
            <span>
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-button class="button-container" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("亲~您的用户名错误，请输入正确的用户名哦~"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("亲~密码不能少于六位数哦~"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      imgSrc: require("@/assets/login/login_4.png"),
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$router.push({path: 'goods'})
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #294250;
      height: 47px;
      caret-color: #889aa4;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark: #294250;
$dark_gray: #889aa4;
$container_bg:rgba(175, 175, 175,0);

* {
  box-sizing: border-box;
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: RGB(233, 233, 233);
  display: grid;
  grid-template-columns: 52% 44%;
  grid-column-gap: 2%;
  grid-template-areas: "a b";

  .ornamet {
    grid-area: a;
    display: grid;
    grid-template-rows: 33% 50% 15%;
    grid-row-gap: 1%;
    grid-template-areas:
      "a"
      "b"
      "c";

    .login-title {
      font-size: 350%;
      grid-area: a;
      place-self: center;
    }

    .el-image {
      width: 85%;
      grid-area: b;
      place-self: end start;
    }
  }

  .login-form-container {
    grid-area: b;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    grid-template-areas:
      "a"
      "b"
      "c";
    .el-form {
      border: 10px solid $dark;
      padding: 10px;
      height: 80%;
      width: 75%;
      background-color: rgba(175, 175, 175, 0.3);
      box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
        7px 7px 20px 0px #0005, 4px 4px 5px 0px #0003;
      grid-area: b;
      place-self: center start;
      display: grid;
      grid-template-columns: 8% 80% 8%;
      grid-template-rows: 20% 72% 8%;
      grid-column-gap: 2%;
      grid-template-areas:
        "a b c"
        "d e f"
        "g h i";

      .title-container {
        grid-area: b;
        place-self: center;

        .title {
          color: #1f323c;
          font-family: Kaiti;
          font-size: 200%;
          text-shadow: 0 1px $dark_gray;
        }
      }
      .from-container {
        grid-area: e;
        place-self: stretch;
        display: grid;
        grid-template-rows: repeat(3, 32%);
        grid-row-gap: 2%;
        grid-template-areas:
          "a"
          "b"
          "c";

        .username-container {
          background-color: $container_bg;
          border-bottom: 1px solid $dark;
          border-radius: 0;
          grid-area: a;
          place-self: center stretch;
        }
        .password-container {
          background-color: $container_bg;
          border-bottom: 1px solid $dark;
          border-radius: 0;
          grid-area: b;
          place-self: center stretch;
        }

        .button-container {
          position: relative;
          background-color: $dark;
          height: 50%;
          width: 95%;
          font-size: 110%;
          border: none;
          grid-area: c;
          place-self: end center;
        }
        .button-container:after {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 100%;
          content: "";
          background-color: rgba(250, 250, 250, 0.1);
          border-radius: 5px;
          box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0005, 4px 4px 5px 0px #0003;
          transition: all 0.3s ease;
          place-self: end center;
        }
        .button-container:hover {
          color: #fff;
        }
        .button-container:hover:after {
          width: 100%;
        }
      }
    }
  }
}
</style>
