<template>
  


  <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item ref="name" label="rule name" prop="name">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item ref="input" label="rule input" prop="input">
      <a-input v-model="form.input" type="textarea" />
    </a-form-model-item>
    <a-form-model-item ref="output" label="rule output" prop="output">
      <a-input v-model="form.output" type="textarea" />
    </a-form-model-item>
    <!-- 
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
        format="YYYY-MM-DD HH:mm:ss"
        v-model="form.deadline"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%;"
      />
    </a-form-model-item> -->

    <!-- <a-form-model-item label="Instant delivery" prop="delivery">
      <a-switch v-model="form.delivery" />
    </a-form-model-item>-->

    <!-- <a-form-model-item  label="项目报告URL" >
      <a-input v-model="form.jupyterUrl" />
    </a-form-model-item> -->

    <a-form-model-item label="项目描述" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">创建项目</a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import dataAPi from "@/api/snakemake.js";
import ENUMApi from "@/api/ENUM.js";
import UserAPi from "@/api/User.js";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      projectStatuses: [],
      value: null,
      users: [],
      form: {
        input: "",
        output:"",
        description: "",
        name:"",
      },
      rules: {
        name: [
          { required: true, message: "请输入rule name", trigger: "blur" }
          //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        input: [
          { required: true, message: "请输入rule input", trigger: "blur" }
          //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        output: [
          { required: true, message: "请输入rule output", trigger: "blur" }
          //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        description: [
          { required: true, message: "请输入项目描述", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    ENUMApi.projectStatuses().then(resp => {
      this.projectStatuses = resp.data.data;
      // console.log(resp.data.data)
    });
    UserAPi.listAll().then(resp => {
      // console.log(resp)
      this.users = resp.data.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.form.deadline = this.form.deadline.format("YYYY-MM-DD HH:mm:ss");
          console.log(this.form);

          dataAPi.add(this.form).then(resp => {
            this.$notification["success"]({
              message: "创建成功!" + resp.data.message
            });
            this.$router.push("/snakemake/list");
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