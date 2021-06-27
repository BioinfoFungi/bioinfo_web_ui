<template>
  <a-layout style="padding: 24px 0; background: #fff">
    <a-layout-sider width="200" style="background: #fff" v-if="childrenRoutes!=''">
      <a-menu
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        style="height: 100%"
      >
        <a-sub-menu v-for="(item) in childrenRoutes" :key="item.name">
          <span slot="title">
            <a-icon :type="item.meta.icon" />
            <span>{{item.meta.title}}</span>
          </span>
          <template v-for="(itemSub) in item.children">

            <a-menu-item :key="itemSub.name" v-if="itemSub.meta.display==true">
              <router-link :to="itemSub.path">{{itemSub.meta.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- <a-sub-menu key="sub1">
                <span slot="title">
                  <a-icon type="user" />subnav 1
                </span>
                <a-menu-item key="1">
                  <router-link to="/TCGA/count">Count</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                  <router-link to="/TCGA/Test">Test</router-link>
                </a-menu-item>
                <a-menu-item key="3">option3</a-menu-item>
                <a-menu-item key="4">option4</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub2">
                <span slot="title">
                  <a-icon type="laptop" />subnav 2
                </span>
                <a-menu-item key="5">option5</a-menu-item>
                <a-menu-item key="6">option6</a-menu-item>
                <a-menu-item key="7">option7</a-menu-item>
                <a-menu-item key="8">option8</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub3">
                <span slot="title">
                  <a-icon type="notification" />subnav 3
                </span>
                <a-menu-item key="9">option9</a-menu-item>
                <a-menu-item key="10">option10</a-menu-item>
                <a-menu-item key="11">option11</a-menu-item>
                <a-menu-item key="12">option12</a-menu-item>
        </a-sub-menu>-->
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
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
  }
};
</script>