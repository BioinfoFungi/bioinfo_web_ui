<template>
  <div>
    <a-row>
      <a-col :span="12" class="mr-1" style="padding-right: 0.5rem">
        <a-card :title="tool.name">
          <!-- <template #extra><a href="#">more</a></template> -->
          <!-- <a-input-number id="inputNumber" value="value" :min="1" :max="10" /> -->

          <!-- <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                        <a-form-item label="Note">
                            <a-input />
                        </a-form-item>
                        <a-form-item label="Activity zone">
                            <a-select placeholder="please select your zone">
                                <a-select-option value="shanghai">Zone one</a-select-option>
                                <a-select-option value="beijing">Zone two</a-select-option>
                            </a-select>
                        </a-form-item>



               
                        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                            <a-button type="primary" html-type="submit">
                                Submit
                            </a-button>
                        </a-form-item>
                    </a-form> -->
          <form-create
            :rule="rule"
            v-model="fApi"
            :option="options"
            :value.sync="inputParam"
          />
        </a-card>
      </a-col>
      <a-col :span="12" style="padding-left: 0.5rem">
        <a-card
          style="width: 100%"
          :tab-list="tabList"
          :active-tab-key="tabKey"
          @tabChange="(key) => onTabChange(key, 'tabKey')"
        >
          <!-- <span slot="customRender" slot-scope="item">
                        <a-icon type="home" />{{ item.key }}
                    </span> -->
          <div v-if="tabKey === 'tab1'">
            <div
              class="svgJson"
              v-for="(item, index) in task.svgJson"
              :key="index"
              v-html="item"
            ></div>
          </div>
          <div v-if="tabKey === 'sourceCode'">
            <a-textarea
              :value="task.generateCode"
              :auto-size="{ minRows: 15, maxRows: 20 }"
            >
            </a-textarea>
          </div>

          <div v-if="tabKey === 'matedata'">
            <p>metadata: {{ task.metadata }}</p>
            <p>matrix: {{ task.matrix }}</p>

            <div>
              <a-tag
                @click="tagClick('cancel')"
                :style="{ cursor: 'pointer' }"
                color="cyan"
              >
                取消选择
              </a-tag>
              <template v-for="tag in tags">
                <!-- <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag
                    :key="tag.key"
                    :closable="index !== 0"
                    @click="tagClick(tag)"
                    :style="{ cursor: 'pointer' }"
                    color="tag.key"
                    @close="() => handleClose(tag)"
                  >
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip> -->
                <a-tag
                  :color="tag.color"
                  :key="tag.name"
                  :closable="true"
                  :style="{ cursor: 'pointer' }"
                  @click="tagClick(tag)"
                  @close="() => handleClose(tag)"
                >
                  {{ tag.name }}
                </a-tag>
                <colorPicker
                  v-model="tag.color"
                  v-on:change="headleChangeColor(tag)"
                  :key="'-' + tag.name"
                />
              </template>
              <a-input
                v-if="inputVisible"
                ref="input"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="inputValue"
                @change="handleInputChange"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
              />
              <a-tag
                v-else
                style="background: #fff; borderstyle: dashed"
                @click="showInput"
              >
                <a-icon type="plus" /> New Group
              </a-tag>
            </div>

            <a-table
              :customRow="customRow"
              :columns="columns"
              :data-source="matedata"
              :pagination="false"
              :row-key="(record) => record.Sample"
              :scroll="{ x: 800, y: 300 }"
              class="matedata"
            >
              <!-- <template
                v-for="col in ['sample', 'group']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="
                      (e) => handleChange(e.target.value, record.key, col)
                    "
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template> -->

              <!-- <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => save(record.key)">保存 </a>
          
                  </span>
                  <span v-else>
                    <a
                      :disabled="editingKey !== ''"
                      @click="() => edit(record.key)"
                      >编辑
                    </a>
                  </span>
                  <span>
                    <a @click="() => del(record.key)">删除 </a>
                  </span>
                </div>
              </template> -->
            </a-table>
            <a-button @click="add">添加</a-button>
          </div>
          {{ contentList[tabKey] }}
        </a-card>

        <a-card style="width: 100%"> </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import TaskApi from "@/api/task.js";
import ToolsAPI from "@/api/tools.js";
import merge from "webpack-merge";
import { v4 } from "uuid";
// const columns = [
//     {
//         title: 'group',
//         dataIndex: 'group',
//         key: 'group',
//         scopedSlots: { customRender: 'group' },
//     }, {
//         title: 'operation',
//         dataIndex: 'operation',
//         scopedSlots: { customRender: 'operation' },
//     },
// ];

// const matedata = [
//     {
//         key: '1',
//         sample: 'John Brown',
//         group: 32,
//     },
//     {
//         key: '2',
//         sample: 'Jim Green',
//         group: 42,
//     },
//     {
//         key: '3',
//         sample: 'Joe Black',
//         group: 32,
//     },
// ];

export default {
  data() {
    return {
      matedata: [],
      editingKey: "",
      tabList: [
        {
          key: "tab1",
          tab: "实时预览",
          // scopedSlots: { tab: 'customRender' },
        },
        {
          key: "matedata",
          tab: "样本信息",
        },
        {
          key: "sourceCode",
          tab: "生成代码",
        },
        {
          key: "tab2",
          tab: "工具介绍",
        },
        {
          key: "tab3",
          tab: "详细说明",
        },
        {
          key: "tab4",
          tab: "常见问题",
        },
      ],
      contentList: {
        tab1: "",
        tab2: "content2",
      },
      selected: [],
      tabKey: "tab1",
      form: {},
      CRUD: "TOOLS",
      tool: {},
      groups: [],
      // receiveData: [],
      fApi: {},
      inputParam: {},
      formData: {},
      task: { id: -1 },
      leftAlignId: "",
      tags: [],
      tagColors: ["orange", "green", "yellow", "purple", "red"],
      inputVisible: false,
      inputValue: "",
      options: {
        onSubmit: (formData) => {
          // formData = JSON.stringify(formData)
        //   console.log(this.inputParam);
          this.addTask(this.tool.id, this.tool.codeId, formData);
        },
      },
      rule: [
        // {
        //     type: 'upload', field: 'upload', title: '上传', _fc_drag_tag: "upload", props: {
        //         action: "/upload.php",
        //         name: "pic",
        //         multiple: false,
        //         limit: 1,
        //         onSuccess: function (res, file) {
        //             file.url = res.data.filePath;
        //         }
        //     },
        // },
        {
          type: "a-upload",
          field: "matrix",
          title: "矩阵",
          children: [
            {
              type: "a-button",

              children: [
                {
                  type: "a-icon",
                  props: {
                    type: "upload",
                  },
                },
                "文件上传",
              ],
            },
          ],
          props: {
            name: "matrix",
            customRequest: this.customRequest,
          },
        },
        {
          type: "a-upload",
          field: "metadata",
          title: "样本信息",
          children: [
            {
              type: "a-button",

              children: [
                {
                  type: "a-icon",
                  props: {
                    type: "upload",
                  },
                },
                "文件上传",
              ],
            },
          ],
          props: {
            name: "metadata",
            customRequest: this.customRequest,
          },
        },
        // { type: 'input', field: 'title', title: 'title', value: 'PCA' },
        {
          type: "a-input-number",
          field: "lable_size",
          title: "标签大小",
          value: 3,
          props: { min: 1, max: 10 },
        },
        {
          type: "a-switch",
          field: "confidence_ellipse",
          title: "置信椭圆",
          value: true,
        },
      ],
    };
  },
  //   beforeRouteEnter(to, from, next) {
  //     // Get post id from query
  //     const toolId = to.query.toolId;
  //     const taskId = to.query.taskId;

  //     next((vm) => {

  //     });
  //   },
  computed: {
    columns() {
      let columns = [];
      if (this.task.metadataColumnNames) {
        let metadataColumnNames = JSON.parse(this.task.metadataColumnNames);
        metadataColumnNames.forEach((item) => {
          //   console.log(item);
          columns.push({
            title: item,
            dataIndex: item,
            key: item.Sample,
          });
        });
      }
      return columns;
    },
    // tags() {
    //   let tags = [
    //     { name: "取消选择", color: "cyan" },
    //     // { name: "control", key: "orange" },
    //     // { name: "treatment", key: "green" },
    //   ];
    // //   this.groups.forEach((item) => {
    // //     let inputValue = {
    // //       name: item,
    // //       key: this.tagColors[this.tags.length],
    // //     };
    // //     console.log(inputValue);
    // //     // this.tags.push(inputValue);
    // //     // this.inputVisible = false;
    // //     // tags.push({ name: "treatment", key: "green" });
    // //   });

    //   return tags;
    // },
  },
  mounted() {
    // this.loadFields();
    const taskId = this.$route.query.taskId;
    const toolId = this.$route.query.toolId;
    if (taskId) {
      this.task.id = taskId;
      TaskApi.findById(taskId).then((resp) => {
        let receiveData = resp.data.data;
        receiveData.svgJson = JSON.parse(receiveData.svgJson);
        this.task = receiveData;
        // console.log(receiveData);
        this.matedata = JSON.parse(this.task.metadataJson);
        if (receiveData.groups) {
          this.tags = JSON.parse(receiveData.groups);
        }
        if(receiveData.param){
            
            this.inputParam = JSON.parse(receiveData.param);
            // console.log(this.inputParam )
        }
      });
    }
    if (toolId) {
      this.toolId = toolId;
      ToolsAPI.findById(toolId).then((resp) => {
        // console.log(resp);
        this.tool = resp.data.data;
        // console.log(vm.tool)
      });
    }

    if (this.$websock) {
      this.$websock.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if (data.msgType == "NOTIFY") {
          this.$message.success(data.message);
          if (this.setIntervaStatus) {
            let setIntervaStatus = this.setIntervaStatus;
            setTimeout(function () {
              clearInterval(setIntervaStatus);
            }, 2000);
          }
        }

        let receiveData = data.data;
        receiveData.svgJson = JSON.parse(receiveData.svgJson);
        this.task = receiveData;
        // this.contentList["tab1"]=svgJson
      };
    }
  },
  methods: {
    onTabChange(key, type) {
    //   console.log(key, type);
      this[type] = key;
    },
    handleSubmit() {},
    customRequest(options) {
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", options.file); //将file属性添加到formData里
      this.formData.append("field", options.filename);
      // this.formData.append("projectId", this.data.id);
      TaskApi.upload(this.task.id, this.formData).then((resp) => {
        // console.log(resp);
        options.onSuccess(resp, options.file);
        // this.loadAttachment();
        progress.percent = 99;
        this.task = resp.data.data;
        // console.log(this.task);
        this.$router.replace({
          query: merge(this.$route.query, { taskId: this.task.id }),
        });
        this.matedata = JSON.parse(this.task.metadataJson);
        this.tags = [];
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
      // console.log(this.formData)
    },
    addTask(objId, codeId, params) {
    //   console.log(this.matedata);
      TaskApi.addTask(this.CRUD, this.task.id, objId, codeId, {
        metadata: JSON.stringify(this.matedata),
        map: params,
        groups: this.tags,
      }).then((resp) => {
        // this.showLog(resp.data.data);
        // this.loadTask(objId);
        this.task = resp.data.data;
        // console.log(resp)
        this.tabKey = "tab1";
        if (!this.$route.query.taskId) {
          this.$router.push({
            query: merge(this.$route.query, { taskId: this.task.id }),
          });
        }

        this.matedata = JSON.parse(this.task.metadataJson);
        this.$message.success(resp.data.data.name + "创建成功");
      });
    },
    customRow(record) {
      return {
        // 自定义属性，也就是官方文档中的props，可通过条件来控制样式
        style: {
          // 设置字体颜色
          // 'color': record.id === this.leftAlignId ? '#fff' : '',
          //  设置行背景色
          "background-color":
            this.selected.indexOf(record.Sample) != -1
              ? "pink"
              : record.background,
          cursor: "pointer",

          // 设置字体类型
          // 'font-family': 'Microsoft YaHei',
          // // 下划线
          // 'text-decoration': 'underline',
          // // 字体样式-斜体
          // 'font-style': 'italic',
          // // 字体加粗
          // 'font-weight': 'bold'
        },
        on: {
          // 鼠标单击行
          click: () => {
            // 记录当前点击的行标识
            // console.log( index)
            // this.leftAlignId = index
            if (this.selected.indexOf(record.Sample) == -1) {
              this.selected.push(record.Sample);
            //   console.log(this.selected);
            }

            //   for(let i=0; i<this.matedata.length;i++){
            //     if(this.selected.indexOf( this.matedata[i].Sample)!=-1){
            //         this.matedata[i]['background']=group.key
            //             this.matedata[i]["group"]=group.name
            //     }
            // }

            // console.log(this.selected)
          },
        },
      };
    },
    edit(key) {
      const newData = [...this.matedata];
      const target = newData.find((item) => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.matedata = newData;
      }
    },
    cancel(key) {
      const newData = [...this.matedata];
      const target = newData.find((item) => key === item.key);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.key)
        );
        delete target.editable;
        this.matedata = newData;
      }
    },
    save(key) {
      const newData = [...this.matedata];
      // const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.key);
    //   console.log(target);
      // const targetCache = newCacheData.find(item => key === item.key);
      if (target) {
        // target.editable = false;
        delete target.editable;
        this.matedata = newData;
        // Object.assign(targetCache, target);
        // this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    del(key) {
      const newData = [...this.matedata];
      const target = newData.findIndex((item) => key === item.key);
    //   console.log(target);

      if (target) {
        newData.splice(target, 1);
        this.matedata = newData;
      } else if (target == 0) {
        newData.shift();
        this.matedata = newData;
      }
      // const newData = [...this.matedata];
      // const target = matedata.find(item => key === item.key);
      // matedata.splice(matedata.find(item => key === item.key), 1);
    },
    handleChange(value, key, column) {
      const newData = [...this.matedata];
      const target = newData.find((item) => key === item.key);
      if (target) {
        target[column] = value;
        this.matedata = newData;
      }
    },
    add() {
      const newData = [...this.matedata];
      let key = v4();
      newData.push({
        key: key,
        sample: "",
        group: "",
      });
      const target = newData.find((item) => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.matedata = newData;
      }
      // this.edit(key)
    },
    headleChangeColor(group) {
      const newMetadata = [...this.matedata];
      let selectRow = newMetadata.filter(
        (item) => item.Group===group.name
      );
    //   console.log(group)
      if(selectRow){
        selectRow.forEach((item) => {
          item.background = group.color;
        });
        this.matedata = newMetadata;
      }
    },
    tagClick(group) {
      // let selectRow = this.matedata.filter((item) => this.selected.indexOf( item.Sample)!=-1 )
      if (this.selected.length == 0) {
        this.$message.warning("请选择行！");
        return;
      }
      const newMetadata = [...this.matedata];
      let selectRow = newMetadata.filter(
        (item) => this.selected.indexOf(item.Sample) != -1
      );
      if (group == "cancel") {
        selectRow.forEach((item) => {
          item.background = "";
          item.Group = "";
        });
        this.matedata = newMetadata;
        // for (let i = 0; i < this.matedata.length; i++) {
        //   if (this.selected.indexOf(this.matedata[i].Sample) != -1) {
        //     this.matedata[i]["group"] = "";
        //     this.matedata[i]["background"] = "";

        //   }
        // }
        this.selected = [];
      } else {
        selectRow.forEach((item) => {
          item.background = group.color;
          item.Group = group.name;
        });
        this.matedata = newMetadata;
        this.selected = [];

        // const newData = [...this.tags];
        // let target = newData.find((item) => group.key === item.key);
        // if (target) {
        //   //   console.log(this.selected);
        //   target["samples"] = this.selected;
        //   this.tags = newData;
        //   this.selected = [];
        // }
        // console.log(this.tags);
      }
    //   console.log(this.matedata);
    //   console.log(this.tags);
      // this.selected=[]
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag.name !== removedTag.name);
    //   console.log(removedTag);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;

    //   console.log(e.target.value);
    },

    handleInputConfirm() {
      //   const inputValue = this.inputValue;
      if (this.tags.length > this.tagColors.length) {
        this.inputVisible = false;
        this.$message.warning("最多添加" + this.tagColors.length + "个分组！");
        return;
      }
      //
      //

      let target = this.tags.find((item) => item.name == this.inputValue);

      if (!target) {
        let inputValue = {
          name: this.inputValue,
          color: this.tagColors[this.tags.length],
        };
        this.tags.push(inputValue);
        this.inputVisible = false;
      }

      //   if (this.inputValue && tags.indexOf(inputValue) === -1) {
      //     tags = [...tags, inputValue];
      //   }
      //   console.log(tags);
      //  let tags = this.tags;
      //   Object.assign(this, {
      //     tags,
      //     inputVisible: false,
      //     inputValue: inputValue,
      //   });
    },
  },
};
</script>
<style >
.layout-content {
  background: none !important;
}

.matedata
  .ant-table-tbody
  > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
  > td {
  background: pink !important;
}
</style>