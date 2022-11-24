<template>
  <div>
    <objForm
      ref="objForm"
      :API="dataAPI"
      @loadData="loadData"
      :isUpdate="isUpdate"
      v-slot="{ form }"
    >
      <a-form-model-item label="name" prop="name">
        <a-input v-model="form.name" />     
      </a-form-model-item>

      <a-form-model-item label="code" prop="code">
        <a-select  style="width: 120px" v-model="form.codeId">
          <a-select-option v-for="item in codes" :key="item.id" :value="item.id">
            {{item.name}}  
          </a-select-option>
        </a-select>
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
      <div slot="name" slot-scope="name, record">
        <a href="javascript:;" @click="toolForm(record)">{{ name }}</a>
      </div>
      <!-- <div slot="gse" slot-scope="gse">
        <a
          target="_blank"
          :href="'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + gse"
          >{{ gse }}</a
        >
      </div>
      <div slot="pubMed" slot-scope="pubMed">
        <a
          target="_blank"
          :href="'https://pubmed.ncbi.nlm.nih.gov/' + pubMed"
          >{{ pubMed }}</a
        >
      </div>
        <div slot="sra" slot-scope="sra">
        <a
          target="_blank"
          :href="'https://www.ncbi.nlm.nih.gov/sra?term=' + sra"
          >{{ sra }}</a
        >
      </div> -->
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
    title: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
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
import dataAPI from "@/api/tools.js";
import taskDrawer from "./components/task-drawer.vue";
import objForm from "./components/obj-form.vue";
import CodeAPi from "@/api/code.js";

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
      dataAPI,
      CRUD: "GSE",
      codes:[]
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
      this.loading = true;
      dataAPI.page(this.queryParam).then((resp) => {
        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },loadCode(){
      CodeAPi.listAll().then(resp=>{
        // console.log(resp)
        this.codes=resp.data.data
      })
    },
    handleTableChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadData();
    },
    onSearch(value) {
      this.pagination.page = 1;
      this.pagination.keywords = value;
      this.loadData();
    },
    createTSVFile() {
      dataAPI.createTSVFile(this.CRUD).then((res) => {
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
      dataAPI
        .init(this.CRUD, {
          isEmpty: isEmpty,
          name: this.CRUD + ".tsv",
        })
        .then((resp) => {
          this.loadData();
          this.$notification["success"]({
            message: resp.data.message,
          });
        });
    },
    delById(id) {
      let loadData = this.loadData;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除该工具",
        content: "您确定要删除该工具吗?",
        onOk() {
          dataAPI.del(id).then((resp) => {
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
      this.loadCode()
      this.$refs.objForm.onShow(-1);
    },
    updateForm(id) {
      this.isUpdate = true;
      this.loadCode()
      this.$refs.objForm.onShow(id);
    },
    more(id) {
      this.$refs.taskDrawer.onShow(id);
    },
    toolForm(record) {
      // console.log(record);
      this.$router.push({
        name: "tool-form",
        query: { toolId: record.id },
      });
    },
  },
};
</script>


<style>
.svgJson svg {
  width: 100%;
}
</style>


