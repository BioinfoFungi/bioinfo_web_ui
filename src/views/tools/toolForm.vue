<template>
    <div>
        <a-row>
            <a-col :span="12" class="mr-1" style="padding-right:0.5rem">

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
                    <form-create :rule="rule" v-model="fApi" :option="options" :value.sync="value" />
                </a-card>
            </a-col>
            <a-col :span="12" style="padding-left:0.5rem">
                <a-card style="width:100%" :tab-list="tabList" :active-tab-key="tabKey"
                    @tabChange="key => onTabChange(key, 'tabKey')">
                    <!-- <span slot="customRender" slot-scope="item">
                        <a-icon type="home" />{{ item.key }}
                    </span> -->
                    <div v-if="tabKey === 'tab1'">
                        <div class="svgJson" v-for="(item, index) in task.svgJson" :key="index" v-html="item">
                        </div>
                    </div>
                    <div v-if="tabKey === 'sourceCode'">
                        <a-textarea :value="task.generateCode" :auto-size="{ minRows: 15, maxRows: 20 }">
                        </a-textarea>
                    </div>

                    <div v-if="tabKey === 'matedata'">
                        <p>metadata: {{ task.metadata }}</p>
                        <p>matrix: {{ task.matrix }}</p>
                        <a-table :columns="columns" :data-source="matedata" :pagination="false">
                            <template v-for="col in ['sample', 'group']" :slot="col" slot-scope="text, record">
                                <div :key="col">
                                    <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                                        @change="e => handleChange(e.target.value, record.key, col)" />
                                    <template v-else>
                                        {{ text }}
                                    </template>
                                </div>
                            </template>

                            <template slot="operation" slot-scope="text, record">
                                <div class="editable-row-operations">
                                    <span v-if="record.editable">
                                        <a @click="() => save(record.key)">保存 </a>
                                        <!-- <a @click="() => cancel(record.key)">取消 </a> -->
                                        <!-- <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                                            <a>Cancel</a>
                                        </a-popconfirm> -->
                                    </span>
                                    <span v-else>
                                        <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑 </a>
                                    </span>
                                    <span>
                                        <a  @click="() => del(record.key)">删除 </a>
                                    </span>
                                </div>
                            </template>

                        </a-table>
                        <a-button @click="add">添加</a-button>
                    </div>
                    {{ contentList[tabKey] }}
                </a-card>

                <a-card style="width:100%">

                </a-card>


            </a-col>
        </a-row>





    </div>
</template>
<script>
import TaskApi from "@/api/task.js";
import ToolsAPI from "@/api/tools.js";
import merge from "webpack-merge"
import {v4}  from 'uuid' 
const columns = [
    {
        title: 'sample',
        dataIndex: 'sample',
        key: 'sample',
        scopedSlots: { customRender: 'sample' },
    },
    {
        title: 'group',
        dataIndex: 'group',
        key: 'group',
        scopedSlots: { customRender: 'group' },
    }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
    },
];

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
            columns,
            matedata:[],
            editingKey: '',
            tabList: [
                {
                    key: 'tab1',
                    tab: '实时预览',
                    // scopedSlots: { tab: 'customRender' },
                }, {
                    key: 'matedata',
                    tab: '样本信息',
                }, {
                    key: 'sourceCode',
                    tab: '生成代码',
                },
                {
                    key: 'tab2',
                    tab: '工具介绍',
                }, {
                    key: 'tab3',
                    tab: '详细说明',
                }, {
                    key: 'tab4',
                    tab: '常见问题',
                },
            ],
            contentList: {
                tab1: '',
                tab2: 'content2',
            },
            tabKey: 'tab1',
            form: {},
            CRUD: "TOOLS",
            tool: {},
            // receiveData: [],
            fApi: {},
            value: {},
            formData: {},
            task: { id: -1 },
            options: {
                onSubmit: (formData) => {
                    // formData = JSON.stringify(formData)
                    console.log(this.tool)
                    this.addTask(this.tool.id, this.tool.codeId, formData)
                }
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
                    type: 'a-upload', field: 'matrix', title: '矩阵', "children": [
                        {
                            type: 'a-button',

                            children: [
                                {
                                    type: "a-icon",
                                    props: {
                                        type: "upload"
                                    }
                                }, "文件上传"
                            ],
                        }], props: {
                            name: "matrix",
                            customRequest: this.customRequest
                        }
                }, {
                    type: 'a-upload', field: 'metadata', title: '样本信息', "children": [
                        {
                            type: 'a-button',

                            children: [
                                {
                                    type: "a-icon",
                                    props: {
                                        type: "upload"
                                    }
                                }, "文件上传"
                            ],
                        }], props: {
                            name: "metadata",
                            customRequest: this.customRequest
                        }
                },
                // { type: 'input', field: 'title', title: 'title', value: 'PCA' },
                // { type: 'a-input-number', field: 'field3', title: 'field3', value: 1 },
                { type: 'a-switch', field: 'confidence_ellipse', title: '置信椭圆', value: true },
            ]
        };
    },
    beforeRouteEnter(to, from, next) {
        // Get post id from query
        const toolId = to.query.toolId;
        const taskId = to.query.taskId;

        next(vm => {

            if (taskId) {
                vm.task.id = taskId
                TaskApi.findById(taskId).then((resp) => {
                    let receiveData = resp.data.data
                    receiveData.svgJson = JSON.parse(receiveData.svgJson);
                    vm.task = receiveData;
                    console.log(receiveData)
                })

            }
            if (toolId) {
                vm.toolId = toolId;
                ToolsAPI.findById(toolId).then((resp) => {
                    // console.log(resp);
                    vm.tool = resp.data.data;
                    // console.log(vm.tool)


                });


                // ProjectAPi.findById(projectId).then(response => {
                //   const project = response.data.data;
                //   // console.log(project);
                //   vm.form = project;
                // });
            }
        });
    },
    mounted() {
        // this.loadFields();

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

                let receiveData = data.data
                receiveData.svgJson = JSON.parse(receiveData.svgJson);
                this.task = receiveData;
                // this.contentList["tab1"]=svgJson
            };
        }
    },
    methods: {
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        }, handleSubmit() {

        }, customRequest(options) {


            this.formData = new FormData(); //new一个formData事件
            this.formData.append("file", options.file); //将file属性添加到formData里
            this.formData.append("field", options.filename);
            // this.formData.append("projectId", this.data.id);
            TaskApi.upload(this.task.id, this.formData).then(resp => {
                // console.log(resp);
                options.onSuccess(resp, options.file);
                // this.loadAttachment();
                progress.percent = 99;
                this.task = resp.data.data
                console.log(this.task)
                this.$router.replace({
                    query: merge(this.$route.query, { "taskId": this.task.id })
                })

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
            TaskApi.addTask(this.CRUD, this.task.id, objId, codeId, params).then(
                (resp) => {
                    // this.showLog(resp.data.data);
                    // this.loadTask(objId);
                    this.task = resp.data.data
                    // console.log(resp)
                    this.tabKey = "tab1"
                    if (!this.$route.query.taskId) {
                        this.$router.push({
                            query: merge(this.$route.query, { "taskId": this.task.id })
                        })
                    }
                    console.log(this.matedata)
                    this.$message.success(resp.data.data.name + "创建成功");
                }
            );
        }, edit(key) {
            const newData = [...this.matedata];
            const target = newData.find(item => key === item.key);
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.matedata = newData;
            }
        }, cancel(key) {
            const newData = [...this.matedata];
            const target = newData.find(item => key === item.key);
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.find(item => key === item.key));
                delete target.editable;
                this.matedata = newData;
            }
        }, save(key) {
            const newData = [...this.matedata];
            // const newCacheData = [...this.cacheData];
            const target = newData.find(item => key === item.key);
            console.log(target)
            // const targetCache = newCacheData.find(item => key === item.key);
            if (target ) {
                // target.editable = false;
                delete target.editable;
                this.matedata = newData;
                // Object.assign(targetCache, target);
                // this.cacheData = newCacheData;
            }
            this.editingKey = '';
        }, del(key) {
    
            const newData = [...this.matedata];
            const target = newData.findIndex(item => key === item.key);
            console.log(target)

            if(target){
             
                newData.splice(target, 1);
                this.matedata = newData;
            }else if(target==0){
                newData.shift()
                this.matedata = newData;
                
            }  
            // const newData = [...this.matedata];
            // const target = matedata.find(item => key === item.key);
            // matedata.splice(matedata.find(item => key === item.key), 1);
        }, handleChange(value, key, column) {
            const newData = [...this.matedata];
            const target = newData.find(item => key === item.key);
            if (target) {
                target[column] = value;
                this.matedata = newData;
            }
        }, add() {
            const newData = [...this.matedata];
            let key  = v4() 
            newData.push({
                key: key,
                sample: "",
                group: "",
            })
            const target = newData.find(item => key === item.key);
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.matedata = newData;
            }
            // this.edit(key)
        }
    },
};
</script>
<style scoped>
.layout-content {
    background: none !important;
}
</style>