(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["file_organize"],{be2c:function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("a-input-search",{staticStyle:{width:"200px"},attrs:{placeholder:"input search text"},on:{search:a.onSearch}}),e("a-table",{attrs:{columns:a.columns,"row-key":function(a){return a.id},"data-source":a.data,pagination:!1,loading:a.loading},on:{change:a.handleTableChange},scopedSlots:a._u([{key:"name",fn:function(t,n){return e("div",{},[e("a",{attrs:{href:"javascript:;"},on:{click:function(t){return a.detial(n.id)}}},[a._v(a._s(t))])])}},{key:"action",fn:function(t,n){return e("span",{},[e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(t){return a.updateProject(n.id)}}},[a._v("编辑")]),e("a-divider",{attrs:{type:"vertical"}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(t){return a.delProject(n.id)}}},[a._v("删除")])],1)}}])},[e("template",{slot:"footer"},[e("div",{staticClass:"page-wrapper",style:{textAlign:"right"}},[e("a-pagination",{staticClass:"pagination",attrs:{current:a.pagination.page,total:a.pagination.total,defaultPageSize:a.pagination.size,pageSizeOptions:["5","10","20","50","100"],showSizeChanger:""},on:{showSizeChange:a.handleTableChange,change:a.handleTableChange}})],1)])],2)],1)},i=[],o=(e("b0c0"),e("9efd")),r="/api/organize_file",s={page:function(a){return Object(o["a"])({url:"".concat(r),params:a,method:"get"})}},l=s,d=[{title:"id",dataIndex:"id"},{title:"文件名称",dataIndex:"fileName"},{title:"英文名",dataIndex:"enName"},{title:"文件类型",dataIndex:"fileType"},{title:"绝对路径",dataIndex:"absolutePath"},{title:"相对路径",dataIndex:"relativePath"}],c={data:function(){return{pagination:{page:1,size:10,sort:null,keyword:null},queryParam:{page:0,size:10,sort:null,keyword:null,categoryId:null,status:null},data:[],loading:!1,columns:d}},mounted:function(){this.loadData()},methods:{handleTableChange:function(a,t){this.pagination.page=a,this.pagination.size=t,this.loadData()},loadData:function(){var a=this;this.queryParam.page=this.pagination.page-1,this.queryParam.size=this.pagination.size,this.queryParam.sort=this.pagination.sort,this.queryParam.keyword=this.pagination.keyword,this.loading=!0,l.page(this.queryParam).then((function(t){a.data=t.data.data.content,a.pagination.total=parseInt(t.data.data.totalElements),a.loading=!1}))},updateProject:function(a){this.$router.push({name:"cancer_cancer_study",query:{projectId:a}})},delProject:function(a){var t=this;l.del(a).then((function(a){t.$notification["success"]({message:a.data.data.name+":删除成功!"}),t.loadData()}))},detial:function(a){this.$router.push({name:"cancer_cancer_study",query:{studyId:a}})},onSearch:function(a){this.pagination.keyword=a,this.loadData()}}},u=c,h=e("2877"),p=Object(h["a"])(u,n,i,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=file_organize.801707bf.js.map