<template>
  <div>
    <a-drawer
      title="用户管理"
      placement="right"
      :closable="false"
      :visible="visible"
      width="620"
      @close="onClose"
    >
      <div v-if="cur_resource">
        <!-- {{ cur_resource }} -->
      </div>
      <div>
        <a-select
          size="default"
          style="width: 200px"
          v-model="selectedRole"
          :filter-option="filterOption"
          show-search
        >
          <a-select-option v-for="item in roles" :key="item.id">
            {{ item.name}}
          </a-select-option>
        </a-select>
        <a-button @click="addRoleResource">确认</a-button>
        <div>
          <!-- {{ resourcesList }} -->
          <a-table
            :columns="roleListColumns"
            :data-source="roleList"
            bordered
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <span slot="action" slot-scope="text, record">
              <a-divider type="vertical" />
              <a href="javascript:;" @click="delRoleResource(record)">删除</a>
            </span>
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
const roleListColumns = [
  {
    title: "id",
    dataIndex: "id",
  },{
    title: "name",
    dataIndex: "name",
  },
   {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
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
    title: "url",
    dataIndex: "url",
  },
  {
    title: "method",
    dataIndex: "method",
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
      cur_resource: undefined,
      selectedRole: undefined,
      roleList: [],
      roles:[],
      roleListColumns
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
      ResourceApi.page(this.queryParam).then((resp) => {
        // console.log(resp);
        // console.log(resp.data.data.totalPages);
        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    loadResource(id) {
      RoleApi.findByRoleId(id).then((resp) => {
        this.roleList = resp.data.data;
        // console.log(resp)
      });
    },
    loadWithoutAddResource(id) {
      RoleApi.findByWithoutRoleId(id).then((resp) => {
        // console.log(resp);
        this.roles = resp.data.data;
      });
    },
    showDrawer(data) {
      this.cur_resource = data;
      this.visible = true;
      this.loadResource(data.id);
      this.loadWithoutAddResource(this.cur_resource.id);
    },
    onClose() {
      this.visible = false;
    },
    addRoleResource() {
      // console.log(this.selectedRole)
      // console.log(this.cur_user.id)
      RoleResourceApi.add({
        roleId: this.selectedRole,
        resourceId: this.cur_resource.id,
      }).then((resp) => {
        this.loadResource(this.cur_resource.id);
        this.loadWithoutAddResource(this.cur_resource.id);
        this.$notification["success"]({
          message: "添加成功" + resp.data.message,
        });
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    delRoleResource(data) {
      // console.log(data);
      RoleResourceApi.del(data.resourceRoleId).then((resp) => {
        this.loadResource(this.cur_resource.id);
        this.loadWithoutAddResource(this.cur_resource.id);
        this.$notification["success"]({
          message: "删除成功" + resp.data.message,
        });
      });
    },
  },
};
</script>
