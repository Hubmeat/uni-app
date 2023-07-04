"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("fs"),e=require("path"),n=require("debug"),s=require("merge"),i=require("jsonc-parser"),o=require("licia/isRelative"),r=require("ws"),a=require("events"),c=require("licia/uuid"),l=require("licia/stringify"),p=require("licia/dateFormat"),u=require("licia/waitUntil"),h=require("licia/fs"),d=require("licia/isFn"),m=require("licia/trim"),g=require("licia/isStr"),y=require("licia/startWith"),v=require("licia/isNum"),f=require("licia/sleep"),w=require("licia/isUndef"),P=require("address"),M=require("default-gateway"),k=require("licia/getPort"),E=require("qrcode-terminal"),I=require("child_process"),b=require("licia/toStr");function C(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var N=C(t),T=C(e),A=C(n),D=C(o),S=C(r),U=C(c),j=C(l),R=C(p),_=C(u),x=C(h),O=C(d),q=C(m),$=C(g),F=C(y),L=C(v),H=C(f),W=C(w),B=C(P),X=C(M),J=C(k),V=C(E),G=C(b);class z extends a.EventEmitter{constructor(t){super(),this.ws=t,this.ws.addEventListener("message",(t=>{this.emit("message",t.data)})),this.ws.addEventListener("close",(()=>{this.emit("close")}))}send(t){this.ws.send(t)}close(){this.ws.close()}}const K=new Map,Y=["onCompassChange","onThemeChange","onUserCaptureScreen","onWindowResize","onMemoryWarning","onAccelerometerChange","onKeyboardHeightChange","onNetworkStatusChange","onPushMessage","onLocationChange","onGetWifiList","onWifiConnected","onWifiConnectedWithPartialInfo"];const Q=new Map;function Z(t,e){(null==t?void 0:t.success)&&"function"==typeof(null==t?void 0:t.success)&&(e?t.success(e):t.success()),(null==t?void 0:t.complete)&&"function"==typeof(null==t?void 0:t.complete)&&(e?t.complete(e):t.complete())}function tt(t,e){(null==t?void 0:t.fail)&&"function"==typeof(null==t?void 0:t.fail)&&(e?t.fail(e):t.fail()),(null==t?void 0:t.complete)&&"function"==typeof(null==t?void 0:t.complete)&&(e?t.complete(e):t.complete())}const et="Connection closed";class nt extends a.EventEmitter{constructor(t,e,n){super(),this.puppet=e,this.namespace=n,this.callbacks=new Map,this.transport=t,this.debug=A.default("automator:protocol:"+this.namespace),this.onMessage=t=>{var e,n;this.debug(`${R.default("yyyy-mm-dd HH:MM:ss:l")} ◀ RECV ${t}`);const{id:s,method:i,error:o,result:r,params:a}=JSON.parse(t);if(null===(e=null==r?void 0:r.method)||void 0===e?void 0:e.startsWith("on"))return void((t,e,n)=>{const s=K.get(t);(null==s?void 0:s.has(e))&&s.get(e)(n)})(r.method,s,r);if(null===(n=null==r?void 0:r.method)||void 0===n?void 0:n.startsWith("Socket.")){return void((t,e,n)=>{const s=Q.get(e);(null==s?void 0:s.has(t))&&s.get(t)(n)})(r.method.replace("Socket.",""),r.id,r.data)}if(!s)return this.puppet.emit(i,a);const{callbacks:c}=this;if(s&&c.has(s)){const t=c.get(s);c.delete(s),o?t.reject(Error(o.message||o.detailMessage)):t.resolve(r)}},this.onClose=()=>{this.callbacks.forEach((t=>{t.reject(Error(et))}))},this.transport.on("message",this.onMessage),this.transport.on("close",this.onClose)}send(t,e={},n=!0){if(n&&this.puppet.adapter.has(t))return this.puppet.adapter.send(this,t,e);const s=U.default(),i=j.default({id:s,method:t,params:e});return this.debug(`${R.default("yyyy-mm-dd HH:MM:ss:l")} SEND ► ${i}`),new Promise(((t,e)=>{try{this.transport.send(i)}catch(t){e(Error(et))}this.callbacks.set(s,{resolve:t,reject:e})}))}dispose(){this.transport.close()}static createDevtoolConnection(t,e){return new Promise(((n,s)=>{const i=new S.default(t);i.addEventListener("open",(()=>{n(new nt(new z(i),e,"devtool"))})),i.addEventListener("error",s)}))}static createRuntimeConnection(t,e,n){return new Promise(((s,i)=>{A.default("automator:runtime")(`${R.default("yyyy-mm-dd HH:MM:ss:l")} port=${t}`);const o=new S.default.Server({port:t});_.default((async()=>{if(e.runtimeConnection)return!0}),n,1e3).catch((()=>{o.close(),i("Failed to connect to runtime, please make sure the project is running")})),o.on("connection",(function(t){A.default("automator:runtime")(`${R.default("yyyy-mm-dd HH:MM:ss:l")} connected`);const n=new nt(new z(t),e,"runtime");e.setRuntimeConnection(n),s(n)})),e.setRuntimeServer(o)}))}}async function st(t,e){const[n,s]=function(t){return $.default(t)?[!0,[t]]:[!1,t]}(e),i=await t(s);return n?i[0]:i}function it(t){try{return require(t)}catch(e){return require(require.resolve(t,{paths:[process.cwd()]}))}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function ot(t,e,n,s){var i,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(e,n,r):i(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r}var rt;function at(t,e){const n=e.value;return e.value=async function(e){return(await(null==n?void 0:n.call(this,e)))(t)},e}function ct(t,e,n){return at(rt.RUNTIME,n)}function lt(t,e,n){return at(rt.DEVTOOL,n)}/^win/.test(process.platform),function(t){t.RUNTIME="runtime",t.DEVTOOL="devtool"}(rt||(rt={}));class pt{constructor(t){this.puppet=t}invoke(t,e){return async n=>this.puppet.devtoolConnection?(n===rt.DEVTOOL?this.puppet.devtoolConnection:this.puppet.runtimeConnection).send(t,e):this.puppet.runtimeConnection.send(t,e)}on(t,e){this.puppet.on(t,e)}}class ut extends pt{constructor(t,e){super(t),this.id=e.elementId,this.pageId=e.pageId,this.nodeId=e.nodeId,this.videoId=e.videoId}async getData(t){return this.invokeMethod("Element.getData",t)}async setData(t){return this.invokeMethod("Element.setData",t)}async callMethod(t){return this.invokeMethod("Element.callMethod",t)}async getElement(t){return this.invokeMethod("Element.getElement",t)}async getElements(t){return this.invokeMethod("Element.getElements",t)}async getOffset(){return this.invokeMethod("Element.getOffset")}async getHTML(t){return this.invokeMethod("Element.getHTML",t)}async getAttributes(t){return this.invokeMethod("Element.getAttributes",t)}async getStyles(t){return this.invokeMethod("Element.getStyles",t)}async getDOMProperties(t){return this.invokeMethod("Element.getDOMProperties",t)}async getProperties(t){return this.invokeMethod("Element.getProperties",t)}async tap(){return this.invokeMethod("Element.tap")}async longpress(){return this.invokeMethod("Element.longpress")}async touchstart(t){return this.invokeMethod("Element.touchstart",t)}async touchmove(t){return this.invokeMethod("Element.touchmove",t)}async touchend(t){return this.invokeMethod("Element.touchend",t)}async triggerEvent(t){return this.invokeMethod("Element.triggerEvent",t)}async callFunction(t){return this.invokeMethod("Element.callFunction",t)}async callContextMethod(t){return this.invokeMethod("Element.callContextMethod",t)}invokeMethod(t,e={}){return e.elementId=this.id,e.pageId=this.pageId,this.nodeId&&(e.nodeId=this.nodeId),this.videoId&&(e.videoId=this.videoId),this.invoke(t,e)}}ot([ct],ut.prototype,"getData",null),ot([ct],ut.prototype,"setData",null),ot([ct],ut.prototype,"callMethod",null),ot([lt],ut.prototype,"getElement",null),ot([lt],ut.prototype,"getElements",null),ot([lt],ut.prototype,"getOffset",null),ot([lt],ut.prototype,"getHTML",null),ot([lt],ut.prototype,"getAttributes",null),ot([lt],ut.prototype,"getStyles",null),ot([lt],ut.prototype,"getDOMProperties",null),ot([lt],ut.prototype,"getProperties",null),ot([lt],ut.prototype,"tap",null),ot([lt],ut.prototype,"longpress",null),ot([lt],ut.prototype,"touchstart",null),ot([lt],ut.prototype,"touchmove",null),ot([lt],ut.prototype,"touchend",null),ot([lt],ut.prototype,"triggerEvent",null),ot([lt],ut.prototype,"callFunction",null),ot([lt],ut.prototype,"callContextMethod",null);const ht=require("util");class dt{constructor(t,e,n){this.puppet=t,this.id=e.elementId,this.pageId=e.pageId,this.nodeId=e.nodeId||null,this.videoId=e.videoId||null,this.tagName=e.tagName,this.nvue=e.nvue,this.elementMap=n,"body"!==this.tagName&&"page-body"!==this.tagName||(this.tagName="page"),this.api=new ut(t,e)}toJSON(){return JSON.stringify({id:this.id,tagName:this.tagName,pageId:this.pageId,nodeId:this.nodeId,videoId:this.videoId})}toString(){return this.toJSON()}[ht.inspect.custom](){return this.toJSON()}async $(t){try{const e=await this.api.getElement({selector:t});return dt.create(this.puppet,Object.assign({},e,{pageId:this.pageId}),this.elementMap)}catch(t){return null}}async $$(t){const{elements:e}=await this.api.getElements({selector:t});return e.map((t=>dt.create(this.puppet,Object.assign({},t,{pageId:this.pageId}),this.elementMap)))}async size(){const[t,e]=await this.domProperty(["offsetWidth","offsetHeight"]);return{width:t,height:e}}async offset(){const{left:t,top:e}=await this.api.getOffset();return{left:t,top:e}}async text(){return this.domProperty("innerText")}async attribute(t){if(!$.default(t))throw Error("name must be a string");return(await this.api.getAttributes({names:[t]})).attributes[0]}async value(){return this.property("value")}async property(t){if(!$.default(t))throw Error("name must be a string");if(this.puppet.checkProperty){let e=this.publicProps;if(e||(this.publicProps=e=await this._property("__propPublic")),!e[t])throw Error(`${this.tagName}.${t} not exists`)}return this._property(t)}async html(){return(await this.api.getHTML({type:"inner"})).html}async outerHtml(){return(await this.api.getHTML({type:"outer"})).html}async style(t){if(!$.default(t))throw Error("name must be a string");return(await this.api.getStyles({names:[t]})).styles[0]}async tap(){return this.api.tap()}async longpress(){return this.nvue||"true"===process.env.UNI_APP_X?this.api.longpress():(await this.touchstart(),await H.default(350),this.touchend())}async trigger(t,e){const n={type:t};return W.default(e)||(n.detail=e),this.api.triggerEvent(n)}async touchstart(t){return this.api.touchstart(t)}async touchmove(t){return this.api.touchmove(t)}async touchend(t){return this.api.touchend(t)}async domProperty(t){return st((async t=>(await this.api.getDOMProperties({names:t})).properties),t)}_property(t){return st((async t=>(await this.api.getProperties({names:t})).properties),t)}send(t,e){return e.elementId=this.id,e.pageId=this.pageId,this.nodeId&&(e.nodeId=this.nodeId),this.videoId&&(e.videoId=this.videoId),this.puppet.send(t,e)}async callFunction(t,...e){return(await this.api.callFunction({functionName:t,args:e})).result}static create(t,e,n){let s,i=n.get(e.elementId);if(i)return i;if(e.nodeId)s=mt;else switch(e.tagName){case"input":s=gt;break;case"textarea":s=yt;break;case"scroll-view":s=vt;break;case"swiper":s=ft;break;case"movable-view":s=wt;break;case"switch":s=Pt;break;case"slider":s=Mt;break;case"video":s=kt;break;default:s=dt}return i=new s(t,e,n),n.set(e.elementId,i),i}}class mt extends dt{async setData(t){return this.api.setData({data:t})}async data(t){const e={};return t&&(e.path=t),(await this.api.getData(e)).data}async callMethod(t,...e){return(await this.api.callMethod({method:t,args:e})).result}}class gt extends dt{async input(t){return this.callFunction("input.input",t)}}class yt extends dt{async input(t){return this.callFunction("textarea.input",t)}}class vt extends dt{async scrollTo(t,e){return this.callFunction("scroll-view.scrollTo",t,e)}async property(t){return"scrollTop"===t?this.callFunction("scroll-view.scrollTop"):"scrollLeft"===t?this.callFunction("scroll-view.scrollLeft"):super.property(t)}async scrollWidth(){return this.callFunction("scroll-view.scrollWidth")}async scrollHeight(){return this.callFunction("scroll-view.scrollHeight")}}class ft extends dt{async swipeTo(t){return this.callFunction("swiper.swipeTo",t)}}class wt extends dt{async moveTo(t,e){return this.callFunction("movable-view.moveTo",t,e)}async property(t){return"x"===t?this._property("_translateX"):"y"===t?this._property("_translateY"):super.property(t)}}class Pt extends dt{async tap(){return this.callFunction("switch.tap")}}class Mt extends dt{async slideTo(t){return this.callFunction("slider.slideTo",t)}}class kt extends dt{async callContextMethod(t,...e){return await this.api.callContextMethod({method:t,args:e})}}class Et extends pt{constructor(t,e){super(t),this.id=e.id}async getData(t){return this.invokeMethod("Page.getData",t)}async setData(t){return this.invokeMethod("Page.setData",t)}async callMethod(t){return this.invokeMethod("Page.callMethod",t)}async callMethodWithCallback(t){return this.invokeMethod("Page.callMethodWithCallback",t)}async getElement(t){return this.invokeMethod("Page.getElement",t)}async getElements(t){return this.invokeMethod("Page.getElements",t)}async getWindowProperties(t){return this.invokeMethod("Page.getWindowProperties",t)}invokeMethod(t,e={}){return e.pageId=this.id,this.invoke(t,e)}}ot([ct],Et.prototype,"getData",null),ot([ct],Et.prototype,"setData",null),ot([ct],Et.prototype,"callMethod",null),ot([ct],Et.prototype,"callMethodWithCallback",null),ot([lt],Et.prototype,"getElement",null),ot([lt],Et.prototype,"getElements",null),ot([lt],Et.prototype,"getWindowProperties",null);const It=require("util");class bt{constructor(t,e){this.puppet=t,this.id=e.id,this.path=e.path,this.query=e.query,this.elementMap=new Map,this.api=new Et(t,e)}toJSON(){return JSON.stringify({id:this.id,path:this.path,query:this.query})}toString(){return this.toJSON()}[It.inspect.custom](){return this.toJSON()}async waitFor(t){return L.default(t)?await H.default(t):O.default(t)?_.default(t):$.default(t)?_.default((async()=>(await this.$$(t)).length>0)):void 0}async $(t){try{const e=await this.api.getElement({selector:t});return dt.create(this.puppet,Object.assign({selector:t},e,{pageId:this.id}),this.elementMap)}catch(t){return null}}async $$(t){const{elements:e}=await this.api.getElements({selector:t});return e.map((e=>dt.create(this.puppet,Object.assign({selector:t},e,{pageId:this.id}),this.elementMap)))}async data(t){const e={};return t&&(e.path=t),(await this.api.getData(e)).data}async setData(t){return this.api.setData({data:t})}async size(){const[t,e]=await this.windowProperty(["document.documentElement.scrollWidth","document.documentElement.scrollHeight"]);return{width:t,height:e}}async callMethod(t,...e){return(await this.api.callMethod({method:t,args:e})).result}async callMethodWithCallback(t,...e){return await this.api.callMethodWithCallback({method:t,args:e})}async scrollTop(){return this.windowProperty("document.documentElement.scrollTop")}async windowProperty(t){const e=$.default(t);e&&(t=[t]);const{properties:n}=await this.api.getWindowProperties({names:t});return e?n[0]:n}static create(t,e,n){let s=n.get(e.id);return s?(s.query=e.query,s):(s=new bt(t,e),n.set(e.id,s),s)}}class Ct extends pt{async getPageStack(){return this.invoke("App.getPageStack")}async callUniMethod(t){return this.invoke("App.callUniMethod",t)}async getCurrentPage(){return this.invoke("App.getCurrentPage")}async mockUniMethod(t){return this.invoke("App.mockUniMethod",t)}async captureScreenshotByRuntime(t){return this.invoke("App.captureScreenshot",t)}async socketEmitter(t){return this.invoke("App.socketEmitter",t)}async callFunction(t){return this.invoke("App.callFunction",t)}async captureScreenshot(t){return this.invoke("App.captureScreenshot",t)}async exit(){return this.invoke("App.exit")}async addBinding(t){return this.invoke("App.addBinding",t)}async enableLog(){return this.invoke("App.enableLog")}onLogAdded(t){return this.on("App.logAdded",t)}onBindingCalled(t){return this.on("App.bindingCalled",t)}onExceptionThrown(t){return this.on("App.exceptionThrown",t)}}ot([ct],Ct.prototype,"getPageStack",null),ot([ct],Ct.prototype,"callUniMethod",null),ot([ct],Ct.prototype,"getCurrentPage",null),ot([ct],Ct.prototype,"mockUniMethod",null),ot([ct],Ct.prototype,"captureScreenshotByRuntime",null),ot([ct],Ct.prototype,"socketEmitter",null),ot([lt],Ct.prototype,"callFunction",null),ot([lt],Ct.prototype,"captureScreenshot",null),ot([lt],Ct.prototype,"exit",null),ot([lt],Ct.prototype,"addBinding",null),ot([lt],Ct.prototype,"enableLog",null);class Nt extends pt{async getInfo(){return this.invoke("Tool.getInfo")}async enableRemoteDebug(t){return this.invoke("Tool.enableRemoteDebug")}async close(){return this.invoke("Tool.close")}async getTestAccounts(){return this.invoke("Tool.getTestAccounts")}onRemoteDebugConnected(t){this.puppet.once("Tool.onRemoteDebugConnected",t),this.puppet.once("Tool.onPreviewConnected",t)}}function Tt(t){return new Promise((e=>setTimeout(e,t)))}ot([lt],Nt.prototype,"getInfo",null),ot([lt],Nt.prototype,"enableRemoteDebug",null),ot([lt],Nt.prototype,"close",null),ot([lt],Nt.prototype,"getTestAccounts",null);class At extends a.EventEmitter{constructor(t,e){super(),this.puppet=t,this.options=e,this.pageMap=new Map,this.appBindings=new Map,this.appApi=new Ct(t),this.toolApi=new Nt(t),this.appApi.onLogAdded((t=>{this.emit("console",t)})),this.appApi.onBindingCalled((({name:t,args:e})=>{try{const n=this.appBindings.get(t);n&&n(...e)}catch(t){}})),this.appApi.onExceptionThrown((t=>{this.emit("exception",t)}))}async pageStack(){return(await this.appApi.getPageStack()).pageStack.map((t=>bt.create(this.puppet,t,this.pageMap)))}async navigateTo(t){return this.changeRoute("navigateTo",t)}async redirectTo(t){return this.changeRoute("redirectTo",t)}async navigateBack(){return this.changeRoute("navigateBack")}async reLaunch(t){return this.changeRoute("reLaunch",t)}async switchTab(t){return this.changeRoute("switchTab",t)}async currentPage(){const{id:t,path:e,query:n}=await this.appApi.getCurrentPage();return bt.create(this.puppet,{id:t,path:e,query:n},this.pageMap)}async systemInfo(){return this.callUniMethod("getSystemInfoSync")}async callUniMethod(t,...e){return(await this.appApi.callUniMethod({method:t,args:e})).result}async mockUniMethod(t,e,...n){return O.default(e)||(s=e,$.default(s)&&(s=q.default(s),F.default(s,"function")||F.default(s,"() =>")))?this.appApi.mockUniMethod({method:t,functionDeclaration:e.toString(),args:n}):this.appApi.mockUniMethod({method:t,result:e});var s}async restoreUniMethod(t){return this.appApi.mockUniMethod({method:t})}async evaluate(t,...e){return(await this.appApi.callFunction({functionDeclaration:t.toString(),args:e})).result}async pageScrollTo(t){await this.callUniMethod("pageScrollTo",{scrollTop:t,duration:0})}async close(){try{await this.appApi.exit()}catch(t){}await Tt(1e3),this.puppet.disposeRuntimeServer(),await this.toolApi.close(),this.disconnect()}async teardown(){return this["disconnect"===this.options.teardown?"disconnect":"close"]()}async remote(t){if(!this.puppet.devtools.remote)return console.warn(`Failed to enable remote, ${this.puppet.devtools.name} is unimplemented`);const{qrCode:e}=await this.toolApi.enableRemoteDebug({auto:t});var n;e&&await(n=e,new Promise((t=>{V.default.generate(n,{small:!0},(e=>{process.stdout.write(e),t(void 0)}))})));const s=new Promise((t=>{this.toolApi.onRemoteDebugConnected((async()=>{await Tt(1e3),t(void 0)}))})),i=new Promise((t=>{this.puppet.setRemoteRuntimeConnectionCallback((()=>{t(void 0)}))}));return Promise.all([s,i])}disconnect(){this.puppet.dispose()}on(t,e){return"console"===t&&this.appApi.enableLog(),super.on(t,e),this}async exposeFunction(t,e){if(this.appBindings.has(t))throw Error(`Failed to expose function with name ${t}: already exists!`);this.appBindings.set(t,e),await this.appApi.addBinding({name:t})}async checkVersion(){}async screenshot(t){const{data:e}=await this.appApi.captureScreenshotByRuntime({fullPage:null==t?void 0:t.fullPage});if(!(null==t?void 0:t.path))return e;await x.default.writeFile(t.path,e,"base64")}async testAccounts(){return(await this.toolApi.getTestAccounts()).accounts}async changeRoute(t,e){return await this.callUniMethod(t,{url:e}),await Tt(3e3),this.currentPage()}async socketEmitter(t){return this.appApi.socketEmitter(t)}}class Dt{constructor(t){this.options=t}has(t){return!!this.options[t]}send(t,e,n){const s=this.options[e];if(!s)return Promise.reject(Error(`adapter for ${e} not found`));const i=s.reflect;return i?(s.params&&(n=s.params(n)),"function"==typeof i?i(t.send.bind(t),n):(e=i,t.send(e,n))):Promise.reject(Error(`${e}'s reflect is required`))}}const St=A.default("automator:puppet"),Ut=".automator.json";function jt(t){try{return require(t)}catch(t){}}function Rt(t,e,n,s){const i=function(t,e,n){let s,i;return process.env.UNI_OUTPUT_DIR?(i=T.default.join(process.env.UNI_OUTPUT_DIR,`../.automator/${e}`,Ut),s=jt(i)):(i=T.default.join(t,`dist/${n}/.automator/${e}`,Ut),s=jt(i),s||(i=T.default.join(t,`unpackage/dist/${n}/.automator/${e}`,Ut),s=jt(i))),St(`${i}=>${JSON.stringify(s)}`),s}(t,n,s);if(!i||!i.wsEndpoint)return!1;const o=require("../package.json").version;if(i.version!==o)return St(`unmet=>${i.version}!==${o}`),!1;const r=function(t){let e;try{const t=X.default.v4.sync();e=B.default.ip(t&&t.interface),e&&(/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(e)||(e=void 0))}catch(t){}return"ws://"+(e||"localhost")+":"+t}(e);return St(`wsEndpoint=>${r}`),i.wsEndpoint===r}class _t extends a.EventEmitter{constructor(t,e){if(super(),this.isX=!1,"true"===process.env.UNI_APP_X&&(this.isX=!0),e)this.target=e;else{if(this.target=null,"h5"===t)try{this.target=it("@dcloudio/uni-h5/lib/h5/uni.automator.js")}catch(t){}this.target||(this.target=it(`@dcloudio/uni-${"app"===t?"app-plus":t}/lib/uni.automator.js`))}if(!this.target)throw Error("puppet is not provided");this.platform=t,this.adapter=new Dt(this.target.adapter||{})}setCompiler(t){this.compiler=t}setRuntimeServer(t){this.wss=t}setRemoteRuntimeConnectionCallback(t){this.remoteRuntimeConnectionCallback=t}setRuntimeConnection(t){this.runtimeConnection=t,this.remoteRuntimeConnectionCallback&&(this.remoteRuntimeConnectionCallback(),this.remoteRuntimeConnectionCallback=null)}setDevtoolConnection(t){this.devtoolConnection=t}disposeRuntimeServer(){this.wss&&this.wss.close()}disposeRuntime(){this.runtimeConnection.dispose()}disposeDevtool(){this.compiler&&this.compiler.stop(),this.devtoolConnection&&this.devtoolConnection.dispose()}dispose(){this.disposeRuntime(),this.disposeDevtool(),this.disposeRuntimeServer()}send(t,e){return this.runtimeConnection.send(t,e)}validateProject(t){const e=this.target.devtools.required;return!e||!e.find((e=>!N.default.existsSync(T.default.join(t,e))))}validateDevtools(t){const e=this.target.devtools.validate;return e?e(t,this):Promise.resolve(t)}createDevtools(t,e,n){const s=this.target.devtools.create;return s?(e.timeout=n,s(t,e,this)):Promise.resolve()}shouldCompile(t,e,n,s){this.compiled=!0;const i=this.target.shouldCompile;return i?this.compiled=i(n,s):!0===n.compile?this.compiled=!0:this.compiled=!Rt(t,e,this.platform,this.mode),this.compiled}get checkProperty(){return"mp-weixin"===this.platform}get devtools(){return this.target.devtools}get mode(){const t=this.target.mode;return t||("production"===process.env.NODE_ENV?"build":"dev")}}const xt=A.default("automator:compiler"),Ot=/The\s+(.*)\s+directory is ready/;class qt{constructor(t){this.puppet=t,this.puppet.setCompiler(this)}compile(t){const e=this.puppet.mode,n=this.puppet.platform;let s=t.silent;const i=t.port,o=t.host,r=`${e}:${n}`,a=t.projectPath,[c,l]=this.getSpawnArgs(t,r);l.push("--auto-port"),l.push(G.default(i)),o&&(l.push("--auto-host"),l.push(o));const p={cwd:t.cliPath,env:Object.assign(Object.assign({},process.env),{NODE_ENV:"build"===e?"production":"development"})};return new Promise(((t,i)=>{const o=o=>{const r=o.toString().trim();if(!s&&console.log(r),r.includes("- Network")||r.includes("> Network")||r.includes("➜  Network")){const e=r.match(/Network:(.*)/)[1].trim();xt(`url: ${e}`),t({path:e})}else if(r.includes("DONE  Build failed"))i(r);else if(r.includes("DONE  Build complete")){const i=r.match(Ot);let o="";if(i&&i.length>1)o=T.default.join(a,i[1]);else{const t=this.puppet.isX&&"app-plus"===n?"app":n;o=T.default.join(a,`dist/${e}/${t}`),N.default.existsSync(o)||(o=T.default.join(a,`unpackage/dist/${e}/${t}`))}s=!0,this.stop(),t({path:o})}};xt(`${c} ${l.join(" ")} %o`,p),this.cliProcess=I.spawn(c,l,p),this.cliProcess.on("error",(t=>{i(t)})),this.cliProcess.stdout.on("data",o),this.cliProcess.stderr.on("data",o)}))}stop(){this.cliProcess&&this.cliProcess.kill("SIGTERM")}getSpawnArgs(t,e){let n;const s=t.cliPath;try{n=require(T.default.join(s,"package.json"))}catch(t){}let i=this.puppet.isX;if(n&&(n.devDependencies&&n.devDependencies["@dcloudio/vite-plugin-uni"]&&(i=!0),!i&&n.dependencies&&n.dependencies["@dcloudio/vite-plugin-uni"]&&(i=!0),n.scripts&&n.scripts[e]))return[process.env.UNI_NPM_PATH||(/^win/.test(process.platform)?"npm.cmd":"npm"),["run",e,"--"]];["android","ios"].includes(process.env.UNI_OS_NAME)&&(process.env.UNI_APP_PLATFORM=process.env.UNI_OS_NAME);let o=this.puppet.platform;if("app-plus"===this.puppet.platform&&this.puppet.isX&&(o="app"),process.env.UNI_INPUT_DIR=t.projectPath,process.env.UNI_OUTPUT_DIR=T.default.join(t.projectPath,`unpackage/dist/${this.puppet.mode}/${o}`),process.env.UNI_HBUILDERX_PLUGINS||N.default.existsSync(T.default.resolve(s,"../about"))&&(process.env.UNI_HBUILDERX_PLUGINS=T.default.dirname(s)),i){const t="app-plus"===this.puppet.platform?"app":this.puppet.platform;return process.env.UNI_PLATFORM=t,[process.env.UNI_NODE_PATH||"node",[require.resolve("@dcloudio/vite-plugin-uni/bin/uni.js",{paths:[s]}),"-p",t]]}return[process.env.UNI_NODE_PATH||"node",[T.default.join(s,"bin/uniapp-cli.js")]]}}const $t=A.default("automator:launcher");class Ft{async launch(t){const{port:e,cliPath:n,timeout:i,projectPath:o}=await this.validate(t);let r={};"app"===t.platform||"app-plus"===t.platform?(r=t.app||t["app-plus"],"true"===process.env.UNI_APP_X&&r["uni-app-x"]&&(r=s.recursive(!0,r,r["uni-app-x"])),delete r["uni-app-x"]):r=t[t.platform],r||(r={}),r.projectPath=o,$t(r),this.puppet=new _t(t.platform,r.puppet),r=await this.puppet.validateDevtools(r);let a=this.puppet.shouldCompile(o,e,t,r),c=process.env.UNI_OUTPUT_DIR||o;if(a||this.puppet.validateProject(c)||(c=T.default.join(o,"dist/"+this.puppet.mode+"/"+this.puppet.platform),this.puppet.validateProject(c)||(c=T.default.join(o,"unpackage/dist/"+this.puppet.mode+"/"+this.puppet.platform),this.puppet.validateProject(c)||(a=!0))),a){this.puppet.compiled=t.compile=!0,this.compiler=new qt(this.puppet);const s=await this.compiler.compile({host:t.host,port:e,cliPath:n,projectPath:o,silent:!!t.silent});s.path&&(c=s.path)}const l=[];return l.push(this.createRuntimeConnection(e,i)),l.push(this.puppet.createDevtools(c,r,i)),new Promise(((t,n)=>{Promise.all(l).then((([n,s])=>{n&&this.puppet.setRuntimeConnection(n),s&&this.puppet.setDevtoolConnection(s),A.default("automator:program")("ready");const i=r.teardown||"disconnect";t(new At(this.puppet,{teardown:i,port:e}))})).catch((t=>n(t)))}))}resolveCliPath(t){if(!t)return t;try{const{dependencies:e,devDependencies:n}=require(T.default.join(t,"package.json"));if(Lt(n)||Lt(e))return t}catch(t){}}resolveProjectPath(t,e){return t||(t=process.env.UNI_INPUT_DIR||process.cwd()),D.default(t)&&(t=T.default.resolve(t)),N.default.existsSync(t)||function(t){throw Error(t)}(`Project path ${t} doesn't exist`),t}async validate(t){const e=this.resolveProjectPath(t.projectPath,t);let n=process.env.UNI_CLI_PATH||t.cliPath;if(n=this.resolveCliPath(n||""),!n&&(n=this.resolveCliPath(process.cwd())),!n&&(n=this.resolveCliPath(e)),!n)throw Error("cliPath is not provided");if("false"!==process.env.UNI_APP_X){const t=this.getManifestJson(e);"uni-app-x"in t&&(process.env.UNI_APP_X="true",t.appid&&(process.env.UNI_APP_ID=t.appid))}return{port:await async function(t,e){const n=await J.default(t||e);if(t&&n!==t)throw Error(`Port ${t} is in use, please specify another port`);return n}(t.port||9520),cliPath:n,timeout:t.timeout||6e5,projectPath:e}}getManifestJson(t){if(t){const e=T.default.join(t,"manifest.json");if(N.default.existsSync(e))return i.parse(N.default.readFileSync(e,"utf8"))}return{}}async createRuntimeConnection(t,e){return nt.createRuntimeConnection(t,this.puppet,e)}}function Lt(t){return!!t&&!(!t["@dcloudio/vue-cli-plugin-uni"]&&!t["@dcloudio/vite-plugin-uni"])}exports.default=class{constructor(){this.launcher=new Ft}async launch(t){return this.launcher.launch(t)}},exports.initUni=t=>new Proxy({},{get(e,n){return"connectSocket"===n?async(...e)=>{const s=e[0].url;return Q.has(s)?{errMsg:"websocket is already connected"}:await t.callUniMethod(n,...e).then((n=>{Z(e[0],n),Q.set(s,new Map);const i={url:s,onMessage:e=>{t.socketEmitter({id:s,method:"onMessage"}),Q.get(s).set("onMessage",e)},send:e=>{t.socketEmitter({id:s,method:"send",data:e.data}).then((t=>{Z(e,t)})).catch((t=>{tt(e,t)}))},close:e=>{t.socketEmitter({id:s,method:"close",code:e.code,reason:e.reason}).then((t=>{Z(e,t)})).catch((t=>{tt(e,t)}))},onOpen:e=>{t.socketEmitter({id:s,method:"onOpen"}),Q.get(s).set("onOpen",e)},onClose:e=>{t.socketEmitter({id:s,method:"onClose"}),Q.get(s).set("onClose",e)},onError:e=>{t.socketEmitter({id:s,method:"onError"}),Q.get(s).set("onError",e)}};return Q.get(s).set("socketTask",i),i})).catch((t=>(tt(e[0],t),null)))}:(s=n,Y.includes(s)?e=>{K.has(n)||K.set(n,new Map([["uuid",0]]));const s=K.get(n),i=s.get("uuid");s.set(i,e),s.set("uuid",i+1),t.callUniMethod(n,i)}:function(t){return t.startsWith("off")&&Y.includes(t.replace("off","on"))}(n)?async e=>{const s=n.replace("off","on");if(K.has(s))if(e){const i=K.get(s);i.forEach(((s,o)=>{s===e&&(i.delete(o),t.callUniMethod(n,o))}))}else K.delete(s),t.callUniMethod(n)}:async(...e)=>await t.callUniMethod(n,...e).then((t=>(Z(e[0],t),t))).catch((t=>(tt(e[0],t),t))));var s}});
