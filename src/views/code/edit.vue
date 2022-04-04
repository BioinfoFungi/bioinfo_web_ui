<template>
  <a-row :gutter="12">
    <a-col :span="6">
      <a-card :bodyStyle="{ padding: '16px', overflow: 'auto' }">
        <!-- <theme-file
          v-if="files"
          :files="files"
          @listenToSelect="codeSelect"
        /> -->
        <!-- <a-list bordered :data-source="codes">
          <a-list-item slot="renderItem" slot-scope="item">
            <a href="javascript:;" @click="codeSelect(item)">{{
              item.id + "-" + item.name
            }}</a>
          </a-list-item>
        </a-list> -->

        <!-- <a-input-search
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
        <a-button @click="clearSearch">清除</a-button> -->
        <a-table
          :columns="codeColumns"
          :row-key="(record) => record.id"
          :data-source="codes"
          :pagination="false"
          :loading="loading"
          @change="codeTableChange"
        >
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="codeSelect(record.id)">
              {{ "[" + record.crudType + record.name + "]" }}
            </a>
          </span>
          <template slot="footer">
            <div class="page-wrapper" :style="{ textAlign: 'right' }">
              <a-pagination
                class="pagination"
                :current="codePagination.page"
                :total="codePagination.total"
                :defaultPageSize="codePagination.size"
                :pageSizeOptions="['5', '10', '20', '50', '100']"
                showSizeChanger
                @showSizeChange="codeTableChange"
                @change="codeTableChange"
              />
            </div>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <a-drawer
      :title="code ? code.crudType : 'crudType'"
      placement="right"
      :closable="false"
      :visible="visible"
      width="50%"
      @close="onClose"
    >
      <a-input-search
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <a-table
        :columns="objsColumns"
        :row-key="(record) => record.id"
        :data-source="objs"
        :pagination="false"
        :loading="loading"
        @change="objsTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="objSelect(record.id)">
            {{ record.id }}
          </a>
        </span>
        <template slot="footer">
          <div class="page-wrapper" :style="{ textAlign: 'right' }">
            <a-pagination
              class="pagination"
              :current="objsPagination.page"
              :total="objsPagination.total"
              :defaultPageSize="objsPagination.size"
              :pageSizeOptions="['5', '10', '20', '50', '100']"
              showSizeChanger
              @showSizeChange="objsTableChange"
              @change="objsTableChange"
            />
          </div>
        </template>
      </a-table>
    </a-drawer>

    <a-col :span="18">
      <div v-if="obj">
        <a-descriptions bordered size="small" :column="2">
          <a-descriptions-item label="code">
            <span v-if="code">{{ code.id }}</span></a-descriptions-item
          >
          <a-descriptions-item label="obj">
            <a-button @click="openDrawer">{{ obj.id }}</a-button>
          </a-descriptions-item>
          <a-descriptions-item
            v-for="(item, index) in fields"
            :key="index"
            :label="item"
          >
            {{ obj[item] }}
          </a-descriptions-item>
          <a-descriptions-item label="option" span="2">
            <span v-if="!codeViewStatue">
              <a-button @click="save">保存</a-button>
              <a-button @click="runTask">运行</a-button>
              <a-button @click="shutdownTask">结束</a-button>
            </span>
            <span v-if="task">
              <a-button
                v-if="codeViewStatue"
                @click="
                  () => {
                    this.content = this.sourceCode;
                    codeViewStatue = false;
                  }
                "
                >source code</a-button
              >
              <a-button
                v-if="!codeViewStatue"
                @click="
                  () => {
                    this.content = this.task.generateCode;
                    codeViewStatue = true;
                  }
                "
                >generate code</a-button
              >
            </span>
          </a-descriptions-item>
          <a-descriptions-item label="edit" :span="2">
            <codemirror
              v-model="content"
              :options="codemirrorOptions"
            ></codemirror>
          </a-descriptions-item>
          <a-descriptions-item label="log" :span="2">
            <a-textarea
              v-model="Log"
              placeholder="run log"
              :auto-size="{ minRows: 3, maxRows: 20 }"
            />
          </a-descriptions-item>
          <a-descriptions-item label="picture" :span="2">
            <div
              class="svgJson"
              v-for="(item, index) in svgJson"
              :key="index"
              v-html="item"
            ></div>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
import CodeAPi from "@/api/code.js";
// import ThemeFile from "./components/ThemeFile";
import { codemirror } from "vue-codemirror-lite";
import CancerStudyAPi from "@/api/CancerStudy.js";
import TaskApi from "@/api/task.js";

const objsColumns = [
  {
    title: "action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
  {
    title: "gse",
    dataIndex: "gse",
  },
  {
    title: "gpl",
    dataIndex: "gpl",
  },
];

const codeColumns = [
  {
    title: "action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  components: {
    // ThemeFile,
    codemirror,
  },
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      codes: [],
      code: undefined,
      objs: [],
      obj: undefined,
      sourceCode: "",
      codeViewStatue: false,
      content: this.sourceCode,
      visible: false,
      cancerStudy: undefined,
      Log: "",
      task: undefined,
      codemirrorOptions: {
        tabSize: 4,
        mode: "text/html",
        lineNumbers: true,
        line: true,
      },
      form: {
        cancer: undefined,
        study: undefined,
        dataOrigin: undefined,
        dataCategory: undefined,
        analysisSoftware: undefined,
      },

      objsColumns,
      codeColumns,
      loading: false,
      cancerStudys: [],
      objsPagination: {
        page: 1,
        size: 5,
        sort: null,
        keyword: null,
      },
      objsQueryParam: {
        page: 0,
        size: 10,
        sort: null,
        keyword: null,
      },
      codePagination: {
        page: 1,
        size: 5,
        sort: null,
        keyword: null,
      },
      codeQueryParam: {
        page: 0,
        size: 10,
        sort: null,
        keyword: null,
      },

      objMap: undefined,
      svgJson: [],
      fields: [],
    };
  },
  mounted() {
    this.loadCode();
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
          // console.log(data);
          this.$message.info(data.message);
          // this.loadTask(this.task.id);
          // this.loadCancerStudy();
          // console.log("ddd")
        }
        if (data.data) {
          let svgJson = JSON.parse(data.data.svgJson);
          // console.log(svgJson);
          this.svgJson = svgJson;
          this.task = data.data;
          this.findbyId(this.code.crudType, data.data.objId);
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
    loadCode() {
      this.codeQueryParam.page = this.codePagination.page - 1;
      this.codeQueryParam.size = this.codePagination.size;
      this.codeQueryParam.sort = this.codePagination.sort;
      CodeAPi.page(this.codeQueryParam).then((resp) => {
        this.codes = resp.data.data.content;
        this.codePagination.total = parseInt(resp.data.data.totalElements);
      });
    },
    codeTableChange(page, pageSize) {
      this.codePagination.page = page;
      this.codePagination.size = pageSize;
      this.loadCode();
    },
    loadObjs() {
      // console.log(crudType)
      this.objsQueryParam.page = this.objsPagination.page - 1;
      this.objsQueryParam.size = this.objsPagination.size;
      this.objsQueryParam.sort = this.objsPagination.sort;
      this.objsQueryParam.keywords = this.objsPagination.keywords;
      CancerStudyAPi.page(this.code.crudType, this.objsQueryParam).then(
        (resp) => {
          // console.log(resp);
          this.objs = resp.data.data.content;
          // console.log(this.objs);
          this.objsPagination.total = parseInt(resp.data.data.totalElements);
          this.loading = false;
        }
      );
    },
    loadLog(id) {
      TaskApi.log({ taskId: id }).then((resp) => {
        // console.log(resp.data.data);
        this.Log = resp.data.data;
      });
    },
    objsTableChange(page, pageSize) {
      this.objsPagination.page = page;
      this.objsPagination.size = pageSize;
      this.loadObjs();
      // this.loadCancerStudy();
    },

    loadFields(CRUD) {
      CancerStudyAPi.getFields(CRUD).then((resp) => {
        // console.log(resp);
        this.fields = resp.data.data;
      });
    },
    codeSelect(id) {
      // console.log(code)
      this.obj = undefined;
      this.task = undefined;
      this.Log = "";
      this.svgJson = [];
      CodeAPi.getFileContent({ id: id }).then((resp) => {
        this.code = resp.data.data;
        this.sourceCode = resp.data.data.content;
        this.content = this.sourceCode;
        this.loadObjs();
        this.loadFields(this.code.crudType);
      });

      this.visible = true;
    },
    objSelect(id) {
      // this.obj = obj;
      this.task = undefined;
      this.visible = false;
      this.Log = "";
      this.svgJson = [];
      this.findbyId(this.code.crudType, id);
    },
    findbyId(CRUD, id) {
      CancerStudyAPi.findById(CRUD, { id: id }).then((resp) => {
        // console.log(resp);
        this.obj = resp.data.data;
      });
    },
    save() {
      CodeAPi.saveFileContent(this.code.id, {
        content: this.content,
      }).then((resp) => {
        this.$notification["success"]({
          message: "保存成功!" + resp.data.message,
        });
      });
    },
    onClose() {
      if (this.obj) {
        this.visible = false;
      } else {
        this.code = undefined;
        this.visible = false;
      }
    },
    openDrawer() {
      this.visible = true;
      // this.loadCancerStudy();
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
      if (this.obj && this.code) {
        CancerStudyAPi.addTask(this.code.crudType, {
          id: this.obj.id,
          codeId: this.code.id,
        }).then((resp) => {
          // console.log(resp)
          // this.loadData();
          this.showLog(resp.data.data);
          // this.loadTask(objId);
          // let svgJson = JSON.parse(resp.data.data.svgJson);
          // // console.log(svgJson)
          // this.svgJson=svgJson;
          this.$message.success(resp.data.data.name + "创建成功");
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

    onSearch(value) {
      this.objsPagination.page = 1;
      this.objsPagination.keywords = value;
      this.loadObjs();
    },
    clearSearch() {
      this.objsPagination.keywords = null;
      this.loadData();
    },
  },
};
</script>
<style>
.home {
  margin: 20px;
}
</style>