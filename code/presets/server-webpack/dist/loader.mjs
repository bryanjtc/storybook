import{__require}from"./chunk-R4NKYYJA.mjs";import{dedent}from"ts-dedent";var{identifier}=__require("safe-identifier");function stringifyObject(object,level=0,excludeOuterParams=!1){if(typeof object=="string")return JSON.stringify(object);let indent="  ".repeat(level);if(Array.isArray(object)){let arrayString=object.map(item=>stringifyObject(item,level+1)).join(`,
${indent}  `);return excludeOuterParams?arrayString:`[
${indent}  ${arrayString}
${indent}]`}if(typeof object=="object"){let objectString="";return Object.keys(object).length>0&&(objectString=Object.keys(object).map(key=>{let value=stringifyObject(object[key],level+1);return`
${indent}  ${key}: ${value}`}).join(",")),excludeOuterParams?objectString:objectString.length===0?"{}":`{${objectString}
${indent}}`}return object}function stringifyImports(imports){return Object.keys(imports).length===0?"":Object.entries(imports).map(([module,names])=>`import { ${names.sort().join(", ")} } from '${module}';
`).join("")}function stringifyDecorators(decorators){return decorators&&decorators.length>0?`
  decorators: [
    ${decorators.join(`,
    `)}
  ],`:""}function stringifyDefault(section){let{title,imports,decorators,stories,...options}=section,decoratorsString=stringifyDecorators(decorators),optionsString=stringifyObject(options,0,!0);return dedent`
  export default {
    title: ${JSON.stringify(title)},${decoratorsString}${optionsString}
  };
  
  `}function stringifyStory(story){let{name,...options}=story,storyId=identifier(name),exportedStory={name,...options};return[`export const ${storyId} = ${stringifyObject(exportedStory)};`,""].join(`
`)}function stringifySection(section){return[stringifyImports(section.imports),stringifyDefault(section),...section.stories.map(story=>stringifyStory(story))].join(`
`)}function createSection(args){return{imports:{},decorators:[],...args}}function compileCsfModule(args){return stringifySection(createSection(args))}var loader_default=content=>{try{return compileCsfModule(JSON.parse(content))}catch{}return content};export{loader_default as default};
