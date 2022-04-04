<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="name" prop="name">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item
      ref="prerequisites"
      label="prerequisites"
      prop="prerequisites"
    >
      <a-input v-model="form.prerequisites" />
    </a-form-model-item>

    <a-form-model-item ref="crudType" label="crudType" prop="crudType">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        v-model="form.crudType"
      >
      
        <a-select-option
          :value="item.key"
          v-for="item in crudType"
          :key="item.key"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item ref="codeType" label="codeType" prop="codeType">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        v-model="form.codeType"
      >
        <a-select-option
          :value="item.key"
          v-for="item in codeTypeList"
          :key="item.key"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item
      ref="absolutePath"
      label="absolutePath"
      prop="absolutePath"
    >
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        @focus="absolutePath"
        v-model="form.absolutePath"
      >
        <a-select-option
          :value="item.absolutePath"
          v-for="item in files"
          :key="item.fileName"
        >
          {{ item.fileName }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">添加Code</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import FileApi from "@/api/file.js";

import ENUMApi from "@/api/ENUM.js";
import CodeAPi from "@/api/code.js";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      projectStatuses: [],
      value: null,
      users: [],
      codeTypeList: [],
      crudType: [],
      files: [],
      form: {
        absolutePath: undefined,
        name: undefined,
        codeType: undefined,
        crudType: undefined,
        prerequisites: undefined,
      },
      codeId: undefined,
      rules: {
        name: [
          { required: true, message: "请输入Term名称", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.codeId = this.$route.query.codeId;
    if (this.codeId) {
      CodeAPi.findById(this.codeId).then((resp) => {
        let data = resp.data.data;
        // console.log(data);
        this.form = data;
      });
    }
    // console.log(this.codeId);
    ENUMApi.codeType().then((resp) => {
      this.codeTypeList = resp.data.data;
    });
    ENUMApi.crudType().then((resp) => {
      this.crudType = resp.data.data;
      // console.log(this.taskTypeList )
    });
    // UserAPi.listAll().then((resp) => {
    //   // console.log(resp)
    //   this.users = resp.data.data;
    // });
    // this.loadCancer();
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.codeId) {
            CodeAPi.update(this.codeId, this.form).then((resp) => {
              this.$notification["success"]({
                message: "更新成功!" + resp.data.message,
              });
              // let cancerStudy = resp.data.data
              this.$router.push("/cancer/codeList");
            });
          } else {
            CodeAPi.add(this.form).then((resp) => {
              this.$notification["success"]({
                message: "添加成功!" + resp.data.message,
              });
              this.$router.push("/cancer/codeList");
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    cancerFocus() {
      this.loadCancer();
    },
    cancerSearch(input) {
      this.loadCancer({ keyword: input });
    },

    studyFocus() {
      this.loadStudy();
    },
    studySearch(input) {
      this.loadStudy({ keyword: input });
    },

    dataOriginFocus() {
      this.loadDataOrigin();
    },
    dataOriginSearch(input) {
      this.loadDataOrigin({ keyword: input });
    },

    dataCategoryFocus() {
      this.loadDataCategory();
    },
    dataCategorySearch(input) {
      this.loadDataCategory({ keyword: input });
    },

    analysisSoftwareFocus() {
      this.loadAnalysisSoftware();
    },
    analysisSoftwareSearch(input) {
      this.loadAnalysisSoftware({ keyword: input });
    },
    absolutePath() {
      // console.log("sddd");
      FileApi.list("TCGADOWNLOAD/R").then((resp) => {
        // console.log(resp)
        this.files = resp.data.data;
      });
    },
  },
};
</script>