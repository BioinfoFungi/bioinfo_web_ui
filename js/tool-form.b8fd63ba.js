(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tool-form"],{"057f":function(t,e,n){var r=n("fc6a"),a=n("241c").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return a(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==o.call(t)?u(t):a(r(t))}},"121a":function(t,e,n){"use strict";var r=n("9efd"),a="/api/tools",o={page:function(t){return Object(r["a"])({url:"".concat(a),params:t,method:"get"})},add:function(t){return Object(r["a"])({url:a,data:t,method:"post"})},updateContent:function(t,e){return Object(r["a"])({url:"".concat(a,"/updateContent/").concat(t),data:e,method:"post"})},update:function(t,e){return Object(r["a"])({url:"".concat(a,"/update/").concat(t),data:e,method:"post"})},findById:function(t){return Object(r["a"])({url:"".concat(a,"/find/").concat(t),method:"get"})},del:function(t){return Object(r["a"])({url:"".concat(a,"/del/").concat(t),method:"get"})}};e["a"]=o},"1e86":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.uniteEntries=e.uniteRules=void 0;var r=n("543e"),a=l(r),o=n("52b3"),i=l(o),u=n("2411"),c=l(u),s=n("63ea"),d=l(s),f=function(){function t(t,e){var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(n.push(i.value),e&&n.length===e)break}catch(c){a=!0,o=c}finally{try{!r&&u["return"]&&u["return"]()}finally{if(a)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function l(t){return t&&t.__esModule?t:{default:t}}function p(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var y=Array.isArray;function v(t,e,n,r){if(String(r.test)!==String(n.test)||(n.enforce||r.enforce)&&r.enforce!==n.enforce||n.include&&!h(r.include,n.include)||n.exclude&&!h(r.exclude,n.exclude))return!1;if(!(r.test||r.include||r.exclude||(r.loader&&r.loader.split("?")[0])===(n.loader&&n.loader.split("?")[0])))return!1;if((r.include||r.exclude)&&!n.include&&!n.exclude)return!1;if(r.oneOf&&n.oneOf)return r.oneOf=(0,a.default)(r.oneOf,n.oneOf,v.bind(null,{},"oneOf")),!0;if(n.loader){var o=n.options?"options":n.query&&"query";delete r.use,delete r.loaders,delete r.oneOf,r.loader=n.loader,o&&(r[o]=n[o])}else if(n.oneOf)delete r.use,delete r.loaders,delete r.loader,r.oneOf=n.oneOf;else if((r.use||r.loaders||r.loader)&&(n.use||n.loaders)){var u=function(t){return"string"===typeof t?{loader:t}:t},c=function(t){return t.options||t.query?t:t.loader},s=void 0;if(r.loader){var d=r.options?"options":r.query&&"query";s=[{loader:r.loader}],d&&(s[0][d]=r[d]),delete r.loader,d&&delete r[d]}else s=[].concat(r.use||r.loaders).map(u);var f=[].concat(n.use||n.loaders).map(u),l=r.use||n.use?"use":"loaders",y=e+"."+l;switch(t[y]){case"prepend":r[l]=[].concat(p((0,i.default)(f,s,b)),p(s)).map(c);break;case"replace":r[l]=n.use||n.loaders;break;default:r[l]=g(f,s).map(c)}}return n.include&&(r.include=n.include),n.exclude&&(r.exclude=n.exclude),!0}function h(t,e){var n=[t,e].map((function(t){return y(t)?[].concat(p(t)).sort():t})),r=f(n,2),a=r[0],o=r[1];return(0,d.default)(a,o)}function m(t,e){var n=/^([^?]+)/gi,r=e.loader.match(n),a=f(r,1),o=a[0],i=t.loader.match(n),u=f(i,1),c=u[0];return o===c}function b(t,e){return!!m(t,e)&&((0,c.default)(e,t),!0)}function g(t,e){for(var n=[],r=e.length-1,a=t.length-1;a>=0;a-=1){var o=t[a],i=O(e,o,m,r),u=-1!==i;if(u){for(var c=r;c>i;c-=1){var s=e[c],d=-1!==O(t,s,m,a);d||n.unshift(s),r-=1}b(o,e[r]),n.unshift(e[r]),r-=1}else{var f=-1!==O(n,o,m);f||n.unshift(o)}}for(r;r>=0;r-=1){var l=e[r],p=-1!==O(n,l,m);p||n.unshift(l)}return n}function O(t,e,n,r){r=r||t.length-1;for(var a=r;a>=0;a-=1)if(m(e,t[a]))return a;return-1}e.uniteRules=v,e.uniteEntries=b},2411:function(t,e,n){var r=n("f909"),a=n("2ec1"),o=a((function(t,e,n,a){r(t,e,n,a)}));t.exports=o},"266a":function(t,e,n){var r=n("7948");function a(t,e){return r(e,(function(e){return t[e]}))}t.exports=a},"2eaa":function(t,e,n){var r=n("d612"),a=n("8db3"),o=n("5edf"),i=n("7948"),u=n("b047f"),c=n("c584"),s=200;function d(t,e,n,d){var f=-1,l=a,p=!0,y=t.length,v=[],h=e.length;if(!y)return v;n&&(e=i(e,u(n))),d?(l=o,p=!1):e.length>=s&&(l=c,p=!1,e=new r(e));t:while(++f<y){var m=t[f],b=null==n?m:n(m);if(m=d||0!==m?m:0,p&&b===b){var g=h;while(g--)if(e[g]===b)continue t;v.push(m)}else l(e,b,d)||v.push(m)}return v}t.exports=d},"3ff1":function(t,e,n){var r=n("266a"),a=n("ec69");function o(t){return null==t?[]:r(t,a(t))}t.exports=o},"4df4":function(t,e,n){"use strict";var r=n("0366"),a=n("7b0b"),o=n("9bdd"),i=n("e95a"),u=n("50c4"),c=n("8418"),s=n("35a1");t.exports=function(t){var e,n,d,f,l,p,y=a(t),v="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,b=void 0!==m,g=s(y),O=0;if(b&&(m=r(m,h>2?arguments[2]:void 0,2)),void 0==g||v==Array&&i(g))for(e=u(y.length),n=new v(e);e>O;O++)p=b?m(y[O],O):y[O],c(n,O,p);else for(f=g.call(y),l=f.next,n=new v;!(d=l.call(f)).done;O++)p=b?o(f,m,[d.value,O],!0):d.value,c(n,O,p);return n.length=O,n}},"52b3":function(t,e,n){var r=n("2eaa"),a=n("5c69"),o=n("100e"),i=n("dcbe"),u=n("4416"),c=o((function(t,e){var n=u(e);return i(n)&&(n=void 0),i(t)?r(t,a(e,1,i,!0),void 0,n):[]}));t.exports=c},"543e":function(t,e,n){var r=n("5c69"),a=n("100e"),o=n("2c66"),i=n("dcbe"),u=n("4416"),c=a((function(t){var e=u(t);return e="function"==typeof e?e:void 0,o(r(t,1,i,!0),void 0,e)}));t.exports=c},"63ea":function(t,e,n){var r=n("c05f");function a(t,e){return r(t,e)}t.exports=a},"746f":function(t,e,n){var r=n("428f"),a=n("5135"),o=n("e5383"),i=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});a(e,t)||i(e,t,{value:o.f(t)})}},"7ce2":function(t,e,n){"use strict";var r=n("3ff1"),a=h(r),o=n("543e"),i=h(o),u=n("2411"),c=h(u),s=n("52b3"),d=h(s),f=n("ccbd"),l=h(f),p=n("1e86"),y=n("e4a1"),v=h(y);function h(t){return t&&t.__esModule?t:{default:t}}function m(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function b(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return 1===e.length?Array.isArray(e[0])?c.default.apply(void 0,[{}].concat(m(e[0]),[(0,l.default)(e[0])])):e[0].customizeArray||e[0].customizeObject?function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return Array.isArray(n[0])?c.default.apply(void 0,[{}].concat(m(n[0]),[(0,l.default)(e[0])])):c.default.apply(void 0,[{}].concat(n,[(0,l.default)(e[0])]))}:e[0]:c.default.apply(void 0,[{}].concat(e,[(0,l.default)()]))}var g=b({customizeArray:function(t,e,n){return x(n.split(".").slice(-1)[0])?(0,i.default)(t,e,p.uniteRules.bind(null,{},n)):null}}),O=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,a.default)(b(e))},k=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return b({customizeArray:w(t),customizeObject:S(t)})},A=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return b({customizeArray:function(e,n,r){var a=r.split(".").slice(-1)[0];if(x(a))switch(t[r]){case"prepend":return[].concat(m((0,d.default)(n,e,(function(e,n){return(0,p.uniteRules)(t,r,e,n,"prepend")}))),m(e));case"replace":return n;default:return(0,i.default)(e,n,p.uniteRules.bind(null,t,r))}return w(t)(e,n,r)},customizeObject:S(t)})};function w(t){return function(e,n,r){switch(t[r]){case"prepend":return[].concat(m(n),m(e));case"replace":return n;default:return!1}}}function S(t){return function(e,n,r){switch(t[r]){case"prepend":return(0,c.default)({},n,e,(0,l.default)());case"replace":return n;default:return!1}}}function x(t){return["preLoaders","loaders","postLoaders","rules"].indexOf(t)>=0}t.exports=b,t.exports.multiple=O,t.exports.smart=g,t.exports.strategy=k,t.exports.smartStrategy=A,t.exports.unique=v.default},9185:function(t,e,n){},"9bdd":function(t,e,n){var r=n("825a"),a=n("2a62");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){throw a(t),i}}},a434:function(t,e,n){"use strict";var r=n("23e7"),a=n("23cb"),o=n("a691"),i=n("50c4"),u=n("7b0b"),c=n("65f0"),s=n("8418"),d=n("1dde"),f=d("splice"),l=Math.max,p=Math.min,y=9007199254740991,v="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,r,d,f,h,m,b=u(this),g=i(b.length),O=a(t,g),k=arguments.length;if(0===k?n=r=0:1===k?(n=0,r=g-O):(n=k-2,r=p(l(o(e),0),g-O)),g+n-r>y)throw TypeError(v);for(d=c(b,r),f=0;f<r;f++)h=O+f,h in b&&s(d,f,b[h]);if(d.length=r,n<r){for(f=O;f<g-r;f++)h=f+r,m=f+n,h in b?b[m]=b[h]:delete b[m];for(f=g;f>g-r+n;f--)delete b[f-1]}else if(n>r)for(f=g-r;f>O;f--)h=f+r-1,m=f+n-1,h in b?b[m]=b[h]:delete b[m];for(f=0;f<n;f++)b[f+O]=arguments[f+2];return b.length=g-r+n,d}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),o=n("d066"),i=n("c430"),u=n("83ab"),c=n("4930"),s=n("fdbf"),d=n("d039"),f=n("5135"),l=n("e8b5"),p=n("861d"),y=n("825a"),v=n("7b0b"),h=n("fc6a"),m=n("c04e"),b=n("5c6c"),g=n("7c73"),O=n("df75"),k=n("241c"),A=n("057f"),w=n("7418"),S=n("06cf"),x=n("9bf2"),j=n("d1e7"),I=n("9112"),_=n("6eeb"),C=n("5692"),R=n("f772"),T=n("d012"),q=n("90e3"),D=n("b622"),M=n("e5383"),K=n("746f"),P=n("d44e"),U=n("69f3"),z=n("b727").forEach,J=R("hidden"),$="Symbol",E="prototype",L=D("toPrimitive"),N=U.set,B=U.getterFor($),F=Object[E],V=a.Symbol,H=o("JSON","stringify"),Q=S.f,W=x.f,Y=A.f,G=j.f,X=C("symbols"),Z=C("op-symbols"),tt=C("string-to-symbol-registry"),et=C("symbol-to-string-registry"),nt=C("wks"),rt=a.QObject,at=!rt||!rt[E]||!rt[E].findChild,ot=u&&d((function(){return 7!=g(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Q(F,e);r&&delete F[e],W(t,e,n),r&&t!==F&&W(F,e,r)}:W,it=function(t,e){var n=X[t]=g(V[E]);return N(n,{type:$,tag:t,description:e}),u||(n.description=e),n},ut=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof V},ct=function(t,e,n){t===F&&ct(Z,e,n),y(t);var r=m(e,!0);return y(n),f(X,r)?(n.enumerable?(f(t,J)&&t[J][r]&&(t[J][r]=!1),n=g(n,{enumerable:b(0,!1)})):(f(t,J)||W(t,J,b(1,{})),t[J][r]=!0),ot(t,r,n)):W(t,r,n)},st=function(t,e){y(t);var n=h(e),r=O(n).concat(yt(n));return z(r,(function(e){u&&!ft.call(n,e)||ct(t,e,n[e])})),t},dt=function(t,e){return void 0===e?g(t):st(g(t),e)},ft=function(t){var e=m(t,!0),n=G.call(this,e);return!(this===F&&f(X,e)&&!f(Z,e))&&(!(n||!f(this,e)||!f(X,e)||f(this,J)&&this[J][e])||n)},lt=function(t,e){var n=h(t),r=m(e,!0);if(n!==F||!f(X,r)||f(Z,r)){var a=Q(n,r);return!a||!f(X,r)||f(n,J)&&n[J][r]||(a.enumerable=!0),a}},pt=function(t){var e=Y(h(t)),n=[];return z(e,(function(t){f(X,t)||f(T,t)||n.push(t)})),n},yt=function(t){var e=t===F,n=Y(e?Z:h(t)),r=[];return z(n,(function(t){!f(X,t)||e&&!f(F,t)||r.push(X[t])})),r};if(c||(V=function(){if(this instanceof V)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=q(t),n=function(t){this===F&&n.call(Z,t),f(this,J)&&f(this[J],e)&&(this[J][e]=!1),ot(this,e,b(1,t))};return u&&at&&ot(F,e,{configurable:!0,set:n}),it(e,t)},_(V[E],"toString",(function(){return B(this).tag})),_(V,"withoutSetter",(function(t){return it(q(t),t)})),j.f=ft,x.f=ct,S.f=lt,k.f=A.f=pt,w.f=yt,M.f=function(t){return it(D(t),t)},u&&(W(V[E],"description",{configurable:!0,get:function(){return B(this).description}}),i||_(F,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:V}),z(O(nt),(function(t){K(t)})),r({target:$,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=V(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ut(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),r({target:"Object",stat:!0,forced:!c,sham:!u},{create:dt,defineProperty:ct,defineProperties:st,getOwnPropertyDescriptor:lt}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:yt}),r({target:"Object",stat:!0,forced:d((function(){w.f(1)}))},{getOwnPropertySymbols:function(t){return w.f(v(t))}}),H){var vt=!c||d((function(){var t=V();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));r({target:"JSON",stat:!0,forced:vt},{stringify:function(t,e,n){var r,a=[t],o=1;while(arguments.length>o)a.push(arguments[o++]);if(r=e,(p(e)||void 0!==t)&&!ut(t))return l(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ut(e))return e}),a[1]=e,H.apply(null,a)}})}V[E][L]||I(V[E],L,V[E].valueOf),P(V,$),T[J]=!0},a630e:function(t,e,n){var r=n("23e7"),a=n("4df4"),o=n("1c7e"),i=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:i},{from:a})},a6910:function(t,e,n){"use strict";n("9185")},b199:function(t,e,n){"use strict";n("99af");var r=n("9efd"),a="/api/task",o={addTask:function(t,e,n,o,i){return Object(r["a"])({url:"".concat(a,"/addTask/").concat(t,"?id=").concat(n,"&codeId=").concat(o,"&taskId=").concat(e),data:i,method:"post"})},page:function(t){return Object(r["a"])({url:"".concat(a),params:t,method:"get"})},listAll:function(t,e){return Object(r["a"])({url:"".concat(a,"/listAll/").concat(t),params:e,method:"get"})},run:function(t){return Object(r["a"])({url:"".concat(a,"/run"),params:t,method:"get"})},log:function(t){return Object(r["a"])({url:"".concat(a,"/log"),params:t,method:"get"})},runOne:function(t){return Object(r["a"])({url:"".concat(a,"/run/").concat(t),method:"get"})},upload:function(t,e){return Object(r["a"])({url:"".concat(a,"/upload/").concat(t),data:e,method:"post"})},shutdown:function(t){return Object(r["a"])({url:"".concat(a,"/shutdown/").concat(t),method:"get"})},del:function(t){return Object(r["a"])({url:"".concat(a,"/del/").concat(t),method:"get"})},findById:function(t){return Object(r["a"])({url:"".concat(a,"/findById/").concat(t),method:"get"})},runCodes:function(t){return Object(r["a"])({url:"".concat(a,"/runCodes"),data:t,method:"post"})},runByCodeId:function(t){return Object(r["a"])({url:"".concat(a,"/runByCodeId/").concat(t),method:"get"})},removeALlTask:function(){return Object(r["a"])({url:"".concat(a,"/removeALlTask"),method:"get"})},getObjMap:function(t){return Object(r["a"])({url:"".concat(a,"/getObjMap/").concat(t),method:"get"})}};e["a"]=o},c740:function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").findIndex,o=n("44d2"),i="findIndex",u=!0;i in[]&&Array(1)[i]((function(){u=!1})),r({target:"Array",proto:!0,forced:u},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(i)},ccbd:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("2411"),a=f(r),o=n("60ed"),i=f(o),u=n("9520"),c=f(u),s=n("0644"),d=f(s);function f(t){return t&&t.__esModule?t:{default:t}}function l(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}e.default=y;var p=Array.isArray;function y(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.customizeArray,n=t.customizeObject,r=t.key;return function t(o,u,s){var f=r?r+"."+s:s;if((0,c.default)(o)&&(0,c.default)(u))return function(){return t(o.apply(void 0,arguments),u.apply(void 0,arguments),s)};if(p(o)&&p(u)){var v=e&&e(o,u,f);return v||[].concat(l(o),l(u))}if((0,i.default)(o)&&(0,i.default)(u)){var h=n&&n(o,u,f);return h||(0,a.default)({},o,u,y({customizeArray:e,customizeObject:n,key:f}))}return(0,i.default)(u)?(0,d.default)(u):p(u)?[].concat(l(u)):u}}},d28b:function(t,e,n){var r=n("746f");r("iterator")},e01a:function(t,e,n){"use strict";var r=n("23e7"),a=n("83ab"),o=n("da84"),i=n("5135"),u=n("861d"),c=n("9bf2").f,s=n("e893"),d=o.Symbol;if(a&&"function"==typeof d&&(!("description"in d.prototype)||void 0!==d().description)){var f={},l=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof l?new d(t):void 0===t?d():d(t);return""===t&&(f[e]=!0),e};s(l,d);var p=l.prototype=d.prototype;p.constructor=l;var y=p.toString,v="Symbol(test)"==String(d("test")),h=/^Symbol\((.*)\)[^)]+$/;c(p,"description",{configurable:!0,get:function(){var t=u(this)?this.valueOf():this,e=y.call(t);if(i(f,t))return"";var n=v?e.slice(7,-1):e.replace(h,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:l})}},e4a1:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("52b3"),a=o(r);function o(t){return t&&t.__esModule?t:{default:t}}function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function u(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t){return t};return function(r,o,u){return u===t&&[].concat(i(r),i((0,a.default)(o,r,(function(t){return e.indexOf(n(t))>=0}))))}}e.default=u},e5383:function(t,e,n){var r=n("b622");e.f=r},ea2d:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-row",[n("a-col",{staticClass:"mr-1",staticStyle:{"padding-right":"0.5rem"},attrs:{span:12}},[n("a-card",{attrs:{title:t.tool.name}},[n("form-create",{attrs:{rule:t.rule,option:t.options,value:t.value},on:{"update:value":function(e){t.value=e}},model:{value:t.fApi,callback:function(e){t.fApi=e},expression:"fApi"}})],1)],1),n("a-col",{staticStyle:{"padding-left":"0.5rem"},attrs:{span:12}},[n("a-card",{staticStyle:{width:"100%"},attrs:{"tab-list":t.tabList,"active-tab-key":t.tabKey},on:{tabChange:function(e){return t.onTabChange(e,"tabKey")}}},["tab1"===t.tabKey?n("div",t._l(t.task.svgJson,(function(e,r){return n("div",{key:r,staticClass:"svgJson",domProps:{innerHTML:t._s(e)}})})),0):t._e(),"sourceCode"===t.tabKey?n("div",[n("a-textarea",{attrs:{value:t.task.generateCode,"auto-size":{minRows:15,maxRows:20}}})],1):t._e(),"matedata"===t.tabKey?n("div",[n("p",[t._v("metadata: "+t._s(t.task.metadata))]),n("p",[t._v("matrix: "+t._s(t.task.matrix))]),n("a-table",{attrs:{columns:t.columns,"data-source":t.matedata,pagination:!1},scopedSlots:t._u([t._l(["sample","group"],(function(e){return{key:e,fn:function(r,a){return[n("div",{key:e},[a.editable?n("a-input",{staticStyle:{margin:"-5px 0"},attrs:{value:r},on:{change:function(n){return t.handleChange(n.target.value,a.key,e)}}}):[t._v(" "+t._s(r)+" ")]],2)]}}})),{key:"operation",fn:function(e,r){return[n("div",{staticClass:"editable-row-operations"},[r.editable?n("span",[n("a",{on:{click:function(){return t.save(r.key)}}},[t._v("保存 ")])]):n("span",[n("a",{attrs:{disabled:""!==t.editingKey},on:{click:function(){return t.edit(r.key)}}},[t._v("编辑 ")])]),n("span",[n("a",{on:{click:function(){return t.del(r.key)}}},[t._v("删除 ")])])])]}}],null,!0)}),n("a-button",{on:{click:t.add}},[t._v("添加")])],1):t._e(),t._v(" "+t._s(t.contentList[t.tabKey])+" ")]),n("a-card",{staticStyle:{width:"100%"}})],1)],1)],1)},a=[];function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t){if(Array.isArray(t))return o(t)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630e");function u(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n("fb6a"),n("b0c0");function c(t,e){if(t){if("string"===typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t){return i(t)||u(t)||c(t)||s()}n("ac1f"),n("5319"),n("7db0"),n("c740"),n("a434");var f=n("b199"),l=n("121a"),p=n("7ce2"),y=n.n(p);const v="undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var h={randomUUID:v};let m;const b=new Uint8Array(16);function g(){if(!m&&(m="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!m))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(b)}const O=[];for(let C=0;C<256;++C)O.push((C+256).toString(16).slice(1));function k(t,e=0){return(O[t[e+0]]+O[t[e+1]]+O[t[e+2]]+O[t[e+3]]+"-"+O[t[e+4]]+O[t[e+5]]+"-"+O[t[e+6]]+O[t[e+7]]+"-"+O[t[e+8]]+O[t[e+9]]+"-"+O[t[e+10]]+O[t[e+11]]+O[t[e+12]]+O[t[e+13]]+O[t[e+14]]+O[t[e+15]]).toLowerCase()}function A(t,e,n){if(h.randomUUID&&!e&&!t)return h.randomUUID();t=t||{};const r=t.random||(t.rng||g)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e){n=n||0;for(let t=0;t<16;++t)e[n+t]=r[t];return e}return k(r)}var w=A,S=[{title:"sample",dataIndex:"sample",key:"sample",scopedSlots:{customRender:"sample"}},{title:"group",dataIndex:"group",key:"group",scopedSlots:{customRender:"group"}},{title:"operation",dataIndex:"operation",scopedSlots:{customRender:"operation"}}],x={data:function(){var t=this;return{columns:S,matedata:[],editingKey:"",tabList:[{key:"tab1",tab:"实时预览"},{key:"matedata",tab:"样本信息"},{key:"sourceCode",tab:"生成代码"},{key:"tab2",tab:"工具介绍"},{key:"tab3",tab:"详细说明"},{key:"tab4",tab:"常见问题"}],contentList:{tab1:"",tab2:"content2"},tabKey:"tab1",form:{},CRUD:"TOOLS",tool:{},fApi:{},value:{},formData:{},task:{id:-1},options:{onSubmit:function(e){console.log(t.tool),t.addTask(t.tool.id,t.tool.codeId,e)}},rule:[{type:"a-upload",field:"matrix",title:"矩阵",children:[{type:"a-button",children:[{type:"a-icon",props:{type:"upload"}},"文件上传"]}],props:{name:"matrix",customRequest:this.customRequest}},{type:"a-upload",field:"metadata",title:"样本信息",children:[{type:"a-button",children:[{type:"a-icon",props:{type:"upload"}},"文件上传"]}],props:{name:"metadata",customRequest:this.customRequest}},{type:"a-switch",field:"confidence_ellipse",title:"置信椭圆",value:!0}]}},beforeRouteEnter:function(t,e,n){var r=t.query.toolId,a=t.query.taskId;n((function(t){a&&(t.task.id=a,f["a"].findById(a).then((function(e){var n=e.data.data;n.svgJson=JSON.parse(n.svgJson),t.task=n,console.log(n)}))),r&&(t.toolId=r,l["a"].findById(r).then((function(e){t.tool=e.data.data})))}))},mounted:function(){var t=this;this.$websock&&(this.$websock.onmessage=function(e){var n=JSON.parse(e.data);if("NOTIFY"==n.msgType&&(t.$message.success(n.message),t.setIntervaStatus)){var r=t.setIntervaStatus;setTimeout((function(){clearInterval(r)}),2e3)}var a=n.data;a.svgJson=JSON.parse(a.svgJson),t.task=a})},methods:{onTabChange:function(t,e){console.log(t,e),this[e]=t},handleSubmit:function(){},customRequest:function(t){var e=this;this.formData=new FormData,this.formData.append("file",t.file),this.formData.append("field",t.filename),f["a"].upload(this.task.id,this.formData).then((function(r){t.onSuccess(r,t.file),n.percent=99,e.task=r.data.data,console.log(e.task),e.$router.replace({query:y()(e.$route.query,{taskId:e.task.id})})}));var n={percent:1},r=100/(t.file.size/65e3),a=setInterval((function(){n.percent<100?(n.percent+=r,t.onProgress(n)):clearInterval(a)}),100)},addTask:function(t,e,n){var r=this;f["a"].addTask(this.CRUD,this.task.id,t,e,n).then((function(t){r.task=t.data.data,r.tabKey="tab1",r.$route.query.taskId||r.$router.push({query:y()(r.$route.query,{taskId:r.task.id})}),console.log(r.matedata),r.$message.success(t.data.data.name+"创建成功")}))},edit:function(t){var e=d(this.matedata),n=e.find((function(e){return t===e.key}));this.editingKey=t,n&&(n.editable=!0,this.matedata=e)},cancel:function(t){var e=d(this.matedata),n=e.find((function(e){return t===e.key}));this.editingKey="",n&&(Object.assign(n,this.cacheData.find((function(e){return t===e.key}))),delete n.editable,this.matedata=e)},save:function(t){var e=d(this.matedata),n=e.find((function(e){return t===e.key}));console.log(n),n&&(delete n.editable,this.matedata=e),this.editingKey=""},del:function(t){var e=d(this.matedata),n=e.findIndex((function(e){return t===e.key}));console.log(n),n?(e.splice(n,1),this.matedata=e):0==n&&(e.shift(),this.matedata=e)},handleChange:function(t,e,n){var r=d(this.matedata),a=r.find((function(t){return e===t.key}));a&&(a[n]=t,this.matedata=r)},add:function(){var t=d(this.matedata),e=w();t.push({key:e,sample:"",group:""});var n=t.find((function(t){return e===t.key}));this.editingKey=e,n&&(n.editable=!0,this.matedata=t)}}},j=x,I=(n("a6910"),n("2877")),_=Object(I["a"])(j,r,a,!1,null,"b16673d8",null);e["default"]=_.exports},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),o=n("e8b5"),i=n("23cb"),u=n("50c4"),c=n("fc6a"),s=n("8418"),d=n("b622"),f=n("1dde"),l=f("slice"),p=d("species"),y=[].slice,v=Math.max;r({target:"Array",proto:!0,forced:!l},{slice:function(t,e){var n,r,d,f=c(this),l=u(f.length),h=i(t,l),m=i(void 0===e?l:e,l);if(o(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?a(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return y.call(f,h,m);for(r=new(void 0===n?Array:n)(v(m-h,0)),d=0;h<m;h++,d++)h in f&&s(r,d,f[h]);return r.length=d,r}})}}]);
//# sourceMappingURL=tool-form.b8fd63ba.js.map