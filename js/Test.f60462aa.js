(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Test"],{"057f":function(e,t,r){var n=r("fc6a"),o=r("241c").f,s={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],i=function(e){try{return o(e)}catch(t){return a.slice()}};e.exports.f=function(e){return a&&"[object Window]"==s.call(e)?i(e):o(n(e))}},1:function(e,t){},"159b":function(e,t,r){var n=r("da84"),o=r("fdbc"),s=r("17c2"),a=r("9112");for(var i in o){var c=n[i],u=c&&c.prototype;if(u&&u.forEach!==s)try{a(u,"forEach",s)}catch(l){u.forEach=s}}},"17c2":function(e,t,r){"use strict";var n=r("b727").forEach,o=r("a640"),s=o("forEach");e.exports=s?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},"1dde":function(e,t,r){var n=r("d039"),o=r("b622"),s=r("2d00"),a=o("species");e.exports=function(e){return s>=51||!n((function(){var t=[],r=t.constructor={};return r[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4de4":function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").filter,s=r("1dde"),a=s("filter");n({target:"Array",proto:!0,forced:!a},{filter:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},"67ad":function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2015
  * https://github.com/ded/reqwest
  */!function(e,t,r){module.exports?module.exports=r():(__WEBPACK_AMD_DEFINE_FACTORY__=r,__WEBPACK_AMD_DEFINE_RESULT__="function"===typeof __WEBPACK_AMD_DEFINE_FACTORY__?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}(0,0,(function(){var context=this,XHR2;if("window"in context)var doc=document,byTag="getElementsByTagName",head=doc[byTag]("head")[0];else try{XHR2=__webpack_require__(1)}catch(ex){throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")}var httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(e){if(!0===e["crossOrigin"]){var t=context[xmlHttpRequest]?new XMLHttpRequest:null;if(t&&"withCredentials"in t)return t;if(context[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return context[xmlHttpRequest]?new XMLHttpRequest:XHR2?new XHR2:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(e){return e}};function succeed(e){var t=protocolRe.exec(e.url);return t=t&&t[1]||context.location.protocol,httpsRe.test(t)?twoHundo.test(e.request.status):!!e.request.response}function handleReadyState(e,t,r){return function(){return e._aborted?r(e.request):e._timedOut?r(e.request,"Request is aborted: timeout"):void(e.request&&4==e.request[readyState]&&(e.request.onreadystatechange=noop,succeed(e)?t(e.request):r(e.request)))}}function setHeaders(e,t){var r,n=t["headers"]||{};n["Accept"]=n["Accept"]||defaultHeaders["accept"][t["type"]]||defaultHeaders["accept"]["*"];var o="undefined"!==typeof FormData&&t["data"]instanceof FormData;for(r in t["crossOrigin"]||n[requestedWith]||(n[requestedWith]=defaultHeaders["requestedWith"]),n[contentType]||o||(n[contentType]=t["contentType"]||defaultHeaders["contentType"]),n)n.hasOwnProperty(r)&&"setRequestHeader"in e&&e.setRequestHeader(r,n[r])}function setCredentials(e,t){"undefined"!==typeof t["withCredentials"]&&"undefined"!==typeof e.withCredentials&&(e.withCredentials=!!t["withCredentials"])}function generalCallback(e){lastValue=e}function urlappend(e,t){return e+(/\?/.test(e)?"&":"?")+t}function handleJsonp(e,t,r,n){var o=uniqid++,s=e["jsonpCallback"]||"callback",a=e["jsonpCallbackName"]||reqwest.getcallbackPrefix(o),i=new RegExp("((^|\\?|&)"+s+")=([^&]+)"),c=n.match(i),u=doc.createElement("script"),l=0,f=-1!==navigator.userAgent.indexOf("MSIE 10.0");return c?"?"===c[3]?n=n.replace(i,"$1="+a):a=c[3]:n=urlappend(n,s+"="+a),context[a]=generalCallback,u.type="text/javascript",u.src=n,u.async=!0,"undefined"===typeof u.onreadystatechange||f||(u.htmlFor=u.id="_reqwest_"+o),u.onload=u.onreadystatechange=function(){if(u[readyState]&&"complete"!==u[readyState]&&"loaded"!==u[readyState]||l)return!1;u.onload=u.onreadystatechange=null,u.onclick&&u.onclick(),t(lastValue),lastValue=void 0,head.removeChild(u),l=1},head.appendChild(u),{abort:function(){u.onload=u.onreadystatechange=null,r({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(u),l=1}}}function getRequest(e,t){var r,n=this.o,o=(n["method"]||"GET").toUpperCase(),s="string"===typeof n?n:n["url"],a=!1!==n["processData"]&&n["data"]&&"string"!==typeof n["data"]?reqwest.toQueryString(n["data"]):n["data"]||null,i=!1;return"jsonp"!=n["type"]&&"GET"!=o||!a||(s=urlappend(s,a),a=null),"jsonp"==n["type"]?handleJsonp(n,e,t,s):(r=n.xhr&&n.xhr(n)||xhr(n),r.open(o,s,!1!==n["async"]),setHeaders(r,n),setCredentials(r,n),context[xDomainRequest]&&r instanceof context[xDomainRequest]?(r.onload=e,r.onerror=t,r.onprogress=function(){},i=!0):r.onreadystatechange=handleReadyState(this,e,t),n["before"]&&n["before"](r),i?setTimeout((function(){r.send(a)}),200):r.send(a),r)}function Reqwest(e,t){this.o=e,this.fn=t,init.apply(this,arguments)}function setType(e){if(null!==e)return e.match("json")?"json":e.match("javascript")?"js":e.match("text")?"html":e.match("xml")?"xml":void 0}function init(o,fn){this.url="string"==typeof o?o:o["url"],this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;function complete(e){o["timeout"]&&clearTimeout(self.timeout),self.timeout=null;while(self._completeHandlers.length>0)self._completeHandlers.shift()(e)}function success(resp){var type=o["type"]||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=context.JSON?context.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML;break}self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);while(self._fulfillmentHandlers.length>0)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(e,t,r){e=self.request,self._responseArgs.resp=e,self._responseArgs.msg=t,self._responseArgs.t=r,self._erred=!0;while(self._errorHandlers.length>0)self._errorHandlers.shift()(e,t,r);complete(e)}fn=fn||function(){},o["timeout"]&&(this.timeout=setTimeout((function(){timedOut()}),o["timeout"])),o["success"]&&(this._successHandler=function(){o["success"].apply(o,arguments)}),o["error"]&&this._errorHandlers.push((function(){o["error"].apply(o,arguments)})),o["complete"]&&this._completeHandlers.push((function(){o["complete"].apply(o,arguments)})),this.request=getRequest.call(this,success,error)}function reqwest(e,t){return new Reqwest(e,t)}function normalize(e){return e?e.replace(/\r?\n/g,"\r\n"):""}function serial(e,t){var r,n,o,s,a=e.name,i=e.tagName.toLowerCase(),c=function(e){e&&!e["disabled"]&&t(a,normalize(e["attributes"]["value"]&&e["attributes"]["value"]["specified"]?e["value"]:e["text"]))};if(!e.disabled&&a)switch(i){case"input":/reset|button|image|file/i.test(e.type)||(r=/checkbox/i.test(e.type),n=/radio/i.test(e.type),o=e.value,(!r&&!n||e.checked)&&t(a,normalize(r&&""===o?"on":o)));break;case"textarea":t(a,normalize(e.value));break;case"select":if("select-one"===e.type.toLowerCase())c(e.selectedIndex>=0?e.options[e.selectedIndex]:null);else for(s=0;e.length&&s<e.length;s++)e.options[s].selected&&c(e.options[s]);break}}function eachFormElement(){var e,t,r=this,n=function(e,t){var n,o,s;for(n=0;n<t.length;n++)for(s=e[byTag](t[n]),o=0;o<s.length;o++)serial(s[o],r)};for(t=0;t<arguments.length;t++)e=arguments[t],/input|select|textarea/i.test(e.tagName)&&serial(e,r),n(e,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var e={};return eachFormElement.apply((function(t,r){t in e?(e[t]&&!isArray(e[t])&&(e[t]=[e[t]]),e[t].push(r)):e[t]=r}),arguments),e}function buildParams(e,t,r,n){var o,s,a,i=/\[\]$/;if(isArray(t))for(s=0;t&&s<t.length;s++)a=t[s],r||i.test(e)?n(e,a):buildParams(e+"["+("object"===typeof a?s:"")+"]",a,r,n);else if(t&&"[object Object]"===t.toString())for(o in t)buildParams(e+"["+o+"]",t[o],r,n);else n(e,t)}return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(e,t){return e=e||function(){},t=t||function(){},this._fulfilled?this._responseArgs.resp=e(this._responseArgs.resp):this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(e),this._errorHandlers.push(t)),this},always:function(e){return this._fulfilled||this._erred?e(this._responseArgs.resp):this._completeHandlers.push(e),this},fail:function(e){return this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(e),this},catch:function(e){return this.fail(e)}},reqwest.serializeArray=function(){var e=[];return eachFormElement.apply((function(t,r){e.push({name:t,value:r})}),arguments),e},reqwest.serialize=function(){if(0===arguments.length)return"";var e,t,r=Array.prototype.slice.call(arguments,0);return e=r.pop(),e&&e.nodeType&&r.push(e)&&(e=null),e&&(e=e.type),t="map"==e?serializeHash:"array"==e?reqwest.serializeArray:serializeQueryString,t.apply(null,r)},reqwest.toQueryString=function(e,t){var r,n,o=t||!1,s=[],a=encodeURIComponent,i=function(e,t){t="function"===typeof t?t():null==t?"":t,s[s.length]=a(e)+"="+a(t)};if(isArray(e))for(n=0;e&&n<e.length;n++)i(e[n]["name"],e[n]["value"]);else for(r in e)e.hasOwnProperty(r)&&buildParams(r,e[r],o,i);return s.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(e,t){return e&&(e["type"]&&(e["method"]=e["type"])&&delete e["type"],e["dataType"]&&(e["type"]=e["dataType"]),e["jsonpCallback"]&&(e["jsonpCallbackName"]=e["jsonpCallback"])&&delete e["jsonpCallback"],e["jsonp"]&&(e["jsonpCallback"]=e["jsonp"])),new Reqwest(e,t)},reqwest.ajaxSetup=function(e){for(var t in e=e||{},e)globalSetupOptions[t]=e[t]},reqwest}))},"746f":function(e,t,r){var n=r("428f"),o=r("5135"),s=r("e5383"),a=r("9bf2").f;e.exports=function(e){var t=n.Symbol||(n.Symbol={});o(t,e)||a(t,e,{value:s.f(e)})}},8418:function(e,t,r){"use strict";var n=r("c04e"),o=r("9bf2"),s=r("5c6c");e.exports=function(e,t,r){var a=n(t);a in e?o.f(e,a,s(0,r)):e[a]=r}},a4d3:function(e,t,r){"use strict";var n=r("23e7"),o=r("da84"),s=r("d066"),a=r("c430"),i=r("83ab"),c=r("4930"),u=r("fdbf"),l=r("d039"),f=r("5135"),p=r("e8b5"),d=r("861d"),h=r("825a"),y=r("7b0b"),m=r("fc6a"),b=r("c04e"),g=r("5c6c"),_=r("7c73"),v=r("df75"),w=r("241c"),x=r("057f"),q=r("7418"),O=r("06cf"),j=r("9bf2"),E=r("d1e7"),A=r("9112"),R=r("6eeb"),S=r("5692"),C=r("f772"),H=r("d012"),P=r("90e3"),T=r("b622"),k=r("e5383"),D=r("746f"),F=r("d44e"),N=r("69f3"),M=r("b727").forEach,I=C("hidden"),X="Symbol",W="prototype",L=T("toPrimitive"),z=N.set,B=N.getterFor(X),J=Object[W],K=o.Symbol,Q=s("JSON","stringify"),U=O.f,V=j.f,Y=x.f,$=E.f,G=S("symbols"),Z=S("op-symbols"),ee=S("string-to-symbol-registry"),te=S("symbol-to-string-registry"),re=S("wks"),ne=o.QObject,oe=!ne||!ne[W]||!ne[W].findChild,se=i&&l((function(){return 7!=_(V({},"a",{get:function(){return V(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=U(J,t);n&&delete J[t],V(e,t,r),n&&e!==J&&V(J,t,n)}:V,ae=function(e,t){var r=G[e]=_(K[W]);return z(r,{type:X,tag:e,description:t}),i||(r.description=t),r},ie=u?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof K},ce=function(e,t,r){e===J&&ce(Z,t,r),h(e);var n=b(t,!0);return h(r),f(G,n)?(r.enumerable?(f(e,I)&&e[I][n]&&(e[I][n]=!1),r=_(r,{enumerable:g(0,!1)})):(f(e,I)||V(e,I,g(1,{})),e[I][n]=!0),se(e,n,r)):V(e,n,r)},ue=function(e,t){h(e);var r=m(t),n=v(r).concat(he(r));return M(n,(function(t){i&&!fe.call(r,t)||ce(e,t,r[t])})),e},le=function(e,t){return void 0===t?_(e):ue(_(e),t)},fe=function(e){var t=b(e,!0),r=$.call(this,t);return!(this===J&&f(G,t)&&!f(Z,t))&&(!(r||!f(this,t)||!f(G,t)||f(this,I)&&this[I][t])||r)},pe=function(e,t){var r=m(e),n=b(t,!0);if(r!==J||!f(G,n)||f(Z,n)){var o=U(r,n);return!o||!f(G,n)||f(r,I)&&r[I][n]||(o.enumerable=!0),o}},de=function(e){var t=Y(m(e)),r=[];return M(t,(function(e){f(G,e)||f(H,e)||r.push(e)})),r},he=function(e){var t=e===J,r=Y(t?Z:m(e)),n=[];return M(r,(function(e){!f(G,e)||t&&!f(J,e)||n.push(G[e])})),n};if(c||(K=function(){if(this instanceof K)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=P(e),r=function(e){this===J&&r.call(Z,e),f(this,I)&&f(this[I],t)&&(this[I][t]=!1),se(this,t,g(1,e))};return i&&oe&&se(J,t,{configurable:!0,set:r}),ae(t,e)},R(K[W],"toString",(function(){return B(this).tag})),R(K,"withoutSetter",(function(e){return ae(P(e),e)})),E.f=fe,j.f=ce,O.f=pe,w.f=x.f=de,q.f=he,k.f=function(e){return ae(T(e),e)},i&&(V(K[W],"description",{configurable:!0,get:function(){return B(this).description}}),a||R(J,"propertyIsEnumerable",fe,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:K}),M(v(re),(function(e){D(e)})),n({target:X,stat:!0,forced:!c},{for:function(e){var t=String(e);if(f(ee,t))return ee[t];var r=K(t);return ee[t]=r,te[r]=t,r},keyFor:function(e){if(!ie(e))throw TypeError(e+" is not a symbol");if(f(te,e))return te[e]},useSetter:function(){oe=!0},useSimple:function(){oe=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!i},{create:le,defineProperty:ce,defineProperties:ue,getOwnPropertyDescriptor:pe}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:de,getOwnPropertySymbols:he}),n({target:"Object",stat:!0,forced:l((function(){q.f(1)}))},{getOwnPropertySymbols:function(e){return q.f(y(e))}}),Q){var ye=!c||l((function(){var e=K();return"[null]"!=Q([e])||"{}"!=Q({a:e})||"{}"!=Q(Object(e))}));n({target:"JSON",stat:!0,forced:ye},{stringify:function(e,t,r){var n,o=[e],s=1;while(arguments.length>s)o.push(arguments[s++]);if(n=t,(d(t)||void 0!==e)&&!ie(e))return p(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!ie(t))return t}),o[1]=t,Q.apply(null,o)}})}K[W][L]||A(K[W],L,K[W].valueOf),F(K,X),H[I]=!0},a640:function(e,t,r){"use strict";var n=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},b64b:function(e,t,r){var n=r("23e7"),o=r("7b0b"),s=r("df75"),a=r("d039"),i=a((function(){s(1)}));n({target:"Object",stat:!0,forced:i},{keys:function(e){return s(o(e))}})},dbb4:function(e,t,r){var n=r("23e7"),o=r("83ab"),s=r("56ef"),a=r("fc6a"),i=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(e){var t,r,n=a(e),o=i.f,u=s(n),l={},f=0;while(u.length>f)r=o(n,t=u[f++]),void 0!==r&&c(l,t,r);return l}})},ddf3:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-table",{attrs:{columns:e.columns,"row-key":function(e){return e.login.uuid},"data-source":e.data,pagination:e.pagination,loading:e.loading},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"name",fn:function(t){return[e._v(" "+e._s(t.first)+" "+e._s(t.last)+" ")]}}])})},o=[];r("b64b"),r("a4d3"),r("4de4"),r("e439"),r("159b"),r("dbb4");function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var c=r("67ad"),u=r.n(c),l=[{title:"Name",dataIndex:"name",sorter:!0,width:"20%",scopedSlots:{customRender:"name"}},{title:"Gender",dataIndex:"gender",filters:[{text:"Male",value:"male"},{text:"Female",value:"female"}],width:"20%"},{title:"Email",dataIndex:"email"}],f={data:function(){return{data:[],pagination:{},loading:!1,columns:l}},mounted:function(){this.fetch()},methods:{handleTableChange:function(e,t,r){var n=i({},this.pagination);n.current=e.current,this.pagination=n,this.fetch(i({results:e.pageSize,page:e.current,sortField:r.field,sortOrder:r.order},t))},fetch:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.loading=!0,u()({url:"https://randomuser.me/api",method:"get",data:i({results:10},t),type:"json"}).then((function(t){var r=i({},e.pagination);r.total=300,e.loading=!1,e.pagination=r,e.data=t.results}))}}},p=f,d=r("2877"),h=Object(d["a"])(p,n,o,!1,null,null,null);t["default"]=h.exports},e439:function(e,t,r){var n=r("23e7"),o=r("d039"),s=r("fc6a"),a=r("06cf").f,i=r("83ab"),c=o((function(){a(1)})),u=!i||c;n({target:"Object",stat:!0,forced:u,sham:!i},{getOwnPropertyDescriptor:function(e,t){return a(s(e),t)}})},e5383:function(e,t,r){var n=r("b622");t.f=n}}]);
//# sourceMappingURL=Test.f60462aa.js.map