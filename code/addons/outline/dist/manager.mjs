import{ADDON_ID,PARAM_KEY}from"./chunk-2DMOCDBJ.mjs";import React2 from"react";import{addons,types}from"@storybook/manager-api";import React,{memo,useCallback,useEffect}from"react";import{useGlobals,useStorybookApi}from"@storybook/manager-api";import{Icons,IconButton}from"@storybook/components";var OutlineSelector=memo(function(){let[globals,updateGlobals]=useGlobals(),api=useStorybookApi(),isActive=[!0,"true"].includes(globals[PARAM_KEY]),toggleOutline=useCallback(()=>updateGlobals({[PARAM_KEY]:!isActive}),[isActive]);return useEffect(()=>{api.setAddonShortcut(ADDON_ID,{label:"Toggle Measure [O]",defaultShortcut:["O"],actionName:"outline",showInMenu:!1,action:toggleOutline})},[toggleOutline,api]),React.createElement(IconButton,{key:"outline",active:isActive,title:"Apply outlines to the preview",onClick:toggleOutline},React.createElement(Icons,{icon:"outline"}))});addons.register(ADDON_ID,()=>{addons.add(ADDON_ID,{title:"Outline",type:types.TOOL,match:({viewMode})=>!!(viewMode&&viewMode.match(/^(story|docs)$/)),render:()=>React2.createElement(OutlineSelector,null)})});
