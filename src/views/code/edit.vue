<template>
  <div class="home">
  
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