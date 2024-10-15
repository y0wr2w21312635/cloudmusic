<template>
  <div class="login-container">
    <img :src="logo" alt="网易云音乐" class="logo" />
    <van-form>
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="手机号"
          placeholder="输入手机号"
          left-icon="phone"
          clearable
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          left-icon="lock"
          type="password"
          name="密码"
          placeholder="输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          native-type="submit"
          color="#ef2000"
          @click="Login"
        >
          立即登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getLoginUser } from "@/request/api/home.js";
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      phone: "",
      password: "",
      logo,
    };
  },
  methods: {
    Login: async function () {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        //如果返回的code等于200，说明登录成功，就跳转个人中心页面
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        console.log(result);
        this.$store.commit("updateUser", result);
        this.$router.push("/infoUser");
      } else {
        alert("手机号码或者密码错误");
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  background-image: url("../assets/background.png");
  background-size: cover;
  background-position: center;
}

.logo {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  width: 100px;
}

.van-form {
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  border-radius: 35px;
  width: 90%;
  max-width: 400px;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.9);
}

.van-field__left-icon {
  color: #ef2000;
}

.van-button {
  background-color: #ef2000;
  border: none;
  font-weight: 700;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc2000;
  }
}
</style>
