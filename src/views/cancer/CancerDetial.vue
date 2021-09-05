<template>
  <div>
    <a-drawer
      title="癌症研究"
      placement="right"
      :closable="false"
      :visible="visible"
      width="50%"
      @close="onClose"
    >
      <div v-if="CancerStudyDetial">
        <a-form-item label="description">
          <a-input :value="CancerStudyDetial.description" />
        </a-form-item>
        <a-form-item label="createDate">
          <a-input :value="CancerStudyDetial.createDate" />
        </a-form-item>
        <a-form-item label="fileName">
          <a-input :value="CancerStudyDetial.fileName" />
        </a-form-item>
        <a-form-item label="fileType">
          <a-input :value="CancerStudyDetial.fileType" />
        </a-form-item>
        <a-form-item label="location">
          <a-input :value="CancerStudyDetial.location" />
        </a-form-item>
        <a-form-item label="uuid">
          <a-input :value="CancerStudyDetial.uuid" />
        </a-form-item>
        <a-form-item label="原始数据">
          <a-input :value="CancerStudyDetial.absolutePath" />
        </a-form-item>
        <a
          href="javascript:;"
          @click="downlaod(CancerStudyDetial.relativePath)"
          v-if="CancerStudyDetial.status"
          >下载</a
        >
        <div>
          <a-form-item label="expr">
            <a-input :value="CancerStudyDetial.expr" />
          </a-form-item>
          <a
            href="javascript:;"
            @click="downlaod(CancerStudyDetial.exprRelative)"
            v-if="CancerStudyDetial.exprStatus"
            >下载</a
          >

          <a-form-item label="metadata">
            <a-input :value="CancerStudyDetial.metadata" />
          </a-form-item>
          <a
            href="javascript:;"
            @click="downlaod(CancerStudyDetial.metadataRelative)"
            v-if="CancerStudyDetial.metadataStatus"
            >下载</a
          >
        </div>
        <a-divider />

        <div>
          <a-button
            type="link"
            v-for="item in codeList"
            :key="item.id"
            @click="runTask(CancerStudyDetial.id, item.id)"
          >
            {{ item.name }}
          </a-button>
        </div>

        <div>
          <a-table
            :columns="task_columns"
            :data-source="taskList"
            bordered
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <span slot="action" slot-scope="text, record">
              <a href="javascript:;" @click="runTaskById(record.id)"
                >运行任务</a
              >
              <a-divider type="vertical" />
              <a href="javascript:;" @click="showLog(record)">LOG</a>
            </span>
          </a-table>
        </div>
        <span v-if="currentLogName">current Log:{{ currentLogName }}</span>
        <a-textarea
          v-model="Log"
          placeholder="run log"
          :auto-size="{ minRows: 3, maxRows: 20 }"
        />

        <a-button @click="moreInfo(CancerStudyDetial.id)">查看更多</a-button>
      </div>
    </a-drawer>
    <a-button @click="createTSVFile">导出CSV</a-button>
    <a-input-search
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
    />

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1500 }"
    >
      <!-- @expand="rowChannge" -->
      <div slot="id_link" slot-scope="id">
        <a href="javascript:;">{{ id }}</a>
      </div>

      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />-->
        <!-- <a href="javascript:;" @click="generateHtml(record.id)">生成HTML</a> -->
        <!-- <a-divider type="vertical" /> -->
        <!-- <a href="javascript:;" @click="updateProject(record.id)">编辑</a> -->
        <a href="javascript:;" @click="checkFileExist(record.id)"> 检测 </a>

        <a-divider type="vertical" v-if="record.exprStatus" />
        <a
          href="javascript:;"
          @click="downlaod(record.exprRelative)"
          v-if="record.exprStatus"
          >表达矩阵</a
        >
        <a-divider type="vertical" v-if="record.metadataRelative" />
        <a
          href="javascript:;"
          @click="downlaod(record.metadataRelative)"
          v-if="record.metadataStatus"
          >样品信息</a
        >
        <a-divider type="vertical" v-if="record.status" />

        <a
          href="javascript:;"
          @click="downlaod(record.relativePath)"
          v-if="record.status"
          >原始数据</a
        >
        <a-divider type="vertical" />
        <a href="javascript:;" @click="showDrawer(record)">更多</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateCancerStudy(record.id)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delCancerStudy(record.id)">删除</a>
        <!-- <a href="javascript:;" @click="articleSettings(record.id)">设置</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="deleteArticleById(record.id)">删除文章</a>-->
        <!-- <a href="javascript:;" class="ant-dropdown-link">
        More actions
        <a-icon type="down" />
        </a>-->
      </span>

      <!-- :scroll="{ x: 1500, }" -->
      <!-- <template slot="name" slot-scope="name">{{ name.first }} {{ name.last }}</template> -->
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
  </div>
</template>
<script>
import CancerStudyAPi from "@/api/CancerStudy.js";
import CodeApi from "@/api/code.js";
import TaskApi from "@/api/task.js";
const task_columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "taskStatus",
    dataIndex: "taskStatus",
  },
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "isSuccess",
    dataIndex: "isSuccess",
  },
  {
    title: "Action",
    key: "action",
    // fixed: "right",
    //   width: 200,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id_link" },
    fixed: "left",
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
  {
    title: "parentId",
    dataIndex: "parentId",
  },
  {
    title: "codeId",
    dataIndex: "codeId",
  },
  {
    title: "大小",
    dataIndex: "size",
  },
  {
    title: "Action",
    key: "action",
    // fixed: "right",
    //   width: 200,
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
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
      data: [],
      tasks: [],
      loading: false,
      columns,
      task_columns,
      cancerId: null,
      visible: false,
      CancerStudyDetial: undefined,
      codeList: [],
      taskList: [],
      Log: "",
      setIntervaStatus: undefined,
      currentLogName: undefined,
    };
  },
  //   beforeRouteEnter(to, from, next) {
  //     // Get post id from query
  //     const cancerId = to.query.cancerId;

  //     next(vm => {
  //       if (cancerId) {
  //         vm.cancerId = cancerId;
  //         vm.loadData(cancerId);
  //       }
  //     });
  //   },
  mounted() {
    this.loadData();
    if (this.$websock) {
      this.$websock.onmessage = () => {
        // let data = JSON.parse(e.data);
        // console.log(data)
        this.loadData();
        if (this.CancerStudyDetial) {
          this.loadTask(this.CancerStudyDetial.id);
        }
      };
    }
  },
  methods: {
    handleTableChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadData();
    },
    loadData() {
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

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    updateProject(id) {
      this.$router.push({
        name: "cancer_cancer_study",
        query: { projectId: id },
      });
    },
    delProject(id) {
      CancerStudyAPi.del(id).then((resp) => {
        this.$notification["success"]({
          message: resp.data.data.name + ":删除成功!",
        });
        this.loadData();
      });
    },
    updateCancerStudy(id) {
      this.$router.push({
        name: "update_cancer_study",
        query: { cancerStudyId: id },
      });
    },
    delCancerStudy(id) {
      let loadData = this.loadData;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除癌症数据",
        content: "您确定要删除该癌症数据吗?",
        onOk() {
          CancerStudyAPi.del(id).then((resp) => {
            loadData();
            notification({
              message: "删除成功!" + resp.data.message,
            });
          });
        },
        onCancel() {},
      });
    },
    loadTask(id) {
      TaskApi.page({ objId: id, taskType: "CANCER_STUDY" }).then((resp) => {
        this.taskList = resp.data.data.content;
      });
    },
    loadCode(id) {
      CodeApi.findByCan(id).then((resp) => {
        // console.log(resp);
        this.codeList = resp.data.data;
      });
    },
    showDrawer(data) {
      this.visible = true;
      this.CancerStudyDetial = data;
      this.loadCode(data.id);
      this.loadTask(data.id);
    },
    onClose() {
      this.visible = false;
      this.CancerStudyDetial = undefined;
      this.Log=""
      if (this.setIntervaStatus) {
        clearInterval(this.setIntervaStatus);
      }
    },
    checkFileExist(id) {
      let loadData = this.loadData;
      let notification = this.$notification["success"];
      let notification_error = this.$notification["error"];
      CancerStudyAPi.checkFileExist(id).then((resp) => {
        loadData();
        if (resp.data.data.status) {
          notification({
            message: "文件存在：" + resp.data.data.absolutePath,
          });
        } else {
          notification_error({
            message: "文件不存在" + resp.data.data.absolutePath,
          });
        }
      });
    },
    moreInfo(id) {
      this.$router.push({
        name: "cancer_study_task",
        query: { objId: id },
      });
    },
    loadLog(id) {
      TaskApi.log({ taskId: id }).then((resp) => {
        // console.log(resp.data.data);
        this.Log = resp.data.data;
      });
    },
    showLog(data) {
      this.visible = true;
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
    runTaskById(id) {
      TaskApi.runOne(id).then((resp) => {
        this.loadData();
        this.$message.success(resp.data.data.name + "运行成功");
        this.loadTask(this.CancerStudyDetial.id);
        this.showLog(resp.data.data);
      });
    },
    runTask(cancerStudyId, codeId) {
      // console.log(cancerStudyId, codeId);
      TaskApi.run({
        objId: cancerStudyId,
        codeId: codeId,
        taskType: "CANCER_STUDY",
      }).then((resp) => {
        this.loadTask(cancerStudyId);
        this.$message.success(resp.data.data.name + "创建成功");
        this.showLog(resp.data.data);
        this.loadCode(cancerStudyId);
        //  this.$notification["success"]({
        //     message: "运行成功!" + resp.data.message,
        //   });
      });
    },
    downlaod(path) {
      let download_url = JSON.parse(localStorage.getItem("global_config"));
      window.location.href = download_url.download_url + "/" + path;
    },
    createTSVFile() {
      CancerStudyAPi.createTSVFile().then((res) => {
        var blob = res.data;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          var a = document.createElement("a");
          // 获取文件名fileName
          console.log(res);
          // var fileName = res.headers["Content-Disposition"]
          // fileName = fileName[fileName.length - 1];
          // fileName = fileName.replace(/"/g, "");
          a.download = "export.tsv";
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      });
    },
    onSearch(value) {
      this.pagination.keyword = value;
      this.loadData();
    },
    rowChannge(expand, record) {
      // console.log(expand, record);
      if (expand) {
        CancerStudyAPi.list({ parentId: record.id }).then((resp) => {
          // console.log(resp);
          this.innerData = resp.data.data;
        });
      } else {
        this.innerData = [];
      }
    },
  },
};
</script>
