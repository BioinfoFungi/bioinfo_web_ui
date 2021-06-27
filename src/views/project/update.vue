<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="项目名称" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>

    <a-form-model-item label="项目负责人">
      <a-select
        v-decorator="[
          'select-multiple',
          {
            rules: [
              { required: true, message: '选择一个或多个责任人！', type: 'array' },
            ],
          },
        ]"
        mode="multiple"
        v-model="form.userIds"
        placeholder="选择一个或多个责任人！"
      >
        <a-select-option :value="item.id" v-for=" item in users" :key="item.id">{{item.username}}</a-select-option>
        <!-- <a-select-option value="green">
          Green
        </a-select-option>
        <a-select-option value="blue">
          Blue
        </a-select-option>-->
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="项目状态" prop="projectStatus">
      <a-select v-model="form.projectStatus" placeholder="please select your zone">
        <a-select-option
          :value="item.key"
          v-for="item in projectStatuses"
          :key="item.key"
        >{{item.value}}</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="项目截止日期" required prop="deadline">
      <a-date-picker
        v-model="form.deadline"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%;"
      />
    </a-form-model-item>

    <!-- <a-form-model-item label="Instant delivery" prop="delivery">
      <a-switch v-model="form.delivery" />
    </a-form-model-item>-->
    <!-- <a-form-model-item label="Activity type" prop="type">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="1" name="type">
          Online
        </a-checkbox>
        <a-checkbox value="2" name="type">
          Promotion
        </a-checkbox>
        <a-checkbox value="3" name="type">
          Offline
        </a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>-->
    <!-- <a-form-model-item label="Resources" prop="resource">
      <a-radio-group v-model="form.resource">
        <a-radio value="1">
          Sponsor
        </a-radio>
        <a-radio value="2">
          Venue
        </a-radio>
      </a-radio-group>
    </a-form-model-item>-->
    <a-form-model-item label="项目报告URL">
      <a-input v-model="form.jupyterUrl" />
    </a-form-model-item>

    <a-form-model-item label="项目描述" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">更新项目</a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import ProjectAPi from "@/api/Project.js";
import ENUMApi from "@/api/ENUM.js";
import UserAPi from "@/api/User.js";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      projectId: null,
      value: null,
      projectStatuses: [],
      users: [],
      form: {
        name: "",
        // region: undefined,
        deadline: undefined,
        projectStatus: null,
        userIds: [],
        // delivery: false,
        // type: [],
        // resource: '',
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
          //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        projectStatus: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        deadline: [
          { required: true, message: "请选择一个截止日期", trigger: "change" }
        ],
        // type: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: 'Please select at least one activity type',
        //     trigger: 'change',
        //   },
        // ],
        // resource: [
        //   { required: true, message: 'Please select activity resource', trigger: 'change' },
        // ],
        description: [
          { required: true, message: "请输入项目描述", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    ENUMApi.projectStatuses().then(resp => {
      var projectStatus = resp.data.data.find(
        x => x.value == this.form.projectStatus
      );
      resp.data.data.projectStatus = projectStatus;
      this.projectStatuses = resp.data.data;
    });
    UserAPi.listAll().then(resp => {
      // console.log(resp)
      this.users = resp.data.data;
    });
  },
  beforeRouteEnter(to, from, next) {
    // Get post id from query
    const projectId = to.query.projectId;

    next(vm => {
      if (projectId) {
        vm.projectId = projectId;
        ProjectAPi.findById(projectId).then(response => {
          const project = response.data.data;
          // console.log(project);
          vm.form = project;
        });
      }
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var deadline = this.form.deadline;
          // console.log()
          // console.log(deadline.substr(deadline.length-1,deadline.length))
          if (deadline._d) {
            this.form.deadline = this.form.deadline.format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }

          ProjectAPi.update(this.projectId, this.form).then(resp => {
            this.$notification["success"]({
              message: "项目更新成功!" + resp.data.message
            });
            this.$router.push("/project/list");
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>