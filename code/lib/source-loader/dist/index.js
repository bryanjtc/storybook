var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var src_exports={};__export(src_exports,{default:()=>src_default,extractSource:()=>extractSource});module.exports=__toCommonJS(src_exports);var import_promises=require("fs/promises");var defaultOptions={prettierConfig:{printWidth:100,tabWidth:2,bracketSpacing:!0,trailingComma:"es5",singleQuote:!0},uglyCommentsRegex:[/^eslint-.*/,/^global.*/]},default_options_default=defaultOptions;var import_parser_babel=__toESM(require("prettier/parser-babel"));function parse(source){try{return import_parser_babel.default.parsers.babel.parse(source)}catch(error1){try{return JSON.stringify(source)}catch{throw error1}}}function format(source){return import_parser_babel.default.parsers.babel.format(source)}var parser_js_default={parse,format};var import_parser_typescript=__toESM(require("prettier/parser-typescript"));function parse2(source){try{return import_parser_typescript.default.parsers.typescript.parse(source)}catch(error1){try{return JSON.stringify(source)}catch{throw error1}}}function format2(source){return import_parser_typescript.default.parsers.typescript.format(source)}var parser_ts_default={parse:parse2,format:format2};var import_parser_flow=__toESM(require("prettier/parser-flow"));function parse3(source){return import_parser_flow.default.parsers.flow.parse(source)}function format3(source){return import_parser_flow.default.parsers.flow.format(source)}var parser_flow_default={parse:parse3,format:format3};function getParser(type){if(type==="javascript"||/\.jsx?/.test(type)||!type)return parser_js_default;if(type==="typescript"||/\.tsx?/.test(type))return parser_ts_default;if(type==="flow")return parser_flow_default;throw new Error(`Parser of type "${type}" is not supported`)}var parsers_default=getParser;var import_csf3=require("@storybook/csf"),import_mapKeys=__toESM(require("lodash/mapKeys.js"));var import_csf=require("@storybook/csf"),STORIES_OF="storiesOf";function pushParts(source,parts,from,to){let start=source.slice(from,to);parts.push(start);let end=source.slice(to);parts.push(end)}function patchNode(node){if(node.range&&node.range.length===2&&node.start===void 0&&node.end===void 0){let[start,end]=node.range;node.start=start,node.end=end}return!node.range&&node.start!==void 0&&node.end!==void 0&&(node.range=[node.start,node.end]),node}function findTemplate(templateName,program){let template=null;return program.body.find(node=>{var _a;let declarations=null;return node.type==="VariableDeclaration"?declarations=node.declarations:node.type==="ExportNamedDeclaration"&&((_a=node.declaration)==null?void 0:_a.type)==="VariableDeclaration"&&(declarations=node.declaration.declarations),declarations&&declarations.find(decl=>decl.type==="VariableDeclarator"&&decl.id.type==="Identifier"&&decl.id.name===templateName?(template=decl.init,!0):!1)}),template}function expandBindExpression(node,parent){if(node.type==="CallExpression"){let{callee,arguments:bindArguments}=node;if(parent.type==="Program"&&callee.type==="MemberExpression"&&callee.object.type==="Identifier"&&callee.property.type==="Identifier"&&callee.property.name==="bind"&&(bindArguments.length===0||bindArguments.length===1&&bindArguments[0].type==="ObjectExpression"&&bindArguments[0].properties.length===0)){let boundIdentifier=callee.object.name,template=findTemplate(boundIdentifier,parent);if(template)return template}}return node}function handleExportedName(storyName,originalNode,parent){let node=expandBindExpression(originalNode,parent),startLoc={col:node.loc.start.column,line:node.loc.start.line},endLoc={col:node.loc.end.column,line:node.loc.end.line};return{[storyName]:{startLoc,endLoc,startBody:startLoc,endBody:endLoc}}}function handleADD(node,parent,storiesOfIdentifiers){if(!node.property||!node.property.name||node.property.name!=="add")return{};let addArgs=parent.arguments;if(!addArgs||addArgs.length<2)return{};let tmp=node.object;for(;tmp.callee&&tmp.callee.object;)tmp=tmp.callee.object;let framework=tmp.callee&&tmp.callee.name&&storiesOfIdentifiers[tmp.callee.name],storyName=addArgs[0],body=addArgs[1],lastArg=addArgs[addArgs.length-1];if(storyName.type!=="Literal"&&storyName.type!=="StringLiteral")return{};if(storyName.value&&typeof storyName.value=="string"){let key=(0,import_csf.sanitize)(storyName.value),idToFramework;return key&&framework&&(idToFramework={[key]:framework}),{toAdd:{[key]:{startLoc:{col:storyName.loc.start.column,line:storyName.loc.start.line},endLoc:{col:lastArg.loc.end.column,line:lastArg.loc.end.line},startBody:{col:body.loc.start.column,line:body.loc.start.line},endBody:{col:body.loc.end.column,line:body.loc.end.line}}},idToFramework}}return{}}function handleSTORYOF(node,parts,source,lastIndex){return!node.callee||!node.callee.name||node.callee.name!==STORIES_OF?lastIndex:(parts.pop(),pushParts(source,parts,lastIndex,node.end),node.end)}var import_csf2=require("@storybook/csf"),import_estraverse=__toESM(require("estraverse"));function splitSTORYOF(ast,source){let lastIndex=0,parts=[source];return import_estraverse.default.traverse(ast,{fallback:"iteration",enter:node=>{patchNode(node),node.type==="CallExpression"&&(lastIndex=handleSTORYOF(node,parts,source,lastIndex))}}),parts}function isFunctionVariable(declarations,includeExclude){return declarations&&declarations.length===1&&declarations[0].type==="VariableDeclarator"&&declarations[0].id&&declarations[0].id.name&&declarations[0].init&&["CallExpression","ArrowFunctionExpression","FunctionExpression","ObjectExpression"].includes(declarations[0].init.type)&&(0,import_csf2.isExportStory)(declarations[0].id.name,includeExclude)}function isFunctionDeclaration(declaration,includeExclude){return declaration.type==="FunctionDeclaration"&&declaration.id&&declaration.id.name&&(0,import_csf2.isExportStory)(declaration.id.name,includeExclude)}function getDescriptor(metaDeclaration,propertyName){let property=metaDeclaration&&metaDeclaration.declaration&&metaDeclaration.declaration.properties.find(p=>p.key&&p.key.name===propertyName);if(!property)return;let{type}=property.value;switch(type){case"ArrayExpression":return property.value.elements.map(t=>{if(!["StringLiteral","Literal"].includes(t.type))throw new Error(`Unexpected descriptor element: ${t.type}`);return t.value});case"Literal":case"RegExpLiteral":return property.value.value;default:throw new Error(`Unexpected descriptor: ${type}`)}}function findIncludeExclude(ast){let program=ast&&ast.program||ast,metaDeclaration=program&&program.body&&program.body.find(d=>d.type==="ExportDefaultDeclaration"&&d.declaration.type==="ObjectExpression"&&(d.declaration.properties||[]).length),includeStories=getDescriptor(metaDeclaration,"includeStories"),excludeStories=getDescriptor(metaDeclaration,"excludeStories");return{includeStories,excludeStories}}function splitExports(ast,source){let parts=[],lastIndex=0,includeExclude=findIncludeExclude(ast);return import_estraverse.default.traverse(ast,{fallback:"iteration",enter:node=>{patchNode(node);let isNamedExport=node.type==="ExportNamedDeclaration"&&node.declaration,isFunctionVariableExport=isNamedExport&&isFunctionVariable(node.declaration.declarations,includeExclude);if(isNamedExport&&isFunctionDeclaration(node.declaration,includeExclude)||isFunctionVariableExport){let functionNode=isFunctionVariableExport?node.declaration.declarations[0].init:node.declaration;parts.push({source:source.substring(lastIndex,functionNode.start-1)}),parts.push({source:source.substring(functionNode.start,functionNode.end),declaration:{isVariableDeclaration:isFunctionVariableExport,ident:isFunctionVariableExport?node.declaration.declarations[0].id.name:functionNode.id.name}}),lastIndex=functionNode.end}}}),source.length>lastIndex+1&&parts.push({source:source.substring(lastIndex+1)}),parts.length===1?[source]:parts}function findAddsMap(ast,storiesOfIdentifiers){let addsMap={};return import_estraverse.default.traverse(ast,{fallback:"iteration",enter:(node,parent)=>{if(patchNode(node),node.type==="MemberExpression"){let{toAdd,idToFramework}=handleADD(node,parent,storiesOfIdentifiers);Object.assign(addsMap,toAdd)}}}),addsMap}function findExportsMap(ast){let addsMap={};return import_estraverse.default.traverse(ast,{fallback:"iteration",enter:(node,parent)=>{patchNode(node);let isNamedExport=node.type==="ExportNamedDeclaration"&&node.declaration,isFunctionVariableExport=isNamedExport&&node.declaration.declarations&&node.declaration.declarations.length===1&&node.declaration.declarations[0].type==="VariableDeclarator"&&node.declaration.declarations[0].id&&node.declaration.declarations[0].id.name&&node.declaration.declarations[0].init&&["CallExpression","ArrowFunctionExpression","FunctionExpression","ObjectExpression"].includes(node.declaration.declarations[0].init.type);if(isNamedExport&&node.declaration.type==="FunctionDeclaration"&&node.declaration.id&&node.declaration.id.name||isFunctionVariableExport){let exportDeclaration=isFunctionVariableExport?node.declaration.declarations[0]:node.declaration,toAdd=handleExportedName(exportDeclaration.id.name,exportDeclaration.init||exportDeclaration,parent);Object.assign(addsMap,toAdd)}}}),addsMap}function popParametersObjectFromDefaultExport(source,ast){let splicedSource=source,parametersSliceOfCode="",indexWhereToAppend=-1,foundParametersProperty=!1;return import_estraverse.default.traverse(ast,{fallback:"iteration",enter:node=>{patchNode(node);let isDefaultExport=node.type==="ExportDefaultDeclaration",decl=node.declaration;isDefaultExport&&(decl==null?void 0:decl.type)==="Identifier"&&ast.body.forEach(n=>{n.type==="VariableDeclaration"&&n.declarations.forEach(d=>{d.id.name===decl.name&&(decl=d.init)})});let isObjectExpression=(decl==null?void 0:decl.type)==="ObjectExpression",isTsAsExpression=(decl==null?void 0:decl.type)==="TSAsExpression",targetNode=isObjectExpression?decl:decl==null?void 0:decl.expression;if(isDefaultExport&&(isObjectExpression||isTsAsExpression)&&(targetNode.properties||[]).length){let parametersProperty=targetNode.properties.find(p=>p.key.name==="parameters"&&p.value.type==="ObjectExpression");foundParametersProperty=!!parametersProperty,foundParametersProperty?patchNode(parametersProperty.value):patchNode(targetNode),splicedSource=parametersProperty?source.substring(0,parametersProperty.value.start)+source.substring(parametersProperty.value.end+1):splicedSource,parametersSliceOfCode=parametersProperty?source.substring(parametersProperty.value.start,parametersProperty.value.end):"{}",indexWhereToAppend=parametersProperty?parametersProperty.value.start:targetNode.start+1}}}),{splicedSource,parametersSliceOfCode,indexWhereToAppend,foundParametersProperty}}function extractSource(location,lines){let{startBody:start,endBody:end}=location;if(start.line===end.line&&lines[start.line-1]!==void 0)return lines[start.line-1].substring(start.col,end.col);let startLine=lines[start.line-1],endLine=lines[end.line-1];return startLine===void 0||endLine===void 0?null:[startLine.substring(start.col),...lines.slice(start.line,end.line-1),endLine.substring(0,end.col)].join(`
`)}function sanitizeSource(source){return JSON.stringify(source,null,2).trim().replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function isUglyComment(comment,uglyCommentsRegex){return uglyCommentsRegex.some(regex=>regex.test(comment))}function generateSourceWithoutUglyComments(source,{comments,uglyCommentsRegex}){let lastIndex=0,parts=[source];return comments.filter(comment=>isUglyComment(comment.value.trim(),uglyCommentsRegex)).map(patchNode).forEach(comment=>{parts.pop();let start=source.slice(lastIndex,comment.start),end=source.slice(comment.end);parts.push(start,end),lastIndex=comment.end}),parts.join("")}function prettifyCode(source,{prettierConfig,parser,filepath}){let config=prettierConfig,foundParser=null;parser==="flow"&&(foundParser="flow"),(parser==="javascript"||/jsx?/.test(parser))&&(foundParser="javascript"),(parser==="typescript"||/tsx?/.test(parser))&&(foundParser="typescript"),config.parser?filepath?config={...prettierConfig,filepath}:config={...prettierConfig}:config={...prettierConfig};try{return parsers_default(foundParser||"javascript").format(source,config)}catch{return source}}var ADD_PARAMETERS_STATEMENT=".addParameters({ storySource: { source: __STORY__, locationsMap: __LOCATIONS_MAP__ } })",applyExportDecoratorStatement=part=>part.declaration.isVariableDeclaration?` ${part.source};`:` const ${part.declaration.ident} = ${part.source};`;function generateSourceWithDecorators(source,ast){let{comments=[]}=ast,partsUsingStoryOfToken=splitSTORYOF(ast,source);if(partsUsingStoryOfToken.length>1){let newSource2=partsUsingStoryOfToken.join(ADD_PARAMETERS_STATEMENT);return{storyOfTokenFound:!0,changed:partsUsingStoryOfToken.length>1,source:newSource2,comments}}let partsUsingExports=splitExports(ast,source),newSource=partsUsingExports.map((part,i)=>i%2===0?part.source:applyExportDecoratorStatement(part)).join("");return{exportTokenFound:!0,changed:partsUsingExports.length>1,source:newSource,comments}}function generateSourceWithoutDecorators(source,ast){let{comments=[]}=ast;return{changed:!0,source,comments}}function generateAddsMap(ast,storiesOfIdentifiers){return findAddsMap(ast,storiesOfIdentifiers)}function generateStoriesLocationsMap(ast,storiesOfIdentifiers){let usingAddsMap=generateAddsMap(ast,storiesOfIdentifiers);return Object.keys(usingAddsMap).length>0?usingAddsMap:findExportsMap(ast)||usingAddsMap}function generateStorySource({source,...options}){let storySource=source;return storySource=generateSourceWithoutUglyComments(storySource,options),storySource=prettifyCode(storySource,options),storySource}function transformLocationMapToIds(parameters){if(!(parameters!=null&&parameters.locationsMap))return parameters;let locationsMap=(0,import_mapKeys.default)(parameters.locationsMap,(_value,key)=>(0,import_csf3.sanitize)((0,import_csf3.storyNameFromExport)(key)));return{...parameters,locationsMap}}function generateSourcesInExportedParameters(source,ast,additionalParameters){let{splicedSource,parametersSliceOfCode,indexWhereToAppend,foundParametersProperty}=popParametersObjectFromDefaultExport(source,ast);if(indexWhereToAppend!==-1){let additionalParametersAsJson=JSON.stringify({storySource:transformLocationMapToIds(additionalParameters)},null,2).trim().slice(0,-1),propertyDeclaration=foundParametersProperty?"":"parameters: ",comma=foundParametersProperty?"":",",newParameters=`${propertyDeclaration}${additionalParametersAsJson},${parametersSliceOfCode.substring(1)}${comma}`,additionalComma=comma===","?"":",";return`${splicedSource.substring(0,indexWhereToAppend)}${newParameters}${additionalComma}${splicedSource.substring(indexWhereToAppend)}`}return source}function addStorySourceParameter(key,snippet){let source=sanitizeSource(snippet);return`${key}.parameters = { storySource: { source: ${source} }, ...${key}.parameters };`}function generateSourcesInStoryParameters(source,ast,additionalParameters){if(!additionalParameters||!additionalParameters.source||!additionalParameters.locationsMap)return source;let{source:sanitizedSource,locationsMap}=additionalParameters,lines=sanitizedSource.split(`
`),suffix=Object.entries(locationsMap).reduce((acc,[exportName,location])=>{let exportSource=extractSource(location,lines);if(exportSource){let generated=addStorySourceParameter(exportName,exportSource);return`${acc}
${generated}`}return acc},"");return suffix?`${source}

${suffix}`:source}function extendOptions(source,comments,filepath,options){return{...default_options_default,...options,source,comments,filepath}}function inject(source,filepath,options={},log=message=>{}){let{injectDecorator=!0,injectStoryParameters=!1}=options,obviouslyNotCode=["md","txt","json"].includes(options.parser),parser=null;try{parser=parsers_default(options.parser||filepath)}catch(e){log(new Error(`(not fatal, only impacting storysource) Could not load a parser (${e})`))}if(obviouslyNotCode||!parser)return{source,storySource:{},addsMap:{},changed:!1};let ast=parser.parse(source),{changed,source:cleanedSource,comments,exportTokenFound}=injectDecorator===!0?generateSourceWithDecorators(source,ast):generateSourceWithoutDecorators(source,ast),storySource=generateStorySource(extendOptions(source,comments,filepath,options)),newAst=parser.parse(storySource),addsMap=generateStoriesLocationsMap(newAst,[]),newSource=cleanedSource;if(exportTokenFound){let cleanedSourceAst=parser.parse(cleanedSource);injectStoryParameters?newSource=generateSourcesInStoryParameters(cleanedSource,cleanedSourceAst,{source:storySource,locationsMap:addsMap}):newSource=generateSourcesInExportedParameters(cleanedSource,cleanedSourceAst,{source:storySource,locationsMap:addsMap})}return!changed&&Object.keys(addsMap||{}).length===0?{source:newSource,storySource,addsMap:{},changed}:{source:newSource,storySource,addsMap,changed}}var inject_decorator_default=inject;function readAsObject(classLoader,inputSource,mainFile){let options=classLoader.getOptions(),result=inject_decorator_default(inputSource,classLoader.resourcePath,{...options,parser:options.parser||classLoader.extension},classLoader.emitWarning.bind(classLoader)),sourceJson=sanitizeSource(result.storySource||inputSource),addsMap=result.addsMap||{},source=mainFile?result.source:inputSource;return new Promise(resolve=>resolve({source,sourceJson,addsMap}))}function readStory(classLoader,inputSource){return readAsObject(classLoader,inputSource,!0)}async function transform(inputSource){let sourceObject=await readStory(this,inputSource);if(!sourceObject.source||sourceObject.source.length===0)return inputSource;let{source,sourceJson,addsMap}=sourceObject,rawSource=await(0,import_promises.readFile)(this.resourcePath,"utf-8");return`${`
    /* eslint-disable */
    // @ts-nocheck
    // @ts-expect-error (Converted from ts-ignore)
    var __STORY__ = ${sanitizeSource(rawSource)};
    // @ts-expect-error (Converted from ts-ignore)
    var __LOCATIONS_MAP__ = ${JSON.stringify(addsMap,null,2).trim()};
    `}
${source}`}var src_default=transform;0&&(module.exports={extractSource});
