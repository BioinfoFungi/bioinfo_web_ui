<template>
  <div class="home">
    <div v-if="user">
      {{ user ? user.username : null }}
      <button @click="logout">退出</button>
    </div>
    <div v-if="!user">
    <button @click="login">登录</button>
     </div>
    <h3>使用方法</h3>
    <ol>
      <li></li>
    </ol>
    <h3>功能</h3>
    <ol>
      <li>展示jupyter生成的生信报告</li>
      <li>图片上传到本地和oss</li>
      <li>基本的权限管理</li>
    </ol>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      user: null,
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
  methods: {
    logout() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      localStorage.removeItem("global_config");
      this.$router.replace("/Home");
      this.user=null;
      // location.reload();
    },login(){
      this.$router.push("/login");
    }
  },
};
</script>
<style>
.home{
  margin: 20px;
}
</style>