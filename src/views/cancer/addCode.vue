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

    <a-form-model-item ref="taskType" label="taskType" prop="taskType">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        v-model="form.taskType"
      >
        <a-select-option
          :value="item.key"
          v-for="item in taskTypeList"
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

    <a-form-model-item ref="Cancer" label="Cancer" prop="cancer">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        @focus="cancerFocus"
        v-model="form.cancer"
        @search="cancerSearch"
      >
        <a-select-option
          :value="item.enName"
          v-for="item in cancerList"
          :key="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item ref="Study" label="Study" prop="study">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        @focus="studyFocus"
        v-model="form.study"
        @search="studySearch"
      >
        <a-select-option
          :value="item.enName"
          v-for="item in studyList"
          :key="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item ref="DataOrigin" label="DataOrigin" prop="dataOrigin">
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        @focus="dataOriginFocus"
        v-model="form.dataOrigin"
        @search="dataOriginSearch"
      >
        <a-select-option
          :value="item.enName"
          v-for="item in dataOriginList"
          :key="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item
      ref="DataCategory"
      label="DataCategory"
      prop="dataCategory"
    >
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        @focus="dataCategoryFocus"
        v-model="form.dataCategory"
        @search="dataCategorySearch"
      >
        <a-select-option
          :value="item.enName"
          v-for="item in dataCategoryList"
          :key="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item
      ref="AnalysisSoftware"
      label="AnalysisSoftware"
      prop="analysisSoftware"
    >
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        @focus="analysisSoftwareFocus"
        v-model="form.analysisSoftware"
        @search="analysisSoftwareSearch"
      >
        <a-select-option
          :value="item.enName"
          v-for="item in analysisSoftwareList"
          :key="item.id"
        >
          {{ item.name }}
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
    <a-form-model-item label="haveParentId">
      <a-switch v-model="form.haveParentId" />
    </a-form-model-item>

    <a-form-model-item label="haveExpr">
      <a-switch v-model="form.haveExpr" />
    </a-form-model-item>

    <a-form-model-item label="haveMetadata">
      <a-switch v-model="form.haveMetadata" />
    </a-form-model-item>

    <!-- <a-form-model-item
      ref="absolutePath"
      label="absolutePath"
      prop="absolutePath"
    >
      <a-input v-model="form.absolutePath" />
    </a-form-model-item> -->

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">添加Code</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import CancerApi from "@/api/cancer.js";
import FileApi from "@/api/file.js";
import StudyAPi from "@/api/Study.js";
import DataOriginApi from "@/api/DataOrigin.js";
import DataCategoryApi from "@/api/data_category.js";
import AnalysisSoftwareApi from "@/api/analysis_software.js";
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
      cancerList: [],
      studyList: [],
      dataOriginList: [],
      dataCategoryList: [],
      analysisSoftwareList: [],
      codeTypeList: [],
      taskTypeList: [],
      files: [],
      form: {
        cancer: undefined,
        study: undefined,
        dataOrigin: undefined,
        dataCategory: undefined,
        analysisSoftware: undefined,
        absolutePath: undefined,
        name: undefined,
        codeType: undefined,
        taskType: undefined,
        haveParentId:false,
        haveExpr:false,
        haveMetadata:false,
      },
      rules: {
        name: [
          { required: true, message: "请输入Term名称", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    ENUMApi.codeType().then((resp) => {
      this.codeTypeList = resp.data.data;
    });
    ENUMApi.taskType().then((resp) => {
      this.taskTypeList = resp.data.data;
      // console.log(this.taskTypeList )
    });
    // UserAPi.listAll().then((resp) => {
    //   // console.log(resp)
    //   this.users = resp.data.data;
    // });
    // this.loadCancer();
  },
  methods: {
    loadCancer(param) {
      CancerApi.page(param).then((resp) => {
        let data = resp.data.data.content;
        this.cancerList = data;
      });
    },
    loadStudy(param) {
      StudyAPi.page(param).then((resp) => {
        let data = resp.data.data.content;
        this.studyList = data;
      });
    },
    loadDataOrigin(param) {
      DataOriginApi.page(param).then((resp) => {
        let data = resp.data.data.content;
        this.dataOriginList = data;
      });
    },
    loadDataCategory(param) {
      DataCategoryApi.page(param).then((resp) => {
        let data = resp.data.data.content;
        this.dataCategoryList = data;
      });
    },
    loadAnalysisSoftware(param) {
      AnalysisSoftwareApi.page(param).then((resp) => {
        let data = resp.data.data.content;
        this.analysisSoftwareList = data;
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          CodeAPi.add(this.form).then((resp) => {
            this.$notification["success"]({
              message: "添加建成功!" + resp.data.message,
            });
            this.$router.push("/cancer/codeList");
          });
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