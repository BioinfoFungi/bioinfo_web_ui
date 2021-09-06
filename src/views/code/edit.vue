<template>
  <a-row :gutter="12">
    <a-col :span="6">
      <a-card :bodyStyle="{ padding: '16px', overflow: 'auto' }">
        <a-select
          show-search
          placeholder="Select a person"
          option-filter-prop="children"
          style="width: 250px"
          @focus="cancerStudyFocus"
          @search="cancerStudySearch"
        >
          <a-select-option
            :value="item.enName"
            v-for="item in cancerStudy"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <theme-file
          v-if="files"
          :files="files"
          @listenToSelect="handleSelectFile"
        />
      </a-card>
    </a-col>

    <a-col :span="18">
      <a-button>运行</a-button>
      <a-button @click="save">保存</a-button>
      <a-card :bodyStyle="{ padding: '16px' }">
        <a-form layout="vertical">
          <a-form-item>
            <codemirror
              v-model="content"
              :options="codemirrorOptions"
            ></codemirror>
          </a-form-item>
          <!-- <a-form-item>
            <ReactiveButton
              @click="handlerSaveContent"
              @callback="saveErrored = false"
              :loading="saving"
              :errored="saveErrored"
              :disabled="buttonDisabled"
              text="保存"
              loadedText="保存成功"
              erroredText="保存失败"
            ></ReactiveButton>
          </a-form-item> -->
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
// @ is an alias to /src
import CodeAPi from "@/api/code.js";
import ThemeFile from "./components/ThemeFile";
import { codemirror } from "vue-codemirror-lite";

export default {
  components: {
    ThemeFile,
    codemirror,
  },
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      files: [],
      file: undefined,
      content: "",
      cancerStudy: [],
      codemirrorOptions: {
        tabSize: 4,
        mode: "text/html",
        lineNumbers: true,
        line: true,
      },
    };
  },
  mounted() {
    this.loadFiles();
  },
  methods: {
    loadFiles() {
      CodeAPi.files().then((resp) => {
        this.files = resp.data.data;
        // console.log(this.files);
      });
    },
    loadCancerStudy() {},
    handleSelectFile(file) {
      // const _this = this;
      if (!file.editable) {
        this.$message.info("该文件不支持修改！");
        this.content = "";
        this.file = {};
        this.buttonDisabled = true;
        return;
      }
      // if (
      //   file.name === "settings.yaml" ||
      //   file.name === "settings.yml" ||
      //   file.name === "theme.yaml" ||
      //   file.name === "theme.yml"
      // ) {
      //   this.$confirm({
      //     title: "警告：请谨慎修改该配置文件",
      //     content: "修改之后可能会产生不可预料的问题！",
      //     onCancel() {
      //       _this.content = "";
      //       _this.file = {};
      //       _this.buttonDisabled = true;
      //     },
      //   });
      // }
      CodeAPi.getContent(file.path).then((resp) => {
        this.content = resp.data.data;
        this.file = file;
        // console.log(this.file);
        // this.buttonDisabled = false;
      });
      // themeApi.getContent(this.selectedTheme.id, file.path).then((response) => {

      // });
    },
    cancerStudyFocus() {
      this.loadCancerStudy();
    },
    cancerStudySearch(input) {
      this.loadCancerStudy({ keyword: input });
    },
    save() {
      CodeAPi.saveContent({ path: this.file.path, content: this.content }).then(
        (resp) => {
          this.$notification["success"]({
            message: "保存成功!" + resp.data.message,
          });
        }
      );
    },
  },
};
</script>
<style>
.home {
  margin: 20px;
}
</style>