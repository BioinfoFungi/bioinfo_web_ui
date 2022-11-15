<template>
  <a-drawer
    :title="CRUD"
    placement="right"
    :closable="false"
    :visible="visible"
    width="80%"
    @close="onClose"
  >
    <div v-if="obj">
      <a-descriptions title="Data" bordered size="small" :column="2">
        <a-descriptions-item
          v-for="(item, index) in fields"
          :key="index"
          :label="item"
        >
          {{ obj[item] }}
        </a-descriptions-item>
      </a-descriptions>
      <div>
        <a-button
          type="link"
          v-for="item in codeList"
          :key="item.id"
          @click="addTask(obj.id, item.id)"
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
            <a href="javascript:;" @click="runTask(record.id)">运行</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="shutdownTask(record.id)">停止</a>
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
      <div
        class="svgJson"
        v-for="(item, index) in svgJson"
        :key="index"
        v-html="item"
      ></div>
      <a-button @click="moreInfo(obj.id)">查看更多</a-button>
    </div>
  </a-drawer>
</template>


<script>
import CodeApi from "@/api/code.js";
import CancerStudyAPi from "@/api/CancerStudy.js";
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
    title: "codeId",
    dataIndex: "codeId",
  },
  {
    title: "objId",
    dataIndex: "objId",
  },
  {
    title: "name",
    dataIndex: "name",
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
  props: {
    CRUD: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      task_columns,
      visible: false,
      obj: undefined,
      codeList: [],
      taskList: [],
      fields: [],
      svgJson: [],
      Log: "",
      setIntervaStatus: undefined,
      currentLogName: undefined,
    };
  },
  mounted() {
    // this.loadFields();

    if (this.$websock) {
      this.$websock.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.msgType == "NOTIFY") {
          this.$message.success(data.message);
          if (this.setIntervaStatus) {
            let setIntervaStatus = this.setIntervaStatus;
            setTimeout(function () {
              clearInterval(setIntervaStatus);
            }, 2000);
          }
        }

        if (this.obj) {
          this.loadTask(data.data.objId);
          this.findbyId(data.data.objId);
          let svgJson = JSON.parse(data.data.svgJson);
          this.svgJson = svgJson;
        }
      };
    }
  },
  methods: {
    onClose() {
      this.visible = false;
      this.obj = undefined;
      this.Log = "";
      if (this.setIntervaStatus) {
        clearInterval(this.setIntervaStatus);
      }
      this.svgJson = [];
      this.$emit("onClose");
    },
    onShow(id) {
      this.visible = true;
      this.loadCode();
      this.findbyId(id);
      this.loadTask(id);
      this.$emit("onShow");
    },
    loadCode() {
      CodeApi.listByCrudType(this.CRUD).then((resp) => {
        // console.log(resp);
        this.codeList = resp.data.data;
      });
    },
    findbyId(id) {
      CancerStudyAPi.findById(this.CRUD, { id: id }).then((resp) => {
        // console.log(resp);
        this.obj = resp.data.data;
      });
    },
    loadTask(id) {
      TaskApi.listAll(this.CRUD, { id: id }).then((resp) => {
        this.taskList = resp.data.data;
        // console.log(resp)
      });
    },
    loadFields() {
      CancerStudyAPi.getFields(this.CRUD).then((resp) => {
        // console.log(resp);
        this.fields = resp.data.data;
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
    addTask(objId, codeId) {
      CancerStudyAPi.addTask(this.CRUD, { id: objId, codeId: codeId }).then(
        (resp) => {
          this.showLog(resp.data.data);
          this.loadTask(objId);
          this.$message.success(resp.data.data.name + "创建成功");
        }
      );
    },
    runTask(id) {
      CancerStudyAPi.runTask(this.CRUD, { id: id }).then((resp) => {
        this.showLog(resp.data.data);
        this.loadTask(resp.data.data.objId);
        this.$message.success(resp.data.data.name + "运行！ ");
      });
    },
    shutdownTask(id) {
      TaskApi.shutdown(id).then((resp) => {
        // this.loadData();
        // console.log(resp)
        this.$message.success(resp.data.data.name + "结束!");
      });
    },
  },
};
</script>

<style>
</style>