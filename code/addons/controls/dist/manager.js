"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod));var import_react2=__toESM(require("react")),import_manager_api2=require("@storybook/manager-api"),import_components=require("@storybook/components");var import_react=__toESM(require("react")),import_manager_api=require("@storybook/manager-api"),import_blocks=require("@storybook/blocks");var ADDON_ID="addon-controls",PARAM_KEY="controls";var ControlsPanel=()=>{let[args,updateArgs,resetArgs]=(0,import_manager_api.useArgs)(),[globals]=(0,import_manager_api.useGlobals)(),rows=(0,import_manager_api.useArgTypes)(),isArgsStory=(0,import_manager_api.useParameter)("__isArgsStory",!1),{expanded,sort,presetColors,hideNoControlsWarning=!1}=(0,import_manager_api.useParameter)(PARAM_KEY,{}),{path}=(0,import_manager_api.useStorybookState)(),hasControls=Object.values(rows).some(arg=>arg==null?void 0:arg.control),showWarning=!(hasControls&&isArgsStory)&&!hideNoControlsWarning,withPresetColors=Object.entries(rows).reduce((acc,[key,arg])=>{var _a,_b;return((_a=arg==null?void 0:arg.control)==null?void 0:_a.type)!=="color"||(_b=arg==null?void 0:arg.control)!=null&&_b.presetColors?acc[key]=arg:acc[key]={...arg,control:{...arg.control,presetColors}},acc},{});return import_react.default.createElement(import_react.default.Fragment,null,showWarning&&import_react.default.createElement(import_blocks.NoControlsWarning,null),import_react.default.createElement(import_blocks.PureArgsTable,{key:path,compact:!expanded&&hasControls,rows:withPresetColors,args,globals,updateArgs,resetArgs,inAddonPanel:!0,sort}))};import_manager_api2.addons.register(ADDON_ID,api=>{import_manager_api2.addons.addPanel(ADDON_ID,{title(){let rows=(0,import_manager_api2.useArgTypes)(),controlsCount=Object.values(rows).filter(argType=>{var _a;return(argType==null?void 0:argType.control)&&!((_a=argType==null?void 0:argType.table)!=null&&_a.disable)}).length;return`Controls${controlsCount===0?"":` (${controlsCount})`}`},type:import_manager_api2.types.PANEL,paramKey:PARAM_KEY,render:({key,active})=>!active||!api.getCurrentStoryData()?null:import_react2.default.createElement(import_components.AddonPanel,{key,active},import_react2.default.createElement(ControlsPanel,null))})});
