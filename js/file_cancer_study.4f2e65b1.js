(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["file_cancer_study"],{"724d":function(t,a,e){"use strict";var n=e("9efd"),i="/api/cancer_study",r={page:function(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({url:"".concat(i,"?more=").concat(a),params:t,method:"get"})},listByCancerId:function(t){return Object(n["a"])({url:"".concat(i,"/listByCancerId/").concat(t),method:"get"})},del:function(t){return Object(n["a"])({url:"".concat(i,"/del/").concat(t),method:"get"})},checkFileExist:function(t){return Object(n["a"])({url:"".concat(i,"/checkFile/").concat(t),method:"get"})},add:function(t){return Object(n["a"])({url:i,data:t,method:"post"})},update:function(t,a){return Object(n["a"])({url:"".concat(i,"/update/").concat(t),data:a,method:"post"})},findById:function(t,a){return Object(n["a"])({url:"".concat(i,"/findById/").concat(t),params:a,method:"get"})}};a["a"]=r},f49b:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-table",{attrs:{columns:t.columns,"row-key":function(t){return t.id},"data-source":t.data,pagination:!1,loading:t.loading},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"action",fn:function(a,n){return e("span",{},[e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateProject(n.id)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.delProject(n.id)}}},[t._v("删除")])],1)}}])},[e("template",{slot:"footer"},[e("div",{staticClass:"page-wrapper",style:{textAlign:"right"}},[e("a-pagination",{staticClass:"pagination",attrs:{current:t.pagination.page,total:t.pagination.total,defaultPageSize:t.pagination.size,pageSizeOptions:["5","10","20","50","100"],showSizeChanger:""},on:{showSizeChange:t.handleTableChange,change:t.handleTableChange}})],1)])],2)],1)},i=[],r=(e("b0c0"),e("724d")),c=[{title:"id",dataIndex:"id"},{title:"癌症名称",dataIndex:"cancer.name"},{title:"英文名称",dataIndex:"cancer.enName"},{title:"研究名称",dataIndex:"study.name"},{title:"英文名称",dataIndex:"study.enName"},{title:"数据来源",dataIndex:"dataOrigin.name"},{title:"英文名称",dataIndex:"dataOrigin.enName"},{title:"绝对路径",dataIndex:"absolutePath"},{title:"创建日期",dataIndex:"createDate"}],o={data:function(){return{pagination:{page:1,size:10,sort:null},queryParam:{page:0,size:10,sort:null,keyword:null,categoryId:null,status:null},data:[],loading:!1,columns:c,cancerId:null}},mounted:function(){this.loadData()},methods:{handleTableChange:function(t,a){this.pagination.page=t,this.pagination.size=a,this.loadData()},loadData:function(){var t=this;this.queryParam.page=this.pagination.page-1,this.queryParam.size=this.pagination.size,this.queryParam.sort=this.pagination.sort;var a=this.$route.query.cancerId,e=this.$route.query.studyId,n=this.$route.query.dataOriginId;this.queryParam.cancerId=a,this.queryParam.studyId=e,this.queryParam.dataOriginId=n,this.loading=!0,r["a"].page(this.queryParam).then((function(a){t.data=a.data.data.content,t.pagination.total=parseInt(a.data.data.totalElements),t.loading=!1}))},updateProject:function(t){this.$router.push({name:"cancer_cancer_study",query:{projectId:t}})},delProject:function(t){var a=this;r["a"].del(t).then((function(t){a.$notification["success"]({message:t.data.data.name+":删除成功!"}),a.loadData()}))},detial:function(t){this.$router.push({name:"cancer_cancer_study",query:{cancerId:t}})}}},d=o,u=e("2877"),s=Object(u["a"])(d,n,i,!1,null,null,null);a["default"]=s.exports}}]);
//# sourceMappingURL=file_cancer_study.4f2e65b1.js.map