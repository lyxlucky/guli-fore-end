<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="email"
          :rules="[
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="邮箱" v-model="user.email" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://localhost:8160/api/ucenter/wx/getWxCode"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import cookie from "js-cookie";
import loginApi from "../api/login";
export default {
  layout: "sign",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loginInfo: {},
    };
  },
  methods: {
    submitLogin() {
      loginApi.login(this.user).then((response) => {
        if (response.data.success) {
          //把token存在cookie中、也可以放在localStorage中
          cookie.set("guli_token", response.data.data.token, { domain: "localhost" });
          //登录成功根据token获取用户信息
          loginApi.getInfo().then((res) => {
            this.loginInfo = res.data.data.userInfo;
            //将用户信息记录cookie
            cookie.set("guli_ucenter", JSON.stringify(this.loginInfo), {
              domain: "localhost",
            });
            //跳转页面
            window.location.href = "/";
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      if (
        !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(
          value
        )
      ) {
        return callback(new Error("邮箱格式不正确"));
      }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
