<template>
  <div>
    <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <div slot="name" slot-scope="name,record">
        <a href="javascript:;" @click="detial(record.id)">{{name}}</a>
      </div>
      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />-->
        <!-- <a href="javascript:;" @click="generateHtml(record.id)">生成HTML</a> -->
        <!-- <a-divider type="vertical" /> -->
        <!-- <a href="javascript:;" @click="updateProject(record.id)">编辑</a> -->
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateProject(record.id)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delProject(record.id)">删除</a>
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
        <div class="page-wrapper" :style="{ textAlign: 'right'}">
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
import circRNAAPi from "@/api/circRNA.js";
const columns = [
  {
    title: "基因ID",
    dataIndex: "geneId"
  },
  {
    title: "基因名称",
    dataIndex: "name"
    // scopedSlots: { customRender: "name" }
  },
  {
    title: "基因类型",
    dataIndex: "geneType"
  },
   {
    title: "别名",
    dataIndex: "alias"
  }
];

export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: null,
        keyword: null
      },
      queryParam: {
        page: 0,
        size: 10,
        sort: null,
        keyword: null,
        categoryId: null,
        status: null
      },
      data: [],
      loading: false,
      columns
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
      circRNAAPi.page(this.queryParam).then(resp => {
        // console.log(resp);

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    updateProject(id) {
      this.$router.push({
        name: "cancer_cancer_study",
        query: { projectId: id }
      });
    },
    delProject(id) {
      circRNAAPi.del(id).then(resp => {
        this.$notification["success"]({
          message: resp.data.data.name + ":删除成功!"
        });
        this.loadData();
      });
    },
    detial(id) {
      this.$router.push({
        name: "cancer_cancer_study",
        query: { studyId: id }
      });
    },
    onSearch(value) {
      this.pagination.keyword = value;
      this.loadData();
    //   console.log(value);
    }
  }
};
</script>
