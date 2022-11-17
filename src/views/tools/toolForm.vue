<template>
    <div>
        <a-row>
            <a-col :span="12" class="mr-1" style="padding-right:0.5rem">

                <a-card title="火山图">
                    <!-- <template #extra><a href="#">more</a></template> -->
                    <!-- <a-input-number id="inputNumber" value="value" :min="1" :max="10" /> -->

                    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                        <a-form-item label="Note">
                            <a-input />
                        </a-form-item>
                        <a-form-item label="Activity zone">
                            <a-select placeholder="please select your zone">
                                <a-select-option value="shanghai">Zone one</a-select-option>
                                <a-select-option value="beijing">Zone two</a-select-option>
                            </a-select>
                        </a-form-item>



                        <!-- <a-form-item label="Gender">
                            <a-select v-decorator="[
                                'gender',
                                { rules: [{ required: true, message: 'Please select your gender!' }] },
                            ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                                <a-select-option value="male">
                                    male
                                </a-select-option>
                                <a-select-option value="female">
                                    female
                                </a-select-option>
                            </a-select>
                        </a-form-item> -->
                        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                            <a-button type="primary" html-type="submit">
                                Submit
                            </a-button>
                        </a-form-item>
                    </a-form>

                </a-card>
            </a-col>
            <a-col :span="12" style="padding-left:0.5rem">
                <a-card style="width:100%" :tab-list="tabList" :active-tab-key="tabKey"
                    @tabChange="key => onTabChange(key, 'tabKey')">
                    <!-- <span slot="customRender" slot-scope="item">
                        <a-icon type="home" />{{ item.key }}
                    </span> -->
                    <div v-if="tabKey === 'tab1'">
                        <div class="svgJson" v-for="(item, index) in svgJson" :key="index" v-html="item"></div>
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
export default {
    data() {
        return {
            tabList: [
                {
                    key: 'tab1',
                    tab: '实时预览',
                    // scopedSlots: { tab: 'customRender' },
                },
                {
                    key: 'tab2',
                    tab: '工具介绍',
                },{
                    key: 'tab3',
                    tab: '详细说明',
                },{
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
            svgJson: [],
        };
    }, beforeRouteEnter(to, from, next) {
        // Get post id from query
        const toolId = to.query.toolId;

        next(vm => {
            if (toolId) {
                vm.toolId = toolId;
                ToolsAPI.findById(toolId).then((resp) => {
                    // console.log(resp);
                    vm.tool = resp.data.data;
                    console.log(vm.tool)
                });
                // ProjectAPi.findById(projectId).then(response => {
                //   const project = response.data.data;
                //   // console.log(project);
                //   vm.form = project;
                // });
            }
        });
    }, mounted() {
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

                let svgJson = JSON.parse(data.data.svgJson);
                this.svgJson = svgJson;
                // this.contentList["tab1"]=svgJson
            };
        }
    },
    methods: {
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        }, handleSubmit() {
            this.addTask(this.tool.id, 1)
        },
        addTask(objId, codeId) {
            TaskApi.addTask(this.CRUD, { id: objId, codeId: codeId }).then(
                (resp) => {
                    // this.showLog(resp.data.data);
                    // this.loadTask(objId);
                    console.log(resp)
                    this.tabKey="tab1"
                    this.$message.success(resp.data.data.name + "创建成功");
                }
            );
        },
    },
};
</script>
<style scoped>
.layout-content {
    background: none !important;
}
</style>