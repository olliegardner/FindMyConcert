if (self.CavalryLogger) { CavalryLogger.start_js(["Yk+JB"]); }

__d("Clipboard",["Promise","UserAgent"],(function(a,b,c,d,e,f){__p&&__p();var g={isSupported:function(){return window.document.queryCommandSupported instanceof Function&&window.document.queryCommandSupported("copy")&&!(b("UserAgent").isBrowser("Firefox < 41")||b("UserAgent").isPlatform("iOS < 10.3"))||b("UserAgent").isBrowser("Chrome >= 43")},copy:function(a,c){__p&&__p();c=c||document.body;if(!c)return!1;var d=!0,e=document.createElement("textarea");c.appendChild(e);e.value=a;if(b("UserAgent").isPlatform("iOS >= 10.3")){a=document.createRange();a.selectNodeContents(e);var f=window.getSelection();f.removeAllRanges();f.addRange(a);e.setSelectionRange(0,999999)}else e.select();try{d=document.execCommand("copy")}catch(a){d=!1}c.removeChild(e);return d},copyAsync:function(a){var c=window.navigator;if(c&&c.clipboard&&typeof c.clipboard.writeText==="function")return c.clipboard.writeText(a);return g.copy(a)?b("Promise").resolve():b("Promise").reject()}};e.exports=g}),null);
__d("FBClipboardLink.react",["cx","fbt","Clipboard","DOMContainer.react","Event","KeyEventController","React","ReactDOM","SubscriptionsHandler","Tooltip.react","isKeyActivation","joinClasses"],(function(a,b,c,d,e,f,g,h){__p&&__p();a=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){__p&&__p();var c,d;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(c=d=a.call.apply(a,[this].concat(f))||this,d.state={copied:!1,supported:b("Clipboard").isSupported()},d.$1=null,d.$2=null,d.$4=function(a){a.clipboardData&&(a.clipboardData.setData("text/html",d.$7()),a.preventDefault())},d.$6=function(){if(!d.state.supported)return"Unsupported in this browser";return d.state.copied?d.props.tooltipSuccess:d.props.tooltip},d.$3=function(){d.$2&&(window.clearTimeout(d.$2),d.$2=null)},d.$8=function(){d.$2=window.setTimeout(d.$9,d.props.tooltipSuccessDuration)},d.$5=function(a){var c=b("ReactDOM").findDOMNode(d.refs.root);c=b("Clipboard").copy(d.$7(),c);d.$3();d.setState({copied:!0,supported:c});d.$8();d.props.onComplete&&d.props.onComplete(c);d.props.stopPropagation&&a.stopPropagation();d.props.preventDefaultOnClick&&a.preventDefault()},d.$9=function(){d.$3(),d.setState({copied:!1})},c)||babelHelpers.assertThisInitialized(d)}var d=c.prototype;d.componentWillUnmount=function(){this.$3(),this.$1&&this.$1.release()};d.componentDidMount=function(){if(this.props.type==="html"){var a=b("ReactDOM").findDOMNode(this);this.$1=this.$1||new(b("SubscriptionsHandler"))();this.$1.addSubscriptions(b("Event").listen(a,"copy",this.$4))}this.props.hotkey&&(this.$1=this.$1||new(b("SubscriptionsHandler"))(),this.$1.addSubscriptions(b("KeyEventController").registerKey(this.props.hotkey,this.$5)))};d.render=function(){var a=this,c=b("joinClasses")(this.props.className,"_xd6"),d=this.props.children||this.props.label;!d&&this.props.childrenDONOTUSE&&(d=b("React").createElement(b("DOMContainer.react"),null,this.props.childrenDONOTUSE));return b("React").createElement(b("Tooltip.react"),babelHelpers["extends"]({},this.props,{ref:"root",tabIndex:"0",className:c,tooltip:this.$6(),"data-pitloot-persistonclick":!0,onClick:this.$5,onKeyPress:function(c){return b("isKeyActivation")(c)&&a.$5()},position:this.props.position,alignH:this.props.alignment}),b("React").createElement("div",{ref:"content",className:"_2lj1"},d))};d.$7=function(){if(this.props.getValue)return this.props.getValue();else return this.props.value};return c}(b("React").PureComponent);a.defaultProps={tooltip:h._("Kopiera text till urklipp"),tooltipSuccess:h._("Texten har kopierats till urklipp"),tooltipSuccessDuration:1e3,type:"string"};e.exports=a}),null);
__d("FDSTooltipContext",["React"],(function(a,b,c,d,e,f){"use strict";a=b("React").createContext(!1);e.exports=a}),null);
__d("SUITooltip.react",["cx","AlignmentEnum","ContextualLayer.react","ContextualLayerAutoFlip","ContextualLayerHideOnScroll","FDSTooltipContext","LayerFadeOnShow","PositionEnum","React","SUIComponent","SUILink.react","SUITheme","getElementRect","joinClasses","uniqueID"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=b("React").PropTypes;var h=4,i={LayerFadeOnShow:b("LayerFadeOnShow"),ContextualLayerAutoFlip:b("ContextualLayerAutoFlip"),ContextualLayerHideOnScroll:b("ContextualLayerHideOnScroll")},j=100;c=["block","inline"];d=["normal","break-word"];var k=null;f=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){var a=this.props,c=a.label,d=a.value;a=babelHelpers.objectWithoutPropertiesLoose(a,["label","value"]);return b("React").createElement("li",a,c!=null&&c!==""&&b("React").createElement("strong",null,c)," ",d)};return c}(b("SUIComponent"));f.propTypes={value:a.node.isRequired,label:a.string};g=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){return b("React").createElement("div",{className:b("joinClasses")(this.props.className,"_2pif")},this.props.description," ",b("React").createElement(b("SUILink.react"),{onClick:this.props.onClick},this.props.label))};return c}(b("SUIComponent"));g.propTypes={label:a.node.isRequired,onClick:a.func.isRequired,description:a.node,theme:a.instanceOf(b("SUITheme"))};var l={alignment:"left",display:"inline",offset:4,position:"above",tooltipDelay:0,tooltipWidth:"auto"},m=function(c){__p&&__p();babelHelpers.inheritsLoose(a,c);function a(){__p&&__p();var a,d;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(a=d=c.call.apply(c,[this].concat(f))||this,d.state={isTextHover:!1,isTooltipHover:!1,isTooltipVisible:!1},d.$SUITooltip4=b("uniqueID")(),d.$SUITooltip6=function(){d.props.tooltipDelay?d.$SUITooltip5=window.setTimeout(d.$SUITooltip7,d.props.tooltipDelay):d.$SUITooltip7()},d.$SUITooltip9=function(){d.$SUITooltip2=window.setTimeout(d.$SUITooltip7,j)},d.$SUITooltip7=function(){d.state.isTextHover||d.state.isTooltipHover?d.show():d.hide()},d.$SUITooltip8=function(){d.props.onToggle&&d.props.onToggle(d.state.isTooltipVisible)},d.$SUITooltip10=function(){d.setState({isTextHover:!1},d.$SUITooltip9)},d.$SUITooltip11=function(){d.setState({isTooltipHover:!1},d.$SUITooltip9)},d.$SUITooltip12=function(){d.setState({isTextHover:!0},d.$SUITooltip6)},d.$SUITooltip13=function(){d.setState({isTextHover:!1},d.$SUITooltip9)},d.$SUITooltip14=function(){d.setState({isTooltipHover:!0})},d.$SUITooltip15=function(){d.setState({isTooltipHover:!1},d.$SUITooltip9)},d.$SUITooltip16=function(a){d.$SUITooltip1=a},d.$SUITooltip17=function(){return d.$SUITooltip1},a)||babelHelpers.assertThisInitialized(d)}var d=a.prototype;d.componentDidMount=function(){this.$SUITooltip3=!0};d.componentWillUnmount=function(){this.$SUITooltip3=!1,this.$SUITooltip5&&window.clearTimeout(this.$SUITooltip5),this.$SUITooltip2&&window.clearTimeout(this.$SUITooltip2),k===this&&(k=null)};d.show=function(){if(this.state.isTooltipVisible)return;k&&k!==this&&k.hide();k=this;this.$SUITooltip3&&this.setState({isTooltipVisible:!0},this.$SUITooltip8)};d.hide=function(){if(!this.state.isTooltipVisible)return;k=null;this.$SUITooltip3&&this.setState({isTooltipVisible:!1},this.$SUITooltip8)};d.$SUITooltip18=function(){__p&&__p();var a=this,c=this.props.tooltip!=null&&this.props.tooltip!==""&&this.state.isTooltipVisible;if(!c)return null;c=this.props.position==="above";var d=this.props.position==="below",e=this.props.position==="left",f=this.props.position==="right",g=c||d,j=b("SUITheme").get(this).SUITooltip,k=0;d?k=this.props.offset:c&&(k=-1*this.props.offset);var l=0;f?l=this.props.offset+h:e&&(l=-1*(this.props.offset+h));var m=babelHelpers["extends"]({},j.typeStyle,{backgroundColor:j.backgroundColor,color:j.color,width:this.props.tooltipWidth!=="auto"?this.props.tooltipWidth:null,maxWidth:this.props.maxWidth,overflowWrap:this.props.overflowWrap}),n=0;d=this.$SUITooltip1;if(!g&&d){c=b("getElementRect")(d);f=c.bottom-c.top;n=f/2}return b("React").createElement(b("FDSTooltipContext").Consumer,null,function(c){return b("React").createElement(b("ContextualLayer.react"),{alignment:a.props.alignment,behaviors:a.props.behaviors?babelHelpers["extends"]({},i,a.props.behaviors):i,contextRef:a.$SUITooltip17,offsetX:l,offsetY:k,position:a.props.position,shown:!0},b("React").createElement("div",{className:"_4_gw"+(c?"":" _7mx9"),id:a.$SUITooltip4,onBlur:a.$SUITooltip11,onMouseEnter:a.$SUITooltip14,onMouseLeave:a.$SUITooltip15,style:{top:n+"px"}},b("React").createElement("ul",{className:"_3b5i",style:m},a.props.tooltip),b("React").createElement("div",{"aria-hidden":!0,className:"_3b61"+(c?"":" _7mxa")+(c?" _7mxb":""),style:{borderTopColor:j.backgroundColor}})))})};d.render=function(){var a=this.props.display==="block"?"div":"span";return b("React").createElement(a,{"aria-describedby":this.state.isTextHover?this.$SUITooltip4:void 0,className:b("joinClasses")(this.props.className,this.props.margin,"_3b62"),onBlur:this.$SUITooltip10,onMouseEnter:this.$SUITooltip12,onMouseLeave:this.$SUITooltip13,ref:this.$SUITooltip16,style:this.props.style},this.props.children,this.$SUITooltip18())};return a}(b("SUIComponent"));m.Row=f;m.ActionDEPRECATED=g;m.propTypes={alignment:b("AlignmentEnum").propType.isRequired,behaviors:a.object,className:a.string,display:a.oneOf(c).isRequired,margin:a.string,maxWidth:a.number,offset:a.number.isRequired,overflowWrap:a.oneOf(d),position:b("PositionEnum").propType.isRequired,theme:a.instanceOf(b("SUITheme")),tooltip:a.node,tooltipDelay:a.number,tooltipWidth:a.oneOfType([a.oneOf(["auto"]),a.number])};m.defaultProps=l;e.exports=m}),null);
__d("BlobFactory",["emptyFunction"],(function(a,b,c,d,e,f){__p&&__p();var g;function h(){try{new a.Blob(),g=!0}catch(a){g=!1}}var i=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||a.MSBlobBuilder;a.Blob?c={getBlob:function(b,c){__p&&__p();b=b||[];c=c||{};g===void 0&&h();if(g)return new a.Blob(b,c);else{var d=new i();for(var e=0;e<b.length;e++)d.append(b[e]);return d.getBlob(c.type)}},isSupported:b("emptyFunction").thatReturnsTrue}:c={getBlob:function(){},isSupported:b("emptyFunction").thatReturnsFalse};e.exports=c}),null);
__d("WebWorker",["invariant","BlobFactory","Bootloader","EventListener","SubscriptionsHandler","URI","WebWorkerConfig","XHRRequest","areSameOrigin","destroyOnUnload","emptyFunction","filterObject","getCrossOriginTransport","memoize","performanceNow"],(function(a,b,c,d,e,f,g){__p&&__p();var h=a.URL||a.webkitURL,i=function(){"use strict";__p&&__p();function c(a){__p&&__p();var c=this;this.$1=!1;this.$2=null;this.$3=a;this.__worker=null;this.$4=b("emptyFunction");this.$5=b("emptyFunction");this.$6=[];this.$7=[];this.$8=!1;this.$9=new(b("SubscriptionsHandler"))();this.$10=b("destroyOnUnload")(function(){c.$8||c.terminate()});this.$11("constructed")}var d=c.prototype;d.setMessageHandler=function(a){this.$4=a||b("emptyFunction");return this};d.setErrorHandler=function(a){this.$5=a||b("emptyFunction");return this};d.postMessage=function(a,b){this.isCurrentState("constructed")&&g(0,5977);this.isCurrentState("terminated")&&g(0,5978);if(this.isCurrentState("preparing")){this.$6.push(this.postMessage.bind(this,a,b));return this}a={type:"message",message:a};b?this.getInterfaceableWorker().postMessage(a,b):this.getInterfaceableWorker().postMessage(a);return this};d.$12=function(){this.isCurrentState("terminated")||(this.$11("terminated"),this.__worker=null,this.$13(),this.$6=[],this.$7=[],this.$10&&this.$10.remove&&this.$10.remove())};d.terminate=function(){this.isCurrentState("executing")&&this.__worker.terminate();this.$12();return this};d.execute=function(){this.isCurrentState("terminated")&&g(0,5979);if(["preparing","executing"].some(this.isCurrentState,this))return this;this.$11("preparing");c.prepareResource(this.$3,this.$14.bind(this));return this};d.setAllowCrossPageTransition=function(a){this.$8=a;return this};d.isCurrentState=function(a){c.states.includes(a)||g(0,5980,a);return a===this.$2};d.$14=function(){__p&&__p();this.isCurrentState("executing")&&g(0,5981);if(this.isCurrentState("terminated"))return;this.$3.sameOriginURL||this.$3.source||g(0,5982);this.$3.sameOriginURL?this.__worker=this.constructWorker(this.$3.sameOriginURL):(this.__worker=this.constructWorker(c.evalWorkerURL),this.getInterfaceableWorker().postMessage(this.$3.source));this.$15("ping",Date.now());if(this.$3.dynamicModules)try{this.$15("defineModules",this.$3.dynamicModules)}catch(a){this.terminate();this.$16("define_error",{message:a.message});throw a}this.$17();this.$11("executing");this.$6.forEach(function(a){return a()});this.$6=null;this.$7.forEach(function(a){return a()});this.$7=null};d.$13=function(){this.$9.release()};d.$15=function(a){for(var b=arguments.length,c=new Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];this.getInterfaceableWorker().postMessage({type:a,args:c})};d.$16=function(a,b){c.$16(a,this.$3.name,babelHelpers["extends"]({},b,{cross_page_transition:!!this.$8,state:this.$2}))};c.$18=function(){return Object.keys(b("filterObject")({object_url:c.$19(),eval_url:n(),data_url:c.$20(),worker:c.isSupported(),transferables:c.areTransferablesSupported()},function(a){return!!a}))};d.$17=function(){this.$9.addSubscriptions(b("EventListener").listen(this.getInterfaceableWorker(),"message",this.$21.bind(this)),b("EventListener").listen(this.__worker,"error",this.$22.bind(this)))};d.$22=function(a){var b=this.$5(a);!b&&!a.defaultPrevented&&this.$16("exception",{message:a.message})};d.$21=function(b){__p&&__p();b=b.data;switch(b.type){case"message":this.$4(b.message);break;case"pong":this.$1=!0;this.$16("executed",{dt:Math.floor(b.args[1]-b.args[0]),bytes:this.$3.source?this.$3.source.length:-1});break;case"terminate":this.terminate();break;case"haste-error":this.terminate();this.$16("haste_error",{message:b.message});break;case"console":var c=b.args.shift();["log","error","info","debug","warn"].includes(c)||g(0,5983,c);a.console[c].apply(a.console,b.args);break}};d.$11=function(a){c.states.includes(a)||g(0,5984,a),this.$16("transition",{next_state:a}),this.$2=a};c.prepareResource=function(d,e){__p&&__p();e=e||b("emptyFunction");d.sameOriginURL||d.url||d.source||g(0,5985);!c.isSupported()&&g(0,5986);if(d.sameOriginURL)e();else if(d.url&&b("areSameOrigin")(new(b("URI"))(d.url),new(b("URI"))(a.location.href)))d.sameOriginURL=d.url,e();else if(d.source)c.$23()&&(d.sameOriginURL=c.$24(d.source)),e();else if(!d.loading){var f=b("performanceNow")();d.loading=[e];c.$25(d.url,function(a){a?(d.source=a,c.$23()&&(d.sameOriginURL=c.$24(a)),c.$16("prepared",d.name,{dt:Math.floor(b("performanceNow")()-f),bytes:a.length})):c.$16("failed",d.name,{dt:Math.floor(b("performanceNow")()-f),bytes:0}),d.loading.forEach(function(a){return a()}),d.loading=!1})}else d.loading.push(e);return d};c.releaseResource=function(a){a.sameOriginURL.indexOf("blob:")===0&&(h.revokeObjectURL&&h.revokeObjectURL(a.sameOriginURL),a.sameOriginURL=null);return a};c.isSupported=function(){return m&&(c.$23()||n())};c.isMessageChannelSupported=function(){return c.areTransferablesSupported()&&!!a.MessageChannel};c.areTransferablesSupported=function(){return c.isSupported()&&o()};c.$25=function(a,c){new(b("XHRRequest"))(a).setTransportBuilder(b("getCrossOriginTransport")).setMethod("GET").setResponseHandler(function(a){c(a)}).setErrorHandler(c.bind(null,null)).send()};c.$24=function(a){c.$23()||g(0,5987);if(c.$19()){var d=b("BlobFactory").getBlob([a],{type:"application/javascript"});return h.createObjectURL(d)}if(c.$20())return"data:application/javascript,"+encodeURIComponent(a)};c.$19=function(){return b("BlobFactory").isSupported()&&k()};c.$20=function(){return l()};c.$23=function(){return c.$19()||c.$20()};c.$16=function(a,d,e){if(!b("WebWorkerConfig").logging.enabled)return;b("Bootloader").loadModules(["BanzaiLogger"],function(f){f.log(b("WebWorkerConfig").logging.config,babelHelpers["extends"]({},e,{features_array:c.$18(),event:a,resource:d}))},"WebWorker")};d.constructWorker=function(a){return j(a)};d.$26=function(a,b){if(this.isCurrentState("preparing")){this.$7.push(this.$26.bind(this,a,b));return}this.getInterfaceableWorker().postMessage({type:"port",message:a},b)};d.createMessageChannel=function(a,b){var c=new MessageChannel();this.$26(a,[c.port2].concat(b||[]));c.port1.start();return c.port1};d.getInterfaceableWorker=function(){return this.__worker};return c}();function j(b){return new a.Worker(b)}var k=b("memoize")(function(){__p&&__p();var a;if(!h||!h.createObjectURL)return!1;try{a=h.createObjectURL(b("BlobFactory").getBlob([""],{type:"application/javascript"}));var c=j(a);c.terminate();c=!0}catch(a){c=!1}finally{h.revokeObjectURL&&h.revokeObjectURL(a)}return c}),l=b("memoize")(function(){try{var a=j("data:application/javascript,");a.terminate();a=!0}catch(b){a=!1}return a}),m=!!a.Worker,n=b("memoize")(function(){try{var a=j(i.evalWorkerURL);a.terminate();a=!0}catch(b){a=!1}return a}),o=b("memoize")(function(){try{var a=j(i.evalWorkerURL),b=new ArrayBuffer(0);a.postMessage({buffer:b},[b]);a.terminate();b=!0}catch(a){b=!1}return b});i.states=["constructed","preparing","executing","terminated"];i.evalWorkerURL=b("WebWorkerConfig").evalWorkerURL;e.exports=i}),null);