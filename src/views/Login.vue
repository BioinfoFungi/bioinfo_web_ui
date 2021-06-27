<template>
  <div class="container-wrapper">
    <a-card title="生物信息在线分析系统">
      <a-form :form="form">
        <a-form-item label="用户名">
          <a-input v-model="user.username" placeholder="Please input your name"></a-input>
        </a-form-item>
        <a-form-item label="用户密码">
          <a-input
            v-model="user.password"
            placeholder="Please input your password"
            type="password"
            autocomplete
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import UserApi from "@/api/User.js";
import GlobalApi from "@/api/Global.js";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  },
  methods: {
    submit() {
      UserApi.login(this.user).then(response => {
        // console.log(response.data.data.token)
        this.$message.success("登录成功!!" + response.data.message);
        localStorage.setItem("jwtToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        GlobalApi.globalConfig().then(resp=>{
          localStorage.setItem("global_config", JSON.stringify(resp.data.data));
           this.$router.replace("/");
        })
       
      });
    }
  }
};
</script>

<style >
.container-wrapper {
  width: 30rem;
  margin: 5rem auto;
}
</style>