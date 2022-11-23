<template>
  <div>
    <objForm
      ref="objForm"
      :CRUD="CRUD"
      @loadData="loadData"
      :isUpdate="isUpdate"
      v-slot="{ form }"
    >
      <a-form-model-item label="probeId" prop="probeId">
        <a-input v-model="form.probeId" />
      </a-form-model-item>
      <a-form-model-item label="symbol" prop="symbol">
        <a-input v-model="form.symbol" />
      </a-form-model-item>
      <a-form-model-item label="gpl" prop="gpl">
        <a-input v-model="form.gpl" />
      </a-form-model-item>
    </objForm>
    <taskDrawer ref="taskDrawer" :CRUD="CRUD"> </taskDrawer>

    <div>
      <a-button @click="addForm">添加</a-button>
      <a-button @click="createTSVFile">导出CSV</a-button>
      <a-button @click="initTSV(false)">导入CSV</a-button>
      <a-button @click="initTSV(true)">清空导入CSV</a-button>
      <a-input-search
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- :scroll="{ x: 'calc(100px + 100%)' }" -->
      <div slot="id" slot-scope="id">
        <a href="javascript:;">{{ id }}</a>
      </div>
      <div slot="gpl" slot-scope="gpl">
        <a
          target="_blank"
          :href="'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + gpl"
          >{{ gpl }}</a
        >
      </div>
     
      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;" @click="checkFileExist(record.id)"> 检测 </a> -->
        <a-divider type="vertical" v-if="record.status" />
        <!-- <a
          href="javascript:;"
          @click="downlaod(record.relativePath)"
          v-if="record.status"
          >原始数据</a
        > -->
        <a-divider type="vertical" />
        <a href="javascript:;" @click="more(record.id)">更多</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateForm(record.id)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delById(record.id)">删除</a>
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
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id" },
    fixed: "left",
  },
  {
    title: "gpl",
    dataIndex: "gpl",
    scopedSlots: { customRender: "gpl" },
  }, {
    title: "rowNum",
    dataIndex: "rowNum",
  },
  {
    title: "sampleCount",
    dataIndex: "sampleCount",
  },
  {
    title: "seriesCount",
    dataIndex: "seriesCount",
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
import CancerStudyAPi from "@/api/CancerStudy.js";
import taskDrawer from "./components/task-drawer.vue";
import objForm from "./components/obj-form.vue";
export default {
  components: {
    taskDrawer,
    objForm,
  },
  props: {
    // isUpdate: {
    //   type: Boolean,
    //   required: true,
    // },
    // CRUD: {
    //   type: String,
    //   required: true,
    // },
  },
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
      loading: false,
      isUpdate: false,
      columns,
      CRUD: "GPL",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.queryParam.page = this.pagination.page - 1;
      this.queryParam.size = this.pagination.size;
      this.queryParam.sort = this.pagination.sort;
      this.queryParam.keywords = this.pagination.keywords;

      // const cancerId = this.$route.query.cancerId;
      // const studyId = this.$route.query.studyId;
      // const dataOriginId = this.$route.query.dataOriginId;
      // const dataCategoryId = this.$route.query.dataCategoryId;
      // const analysisSoftwareId = this.$route.query.analysisSoftwareId;

      // this.queryParam.cancerId = cancerId;
      // this.queryParam.studyId = studyId;
      // this.queryParam.dataOriginId = dataOriginId;
      // this.queryParam.dataCategoryId = dataCategoryId;
      // this.queryParam.analysisSoftwareId = analysisSoftwareId;
      // // this.queryParam.parentId = -1;

      this.loading = true;
      CancerStudyAPi.page(this.CRUD, this.queryParam, true).then((resp) => {
        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    handleTableChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadData();
    },
    onSearch(value) {
      this.pagination.keywords = value;
      this.loadData();
    },
    createTSVFile() {
      CancerStudyAPi.createTSVFile(this.CRUD).then((res) => {
        let fileName = this.CRUD;
        var blob = res.data;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          var a = document.createElement("a");
          // 获取文件名fileName
          //   console.log(res);
          // var fileName = res.headers["Content-Disposition"]
          // fileName = fileName[fileName.length - 1];
          // fileName = fileName.replace(/"/g, "");
          a.download = fileName + ".tsv";
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      });
    },
    initTSV(isEmpty) {
      CancerStudyAPi.init(this.CRUD, {
        isEmpty: isEmpty,
        name: this.CRUD+".tsv",
      }).then((resp) => {
        this.loadData();
        this.$notification["success"]({
          message: resp.data.message,
        });
      });
    },
    delById(id) {
      let loadData = this.loadData;
      let CRUD = this.CRUD;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除癌症数据",
        content: "您确定要删除该癌症数据吗?",
        onOk() {
          CancerStudyAPi.delById(CRUD, { id: id }).then((resp) => {
            loadData();
            notification({
              message: "删除成功!" + resp.data.message,
            });
          });
        },
        onCancel() {},
      });
    },
    addForm() {
      this.isUpdate = false;
      this.$refs.objForm.onShow(-1);
    },
    updateForm(id) {
      this.isUpdate = true;
      this.$refs.objForm.onShow(id);
    },
    more(id) {
      this.$refs.taskDrawer.onShow(id);
    },
  },
};
</script>


<style>
.svgJson svg {
  width: 100%;
}
</style>


