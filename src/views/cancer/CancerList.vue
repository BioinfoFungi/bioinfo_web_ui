<template>
  <div>
    <a-modal v-model="visibleDialog" title="Cancer" @ok="addOrUpdate">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item ref="name" label="name" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item ref="enName" label="enName" prop="enName">
          <a-input v-model="form.enName" />
        </a-form-model-item>
        <a-form-model-item
          ref="description"
          label="description"
          prop="description"
        >
          <a-input v-model="form.description" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-button @click="addInput">添加</a-button>
    <a-button @click="createTSVFile">导出CSV</a-button>
    <a-button @click="initTSV(false)">导入CSV</a-button>
    <a-button @click="initTSV(true)">清空导入CSV</a-button>
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
    >
      <div slot="name" slot-scope="name, record">
        <a href="javascript:;" @click="detial(record.id)">{{ name }}</a>
      </div>
      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />-->
        <!-- <a href="javascript:;" @click="generateHtml(record.id)">生成HTML</a> -->
        <!-- <a-divider type="vertical" /> -->
        <!-- <a href="javascript:;" @click="updateProject(record.id)">编辑</a> -->
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateInput(record)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="del(record.id)">删除</a>
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
import CancerAPi from "@/api/cancer.js";
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "癌症名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "英文名称",
    dataIndex: "enName",
  },

  {
    title: "创建日期",
    dataIndex: "createDate",
  },
  //   {
  //     title: "截止日期",
  //     dataIndex: "deadline"
  //   },
  {
    title: "Action",
    key: "action",
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
      visibleDialog: false,
      isUpdate: false,
      form: {
        name: undefined,
        enName: undefined,
        description: undefined,
      },
      rules: {
        enName: [{ required: true, message: "请输入名称", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.loadData();
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
      this.loading = true;
      CancerAPi.page(this.queryParam).then((resp) => {
        // console.log(resp);

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    detial(id) {
      this.$router.push({
        name: "cancer_cancer_detial",
        query: { cancerId: id },
      });
    },
    del(id) {
      let loadData = this.loadData;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除癌症数据",
        content: "您确定要删除该癌症数据吗?",
        onOk() {
          CancerAPi.del(id).then((resp) => {
            loadData();
            notification({
              message: "删除成功!" + resp.data.message,
            });
          });
        },
        onCancel() {},
      });
    },
    onSearch(value) {
      this.pagination.keyword = value;
      this.loadData();
      //   console.log(value);
    },
    addInput() {
      this.form = {};
      this.visibleDialog = true;
      this.isUpdate = false;
    },
    updateInput(record) {
      this.visibleDialog = true;
      this.isUpdate = true;
      this.form = record;
    },
    add() {
      CancerAPi.add(this.form).then((resp) => {
        this.$notification["success"]({
          message: "添加" + resp.data.message,
        });
        this.visibleDialog = false;
        this.loadData();
      });
    },
    update() {
      CancerAPi.update(this.form.id, this.form).then((resp) => {
        this.$notification["success"]({
          message: "添加" + resp.data.message,
        });
        this.visibleDialog = false;
        this.loadData();
      });
    },
    addOrUpdate() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.isUpdate) {
            this.update();
          } else {
            this.add();
          }
        } else {
          return false;
        }
      });
    },createTSVFile() {
      CancerAPi.createTSVFile().then((res) => {
        var blob = res.data;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          var a = document.createElement("a");
          // 获取文件名fileName
          // console.log(res);
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
    initTSV(isEmpty) {
      CancerAPi.init({ isEmpty: isEmpty }).then((resp) => {
        // console.log(resp)
        this.loadData();
        this.$notification["success"]({
          message: resp.data.message,
        });
      });
    },
  },
};
</script>
