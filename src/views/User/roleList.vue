<template>
  <div>
    <a-button type="primary" @click="addUser"> 添加角色</a-button>
    <a-modal v-model="modal_visible" title="Basic Modal" @ok="handleOk">
      <a-form-model ref="ruleForm" :model="form">
        <a-form-model-item ref="name" label="name" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item ref="enName" label="enName" prop="enName">
          <a-input v-model="form.enName" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-drawer
      title="用户管理"
      placement="right"
      :closable="false"
      :visible="visible"
      width="620"
      @close="onClose"
    >
      <div v-if="cur_role">
        <!-- {{ cur_role }} -->
      </div>
      <div>
        <a-select
          size="default"
          style="width: 200px"
          v-model="selectedRsource"
          :filter-option="filterOption"
          show-search
        >
          <a-select-option v-for="item in resources" :key="item.id">
            {{ [item.method] + item.url }}
          </a-select-option>
        </a-select>
        <a-button @click="addRoleResource">确认</a-button>
        <div>
          <!-- {{ resourcesList }} -->
          <a-table
            :columns="resourcesListColumns"
            :data-source="resourcesList"
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
        <a-divider type="vertical" />
        <a href="javascript:;" @click="delRole(record.id)">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="updateRole(record)">更新</a>
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
const resourcesListColumns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "method",
    dataIndex: "method",
  },
  {
    title: "url",
    dataIndex: "url",
  },
  {
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
      modal_visible: false,
      cur_role: undefined,
      resources: [],
      resourcesList: [],
      selectedRsource: "",
      resourcesListColumns,
      form: {},
      isUpdate: false,
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
    loadWithoutAddResource(id) {
      ResourceApi.findByWithoutRoleId(id).then((resp) => {
        // console.log(resp);
        this.resources = resp.data.data;
      });
    },
    showDrawer(data) {
      this.cur_role = data;
      this.visible = true;
      this.loadResource(data.id);
      this.loadWithoutAddResource(this.cur_role.id);
    },
    onClose() {
      this.visible = false;
    },
    addRoleResource() {
      // console.log(this.selectedRole)
      // console.log(this.cur_user.id)
      RoleResourceApi.add({
        roleId: this.cur_role.id,
        resourceId: this.selectedRsource,
      }).then((resp) => {
        this.loadResource(this.cur_role.id);
        this.loadWithoutAddResource(this.cur_role.id);
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
        this.loadResource(this.cur_role.id);
        this.loadWithoutAddResource(this.cur_role.id);
        this.$notification["success"]({
          message: "删除成功" + resp.data.message,
        });
      });
    },
    handleOk() {
      if (this.isUpdate) {
        // console.log(this.form);
        RoleApi.update(this.form.id, this.form).then((resp) => {
          this.modal_visible = false;
          // console.log(resp)
          this.loadData();
          this.from = {};
          this.$notification["success"]({
            message: "更新成功" + resp.data.message,
          });
        });
      } else {
        // console.log(this.form);
        RoleApi.add(this.form).then((resp) => {
          this.modal_visible = false;
          // console.log(resp)
          this.loadData();
          this.from = {};
          this.$notification["success"]({
            message: "添加成功" + resp.data.message,
          });
        });
      }
    },
    delRole(id) {
      // console.log(data);
      RoleApi.del(id).then((resp) => {
        this.loadData();
        this.$notification["success"]({
          message: "删除成功" + resp.data.message,
        });
      });
    },
    addUser() {
      this.modal_visible = true;
      this.isUpdate = false;
    },
    updateRole(data) {
      this.form = data;
      this.modal_visible = true;
      this.isUpdate = true;
    },
  },
};
</script>
