(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["cancer_detial"],{"47d5":function(t,a,e){"use strict";var n=e("9efd"),o="/api/code",i={page:function(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({url:"".concat(o,"?more=").concat(a),params:t,method:"get"})},findByCan:function(t){return Object(n["a"])({url:"".concat(o,"/findByCan/").concat(t),method:"get"})},checkFileExist:function(t){return Object(n["a"])({url:"".concat(o,"/checkFile/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"get"})},add:function(t){return Object(n["a"])({url:o,data:t,method:"post"})},update:function(t,a){return Object(n["a"])({url:"".concat(o,"/update/").concat(t),data:a,method:"post"})},findById:function(t,a){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),params:a,method:"get"})},listByCrudType:function(t){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/listAll"),method:"get"})},init:function(t){return Object(n["a"])({url:"".concat(o,"/init"),params:t,method:"get"})},createTSVFile:function(){return Object(n["a"])({url:"".concat(o,"/createTSVFile"),method:"post",responseType:"blob"})},files:function(t){return Object(n["a"])({url:"".concat(o,"/file"),params:{path:t},method:"get"})},getContent:function(t){return Object(n["a"])({url:"".concat(o,"/file/content"),params:{path:t},method:"get"})},saveContent:function(t){return Object(n["a"])({url:"".concat(o,"/file/save"),data:t,method:"post"})}};a["a"]=i},"724d":function(t,a,e){"use strict";e("99af");var n=e("9efd"),o="/api/cancer_study",i={page:function(t,a){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(n["a"])({url:"".concat(o,"/").concat(t,"?more=").concat(e),params:a,method:"get"})},pageByCodeId:function(t,a){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(n["a"])({url:"".concat(o,"/pageByCodeId/").concat(t,"?more=").concat(e),params:a,method:"get"})},list:function(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({url:"".concat(o,"/list?more=").concat(a),params:t,method:"get"})},listByCancerId:function(t){return Object(n["a"])({url:"".concat(o,"/listByCancerId/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"get"})},checkFileExist:function(t){return Object(n["a"])({url:"".concat(o,"/checkFile/").concat(t),method:"get"})},add:function(t){return Object(n["a"])({url:o,data:t,method:"post"})},update:function(t,a){return Object(n["a"])({url:"".concat(o,"/update/").concat(t),data:a,method:"post"})},init:function(t,a){return Object(n["a"])({url:"".concat(o,"/init/").concat(t),params:a,method:"get"})},findById:function(t,a){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),params:a,method:"get"})},addTask:function(t,a){return Object(n["a"])({url:"".concat(o,"/addTask/").concat(t),params:a,method:"get"})},runTask:function(t,a){return Object(n["a"])({url:"".concat(o,"/runTask/").concat(t),params:a,method:"get"})}};i.findById=function(t,a){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/findById"),params:a,method:"get"})},i.getFields=function(t){return Object(n["a"])({url:"".concat(o,"/").concat(t,"/getFields"),method:"get"})},i.createTSVFile=function(){return Object(n["a"])({url:"".concat(o,"/createTSVFile"),method:"post",responseType:"blob"})},a["a"]=i},a9ad:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-drawer",{attrs:{title:"癌症研究",placement:"right",closable:!1,visible:t.visible,width:"50%"},on:{close:t.onClose}},[t.CancerStudyDetial?e("div",[e("a-form-item",{attrs:{label:"description"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.description}})],1),e("a-form-item",{attrs:{label:"param"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.param}})],1),e("a-form-item",{attrs:{label:"createDate"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.createDate}})],1),e("a-form-item",{attrs:{label:"fileName"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.fileName}})],1),e("a-form-item",{attrs:{label:"fileType"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.fileType}})],1),e("a-form-item",{attrs:{label:"location"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.location}})],1),e("a-form-item",{attrs:{label:"uuid"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.uuid}})],1),e("a-form-item",{attrs:{label:"原始数据"}},[e("a-input",{attrs:{value:t.CancerStudyDetial.absolutePath}})],1),t.CancerStudyDetial.status?e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.downlaod(t.CancerStudyDetial.relativePath)}}},[t._v("下载")]):t._e(),e("a-divider"),e("div",t._l(t.codeList,(function(a){return e("a-button",{key:a.id,attrs:{type:"link"},on:{click:function(e){return t.runTask(t.CancerStudyDetial.id,a.id)}}},[t._v(" "+t._s(a.name)+" ")])})),1),e("div",[e("a-table",{attrs:{columns:t.task_columns,"data-source":t.taskList,bordered:"",pagination:!1,"row-key":function(t){return t.id}},scopedSlots:t._u([{key:"action",fn:function(a,n){return e("span",{},[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.runTaskById(n.id)}}},[t._v("运行任务")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.showLog(n)}}},[t._v("LOG")])],1)}}],null,!1,3562338451)})],1),t.currentLogName?e("span",[t._v("current Log:"+t._s(t.currentLogName))]):t._e(),e("a-textarea",{attrs:{placeholder:"run log","auto-size":{minRows:3,maxRows:20}},model:{value:t.Log,callback:function(a){t.Log=a},expression:"Log"}}),e("a-button",{on:{click:function(a){return t.moreInfo(t.CancerStudyDetial.id)}}},[t._v("查看更多")])],1):t._e()]),e("a-button",{on:{click:t.createTSVFile}},[t._v("导出CSV")]),e("a-button",{on:{click:function(a){return t.initTSV(!1)}}},[t._v("导入CSV")]),e("a-button",{on:{click:function(a){return t.initTSV(!0)}}},[t._v("清空导入CSV")]),e("a-input-search",{staticStyle:{width:"200px"},attrs:{placeholder:"input search text"},on:{search:t.onSearch}}),e("a-table",{attrs:{columns:t.columns,"row-key":function(t){return t.id},"data-source":t.data,pagination:!1,loading:t.loading,scroll:{x:"calc(1500px + 100%)"}},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"id_link",fn:function(a){return e("div",{},[e("a",{attrs:{href:"javascript:;"}},[t._v(t._s(a))])])}},{key:"action",fn:function(a,n){return e("span",{},[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.checkFileExist(n.id)}}},[t._v(" 检测 ")]),n.status?e("a-divider",{attrs:{type:"vertical"}}):t._e(),n.status?e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.downlaod(n.relativePath)}}},[t._v("原始数据")]):t._e(),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.showDrawer(n)}}},[t._v("更多")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateCancerStudy(n.id)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.delCancerStudy(n.id)}}},[t._v("删除")])],1)}}])},[e("template",{slot:"footer"},[e("div",{staticClass:"page-wrapper",style:{textAlign:"right"}},[e("a-pagination",{staticClass:"pagination",attrs:{current:t.pagination.page,total:t.pagination.total,defaultPageSize:t.pagination.size,pageSizeOptions:["5","10","20","50","100"],showSizeChanger:""},on:{showSizeChange:t.handleTableChange,change:t.handleTableChange}})],1)])],2)],1)},o=[],i=(e("b0c0"),e("724d")),r=e("47d5"),c=e("b199"),d=[{title:"id",dataIndex:"id"},{title:"taskStatus",dataIndex:"taskStatus"},{title:"name",dataIndex:"name"},{title:"isSuccess",dataIndex:"isSuccess"},{title:"Action",key:"action",fixed:"right",scopedSlots:{customRender:"action"}}],s=[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id_link"},fixed:"left"},{title:"癌症名称",dataIndex:"cancer.name"},{title:"研究名称",dataIndex:"study.name"},{title:"数据来源",dataIndex:"dataOrigin.name"},{title:"数据分类",dataIndex:"dataCategory.name"},{title:"处理流程",dataIndex:"analysisSoftware.name"},{title:"基因注释",dataIndex:"annotation"},{title:"GSE",dataIndex:"gse"},{title:"parentId",dataIndex:"parentId"},{title:"codeId",dataIndex:"codeId"},{title:"大小",dataIndex:"size"},{title:"Action",key:"action",fixed:"right",scopedSlots:{customRender:"action"}}],u={data:function(){return{pagination:{page:1,size:10,sort:null,keyword:null},queryParam:{page:0,size:10,sort:null,keyword:null,categoryId:null,status:null},data:[],tasks:[],loading:!1,columns:s,task_columns:d,cancerId:null,visible:!1,CancerStudyDetial:void 0,codeList:[],taskList:[],Log:"",setIntervaStatus:void 0,currentLogName:void 0}},mounted:function(){var t=this;this.loadData(),this.$websock&&(this.$websock.onmessage=function(){t.loadData(),t.CancerStudyDetial&&t.loadTask(t.CancerStudyDetial.id)})},methods:{handleTableChange:function(t,a){this.pagination.page=t,this.pagination.size=a,this.loadData()},loadData:function(){var t=this;this.queryParam.page=this.pagination.page-1,this.queryParam.size=this.pagination.size,this.queryParam.sort=this.pagination.sort,this.queryParam.keyword=this.pagination.keyword;var a=this.$route.query.cancerId,e=this.$route.query.studyId,n=this.$route.query.dataOriginId,o=this.$route.query.dataCategoryId,r=this.$route.query.analysisSoftwareId;this.queryParam.cancerId=a,this.queryParam.studyId=e,this.queryParam.dataOriginId=n,this.queryParam.dataCategoryId=o,this.queryParam.analysisSoftwareId=r,this.loading=!0,i["a"].page(this.queryParam,!0).then((function(a){t.data=a.data.data.content,t.pagination.total=parseInt(a.data.data.totalElements),t.loading=!1}))},updateProject:function(t){this.$router.push({name:"cancer_cancer_study",query:{projectId:t}})},delProject:function(t){var a=this;i["a"].del(t).then((function(t){a.$notification["success"]({message:t.data.data.name+":删除成功!"}),a.loadData()}))},updateCancerStudy:function(t){this.$router.push({name:"update_cancer_study",query:{cancerStudyId:t}})},delCancerStudy:function(t){var a=this.loadData,e=this.$notification["success"];this.$confirm({title:"删除癌症数据",content:"您确定要删除该癌症数据吗?",onOk:function(){i["a"].del(t).then((function(t){a(),e({message:"删除成功!"+t.data.message})}))},onCancel:function(){}})},loadTask:function(t){var a=this;c["a"].page({objId:t,taskType:"CANCER_STUDY"}).then((function(t){a.taskList=t.data.data.content}))},loadCode:function(t){var a=this;r["a"].findByCan(t).then((function(t){a.codeList=t.data.data}))},showDrawer:function(t){this.visible=!0,this.CancerStudyDetial=t,this.loadCode(t.id),this.loadTask(t.id)},onClose:function(){this.visible=!1,this.CancerStudyDetial=void 0,this.Log="",this.setIntervaStatus&&clearInterval(this.setIntervaStatus)},checkFileExist:function(t){var a=this.loadData,e=this.$notification["success"],n=this.$notification["error"];i["a"].checkFileExist(t).then((function(t){a(),t.data.data.status?e({message:"文件存在："+t.data.data.absolutePath}):n({message:"文件不存在"+t.data.data.absolutePath})}))},moreInfo:function(t){this.$router.push({name:"cancer_study_task",query:{objId:t}})},loadLog:function(t){var a=this;c["a"].log({taskId:t}).then((function(t){a.Log=t.data.data}))},showLog:function(t){this.visible=!0;var a=this.loadLog;a(t.id),this.currentLogName=t.name,this.setIntervaStatus&&clearInterval(this.setIntervaStatus),this.setIntervaStatus=setInterval((function(){a(t.id)}),1e3)},runTaskById:function(t){var a=this;c["a"].runOne(t).then((function(t){a.loadData(),a.$message.success(t.data.data.name+"运行成功"),a.loadTask(a.CancerStudyDetial.id),a.showLog(t.data.data)}))},runTask:function(t,a){var e=this;c["a"].run({objId:t,codeId:a,taskType:"CANCER_STUDY"}).then((function(a){e.loadTask(t),e.$message.success(a.data.data.name+"创建成功"),e.showLog(a.data.data),e.loadCode(t)}))},downlaod:function(t){var a=JSON.parse(localStorage.getItem("global_config"));window.location.href=a.download_url+"/"+t},createTSVFile:function(){i["a"].createTSVFile().then((function(t){var a=t.data,e=new FileReader;e.readAsDataURL(a),e.onload=function(a){var e=document.createElement("a");console.log(t),e.download="export.tsv",e.href=a.target.result,document.body.appendChild(e),e.click(),document.body.removeChild(e)}}))},onSearch:function(t){this.pagination.keyword=t,this.loadData()},rowChannge:function(t,a){var e=this;t?i["a"].list({parentId:a.id}).then((function(t){e.innerData=t.data.data})):this.innerData=[]},initTSV:function(t){var a=this;i["a"].init({isEmpty:t,path:"/home/wangyang/Downloads/series.tsv"}).then((function(t){a.loadData(),a.$notification["success"]({message:t.data.message})}))}}},l=u,h=e("2877"),f=Object(h["a"])(l,n,o,!1,null,null,null);a["default"]=f.exports},b199:function(t,a,e){"use strict";var n=e("9efd"),o="/api/task",i={page:function(t){return Object(n["a"])({url:"".concat(o),params:t,method:"get"})},listAll:function(t,a){return Object(n["a"])({url:"".concat(o,"/listAll/").concat(t),params:a,method:"get"})},run:function(t){return Object(n["a"])({url:"".concat(o,"/run"),params:t,method:"get"})},log:function(t){return Object(n["a"])({url:"".concat(o,"/log"),params:t,method:"get"})},runOne:function(t){return Object(n["a"])({url:"".concat(o,"/run/").concat(t),method:"get"})},shutdown:function(t){return Object(n["a"])({url:"".concat(o,"/shutdown/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"get"})},findById:function(t){return Object(n["a"])({url:"".concat(o,"/findById/").concat(t),method:"get"})},runCodes:function(t){return Object(n["a"])({url:"".concat(o,"/runCodes"),data:t,method:"post"})},runByCodeId:function(t){return Object(n["a"])({url:"".concat(o,"/runByCodeId/").concat(t),method:"get"})},removeALlTask:function(){return Object(n["a"])({url:"".concat(o,"/removeALlTask"),method:"get"})},getObjMap:function(t){return Object(n["a"])({url:"".concat(o,"/getObjMap/").concat(t),method:"get"})}};a["a"]=i}}]);
//# sourceMappingURL=cancer_detial.6b8769d4.js.map