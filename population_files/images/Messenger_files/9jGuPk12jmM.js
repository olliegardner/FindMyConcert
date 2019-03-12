if (self.CavalryLogger) { CavalryLogger.start_js(["sZbz+"]); }

__d("PYMKFriendingAction",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({IMPRESSION:"impression",MAKE:"make",ACCEPT:"accept",MAKE_BLOCK:"make_block",MAKE_ERROR:"make_error",MAKE_WARN:"make_warn",ACCEPT_ERROR:"accept_error",REJECT:"reject",REJECT_ERROR:"reject_error",HIDE:"hide",HIDE_ERROR:"hide_error",CANCEL:"cancel",CANCEL_ERROR:"cancel_error",MARK_SPAM:"mark_spam",MARK_SPAM_ERROR:"mark_spam_error",UNMARK_SPAM:"unmark_spam",UNMARK_SPAM_ERROR:"unmark_spam_error"})}),null);
__d("XPymkFunnelLoggingController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/pymk/funnel_logging/",{event_ts:{type:"Int",required:!0},query_id:{type:"Int"},candidate_id:{type:"Int"},signature:{type:"Int"},loc:{type:"String",required:!0},ref:{type:"String"},action:{type:"Enum",required:!0,enumType:1}})}),null);
__d("PymkFunnelLogger",["AsyncRequest","DOMQuery","PYMKFriendingAction","XPymkFunnelLoggingController"],(function(a,b,c,d,e,f){__p&&__p();a={setupListeners:function(a,b,c,d,e){this._setupForSingleElement(a,b,c,"add"),this._setupForSingleElement(a,b,d,"click"),this._setupForSingleElement(a,b,e,"click")},logImpression:function(a,c,d){this._logEvent(a,b("PYMKFriendingAction").IMPRESSION,c,d)},logXOut:function(a,b,c){this._logEvent(a,"hide",b,c)},_logEvent:function(a,c,d,e){a=b("XPymkFunnelLoggingController").getURIBuilder().setInt("candidate_id",a).setInt("signature",d).setInt("event_ts",Math.floor(Date.now()/1e3)).setEnum("action",c).setString("loc",e).getURI();new(b("AsyncRequest"))(a).setMethod("POST").send()},_setupForSingleElement:function(a,c,d,e){Event.listen(d,"click",function(d){d=a.getAttribute("data-signature");var f=b("DOMQuery").find(a,"input.friendBrowserID");f=parseInt(f.value,10);this._logEvent(f,e,d,c)}.bind(this))}};e.exports=a}),null);
__d("FriendRequestHowFound",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({OTHER:"friend_other",INVITATION:"friend_invitation",CONTACT_IMPORTER:"friend_finder",CONTACT_IMPORTER_NUX:"friend_finder_nux",CONTACT_IMPORTER_READ:"friend_finder_read",CONTACT_IMPORTER_UPLOAD:"friend_finder_upload",CONTACT_IMPORTER_KAIOS:"contact_importer_kaios",WIZARD_CLASSMATES_COWORKERS:"wizard_classmates_coworkers",SUGGESTION:"friend_suggestion",AIM_IMPORTER:"aim_importer",SEARCH:"search",PYMK:"people_you_may_know",PYMK_SIDESHOW:"pymk_sideshow",CLASSMATE_SEARCH:"classmate_search",COWORKER_SEARCH:"coworker_search",NEWSFEED:"newsfeed",HOVERCARD:"hovercard",HOVERCARD_PYMK:"hovercard_pymk",JAPAN_MOBILE_INVITE:"japan_mobile_invite",TWITTER_IMPORTER:"twitter_importer",JOB_CONNECT_SEARCH:"job_connect_search",WIZARD_IMPORTERS:"wizard_importers",FRIEND_BROWSER:"friend_browser",PROFILE_BUTTON:"profile_button",ADD_FRIEND_PROTILE_BUTTON:"add_friend_protile_button",SGM:"sgm",EXTERNAL_CONVERT:"external_convert",PAIR_SEARCH:"pair_search",MERGE:"merge",PROFILE_BROWSER:"profile_browser",FAMILY_REQUEST:"family_request",FAMILY_SUGGEST:"family_suggest",API:"api",MSITE:"friend_msite",PARENT_KID:"parent_kid",PHOTO_TAG:"photo_tag",FRIENDSHAKE:"friendshake",PROFILE_FRIENDS_BOX:"friends_box",BROWSE:"browse",UFI_COMMENT:"comment",GROUP_MEMBERS:"group_members",GROUPS_MEMBER_PROFILE:"groups_member_profile",CRISIS:"crisis",TICKER:"ticker",NETEGO_PYMK:"netego_pymk",FEED_PYMK:"feed_pymk",FEED_FRIENDABLE_HEADER:"feed_friendable_header",PYMK_MEGAPHONE:"pymk_megaphone",FRIEND_BROWSER_WELCOME_DASH:"friend_browser_wd",FRIEND_BROWSER_FIND_FRIENDS:"friend_browser_ff",FRIEND_BROWSER_SEARCH:"friend_browser_s",ESCAPE_HATCH:"escape_hatch",EMAIL:"email",TIMELINE_UNIT:"timeline_unit",PROFILE_FRIENDS_TAB:"profile_friends",TIMELINE_FRIENDS_PAGELET:"timeline_friends_pagelet",TIMELINE_FRIENDS_COLLECTION:"timeline_friends_collection",MY_QR_CODE:"my_qr_code",QRCODE_ACTIONSHEET:"qrcode_actionsheet",ADDFRIEND_DOT_PHP:"addfriend",SMS:"sms",TEST:"test",WIZARD_SEARCH:"wizard_search",WIZARD_SEARCH_PYMK:"wizard_search_pymk",FRIEND_BROWSER_NUX:"friend_browser_nux",INTERN_PROFILE:"intern_profile",CONTACT_CARD:"contact_card",MESSAGE:"message",TIMELINE_PYMK:"timeline_pymk",TIMELINE_COLLECTIONS_PYMK:"timeline_collections_pymk",PROFILE_SHARE:"profile_share",PYMK_FRIENDS_TAB:"pymk_friends_tab",RECENT_FRIENDSHIPS_MEGAPHONE:"recent_friendships_megaphone",REMINDERS:"reminders",PYMK_MEGAPHONE_SCALABLE_EF:"pymk_megaphone_scalable_ef",PYMK_STICKY_MEGAPHONE_EF:"pymk_sticky_megaphone_ef",SEARCH_CHAINED_PYMK:"search_chained_pymk",CALL_LOG:"call_log",VERTEX:"vertex",REQS_MAIN_PYMK:"requests_page_pymk",PYMK_EXPERIMENT_MEGAPHONE_EF:"pymk_experiment_megaphone_ef",API_CONTACTS_UPLOAD:"api_contacts_upload",CI_BACKGROUND:"ci_bkg",CI_CONTINUOUS:"ci_continuous",MEDLEY:"medley",CI_SOFTMATCH_PYMK:"ci_softmatch_pymk",WEB_SEARCH:"web_search",KEYWORD_SEARCH:"keyword_search",EVENT_GYMK:"event_gymk",FRIEND_CENTER_SEARCH:"friend_center_search",CONTACTS_PEOPLE:"contacts_people",FRIEND_CENTER_OUTGOING_REQ:"friend_center_outgoing_req",SHORTCUT:"shortcut",FRIEND_CENTER_FRIENDS:"friend_center_friends",FRIEND_CENTER_REQUESTS:"friend_center_requests",CI_PYMK:"ci_pymk",CI_PYMK_NUX:"ci_pymk_nux",CI_PYMK_READ:"ci_pymk_read",CI_PYMK_UPLOAD:"ci_pymk_upload",FRIENDING_CARD:"friending_card",DATA_CLEANUP:"data_cleanup",PROFILE_BROWSER_EVENTS:"profile_browser_events",ENTITY_CARDS:"entity_cards",CI_FRIENDS_SUGGESTION:"ci_friends_suggestion",FRIENDING_RADAR:"friending_radar",FRIEND_LIST_PROFILE:"friend_list_profile",NEARBY_FRIENDS:"nearby_friends",NETEGO_SUGGEST_GROUP_FRIENDS:"netego_suggest_group_friends",DISCOVER_FEED:"discover_feed",MEMORIAL_CONTACT_TOOLS:"memorial_contact_tools",REQUESTS_JEWEL:"requests_jewel",GROUP_MEMBER_LIST:"group_member_list",GROUP_COMMERCE:"group_commerce",CONTACT_SUGGEST_FRIEND:"contact_suggest_friend",NETEGO_FRIEND_REQUESTS:"netego_friend_requests",WELCOME_FEED_OUTGOING_UNIT:"welcome_feed_outgoing_unit",INVITE_MERGE:"merge_via_invite",INVITE_MATCH:"invite_existing_user",IORG_TOPUP:"iorg_topup",RUN_OLD_PATH:"run_old_path",PYMK_TIMELINE_CHAIN:"pymk_timeline_chain",PYMK_PUSH_NOTIF:"pymk_push_notif",INSTAGRAM_CONTACT_IMPORTER:"instagram_contact_importer",PROFILE_INTENT_BANNER:"profile_discovery_intent_banner",PROFILE_DISCOVERY_LIST:"profile_discovery_list",PIYS:"people_in_your_school",GROUP_MEMBER_BIO_DIALOG:"group_member_bio_dialog",PYMK_UPSELL:"pymk_upsell",EMPTY_FEED:"empty_feed",FEED_CONTEXT:"feed_context",CONTEXTUAL_PROFILE_HEADER:"contextual_profile_header",PROFILE_CHANNEL_FOLLOWERS:"profile_channel_followers",PYMK_FALLBACK:"pymk_fallback",GROUPS_MEMBER_LIST:"groups_member_list",PROFILE_INTRODUCTION:"profile_introduction",QUICK_FRIENDING:"quick_friending",REACTION_PIVOTS:"reaction_pivots",FRIENDING_CHECKUP_IG:"friending_checkup_ig",FRIENDING_CHECKUP_POSTS:"friending_checkup_posts",FRIENDING_CHECKUP_EVENTS:"friending_checkup_events",FRIENDING_CHECKUP_MESSENGER:"friending_checkup_messenger",MESSENGER_THREADVIEW_BANNER:"messenger_threadview_banner",FRIENDING_TAB_UPSELL:"friending_tab_upsell",NULLSTATE_SEARCH_PYMK_UPSELL:"nullstate_search_pymk_upsell"})}),null);
__d("WebFriendingRequests",["Arbiter","DOM","Event","FriendRequestHowFound","FriendRequestIHEventLogger","MarauderLogger","PymkFunnelLogger","Vector","debounceCore"],(function(a,b,c,d,e,f){__p&&__p();a={init:function(a,c){__p&&__p();this._pymkBox=a;this._lastPymkSeen=-1;this._recordPYMKImpression();b("Event").listen(window,"scroll",b("debounceCore")(this._recordPYMKImpression.bind(this),100));b("Event").listen(window,"resize",b("debounceCore")(this._recordPYMKImpression.bind(this),100));b("Arbiter").subscribe("pymk-x-out",this._handleXout.bind(this));this._requestsBox=c;if(!this._requestsBox)return;this._lastRequestSeen=-1;this._recordFriendRequestImpression();b("Event").listen(window,"scroll",b("debounceCore")(this._recordFriendRequestImpression.bind(this),100));b("Event").listen(window,"resize",b("debounceCore")(this._recordFriendRequestImpression.bind(this),100))},_recordPYMKImpression:function(){__p&&__p();var a=b("DOM").scry(this._pymkBox,"li.friendBrowserListUnit"),c=b("Vector").getViewportDimensions().y,d=a.length-1;while(d>this._lastPymkSeen){var e=b("Vector").getElementPosition(a[d],"viewport").y;if(e>0&&e+b("Vector").getElementDimensions(a[d]).y<=c)break;d-=1}e=d;while(d>this._lastPymkSeen)this.logPYMKImpression(a[d],"friends_center"),d-=1;this._lastPymkSeen=Math.max(this._lastPymkSeen,e)},_recordFriendRequestImpression:function(){__p&&__p();var a=b("DOM").scry(this._requestsBox,"div.friendRequestItem"),c=b("Vector").getViewportDimensions().y,d=a.length-1;while(d>this._lastRequestSeen){var e=b("Vector").getElementPosition(a[d],"viewport").y;if(e>0&&e+b("Vector").getElementDimensions(a[d]).y<=c)break;d-=1}e=d;while(d>this._lastRequestSeen){c=a[d].getAttribute("data-id");var f={request_id:c,request_location:b("FriendRequestHowFound").FRIEND_CENTER_REQUESTS};b("MarauderLogger").log("request_seen","friend_request_waterfall",f);b("FriendRequestIHEventLogger").logImpression(c);d-=1}this._lastRequestSeen=Math.max(this._lastRequestSeen,e)},_handleXout:function(){this._lastPymkSeen=Math.max(this._lastPymkSeen-1,-1),this._recordPYMKImpression()},logPYMKImpression:function(a,c){var d=b("DOM").find(a,"input.friendBrowserID");d=parseInt(d.value,10);a=parseInt(a.getAttribute("data-signature"),10);b("PymkFunnelLogger").logImpression(d,a,c)}};e.exports=a}),null);
__d("WaterfallMessageLifetimeTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:WaterfallMessageLifetimeLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:WaterfallMessageLifetimeLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:WaterfallMessageLifetimeLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setAttemptID=function(a){this.$1.attempt_id=a;return this};c.setDestService=function(a){this.$1.dest_service=a;return this};c.setDeviceID=function(a){this.$1.device_id=a;return this};c.setEventType=function(a){this.$1.event_type=a;return this};c.setIsBatch=function(a){this.$1.is_batch=a;return this};c.setIsGroup=function(a){this.$1.is_group=a;return this};c.setMessageID=function(a){this.$1.message_id=a;return this};c.setOfflineThreadingID=function(a){this.$1.offline_threading_id=a;return this};c.setPageID=function(a){this.$1.page_id=a;return this};c.setPushNotifID=function(a){this.$1.push_notif_id=a;return this};c.setReceiptID=function(a){this.$1.receipt_id=a;return this};c.setSenderID=function(a){this.$1.sender_id=a;return this};c.setServiceName=function(a){this.$1.service_name=a;return this};c.setSrcService=function(a){this.$1.src_service=a;return this};c.setThreadID=function(a){this.$1.thread_id=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setTimeStamp=function(a){this.$1.time_stamp=a;return this};c.setTopic=function(a){this.$1.topic=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={attempt_id:!0,dest_service:!0,device_id:!0,event_type:!0,is_batch:!0,is_group:!0,message_id:!0,offline_threading_id:!0,page_id:!0,push_notif_id:!0,receipt_id:!0,sender_id:!0,service_name:!0,src_service:!0,thread_id:!0,time:!0,time_stamp:!0,topic:!0,weight:!0};e.exports=a}),null);
__d("MercuryRealTimeEnvironmentDropDown",["Arbiter","Bootloader","FBLogger","MessengerMQTTGating"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g={token:null,init:function(){g.token=b("Arbiter").subscribe("mqtt-websocket-connection-died",g.handleConnectionDied)},handleConnectionDied:function(){if(!g.token||!b("MessengerMQTTGating").isEnabled())return;g.token&&(b("Arbiter").unsubscribe(g.token),g.token=null);g.dropDownToChannel()},dropDownToChannel:function(){b("MessengerMQTTGating").turnOff(),b("Bootloader").loadModules(["ChannelManager"],function(a){a.startChannelManager(),b("Arbiter").inform("messenger-mqtt-drop-down-to-channel")},"MercuryRealTimeEnvironmentDropDown"),b("FBLogger")("messenger_web_mqtt").warn("drop down to channel")}};e.exports=g}),null);
__d("MercurySyncResnapshot",["Promise","Bootloader","MercurySingletonProvider"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(a){this.$2=a}a.getForFBID=function(a){return g.getForFBID(a)};a.get=function(){return g.get()};var c=a.prototype;c.resnapshot=function(){var a=this;this.$1||(this.$1=new(b("Promise"))(function(c,d){b("Bootloader").loadModules(["MercurySyncDeltaHandler"],function(b){b.getForFBID(a.$2).emergencyDFF(function(b){c(b),a.$1=null},function(){d(),a.$1=null})},"MercurySyncResnapshot")}));return this.$1};return a}();var g=new(b("MercurySingletonProvider"))(a);e.exports=a}),null);
__d("IrisSubscribeChecker",["MqttLogger","clearTimeout","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1=b("MqttLogger").getInstance(),this.$2=null,this.$3=!1,this.$4=!1,this.$5=!1}var c=a.prototype;c.onConnectAttempt=function(){};c.onConnectFailure=function(){};c.onConnected=function(){var a=this;this.$6();this.$3=!1;this.$4=!1;this.$5=!1;this.$2=b("setTimeoutAcrossTransitions")(function(){a.$7()},8e3)};c.onConnectSuccess=function(){};c.onConnectionLost=function(){this.$6()};c.onSubscribe=function(a){a==="/t_ms"&&(this.$3=!0)};c.onUnsubscribe=function(a){};c.onPublish=function(a){(a==="/messenger_sync_get_diffs"||a==="/messenger_sync_create_queue")&&(this.$4=!0,this.$3&&(this.$5=!0,this.$6()))};c.onMessage=function(a){};c.$6=function(){this.$2!==null&&(b("clearTimeout")(this.$2),this.$2=null)};c.$7=function(){var a=window.location.hostname;a=a.replace(/\./g,"-");this.$3===!1&&(this.$1.bumpCounter(a+".no_iris_topic_subscribe"),this.$1.debugTrace("irisSubscribeChecker","iris topic not subscribed"));this.$4===!1&&(this.$1.bumpCounter(a+".no_iris_session"),this.$1.debugTrace("irisSubscribeChecker","iris session not subscribed"));this.$3===!0&&this.$4===!0&&this.$5===!1&&(this.$1.bumpCounter(a+".session_before_topic_subscribe"),this.$1.debugTrace("irisSubscribeChecker","iris session subscribed before topic subscribe"))};return a}();e.exports=a}),null);
__d("MqttWaterfallLogger",["WaterfallMessageLifetimeTypedLogger","gkx"],(function(a,b,c,d,e,f){"use strict";a={logNewMessageToWaterfall:function(a){var c=a.senderID,d=a.receiptID,e=a.messageID,f=a.offlineThreadingID,g=a.threadID,h=a.irisSeqId;a=a.isGroup;if(!b("gkx")("832242"))return;new(b("WaterfallMessageLifetimeTypedLogger"))().setEventType("message_receive_ws").setSrcService("mqtt").setDestService("webclient").setSenderID(c).setReceiptID(d).setMessageID(e).setOfflineThreadingID(f).setThreadID(g).setIsGroup(a?1:0).addToExtraData("sync_seq_id",h).log()}};e.exports=a}),null);
__d("exponentialBackoff",["Random","clearTimeout","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();function a(a,c){__p&&__p();c===void 0&&(c=null);var d=null,e=0;function f(){__p&&__p();for(var f=arguments.length,g=new Array(f),h=0;h<f;h++)g[h]=arguments[h];var i=function(){a.apply(c,g)};if(e===0)i();else if(d===null){var j=Math.pow(2,Math.min(e,6))*(1e3+b("Random").random()*200);d=b("setTimeoutAcrossTransitions")(function(){i(),d=null},j)}e++}f.reset=function(){e=0,d!=null&&(b("clearTimeout")(d),d=null)};f.isPending=function(){return d!=null};return f}e.exports=a}),null);
__d("MessageEventStream",["Int64","IrisSubscribeChecker","MercurySingletonProvider","MqttLogger","MqttWaterfallLogger","exponentialBackoff","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();a.getForFBID=function(a){return g.getForFBID(a)};function a(a){var c=this;this.connectToIris=function(a){a===void 0&&(a=null),a!==null&&(c.$4=b("Int64").fromString(a)),c.$9=!0,c.$16()};this.$2="Disconnected";this.$1=a;this.$3=[];this.$6=b("MqttLogger").getInstance();this.$12=new(b("exponentialBackoff"))(this.connectToIris,this);this.$11=new(b("IrisSubscribeChecker"))()}var c=a.prototype;c.init=function(a,c,d,e){__p&&__p();var f=this;if(!c&&!e)return this;this.$10=a;this.$10.addHook(this.$11);this.$9=!0;this.$4=c?b("Int64").fromString(c):null;this.$7=d;this.$8=e;this.$5=null;this.$10.subscribe("/t_ms",function(a){return f.$13(a)});this.$10.subscribe("/thread_typing",function(a){f.$14(a)});this.$10.subscribe("/orca_typing_notifications",function(a){f.$14(a)});this.$10.subscribe("/notify_disconnect",function(a){return f.$15(a)});this.connectToIris();return this};c.$16=function(){var a=this;this.$5?this.$17():(this.$18(),b("setTimeoutAcrossTransitions")(function(){a.$5==null?a.$6.bumpCounter("syncTokenUnassigned_5s"):a.$6.bumpCounter("syncTokenAssigned_5s")},5e3))};c.$19=function(a){var b=null;try{b=JSON.parse(a)}catch(a){this.$6.logError(a,"Unable to process data")}return b};c.$14=function(a){var b=this.$19(a);if(b==null){this.$6.logWarn("_processTypingData","Unable to process typing data");return}this.$3.forEach(function(a){typeof a.onTypingReceived==="function"&&a.onTypingReceived(b)})};c.addDeltaStreamListener=function(a){this.$3.push(a)};c.$15=function(a){this.$6.logWarn("_handleNotifyDisconnect","Disconnecting reason: "+a),this.$6.bumpCounter("notify_disconnect_"+a),a==="IRIS_CURSOR_LIMIT"&&this.$20(a)};c.$20=function(a){this.$6.bumpCounter(a+"_request"),this.$5=null,this.$9=!1,this.$3.forEach(function(b){return b.onStreamDisconnect(a)})};c.$13=function(a){__p&&__p();a=this.$19(a);if(a==null){this.$6.logWarn("_processDeltas","Unable to process delta");return}var b={syncToken:a.syncToken,entityId:a.queueEntityId,errorCode:a.errorCode,firstSeqId:a.firstDeltaSeqId,lastSeqId:a.lastIssuedSeqId};this.$6.debugTrace("Sync data received",JSON.stringify(b));b=this.$1;if(a.syncToken){this.$21(a);return}else if(a.queueEntityId!=b){this.$6.bumpCounter("delta_for_other_fbid");return}else a.errorCode?this.$22(a.errorCode):this.$23(a)};c.$22=function(a){this.$6.bumpCounter("iris_queue_error."+a),this.$6.logWarn("_handleIrisError","Recevied an error code from sync protocol "+a),a==="ERROR_QUEUE_TEMPORARY_NOT_AVAILABLE"?this.$12():this.$20(a)};c.$21=function(a){var c=this;this.$5=a.syncToken;this.$4=b("Int64").fromString(a.firstDeltaSeqId.toString());this.$6.debugTrace("Sync token received",JSON.stringify({token:this.$5}));this.$10.subscribeChannelEvents({onMQTTStateChanged:function(a){c.$9&&c.$2!=="Connected"&&a==="Connected"&&(c.$12.reset(),c.$16()),c.$2=a}});this.$2="Connected"};c.$23=function(a){var c=a.deltas,d=this.$4;if(c&&d){var e=b("Int64").fromString(a.firstDeltaSeqId.toString());a=b("Int64").fromString(a.lastIssuedSeqId.toString());e.equals(d.add(b("Int64").ONE))?this.$24(e,a,c):e.compare(d)<0?(this.$6.bumpCounter("delta_batch_in_middle"),a.compare(d)>0&&this.$24(d.add(b("Int64").ONE),a,c)):(this.$6.bumpCounter("missing_deltas_get_diffs"),this.$17())}else this.$6.bumpCounter("process_deltas_invalid_state")};c.$24=function(a,c,d){__p&&__p();a=a;for(var e=0;e<d.length;e++){var f=d[e],g=f["class"]||"Missing";try{g=="NewMessage"&&b("MqttWaterfallLogger").logNewMessageToWaterfall({senderID:f.messageMetadata.actorFbId,receiptID:this.$1,messageID:f.messageMetadata.messageId,offlineThreadingID:f.messageMetadata.offlineThreadingId,threadID:f.messageMetadata.threadKey.threadFbId!=null?f.messageMetadata.threadKey.threadFbId:"",irisSeqId:f.irisSeqId?f.irisSeqId:a.toString(),isGroup:f.messageMetadata.threadKey.threadFbId!=null})}catch(a){this.$6.logError(a,"Unable to log to waterfall")}var h={seqId:a.toString(),type:g,status:""},i=1;if(g!="Missing")try{i=this.$25(f,g,a,h)}catch(a){h.status="err:"+a.message}else h.status="no type",this.$6.bumpCounter("missing_delta_type");this.$6.debugTrace("onDeltaReceived",JSON.stringify(h));a=a.add(b("Int64").fromInt(i))}this.$4=c};c.$25=function(a,c,d,e){__p&&__p();var f=1,g="";c==="NoOp"&&(f=a.numNoOps||f,g+="n:"+f);a.irisSeqId||(a.irisSeqId=d.toString(),g+="missing seq id");var h=b("Int64").fromString(a.irisSeqId.toString())||d;h.equals(d)?g+=" seqId match":(g+=" seqId mismatch",this.$6.bumpCounter("seq_id_running_id_mismatch"));var i={type:c,payload:a};this.$3.forEach(function(a){return a.onDeltaReceived(i)});e.status=g;return f};c.$18=function(){var a={sync_api_version:10,max_deltas_able_to_process:1e3,delta_batch_size:500,encoding:"JSON",entity_fbid:this.$1,initial_titan_sequence_id:this.$4&&this.$4.toString(),device_params:this.$7,queue_position:this.$8};this.$6.debugTrace("Sending create queue request",JSON.stringify({seqId:this.$4&&this.$4.toString()}));this.$10.publish("/messenger_sync_create_queue",JSON.stringify(a))};c.$17=function(){__p&&__p();if(!this.$4){this.$6.bumpCounter("get_diffs_no_seq_id");return}if(!this.$5){this.$6.bumpCounter("get_diffs_no_sync_token");return}var a={sync_token:this.$5,sync_api_version:10,max_deltas_able_to_process:1e3,delta_batch_size:500,encoding:"JSON",entity_fbid:this.$1,last_seq_id:this.$4.toString()};this.$6.debugTrace("Sending get diff request",JSON.stringify({token:this.$5,seqId:this.$4&&this.$4.toString()}));this.$10.publish("/messenger_sync_get_diffs",JSON.stringify(a))};return a}();var g=new(b("MercurySingletonProvider"))(a);e.exports=a}),null);
__d("MessengerMQTTPayloadPreprocessor",[],(function(a,b,c,d,e,f){"use strict";a={process:function(a,b,c){var d=parseInt(c.irisSeqId.toString(),10);return{seqID:d,obj:{queue:a,iseq:d,delta:c,seqID:d,type:b}}}};e.exports=a}),null);
__d("MessengerMQTTPresence",["FBMqttChannel","PresenceStatus"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g="/orca_presence",h=!1;a={subscribe:function(){if(h)return;h=!0;b("FBMqttChannel").subscribe(g,function(a){a=JSON.parse(a);a&&a.list&&b("PresenceStatus").setMultiFromMQTT(a.list)})},unsubscribe:function(){h=!1,b("FBMqttChannel").unsubscribe(g)}};e.exports=a}),null);
__d("MessengerMQTTPresenceActivity",["Event","MercuryConfig","MessengerMQTTPresence","UserActivity"],(function(a,b,c,d,e,f){__p&&__p();var g=b("MercuryConfig").idle_limit||18e5;a=b("MercuryConfig").idle_poll_interval||3e5;var h=Date.now(),i=!0;function j(){h=Date.now(),b("MessengerMQTTPresence").subscribe()}c={init:function(){b("Event").listen(window,"focus",function(){i=!0,j()}),b("Event").listen(window,"blur",function(){i=!1}),b("UserActivity").subscribe(function(){j()})}};window.setInterval(function(){!i&&Date.now()-h>g&&b("MessengerMQTTPresence").unsubscribe()},a);e.exports=c}),null);
__d("MessengerMQTTTypingDataPreProcessor",[],(function(a,b,c,d,e,f){"use strict";a={process:function(a,b){var c=b.thread;a=c==null?{from:b.sender_fbid,st:b.state,to:a,type:"typ"}:{from:b.sender_fbid,st:b.state,thread:c,thread_fbid:c,type:"ttyp"};return{obj:a}}};e.exports=a}),null);
__d("MessengerMQTTConnection",["Arbiter","CurrentUser","FBMqttChannel","MercuryRealTimeEnvironmentDropDown","MercurySingletonProvider","MercurySyncResnapshot","MessageEventStream","MessengerMQTTConnectionEvents","MessengerMQTTPayloadPreprocessor","MessengerMQTTPresence","MessengerMQTTTypingDataPreProcessor","MqttLogger","gkx","promiseDone"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("MessengerMQTTConnectionEvents").DELTA_EVENT,h=b("MessengerMQTTConnectionEvents").STREAM_CONNECT,i=b("MessengerMQTTConnectionEvents").STREAM_DISCONNECT,j=b("MessengerMQTTConnectionEvents").STREAM_CONNECTING,k=b("MessengerMQTTConnectionEvents").STATE_CONNECTED,l=b("MessengerMQTTConnectionEvents").STATE_CONNECTING,m=b("MessengerMQTTConnectionEvents").STATE_DISCONNECTED,n=b("MessengerMQTTConnectionEvents").TYP;a=function(){__p&&__p();a.getForFBID=function(a){return o.getForFBID(a)};a.get=function(){return o.get()};function a(a){this.$1=a,this.connectionState=m}a.setUp=function(c){__p&&__p();var e=c.fbid,f=c.irisSeqID;c.appID;c.endpoint;b("MercuryRealTimeEnvironmentDropDown").init();if(!e||!f)return;c=b("MqttLogger").getInstance();if(!b("CurrentUser").isLoggedInNow()){c.debugTrace("run","User not logged in");c.bumpCounter("user_not_loggged_in");return}var g=a.getForFBID(e);a.addDeltaStream({fbid:e,irisSeqID:f});var n=function(){b("Arbiter").inform(h)};b("FBMqttChannel").getConnectionState()===k&&(g.connectionState=k,n());b("FBMqttChannel").subscribeChannelEvents({onMQTTStateChanged:function(a){switch(a){case k:n();break;case l:b("Arbiter").inform(j);break;case m:b("Arbiter").inform(i);break}g.connectionState=a},onJSError:function(a){g.$2()}});(b("gkx")("845715")||b("gkx")("845716"))&&b("MessengerMQTTPresence").subscribe();b("gkx")("845716")&&d(["MessengerMQTTPresenceActivity"],function(a){a.init()})};a.addDeltaStream=function(c){var d=c.fbid;c=c.irisSeqID;var e=a.getForFBID(d),f=null;b("gkx")("687751")&&(f={accept_pending_deltas:!0});b("MessageEventStream").getForFBID(d).init(b("FBMqttChannel"),c,f).addDeltaStreamListener(e)};var c=a.prototype;c.onDeltaReceived=function(a){var c=a.type;a=a.payload;c=b("MessengerMQTTPayloadPreprocessor").process(this.$1,c,a);b("Arbiter").inform(g,c)};c.onStreamDisconnect=function(a){__p&&__p();var c=this;if(a==="IRIS_CURSOR_LIMIT"){this.$2();return}if(a==="ERROR_QUEUE_LOST"||a==="QUEUE_NOT_FOUND"||a==="ERROR_QUEUE_EXCEEDS_MAX_DELTAS"||a==="ERROR_QUEUE_UNDERFLOW"||a==="ERROR_QUEUE_OVERFLOW"){b("promiseDone")(b("MercurySyncResnapshot").getForFBID(this.$1).resnapshot(),function(a){b("MessageEventStream").getForFBID(c.$1).connectToIris(a.toString())},function(){c.$2()});return}b("Arbiter").inform(i,a)};c.onTypingReceived=function(a){a=b("MessengerMQTTTypingDataPreProcessor").process(this.$1,a);b("Arbiter").inform(n,a)};c.$2=function(){b("Arbiter").inform("mqtt-websocket-connection-died"),b("MqttLogger").getInstance().logWarn("connection_died","Dropping down to ChatProxy")};return a}();var o=new(b("MercurySingletonProvider"))(a);e.exports=a}),null);