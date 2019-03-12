if (self.CavalryLogger) { CavalryLogger.start_js(["fVxKu"]); }

__d("DeferredComponent.react",["React","createCancelableFunction","gkx"],(function(a,b,c,d,e,f){__p&&__p();a=b("React").PropTypes;c=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(c,d){__p&&__p();var e;e=a.call(this,c,d)||this;e.$1=function(a){e.setState({ComponentClass:a},function(){e.props.onComponentLoad&&e.props.onComponentLoad(a)})};var f=null;function g(a){f=a}e.props.deferredComponent(g);e.state={ComponentClass:f,cancelableModulesLoaded:b("createCancelableFunction")(e.$1)};return e}var d=c.prototype;d.componentDidMount=function(){this.props.deferredComponent(this.state.cancelableModulesLoaded)};d.componentWillUnmount=function(){this.state.cancelableModulesLoaded.cancel()};d.render=function(){__p&&__p();var a=this.state.ComponentClass;if(!a||this.props.deferredForcePlaceholder)return this.props.deferredPlaceholder;var c=this.props;c.deferredPlaceholder;c.deferredComponent;c.onComponentLoad;c.deferredForcePlaceholder;c=babelHelpers.objectWithoutPropertiesLoose(c,["deferredPlaceholder","deferredComponent","onComponentLoad","deferredForcePlaceholder"]);return b("React").createElement(a,c)};return c}(b("React").Component);c.propTypes={deferredPlaceholder:a.element.isRequired,deferredComponent:a.func.isRequired,onComponentLoad:a.func,deferredForcePlaceholder:a.bool};e.exports=c}),null);
__d("PerfHelperUtils",["cx","DeferredComponent.react","JSResource","React","joinClasses","promiseDone"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h=function(c){__p&&__p();babelHelpers.inheritsLoose(a,c);function a(){return c.apply(this,arguments)||this}var d=a.prototype;d.render=function(){var a=this.props,c=a.tooltip;a=a.className;return b("React").createElement("div",{className:"_28hn"+(this.props.color==="red"?" _4ez8":"")+(this.props.color==="green"?" _28ho":"")},b("React").createElement(b("DeferredComponent.react"),{deferredPlaceholder:b("React").createElement("div",null),deferredComponent:function(a){b("promiseDone")(b("JSResource")("Tooltip.react").__setRef("PerfHelperUtils").load(),a)},className:b("joinClasses")("_5_my",a),tooltip:c},this.props.children))};return a}(b("React").PureComponent);function a(a){return b("React").createElement(h,{color:"red",tooltip:"This bootloaded component has a red border\n          because "+a.moduleId+"\n          took over "+a.timeLimitSecs+" seconds ("+a.timeSpentSecs+"s) to load"},a.children)}c={SlowBootloadBorder:a,BorderedComponent:h};e.exports=c}),null);
__d("BadgeHelper",["cx","fbt","DOM","joinClasses"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i={xsmall:"_5dzz",small:"_5dz-",medium:"_5dz_",large:"_5d-0",xlarge:"_5d-1"},j={bot:"_64nf",verified:"_56_f",trending:"_1gop",topcommenter:"_59t2",page_gray_check:"_5n3t",page_gray_check_solid:"_6w81",work:"_5d62",game_blue:"_59c6",work_non_coworker:"_2ad7",interest_community:"_3qcr",subscription:"_4fvy"},k={bot:h._("Bot"),work_non_coworker:h._("Ing\u00e5r inte i ditt f\u00f6retag")};function l(a,c){return b("joinClasses")(i[a],j[c],"_5dzy")}function m(a){return k[a]}function a(a,c){a=l(a,c);if(a){c=m(c);return b("DOM").create("span",{className:a},c?b("DOM").create("span",{className:"accessible_elem"},c):null)}}e.exports={getClasses:l,getAlt:m,renderBadge:a,sizes:Object.keys(i),types:Object.keys(j)}}),null);
__d("Badge.react",["BadgeHelper","React"],(function(a,b,c,d,e,f){__p&&__p();a=b("React").PropTypes;c=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){var a=b("BadgeHelper").getAlt(this.props.type);a=a?b("React").createElement("span",{className:"accessible_elem"},a):null;return b("React").createElement("span",{className:b("BadgeHelper").getClasses(this.props.size,this.props.type)},a)};return c}(b("React").Component);c.propTypes={size:a.oneOf(b("BadgeHelper").sizes),type:a.oneOf(b("BadgeHelper").types)};c.defaultProps={size:"xsmall",type:"verified"};e.exports=c}),null);
__d("VideoFeedFastPreloadController",["DOMQuery","Run"],(function(a,b,c,d,e,f){var g=0,h={preload:function(c){g<2&&(c=b("DOMQuery").scry(c,"video")[0],c instanceof a.HTMLVideoElement&&(g||b("Run").onBeforeUnload(function(){return h.reset()}),c.preload="auto",g+=1))},reset:function(){g=0}};h.reset();e.exports=h}),null);
__d("VideoPlayerShakaExperimentsConfig",["VideoPlayerShakaExperimentsPayload"],(function(a,b,c,d,e,f){"use strict";e.exports=b("VideoPlayerShakaExperimentsPayload").experiments}),null);
__d("VideoPlayerShakaConfigExposureCondition",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({ANY_PARAM_ACCESSED:"any_param_accessed",ALL_PARAMS_ACCESSED:"all_params_accessed"})}),null);
__d("VideoPlayerShakaExposureLogger",["QE2Logger","VideoPlayerShakaConfigExposureCondition","VideoPlayerShakaExperimentsPayload"],(function(a,b,c,d,e,f){var g=Object.keys(b("VideoPlayerShakaExperimentsPayload").universeToExposureConfig).reduce(function(a,c){a[c]={};a[c].exposureCondition=b("VideoPlayerShakaExperimentsPayload").universeToExposureConfig[c].exposure_condition;a[c].exposureParams=new Set(b("VideoPlayerShakaExperimentsPayload").universeToExposureConfig[c].exposure_params);return a},{});a={logExposureForParamMaybe:function(a){Object.keys(g).forEach(function(c){g[c].exposureCondition===b("VideoPlayerShakaConfigExposureCondition").ANY_PARAM_ACCESSED&&g[c].exposureParams.has(a)?(b("QE2Logger").logExposureForUser(c),delete g[c]):g[c].exposureCondition===b("VideoPlayerShakaConfigExposureCondition").ALL_PARAMS_ACCESSED&&(g[c].exposureParams["delete"](a),g[c].exposureParams.size===0&&(b("QE2Logger").logExposureForUser(c),delete g[c]))})}};e.exports=a}),null);
__d("VideoPlayerShakaParsedContextualConfig",["EventEmitter","FBLogger","VideoPlayerShakaContextualConfig"],(function(a,b,c,d,e,f){__p&&__p();a=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){var b;b=a.call(this)||this;b.$VideoPlayerShakaParsedContextualConfig1=null;b.$VideoPlayerShakaParsedContextualConfig2={};b.parseConfig();return b}var d=c.prototype;d.getGlobalConfig=function(){return this.$VideoPlayerShakaParsedContextualConfig2};d.getStaticConfig=function(){return b("VideoPlayerShakaContextualConfig").staticConfig};d.getRawContextualConfig=function(){return this.$VideoPlayerShakaParsedContextualConfig1};d.parseConfig=function(){this.$VideoPlayerShakaParsedContextualConfig3(),this.$VideoPlayerShakaParsedContextualConfig4(),this.emit("configChange")};d.$VideoPlayerShakaParsedContextualConfig3=function(){if(!b("VideoPlayerShakaContextualConfig").rawContextualConfig)return;try{this.$VideoPlayerShakaParsedContextualConfig1=JSON.parse(b("VideoPlayerShakaContextualConfig").rawContextualConfig)}catch(a){b("FBLogger")("VideoPlayerShakaParsedContextualConfig").warn("Failed to parse raw config")}};d.$VideoPlayerShakaParsedContextualConfig4=function(){var a=this;this.$VideoPlayerShakaParsedContextualConfig2=Object.assign({},b("VideoPlayerShakaContextualConfig").staticConfig);this.$VideoPlayerShakaParsedContextualConfig1&&this.$VideoPlayerShakaParsedContextualConfig1.defaults.forEach(function(b){return a.$VideoPlayerShakaParsedContextualConfig2[b.name]=b.value})};return c}(b("EventEmitter"));e.exports=new a()}),null);
__d("VideoPlayerShakaGlobalConfig",["VideoPlayerShakaExperimentsConfig","VideoPlayerShakaExposureLogger","VideoPlayerShakaParsedContextualConfig"],(function(a,b,c,d,e,f){__p&&__p();a={getBool:function(a,c){b("VideoPlayerShakaExposureLogger").logExposureForParamMaybe(a);var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?d[a]==="true"||d[a]===!0:typeof b("VideoPlayerShakaExperimentsConfig")[a]==="boolean"?b("VideoPlayerShakaExperimentsConfig")[a]:c},getNumber:function(a,c){b("VideoPlayerShakaExposureLogger").logExposureForParamMaybe(a);var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?Number(d[a]):typeof b("VideoPlayerShakaExperimentsConfig")[a]==="number"?b("VideoPlayerShakaExperimentsConfig")[a]:c},getString:function(a,c){b("VideoPlayerShakaExposureLogger").logExposureForParamMaybe(a);var d=b("VideoPlayerShakaParsedContextualConfig").getGlobalConfig();return d&&d[a]!==void 0?String(d[a]):typeof b("VideoPlayerShakaExperimentsConfig")[a]==="string"?b("VideoPlayerShakaExperimentsConfig")[a]:c}};e.exports=a}),null);
__d("parseHeaders",[],(function(a,b,c,d,e,f){__p&&__p();var g=/\r?\n[\t]+/g,h=/\r?\n/;function a(a){__p&&__p();a=a.replace(g," ");var b={};a.split(h).forEach(function(a){a=a.split(":");var c=a.shift().trim();if(c){a=a.join(":").trim();b[c.toLowerCase()]=a}});return b}e.exports=a}),null);
__d("VideoPlayerShakaError",["VideoPlayerShakaGlobalConfig","parseHeaders"],(function(a,b,c,d,e,f){"use strict";a={translateError:function(a,c,d){var e=b("VideoPlayerShakaGlobalConfig").getBool("fix_shaka_xhr_error_status",!0)?a.errorRawTransportStatus:a.errorCode,f=null;b("VideoPlayerShakaGlobalConfig").getBool("enable_double_ingest",!1)&&a.errorRawResponseHeaders!=null&&(f=b("parseHeaders")(a.errorRawResponseHeaders));a={name:a.errorType,message:a.errorMsg,type:d,url:c,status:e,responseHeaders:f};return a},createTimeoutError:function(a){a={name:"timeout",message:"timeout",type:"net",url:a,status:0,responseHeaders:null};return a}};e.exports=a}),null);
__d("VideoDashPrefetchCache",["regeneratorRuntime","Promise","BanzaiODS","Deferred","MaybeNativePromise","Run","URI","VideoAkamaiRequestHelper","VideoPlayerPrefetchExperiments","VideoPlayerShakaError","VideoPlayerShakaGlobalConfig","XHRRequest","getCrossOriginTransport","requireWeak"],(function(a,b,c,d,e,f){__p&&__p();var g=null;b("requireWeak")("VideoPlayerShakaBandwidthEstimator",function(a){return g=a});var h=null;b("requireWeak")("VideoStreamingTaskQueueProvider",function(a){return h=a});function i(a){return a.audio.length+a.video.length+a.manifest.length}function j(a,c){b("BanzaiODS").bumpEntityKey("www_video_playback","prefetch."+a,c)}function k(a){var b="aborted",c={status:0},d=new Error("Prefetch request aborted.");return Object.assign(d,{type:b,url:a,xhr:c})}function l(a){var c=a.getURI(),d=c.toString();if(b("VideoAkamaiRequestHelper").isAkamai(d)){var e=b("VideoAkamaiRequestHelper").getRequestHeadersFromUrl(d);d=c.removeQueryData(["bytestart","byteend"]);a.setURI(d);e&&Object.keys(e).forEach(function(b){a.setRequestHeader(b,e[b])})}return a}var m=null,n=new Map();function o(a){a=new(b("URI"))(a);a=a.getDomain();return a.endsWith("fbcdn.net")&&!a.startsWith("interncache")&&!a.endsWith("ak.fbcdn.net")}function p(a,c){c===void 0&&(c=!1);return c&&o(a)?b("getCrossOriginTransport").withCredentials:b("getCrossOriginTransport")}function q(a){return o(a.url)}function r(a,b,c){return{response:a.slice(b.start+0,b.end+1),responseTime:c}}function s(a){__p&&__p();var c=new(b("URI"))(a);if(c.getDomain()){c=c.removeQueryData(["oh"]);c=c.removeQueryData("__gda__");var d=Object.keys(c.getQueryData());for(var e=0;e<d.length;e++){var f=d[e];f.startsWith("_nc")&&(c=c.removeQueryData(f))}return c.toString()}return a}a=function(){"use strict";__p&&__p();function a(){this.$2=new Map(),this.$9=new Map(),this.$1=new Map(),this.$3=[],this.$4=[],this.$5=0,this.$6=b("VideoPlayerPrefetchExperiments").maxPrefetchVideosNum,this.$7=b("VideoPlayerPrefetchExperiments").consolidateFragmentedPrefetchRequest}var c=a.prototype;c.$10=function(a,c){__p&&__p();var d=this;c===void 0&&(c=!1);var e=a,f=new(b("XHRRequest"))(e).setMethod("GET").setResponseType("arraybuffer").setTransportBuilder(p(e,c));l(f);var g=new(b("MaybeNativePromise"))(function(c,h){f.setErrorHandler(function(a){d.$11(f),h(b("VideoPlayerShakaError").translateError(a,e,"preload"))}),f.setResponseHandler(function(a){f.response=a,d.$11(f),c(f)}),f.setAbortHandler(function(){if(b("VideoPlayerPrefetchExperiments").fixPrefetchCacheAbort){d.$11(f);var c=k(a);h(c)}else h(g,new Error("Request promise aborted"))})});this.$12(a,g);this.$3.push(f);this.$8?this.$8.push(f):f.send();return g};c.genPrefetchMpdNow=function(a){__p&&__p();return b("regeneratorRuntime").async(function(b){while(1)switch(b.prev=b.next){case 0:if(!this.has(a)){b.next=2;break}return b.abrupt("return",null);case 2:return b.abrupt("return",this.$10(a));case 3:case"end":return b.stop()}},null,this)};c.$13=function(b,c,d){__p&&__p();c===void 0&&(c=!1);d===void 0&&(d=null);var e=[];for(var f=0;f<b.length;f++){var g=a.createQueryStringURL(b[f]);this.has(g)||(e.push(this.$10(g,c).then(function(a){j("received",1);return a})),d!=null&&this.$2.set(g,d))}j("sent",e.length);return e};c.$14=function(c){__p&&__p();var d=this,e=a.getConsolidatedURL(c);if(e==null)return this.$13(c);var f=new(b("XHRRequest"))(e).setMethod("GET").setResponseType("arraybuffer").setTransportBuilder(p(e));l(f);var g=Date.now(),h=[];for(var i=0;i<c.length;i++){var k=a.createQueryStringURL(c[i]),m=new(b("Deferred"))();this.has(k)||this.$12(k,m.getPromise());h.push(m)}f.setErrorHandler(function(c){d.$11(f);for(var a=0;a<h.length;a++)h[a].reject(b("VideoPlayerShakaError").translateError(c,e,"preload"))});f.setResponseHandler(function(b){var e=Date.now()-g;for(var a=0;a<c.length;a++){var i=h[a],j=c[a];i.resolve(r(b,j,e))}d.$11(f)});f.setAbortHandler(function(){for(var a=0;a<c.length;a++){var b=h[a];b.reject(new Error("Request aborted."))}});this.$3.push(f);f.send();j("consolidated.sent",1);j("sent",h.length);k=h.map(function(a){return a.getPromise().then(function(a){j("received",1);return a})});b("Promise").all(k).then(function(){return j("consolidated.received",1)});return k};c.$15=function(a){__p&&__p();var c=this,d=a.useCredentials,e=a.connectionQualityLevel;this.$5++;var f=this.$7&&!d;b("VideoPlayerPrefetchExperiments").enableGlobalSchedulerForPrefetch&&(this.$8=[]);var g=f?this.$14(a.video):this.$13(a.video,d,e);f=f?this.$14(a.audio):this.$13(a.audio,d,e);e=this.$13(a.manifest,d);var i=g.concat(f,e);if(this.$8){var j=this.$8||[];this.$8=null;var k=""+a.videoID;d={name:"prefetch task, "+k,run:function(){k&&n["delete"](k);j.forEach(function(a){return a.send()});return b("MaybeNativePromise").all(i).then(function(){})["catch"](function(){})},cancel:function(){}};h?(b("VideoPlayerPrefetchExperiments").switchPrefetchTaskToHighPriWhenPlayed&&k&&n.set(k,d),h.getQueue("video").enqueue(d,b("VideoPlayerPrefetchExperiments").prefetchPriority),this.$16()):(d.run(),b("MaybeNativePromise").all(i).then(function(){return c.$16()})["catch"](function(){return c.$16()}))}else b("MaybeNativePromise").all(i).then(function(){return c.$16()})["catch"](function(){return c.$16()})};c.$12=function(a,c){__p&&__p();var d=this;a=s(a);this.$1.values().next().done&&b("Run").onLeave(function(){for(var a=0;a<d.$3.length;a++)d.$3[a].abort();d.$3=[];d.$4=[];d.$5=0;d.$1.clear()});this.$1.set(a,c)};c.$11=function(a){a=this.$3.indexOf(a);a>-1&&this.$3.splice(a,1)};c.$16=function(){this.$5--;var a=this.$4.shift();a&&this.$15(a)};c.has=function(a){a=s(a);return this.$1.has(a)};c.getConnectionQualityLevel=function(a){return this.$2.get(a)};c.getAndDelete=function(a){a=s(a);var b=this.$1.get(a);b?j("cache.hit",1):j("cache.miss",1);this.$1["delete"](a);j("retrieve",1);return b};c.$17=function(a){a=s(a);a=this.$1.get(a);return a};c.queueRequestBatch=function(a){this.$6===0||this.$5<this.$6?this.$15(a):(j("queued",i(a)),this.$4.push(a))};c.setCachedRepresentations=function(a,b){this.$9.set(a,b)};c.getCachedRepresentations=function(a){return this.$9.get(a)};a.getCachedRepresentations=function(b){return a.getInstance().getCachedRepresentations(b)};a.getInstance=function(){m===null&&(m=new a());return m};a.createQueryStringURL=function(a){var c=a.url,d=a.start;a=a.end;d!==null&&d!==void 0&&a!==null&&a!==void 0&&(c=new(b("URI"))(c).addQueryData({bytestart:d,byteend:a}));return c.toString()};a.getConsolidatedURL=function(b){__p&&__p();var c="",d=Infinity,e=0;for(var f=0;f<b.length;f++){var g=b[f],h=g.url,i=g.start;g=g.end;if(h==null||i==null||g==null)return null;if(c==="")c=h;else if(c!==h)return null;d=Math.min(d,i);e=Math.max(e,g)}return a.createQueryStringURL({url:c,start:d,end:e})};a.getPrefetchInfoFromRepresentation=function(a){return a.segments.map(function(b){return{url:a.url,start:b.start,end:b.end}})};a.getVideoRepresentationFromRepresentations=function(a,c){__p&&__p();var d=a.find(function(a){return a.representation_id.endsWith("d")});!c&&g&&(c=g.getBandwidth());if(!c)return d;var e=b("VideoPlayerShakaGlobalConfig").getNumber("client_prefetch_bandwidth_aggressiveness",1);for(var f=0;f<a.length;f++){var h=a[f],i=d&&d.bandwidth||0;if(i>h.bandwidth)continue;else c>h.bandwidth/e&&(d=h)}return d};a.loadVideoGivenAllRepresentations=function(b,c,d){__p&&__p();if(a.isAutoplayBandwidthRestrained())return;var e=[],f=[];c.audio.length>0&&(e=a.getPrefetchInfoFromRepresentation(c.audio[0]),e.length>0&&f.push(c.audio[0].representation_id));var g=[];c=a.getVideoRepresentationFromRepresentations(c.video,d);c&&(g=a.getPrefetchInfoFromRepresentation(c),g.length>0&&f.push(c.representation_id));d=a.getInstance();d.queueRequestBatch({audio:e,video:g,manifest:[],videoID:b,useCredentials:!1});d.setCachedRepresentations(b,f)};a.isAutoplayBandwidthRestrained=function(){return!!g&&g.isAutoplayBandwidthRestrained()};a.loadVideo=function(c,d,e){d=!!d;if(a.isAutoplayBandwidthRestrained())return;if(b("VideoPlayerPrefetchExperiments").disablePrefetchCache)return;var f=a.getInstance();c.manifest||(c.manifest=[]);f.queueRequestBatch({manifest:c.manifest.filter(q),video:c.video.filter(q),audio:c.audio.filter(q),videoID:c.videoID,useCredentials:d,connectionQualityLevel:e})};a.getCacheValue=function(b){return a.getInstance().getAndDelete(b)};a.getConnectionQualityLevel=function(b){return a.getInstance().getConnectionQualityLevel(b)};a.hasCacheValue=function(b){return a.getInstance().has(b)};a.getPrefetchTaskByID=function(a){a=n.get(a)||null;return a};return a}();e.exports=a}),null);
__d("VideoDisplayTimePlayButton",["CSS","DataStore","Event"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g={},h="_spinner";a={getClicked:function(a){return b("DataStore").get(a,"clicked",!1)},register:function(a,c){var d=a.id;g[d]=b("Event").listen(a,"click",function(){c&&(b("CSS").hide(a),b("CSS").show(c)),b("DataStore").set(a,"clicked",!0)});c&&(g[d+h]=b("Event").listen(c,"click",function(){c&&b("CSS").hide(c),b("CSS").show(a),b("DataStore").set(a,"clicked",!1)}))},unregister:function(a){a=a.id;Object.prototype.hasOwnProperty.call(g,a)&&g[a].remove();a=a+h;Object.prototype.hasOwnProperty.call(g,a)&&g[a].remove()}};e.exports=a}),null);
__d("VideosRenderingInstrumentation",["DataStore","VideoPlayerHTML5Experiments","performanceAbsoluteNow"],(function(a,b,c,d,e,f){var g={storeRenderTime:function(a){var c=b("VideoPlayerHTML5Experiments").useMonotonicallyIncreasingTimers?b("performanceAbsoluteNow")():Date.now();b("DataStore").set(a,"videos_rendering_instrumentation",c);return c},retrieveRenderTime:function(a){var c=b("DataStore").get(a,"videos_rendering_instrumentation",NaN);Number.isNaN(c)&&(c=g.storeRenderTime(a));return c}};e.exports=g}),null);
__d("PerfUtils",["React","performanceNow","PerfHelperUtils"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("React").Component,h=b("PerfHelperUtils").SlowBootloadBorder;function a(a,c,d){__p&&__p();var e=function(f){__p&&__p();babelHelpers.inheritsLoose(e,f);function e(){return f.apply(this,arguments)||this}var g=e.prototype;g.componentDidMount=function(){c()};g.render=function(){if(d)return b("React").createElement(a,babelHelpers["extends"]({},this.props,{ref:d}));else return b("React").createElement(a,this.props)};return e}(g);return e}function c(a,c,d){__p&&__p();var e=1e4;d=b("performanceNow")()-d;if(d<e)return a;var f=e/1e3,i=Math.round(d)/1e3;e=function(d){babelHelpers.inheritsLoose(e,d);function e(){return d.apply(this,arguments)||this}var g=e.prototype;g.componentDidMount=function(){};g.render=function(){return b("React").createElement(h,{moduleId:c,timeLimitSecs:f,timeSpentSecs:i},b("React").createElement(a,this.props))};return e}(g);return e}d={appendListener:a,markRedInDev:c};e.exports=d}),null);
__d("BootloadedComponent.react",["invariant","DeferredComponent.react","JSResource","PerfUtils","React","TimeSlice","gkx","lazyLoadComponent","performanceNow"],(function(a,b,c,d,e,f,g){__p&&__p();a=b("React").Component;var h=b("PerfUtils").appendListener;c=b("PerfUtils").markRedInDev;d=b("gkx")("676835");f=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}c.create=function(a){__p&&__p();var c=function(d){__p&&__p();babelHelpers.inheritsLoose(c,d);function c(){return d.apply(this,arguments)||this}var e=c.prototype;e.render=function(){var c=this.props;c.bootloadLoader;c=babelHelpers.objectWithoutPropertiesLoose(c,["bootloadLoader"]);return b("React").createElement(i,babelHelpers["extends"]({bootloadLoader:a,bootloadPlaceholder:b("React").createElement("div",null)},c))};return c}(b("React").Component);c.displayName="BootloadedComponent("+a.getModuleId()+")";return c};return c}(a);c=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(c){var d;d=a.call(this,c)||this;d.$SuspenseBootloadedComponent1=null;c.onBootloaderWillMount&&c.onBootloaderWillMount();var e=c.isContinuation?b("TimeSlice").PropagationType.CONTINUATION:b("TimeSlice").PropagationType.EXECUTION;e=b("TimeSlice").guard(b("lazyLoadComponent"),"Use lazyLoadComponent to load the module",{propagationType:e});e=e(c.bootloadLoader);d.$SuspenseBootloadedComponent1=c.onComponentDidMount?h(e,c.onComponentDidMount):e;return d}var d=c.prototype;d.render=function(){var a=this.props,c=a.bootloadLoader,d=a.bootloadPlaceholder,e=a.bootloadForcePlaceholder;a.isContinuation;a.onComponentDidMount;a=babelHelpers.objectWithoutPropertiesLoose(a,["bootloadLoader","bootloadPlaceholder","bootloadForcePlaceholder","isContinuation","onComponentDidMount"]);var f=this.$SuspenseBootloadedComponent1;if(e===!0)return d;f!=null||g(0,5832,c.getModuleId());return b("React").createElement(b("React").Suspense,{fallback:d},b("React").createElement(f,a))};return c}(f);a=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(c){var d;d=a.call(this,c)||this;d.$BootloadedComponent1=function(a){var c=d.props.isContinuation,e;c=c?b("TimeSlice").PropagationType.CONTINUATION:b("TimeSlice").PropagationType.EXECUTION;b("TimeSlice").guard(b("JSResource").loadAll,"BootloadedComponent load all JSResource",{propagationType:c})([d.props.bootloadLoader],function(b){b=d.props.onComponentDidMount?h(b,d.props.onComponentDidMount):b,a(b)})};c.onBootloaderWillMount&&c.onBootloaderWillMount();return d}var d=c.prototype;d.render=function(){var a=this.props;a.bootloadLoader;a.isContinuation;var c=a.bootloadPlaceholder,d=a.bootloadForcePlaceholder;a=babelHelpers.objectWithoutPropertiesLoose(a,["bootloadLoader","isContinuation","bootloadPlaceholder","bootloadForcePlaceholder"]);return b("React").createElement(b("DeferredComponent.react"),babelHelpers["extends"]({deferredPlaceholder:c,deferredComponent:this.$BootloadedComponent1,deferredForcePlaceholder:d},a))};return c}(f);a.defaultProps={isContinuation:!0};var i=d?c:a;e.exports=i}),null);
__d("VideoPlayerLoggerEvent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({AUTOPLAY_PREFERENCE_CHANGED:"autoplay_preference_changed",END_STALL_TIME:"end_stall_time",AUTOPLAY_PREFERENCE_STATUS:"autoplay_preference_status",ERROR_ALERT_SHOWN:"video_error_alert_shown",COMMERCIAL_BREAK_OFFSCREEN:"commercial_break_offscreen",COMMERCIAL_BREAK_ONSCREEN:"commercial_break_onscreen",NOT_AUTOPLAYING:"not_autoplaying",VIDEO_CHANNEL_NO_RELATED_VIDEO:"video_channel_no_related_video",VIDEO_ORIENTATION_CHANGED:"video_orientation_changed",AD_BREAK_STARTING_INDICATOR:"ad_break_starting_indicator",AD_BREAK_NON_INTERRUPTIVE_AD_START:"ad_break_non_interruptive_ad_start",AD_BREAK_NON_INTERRUPTIVE_AD_CLICK:"ad_break_non_interruptive_ad_click",AD_BREAK_PRE_ROLL_AD_START:"ad_break_pre_roll_ad_start",AD_BREAK_TAP_ON_TRAILER:"ad_break_tap_on_trailer",AD_BREAK_TAP_START_FROM_TRAILER:"ad_break_tap_start_from_trailer",ASSETS_LOADED:"assets_loaded",BUFFERED:"buffered",CANCELLED_REQUESTED_PLAYING:"cancelled_requested_playing",CAPTION_CHANGE:"caption_change",CAROUSEL_CHANGE:"carousel_change",CHROMECAST_AVAILABILITY_CHECKED:"chromecast_availability_checked",CHROMECAST_CAST_CLICKED:"chromecast_button_clicked",CHROMECAST_CAST_CONNECTED:"chromecast_connected",CHROMECAST_CAST_DISABLED:"chromecast_button_disabled",CHROMECAST_CAST_DISCONNECTED:"chromecast_disconnected",CHROMECAST_CAST_RECONNECTED:"chromecast_reconnected",CHROMECAST_CAST_VISIBLE:"chromecast_button_visible",CHROMECAST_NOT_SUPPORTED:"chromecast_not_supported",CLICK:"click",DISPLAYED:"displayed",ENTERED_FALLBACK:"entered_fallback",ENTERED_FS:"entered_fs",ENTERED_HD:"entered_hd",ERROR:"error",EXITED_FS:"exited_fs",EXITED_HD:"exited_hd",FINISHED_LOADING:"finished_loading",FINISHED_PLAYING:"finished_playing",HEADSET_CONNECTED:"headset_connected",HEADSET_DISCONNECTED:"headset_disconnected",HEART_BEAT:"heart_beat",HOST_ERROR:"host_error",HTTP_STATUS_UPDATE:"http_status_update",IMPRESSION:"impression",INVALID_URL:"invalid_url",MUTED:"muted",NO_SURFACE_UPDATE:"no_surface_update",PAUSED:"paused",PLAY_REQUESTED:"play_requested",PLAY_REQUESTED_OOB:"play_requested_oob",PLAYER_ALLOCATED:"player_allocated",PLAYER_FORMAT_CHANGED:"player_format_changed",PLAYER_LOADED:"player_loaded",PLAYING_LIVE_STARTED:"playing_live_started",PLAYING_LIVE_STOPPED:"playing_live_stopped",POP_FAILOVER:"pop_failover",PROGRESS:"progress",QUALITY_CHANGE:"quality_change",R2D2_SUMMARY:"r2d2_summary",R2D2_EVENT_VALIDATION:"r2d2_event_validation",READY_TO_PLAY:"ready_to_play",REPLAYED:"replayed",REPRESENTATION_ENDED:"representation_ended",REPRESENTATION_FIRST_ENDED:"representation_first_ended",REQUESTED:"requested",REQUESTED_PLAYING:"requested_playing",SCRUBBED:"scrubbed",SEEKED:"seeked",SPLASH_DISPLAYED:"splash_displayed",STALE:"stale",STARTED_PLAYING:"started_playing",STARTED_RECEIVING_BYTES:"started_receiving_bytes",STOPPED_PLAYING:"stopped_playing",STREAM_RESET:"stream_reset",SURFACE_UPDATED:"surface_updated",SWITCHED_IMPLEMENTATION:"switched_implementation",UNMUTED:"unmuted",UNPAUSED:"unpaused",USER_SELECTED_QUALITY:"user_selected_quality",VIDEO_CHAINING_IMPRESSION:"video_chaining_impression",VIDEO_CHAINING_TAP:"video_chaining_tap",VIDEO_CLICKED_WITHIN_PLAYER:"video_clicked_within_player",VIDEO_PLAYER_SERVICE_DISCONNECTED:"video_player_service_disconnected",VIDEO_PLAYER_SERVICE_RECONNECTED:"video_player_service_reconnected",VIDEO_PLAYER_SERVICE_UNAVAILABLE:"video_player_service_unavailable",VIDEO_PLAYING:"video_playing",VIDEO_SKIP_AD:"video_skip_ad",VOLUME_CHANGED:"volume_changed",VOLUME_DECREASE:"volume_decrease",VOLUME_INCREASE:"volume_increase",WATCH_AND_SCROLL_CHANNEL_ENTERED:"watch_and_scroll_channel_entered",WATCH_AND_SCROLL_EXITED:"watch_and_scroll_exited",WATCH_AND_SCROLL_ICON_HIGHLIGHTED:"watch_and_scroll_icon_highlighted",WATCH_AND_SCROLL_ICON_UNHIGHLIGHTED:"watch_and_scroll_icon_unhighlighted",WATCH_AND_SCROLL_PAUSED:"watch_and_scroll_paused",LIVE_SEGMENT_LOAD_ERROR:"live_segment_load_error",MANIFEST_DATA_TYPE_ERROR:"manifest_data_type_error",MANIFEST_LOAD_ERROR:"manifest_load_error",PLAYER_WARNING:"player_warning",PLAYHEAD_FELL_BEHIND_ERROR:"playhead_fell_behind_error",STREAM_SEGMENT_LOAD_ERROR:"stream_segment_load_error",UNEXPECTED_SEGMENT_ERROR:"unexpected_segment_error",NETWORK_TIMEOUT:"network_timeout",VIDEO_LOGGING_SESSION_TIMEOUT:"video_logging_session_timeout",REPLICA_SWITCH:"replica_switch",REPLICA_SWITCH_SUCCESS:"replica_switch_success",REPLICA_SWITCH_FAILED:"replica_switch_failed",COMPLETION:"completion",VIEW:"view",PLAYED_FOR_THREE_SECONDS:"played_for_three_seconds",GUIDE_ENTERED:"guide_entered",GUIDE_EXITED:"guide_exited",HEADING_RESET:"heading_reset",SPHERICAL_FALLBACK_ENTERED:"spherical_fallback_entered",SPHERICAL_VIDEO_FALLBACK_CTA_CLICKED:"spherical_video_fallback_cta_clicked",VIEWPORT_ROTATED:"viewport_rotated",VIEWPORT_ZOOMED:"viewport_zoomed",BANZAI_OAUTH_GK_ERROR:"banzai_oauth_gk_error",BANZAI_OAUTH_PARSE_ERROR:"banzai_oauth_parse_error",BANZAI_OAUTH_SESSION_ERROR:"banzai_oauth_session_error",VIEWABILITY_CHANGED:"viewability_changed",PLAYER_SEEK:"player_seek",VIDEO_CDN_URL_EXPIRED:"video_cdn_url_expired",VIDEO_CDN_URL_REFRESHED:"video_cdn_url_refreshed",VIDEO_CDN_URL_REFRESH_ERROR:"video_cdn_url_refresh_error"})}),null);