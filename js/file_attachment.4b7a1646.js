(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["file_attachment"],{a796:function(t,a,e){"use strict";var n=e("9efd"),i="/api/attachment",o={page:function(t){return Object(n["a"])({url:"".concat(i),params:t,method:"get"})},pageByPId:function(t,a){return Object(n["a"])({url:"".concat(i,"/page/").concat(t),params:a,method:"get"})},listByPId:function(t){return Object(n["a"])({url:"".concat(i,"/list/").concat(t),method:"get"})},add:function(t){return Object(n["a"])({url:i,data:t,method:"post"})},upload:function(t){return Object(n["a"])({url:"".concat(i,"/upload"),data:t,method:"post"})},uploadFiles:function(t,a){return Object(n["a"])({url:"".concat(i,"/uploadFiles/").concat(t),data:a,method:"post"})},del:function(t){return Object(n["a"])({url:"".concat(i,"/del/").concat(t),method:"get"})}};a["a"]=o},fdd3:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-input-search",{staticStyle:{width:"200px"},attrs:{placeholder:"input search text"},on:{search:t.onSearch}}),e("a-table",{attrs:{columns:t.columns,"row-key":function(t){return t.id},"data-source":t.data,pagination:!1,loading:t.loading},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"name",fn:function(a,n){return e("div",{},[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.detial(n.id)}}},[t._v(t._s(a))])])}},{key:"action",fn:function(a,n){return e("span",{},[e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateProject(n.id)}}},[t._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.delProject(n.id)}}},[t._v("删除")])],1)}}])},[e("template",{slot:"footer"},[e("div",{staticClass:"page-wrapper",style:{textAlign:"right"}},[e("a-pagination",{staticClass:"pagination",attrs:{current:t.pagination.page,total:t.pagination.total,defaultPageSize:t.pagination.size,pageSizeOptions:["5","10","20","50","100"],showSizeChanger:""},on:{showSizeChange:t.handleTableChange,change:t.handleTableChange}})],1)])],2)],1)},i=[],o=(e("b0c0"),e("a796")),r=[{title:"id",dataIndex:"id"},{title:"文件名称",dataIndex:"fileName"},{title:"英文名",dataIndex:"enName"},{title:"文件类型",dataIndex:"fileType"},{title:"绝对路径",dataIndex:"absolutePath"},{title:"相对路径",dataIndex:"relativePath"}],c={data:function(){return{pagination:{page:1,size:10,sort:null,keyword:null},queryParam:{page:0,size:10,sort:null,keyword:null,categoryId:null,status:null},data:[],loading:!1,columns:r}},mounted:function(){this.loadData()},methods:{handleTableChange:function(t,a){this.pagination.page=t,this.pagination.size=a,this.loadData()},loadData:function(){var t=this;this.queryParam.page=this.pagination.page-1,this.queryParam.size=this.pagination.size,this.queryParam.sort=this.pagination.sort,this.queryParam.keyword=this.pagination.keyword,this.loading=!0,o["a"].page(this.queryParam).then((function(a){t.data=a.data.data.content,t.pagination.total=parseInt(a.data.data.totalElements),t.loading=!1}))},updateProject:function(t){this.$router.push({name:"cancer_cancer_study",query:{projectId:t}})},delProject:function(t){var a=this;o["a"].del(t).then((function(t){a.$notification["success"]({message:t.data.data.name+":删除成功!"}),a.loadData()}))},detial:function(t){this.$router.push({name:"cancer_cancer_study",query:{studyId:t}})},onSearch:function(t){this.pagination.keyword=t,this.loadData()}}},d=c,s=e("2877"),l=Object(s["a"])(d,n,i,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=file_attachment.4b7a1646.js.map