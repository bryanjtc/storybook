"use strict";var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var loader_exports={};__export(loader_exports,{default:()=>loader_default});module.exports=__toCommonJS(loader_exports);var import_ts_dedent=require("ts-dedent"),{identifier}=require("safe-identifier");function stringifyObject(object,level=0,excludeOuterParams=!1){if(typeof object=="string")return JSON.stringify(object);let indent="  ".repeat(level);if(Array.isArray(object)){let arrayString=object.map(item=>stringifyObject(item,level+1)).join(`,
${indent}  `);return excludeOuterParams?arrayString:`[
${indent}  ${arrayString}
${indent}]`}if(typeof object=="object"){let objectString="";return Object.keys(object).length>0&&(objectString=Object.keys(object).map(key=>{let value=stringifyObject(object[key],level+1);return`
${indent}  ${key}: ${value}`}).join(",")),excludeOuterParams?objectString:objectString.length===0?"{}":`{${objectString}
${indent}}`}return object}function stringifyImports(imports){return Object.keys(imports).length===0?"":Object.entries(imports).map(([module2,names])=>`import { ${names.sort().join(", ")} } from '${module2}';
`).join("")}function stringifyDecorators(decorators){return decorators&&decorators.length>0?`
  decorators: [
    ${decorators.join(`,
    `)}
  ],`:""}function stringifyDefault(section){let{title,imports,decorators,stories,...options}=section,decoratorsString=stringifyDecorators(decorators),optionsString=stringifyObject(options,0,!0);return import_ts_dedent.dedent`
  export default {
    title: ${JSON.stringify(title)},${decoratorsString}${optionsString}
  };
  
  `}function stringifyStory(story){let{name,...options}=story,storyId=identifier(name),exportedStory={name,...options};return[`export const ${storyId} = ${stringifyObject(exportedStory)};`,""].join(`
`)}function stringifySection(section){return[stringifyImports(section.imports),stringifyDefault(section),...section.stories.map(story=>stringifyStory(story))].join(`
`)}function createSection(args){return{imports:{},decorators:[],...args}}function compileCsfModule(args){return stringifySection(createSection(args))}var loader_default=content=>{try{return compileCsfModule(JSON.parse(content))}catch{}return content};0&&(module.exports={});
