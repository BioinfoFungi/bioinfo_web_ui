<template>
  <a-row :gutter="12">
    <a-col :span="6">
      <a-card :bodyStyle="{ padding: '16px', overflow: 'auto' }">
        <theme-file
          v-if="files"
          :files="files"
          @listenToSelect="handleSelectFile"
        />
      </a-card>
    </a-col>

    <a-col :span="18">
      <a-button @click="runTask">运行</a-button>
      <a-button @click="shutdownTask">结束</a-button>
      <a-button @click="openDrawer">{{
        cancerStudyDisplay ? cancerStudyDisplay : "选择对象"
      }}</a-button>
      <a-button @click="save">保存</a-button>
      <div v-if="task">
        {{ task.threadName }}
        {{ task.taskStatus }}
        {{ task.name }}
      </div>
      <a-form-item v-if="objMap">
        <a-textarea v-model="objMap" :auto-size="{ minRows: 3, maxRows: 20 }" />
      </a-form-item>
      <a-drawer
        title="癌症研究"
        placement="right"
        :closable="false"
        :visible="visible"
        width="50%"
        @close="onClose"
      >
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

        <a-form-model-item
          ref="DataOrigin"
          label="DataOrigin"
          prop="dataOrigin"
        >
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

        <a-table
          :columns="columns"
          :row-key="(record) => record.id"
          :data-source="cancerStudys"
          :pagination="false"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 750 }"
        >
          <div slot="id_link" slot-scope="id, record">
            <a href="javascript:;" @click="addToEdit(record.id)">{{ id }}</a>
          </div>
          <template slot="footer">
            <div class="page-wrapper" :style="{ textAlign: 'right' }">
              <a-pagination
                class="pagination"
                :current="pagination.page"
                :total="pagination.total"
                :defaultPageSize="pagination.size"
                :pageSizeOptions="['5', '10', '20', '50', '100']"
                showSizeChanger
                @showSizeChange="handleTableChange"
                @change="handleTableChange"
              />
            </div>
          </template>
        </a-table>
      </a-drawer>

      <a-card :bodyStyle="{ padding: '16px' }">
        <a-form layout="vertical">
          <a-form-item>
            <codemirror
              v-model="content"
              :options="codemirrorOptions"
            ></codemirror>
          </a-form-item>
          <a-form-item>
            <a-textarea
              v-model="Log"
              placeholder="run log"
              :auto-size="{ minRows: 3, maxRows: 20 }"
            />
          </a-form-item>
          <a-form-item v-if="task">
            <a-textarea
              v-model="task.sourceCode"
              placeholder="run log"
              :auto-size="{ minRows: 3, maxRows: 20 }"
            />
          </a-form-item>
          <!-- <a-form-item>
            <ReactiveButton
              @click="handlerSaveContent"
              @callback="saveErrored = false"
              :loading="saving"
              :errored="saveErrored"
              :disabled="buttonDisabled"
              text="保存"
              loadedText="保存成功"
              erroredText="保存失败"
            ></ReactiveButton>
          </a-form-item> -->
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
import CodeAPi from "@/api/code.js";
import ThemeFile from "./components/ThemeFile";
import { codemirror } from "vue-codemirror-lite";
import CancerStudyAPi from "@/api/CancerStudy.js";
import TaskApi from "@/api/task.js";

import CancerApi from "@/api/cancer.js";
import StudyAPi from "@/api/Study.js";
import DataOriginApi from "@/api/DataOrigin.js";
import DataCategoryApi from "@/api/data_category.js";
import AnalysisSoftwareApi from "@/api/analysis_software.js";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id_link" },
  },
  {
    title: "癌症名称",
    dataIndex: "cancer.name",
    // scopedSlots: { customRender: "cancer" }
  },

  {
    title: "研究名称",
    dataIndex: "study.name",
  },
  {
    title: "数据来源",
    dataIndex: "dataOrigin.name",
  },
  {
    title: "数据分类",
    dataIndex: "dataCategory.name",
  },
  {
    title: "处理流程",
    dataIndex: "analysisSoftware.name",
  },
  {
    title: "基因注释",
    dataIndex: "analysisSoftware.annotationId",
  },
  {
    title: "GSE",
    dataIndex: "gse",
  },
];
export default {
  components: {
    ThemeFile,
    codemirror,
  },
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      files: [],
      file: undefined,
      content: "",
      visible: false,
      cancerStudyId: undefined,
      cancerStudyDisplay: undefined,
      Log: "",
      task: undefined,
      sourceCode: undefined,
      codemirrorOptions: {
        tabSize: 4,
        mode: "text/html",
        lineNumbers: true,
        line: true,
      },
      cancerList: [],
      studyList: [],
      dataOriginList: [],
      dataCategoryList: [],
      analysisSoftwareList: [],
      form: {
        cancer: undefined,
        study: undefined,
        dataOrigin: undefined,
        dataCategory: undefined,
        analysisSoftware: undefined,
      },
      columns,
      loading: false,
      cancerStudys: [],
      pagination: {
        page: 1,
        size: 10,
        sort: null,
        keyword: null,
      },
      queryParam: {
        page: 0,
        size: 10,
        sort: null,
        keyword: null,
        categoryId: null,
        status: null,
      },
      objMap: undefined,
    };
  },
  mounted() {
    this.loadFiles();
    if (this.$websock) {
      this.$websock.onmessage = (e) => {
        let data = JSON.parse(e.data);
        // console.log(data);
        // if (data.msgType == "TEST_CODE") {
        //   this.Log += data.data;
        // }
        if (data.msgType == "NOTIFY") {
          if (this.setIntervaStatus) {
            let setIntervaStatus = this.setIntervaStatus;
            setTimeout(function () {
              clearInterval(setIntervaStatus);
            }, 2000);
          }
          this.$message.info(data.data);
          this.loadTask(this.task.id);
        }
        // if (this.task) {
        //
        // }

        // this.loadData();
        // if (this.CancerStudyDetial) {
        //   this.loadTask(this.CancerStudyDetial.id);
        // }
      };
    }
  },
  methods: {
    loadFiles() {
      CodeAPi.files().then((resp) => {
        this.files = resp.data.data;
        // console.log(this.files);
      });
    },
    handleSelectFile(file) {
      // const _this = this;
      if (!file.editable) {
        this.$message.info("该文件不支持修改！");
        this.content = "";
        this.file = {};
        this.buttonDisabled = true;
        return;
      }
      // if (
      //   file.name === "settings.yaml" ||
      //   file.name === "settings.yml" ||
      //   file.name === "theme.yaml" ||
      //   file.name === "theme.yml"
      // ) {
      //   this.$confirm({
      //     title: "警告：请谨慎修改该配置文件",
      //     content: "修改之后可能会产生不可预料的问题！",
      //     onCancel() {
      //       _this.content = "";
      //       _this.file = {};
      //       _this.buttonDisabled = true;
      //     },
      //   });
      // }
      CodeAPi.getContent(file.path).then((resp) => {
        this.content = resp.data.data;
        this.file = file;
        // console.log(this.file);
        // this.buttonDisabled = false;
      });
      // themeApi.getContent(this.selectedTheme.id, file.path).then((response) => {

      // });
    },
    cancerStudyFocus() {
      this.loadCancerStudy();
    },
    cancerStudySearch(input) {
      this.loadCancerStudy({ keyword: input });
    },
    save() {
      CodeAPi.saveContent({ path: this.file.path, content: this.content }).then(
        (resp) => {
          this.$notification["success"]({
            message: "保存成功!" + resp.data.message,
          });
        }
      );
    },
    onClose() {
      this.visible = false;
    },
    openDrawer() {
      this.visible = true;
      this.loadCancerStudy();
    },
    loadLog(id) {
      TaskApi.log({ taskId: id }).then((resp) => {
        // console.log(resp.data.data);
        this.Log = resp.data.data;
      });
    },
    showLog(data) {
      // this.visible = true;
      let loadLogFun = this.loadLog;
      loadLogFun(data.id);
      this.currentLogName = data.name;
      if (this.setIntervaStatus) {
        clearInterval(this.setIntervaStatus);
      }
      this.setIntervaStatus = setInterval(function () {
        loadLogFun(data.id);
      }, 1000);
    },
    loadTask(id) {
      TaskApi.findById(id).then((resp) => {
        // console.log(resp);
        this.task = resp.data.data;
      });
    },
    runTask() {
      if (this.cancerStudyId && this.file) {
        // console.log(this.cancerStudy);

        // console.log(this.file);
        this.Log = "";
        TaskApi.run({
          objId: this.cancerStudyId,
          path: this.file.path,
          taskType: "CANCER_STUDY",
        }).then((resp) => {
          this.$message.success(resp.data.data.name + "创建成功");
          this.showLog(resp.data.data);
          this.loadTask(resp.data.data.id);
        });
      }
    },
    shutdownTask() {
      TaskApi.shutdown(this.task.id).then((resp) => {
        // this.loadData();
        // console.log(resp)
        this.$message.success(resp.data.data.name + "已经结束");
      });
    },
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
    handleTableChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadCancerStudy();
    },
    loadCancerStudy() {
      this.queryParam.page = this.pagination.page - 1;
      this.queryParam.size = this.pagination.size;
      this.queryParam.sort = this.pagination.sort;
      this.queryParam.keyword = this.pagination.keyword;

      const cancerId = this.$route.query.cancerId;
      const studyId = this.$route.query.studyId;
      const dataOriginId = this.$route.query.dataOriginId;
      const dataCategoryId = this.$route.query.dataCategoryId;
      const analysisSoftwareId = this.$route.query.analysisSoftwareId;

      this.queryParam.cancerId = cancerId;
      this.queryParam.studyId = studyId;
      this.queryParam.dataOriginId = dataOriginId;
      this.queryParam.dataCategoryId = dataCategoryId;
      this.queryParam.analysisSoftwareId = analysisSoftwareId;
      // this.queryParam.parentId = -1;

      this.loading = true;
      CancerStudyAPi.page(this.queryParam, true).then((resp) => {
        // console.log(resp);

        this.cancerStudys = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    addToEdit(id) {
      // console.log(data);
      this.cancerStudyDisplay = id;
      this.cancerStudyId = id;
      TaskApi.getObjMap(id).then((resp) => {
        this.objMap = JSON.stringify(resp.data.data);
      });
    },
  },
};
</script>
<style>
.home {
  margin: 20px;
}
</style>