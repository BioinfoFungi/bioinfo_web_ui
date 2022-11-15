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
                        <a-form-item label="Activity zone" >
                            <a-select  placeholder="please select your zone">
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
                <a-card style="width:100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
                    @tabChange="key => onTabChange(key, 'noTitleKey')">
                    <p v-if="noTitleKey === 'article'">
                        article content
                    </p>
                    <p v-else-if="noTitleKey === 'app'">
                        app content
                    </p>
                    <p>
                        project content
                    </p>
                    <!-- <a slot="tabBarExtraContent" href="#">More</a> -->
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {},
            tabList: [
                {
                    key: 'tab1',
                    // tab: 'tab1',
                    scopedSlots: { tab: 'customRender' },
                },
                {
                    key: 'tab2',
                    tab: 'tab2',
                },
            ],
            contentList: {
                tab1: 'content1',
                tab2: 'content2',
            },
            tabListNoTitle: [
                {
                    key: 'article',
                    tab: '工具介绍',
                },
                {
                    key: 'app',
                    tab: '详细说明',
                },
                {
                    key: 'project',
                    tab: '常见问题',
                },
            ],
            key: 'tab1',
            noTitleKey: 'app',
        };
    },
    methods: {
        onTabChange(key, type) {
            console.log(key, type);
            this[type] = key;
        }, handleSubmit() { }
    },
};
</script>
<style scoped>
.layout-content {
    background: none !important;
}
</style>