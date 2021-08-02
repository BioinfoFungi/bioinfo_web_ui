(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Project_add"],{"0db5":function(e,t,r){"use strict";var a=r("9efd"),o="/api/project",n={page:function(e){return Object(a["a"])({url:"".concat(o),params:e,method:"get"})},add:function(e){return Object(a["a"])({url:o,data:e,method:"post"})},updateContent:function(e,t){return Object(a["a"])({url:"".concat(o,"/updateContent/").concat(e),data:t,method:"post"})},update:function(e,t){return Object(a["a"])({url:"".concat(o,"/update/").concat(e),data:t,method:"post"})},findById:function(e){return Object(a["a"])({url:"".concat(o,"/find/").concat(e),method:"get"})},del:function(e){return Object(a["a"])({url:"".concat(o,"/del/").concat(e),method:"get"})}};t["a"]=n},"7bcc":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-form-model",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[r("a-form-model-item",{ref:"name",attrs:{label:"项目名称",prop:"name"}},[r("a-input",{on:{blur:function(){e.$refs.name.onFieldBlur()}},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("a-form-model-item",{attrs:{label:"项目负责人"}},[r("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["select-multiple",{rules:[{required:!0,message:"选择一个或多个责任人！",type:"array"}]}],expression:"[\n        'select-multiple',\n        {\n          rules: [\n            { required: true, message: '选择一个或多个责任人！', type: 'array' },\n          ],\n        },\n      ]"}],attrs:{mode:"multiple",placeholder:"选择一个或多个责任人！"},model:{value:e.form.userIds,callback:function(t){e.$set(e.form,"userIds",t)},expression:"form.userIds"}},e._l(e.users,(function(t){return r("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.username))])})),1)],1),r("a-form-model-item",{attrs:{label:"项目状态",prop:"projectStatus"}},[r("a-select",{attrs:{placeholder:"please select your zone"},model:{value:e.form.projectStatus,callback:function(t){e.$set(e.form,"projectStatus",t)},expression:"form.projectStatus"}},e._l(e.projectStatuses,(function(t){return r("a-select-option",{key:t.key,attrs:{value:t.key}},[e._v(e._s(t.value))])})),1)],1),r("a-form-model-item",{attrs:{label:"项目截止日期",required:"",prop:"deadline"}},[r("a-date-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"",type:"date",placeholder:"Pick a date"},model:{value:e.form.deadline,callback:function(t){e.$set(e.form,"deadline",t)},expression:"form.deadline"}})],1),r("a-form-model-item",{attrs:{label:"项目报告URL"}},[r("a-input",{model:{value:e.form.jupyterUrl,callback:function(t){e.$set(e.form,"jupyterUrl",t)},expression:"form.jupyterUrl"}})],1),r("a-form-model-item",{attrs:{label:"项目描述",prop:"description"}},[r("a-input",{attrs:{type:"textarea"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),r("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:4}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("创建项目")]),r("a-button",{staticStyle:{"margin-left":"10px"},on:{click:e.resetForm}},[e._v("重置")])],1)],1)},o=[],n=r("0db5"),s=r("f9fd"),l=r("9fb8"),c={data:function(){return{labelCol:{span:4},wrapperCol:{span:14},other:"",projectStatuses:[],value:null,users:[],form:{name:"",deadline:void 0,projectStatus:null,userIds:[],description:""},rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"}],projectStatus:[{required:!0,message:"Please select Activity zone",trigger:"change"}],deadline:[{required:!0,message:"请选择一个截止日期",trigger:"change"}],description:[{required:!0,message:"请输入项目描述",trigger:"blur"}]}}},created:function(){var e=this;s["a"].projectStatuses().then((function(t){e.projectStatuses=t.data.data})),l["a"].listAll().then((function(t){e.users=t.data.data}))},methods:{onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){if(!t)return!1;e.form.deadline=e.form.deadline.format("YYYY-MM-DD HH:mm:ss"),n["a"].add(e.form).then((function(t){e.$notification["success"]({message:"项目创建成功!"+t.data.message}),e.$router.push("/project/list")}))}))},resetForm:function(){this.$refs.ruleForm.resetFields()}}},u=c,i=r("2877"),d=Object(i["a"])(u,a,o,!1,null,null,null);t["default"]=d.exports},"9fb8":function(e,t,r){"use strict";var a=r("9efd"),o="/api/user",n={page:function(e){return Object(a["a"])({url:"".concat(o),params:e,method:"get"})},login:function(e){return Object(a["a"])({url:"".concat(o,"/login"),data:e,method:"post"})},listAll:function(){return Object(a["a"])({url:"".concat(o,"/listAll"),method:"get"})}};t["a"]=n},f9fd:function(e,t,r){"use strict";var a=r("9efd"),o="/api/enum",n={projectStatuses:function(){return Object(a["a"])({url:"".concat(o,"/projectStatuses"),method:"get"})}};t["a"]=n}}]);
//# sourceMappingURL=Project_add.b86a8578.js.map