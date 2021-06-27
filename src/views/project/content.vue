<template>
  <div>
    <a-textarea placeholder="Basic usage" :rows="20" v-model="data.originalContent" />
    <a-button @click="submit">提交</a-button>
  </div>
</template>
<script>
import ProjectAPi from "@/api/Project.js";

export default {
  data() {
    return {
      data: {}
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    // Get post id from query
    const projectId = to.query.projectId;

    next(vm => {
      if (projectId) {
        vm.projectId = projectId;
        ProjectAPi.findById(projectId).then(response => {
          const project = response.data.data;
        //   console.log(project);
          vm.data = project;
        });
      }
    });
  },
  methods: {
    submit() {
      ProjectAPi.updateContent(this.data.id,{content:this.data.originalContent}).then(resp => {
        this.$notification["success"]({
          message: "项目内容更新!" + resp.data.message
        });
        this.$router.push("/project/detial?projectId="+this.data.id);
      });
    }
  }
};
</script>