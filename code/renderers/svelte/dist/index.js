"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var src_exports={};__export(src_exports,{configure:()=>configure,forceReRender:()=>forceReRender,raw:()=>raw,storiesOf:()=>storiesOf});module.exports=__toCommonJS(src_exports);var import_global=require("@storybook/global"),{window:globalWindow}=import_global.global;globalWindow.STORYBOOK_ENV="svelte";var import_preview_api2=require("@storybook/preview-api");var import_preview_api=require("@storybook/preview-api"),import_SlotDecorator=__toESM(require("@storybook/svelte/templates/SlotDecorator.svelte"));function unWrap(obj){return obj&&typeof obj=="object"&&"default"in obj?obj.default:obj}function prepareStory(context,rawStory,rawInnerStory){let story=unWrap(rawStory),innerStory=rawInnerStory&&unWrap(rawInnerStory),preparedStory;return!story||Object.keys(story).length===0?preparedStory={Component:context.component}:story.Component?preparedStory=story:preparedStory={Component:story},innerStory?{Component:import_SlotDecorator.default,props:{...innerStory,decorator:preparedStory}}:preparedStory}function decorateStory(storyFn,decorators){return decorators.reduce((decorated,decorator)=>context=>{let story,decoratedStory=decorator(update=>(story=decorated({...context,...(0,import_preview_api.sanitizeStoryContextUpdate)(update)}),story),context);return story||(story=decorated(context)),decoratedStory===story?story:prepareStory(context,decoratedStory,story)},context=>prepareStory(context,storyFn(context)))}var import_PreviewRender=__toESM(require("@storybook/svelte/templates/PreviewRender.svelte")),componentsByDomElement=new Map;function teardown(canvasElement){componentsByDomElement.has(canvasElement)&&(componentsByDomElement.get(canvasElement).$destroy(),canvasElement.innerHTML="",componentsByDomElement.delete(canvasElement))}function renderToCanvas({storyFn,kind,name,showMain,showError,storyContext,forceRemount},canvasElement){let existingComponent=componentsByDomElement.get(canvasElement);if(forceRemount&&teardown(canvasElement),!existingComponent||forceRemount){let createdComponent=new import_PreviewRender.default({target:canvasElement,props:{storyFn,storyContext,name,kind,showError}});componentsByDomElement.set(canvasElement,createdComponent)}else existingComponent.$set({storyFn,storyContext,name,kind,showError});return showMain(),()=>{teardown(canvasElement)}}var render=(args,context)=>{let{id,component:Component}=context;if(!Component)throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);return{Component,props:args}};var{configure:coreConfigure,clientApi,forceReRender}=(0,import_preview_api2.start)(renderToCanvas,{decorateStory,render}),{raw}=clientApi,RENDERER="svelte",storiesOf=(kind,m)=>clientApi.storiesOf(kind,m).addParameters({renderer:RENDERER}),configure=(loadable,m)=>coreConfigure(RENDERER,loadable,m);var _a;(_a=module==null?void 0:module.hot)==null||_a.decline();0&&(module.exports={configure,forceReRender,raw,storiesOf});
