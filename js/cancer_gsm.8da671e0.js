(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["cancer_gsm"],{"1cc2":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("a-drawer",{attrs:{title:t.CRUD,placement:"right",closable:!1,visible:t.visible,width:"80%"},on:{close:t.onClose}},[t.obj?e("div",[e("a-descriptions",{attrs:{title:"Data",bordered:"",size:"small",column:2}},t._l(t.fields,(function(a,n){return e("a-descriptions-item",{key:n,attrs:{label:a}},[t._v(" "+t._s(t.obj[a])+" ")])})),1),e("div",t._l(t.codeList,(function(a){return e("a-button",{key:a.id,attrs:{type:"link"},on:{click:function(e){return t.addTask(t.obj.id,a.id)}}},[t._v(" "+t._s(a.name)+" ")])})),1),e("div",[e("a-table",{attrs:{columns:t.task_columns,"data-source":t.taskList,bordered:"",pagination:!1,"row-key":function(t){return t.id}},scopedSlots:t._u([{key:"action",fn:function(a,n){return e("span",{},[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.runTask(n.id)}}},[t._v("运行")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.shutdownTask(n.id)}}},[t._v("停止")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.showLog(n)}}},[t._v("LOG")])],1)}}],null,!1,794683718)})],1),t.currentLogName?e("span",[t._v("current Log:"+t._s(t.currentLogName))]):t._e(),e("a-textarea",{attrs:{placeholder:"run log","auto-size":{minRows:3,maxRows:20}},model:{value:t.Log,callback:function(a){t.Log=a},expression:"Log"}}),t._l(t.svgJson,(function(a,n){return e("div",{key:n,staticClass:"svgJson",domProps:{innerHTML:t._s(a)}})})),e("a-button",{on:{click:function(a){return t.moreInfo(t.obj.id)}}},[t._v("查看更多")])],2):t._e()])},o=[],i=(e("b0c0"),e("47d5")),c=e("724d"),r=e("b199"),s=[{title:"id",dataIndex:"id"},{title:"taskStatus",dataIndex:"taskStatus"},{title:"codeId",dataIndex:"codeId"},{title:"objId",dataIndex:"objId"},{title:"name",dataIndex:"name"},{title:"Action",key:"action",fixed:"right",scopedSlots:{customRender:"action"}}],d={props:{CRUD:{type:String,required:!0}},data:function(){return{task_columns:s,visible:!1,obj:void 0,codeList:[],taskList:[],fields:[],svgJson:[],Log:"",setIntervaStatus:void 0,currentLogName:void 0}},mounted:function(){var t=this;this.loadFields(),this.$websock&&(this.$websock.onmessage=function(a){var e=JSON.parse(a.data);if("NOTIFY"==e.msgType&&(t.$message.success(e.message),t.setIntervaStatus)){var n=t.setIntervaStatus;setTimeout((function(){clearInterval(n)}),2e3)}if(t.obj){t.loadTask(e.data.objId),t.findbyId(e.data.objId);var o=JSON.parse(e.data.svgJson);t.svgJson=o}})},methods:{onClose:function(){this.visible=!1,this.obj=void 0,this.Log="",this.setIntervaStatus&&clearInterval(this.setIntervaStatus),this.svgJson=[],this.$emit("onClose")},onShow:function(t){this.visible=!0,this.loadCode(),this.findbyId(t),this.loadTask(t),this.$emit("onShow")},loadCode:function(){var t=this;i["a"].listByCrudType(this.CRUD).then((function(a){t.codeList=a.data.data}))},findbyId:function(t){var a=this;c["a"].findById(this.CRUD,{id:t}).then((function(t){a.obj=t.data.data}))},loadTask:function(t){var a=this;r["a"].listAll(this.CRUD,{id:t}).then((function(t){a.taskList=t.data.data}))},loadFields:function(){var t=this;c["a"].getFields(this.CRUD).then((function(a){t.fields=a.data.data}))},loadLog:function(t){var a=this;r["a"].log({taskId:t}).then((function(t){a.Log=t.data.data}))},showLog:function(t){this.visible=!0;var a=this.loadLog;a(t.id),this.currentLogName=t.name,this.setIntervaStatus&&clearInterval(this.setIntervaStatus),this.setIntervaStatus=setInterval((function(){a(t.id)}),1e3)},addTask:function(t,a){var e=this;c["a"].addTask(this.CRUD,{id:t,codeId:a}).then((function(a){e.showLog(a.data.data),e.loadTask(t),e.$message.success(a.data.data.name+"创建成功")}))},runTask:function(t){var a=this;c["a"].runTask(this.CRUD,{id:t}).then((function(t){a.showLog(t.data.data),a.loadTask(t.data.data.objId),a.$message.success(t.data.data.name+"运行！ ")}))},shutdownTask:function(t){var a=this;r["a"].shutdown(t).then((function(t){a.$message.success(t.data.data.name+"结束!")}))}}},u=d,l=e("2877"),f=Object(l["a"])(u,n,o,!1,null,null,null);a["a"]=f.exports},"30a6":function(t,a,e){"use strict";e("9c0b")},"47d5":function(t,a,e){"use strict";var n=e("9efd"),o="/api/code",i={page:function(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({url:"".concat(o,"?more=").concat(a),params:t,method:"get"})},findByCan:function(t){return Object(n["a"])({url:"".concat(o,"/findByCan/").concat(t),method:"get"})},checkFileExist:function(t){return Object(n["a"])({url:"".concat(o,"/checkFile/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"get"})},add:function(t){return Object(n["a"])({url:o,data:t,method:"post"})},update:function(t,a){return Object(n["a"])({url:"".concat(o,"/update/").concat(t),data:a,method:"post"})},findById:function(t,a){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),params:a,method:"get"})},listByCrudType:function(t){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/listAll"),method:"get"})},init:function(t){return Object(n["a"])({url:"".concat(o,"/init"),params:t,method:"get"})},createTSVFile:function(){return Object(n["a"])({url:"".concat(o,"/createTSVFile"),method:"post",responseType:"blob"})},files:function(t){return Object(n["a"])({url:"".concat(o,"/file"),params:{path:t},method:"get"})},getFileContent:function(t){return Object(n["a"])({url:"".concat(o,"/getFileContent"),params:t,method:"get"})},saveFileContent:function(t,a){return Object(n["a"])({url:"".concat(o,"/saveFileContent?id=").concat(t),data:a,method:"post"})}};a["a"]=i},"724d":function(t,a,e){"use strict";e("99af");var n=e("9efd"),o="/api/cancer_study",i={page:function(t,a){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(n["a"])({url:"".concat(o,"/").concat(t,"?more=").concat(e),params:a,method:"get"})},pageByCodeId:function(t,a){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(n["a"])({url:"".concat(o,"/pageByCodeId/").concat(t,"?more=").concat(e),params:a,method:"get"})},list:function(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({url:"".concat(o,"/list?more=").concat(a),params:t,method:"get"})},listByCancerId:function(t){return Object(n["a"])({url:"".concat(o,"/listByCancerId/").concat(t),method:"get"})},checkFileExist:function(t){return Object(n["a"])({url:"".concat(o,"/checkFile/").concat(t),method:"get"})},init:function(t,a){return Object(n["a"])({url:"".concat(o,"/init/").concat(t),params:a,method:"get"})},findById:function(t,a){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),params:a,method:"get"})},addTask:function(t,a){return Object(n["a"])({url:"".concat(o,"/addTask/").concat(t),params:a,method:"get"})},runTask:function(t,a){return Object(n["a"])({url:"".concat(o,"/runTask/").concat(t),params:a,method:"get"})}};i.findById=function(t,a){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/findById"),params:a,method:"get"})},i.getFields=function(t){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/getFields"),method:"get"})},i.createTSVFile=function(t){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/createTSVFile"),method:"post",responseType:"blob"})},i.delById=function(t,a){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/delById"),params:a,method:"get"})},i.add=function(t,a){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/add"),data:a,method:"post"})},i.update=function(t,a,e){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/update?id=").concat(a),data:e,method:"post"})},a["a"]=i},"74b1":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-drawer",{attrs:{title:"CRUD",placement:"right",closable:!1,visible:t.visible,width:"50%"},on:{close:t.onClose}},[e("a-form-model",{ref:"refForm",attrs:{model:t.form,rules:t.rules}},[t._t("default",null,{form:t.form}),e("a-form-model-item",[t.isUpdate?e("a-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("更新")]):t._e(),t.isUpdate?t._e():e("a-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("添加")]),e("a-button",{staticStyle:{"margin-left":"10px"},on:{click:t.onReset}},[t._v("重置")])],1)],2)],1)],1)},o=[],i=e("724d"),c={props:{isUpdate:{type:Boolean,required:!0},CRUD:{type:String,required:!0}},data:function(){return{visible:!1,updateId:void 0,form:{},rules:{name:[{required:!0,message:"请输入Name名称",trigger:"change"}]}}},methods:{onClose:function(){this.visible=!1,this.$emit("onClose")},findbyId:function(t){var a=this;i["a"].findById(this.CRUD,{id:t}).then((function(t){a.form=t.data.data}))},onShow:function(t){-1!=t&&this.findbyId(t),this.updateId=t,this.visible=!0},onSubmit:function(){var t=this;this.$refs.refForm.validate((function(a){if(!a)return!1;t.isUpdate?i["a"].update(t.CRUD,t.updateId,t.form).then((function(a){t.$notification["success"]({message:"更新成功!"+a.data.message}),t.$emit("loadData"),t.visible=!1})):i["a"].add(t.CRUD,t.form).then((function(a){t.$notification["success"]({message:"添加建成功!"+a.data.message}),t.$emit("loadData"),t.visible=!1}))}))},onReset:function(){this.$refs.refForm.resetFields()}}},r=c,s=e("2877"),d=Object(s["a"])(r,n,o,!1,null,null,null);a["a"]=d.exports},9828:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("objForm",{ref:"objForm",attrs:{CRUD:t.CRUD,isUpdate:t.isUpdate},on:{loadData:t.loadData},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.form;return[e("a-form-model-item",{attrs:{label:"gse",prop:"gse"}},[e("a-input",{model:{value:n.gse,callback:function(a){t.$set(n,"gse",a)},expression:"form.gse"}})],1),e("a-form-model-item",{attrs:{label:"gse",prop:"gse"}},[e("a-input",{model:{value:n.gse,callback:function(a){t.$set(n,"gse",a)},expression:"form.gse"}})],1)]}}])}),e("taskDrawer",{ref:"taskDrawer",attrs:{CRUD:t.CRUD}}),e("div",[e("a-button",{on:{click:t.addForm}},[t._v("添加")]),e("a-button",{on:{click:t.createTSVFile}},[t._v("导出CSV")]),e("a-button",{on:{click:function(a){return t.initTSV(!1)}}},[t._v("导入CSV")]),e("a-button",{on:{click:function(a){return t.initTSV(!0)}}},[t._v("清空导入CSV")]),e("a-input-search",{staticStyle:{width:"200px"},attrs:{placeholder:"input search text"},on:{search:t.onSearch}})],1),e("a-table",{attrs:{columns:t.columns,"row-key":function(t){return t.id},"data-source":t.data,pagination:!1,loading:t.loading},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"id",fn:function(a){return e("div",{},[e("a",{attrs:{href:"javascript:;"}},[t._v(t._s(a))])])}},{key:"gsm",fn:function(a){return e("div",{},[e("a",{attrs:{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc="+a}},[t._v(t._s(a))])])}},{key:"gse",fn:function(a){return e("div",{},[e("a",{attrs:{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc="+a}},[t._v(t._s(a))])])}},{key:"gpl",fn:function(a){return e("div",{},[e("a",{attrs:{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc="+a}},[t._v(t._s(a))])])}},{key:"sra",fn:function(a){return e("div",{},[e("a",{attrs:{target:"_blank",href:"https://www.ncbi.nlm.nih.gov/sra?term="+a}},[t._v(t._s(a))])])}},{key:"action",fn:function(a,n){return e("span",{},[n.status?e("a-divider",{attrs:{type:"vertical"}}):t._e(),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.more(n.id)}}},[t._v("更多")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateForm(n.id)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.delById(n.id)}}},[t._v("删除")])],1)}}])},[e("template",{slot:"footer"},[e("div",{staticClass:"page-wrapper",style:{textAlign:"right"}},[e("a-pagination",{staticClass:"pagination",attrs:{current:t.pagination.page,total:t.pagination.total,defaultPageSize:t.pagination.size,pageSizeOptions:["5","10","20","50","100"],showSizeChanger:""},on:{showSizeChange:t.handleTableChange,change:t.handleTableChange}})],1)])],2)],1)},o=[],i=e("724d"),c=e("1cc2"),r=e("74b1"),s=[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id"},fixed:"left"},{title:"gsm",dataIndex:"gsm",scopedSlots:{customRender:"gsm"}},{title:"GSE",dataIndex:"gse",scopedSlots:{customRender:"gse"}},{title:"gpl",dataIndex:"gpl",scopedSlots:{customRender:"gpl"}},{title:"sra",dataIndex:"sra",scopedSlots:{customRender:"sra"}},{title:"species",dataIndex:"species"},{title:"Action",key:"action",fixed:"right",scopedSlots:{customRender:"action"}}],d={components:{taskDrawer:c["a"],objForm:r["a"]},props:{},data:function(){return{pagination:{page:1,size:10,sort:null,keyword:null},queryParam:{page:0,size:10,sort:null,keyword:null,categoryId:null,status:null},data:[],loading:!1,isUpdate:!1,columns:s,CRUD:"GSM"}},mounted:function(){this.loadData()},methods:{loadData:function(){var t=this;this.queryParam.page=this.pagination.page-1,this.queryParam.size=this.pagination.size,this.queryParam.sort=this.pagination.sort,this.queryParam.keywords=this.pagination.keywords,this.loading=!0,i["a"].page(this.CRUD,this.queryParam,!0).then((function(a){t.data=a.data.data.content,t.pagination.total=parseInt(a.data.data.totalElements),t.loading=!1}))},handleTableChange:function(t,a){this.pagination.page=t,this.pagination.size=a,this.loadData()},onSearch:function(t){this.pagination.keywords=t,this.loadData()},createTSVFile:function(){var t=this;i["a"].createTSVFile(this.CRUD).then((function(a){var e=t.CRUD,n=a.data,o=new FileReader;o.readAsDataURL(n),o.onload=function(t){var a=document.createElement("a");a.download=e+".tsv",a.href=t.target.result,document.body.appendChild(a),a.click(),document.body.removeChild(a)}}))},initTSV:function(t){var a=this;i["a"].init(this.CRUD,{isEmpty:t,name:this.CRUD+".tsv"}).then((function(t){a.loadData(),a.$notification["success"]({message:t.data.message})}))},delById:function(t){var a=this.loadData,e=this.CRUD,n=this.$notification["success"];this.$confirm({title:"删除癌症数据",content:"您确定要删除该癌症数据吗?",onOk:function(){i["a"].delById(e,{id:t}).then((function(t){a(),n({message:"删除成功!"+t.data.message})}))},onCancel:function(){}})},addForm:function(){this.isUpdate=!1,this.$refs.objForm.onShow(-1)},updateForm:function(t){this.isUpdate=!0,this.$refs.objForm.onShow(t)},more:function(t){this.$refs.taskDrawer.onShow(t)}}},u=d,l=(e("30a6"),e("2877")),f=Object(l["a"])(u,n,o,!1,null,null,null);a["default"]=f.exports},"9c0b":function(t,a,e){},b199:function(t,a,e){"use strict";var n=e("9efd"),o="/api/task",i={page:function(t){return Object(n["a"])({url:"".concat(o),params:t,method:"get"})},listAll:function(t,a){return Object(n["a"])({url:"".concat(o,"/listAll/").concat(t),params:a,method:"get"})},run:function(t){return Object(n["a"])({url:"".concat(o,"/run"),params:t,method:"get"})},log:function(t){return Object(n["a"])({url:"".concat(o,"/log"),params:t,method:"get"})},runOne:function(t){return Object(n["a"])({url:"".concat(o,"/run/").concat(t),method:"get"})},shutdown:function(t){return Object(n["a"])({url:"".concat(o,"/shutdown/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"get"})},findById:function(t){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),method:"get"})},runCodes:function(t){return Object(n["a"])({url:"".concat(o,"/runCodes"),data:t,method:"post"})},runByCodeId:function(t){return Object(n["a"])({url:"".concat(o,"/runByCodeId/").concat(t),method:"get"})},removeALlTask:function(){return Object(n["a"])({url:"".concat(o,"/removeALlTask"),method:"get"})},getObjMap:function(t){return Object(n["a"])({url:"".concat(o,"/getObjMap/").concat(t),method:"get"})}};a["a"]=i}}]);
//# sourceMappingURL=cancer_gsm.8da671e0.js.map