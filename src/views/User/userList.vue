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
      <div v-if="cur_user">
        {{ cur_user }}
      </div>
      <div>
        <a-select size="default" style="width: 200px" v-model="selectedRole">
          <a-select-option v-for="item in roles" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-button @click="addUserRole">确认</a-button>
        <a-table
          :columns="roleListColumns"
          :data-source="roleList"
          bordered
          :pagination="false"
          :row-key="(record) => record.id"
        >
        </a-table>
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
import UserApi from "@/api/User.js";
import RoleApi from "@/api/role.js";
import UserRoleApi from "@/api/UserRole.js";
const roleListColumns = [
  {
    title: "id",
    dataIndex: "id",
  }, {
    title: "name",
    dataIndex: "name",
  }, {
    title: "enName",
    dataIndex: "enName",
  },
];
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "username",
    dataIndex: "username",
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
      cur_user: undefined,
      roles: [],
      roleList: [],
      selectedRole: "",
      roleListColumns,
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
      UserApi.page(this.queryParam).then((resp) => {
        // console.log(resp);
        // console.log(resp.data.data.totalPages);
        this.data = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
        this.loading = false;
      });
    },
    loadRole(id) {
      RoleApi.findByRoleId(id).then((resp) => {
        this.roleList = resp.data.data;
        // console.log(resp)
      });
    },
    showDrawer(data) {
      this.cur_user = data;
      this.visible = true;
      RoleApi.listAll().then((resp) => {
        // console.log(resp);
        this.roles = resp.data.data;
      });
      this.loadRole(data.id)
    },
    onClose() {
      this.visible = false;
    },
    handleChange() {},
    addUserRole() {
      // console.log(this.selectedRole)
      // console.log(this.cur_user.id)
      UserRoleApi.add({
        userId: this.cur_user.id,
        roleId: this.selectedRole,
      }).then((resp) => {
        this.loadRole(this.cur_user.id)
        this.$notification["success"]({
          message: "添加成功" + resp.data.message,
        });
      });
    },
  },
};
</script>
