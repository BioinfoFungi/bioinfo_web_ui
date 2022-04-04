<template>
  <div>
    <a-drawer
      title="CRUD"
      placement="right"
      :closable="false"
      :visible="visible"
      width="50%"
      @close="onClose"
    >
      <a-form-model ref="refForm" :model="form" :rules="rules">
        <slot v-bind:form="form"></slot>
        <a-form-model-item>
          <a-button v-if="isUpdate" type="primary" @click="onSubmit"
            >更新</a-button
          >
          <a-button v-if="!isUpdate" type="primary" @click="onSubmit"
            >添加</a-button
          >
          <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
import CancerStudyAPi from "@/api/CancerStudy.js";

export default {
  props: {
    isUpdate: {
      type: Boolean,
      required: true,
    },
    CRUD: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      updateId: undefined,
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入Name名称", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    onClose() {
      this.visible = false;
      this.$emit("onClose");
    },
    findbyId(id) {
      CancerStudyAPi.findById(this.CRUD, { id: id }).then((resp) => {
        // console.log(resp);
        this.form = resp.data.data;
      });
    },
    onShow(id) {
      if (id != -1) {
        this.findbyId(id)
      }
      // console.log(this.isUpdate);
      // if (this.isUpdate) {
      //
      // } else {
      //   this.updateId = undefined;
      // }
      this.updateId = id;
      this.visible = true;
    },
    onSubmit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          if (!this.isUpdate) {
            CancerStudyAPi.add(this.CRUD, this.form).then((resp) => {
              this.$notification["success"]({
                message: "添加建成功!" + resp.data.message,
              });
              this.$emit("loadData");
              this.visible = false;
            });
          } else {
            CancerStudyAPi.update(this.CRUD, this.updateId, this.form).then(
              (resp) => {
                this.$notification["success"]({
                  message: "更新成功!" + resp.data.message,
                });
                this.$emit("loadData");
                this.visible = false;
              }
            );
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.refForm.resetFields();
    },
  },
};
</script>

<style>
</style>