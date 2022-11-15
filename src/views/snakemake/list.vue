<template>
  <div>

    <a-modal :visible="modelVisible" title="Basic Modal" @ok="modelHandleOk">
      <p>{{entity.input}}</p>
      <p>{{entity.output}}</p>
    </a-modal>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <div slot="name" slot-scope="name,record">
        <a href="javascript:;" @click="detial(record.id)">{{name}}</a>
      </div> -->
      <span slot="action" slot-scope="text, record">
        <!-- <a href="javascript:;">Invite 一 {{record.name}}</a>
        <a-divider type="vertical" />-->
        <!-- <a href="javascript:;" @click="generateHtml(record.id)">生成HTML</a> -->
        <!-- <a-divider type="vertical" /> -->
        <a href="javascript:;" @click="show(record.id)">查看</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateData(record.id)">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delData(record.id)">删除</a>
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
import dataAPi from "@/api/snakemake.js";
import ENUMApi from "@/api/ENUM.js";
const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id"
  // },
  {
    title: "rule name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "创建日期",
    dataIndex: "createDate",
     sorter: true,
  },
  // {
  //   title: "截止日期",
  //   dataIndex: "deadline",
  //   sorter: true,
  //   // sortDirections: ['ASC', 'ascend'],
  // },
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
      modelVisible:false,
      data: [],
      entity:{},
      loading: false,
      columns,
      projectStatuses: []
    };
  },
  mounted() {
    // this.laodStatus();
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
    loadData() {
      this.queryParam.page = this.pagination.page - 1;
      this.queryParam.size = this.pagination.size;
      this.queryParam.sort = this.pagination.sort+","+this.pagination.direction;
      // this.queryParam.direction=this.pagination.direction;
      // if (projectStatus != -1) {
      //   this.queryParam.projectStatus = projectStatus;
      // } else {
      //   this.queryParam.projectStatus = null;
      // }

      this.loading = true;
      dataAPi.page(this.queryParam).then(resp => {
        // console.log(resp);

        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },show(id){
      dataAPi.findById(id).then(resp=>{
        // console.log(resp)
        this.entity=resp.data.data
        this.modelVisible=true
      })
    },modelHandleOk(){
      this.modelVisible= false;
    },
    laodStatus() {
      ENUMApi.projectStatuses().then(resp => {
        this.projectStatuses = resp.data.data;
        // console.log(resp.data.data)
      });
    },
    updateData(id) {
      this.$router.push({
        name: "snakemake_add",
        query: { id: id }
      });
    },
    delData(id) {
      dataAPi.del(id).then(resp => {
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
