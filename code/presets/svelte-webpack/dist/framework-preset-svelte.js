"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var framework_preset_svelte_exports={};__export(framework_preset_svelte_exports,{babelDefault:()=>babelDefault,webpack:()=>webpack});module.exports=__toCommonJS(framework_preset_svelte_exports);var webpack=async(config,{presets})=>{var _a,_b,_c,_d;let framework=await presets.apply("framework"),svelteOptions=typeof framework=="object"?framework.options:{},mainFields=((_a=config.resolve)==null?void 0:_a.mainFields)||["browser","module","main"];return{...config,module:{...config.module,rules:[...((_b=config.module)==null?void 0:_b.rules)||[],{test:/\.(svelte|html)$/,loader:require.resolve("svelte-loader"),options:{loader:{},...svelteOptions}}]},resolve:{...config.resolve,extensions:[...((_c=config.resolve)==null?void 0:_c.extensions)||[],".svelte"],alias:(_d=config.resolve)==null?void 0:_d.alias,mainFields:["svelte",...mainFields]}}},babelDefault=config=>({...config,presets:[...(config==null?void 0:config.presets)||[]],plugins:[...(config==null?void 0:config.plugins)||[]]});0&&(module.exports={babelDefault,webpack});
