<template>
  <div>
    <!-- <input type="file" multiple="multiple" id="fileExport" @change="handleFileChange" ref="inputer" /> -->
    <a-row type="flex" justify="end">
      <a-col :span="4">
        <a-button @click="refresh">刷新</a-button>
      </a-col>
    </a-row>

    <a-divider />
    <a-descriptions :title="data.name" bordered>
      <!-- <a-descriptions-item label="创建时间">
      2018-04-24 18:00:00
    </a-descriptions-item>
    <a-descriptions-item label="更新时间">
      Prepaid
    </a-descriptions-item>
    <a-descriptions-item label="截止时间">
      YES
      </a-descriptions-item>-->
      <a-descriptions-item label="项目创建人" :span="1">{{data.user?data.user.username:""}}</a-descriptions-item>
      <a-descriptions-item label="项目责任人" :span="2">
        <span v-for="item in data.chargePerson" :key="item.id">
          {{item.username}}
          <a-divider type="vertical" />
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">{{moment(data.createDate, "YYYY-MM-DD HH:mm:ss").fromNow()}}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{moment(data.updateDate, "YYYY-MM-DD HH:mm:ss").fromNow()}}</a-descriptions-item>
      <a-descriptions-item label="截止时间">{{moment(data.deadline, "YYYY-MM-DD HH:mm:ss").fromNow()}}</a-descriptions-item>
      <a-descriptions-item label="完成状态" :span="3">
        <a-badge status="processing" :text="data.projectStatus" />
      </a-descriptions-item>
      <!-- <a-descriptions-item label="Discount">
      $20.00
    </a-descriptions-item>
    <a-descriptions-item label="Official Receipts">
      $60.00
      </a-descriptions-item>-->
      <a-descriptions-item label="jupyter结果报告" :span="3">
        <a :href="data.jupyterUrl" target="_blank">{{data.jupyterUrl}}</a>
      </a-descriptions-item>

      <!-- <a-descriptions-item label="生成图片" :span="3">{{data.description}}</a-descriptions-item> -->
      <a-descriptions-item label="项目描述" :span="3">{{data.description}}</a-descriptions-item>
      <a-descriptions-item label="项目内容" :span="3">
        <a-row type="flex" justify="end">
          <a-col :span="4">
            <a-button @click="content(data.id)">编辑</a-button>
          </a-col>
        </a-row>
        <p v-html="data.formatContent"></p>
      </a-descriptions-item>
      <a-descriptions-item label="附件" :span="3">
        <a-row type="flex" justify="end">
          <a-col :span="4">
            <a-upload :customRequest="handleFileChange">
              <a-button>
                <a-icon type="upload" />上传附件
              </a-button>
            </a-upload>
          </a-col>
        </a-row>

        <a-tag v-for="item in attachments" :key="item.id">
          <a target="_blank" :href="attachmentPath(item.path)">{{item.fileName}}</a>
          <a-icon type="close" @click="delAttachment(item.id)" />
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>

    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item prop="content_rule">
          <a-textarea :rows="4" v-model="comment_value" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" @click="Submit">添加评论</a-button>
        </a-form-item>
      </div>
    </a-comment>

    <a-comment v-for="item in comments" :key="item.id">
      <template slot="actions">
        <!-- <span key="comment-basic-like">
          <a-tooltip title="Like">
            <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">{{ likes }}</span>
        </span>-->
        <!-- <span key="comment-basic-dislike"> -->
        <!-- <a-tooltip title="Dislike">
            <a-icon
              type="dislike"
              :theme="action === 'disliked' ? 'filled' : 'outlined'"
              @click="dislike"
            />
        </a-tooltip>-->
        <!-- <span style="padding-left: '8px';cursor: 'auto'">{{ dislikes }}</span> -->
        <!-- </span> -->
        <span key="comment-basic-reply-to">回复</span>
        <span key="comment-basic-reply-to" @click="del(item.id)">删除</span>
      </template>
      <a slot="author">{{item.user.username }}</a>
      <a-avatar slot="avatar" :src="item.user.avatar" alt="Han Solo" />
      <p slot="content">{{item.content}}</p>
      <a-tooltip slot="datetime">
        <span>{{moment(item.updateDate, "YYYY-MM-DD HH:mm:ss").fromNow() }}</span>
      </a-tooltip>
    </a-comment>
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
  </div>
</template>
<script>
import ProjectAPi from "@/api/Project.js";
import CommentApi from "@/api/comment.js";
import AttachmentApi from "@/api/attachment.js";
import moment from "moment";

export default {
  data() {
    return {
      projectId: null,
      comment_value: "",
      data: {},
      comments: [],
      moment,
      attachments: [],
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
      rules: {
        content_rule: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ]
      },
      Attachment_base_url: ""
    };
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    // Get post id from query
    const projectId = to.query.projectId;

    next(vm => {
      if (projectId) {
        vm.projectId = projectId;
        vm.loadProject(projectId);
      }
    });
  },
  mounted() {
    this.loadComment();
    this.loadAttachment();
    let global_config = JSON.parse(localStorage.getItem("global_config"));
    this.Attachment_base_url = global_config.Attachment_base_url;
  },
  methods: {
    loadAttachment() {
      const projectId = this.$route.query.projectId;
      AttachmentApi.listByPId(projectId).then(resp => {
        // console.log(resp);
        this.attachments = resp.data.data;
      });
    },
    handleTableChange(page, pageSize) {
      this.pagination.page = page;
      this.pagination.size = pageSize;
      this.loadComment();
    },
    loadProject(projectId) {
      ProjectAPi.findById(projectId).then(response => {
        const project = response.data.data;
        // console.log(project);
        this.data = project;
      });
    },
    loadComment() {
      this.queryParam.page = this.pagination.page - 1;
      this.queryParam.size = this.pagination.size;
      this.queryParam.sort = this.pagination.sort;

      const projectId = this.$route.query.projectId;
      CommentApi.pageByPId(projectId, this.queryParam).then(resp => {
        this.comments = resp.data.data.content;
        this.pagination.total = parseInt(resp.data.data.totalElements);
      });
    },
    Submit() {
      const projectId = this.$route.query.projectId;
      CommentApi.add({
        projectId: projectId,
        content: this.comment_value
      }).then(resp => {
        this.$notification["success"]({
          message: "评论添加成功!" + resp.data.message
        });
        this.loadComment();
        this.comment_value = "";
      });
    },
    del(id) {
      CommentApi.del(id).then(resp => {
        this.$notification["success"]({
          message: "评论删除成功!" + resp.data.message
        });
        this.loadComment();
      });
    },
    delAttachment(id) {
      let loadAttachment = this.loadAttachment;
      let notification = this.$notification["success"];
      this.$confirm({
        title: "删除附件",
        content: "您确定要删除该附件吗",
        onOk() {
          AttachmentApi.del(id).then(resp => {
            loadAttachment();
            notification({
              message: "附件删除成功!" + resp.data.message
            });
          });
        },
        onCancel() {}
      });
    },
    content(id) {
      this.$router.push({
        name: "Project_content",
        query: { projectId: id }
      });
    },
    refresh() {
      this.loadProject(this.data.id);
      this.loadComment();
      this.loadAttachment();
    },
    attachmentPath(item) {
      // console.log(this.Attachment_base_url);
      // console.log()
      if(item.substring(0,4)=="http"){
        return item;
      }else{
         return this.Attachment_base_url+"/"+item;
      }
     
    },
    handleFileChange(options) {
      // console.log(data);
      // let inputDOM = this.$refs.inputer;

      // this.file = inputDOM.files[0]; // 通过DOM取文件数据

      // // let size = Math.floor(this.file.size / 1024); //计算文件的大小
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", options.file); //将file属性添加到formData里
      this.formData.append("projectId", this.data.id);
      // this.formData.append("name", "sss");
      // console.log(inputDOM.files);
      // console.log(this.formData);
      // AttachmentApi.uploadFiles(this.data.id, this.formData).then(resp => {
      //   console.log(resp);
      // });

      AttachmentApi.upload(this.formData).then(resp => {
        // console.log(resp);
        options.onSuccess(resp, options.file);
        this.loadAttachment();
        progress.percent = 99;
      });

      let progress = { percent: 1 };
      let speed = 100 / (options.file.size / 65000);
      const intervalId = setInterval(() => {
        if (progress.percent < 100) {
          progress.percent += speed;
          options.onProgress(progress);
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    }
  }
};
</script>