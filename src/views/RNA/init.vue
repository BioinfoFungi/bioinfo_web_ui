<template>
  <div>
    <a-button @click="init_mRNA">init_mRNA</a-button>
    <a-button @click="init_lncRNA">init_lncRNA</a-button>
    <a-button @click="init_miRNA">init_miRNA</a-button>
    <a-button @click="init_circRNA">init_circRNA</a-button>
  </div>
</template>
<script>
import MRNAAPi from "@/api/mRNA.js";
import MIRNAAPi from "@/api/miRNA.js";
import LNCRNAAPi from "@/api/lncRNA.js";
import circRNAAPi from "@/api/circRNA.js";

export default {
  data() {
    return {};
  },
  methods: {
    init_mRNA() {
      let notification = this.$notification["success"];
      this.$confirm({
        title: "初始化",
        content: "您确定要初始化吗",
        onOk() {
          MRNAAPi.init("init_mRNA").then(resp => {
            notification({
              message: resp.data.message
            });
          });
        },
        onCancel() {}
      });
    },
    init_lncRNA() {
      let notification = this.$notification["success"];
      this.$confirm({
        title: "初始化",
        content: "您确定要初始化吗",
        onOk() {
          LNCRNAAPi.init("init_lncRNA").then(resp => {
            notification({
              message: resp.data.message
            });
          });
        },
        onCancel() {}
      });
    },
    init_miRNA() {
      let notification = this.$notification["success"];
      this.$confirm({
        title: "初始化",
        content: "您确定要初始化吗",
        onOk() {
          MIRNAAPi.init("init_miRNA").then(resp => {
            notification({
              message: resp.data.message
            });
          });
        },
        onCancel() {}
      });
    },
    init_circRNA() {
      let notification = this.$notification["success"];
      this.$confirm({
        title: "初始化",
        content: "您确定要初始化吗",
        onOk() {
          circRNAAPi.init("init_circRNA").then(resp => {
            notification({
              message: resp.data.message
            });
          });
        },
        onCancel() {}
      });
    }
  }
};
</script>