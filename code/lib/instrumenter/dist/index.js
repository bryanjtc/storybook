var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var src_exports={};__export(src_exports,{CallStates:()=>CallStates,EVENTS:()=>EVENTS,instrument:()=>instrument});module.exports=__toCommonJS(src_exports);var import_preview_api=require("@storybook/preview-api"),import_client_logger=require("@storybook/client-logger"),import_core_events=require("@storybook/core-events"),import_global=require("@storybook/global");var CallStates=(CallStates2=>(CallStates2.DONE="done",CallStates2.ERROR="error",CallStates2.ACTIVE="active",CallStates2.WAITING="waiting",CallStates2))(CallStates||{});var EVENTS={CALL:"storybook/instrumenter/call",SYNC:"storybook/instrumenter/sync",START:"storybook/instrumenter/start",BACK:"storybook/instrumenter/back",GOTO:"storybook/instrumenter/goto",NEXT:"storybook/instrumenter/next",END:"storybook/instrumenter/end"},controlsDisabled={start:!1,back:!1,goto:!1,next:!1,end:!1},alreadyCompletedException=new Error("This function ran after the play function completed. Did you forget to `await` it?"),isObject=o=>Object.prototype.toString.call(o)==="[object Object]",isModule=o=>Object.prototype.toString.call(o)==="[object Module]",isInstrumentable=o=>{if(!isObject(o)&&!isModule(o))return!1;if(o.constructor===void 0)return!0;let proto=o.constructor.prototype;return!(!isObject(proto)||Object.prototype.hasOwnProperty.call(proto,"isPrototypeOf")===!1)},construct=obj=>{try{return new obj.constructor}catch{return{}}},getInitialState=()=>({renderPhase:void 0,isDebugging:!1,isPlaying:!1,isLocked:!1,cursor:0,calls:[],shadowCalls:[],callRefsByResult:new Map,chainedCallIds:new Set,ancestors:[],playUntil:void 0,resolvers:{},syncTimeout:void 0}),getRetainedState=(state,isDebugging=!1)=>{let calls=(isDebugging?state.shadowCalls:state.calls).filter(call=>call.retain);if(!calls.length)return;let callRefsByResult=new Map(Array.from(state.callRefsByResult.entries()).filter(([,ref])=>ref.retain));return{cursor:calls.length,calls,callRefsByResult}},Instrumenter=class{constructor(){this.initialized=!1;this.channel=import_preview_api.addons.getChannel(),this.state=import_global.global.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__||{};let resetState=({storyId,isPlaying=!0,isDebugging=!1})=>{let state=this.getState(storyId);this.setState(storyId,{...getInitialState(),...getRetainedState(state,isDebugging),shadowCalls:isDebugging?state.shadowCalls:[],chainedCallIds:isDebugging?state.chainedCallIds:new Set,playUntil:isDebugging?state.playUntil:void 0,isPlaying,isDebugging}),this.sync(storyId)};this.channel.on(import_core_events.FORCE_REMOUNT,resetState),this.channel.on(import_core_events.STORY_RENDER_PHASE_CHANGED,({storyId,newPhase})=>{let{isDebugging}=this.getState(storyId);this.setState(storyId,{renderPhase:newPhase}),newPhase==="preparing"&&isDebugging&&resetState({storyId}),newPhase==="playing"&&resetState({storyId,isDebugging}),newPhase==="played"&&this.setState(storyId,{isLocked:!1,isPlaying:!1,isDebugging:!1}),newPhase==="errored"&&this.setState(storyId,{isLocked:!1,isPlaying:!1})}),this.channel.on(import_core_events.SET_CURRENT_STORY,()=>{this.initialized?this.cleanup():this.initialized=!0});let start=({storyId,playUntil})=>{this.getState(storyId).isDebugging||this.setState(storyId,({calls})=>({calls:[],shadowCalls:calls.map(call=>({...call,status:"waiting"})),isDebugging:!0}));let log=this.getLog(storyId);this.setState(storyId,({shadowCalls})=>{var _a;if(playUntil||!log.length)return{playUntil};let firstRowIndex=shadowCalls.findIndex(call=>call.id===log[0].callId);return{playUntil:(_a=shadowCalls.slice(0,firstRowIndex).filter(call=>call.interceptable&&!call.ancestors.length).slice(-1)[0])==null?void 0:_a.id}}),this.channel.emit(import_core_events.FORCE_REMOUNT,{storyId,isDebugging:!0})},back=({storyId})=>{var _a;let log=this.getLog(storyId).filter(call=>!call.ancestors.length),last=log.reduceRight((res,item,index)=>res>=0||item.status==="waiting"?res:index,-1);start({storyId,playUntil:(_a=log[last-1])==null?void 0:_a.callId})},goto=({storyId,callId})=>{var _a;let{calls,shadowCalls,resolvers}=this.getState(storyId),call=calls.find(({id})=>id===callId),shadowCall=shadowCalls.find(({id})=>id===callId);if(!call&&shadowCall&&Object.values(resolvers).length>0){let nextId=(_a=this.getLog(storyId).find(c=>c.status==="waiting"))==null?void 0:_a.callId;shadowCall.id!==nextId&&this.setState(storyId,{playUntil:shadowCall.id}),Object.values(resolvers).forEach(resolve=>resolve())}else start({storyId,playUntil:callId})},next=({storyId})=>{var _a;let{resolvers}=this.getState(storyId);if(Object.values(resolvers).length>0)Object.values(resolvers).forEach(resolve=>resolve());else{let nextId=(_a=this.getLog(storyId).find(c=>c.status==="waiting"))==null?void 0:_a.callId;nextId?start({storyId,playUntil:nextId}):end({storyId})}},end=({storyId})=>{this.setState(storyId,{playUntil:void 0,isDebugging:!1}),Object.values(this.getState(storyId).resolvers).forEach(resolve=>resolve())};this.channel.on(EVENTS.START,start),this.channel.on(EVENTS.BACK,back),this.channel.on(EVENTS.GOTO,goto),this.channel.on(EVENTS.NEXT,next),this.channel.on(EVENTS.END,end)}getState(storyId){return this.state[storyId]||getInitialState()}setState(storyId,update){let state=this.getState(storyId),patch=typeof update=="function"?update(state):update;this.state={...this.state,[storyId]:{...state,...patch}},import_global.global.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__=this.state}cleanup(){this.state=Object.entries(this.state).reduce((acc,[storyId,state])=>{let retainedState=getRetainedState(state);return retainedState&&(acc[storyId]=Object.assign(getInitialState(),retainedState)),acc},{});let payload={controlStates:controlsDisabled,logItems:[]};this.channel.emit(EVENTS.SYNC,payload),import_global.global.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__=this.state}getLog(storyId){let{calls,shadowCalls}=this.getState(storyId),merged=[...shadowCalls];calls.forEach((call,index)=>{merged[index]=call});let seen=new Set;return merged.reduceRight((acc,call)=>(call.args.forEach(arg=>{arg!=null&&arg.__callId__&&seen.add(arg.__callId__)}),call.path.forEach(node=>{node.__callId__&&seen.add(node.__callId__)}),(call.interceptable||call.exception)&&!seen.has(call.id)&&(acc.unshift({callId:call.id,status:call.status,ancestors:call.ancestors}),seen.add(call.id)),acc),[])}instrument(obj,options){if(!isInstrumentable(obj))return obj;let{mutate=!1,path=[]}=options;return Object.keys(obj).reduce((acc,key)=>{let value=obj[key];return typeof value!="function"?(acc[key]=this.instrument(value,{...options,path:path.concat(key)}),acc):typeof value.__originalFn__=="function"?(acc[key]=value,acc):(acc[key]=(...args)=>this.track(key,value,args,options),acc[key].__originalFn__=value,Object.defineProperty(acc[key],"name",{value:key,writable:!1}),Object.keys(value).length>0&&Object.assign(acc[key],this.instrument({...value},{...options,path:path.concat(key)})),acc)},mutate?obj:construct(obj))}track(method,fn,args,options){var _a,_b,_c,_d;let storyId=((_a=args==null?void 0:args[0])==null?void 0:_a.__storyId__)||((_d=(_c=(_b=import_global.global.__STORYBOOK_PREVIEW__)==null?void 0:_b.selectionStore)==null?void 0:_c.selection)==null?void 0:_d.storyId),{cursor,ancestors}=this.getState(storyId);this.setState(storyId,{cursor:cursor+1});let id=`${ancestors.slice(-1)[0]||storyId} [${cursor}] ${method}`,{path=[],intercept=!1,retain=!1}=options,interceptable=typeof intercept=="function"?intercept(method,path):intercept,call={id,cursor,storyId,ancestors,path,method,args,interceptable,retain},result=(interceptable&&!ancestors.length?this.intercept:this.invoke).call(this,fn,call,options);return this.instrument(result,{...options,mutate:!0,path:[{__callId__:call.id}]})}intercept(fn,call,options){let{chainedCallIds,isDebugging,playUntil}=this.getState(call.storyId),isChainedUpon=chainedCallIds.has(call.id);return!isDebugging||isChainedUpon||playUntil?(playUntil===call.id&&this.setState(call.storyId,{playUntil:void 0}),this.invoke(fn,call,options)):new Promise(resolve=>{this.setState(call.storyId,({resolvers})=>({isLocked:!1,resolvers:{...resolvers,[call.id]:resolve}}))}).then(()=>(this.setState(call.storyId,state=>{let{[call.id]:_,...resolvers}=state.resolvers;return{isLocked:!0,resolvers}}),this.invoke(fn,call,options)))}invoke(fn,call,options){let{callRefsByResult,renderPhase}=this.getState(call.storyId),serializeValues=value=>{var _a,_b;if(callRefsByResult.has(value))return callRefsByResult.get(value);if(value instanceof Array)return value.map(serializeValues);if(value instanceof Date)return{__date__:{value:value.toISOString()}};if(value instanceof Error){let{name,message,stack}=value;return{__error__:{name,message,stack}}}if(value instanceof RegExp){let{flags,source}=value;return{__regexp__:{flags,source}}}if(value instanceof import_global.global.window.HTMLElement){let{prefix,localName,id,classList,innerText}=value,classNames=Array.from(classList);return{__element__:{prefix,localName,id,classNames,innerText}}}return typeof value=="function"?{__function__:{name:value.name}}:typeof value=="symbol"?{__symbol__:{description:value.description}}:typeof value=="object"&&((_a=value==null?void 0:value.constructor)!=null&&_a.name)&&((_b=value==null?void 0:value.constructor)==null?void 0:_b.name)!=="Object"?{__class__:{name:value.constructor.name}}:Object.prototype.toString.call(value)==="[object Object]"?Object.fromEntries(Object.entries(value).map(([key,val])=>[key,serializeValues(val)])):value},info={...call,args:call.args.map(serializeValues)};call.path.forEach(ref=>{ref!=null&&ref.__callId__&&this.setState(call.storyId,({chainedCallIds})=>({chainedCallIds:new Set(Array.from(chainedCallIds).concat(ref.__callId__))}))});let handleException=e=>{if(e instanceof Error){let{name,message,stack,callId=call.id}=e,exception={name,message,stack,callId};if(this.update({...info,status:"error",exception}),this.setState(call.storyId,state=>({callRefsByResult:new Map([...Array.from(state.callRefsByResult.entries()),[e,{__callId__:call.id,retain:call.retain}]])})),call.ancestors.length)throw Object.prototype.hasOwnProperty.call(e,"callId")||Object.defineProperty(e,"callId",{value:call.id}),e;if(e!==alreadyCompletedException)throw import_client_logger.logger.warn(e),import_core_events.IGNORED_EXCEPTION}throw e};try{if(renderPhase==="played"&&!call.retain)throw alreadyCompletedException;let finalArgs=(options.getArgs?options.getArgs(call,this.getState(call.storyId)):call.args).map(arg=>typeof arg!="function"||Object.keys(arg).length?arg:(...args)=>{let{cursor,ancestors}=this.getState(call.storyId);this.setState(call.storyId,{cursor:0,ancestors:[...ancestors,call.id]});let restore=()=>this.setState(call.storyId,{cursor,ancestors}),willRestore=!1;try{let res=arg(...args);return res instanceof Promise?(willRestore=!0,res.finally(restore)):res}finally{willRestore||restore()}}),result=fn(...finalArgs);return result&&["object","function","symbol"].includes(typeof result)&&this.setState(call.storyId,state=>({callRefsByResult:new Map([...Array.from(state.callRefsByResult.entries()),[result,{__callId__:call.id,retain:call.retain}]])})),this.update({...info,status:result instanceof Promise?"active":"done"}),result instanceof Promise?result.then(value=>(this.update({...info,status:"done"}),value),handleException):result}catch(e){return handleException(e)}}update(call){this.channel.emit(EVENTS.CALL,call),this.setState(call.storyId,({calls})=>{let callsById=calls.concat(call).reduce((a,c)=>Object.assign(a,{[c.id]:c}),{});return{calls:Object.values(callsById).sort((a,b)=>a.id.localeCompare(b.id,void 0,{numeric:!0}))}}),this.sync(call.storyId)}sync(storyId){let synchronize=()=>{var _a;let{isLocked,isPlaying}=this.getState(storyId),logItems=this.getLog(storyId),pausedAt=(_a=logItems.filter(({ancestors})=>!ancestors.length).find(item=>item.status==="waiting"))==null?void 0:_a.callId,hasActive=logItems.some(item=>item.status==="active");if(isLocked||hasActive||logItems.length===0){let payload2={controlStates:controlsDisabled,logItems};this.channel.emit(EVENTS.SYNC,payload2);return}let hasPrevious=logItems.some(item=>["done","error"].includes(item.status)),payload={controlStates:{start:hasPrevious,back:hasPrevious,goto:!0,next:isPlaying,end:isPlaying},logItems,pausedAt};this.channel.emit(EVENTS.SYNC,payload)};this.setState(storyId,({syncTimeout})=>(clearTimeout(syncTimeout),{syncTimeout:setTimeout(synchronize,0)}))}};function instrument(obj,options={}){var _a,_b,_c,_d;try{let forceInstrument=!1,skipInstrument=!1;return(_b=(_a=import_global.global.window.location)==null?void 0:_a.search)!=null&&_b.includes("instrument=true")?forceInstrument=!0:(_d=(_c=import_global.global.window.location)==null?void 0:_c.search)!=null&&_d.includes("instrument=false")&&(skipInstrument=!0),import_global.global.window.parent===import_global.global.window&&!forceInstrument||skipInstrument?obj:(import_global.global.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__||(import_global.global.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__=new Instrumenter),import_global.global.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__.instrument(obj,options))}catch(e){return import_client_logger.once.warn(e),obj}}0&&(module.exports={CallStates,EVENTS,instrument});
