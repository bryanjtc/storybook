"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var config_exports={};__export(config_exports,{parameters:()=>parameters2,render:()=>render2,renderToCanvas:()=>renderToCanvas});module.exports=__toCommonJS(config_exports);var parameters={docs:{story:{inline:!0}}};var preact=__toESM(require("preact")),import_ts_dedent=require("ts-dedent"),{h:h2}=preact,render2=(args,context)=>{let{id,component:Component}=context;if(!Component)throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);return h2(Component,{...args})},renderedStory;function preactRender(story,canvasElement){preact.Fragment?preact.render(story,canvasElement):renderedStory=preact.render(story,canvasElement,renderedStory)}var StoryHarness=({showError,name,title,storyFn,canvasElement})=>{let content=preact.h(storyFn,null);return content||(showError({title:`Expecting a Preact element from the story: "${name}" of "${title}".`,description:import_ts_dedent.dedent`
        Did you forget to return the Preact element from the story?
        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.
      `}),null)};function renderToCanvas({storyFn,title,name,showMain,showError,forceRemount},canvasElement){forceRemount&&preactRender(null,canvasElement),showMain(),preactRender(preact.h(StoryHarness,{name,title,showError,storyFn,canvasElement}),canvasElement)}var parameters2={renderer:"preact",...parameters};0&&(module.exports={parameters,render,renderToCanvas});
