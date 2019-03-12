if (self.CavalryLogger) { CavalryLogger.start_js(["M3\/Ml"]); }

__d("ChatOpenTabEventLogger",["Banzai","Bootloader"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g="messaging_tracking";a={_log:function(a,c,d,e){var f={referrer:a||"",message_thread_id:c,message_view:"chat",timestamp_send:Date.now(),message_target_ids:[]};d!==void 0&&(f.message_target_ids=[d]);b("Bootloader").loadModules(["ChatImpressionLogger"],function(c){c.logImpression(a,d,e),b("Banzai").post(g,f,{delay:0,retry:!0})},"ChatOpenTabEventLogger")},logClickOpen:function(a,c,d,e){var f=this;b("Bootloader").loadModules(["MercuryIDs","getPageIDFromThreadID","ChatImpressionLogger"],function(b,g){f._log(a,c,d,e);b=g(String(c));b&&f._logPageClick(a,b)},"ChatOpenTabEventLogger")},logUserClickOpen:function(a,c,d){var e=this;b("Bootloader").loadModules(["MercuryIDs","ChatImpressionLogger"],function(b){b=b.getThreadIDFromUserID(c);e.logClickOpen(a,b,c,d)},"ChatOpenTabEventLogger")},logAutoOpen:function(a,b,c,d){this._log(a,b,c,d)},logUserAutoOpen:function(a,c){var d=this;b("Bootloader").loadModules(["MercuryIDs","ChatImpressionLogger"],function(b){b=b.getThreadIDFromUserID(c);d._log(a,b,c)},"ChatOpenTabEventLogger")},_logPageClick:function(a,c){b("Banzai").post("page_message_button_click",{page_id:c,ref:a}),b("Bootloader").loadModules(["PagesLogger","PagesLoggerEventEnum","PagesLoggerEventTargetEnum"],function(b,d,e){b.log(c,d.CLICK,e.PAGE_MESSAGE,a)},"ChatOpenTabEventLogger")}};e.exports=a}),null);
__d("IntlDateStringsTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:IntlDateStringsLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:IntlDateStringsLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:IntlDateStringsLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setCldrKey=function(a){this.$1.cldr_key=a;return this};c.setCldrValue=function(a){this.$1.cldr_value=a;return this};c.setDatetimeFormat=function(a){this.$1.datetime_format=a;return this};c.setDatetimeInsideSentence=function(a){this.$1.datetime_inside_sentence=a;return this};c.setLoggedFromClient=function(a){this.$1.logged_from_client=a;return this};c.setTargetLocale=function(a){this.$1.target_locale=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={cldr_key:!0,cldr_value:!0,datetime_format:!0,datetime_inside_sentence:!0,logged_from_client:!0,target_locale:!0,time:!0,weight:!0};e.exports=a}),null);
__d("FantaDispatcher",["ExplicitRegistrationDispatcher"],(function(a,b,c,d,e,f){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}return b}(b("ExplicitRegistrationDispatcher"));e.exports=new a({strict:!1})}),null);
__d("FantaTabActions",["Bootloader","CurrentUser","Env","FantaDispatcher","MercuryIDs","MessengerURIConstants","URI","WebMessengerThreadPermalinks","WorkGalahadSettings","WorkplaceChatHelper","gkx","goURI","ifRequired","keyMirror"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("keyMirror")({BLUR_TAB:null,CLEAR_PAGE_INDICATOR_DESCRIPTION:null,CLOSE_ALL_TABS:null,CLOSE_AND_TAB_NEXT:null,CLOSE_TAB:null,DELETE_TAB:null,FOCUS_NEXT_TAB:null,FOCUS_PREVIOUS_TAB:null,FOCUS_TAB:null,HIGHLIGHT_NEW_MESSAGE:null,HOVERED_TAB:null,JUMP_TO_MESSAGE:null,LOAD_FROM_DATA:null,MINIMIZE_ALL_TABS:null,MINIMIZE_TAB:null,OPEN_TAB_WITH_INTERSTITIAL_DATA:null,OPEN_TAB:null,REPLACE_TAB:null,SCROLL_BOTTOM_CHANGED:null,SET_ALLOWED_RAISED_TABS:null,SET_MESSAGE_COUNT:null,SET_PAGE_INDICATOR_DESCRIPTION:null,SET_PERMANENT_URI:null,SHOW_UNSEEN_MESSAGES:null,UNHIGHLIGHT_NEW_MESSAGE:null,UNHOVERED_TAB:null,UNMINIMIZE_TAB:null,WIPE_JUMP_TO_MESSAGE:null,CREATE_NEW_NAMED_GROUP_CHAT:null});function h(a,c){var d=a?new(b("URI"))(b("WebMessengerThreadPermalinks").getThreadURIFromServerID(a)):new(b("URI"))(b("MessengerURIConstants").COMPOSE_SUBPATH);b("ifRequired")("BusinessURI.brands",function(a){return b("goURI")(a(d))},function(){return setTimeout(function(){i.openTab(a,c)},100)})}var i={Types:g,openNewMessageTab:function(a,b,c){i.openTab(a,b,c,!0)},openTab:function(a,c,d,e,f){__p&&__p();var i=this;if(b("Env").isCQuick){b("Bootloader").loadModules(["BlueCompatRouter"],function(b){b.startChat(a||"")},"FantaTabActions");return}if(b("CurrentUser").isWorkUser()){if(b("WorkGalahadSettings").isGalahadEnabled){var j=b("ifRequired")("WorkGalahadChat",function(c){c.openThread(b("MercuryIDs").getThreadFBIDFromThreadID(a));return!0},function(){return!1});if(j)return}if(b("gkx")("678256")&&b("WorkplaceChatHelper").suppressChatIfActiveOnDesktop()){if(c==="jewel_new_message"){b("goURI")("workchat://new");return}if(!b("MercuryIDs").isLocalThread(a)||c!=="groupsync_fbgroupmall_chat_button"){b("goURI")("workchat://"+(a||""));return}}}b("ifRequired")("FantaTabsEagerBootloader",function(a){return a.bootload()});this.dispatchOrBootloadGetMessages(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB,tabID:a,entryPoint:c,defaultText:d,isNewMessageTab:e,defaultPreview:f}),b("ifRequired")("FantaTabsReactApp",function(b){i._tryLoadSlimApp(a,c)},function(){i._tryLoadSlimApp(a,c,function(){return h(a,c)})})})},openInterstitialTab:function(a,c,d){var e=this;this.dispatchOrBootloadGetMessages(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB_WITH_INTERSTITIAL_DATA,tabID:a,interstitialData:c,entryPoint:d}),b("ifRequired")("FantaTabsReactApp",function(b){e._tryLoadSlimAppWithInterstitialData(a,c,d)},function(){e._tryLoadSlimAppWithInterstitialData(a,c,d)})})},_tryLoadSlimApp:function(a,c,d){b("ifRequired")("FantaTabsSlimApp",function(d){b("ifRequired")("FantaAppStore",function(){},function(){d.getPumpedUp(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB,tabID:a,entryPoint:c})})})},function(){return d&&d(a)})},_tryLoadSlimAppWithInterstitialData:function(a,c,d){b("ifRequired")("FantaTabsSlimApp",function(e){b("ifRequired")("FantaAppStore",function(){},function(){e.getPumpedUp(function(){b("FantaDispatcher").dispatch({type:g.OPEN_TAB_WITH_INTERSTITIAL_DATA,tabID:a,interstitialData:c,entryPoint:d})})})})},replaceTab:function(a,c){b("FantaDispatcher").dispatch({type:g.REPLACE_TAB,tabID:a,newTabID:c})},minimizeTab:function(a){b("FantaDispatcher").dispatch({type:g.MINIMIZE_TAB,tabID:a})},minimizeAllTabs:function(){b("FantaDispatcher").dispatch({type:g.MINIMIZE_ALL_TABS})},unminimizeTab:function(a){b("FantaDispatcher").dispatch({type:g.UNMINIMIZE_TAB,tabID:a})},closeTab:function(a){b("FantaDispatcher").dispatch({type:g.CLOSE_TAB,tabID:a})},closeAllTabs:function(){b("FantaDispatcher").dispatch({type:g.CLOSE_ALL_TABS})},closeAndTabNext:function(a){b("FantaDispatcher").dispatch({type:g.CLOSE_AND_TAB_NEXT,tabID:a})},deleteTab:function(a){b("FantaDispatcher").dispatch({type:g.DELETE_TAB,tabID:a})},focusTab:function(a){b("FantaDispatcher").dispatch({type:g.FOCUS_TAB,tabID:a})},blurTab:function(a){b("FantaDispatcher").dispatch({type:g.BLUR_TAB,tabID:a})},hoveredTab:function(a){b("FantaDispatcher").dispatch({type:g.HOVERED_TAB,tabID:a})},unhoveredTab:function(a){b("FantaDispatcher").dispatch({type:g.UNHOVERED_TAB,tabID:a})},highlightNewMessage:function(a){b("FantaDispatcher").dispatch({type:g.HIGHLIGHT_NEW_MESSAGE,tabId:a})},unhighlightNewMessage:function(a){b("FantaDispatcher").dispatch({type:g.UNHIGHLIGHT_NEW_MESSAGE,tabId:a})},setAllowedRaisedTabs:function(a){b("FantaDispatcher").dispatch({type:g.SET_ALLOWED_RAISED_TABS,allowedRaisedTabs:a})},loadFromData:function(a){if(b("WorkplaceChatHelper").suppressChatIfActiveOnDesktop())return;this.dispatchOrBootloadGetMessages(function(){a&&b("FantaDispatcher").dispatch({type:g.LOAD_FROM_DATA,tabData:a})})},focusNextTab:function(a){b("FantaDispatcher").dispatch({type:g.FOCUS_NEXT_TAB,event:a})},focusPreviousTab:function(a){b("FantaDispatcher").dispatch({type:g.FOCUS_PREVIOUS_TAB,event:a})},scrollBottomChanged:function(a,c,d){b("FantaDispatcher").dispatch({type:g.SCROLL_BOTTOM_CHANGED,isScrolledToBottom:c,tabID:a,showUnseenMessages:d})},jumpToMessage:function(a,c){b("FantaDispatcher").dispatch({type:g.JUMP_TO_MESSAGE,mid:c,tabID:a})},wipeJumpToMessage:function(a){b("FantaDispatcher").dispatch({type:g.WIPE_JUMP_TO_MESSAGE,tabID:a})},setPageIndicatorDescription:function(a,c){b("FantaDispatcher").dispatch({type:g.SET_PAGE_INDICATOR_DESCRIPTION,tabID:a,description:c})},clearPageIndicatorDescription:function(a){b("FantaDispatcher").dispatch({type:g.CLEAR_PAGE_INDICATOR_DESCRIPTION,tabID:a})},showUnseenMessages:function(a){b("FantaDispatcher").dispatch({type:g.SHOW_UNSEEN_MESSAGES,tabID:a})},setPermanentUri:function(a,c){b("FantaDispatcher").dispatch({type:g.SET_PERMANENT_URI,tabID:a,uri:c})},createNewNamedGroupChat:function(a,c){b("FantaDispatcher").dispatch({type:g.CREATE_NEW_NAMED_GROUP_CHAT,tabID:a,tokens:c})},dispatchOrBootloadGetMessages:function(a){b("ifRequired")("FantaReducersGetMessages",function(){a()},function(){b("ifRequired")("FantaAppStore",function(c){b("Bootloader").loadModules(["FantaReducersGetMessages"],function(b){c.addReducers(b),a()},"FantaTabActions")},function(){a()})})}};e.exports=i}),null);
__d("ReasonReact.bs",["bs_curry","React","bs_caml_builtin_exceptions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function g(){return 0}function h(){return 0}function i(){return!0}function j(){return"RenderNotImplemented"}function k(){return 0}function l(a){return a}function m(a,b){return 0}function n(a,c,d){var e=a.reasonProps;if(e==null)if(c!==void 0)return[b("bs_curry")._1(c,a)];else throw[b("bs_caml_builtin_exceptions").invalid_argument,"A JS component called the Reason component "+(d+" which didn't implement the JS->Reason React props conversion.")];else return e}function o(a){__p&&__p();return b("React").createClass({displayName:a,subscriptions:null,statics:{jsPropsToReason:void 0,getDerivedStateFromProps:function(c,d){__p&&__p();var e=this;e=e==null?void 0:e.jsPropsToReason;c=n(c,e,a);e=c[0];if(e[3]!==l){c=d.reasonState;e=b("bs_curry")._1(e[3],c);if(e===c)return null;else return{reasonState:e,reasonStateVersion:d.reasonStateVersion+1|0,reasonStateVersionUsedToComputeSubelements:d.reasonStateVersionUsedToComputeSubelements}}else return null}},self:function(a,b){var c=this;return[c.handleMethod,a,b,c.sendMethod,c.onUnmountMethod]},getInitialState:function(){var c=this;c=n(c.props,c.jsPropsToReason,a);return{reasonState:b("bs_curry")._1(c[0][9],0)}},componentDidMount:function(){var c=this,d=this,e=n(d.props,d.jsPropsToReason,a);e=e[0];if(e[4]!==h){d=d.state;d=d.reasonState;return b("bs_curry")._1(e[4],c.self(d,e[10]))}else return 0},componentDidUpdate:function(c,d){__p&&__p();var e=this,f=this,h=f.state;h=h.reasonState;var i=f.props,j=n(i,f.jsPropsToReason,a),k=j[0];if(k[5]!==g){i=c===i;i=i?j:n(c,f.jsPropsToReason,a);j=d.reasonState;c=e.self(h,k[10]);f=c[0];d=i[0][10];e=c[3];h=c[4];i=[f,j,d,e,h];return b("bs_curry")._1(k[5],[i,c])}else return 0},componentWillUnmount:function(){__p&&__p();var c=this,d=this,e=n(d.props,d.jsPropsToReason,a);e=e[0];d=d.state;d=d.reasonState;e[6]!==h&&b("bs_curry")._1(e[6],c.self(d,e[10]));d=c.subscriptions;if(d!==null){d.forEach(function(a){return b("bs_curry")._1(a,0)});return 0}else return 0},shouldComponentUpdate:function(c,d,e){__p&&__p();e=this;var f=this,g=f.props,h=n(f.props,f.jsPropsToReason,a);g=c===g;g=g?h:n(c,f.jsPropsToReason,a);c=g[0];g=d.reasonState;d=e.self(g,c[10]);if(c[7]!==i){e=f.state;g=e.reasonState;f=d[0];e=h[0][10];h=d[3];var j=d[4];f=[f,g,e,h,j];return b("bs_curry")._1(c[7],[f,d])}else return!0},onUnmountMethod:function(a){var b=this,c=b.subscriptions;if(c!==null){c.push(a);return 0}else{b.subscriptions=[a];return 0}},handleMethod:function(c){var d=this,e=this;return function(f){var g=e.state;g=g.reasonState;var h=n(e.props,e.jsPropsToReason,a);return b("bs_curry")._2(c,f,d.self(g,h[0][10]))}},sendMethod:function(c){__p&&__p();var d=this,e=this,f=n(e.props,e.jsPropsToReason,a);f=f[0];if(f[11]!==m){var g=[function(){return 0}],h=b("bs_curry")._1(f[11],c);return e.setState(function(a,c){__p&&__p();c=a.reasonState;c=b("bs_curry")._1(h,c);if(c===0)return null;else{var d;if(typeof c==="number")d=a;else switch(c.tag|0){case 0:d={reasonState:c[0]};break;case 1:g[0]=c[0];d=a;break;case 2:g[0]=c[1];d={reasonState:c[0]};break}if(d!==a)return d;else return null}},d.handleMethod(function(a,c){return b("bs_curry")._1(g[0],c)}))}else return 0},render:function(){var c=this,d=this,e=n(d.props,d.jsPropsToReason,a);e=e[0];d=d.state;d=d.reasonState;return b("bs_curry")._1(e[8],c.self(d,e[10]))}})}function a(a){return[a,o(a),[void 0],l,h,g,h,i,j,k,0,m,void 0]}var p=a,q=a,r=a,s=a;function c(a,c,d){a=a!==void 0?a:void 0;c=c!==void 0?c:void 0;var e=[d],f=d[12];if(f!==void 0)return b("bs_curry")._2(f,a,c);else return b("React").createElement(d[1],{key:a,ref:c,reasonProps:e})}function d(a,b){var c=a[1].prototype;c.jsPropsToReason=b;c=a[1];c.getDerivedStateFromProps=a[1].getDerivedStateFromProps.bind({jsPropsToReason:b});return a[1]}function e(a,c){var d=function(a){return b("bs_curry")._2(c,a,a.children)};d=d;var e=a[1].prototype;e.jsPropsToReason=d;return a[1]}var t=a("interop");function u(a,c,d){var e=function(e,f){var g=a,h=c,i=d;e=e;f=f;h=Object.assign(Object.assign({},h),{ref:f,key:e});f=[g,h].concat(i);return b("React").createElement.apply(null,f)};return[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],e]}function v(a){if(typeof Event==="function")return new Event(a);else{var b=document.createEvent("Event");b.initEvent(a,!0,!0);return b}}function w(){__p&&__p();var a=typeof window==="undefined"?void 0:window;if(a!==void 0){a=a.location.pathname;switch(a){case"":case"/":return 0;default:a=a.slice(1);var b=a[a.length-1|0];b=b==="/"?a.slice(0,-1):a;a=b.split("/");b=a.length-1|0;var c=0;while(!0){var d=c,e=b;if(e<0)return d;else{c=[a[e],d];b=e-1|0;continue}}}}else return 0}function x(){var a=typeof window==="undefined"?void 0:window;if(a!==void 0){a=a.location.hash;switch(a){case"":case"#":return"";default:return a.slice(1)}}else return""}function y(){var a=typeof window==="undefined"?void 0:window;if(a!==void 0){a=a.location.search;switch(a){case"":case"?":return"";default:return a.slice(1)}}else return""}function z(a){var b=typeof history==="undefined"?void 0:history,c=typeof window==="undefined"?void 0:window;if(b!==void 0&&c!==void 0){b.pushState(null,"",a);c.dispatchEvent(v("popstate"));return 0}else return 0}function A(){return[w(0),x(0),y(0)]}function B(a){var c=typeof window==="undefined"?void 0:window;if(c!==void 0){var d=function(){return b("bs_curry")._1(a,A(0))};c.addEventListener("popstate",d);return d}else return function(){return 0}}function C(a){var b=typeof window==="undefined"?void 0:window;if(b!==void 0){b.removeEventListener("popstate",a);return 0}else return 0}function D(a,c){__p&&__p();var d=a!==void 0?a:function(a,b){return a===b},e=[void 0];return function(a){__p&&__p();var f=e[0];if(f!==void 0){f=f;if(b("bs_curry")._2(d,f[0],a))return f[1];else f=1}else f=1;if(f===1){f=b("bs_curry")._1(c,a);e[0]=[a,f];return f}}}function E(a){var b=[a];return function(a){var c=b[0];b[0]=a;return c}}a=[D,E];D=[z,B,C,A];f.statelessComponent=p;f.statelessComponentWithRetainedProps=q;f.reducerComponent=r;f.reducerComponentWithRetainedProps=s;f.element=c;f.wrapReasonForJs=d;f.wrapReasonForJsWithChildren=e;f.wrapJsForReason=u;f.Router=D;f.Props=a}),null);
__d("LinkReact.bs",["Link.react","ReasonReact.bs","bs_js_primitive","bs_js_null_undefined"],(function(a,b,c,d,e,f){"use strict";function a(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){d={"aria-label":b("bs_js_null_undefined").fromOption(d),"data-ft":b("bs_js_null_undefined").fromOption(f),"data-hover":b("bs_js_null_undefined").fromOption(g),"data-tooltip-content":b("bs_js_null_undefined").fromOption(h),"data-tooltip-alignh":b("bs_js_null_undefined").fromOption(i),"data-tooltip-position":b("bs_js_null_undefined").fromOption(j),className:b("bs_js_null_undefined").fromOption(e),href:b("bs_js_null_undefined").fromOption(k),linkRef:b("bs_js_null_undefined").fromOption(l),onClick:b("bs_js_null_undefined").fromOption(m),onMouseDown:b("bs_js_null_undefined").fromOption(n),onMouseEnter:b("bs_js_null_undefined").fromOption(o),role:b("bs_js_null_undefined").fromOption(p),rel:b("bs_js_null_undefined").fromOption(q),style:b("bs_js_null_undefined").fromOption(r),tabIndex:b("bs_js_null_undefined").fromOption(s),target:b("bs_js_null_undefined").fromOption(t),title:b("bs_js_null_undefined").fromOption(u)};a!==void 0&&(d["aria-expanded"]=b("bs_js_primitive").valFromOption(a));c!==void 0&&(d["aria-hidden"]=b("bs_js_primitive").valFromOption(c));return b("ReasonReact.bs").wrapJsForReason(b("Link.react"),d,v)}f.make=a}),null);
__d("ReasonReactCompat.bs",["ReasonReact.bs"],(function(a,b,c,d,e,f){"use strict";a=b("ReasonReact.bs").wrapJsForReason;f.wrapReactComponent=a}),null);
__d("Image.bs",["Image.react","bs_js_primitive","ReasonReactCompat.bs"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,c,d,e,f,g,h,i,j,k){__p&&__p();var l={};a!==void 0&&(l.className=b("bs_js_primitive").valFromOption(a));c!==void 0&&(l.alt=b("bs_js_primitive").valFromOption(c));d!==void 0&&(l["aria-label"]=b("bs_js_primitive").valFromOption(d));e!==void 0&&(l["aria-busy"]=b("bs_js_primitive").valFromOption(e));f!==void 0&&(l.src=b("bs_js_primitive").valFromOption(f));g!==void 0&&(l.height=b("bs_js_primitive").valFromOption(g));h!==void 0&&(l.title=b("bs_js_primitive").valFromOption(h));i!==void 0&&(l.width=b("bs_js_primitive").valFromOption(i));j!==void 0&&(l.style=b("bs_js_primitive").valFromOption(j));return b("ReasonReactCompat.bs").wrapReactComponent(b("Image.react"),l,k)}f.make=a}),null);
__d("cssURL",[],(function(a,b,c,d,e,f){function a(a){return"url('"+a.replace(/[\ud800-\udfff].|[^-a-zA-Z0-9./_?]/g,function(a){return"\\"+a.codePointAt(0).toString(16)+" "})+"')"}e.exports=a}),null);
__d("padNumber",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){a=a.toString();return a.length>=b?a:"0".repeat(b-a.length)+a}e.exports=a}),null);
__d("DateStrings",["fbt"],(function(a,b,c,d,e,f,g){__p&&__p();var h,i,j,k,l,m,n,o,p,q={getWeekdayName:function(a){m||(m=[g._("S\u00f6ndag"),g._("M\u00e5ndag"),g._("Tisdag"),g._("Onsdag"),g._("Torsdag"),g._("Fredag"),g._("L\u00f6rdag")]);return m[a]},getUppercaseWeekdayName:function(a){o||(o=[g._("S\u00d6NDAG"),g._("M\u00c5NDAG"),g._("TISDAG"),g._("ONSDAG"),g._("TORSDAG"),g._("FREDAG"),g._("L\u00d6RDAG")]);return o[a]},getWeekdayNameShort:function(a){n||(n=[g._("s\u00f6n"),g._("m\u00e5n"),g._("tis"),g._("ons"),g._("tor"),g._("fre"),g._("l\u00f6r")]);return n[a]},getUppercaseWeekdayNameShort:function(a){p||(p=[g._("S\u00d6N"),g._("M\u00c5N"),g._("TIS"),g._("ONS"),g._("TOR"),g._("FRE"),g._("L\u00d6R")]);return p[a]},_initializeMonthNames:function(){h=[g._("januari"),g._("februari"),g._("mars"),g._("april"),g._("maj"),g._("juni"),g._("juli"),g._("augusti"),g._("september"),g._("oktober"),g._("november"),g._("december")]},getMonthName:function(a){h||q._initializeMonthNames();return h[a-1]},getMonthNames:function(){h||q._initializeMonthNames();return h.slice()},getUppercaseMonthName:function(a){k||(k=[g._("JANUARI"),g._("FEBRUARI"),g._("MARS"),g._("APRIL"),g._("MAJ"),g._("JUNI"),g._("JULI"),g._("AUGUSTI"),g._("SEPTEMBER"),g._("OKTOBER"),g._("NOVEMBER"),g._("DECEMBER")]);return k[a-1]},getMonthNameShort:function(a){i||(i=[g._("jan"),g._("feb"),g._("mar"),g._("apr"),g._("maj"),g._("jun"),g._("jul"),g._("aug"),g._("sep"),g._("okt"),g._("nov"),g._("dec")]);return i[a-1]},getUppercaseMonthNameShort:function(a){j||(j=[g._("JAN"),g._("FEB"),g._("MAR"),g._("APR"),g._("MAJ"),g._("JUN"),g._("JUL"),g._("AUG"),g._("SEP"),g._("OKT"),g._("NOV"),g._("DEC")]);return j[a-1]},getOrdinalSuffix:function(a){l||(l=["",g._("st"),g._("nd"),g._("rd"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("st"),g._("nd"),g._("rd"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("th"),g._("st")]);return l[a]},getDayOfMonth:function(a){__p&&__p();switch(a){case 1:return g._("1:a");case 2:return g._("2:a");case 3:return g._("3:e");case 4:return g._("4:e");case 5:return g._("5:e");case 6:return g._("6:e");case 7:return g._("7:e");case 8:return g._("8:e");case 9:return g._("9:e");case 10:return g._("10:e");case 11:return g._("11:e");case 12:return g._("12:e");case 13:return g._("13:e");case 14:return g._("14:e");case 15:return g._("15:e");case 16:return g._("16:e");case 17:return g._("17:e");case 18:return g._("18:e");case 19:return g._("19:e");case 20:return g._("20:e");case 21:return g._("21:a");case 22:return g._("22:a");case 23:return g._("23:e");case 24:return g._("24:e");case 25:return g._("25:e");case 26:return g._("26:e");case 27:return g._("27:e");case 28:return g._("28:e");case 29:return g._("29:e");case 30:return g._("30:e");case 31:return g._("31:a");default:throw new Error("Invalid day of month.")}},getDayLabel:function(){return g._("Dag:")},getMonthLabel:function(){return g._("M\u00e5nad:")},getYearLabel:function(){return g._("\u00c5r:")},getHourLabel:function(){return g._("Timme:")},getMinuteLabel:function(){return g._("Minut:")},getDayPlaceholder:function(){return g._("dd")},getMonthPlaceholder:function(){return g._("mm")},getYearPlaceholder:function(){return g._("\u00e5\u00e5\u00e5\u00e5")},getHourPlaceholder:function(){return g._("h")},getMinutePlaceholder:function(){return g._("m")},get12HourClockSuffix:function(a){return a<12?g._("fm."):g._("em")},getUppercase12HourClockSuffix:function(a){return a<12?g._("fm"):g._("EM")}};e.exports=q}),null);
__d("IntlDateCLDRCategory",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({DATE_FORMATS:"dateFormats",TIME_FORMATS:"timeFormats",DATE_TIME_FORMATS:"dateTimeFormats",AVAILABLE_FORMATS:"availableFormats"})}),null);
__d("IntlDateFormatsCLDRWidthEnum",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({FULL:"full",LONG:"long",MEDIUM:"medium",SHORT:"short"})}),null);
__d("getCLDRLocalizedFormat",["CLDRDateFormatConfig","FBLogger","IntlDateCLDRCategory","IntlDateFormatsCLDRWidthEnum","ex","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("CLDRDateFormatConfig").CLDRConfigeratorFormats,h=b("CLDRDateFormatConfig").CLDRRegionalConfigeratorFormats,i=new Set(["date_short","dateTime_short_short","time_short","time_medium","j"]);function a(a){__p&&__p();if(a==null)throw new Error(b("ex")('Format: "%s", not supported by configurator.',a));var c,d,e=a.split("_"),f=e[0];e=e.slice(1);var l=f+"Formats";i.has(a)?d=h:d=g;switch(l){case b("IntlDateCLDRCategory").DATE_FORMATS:case b("IntlDateCLDRCategory").TIME_FORMATS:var m=j(e[0]);if(m==null)throw new Error(b("ex")('Format: "%s", category: "%s", with unsupported width: "%s"',a,l,m));c=d[l][m];if(c==null)throw new Error(b("ex")('Format: "%s", category: "%s", width: "%s", with unsupported localization',a,l,m));break;case b("IntlDateCLDRCategory").DATE_TIME_FORMATS:m=j(e[0]);e=j(e[1]);if(m==null||e==null)throw new Error(b("ex")('Format: "%s", category: "%s", with unsupported width: "%s" or "%s"',a,l,m,e));c=d[l][m];var n=d.dateFormats[m],o=d.timeFormats[e];if(c==null)throw new Error(b("ex")('Format: "%s", category: "%s", date width: "%s", and time width: "%s", with unsupported localization',a,l,m,e));c=c.replace("{0}",o).replace("{1}",n);break;default:l=b("IntlDateCLDRCategory").AVAILABLE_FORMATS;m=f;m.includes("j")&&(m=k(m,d.timeFormats));c=d[l][m];if(c==null)throw new Error(b("ex")('Format: "%s", with key: "%s", not supported by CLDR',a,m))}return c}function j(a){return b("IntlDateFormatsCLDRWidthEnum")[b("nullthrows")(a,"Expected CLDR width key to not be null").toUpperCase()]}function k(a,c){var d;c=c["short"];c==null?(b("FBLogger")("formatDate").blameToPreviousFile().warn('CLDR `timeFormat`, width `short` required for 24 hour localization not found for availableKey: "%s"',a),d="h"):d=c.includes("H")?"H":"h";return a.replace("j",d)}e.exports=a}),null);
__d("intlGetDateNumerics",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){b.utc===!0?b={dateDay:a.getUTCDate(),dateDayOfWeek:a.getUTCDay(),dateMonth:a.getUTCMonth(),dateYear:a.getUTCFullYear(),dateHours:a.getUTCHours(),dateMinutes:a.getUTCMinutes(),dateSeconds:a.getUTCSeconds(),dateMilliseconds:a.getUTCMilliseconds()}:b={dateDay:a.getDate(),dateDayOfWeek:a.getDay(),dateMonth:a.getMonth(),dateYear:a.getFullYear(),dateHours:a.getHours(),dateMinutes:a.getMinutes(),dateSeconds:a.getSeconds(),dateMilliseconds:a.getMilliseconds()};return b}e.exports=a}),null);
__d("intlRenderJSDateSymbol",["DateStrings","nullthrows","padNumber"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,c,d,e,f){__p&&__p();f===void 0&&(f=0);var g="";switch(c){case"\\":f++;g=b("nullthrows")(e,"Only deprecated calls to `intlRenderJSDateSymbol()` use `localizedJSFormat`.").charAt(f);break;case"d":g=b("padNumber")(a.dateDay,2);break;case"j":g=a.dateDay;break;case"S":g=b("DateStrings").getOrdinalSuffix(a.dateDay);break;case"D":g=b("DateStrings").getWeekdayNameShort(a.dateDayOfWeek);break;case"l":g=b("DateStrings").getWeekdayName(a.dateDayOfWeek);break;case"F":case"f":g=b("DateStrings").getMonthName(a.dateMonth+1);break;case"M":g=b("DateStrings").getMonthNameShort(a.dateMonth+1);break;case"m":g=b("padNumber")(a.dateMonth+1,2);break;case"n":g=a.dateMonth+1;break;case"Y":g=a.dateYear;break;case"y":g=(""+a.dateYear).slice(2);break;case"a":d.skipSuffixLocalization?g=a.dateHours<12?"am":"pm":g=b("DateStrings").get12HourClockSuffix(a.dateHours);break;case"A":d.skipSuffixLocalization?g=a.dateHours<12?"AM":"PM":g=b("DateStrings").getUppercase12HourClockSuffix(a.dateHours);break;case"g":a.dateHours===0||a.dateHours===12?g="12":g=a.dateHours%12;break;case"G":g=a.dateHours;break;case"h":a.dateHours===0||a.dateHours===12?g="12":g=b("padNumber")(a.dateHours%12,2);break;case"H":g=b("padNumber")(a.dateHours,2);break;case"i":g=b("padNumber")(a.dateMinutes,2);break;case"s":g=b("padNumber")(a.dateSeconds,2);break;case"X":g=b("padNumber")(a.dateMilliseconds,3);break;default:g=c}return{idx:f,rendered:String(g)}}e.exports=a}),null);
__d("intlRenderCLDRDate",["CLDRDateFormatConfig","ex","intlRenderJSDateSymbol"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=/\w+/;function a(a,c,d){__p&&__p();var e=b("CLDRDateFormatConfig").intlDateSpecialChars,f="",g="",i=!1,j=[],k;a=a.split(e.cldrDelimiter+e.singleQuote).join(e.singleQuoteHolder);for(var l=0,m=a.length;l<m;l++){var n=a.charAt(l);!i?n===e.cldrDelimiter?i=!0:f.length===0||f[0]===n?f+=n:n===e.singleQuoteHolder?f+=e.singleQuote:(k=h(f,d,c),j.push(k.rendered),f=n):(f.length!==0&&(k=h(f,d,c),j.push(k.rendered),f=""),n===e.cldrDelimiter?(i=!1,j.push(g),g=""):n===e.singleQuoteHolder?g+=e.singleQuote:g+=n)}if(g.length!==0)throw new Error(b("ex")('Format: "%s" must contain closing str literal delimiter',a));f.length!==0&&(k=h(f,d,c),j.push(k.rendered));return j.join("")}function h(a,c,d){a=i(a);return b("intlRenderJSDateSymbol")(c,a,d)}function i(a){if(a in b("CLDRDateFormatConfig").CLDRToPHPSymbolConversion)return b("CLDRDateFormatConfig").CLDRToPHPSymbolConversion[a];if(g.test(a))throw new Error(b("ex")('Unsupported CLDR symbol: "%s". If string literal, wrap in delimiters',a));return a}e.exports=a}),null);
__d("formatDate",["invariant","CLDRDateFormatConfig","CLDRDateRenderingClientRollout","DateFormatConfig","FBLogger","IntlDateStringsTypedLogger","Random","getCLDRLocalizedFormat","gkx","intlGetDateNumerics","intlRenderCLDRDate","intlRenderJSDateSymbol"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=Object.freeze({today:null,yesterday:null,thisWeek:null,thisMonth:null,thisYear:null,withinDay:null,withinWeek:null,withinMonth:null,withinYear:null,older:null,future:null,allOtherTimes:null});h.DEFAULT_FORMAT="M j, Y g:i A";h.periodNames=Object.freeze(Object.keys(a));function h(a,c,d){__p&&__p();d=d||{};if(!c||!a&&a!==0)return"";typeof a==="string"&&(a=parseInt(a,10));typeof a==="number"&&(a=new Date(a*1e3));a instanceof Date||g(0,214);isNaN(a.getTime())&&g(0,215);a.getTime()>=1e15&&b("FBLogger")("i18n-formatDate").blameToPreviousFile().info("The date passed to formatDate is too far in the future. Did you mix up milliseconds/seconds?");c=k(a,c);a=b("intlGetDateNumerics")(a,d);return i(c,a,d)}function i(a,c,d){__p&&__p();var e=a;if(!d.skipPatternLocalization&&(d.formatInternal||!n()))if(b("gkx")("676840")&&a in b("CLDRDateFormatConfig").supportedPHPFormatsKeys)try{var f=b("CLDRDateFormatConfig").supportedPHPFormatsKeys[a],h=b("getCLDRLocalizedFormat")(f);m(a,f,h);return b("intlRenderCLDRDate")(h,d,c)}catch(a){b("FBLogger")("i18n-formatDate").blameToPreviousFile().catching(a).mustfix("CLDR date format render error");if(d.throwCLDRError)throw a}else b("DateFormatConfig").formats[a]?(e=b("DateFormatConfig").formats[a],m(a)):a.length===1||g(0,216,a);return j(e,d,c)}function j(a,c,d){var e=[];for(var f=0;f<a.length;f++){var g=a.charAt(f);g=b("intlRenderJSDateSymbol")(d,g,c,a,f);e.push(g.rendered);f=g.idx}return e.join("")}function k(a,c){__p&&__p();var d=h.DEFAULT_FORMAT;if(typeof c==="string")return c;else if(typeof c==="object"){var e=a.getTime(),f=l();for(var g=0;g<f.length;g++){var i=f[g],j=c[i.name];if(j!=null&&i.start<=e&&e<i.end)return j}b("FBLogger")("i18n-formatDate").blameToPreviousFile().warn('Matching period not found for date "%s", using default: %s',a.getTime(),d);return d}else{b("FBLogger")("i18n-formatDate").blameToPreviousFile().warn('Called with invalid format "%s" (type: %s) for date "%s", using default: %s',c,typeof c,a.getTime(),d);return d}}function l(){var a=new Date(),c=a.getTime(),d=a.getFullYear(),e=a.getMonth(),f=new Date(d,a.getMonth()+1,0).getDate(),g=new Date(d,1,29).getMonth()===1?366:365,h=1e3*60*60*24,i=new Date(a.setHours(0,0,0,0)),j=new Date(d,e,i.getDate()+1);a=a.getDate()-(a.getDay()-b("DateFormatConfig").weekStart+6)%7;var k=new Date(c).setDate(a);a=new Date(c).setDate(a+7);var l=new Date(d,e,1);e=new Date(d,e,f+1);var m=new Date(d,0,1);d=new Date(d+1,0,1);return[{name:"today",start:i.getTime(),end:j.getTime()},{name:"withinDay",start:c-h,end:c+h},{name:"yesterday",start:i.getTime()-h,end:i.getTime()-1},{name:"thisWeek",start:k,end:a},{name:"withinWeek",start:c-h*7,end:c+h*7},{name:"thisMonth",start:l.getTime(),end:e.getTime()},{name:"withinMonth",start:c-h*f,end:c+h*f},{name:"thisYear",start:m.getTime(),end:d.getTime()},{name:"withinYear",start:c-h*g,end:c+h*g},{name:"older",start:-Infinity,end:c},{name:"future",start:c,end:+Infinity},{name:"allOtherTimes",start:-Infinity,end:+Infinity}]}function m(a,c,d){c===void 0&&(c=null),d===void 0&&(d=null),b("Random").random()<b("CLDRDateRenderingClientRollout").formatDateClientLoggerSamplingRate&&new(b("IntlDateStringsTypedLogger"))().setDatetimeFormat(a).setLoggedFromClient(!0).setCldrKey(c).setCldrValue(d).log()}function n(){var a;a=(a=window)!=null?(a=a.location)!=null?a.pathname:a:a;return a&&a.startsWith("/intern")||!1}e.exports=h}),null);
__d("MessagingSourceEnum",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CHAT_ORCA:"source:chat:orca",CHAT_LIGHT_SPEED:"source:chat:light_speed",CHAT_IPHONE:"source:chat:iphone",CHAT_JABBER:"source:chat:jabber",CHAT_MEEBO:"source:chat:meebo",CHAT_WEB:"source:chat:web",CHAT_TEST:"source:chat:test",CHAT_FORWARD_DIALOG:"source:chat:forward",CHAT:"source:chat",CONTACT_ADD_MUTATION:"source:contact_add:graphql_mutation",CONTACT_ADD_CYMK:"source:contact_add:cymk_suggestion",CUSTOMER_CHAT_PLUGIN:"source:discovery:customer_chat_plugin",EMAIL:"source:email",EVENT_MESSAGE_BLAST:"source:event_message_blast",EVENT_TICKETING:"source:event_ticket",EVENT_REMINDERS:"source:event_reminders",FUNDRAISER_MESSAGE_BLAST:"source:fundraiser_message_blast",GENERIC_ADMIN_TEXT:"source:generic_admin_text",GIGABOXX_API:"source:gigaboxx:api",GIGABOXX_BLAST:"source:gigaboxx:blast",GIGABOXX_EMAIL_REPLY:"source:gigaboxx:emailreply",GIGABOXX_MOBILE:"source:gigaboxx:mobile",GIGABOXX_WAP:"source:gigaboxx:wap",GIGABOXX_WEB:"source:gigaboxx:web",INVITE:"source:invite",LEIA:"source:leia",MESSENGER_WEB:"source:messenger:web",MESSENGER_WEB_SEARCH:"source:messenger:web_search",SAM_UFI:"source:sam:ufi",SHARE_DIALOG:"source:share:dialog",SEND_PLUGIN:"source:sendplugin",SMS:"source:sms",TEST:"source:test",TITAN_WAP:"source:titan:wap",TITAN_M_BASIC:"source:titan:m_basic",TITAN_M_FREE:"source:titan:m_free_basic",TITAN_M_JAPAN:"source:titan:m_japan",TITAN_M_MINI:"source:titan:m_mini",TITAN_M_TOUCH:"source:titan:m_touch",TITAN_M_APP:"source:titan:m_app",TITAN_M_TABLET:"source:titan:m_tablet",TITAN_M_ZERO:"source:titan:m_zero",TITAN_M_TALK:"source:titan:m_talk",TITAN_WEB:"source:titan:web",TITAN_FACEWEB_ANDROID:"source:titan:faceweb_android",TITAN_FACEWEB_BUFFY:"source:titan:faceweb_buffy",TITAN_FACEWEB_IPAD:"source:titan:faceweb_ipad",TITAN_FACEWEB_IPHONE:"source:titan:faceweb_iphone",TITAN_FACEWEB_UNKNOWN:"source:titan:faceweb_unknown",TITAN_API:"source:titan:api",TITAN_API_MOBILE:"source:titan:api_mobile",TITAN_ORCA:"source:titan:orca",TITAN_EMAIL_REPLY:"source:titan:emailreply",MOBILE:"source:mobile",PAGE_PLATFORM_API:"source:page_platform_api",PAGE_UNIFIED_INBOX:"source:page_unified_inbox",WHATSAPP_CALLBACK:"source:wa_callback",UNKNOWN:"source:unknown",WEB:"source:web",HELPCENTER:"source:helpcenter",NEW_SHARE_DIALOG:"source:share:dialog:new",PAID_PROMOTION:"source:paid_promotion",BUFFY_SMS:"source:buffy:sms",WEBRTC_MOBILE:"source:webrtc:mobile",MESSENGER_COMMERCE:"source:messenger:commerce",MESSENGER_BOT:"source:bot",MESSENGER_EMPLOYEE_ONLY_BOT:"source:bot:employee_only",MESSENGER_OMNIM:"source:messenger:omnim",PAGES_PRIVATE_REPLY:"source:pages:private_reply",MESSENGER_FORWARD_DIALOG:"source:messenger:forward",MESSENGER_AD:"source:messenger:ad",MARKETPLACE:"source:marketplace",MARKETPLACE_BOT:"source:marketplace:bot",MESSENGER_LEAD_GEN:"source:messenger:lead_gen",PAGES_MESSAGE_SHORTLINK:"source:pages:message_shortlink",STICKER_SUBSCRIBE:"source:messenger:sticker_subscribe",PHOTO_TAG:"source:messenger:photo_tag",INTERNAL_TEST_INBOX:"source:internal:test_inbox",INTERNAL_TEST_PENDING:"source:internal:test_pending",INTERNAL_TEST_OTHER:"source:internal:test_other",INTERNAL_TEST_ML_ONLY:"source:internal:test_ml_only",JOB_SEARCH_APPLICATION:"source:job_search:application",MESSENGER_JOINABLE_LINK:"source:messenger:joinable_link",MESSENGER_ADD_WITH_APPROVAL:"source:messenger:add_with_approval",MESSENGER_SMS_BRIDGE_CONVERT:"source:messenger:sms_bridge_conversion",TINCAN_ORCA:"source:tincan:orca",TINCAN_IOS:"source:tincan:ios",TINCAN_UNKNOWN:"source:tincan:unknown",FACEBOOK_GROUPS_CHANNELS:"source:groups:channels",GROUP_COMMERCE:"source:group_commerce",INTERNAL_TOOL:"source:internal:tool",PAGES_PLATFORM:"source:pages:platform",PAGES_RECOMMENDATION:"source:pages:recommendation",PAGES_ORDER_MANAGEMENT:"source:pages:order_management",PAGE_AUTO_RESPONSE:"source:pages:auto_response",PAGES_INVITE:"source:pages:invite",PAGES_CHAT_EXTENSION:"source:pages:chat_extension",PAGES_COMPOSER:"source:pages:composer",PTX:"source:ptx",SAVED_CHAT_EXTENSION:"source:saved:chat_extension",CREATOR_PAGE_INITIATE_TO_CREATOR_PAGE:"source:pages:creator_page_initiate_to_creator_page",LIVE_VIDEO_CHAT:"source:live_video_chat",GEMSTONE:"source:gemstone",WATCH_PARTY:"source:watch_party",WORK_ACTIVATION_CARD_GENERAL_GROUP_CHAT:"source:work:activation_card_general_group_chat",SCHOOL_COMMUNITY:"source:school_community",SCHOOL_COMMUNITY_COURSE:"source:school_community_course",BELL_RESEARCH:"source:bell_research",BELL_MESSENGER_LINKED:"source:bell_messenger_linked",BELL_MESSENGER_UNLINKED:"source:bell_messenger_unlinked",BELL_MESSENGER_ONBOARD:"source:bell_messenger_onboard",PROFILE_MEET_NEW_FRIENDS:"source:profile_meet_new_friends",PROFILE_MEET_NEW_FRIENDS_REPLY:"source:profile_meet_new_friends_reply",FRIENDING_ADMIN_BUMP:"source:messenger_growth:friending_admin_bump",NEW_MESSENGER_USER_ADMIN_BUMP:"source:messenger_growth:new_messenger_user_admin_bump",EVENT_UPCOMING_BUMP:"source:messenger_growth:event_upcoming_bump",PHOTO_TAG_BUMP:"source:messenger_growth:photo_tag_bump",WALL_POST_BUMP:"source:messenger_growth:wall_post_bump",FRIENDVERSARY_BUMP:"source:messenger_growth:friendversary_bump",CUSTOMIZATION_UPSELL_BUMP:"source:messenger_growth:customization_upsell_bump",MESSENGER_BROADCASTFLOW:"source:messenger:broadcastflow",PAGE_COMMENT_MSG:"source:pages:question_triggered_convo",COMMENT_PIVOT:"source:messenger_growth:comment_pivot",PAGE_HOVERCARD:"source:pages:hovercard",INSTANT_GAMES_GAME_UPDATE:"source:instant_games_game_updates",INSTANT_GAMES_MATCH_MAKING:"source:instant_games_match_making",INSTANT_GAMES_GROUP_CREATION:"source:instant_games_group_creation",MOBILE_GAME_SHARE:"source:games_app:mobile_game_share",PAGE_EMAIL_REPLY:"source:pages:email_reply",PAGE_HOME_PAGE_PANEL:"source:page_home_page_panel",GROUPSYNC_MESSENGER_GROUP_CREATE:"source:groupsync:messenger_group_create",GROUPSYNC_SYNC_FROM_FB:"source:groupsync:sync_from_fb",GROUPSYNC_NAMING:"source:groupsync:naming",GROUPSYNC_THREAD_INFO_SYNC_FROM_FB:"source:groupsync:thread_info_sync",WORK_GROUP_SYNCED_CHAT_CREATION:"source:work:groupchat:creation",WORK_DEFAULT_GROUP_SYNCED_CHAT_CREATION:"source:work:defaultgroupchat:creation",WORK_GROUP_SYNCED_CHAT_MEMBER_SYNC:"source:work:groupchat:member_sync",WORK_GROUP_SYNCED_CHAT_DESCRIPTION_SYNC:"source:work:groupchat:description_sync",WORK_GROUP_SYNCED_CHAT_NAME_SYNC:"source:work:groupchat:name_sync",PAGE_PQI_MESSAGE:"source:pages:pqi_message",PAGE_PLUGIN_MESSAGE:"source:pages:page_plugin_message",WORKPLACE_CHAT_DESKTOP:"source:workchat:desktop",CREATOR_STUDIO:"source:creator_studio",FB_GROUP_ADMINSHIP_SYNC:"source:fbgroup:adminship_sync",FB_GROUP_CHAT_MUTE_MEMBER:"source:fbgroup:mute_member",MESSENGER_ADS_PARTIAL_AUTOMATED_REMINDER:"source:ads_partial_automated:reminder",MENTORSHIP:"source:mentorship",MENTORSHIP_DISCUSSION_TOPIC:"source:mentorship_discussion_topic",VOD_CONVERSATION:"source:vod_conversation",LOCAL_SEARCH_SERVICES:"source:local_search_services",YOUTH_VAULT:"source:youth_vault",MESSENGER_KIDS:"source:messenger_kids",STORY_REPLY:"source:story_reply"})}),null);