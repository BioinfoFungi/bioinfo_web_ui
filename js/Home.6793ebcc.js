(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Home"],{bb51:function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[e._v(" "+e._s(e.user.username)+" "),o("button",{on:{click:e.logout}},[e._v("退出")]),o("h3",[e._v("使用方法")]),e._m(0),o("h3",[e._v("功能")]),e._m(1)])},n=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ol",[o("li")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ol",[o("li",[e._v("展示jupyter生成的生信报告")]),o("li",[e._v("图片上传到本地和oss")]),o("li",[e._v("基本的权限管理")])])}],c={data:function(){return{user:null}},created:function(){var e=JSON.parse(localStorage.getItem("user"));this.user=e},methods:{logout:function(){localStorage.removeItem("jwtToken"),localStorage.removeItem("user"),localStorage.removeItem("global_config"),this.$router.push("/login")}}},r=c,i=o("2877"),l=Object(i["a"])(r,s,n,!1,null,null,null);t["default"]=l.exports},f820:function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"about"},[o("h1",[e._v("websock test")])])}],c={name:"test",data:function(){return{websock:null}},created:function(){this.initWebSocket()},destroyed:function(){},methods:{initWebSocket:function(){var e="ws://8.140.164.151:8080/websocket/socketServer.do";this.websock=new WebSocket(e),this.websock.onmessage=this.websocketonmessage,this.websock.onopen=this.websocketonopen,this.websock.onerror=this.websocketonerror,this.websock.onclose=this.websocketclose},websocketonopen:function(){var e={test:"12345"};this.websocketsend(JSON.stringify(e))},websocketonerror:function(){},websocketonmessage:function(e){console.log(e)},websocketsend:function(e){this.websock.send(e)},websocketclose:function(e){console.log("断开连接",e)}}},r=c,i=o("2877"),l=Object(i["a"])(r,s,n,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=Home.6793ebcc.js.map