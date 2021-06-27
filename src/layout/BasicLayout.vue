<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <div class="logo">
        <a href="#">
          <router-link to="/">生物信息在线分析</router-link>
        </a>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
        :defaultSelectedKeys="[$route.name]"
      >
        <!-- 
        <a-sub-menu v-for="(item) in routes" :key="item.name">
          <span slot="title">
            <a-icon type="setting" />
            <span>{{item.meta.title}}</span>
          </span>
          <a-menu-item v-for="(itemSub) in item.children" :key="itemSub.name">
            <router-link :to="itemSub.path">{{itemSub.meta.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
        -->
        <a-menu-item v-for="(item) in routes" :key="item.name">
          <router-link :to="item.path">
            <a-icon :type="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </router-link>
        </a-menu-item>
        <!-- <a-menu-item key="2"><router-link to="/TCGA">TCGA</router-link> </a-menu-item>
        <a-menu-item key="3"><router-link to="/About">About</router-link> </a-menu-item>
        <a-menu-item key="4"><router-link to="/User">User</router-link> </a-menu-item>-->
      </a-menu>

      <div class="logo">
        <!-- <a-button @click="openHtml()">静态首页</a-button> -->
很多时候的发放的
      </div>
    </a-layout-header>
   

    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <!-- <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>-->
      </a-breadcrumb>
      <a-layout :style="{ background: '#fff', minHeight: '500px' }">
        <!-- 子路由不为空 -->
        <!-- <ol>
          <li v-for="(item) in childrenRoutes" :key="item.name">
            <span>{{item.meta.title}}</span>
          </li>
        </ol>-->

        <router-view />
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">©2021 WANGYANG Bioinformatics analysis</a-layout-footer>
  </a-layout>
</template>

<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px 28px 16px 0;
  float: left;
}
.logo {
  color: #ffff;
  line-height: 31px;
  font-weight: bold;
}
.logo a {
  color: #ffff;
}
</style>
<script>
export default {
  computed: {
    routes() {
      // console.log(this.$route.meta.parentPath)
      // console.log(this.$router.currentRoute)
      return this.$router.options.routes[1].children;
    },
    childrenRoutes() {
      var parentPath = this.$route.meta.parentPath;
      var childrenPath = this.$router.options.routes[1].children.find(
        i => i.path == parentPath
      );
      var children_routes = [];
      if (childrenPath) {
        children_routes = childrenPath.children;
        // console.log(childrenPath.children);
      }
      return children_routes;
    }
  },
  mounted() {
    // console.log()
    //  var routes = {
    //   children: this.$router.options.routes[1].children
    // };
    // var route = this.$route.matched;
    // // console.log()
    // // console.log(this.$route.matched)
    // for(var i=0; i<route.length-1; i++){
    //   console.log(route[i].name)
    //   // routes.children.find((e) => (console.log(e.name)))
    //   // routes = routes.children.find((e) => (e.name == route[i].name));
    // }
  }
};
</script>