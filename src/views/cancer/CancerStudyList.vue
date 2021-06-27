<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <div slot="name" slot-scope="name,record">
        <a href="javascript:;" @click="detial(record.id)">{{record}}</a>
      </div> -->
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
import CancerStudyAPi from "@/api/CancerStudy.js";
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "癌症名称",
    dataIndex: "cancer.name",
    // scopedSlots: { customRender: "cancer" }
  },
   {
    title: "英文名称",
    dataIndex: "cancer.enName",
    // scopedSlots: { customRender: "cancer" }
  },
  {
    title: "研究名称",
    dataIndex: "study.name"
  },
    {
    title: "英文名称",
    dataIndex: "study.enName",
    // scopedSlots: { customRender: "cancer" }
  },{
    title: "数据来源",
    dataIndex: "dataOrigin.name"
  },
    {
    title: "英文名称",
    dataIndex: "dataOrigin.enName",
    // scopedSlots: { customRender: "cancer" }
  },
  {
    title: "资源路径",
    dataIndex: "networkPath"
  },
  {
    title: "创建日期",
    dataIndex: "createDate"
  }
  //   {
  //     title: "截止日期",
  //     dataIndex: "deadline"
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     fixed: "right",
  //     //   width: 200,
  //     scopedSlots: { customRender: "action" }
  //   }
];

export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: null
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
      columns,
      cancerId:null
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

      this.queryParam.cancerId = cancerId
      this.queryParam.studyId = studyId
      this.queryParam.dataOriginId = dataOriginId
      
      this.loading = true;
      CancerStudyAPi.page(this.queryParam).then(resp => {
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
      CancerStudyAPi.del(id).then(resp => {
        this.$notification["success"]({
          message: resp.data.data.name + ":删除成功!"
        });
        this.loadData();
      });
    },
    detial(id) {
      this.$router.push({
        name: "cancer_cancer_study",
        query: { cancerId: id }
      });
    }
  }
};
</script>
