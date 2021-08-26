<template>
  <div>
    <a-drawer
      title="用户管理"
      placement="right"
      :closable="false"
      :visible="visible"
      width="520"
      @close="onClose"
    >
      <div v-if="cur_role">
        {{ cur_role }}
      </div>
      <div>
        <a-select size="default" style="width: 200px" v-model="selectedRsource">
          <a-select-option v-for="item in resources" :key="item.id">
            {{ item.url }}
          </a-select-option>
        </a-select>
        <a-button @click="addUserRole">确认</a-button>
        <div>
          <!-- {{ resourcesList }} -->
          <a-table
            :columns="resourcesListColumns"
            :data-source="resourcesList"
            bordered
            :pagination="false"
            :row-key="(record) => record.id"
          >
          </a-table>
        </div>
      </div>
    </a-drawer>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a-divider type="vertical" />
        <a href="javascript:;" @click="showDrawer(record)">更多</a>
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
import RoleApi from "@/api/role.js";
import ResourceApi from "@/api/resource.js";
import RoleResourceApi from "@/api/RoleResource.js";
const resourcesListColumns=[
   {
    title: "id",
    dataIndex: "id",
  }, {
    title: "url",
    dataIndex: "url",
  },{
    title: "name",
    dataIndex: "name",
  },
]
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "enName",
    dataIndex: "enName",
  },
  {
    title: "Action",
    key: "action",
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
      cur_role: undefined,
      resources: [],
      resourcesList: [],
      selectedRsource: "",
      resourcesListColumns
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
      this.loading = true;
      RoleApi.page(this.queryParam).then((resp) => {
        // console.log(resp);
        // console.log(resp.data.data.totalPages);
        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    loadResource(id) {
      ResourceApi.findByRoleId(id).then((resp) => {
        this.resourcesList = resp.data.data;
        // console.log(resp)
      });
    },
    showDrawer(data) {
      this.cur_role = data;
      this.visible = true;
      ResourceApi.listAll().then((resp) => {
        // console.log(resp);
        this.resources = resp.data.data;
      });
      this.loadResource(data.id);
    },
    onClose() {
      this.visible = false;
    },
    handleChange() {},
    addUserRole() {
      // console.log(this.selectedRole)
      // console.log(this.cur_user.id)
      RoleResourceApi.add({
        roleId: this.cur_role.id,
        resourceId: this.selectedRsource,
      }).then((resp) => {
        this.loadResource(this.cur_role.id)
        this.$notification["success"]({
          message: "添加成功" + resp.data.message,
        });
      });
    },
  },
};
</script>
