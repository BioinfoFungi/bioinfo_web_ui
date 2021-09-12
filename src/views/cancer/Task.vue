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
      <div v-if="TaskDetail">
        <div>
          {{ TaskDetail.result }}
        </div>
        <a-textarea
          v-model="TaskDetail.runMsg"
          placeholder="run log"
          :auto-size="{ minRows: 3, maxRows: 20 }"
        />
      </div>

      <div v-if="Log">
        <!-- <div>
          {{ TaskDetail.result }}
        </div> -->
        <a-textarea
          v-model="Log"
          placeholder="run log"
          :auto-size="{ minRows: 3, maxRows: 20 }"
        />
      </div>
    </a-drawer>
    <a-button @click="removeALlTask">removeALlTask</a-button>
    <a-table
      :columns="task_columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 'calc(700px + 50%)' }"
      @change="handleTableChange"
    >
      <span slot="isSuccess" slot-scope="text">
        <a href="javascript:;">{{ text }}</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="shutdownTask(record.id)">结束</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="runTask(record.id)">运行</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="showLog(record.id)">Log </a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="showDrawer(record)">结果</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delTask(record.id)">删除</a>
      </span>
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
import TaskApi from "@/api/task.js";
const task_columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "taskStatus",
    dataIndex: "taskStatus",
  },
  {
    title: "threadName",
    dataIndex: "threadName",
  },
  {
    title: "isSuccess",
    dataIndex: "isSuccess",
    scopedSlots: { customRender: "isSuccess" },
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
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
      loading: false,
      task_columns,
      cancerId: null,
      visible: false,
      TaskDetail: undefined,
      Log: undefined,
      setIntervaStatus: undefined,
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
    // console.log(this.$websock)
    this.$websock.onmessage = () => {
      // let data = JSON.parse(e.data);
      // console.log(data)
      this.loadData();
    };
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

      //   const cancerId = this.$route.query.cancerId;
      //   const studyId = this.$route.query.studyId;
      //   const dataOriginId = this.$route.query.dataOriginId;
      //   const dataCategoryId = this.$route.query.dataCategoryId;
      const objId = this.$route.query.objId;

      this.queryParam.objId = objId;
      //   this.queryParam.studyId = studyId;
      //   this.queryParam.dataOriginId = dataOriginId;
      //   this.queryParam.dataCategoryId = dataCategoryId;
      //   this.queryParam.analysisSoftwareId = analysisSoftwareId;

      this.loading = true;
      TaskApi.page(this.queryParam).then((resp) => {
        // console.log(resp);

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    delTask(id) {
      let loadData = this.loadData;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除Task数据",
        content: "您确定要删除该Task数据吗?",
        onOk() {
          TaskApi.del(id).then((resp) => {
            loadData();
            notification({
              message: "删除成功!" + resp.data.message,
            });
          });
        },
        onCancel() {},
      });
    },
    showDrawer(data) {
      this.TaskDetail = data;
      //   console.log(data);
      this.visible = true;
    },
    loadLog(id) {
      TaskApi.log({ taskId: id }).then((resp) => {
        // console.log(resp.data.data);
        this.Log = resp.data.data;
      });
    },
    showLog(id) {
      this.visible = true;
      let loadLogFun = this.loadLog;
      loadLogFun(id);
      this.setIntervaStatus = setInterval(function () {
        loadLogFun(id);
      }, 1000);
    },

    onClose() {
      this.visible = false;
      clearInterval(this.setIntervaStatus);
    },
    runTask(id) {
      TaskApi.runOne(id).then((resp) => {
        this.loadData();
        // console.log(resp)
        this.$message.success(resp.data.data.name + "运行成功");
      });
    },
    shutdownTask(id) {
      TaskApi.shutdown(id).then((resp) => {
        this.loadData();
        // console.log(resp)
        this.$message.success(resp.data.data.name + "已经结束");
      });
    },
    removeALlTask() {
      TaskApi.removeALlTask().then((resp) => {
        this.loadData();
        // console.log(resp)
        this.$message.success(resp.data.message);
      });
    },
  },
};
</script>
