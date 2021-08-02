<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
       :scroll="{ x: 'calc(700px + 50%)' }"
    >
      <div slot="status" slot-scope="status">
        <a href="javascript:;">{{status}}</a>
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
//   {
//     title: "癌症名称",
//     dataIndex: "cancer.name"
//     // scopedSlots: { customRender: "cancer" }
//   },
  {
    title: "癌症",
    dataIndex: "cancer.enName"
    // scopedSlots: { customRender: "cancer" }
  },
//   {
//     title: "研究名称",
//     dataIndex: "study.name"
//   },
  {
    title: "研究",
    dataIndex: "study.enName"
    // scopedSlots: { customRender: "cancer" }
  },
//   {
//     title: "数据来源",
//     dataIndex: "dataOrigin.name"
//   },
  {
    title: "数据库",
    dataIndex: "dataOrigin.enName"
    // scopedSlots: { customRender: "cancer" }
  },
   {
    title: "enName",
    dataIndex: "enName"
  },
  {
    title: "相对路径",
    dataIndex: "relativePath"
  },
    {
    title: "绝对路径",
    dataIndex: "absolutePath"
  },
   {
    title: "文件大小",
    dataIndex: "size"
  },
  {
    title: "文件状态",
    dataIndex: "status",
     scopedSlots: { customRender: "status" }
  }, {
    title: "文件下载次数",
    dataIndex: "times"
  
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
      data: [],
      loading: false,
      columns,
    };
  },
 
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const cancerId = this.$route.query.cancerId;
      this.loading = true;
      CancerStudyAPi.listByCancerId(cancerId).then(resp => {
        this.data = resp.data.data;
        this.loading = false;
      });
    }
  }
};
</script>
