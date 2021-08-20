<template>
  <div class="container-wrapper">
    <a-card title="生物信息在线分析系统">
      <a-form :form="form">
        <a-form-item label="用户名">
          <a-input
            v-model="user.username"
            placeholder="Please input your name"
          ></a-input>
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

      <a-button type="primary" @click="showModal">
        配置网络
      </a-button>
      <a-modal
        title="网络配置"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
         <a-input
            v-model="host.url"
            placeholder="Please input url"
          ></a-input>
              <a-input
            v-model="host.port"
            placeholder="Please input port"
          ></a-input>
      </a-modal>
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
        password: "",
      },
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      visible: false,
      confirmLoading: false,
      host:{
        url:"http://localhost",
        port:8080
      }
      
    };
  },mounted(){
    let local_url_port = localStorage.getItem("url_port");
    local_url_port = JSON.parse(local_url_port)
    this.host.url=local_url_port.url
    this.host.port=local_url_port.port

  },
  methods: {
    submit() {
      UserApi.login(this.user).then((response) => {
        // console.log(response.data.data.token)
        this.$message.success("登录成功!!" + response.data.message);
        localStorage.setItem("jwtToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        GlobalApi.globalConfig().then((resp) => {
          localStorage.setItem("global_config", JSON.stringify(resp.data.data));
          this.$router.replace("/");
        });
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      // this.ModalText = "The modal will be closed after two seconds";
      // this.confirmLoading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
      // console.log(this.url+this.port)
      localStorage.setItem("url_port",JSON.stringify(this.host));
      this.visible = false;
    },
    handleCancel() {
      // console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>

<style >
.container-wrapper {
  width: 30rem;
  margin: 5rem auto;
}
</style>