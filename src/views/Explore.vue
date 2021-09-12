<template>
  <a-row :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
    <a-col :span="5">
      <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />
    </a-col>

    <a-col :span="19">
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

          <a-divider />
        </div>
      </a-drawer>
      <a-input-search
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <a-button @click="clearSearch">清除</a-button>
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

          <a-divider type="vertical" v-if="record.status" />

          <a
            href="javascript:;"
            @click="downlaod(record.relativePath)"
            v-if="record.status"
            >原始数据</a
          >
          <a-divider type="vertical" />
          <a href="javascript:;" @click="showDrawer(record)">更多</a>
          <!-- <a-divider type="vertical" />
          <a href="javascript:;" @click="updateCancerStudy(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="delCancerStudy(record.id)">删除</a> -->
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
    </a-col>
  </a-row>
</template>
<script>
import CancerStudyAPi from "@/api/CancerStudy.js";
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];
const columns = [
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
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id_link" },
    // fixed: "left",
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
      loading: false,
      columns,
      visible: false,
      CancerStudyDetial: undefined,
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData,
    };
  },
  mounted() {
    this.loadData();
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  methods: {
    onExpand(expandedKeys) {
      // console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    onSearch(value) {
      this.pagination.keyword = value;
      this.loadData();
    },
    clearSearch() {
      this.pagination.keyword = null;
      this.loadData();
    },
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
    showDrawer(data) {
      this.CancerStudyDetial = data;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    downlaod(path) {
      let download_url = JSON.parse(localStorage.getItem("global_config"));
      // window.location.href = download_url.download_url + "/" + path;
      window.open(download_url.download_url + "/" + path);
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
  },
};
</script>
