<template>
  <div>
    <a-form-model-item label="项目状态" prop="projectStatus">
      <a-select default-value="-1" placeholder="选择项目状态" @change="handleChange">
        <a-select-option value="-1">全部</a-select-option>
        <a-select-option
          :value="item.key"
          v-for="item in projectStatuses"
          :key="item.key"
        >{{item.value}}</a-select-option>
      </a-select>
    </a-form-model-item>
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
            @showSizeChange="handlePageChange"
            @change="handlePageChange"
          />
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import ProjectAPi from "@/api/Project.js";
import ENUMApi from "@/api/ENUM.js";
const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id"
  // },
  {
    title: "项目名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "项目状态",
    dataIndex: "projectStatus"
  },
  {
    title: "创建者",
    dataIndex: "user.username"
  },
  {
    title: "创建日期",
    dataIndex: "createDate",
     sorter: true,
  },
  {
    title: "截止日期",
    dataIndex: "deadline",
    sorter: true,
    // sortDirections: ['ASC', 'ascend'],
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    //   width: 200,
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        sort: "createDate",
        direction:"DESC",
      },
      queryParam: {
        // page: 1,
        // size: 10,
        // sort: null,
        // keyword: null,
        // categoryId: null,
        // status: null
      },
      data: [],
      loading: false,
      columns,
      projectStatuses: []
    };
  },
  mounted() {
    this.laodStatus();
    this.loadData();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const order = sorter.order
      const field = sorter.field
      this.pagination.sort = field;
      if(order=="ascend"){
        this.pagination.direction ="ASC" ;
      }else{
         this.pagination.direction ="DESC"
      }
     
       this.loadData();
    },

    handlePageChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadData();
    },
    loadData(projectStatus) {
      this.queryParam.page = this.pagination.page - 1;
      this.queryParam.size = this.pagination.size;
      this.queryParam.sort = this.pagination.sort+","+this.pagination.direction;
      // this.queryParam.direction=this.pagination.direction;
      if (projectStatus != -1) {
        this.queryParam.projectStatus = projectStatus;
      } else {
        this.queryParam.projectStatus = null;
      }

      this.loading = true;
      ProjectAPi.page(this.queryParam).then(resp => {
        // console.log(resp);

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    laodStatus() {
      ENUMApi.projectStatuses().then(resp => {
        this.projectStatuses = resp.data.data;
        // console.log(resp.data.data)
      });
    },
    updateProject(id) {
      this.$router.push({
        name: "Project_update",
        query: { projectId: id }
      });
    },
    delProject(id) {
      ProjectAPi.del(id).then(resp => {
        this.$notification["success"]({
          message: resp.data.data.name + ":删除成功!"
        });
        this.loadData();
      });
    },
    detial(id) {
      this.$router.push({
        name: "Project_detial",
        query: { projectId: id }
      });
    },
    handleChange(value) {
      this.loadData(value);
      // console.log(`selected ${value}`);
    }
  }
};
</script>
