if (self.CavalryLogger) { CavalryLogger.start_js(["eCmAu"]); }

__d("AppUseTrackerLogger",["AsyncRequest","PageTransitions","Run","isInIframe","pageID"],(function(a,b,c,d,e,f){__p&&__p();function g(){g.instance||(g.instance=this);return g.instance}Object.assign(g,{setup:function(a,b,c,d,e,f){new g().init(a,b,c,d,e,f)}});Object.assign(g.prototype,{instance:null,endpoint:"/ajax/apps/usage_update.php",heartbeat_endpoint:"/ajax/apps/heartbeat.php",INITIAL_PING:0,ONGOING_PING:1,DISCOVERY_PING:2,ENDING_PING:3,_application_id:0,_is_game:0,_createRequest:function(a){return new(b("AsyncRequest"))().setURI(this.endpoint).setMethod("POST").setData({app:this._application_id,is_game:this._is_game,type:a,condition:this._signal_on_page_transition})},_createHeartbeatRequest:function(){return new(b("AsyncRequest"))().setURI(this.heartbeat_endpoint).setMethod("POST").setData({app:this._application_id,page_id:b("pageID")})},init:function(a,c,d,e,f,g){__p&&__p();var h=this;if(b("isInIframe")())return;this.cleanup();b("PageTransitions").registerHandler(this.catchPageTransition.bind(this));this._application_id=a;this._is_game=c;if(g){a=function(){return h._createHeartbeatRequest().send()};a();this._timers.push(setInterval(a,g))}this._timers.push(setTimeout(function(){this._createRequest(this.INITIAL_PING).send();var a=this._createRequest(this.ONGOING_PING);this._timers.push(setInterval(a.send.bind(a),e))}.bind(this),d));f&&this._timers.push(setTimeout(function(){this._createRequest(this.DISCOVERY_PING).send()}.bind(this),f));b("Run").onBeforeUnload(this.onBeforeUnload.bind(this))},catchPageTransition:function(a){this._createRequest(this.ENDING_PING).send(),this.cleanup()},onBeforeUnload:function(){this._createRequest(this.ENDING_PING).send(),this.cleanup()},cleanup:function(){if(this._timers)for(var a=0;a<this._timers.length;a++)clearInterval(this._timers[a]);this._timers=[]}});e.exports=g}),null);
__d("CanvasRHCHeightController.react",["DOMQuery","React"],(function(a,b,c,d,e,f){__p&&__p();a=b("React").PropTypes;c=function(a){"use strict";__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){var a=b("DOMQuery").find(document,"#contentArea"),c=0;this.props.rhc.scrollHeight<a.scrollHeight&&(c=a.scrollHeight-this.props.rhc.scrollHeight);a={height:c+"px"};return b("React").createElement("div",{style:a})};return c}(b("React").Component);c.propTypes={rhc:a.object};e.exports=c}),null);
__d("ReadToggle.react",["cx","Event","Keys","React","emptyFunction","joinClasses"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=b("React").PropTypes;c=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){var c,d;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(c=d=a.call.apply(a,[this].concat(f))||this,d.$2=function(a){b("Event").getKeyCode(a)===b("Keys").RETURN&&d.props.onClick()},c)||babelHelpers.assertThisInitialized(d)}var d=c.prototype;d.render=function(){if(this.props.isRead)return b("React").createElement("div",{"aria-label":this.props.readLabel,className:this.$1(),"data-hover":"tooltip","data-testid":this.props.testid,"data-tooltip-alignh":"center","data-tooltip-content":this.props.readLabel,onClick:this.props.onClick,onKeyDown:this.$2,role:"button",tabIndex:0});else return b("React").createElement("div",{"aria-label":this.props.unreadLabel,className:this.$1(),"data-hover":"tooltip","data-testid":this.props.testid,"data-tooltip-alignh":"center","data-tooltip-content":this.props.unreadLabel,onClick:this.props.onClick,onKeyDown:this.$2,role:"button",tabIndex:"0"})};d.$1=function(){return b("joinClasses")(this.props.className,(this.props.isRead?"":"_5c9q")+(this.props.isRead?" _5c9_":""))};return c}(b("React").Component);c.propTypes={isRead:a.bool.isRequired,onClick:a.func.isRequired,readLabel:a.node.isRequired,unreadLabel:a.node.isRequired};c.defaultProps={onClick:b("emptyFunction")};e.exports=c}),null);
__d("XGamerGraphMarkUserPlaysFBAppController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/gamer-graph/mark-user-plays-fb-app/",{})}),null);
__d("GamerGraphMarkUserPlaysFBApp",["AsyncRequest","XGamerGraphMarkUserPlaysFBAppController"],(function(a,b,c,d,e,f){"use strict";e.exports.mark=function(a){var c=b("XGamerGraphMarkUserPlaysFBAppController").getURIBuilder().getURI();new(b("AsyncRequest"))().setURI(c).setData({app_id:a}).send()}}),null);
__d("GiftCredits",["AsyncRequest","Dialog","URI"],(function(a,b,c,d,e,f){__p&&__p();var g={dialog:null,callback:null,purchaseLock:!1,purchaseLockExpiryThreshold:5e3,purchaseLockTimeoutId:null,getPurchaseCreditPrompt:function(a,b,c,d){g.main(a,null,null,null,c,null,null,null,"BuyCredits",{},d)},redeemGiftcard:function(a,c,d){var e=new(b("URI"))(document.location).setPath("/giftcards").toString();g.main(a,null,null,e,null,null,null,null,c,{},d)},getPrompt:function(a,b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){g.main(a,b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y)},main:function(a,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){if(g.isPurchaseLocked())return!1;g.setPurchaseLock(!0);h={_path:"pay",method:"pay",display:"async",app_id:a,receiver:c,api_key:i,credits_purchase:p,action:k,next:e,dev_purchase_params:JSON.stringify(l),additional_params:JSON.stringify(m),order_info:JSON.stringify(d),product:n,package_id:o,request_id:q,sdk:r,quantity:s,quantity_min:t,quantity_max:u,test_currency:v,pricepoint_id:w,user:x,user_hash:y,ingame_gift_data:z};j=new(b("AsyncRequest"))().setURI("/fbml/ajax/dialog/").setData(h).setMethod("GET").setReadOnly(!0).setStatusElement("commerce_get_more_loading");g.callback=f;g.dialog=new(b("Dialog"))().setAsync(j).setModal(!0).setCloseHandler(function(a){g.setPurchaseLock(!1),f(a)}).show()},isPurchaseLocked:function(){return g.purchaseLock},setPurchaseLock:function(a){g.purchaseLock=a;a?g.purchaseLockTimeoutId=setTimeout(function(){g.setPurchaseLock(!1)},g.purchaseLockExpiryThreshold):clearTimeout(g.purchaseLockTimeoutId);return!0}};e.exports=g}),null);
__d("legacy:giftcredits",["GiftCredits"],(function(a,b,c,d,e,f){a.GiftCredits=b("GiftCredits")}),3);
__d("TimePlayingEnum",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({FIVE_SECONDS:"five_seconds",TEN_SECONDS:"ten_seconds",THIRTY_SECONDS:"thirty_seconds",ONE_MINUTE:"one_minute",TWO_MINUTES:"two_minutes",FIVE_MINUTES:"five_minutes"})}),null);
__d("CanvasActivityLogger",["Banzai","Event","ScriptPath","TimePlayingEnum","Visibility","clickRefAction","getActiveElement","setIntervalAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();var g=1e3,h=!1,i=!1,j=!1,k=!1,l=null,m=null,n=null,o=0,p=0,q=0,r={5:b("TimePlayingEnum").FIVE_SECONDS,10:b("TimePlayingEnum").TEN_SECONDS,30:b("TimePlayingEnum").THIRTY_SECONDS,60:b("TimePlayingEnum").ONE_MINUTE,120:b("TimePlayingEnum").TWO_MINUTES,300:b("TimePlayingEnum").FIVE_MINUTES},s={CANVAS_ACTIVE:"active",CANVAS_INACTIVE:"inactive"},t=s.CANVAS_INACTIVE;function u(){return k&&j&&(h||i)}function v(){__p&&__p();if(t==s.CANVAS_ACTIVE&&!u()){t=s.CANVAS_INACTIVE;var a=Date.now()-m;b("ScriptPath").closeOverlayView("canvas",m?{ms_since_open:a}:null);p+=a;for(var c in r)if(Object.prototype.hasOwnProperty.call(r,c)&&p>c*g){var d=r[c];b("Banzai").post("canvas_playing_game",{played:d,app_id:q});delete r[c]}if(Date.now()-n>60*g){d=a+o;b("Banzai").post("canvas_time_spent",[d,q]);n=Date.now();o=0}else o=m?a+o:o}else t==s.CANVAS_INACTIVE&&u()&&(t=s.CANVAS_ACTIVE,m=Date.now(),n||(n=Date.now()),b("ScriptPath").openOverlayView("canvas"))}b("Banzai").subscribe(b("Banzai").SHUTDOWN,function(){u()&&b("ScriptPath").closeOverlayView("canvas",m?{ms_since_open:Date.now()-m}:null)});function w(a){__p&&__p();b("clickRefAction")("canvas",l,a,"FORCE").set_namespace("canvas");switch(a.type){case"beforeunload":k=!1;h=!1;i=!1;break;case"visible":k=!0;break;case"hidden":k=!1;break;case"mouseover":i=!0;break;case"mouseout":i=!1;break;case"focus":case"blur":h=b("getActiveElement")()==document.getElementById("iframe_canvas");break;default:break}v()}function x(a){var b=document.createEvent("FocusEvent");b.initEvent(a,!0,!0);return b}a={trackState:function(a,c){q=c,k=!b("Visibility").isHidden(),j=document.hasFocus(),h=b("getActiveElement")()==document.getElementById("iframe_canvas"),i=a.querySelector(":hover")!==null,v(),b("Event").listen(a,"mouseover",w),b("Event").listen(a,"mouseout",w),b("Event").listen(window,"blur",w),b("Event").listen(window,"focus",w),b("Event").listen(window,"beforeunload",w),b("Visibility").addListener("hidden",function(){return w(x("hidden"))}),b("Visibility").addListener("visible",function(){return w(x("visible"))}),b("setIntervalAcrossTransitions")(function(){j=document.hasFocus(),v()},g)}};e.exports=a}),null);
__d("CanvasResizer",["CSS","DOMEventListener","Vector","createArrayFromMixed"],(function(a,b,c,d,e,f){__p&&__p();var g;function h(){__p&&__p();var a,c=document.documentElement;window.innerHeight?a=window.innerHeight:c&&c.clientHeight?a=c.clientHeight:a=document.body.clientHeight;for(var c=0;c<g.length;c++){var d=g[c];if(!b("CSS").hasClass(d,"noresize")){var e=b("Vector").getElementPosition(d,"document").y;e=a-e;d.style.height=e/(g.length-c)+"px"}}}b("DOMEventListener").add(window,"resize",h);a={smartSizingFrameAdded:function(){g=[];var a=b("createArrayFromMixed")(document.getElementsByTagName("iframe"));a.forEach(function(a){b("CSS").hasClass(a,"smart_sizing_iframe")&&!b("CSS").hasClass(a,"noresize")&&(b("CSS").removeClass(a,"canvas_iframe_util"),g.push(a))});h()}};e.exports=a}),null);
__d("URLSearchParams",[],(function(a,b,c,d,e,f){__p&&__p();var g=/\+/g,h=/[!\'()*]/g,i=/%20/g;function j(a){return encodeURIComponent(a).replace(i,"+").replace(h,function(a){return"%"+a.charCodeAt(0).toString(16)})}function k(a){return decodeURIComponent(a).replace(g," ")}var l=typeof Symbol==="function"?Symbol.iterator:"@@iterator";a=function(){"use strict";__p&&__p();function a(a){a===void 0&&(a="");a=a;a[0]==="?"&&(a=a.substr(1));this.$1=a.length?a.split("&").map(function(a){a=a.split("=");var b=a[0];a=a[1];return[k(b),k(a)]}):[]}var b=a.prototype;b.append=function(a,b){this.$1.push([a,String(b)])};b["delete"]=function(a){for(var b=0;b<this.$1.length;b++)this.$1[b][0]===a&&(this.$1.splice(b,1),b--)};b.entries=function(){return this.$1[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()};b.get=function(a){for(var b=0,c=this.$1.length;b<c;b++)if(this.$1[b][0]===a)return this.$1[b][1];return null};b.getAll=function(a){var b=[];for(var c=0,d=this.$1.length;c<d;c++)this.$1[c][0]===a&&b.push(this.$1[c][1]);return b};b.has=function(a){for(var b=0,c=this.$1.length;b<c;b++)if(this.$1[b][0]===a)return!0;return!1};b.keys=function(){var a=this.$1.map(function(a){var b=a[0];a[1];return b});return a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()};b.set=function(a,b){var c=!1;for(var d=0;d<this.$1.length;d++)this.$1[d][0]===a&&(c?(this.$1.splice(d,1),d--):(this.$1[d][1]=String(b),c=!0));c||this.$1.push([a,String(b)])};b.toString=function(){return this.$1.map(function(a){var b=a[0];a=a[1];return j(b)+"="+j(a)}).join("&")};b.values=function(){var a=this.$1.map(function(a){a[0];a=a[1];return a});return a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()};b[l]=function(){return this.entries()};return a}();e.exports=a}),null);
__d("XGroupsInviteController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/a/group/user/invite/",{group_id:{type:"Int"},invite_response:{type:"Enum",enumType:1},invite_type:{type:"Enum",enumType:1},is_new_user:{type:"Bool",defaultValue:!1},ref_source:{type:"Enum",enumType:1},prevent_future_invites:{type:"Bool",defaultValue:!1},target_id_for_ego_logging:{type:"Int"}})}),null);