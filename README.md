# bioinfo-ant-ui
https://www.antdv.com/docs/vue/getting-started-cn/


# 组件设计
```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```
# 分页模板
```
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
import DEGAPi from "@/api/DEG.js";
const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     sorter: true,
  //     width: "20%",
  //     scopedSlots: { customRender: "name" }
  //   },
  //   {
  //     title: "Gender",
  //     dataIndex: "gender",
  //     filters: [
  //       { text: "Male", value: "male" },
  //       { text: "Female", value: "female" }
  //     ],
  //     width: "20%"
  //   },
  {
    title: "id",
    dataIndex: "id"
  }
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
      DEGAPi.page(this.queryParam).then(resp => {
        console.log(resp);
        console.log(resp.data.data.totalPages);
        this.data = resp.data.data.content;
        this.pagination.total = resp.data.data.totalPages;
        this.loading = false;
      });
    },
  }
};
</script>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
