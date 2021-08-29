<template>
  <div>
    <a-drawer
      title="癌症研究"
      placement="right"
      :closable="false"
      :visible="visible"
      width="520"
      @close="onClose"
    >
      <div v-if="CancerStudyDetial">
        <a-form-item label="fileName">
          <a-input :value="CancerStudyDetial.fileName" />
        </a-form-item>
        <a-form-item label="fileType">
          <a-input :value="CancerStudyDetial.fileType" />
        </a-form-item>
        <a-form-item label="absolutePath">
          <a-input :value="CancerStudyDetial.absolutePath" />
        </a-form-item>
        <a-form-item label="location">
          <a-input :value="CancerStudyDetial.location" />
        </a-form-item>
        <a-form-item label="uuid">
          <a-input :value="CancerStudyDetial.uuid" />
        </a-form-item>

        <a-divider />

        <a-button
          type="link"
          v-for="item in codeList"
          :key="item.id"
          @click="runTask(CancerStudyDetial.id, item.id)"
        >
          {{ item.name }}
        </a-button>

        <a-textarea
          v-if="runMsg"
          v-model="runMsg"
          placeholder="run log"
          :auto-size="{ minRows: 3, maxRows: 20 }"
        />

        <div>
          <a-table
            :columns="task_columns"
            :data-source="taskList"
            bordered
            :pagination="false"
            :row-key="(record) => record.id"
          >
          </a-table>
        </div>
        <a-button @click="showLog(CancerStudyDetial.id)">查看更多</a-button>
      </div>
    </a-drawer>

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <div slot="name" slot-scope="name,record">
        <a href="javascript:;" @click="detial(record.id)">{{record}}</a>
      </div> -->
      <span slot="absolutePath" slot-scope="text, record">
        <a href="javascript:;" @click="updateCancerStudy(record.id)">位置</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />-->
        <!-- <a href="javascript:;" @click="generateHtml(record.id)">生成HTML</a> -->
        <!-- <a-divider type="vertical" /> -->
        <!-- <a href="javascript:;" @click="updateProject(record.id)">编辑</a> -->
        <a href="javascript:;" @click="checkFileExist(record.id)">{{
          record.status
        }}</a>
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
    title: "isSuccess",
    dataIndex: "isSuccess",
  },
];
const columns = [
  {
    title: "id",
    dataIndex: "id",
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
    title: "分析软件",
    dataIndex: "analysisSoftware.name",
  },
  {
    title: "大小",
    dataIndex: "size",
  },
  {
    title: "日期",
    dataIndex: "createDate",
  },
  {
    title: "Action",
    key: "action",
    // fixed: "right",
    //   width: 200,
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
      runMsg: undefined,
      codeList: [],
      taskList: [],
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
      this.$websock.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.cancerStudyId == this.CancerStudyDetial.id) {
          // console.log(this.CancerStudyDetial)
          this.runMsg = data.runMsg;
        }
        // console.log(data)
        this.loadData();
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
      TaskApi.page({ cancerStudyId: id }).then((resp) => {
        this.taskList = resp.data.data.content;
      });
    },
    showDrawer(data) {
      this.CancerStudyDetial = data;
      CodeApi.findByCan(data.id).then((resp) => {
        // console.log(resp);
        this.codeList = resp.data.data;
      });
      this.loadTask(data.id);
      // console.log(data);
      this.visible = true;
    },
    onClose() {
      this.visible = false;
      this.runMsg = undefined;
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
    showLog(id) {
      this.$router.push({
        name: "cancer_study_task",
        query: { cancerStudyId: id },
      });
    },
    runTask(cancerStudyId, codeId) {
      if (this.runMsg) {
        this.runMsg = "";
      }
      // console.log(cancerStudyId, codeId);
      TaskApi.run({ cancerStudyId: cancerStudyId, codeId: codeId }).then(
        (resp) => {
          this.loadTask(cancerStudyId);
          this.$message.success(resp.data.data.name + "创建成功");

          //  this.$notification["success"]({
          //     message: "运行成功!" + resp.data.message,
          //   });
        }
      );
    },
  },
};
</script>
