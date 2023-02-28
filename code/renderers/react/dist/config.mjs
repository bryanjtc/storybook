import{render,renderToCanvas}from"./chunk-JWY6Y6NU.mjs";import"./chunk-R4NKYYJA.mjs";import{extractComponentDescription,enhanceArgTypes}from"@storybook/docs-tools";import PropTypes from"prop-types";import{hasDocgen,extractComponentProps,TypeSystem}from"@storybook/docs-tools";import{createSummaryValue,isTooLongForTypeSummary}from"@storybook/docs-tools";function generateFuncSignature(params,returns){let hasParams=params!=null,hasReturns=returns!=null;if(!hasParams&&!hasReturns)return"";let funcParts=[];if(hasParams){let funcParams=params.map(x=>{let prettyName=x.getPrettyName(),typeName=x.getTypeName();return typeName!=null?`${prettyName}: ${typeName}`:prettyName});funcParts.push(`(${funcParams.join(", ")})`)}else funcParts.push("()");return hasReturns&&funcParts.push(`=> ${returns.getTypeName()}`),funcParts.join(" ")}function generateShortFuncSignature(params,returns){let hasParams=params!=null,hasReturns=returns!=null;if(!hasParams&&!hasReturns)return"";let funcParts=[];return hasParams?funcParts.push("( ... )"):funcParts.push("()"),hasReturns&&funcParts.push(`=> ${returns.getTypeName()}`),funcParts.join(" ")}function toMultilineSignature(signature){return signature.replace(/,/g,`,\r
`)}var CUSTOM_CAPTION="custom",OBJECT_CAPTION="object",ARRAY_CAPTION="array",CLASS_CAPTION="class",FUNCTION_CAPTION="func",ELEMENT_CAPTION="element";import htmlTags from"html-tags";function isHtmlTag(tagName){return htmlTags.includes(tagName.toLowerCase())}import{generate}from"escodegen";import{dedent}from"ts-dedent";var BASIC_OPTIONS={format:{indent:{style:"  "},semicolons:!1}},COMPACT_OPTIONS={...BASIC_OPTIONS,format:{newline:""}},PRETTY_OPTIONS={...BASIC_OPTIONS};function generateCode(ast,compact=!1){return generate(ast,compact?COMPACT_OPTIONS:PRETTY_OPTIONS)}function generateObjectCode(ast,compact=!1){return compact?generateCompactObjectCode(ast):generateCode(ast)}function generateCompactObjectCode(ast){let result=generateCode(ast,!0);return result.endsWith(" }")||(result=`${result.slice(0,-1)} }`),result}function generateArrayCode(ast,compact=!1){return compact?generateCompactArrayCode(ast):generateMultilineArrayCode(ast)}function generateMultilineArrayCode(ast){let result=generateCode(ast);return result.endsWith("  }]")&&(result=dedent(result)),result}function generateCompactArrayCode(ast){let result=generateCode(ast,!0);return result.startsWith("[    ")&&(result=result.replace("[    ","[")),result}var isMemo=component=>component.$$typeof===Symbol.for("react.memo"),isForwardRef=component=>component.$$typeof===Symbol.for("react.forward_ref");import{Parser}from"acorn";import jsx from"acorn-jsx";import*as acornWalk from"acorn-walk";var ACORN_WALK_VISITORS={...acornWalk.base,JSXElement:()=>{}},acornParser=Parser.extend(jsx());function extractIdentifierName(identifierNode){return identifierNode!=null?identifierNode.name:null}function filterAncestors(ancestors){return ancestors.filter(x=>x.type==="ObjectExpression"||x.type==="ArrayExpression")}function calculateNodeDepth(node){let depths=[];return acornWalk.ancestor(node,{ObjectExpression(_,ancestors){depths.push(filterAncestors(ancestors).length)},ArrayExpression(_,ancestors){depths.push(filterAncestors(ancestors).length)}},ACORN_WALK_VISITORS),Math.max(...depths)}function parseIdentifier(identifierNode){return{inferredType:{type:"Identifier",identifier:extractIdentifierName(identifierNode)},ast:identifierNode}}function parseLiteral(literalNode){return{inferredType:{type:"Literal"},ast:literalNode}}function parseFunction(funcNode){let innerJsxElementNode;acornWalk.simple(funcNode.body,{JSXElement(node){innerJsxElementNode=node}},ACORN_WALK_VISITORS);let inferredType={type:innerJsxElementNode!=null?"Element":"Function",params:funcNode.params,hasParams:funcNode.params.length!==0},identifierName=extractIdentifierName(funcNode.id);return identifierName!=null&&(inferredType.identifier=identifierName),{inferredType,ast:funcNode}}function parseClass(classNode){let innerJsxElementNode;return acornWalk.simple(classNode.body,{JSXElement(node){innerJsxElementNode=node}},ACORN_WALK_VISITORS),{inferredType:{type:innerJsxElementNode!=null?"Element":"Class",identifier:extractIdentifierName(classNode.id)},ast:classNode}}function parseJsxElement(jsxElementNode){let inferredType={type:"Element"},identifierName=extractIdentifierName(jsxElementNode.openingElement.name);return identifierName!=null&&(inferredType.identifier=identifierName),{inferredType,ast:jsxElementNode}}function parseCall(callNode){let identifierNode=callNode.callee.type==="MemberExpression"?callNode.callee.property:callNode.callee;return extractIdentifierName(identifierNode)==="shape"?parseObject(callNode.arguments[0]):null}function parseObject(objectNode){return{inferredType:{type:"Object",depth:calculateNodeDepth(objectNode)},ast:objectNode}}function parseArray(arrayNode){return{inferredType:{type:"Array",depth:calculateNodeDepth(arrayNode)},ast:arrayNode}}function parseExpression(expression){switch(expression.type){case"Identifier":return parseIdentifier(expression);case"Literal":return parseLiteral(expression);case"FunctionExpression":case"ArrowFunctionExpression":return parseFunction(expression);case"ClassExpression":return parseClass(expression);case"JSXElement":return parseJsxElement(expression);case"CallExpression":return parseCall(expression);case"ObjectExpression":return parseObject(expression);case"ArrayExpression":return parseArray(expression);default:return null}}function parse(value){let ast=acornParser.parse(`(${value})`),parsingResult={inferredType:{type:"Unknown"},ast};if(ast.body[0]!=null){let rootNode=ast.body[0];switch(rootNode.type){case"ExpressionStatement":{let expressionResult=parseExpression(rootNode.expression);expressionResult!=null&&(parsingResult=expressionResult);break}default:break}}return parsingResult}function inspectValue(value){try{return{...parse(value)}}catch{}return{inferredType:{type:"Unknown"}}}var MAX_FUNC_LENGTH=150;function createTypeDef({name,short,compact,full,inferredType}){return{name,short,compact,full:full??short,inferredType}}function cleanPropTypes(value){return value.replace(/PropTypes./g,"").replace(/.isRequired/g,"")}function splitIntoLines(value){return value.split(/\r?\n/)}function prettyObject(ast,compact=!1){return cleanPropTypes(generateObjectCode(ast,compact))}function prettyArray(ast,compact=!1){return cleanPropTypes(generateCode(ast,compact))}function getCaptionForInspectionType(type){switch(type){case"Object":return OBJECT_CAPTION;case"Array":return ARRAY_CAPTION;case"Class":return CLASS_CAPTION;case"Function":return FUNCTION_CAPTION;case"Element":return ELEMENT_CAPTION;default:return CUSTOM_CAPTION}}function generateTypeFromString(value,originalTypeName){let{inferredType,ast}=inspectValue(value),{type}=inferredType,short,compact,full;switch(type){case"Identifier":case"Literal":short=value,compact=value;break;case"Object":{let{depth}=inferredType;short=OBJECT_CAPTION,compact=depth===1?prettyObject(ast,!0):null,full=prettyObject(ast);break}case"Element":{let{identifier}=inferredType;short=identifier!=null&&!isHtmlTag(identifier)?identifier:ELEMENT_CAPTION,compact=splitIntoLines(value).length===1?value:null,full=value;break}case"Array":{let{depth}=inferredType;short=ARRAY_CAPTION,compact=depth<=2?prettyArray(ast,!0):null,full=prettyArray(ast);break}default:short=getCaptionForInspectionType(type),compact=splitIntoLines(value).length===1?value:null,full=value;break}return createTypeDef({name:originalTypeName,short,compact,full,inferredType:type})}function generateCustom({raw}){return raw!=null?generateTypeFromString(raw,"custom"):createTypeDef({name:"custom",short:CUSTOM_CAPTION,compact:CUSTOM_CAPTION})}function generateFunc(extractedProp){let{jsDocTags}=extractedProp;return jsDocTags!=null&&(jsDocTags.params!=null||jsDocTags.returns!=null)?createTypeDef({name:"func",short:generateShortFuncSignature(jsDocTags.params,jsDocTags.returns),compact:null,full:generateFuncSignature(jsDocTags.params,jsDocTags.returns)}):createTypeDef({name:"func",short:FUNCTION_CAPTION,compact:FUNCTION_CAPTION})}function generateShape(type,extractedProp){let fields=Object.keys(type.value).map(key=>`${key}: ${generateType(type.value[key],extractedProp).full}`).join(", "),{inferredType,ast}=inspectValue(`{ ${fields} }`),{depth}=inferredType;return createTypeDef({name:"shape",short:OBJECT_CAPTION,compact:depth===1&&ast?prettyObject(ast,!0):null,full:ast?prettyObject(ast):null})}function objectOf(of){return`objectOf(${of})`}function generateObjectOf(type,extractedProp){let{short,compact,full}=generateType(type.value,extractedProp);return createTypeDef({name:"objectOf",short:objectOf(short),compact:compact!=null?objectOf(compact):null,full:full&&objectOf(full)})}function generateUnion(type,extractedProp){if(Array.isArray(type.value)){let values=type.value.reduce((acc,v)=>{let{short,compact,full}=generateType(v,extractedProp);return acc.short.push(short),acc.compact.push(compact),acc.full.push(full),acc},{short:[],compact:[],full:[]});return createTypeDef({name:"union",short:values.short.join(" | "),compact:values.compact.every(x=>x!=null)?values.compact.join(" | "):null,full:values.full.join(" | ")})}return createTypeDef({name:"union",short:type.value,compact:null})}function generateEnumValue({value,computed}){return computed?generateTypeFromString(value,"enumvalue"):createTypeDef({name:"enumvalue",short:value,compact:value})}function generateEnum(type){if(Array.isArray(type.value)){let values=type.value.reduce((acc,v)=>{let{short,compact,full}=generateEnumValue(v);return acc.short.push(short),acc.compact.push(compact),acc.full.push(full),acc},{short:[],compact:[],full:[]});return createTypeDef({name:"enum",short:values.short.join(" | "),compact:values.compact.every(x=>x!=null)?values.compact.join(" | "):null,full:values.full.join(" | ")})}return createTypeDef({name:"enum",short:type.value,compact:type.value})}function braceAfter(of){return`${of}[]`}function braceAround(of){return`[${of}]`}function createArrayOfObjectTypeDef(short,compact,full){return createTypeDef({name:"arrayOf",short:braceAfter(short),compact:compact!=null?braceAround(compact):null,full:full&&braceAround(full)})}function generateArray(type,extractedProp){let{name,short,compact,full,inferredType}=generateType(type.value,extractedProp);if(name==="custom"){if(inferredType==="Object")return createArrayOfObjectTypeDef(short,compact,full)}else if(name==="shape")return createArrayOfObjectTypeDef(short,compact,full);return createTypeDef({name:"arrayOf",short:braceAfter(short),compact:braceAfter(short)})}function generateType(type,extractedProp){try{switch(type.name){case"custom":return generateCustom(type);case"func":return generateFunc(extractedProp);case"shape":return generateShape(type,extractedProp);case"instanceOf":return createTypeDef({name:"instanceOf",short:type.value,compact:type.value});case"objectOf":return generateObjectOf(type,extractedProp);case"union":return generateUnion(type,extractedProp);case"enum":return generateEnum(type);case"arrayOf":return generateArray(type,extractedProp);default:return createTypeDef({name:type.name,short:type.name,compact:type.name})}}catch(e){console.error(e)}return createTypeDef({name:"unknown",short:"unknown",compact:"unknown"})}function createType(extractedProp){let{type}=extractedProp.docgenInfo;if(type==null)return null;try{switch(type.name){case"custom":case"shape":case"instanceOf":case"objectOf":case"union":case"enum":case"arrayOf":{let{short,compact,full}=generateType(type,extractedProp);return compact!=null&&!isTooLongForTypeSummary(compact)?createSummaryValue(compact):full?createSummaryValue(short,full):createSummaryValue(short)}case"func":{let{short,full}=generateType(type,extractedProp),summary=short,detail;return full&&full.length<MAX_FUNC_LENGTH?summary=full:full&&(detail=toMultilineSignature(full)),createSummaryValue(summary,detail)}default:return null}}catch(e){console.error(e)}return null}import{createSummaryValue as createSummaryValue4,isTooLongForDefaultValueSummary as isTooLongForDefaultValueSummary3}from"@storybook/docs-tools";import{createSummaryValue as createSummaryValue2,isTooLongForDefaultValueSummary}from"@storybook/docs-tools";function generateObject({inferredType,ast}){let{depth}=inferredType;if(depth===1){let compactObject=generateObjectCode(ast,!0);if(!isTooLongForDefaultValueSummary(compactObject))return createSummaryValue2(compactObject)}return createSummaryValue2(OBJECT_CAPTION,generateObjectCode(ast))}import{createSummaryValue as createSummaryValue3,isTooLongForDefaultValueSummary as isTooLongForDefaultValueSummary2}from"@storybook/docs-tools";function generateArray2({inferredType,ast}){let{depth}=inferredType;if(depth<=2){let compactArray=generateArrayCode(ast,!0);if(!isTooLongForDefaultValueSummary2(compactArray))return createSummaryValue3(compactArray)}return createSummaryValue3(ARRAY_CAPTION,generateArrayCode(ast))}function getPrettyFuncIdentifier(identifier,hasArguments){return hasArguments?`${identifier}( ... )`:`${identifier}()`}function getPrettyElementIdentifier(identifier){return`<${identifier} />`}function getPrettyIdentifier(inferredType){let{type,identifier}=inferredType;switch(type){case"Function":return getPrettyFuncIdentifier(identifier,inferredType.hasParams);case"Element":return getPrettyElementIdentifier(identifier);default:return identifier}}function generateFunc2({inferredType,ast}){let{identifier}=inferredType;if(identifier!=null)return createSummaryValue4(getPrettyIdentifier(inferredType),generateCode(ast));let prettyCaption=generateCode(ast,!0);return isTooLongForDefaultValueSummary3(prettyCaption)?createSummaryValue4(FUNCTION_CAPTION,generateCode(ast)):createSummaryValue4(prettyCaption)}function generateElement(defaultValue,inspectionResult){let{inferredType}=inspectionResult,{identifier}=inferredType;if(identifier!=null&&!isHtmlTag(identifier)){let prettyIdentifier=getPrettyIdentifier(inferredType);return createSummaryValue4(prettyIdentifier,defaultValue)}return isTooLongForDefaultValueSummary3(defaultValue)?createSummaryValue4(ELEMENT_CAPTION,defaultValue):createSummaryValue4(defaultValue)}function createDefaultValue(defaultValue){try{let inspectionResult=inspectValue(defaultValue);switch(inspectionResult.inferredType.type){case"Object":return generateObject(inspectionResult);case"Function":return generateFunc2(inspectionResult);case"Element":return generateElement(defaultValue,inspectionResult);case"Array":return generateArray2(inspectionResult);default:return null}}catch(e){console.error(e)}return null}import isPlainObject from"lodash/isPlainObject.js";import isFunction from"lodash/isFunction.js";import isString from"lodash/isString.js";import reactElementToJSXString from"react-element-to-jsx-string";import{createSummaryValue as createSummaryValue5,isTooLongForDefaultValueSummary as isTooLongForDefaultValueSummary4}from"@storybook/docs-tools";function isReactElement(element){return element.$$typeof!=null}function extractFunctionName(func,propName){let{name}=func;return name!==""&&name!=="anonymous"&&name!==propName?name:null}var stringResolver=rawDefaultProp=>createSummaryValue5(JSON.stringify(rawDefaultProp));function generateReactObject(rawDefaultProp){let{type}=rawDefaultProp,{displayName}=type,jsx2=reactElementToJSXString(rawDefaultProp,{});if(displayName!=null){let prettyIdentifier=getPrettyElementIdentifier(displayName);return createSummaryValue5(prettyIdentifier,jsx2)}if(isString(type)&&isHtmlTag(type)){let jsxSummary=reactElementToJSXString(rawDefaultProp,{tabStop:0}).replace(/\r?\n|\r/g,"");if(!isTooLongForDefaultValueSummary4(jsxSummary))return createSummaryValue5(jsxSummary)}return createSummaryValue5(ELEMENT_CAPTION,jsx2)}var objectResolver=rawDefaultProp=>{if(isReactElement(rawDefaultProp)&&rawDefaultProp.type!=null)return generateReactObject(rawDefaultProp);if(isPlainObject(rawDefaultProp)){let inspectionResult=inspectValue(JSON.stringify(rawDefaultProp));return generateObject(inspectionResult)}if(Array.isArray(rawDefaultProp)){let inspectionResult=inspectValue(JSON.stringify(rawDefaultProp));return generateArray2(inspectionResult)}return createSummaryValue5(OBJECT_CAPTION)},functionResolver=(rawDefaultProp,propDef)=>{let isElement=!1,inspectionResult;if(isFunction(rawDefaultProp.render))isElement=!0;else if(rawDefaultProp.prototype!=null&&isFunction(rawDefaultProp.prototype.render))isElement=!0;else{let innerElement;try{inspectionResult=inspectValue(rawDefaultProp.toString());let{hasParams,params}=inspectionResult.inferredType;hasParams?params.length===1&&params[0].type==="ObjectPattern"&&(innerElement=rawDefaultProp({})):innerElement=rawDefaultProp(),innerElement!=null&&isReactElement(innerElement)&&(isElement=!0)}catch{}}let funcName=extractFunctionName(rawDefaultProp,propDef.name);if(funcName!=null){if(isElement)return createSummaryValue5(getPrettyElementIdentifier(funcName));inspectionResult!=null&&(inspectionResult=inspectValue(rawDefaultProp.toString()));let{hasParams}=inspectionResult.inferredType;return createSummaryValue5(getPrettyFuncIdentifier(funcName,hasParams))}return createSummaryValue5(isElement?ELEMENT_CAPTION:FUNCTION_CAPTION)},defaultResolver=rawDefaultProp=>createSummaryValue5(rawDefaultProp.toString()),DEFAULT_TYPE_RESOLVERS={string:stringResolver,object:objectResolver,function:functionResolver,default:defaultResolver};function createTypeResolvers(customResolvers={}){return{...DEFAULT_TYPE_RESOLVERS,...customResolvers}}function createDefaultValueFromRawDefaultProp(rawDefaultProp,propDef,typeResolvers=DEFAULT_TYPE_RESOLVERS){try{switch(typeof rawDefaultProp){case"string":return typeResolvers.string(rawDefaultProp,propDef);case"object":return typeResolvers.object(rawDefaultProp,propDef);case"function":return typeResolvers.function(rawDefaultProp,propDef);default:return typeResolvers.default(rawDefaultProp,propDef)}}catch(e){console.error(e)}return null}function keepOriginalDefinitionOrder(extractedProps,component){let{propTypes}=component;return propTypes!=null?Object.keys(propTypes).map(x=>extractedProps.find(y=>y.name===x)).filter(Boolean):extractedProps}import{createSummaryValue as createSummaryValue6}from"@storybook/docs-tools";var funcResolver=(rawDefaultProp,{name,type})=>{let isElement=type.summary==="element"||type.summary==="elementType",funcName=extractFunctionName(rawDefaultProp,name);if(funcName!=null){if(isElement)return createSummaryValue6(getPrettyElementIdentifier(funcName));let{hasParams}=inspectValue(rawDefaultProp.toString()).inferredType;return createSummaryValue6(getPrettyFuncIdentifier(funcName,hasParams))}return createSummaryValue6(isElement?ELEMENT_CAPTION:FUNCTION_CAPTION)},rawDefaultPropTypeResolvers=createTypeResolvers({function:funcResolver});function enhancePropTypesProp(extractedProp,rawDefaultProp){let{propDef}=extractedProp,newtype=createType(extractedProp);newtype!=null&&(propDef.type=newtype);let{defaultValue}=extractedProp.docgenInfo;if(defaultValue!=null&&defaultValue.value!=null){let newDefaultValue=createDefaultValue(defaultValue.value);newDefaultValue!=null&&(propDef.defaultValue=newDefaultValue)}else if(rawDefaultProp!=null){let newDefaultValue=createDefaultValueFromRawDefaultProp(rawDefaultProp,propDef,rawDefaultPropTypeResolvers);newDefaultValue!=null&&(propDef.defaultValue=newDefaultValue)}return propDef}function enhancePropTypesProps(extractedProps,component){let rawDefaultProps=component.defaultProps!=null?component.defaultProps:{},enhancedProps=extractedProps.map(x=>enhancePropTypesProp(x,rawDefaultProps[x.propDef.name]));return keepOriginalDefinitionOrder(enhancedProps,component)}function enhanceTypeScriptProp(extractedProp,rawDefaultProp){let{propDef}=extractedProp,{defaultValue}=extractedProp.docgenInfo;if(defaultValue!=null&&defaultValue.value!=null){let newDefaultValue=createDefaultValue(defaultValue.value);newDefaultValue!=null&&(propDef.defaultValue=newDefaultValue)}else if(rawDefaultProp!=null){let newDefaultValue=createDefaultValueFromRawDefaultProp(rawDefaultProp,propDef);newDefaultValue!=null&&(propDef.defaultValue=newDefaultValue)}return propDef}function enhanceTypeScriptProps(extractedProps){return extractedProps.map(prop=>enhanceTypeScriptProp(prop))}var propTypesMap=new Map;Object.keys(PropTypes).forEach(typeName=>{let type=PropTypes[typeName];propTypesMap.set(type,typeName),propTypesMap.set(type.isRequired,typeName)});function getPropDefs(component,section){let processedComponent=component;!hasDocgen(component)&&!component.propTypes&&isMemo(component)&&(processedComponent=component.type);let extractedProps=extractComponentProps(processedComponent,section);if(extractedProps.length===0)return[];switch(extractedProps[0].typeSystem){case TypeSystem.JAVASCRIPT:return enhancePropTypesProps(extractedProps,component);case TypeSystem.TYPESCRIPT:return enhanceTypeScriptProps(extractedProps);default:return extractedProps.map(x=>x.propDef)}}var extractProps=component=>({rows:getPropDefs(component,"props")});var extractArgTypes=component=>{if(component){let{rows}=extractProps(component);if(rows)return rows.reduce((acc,row)=>{let{name,description,type,sbType,defaultValue:defaultSummary,jsDocTags,required}=row;return acc[name]={name,description,type:{required,...sbType},table:{type,jsDocTags,defaultValue:defaultSummary}},acc},{})}return null};import React,{isValidElement,createElement}from"react";import reactElementToJSXString2 from"react-element-to-jsx-string";import{addons,useEffect}from"@storybook/preview-api";import{SourceType,SNIPPET_RENDERED,getDocgenSection}from"@storybook/docs-tools";import{logger}from"@storybook/client-logger";function simplifyNodeForStringify(node){if(isValidElement(node)){let props=Object.keys(node.props).reduce((acc,cur)=>(acc[cur]=simplifyNodeForStringify(node.props[cur]),acc),{});return{...node,props,_owner:null}}return Array.isArray(node)?node.map(simplifyNodeForStringify):node}var applyTransformSource=(domString,options,context)=>typeof options.transformSource!="function"?domString:options.transformSource(domString,context),renderJsx=(code,options)=>{if(typeof code>"u")return logger.warn("Too many skip or undefined component"),null;let renderedJSX=code,Type=renderedJSX.type;for(let i=0;i<options.skip;i+=1){if(typeof renderedJSX>"u")return logger.warn("Cannot skip undefined element"),null;if(React.Children.count(renderedJSX)>1)return logger.warn("Trying to skip an array of elements"),null;typeof renderedJSX.props.children>"u"?(logger.warn("Not enough children to skip elements."),typeof renderedJSX.type=="function"&&renderedJSX.type.name===""&&(renderedJSX=React.createElement(Type,{...renderedJSX.props}))):typeof renderedJSX.props.children=="function"?renderedJSX=renderedJSX.props.children():renderedJSX=renderedJSX.props.children}let opts={...typeof options.displayName=="string"?{showFunctions:!0,displayName:()=>options.displayName}:{displayName:el=>el.type.displayName||(el.type===Symbol.for("react.profiler")?"Profiler":null)||getDocgenSection(el.type,"displayName")||(el.type.name!=="_default"?el.type.name:null)||(typeof el.type=="function"?"No Display Name":null)||(isForwardRef(el.type)?el.type.render.name:null)||(isMemo(el.type)?el.type.type.name:null)||el.type},...{filterProps:(value,key)=>value!==void 0},...options};return React.Children.map(code,c=>{let child=typeof c=="number"?c.toString():c,string=(typeof reactElementToJSXString2=="function"?reactElementToJSXString2:reactElementToJSXString2.default)(simplifyNodeForStringify(child),opts);if(string.indexOf("&quot;")>-1){let matches=string.match(/\S+=\\"([^"]*)\\"/g);matches&&matches.forEach(match=>{string=string.replace(match,match.replace(/&quot;/g,"'"))})}return string}).join(`
`).replace(/function\s+noRefCheck\(\)\s+\{\}/g,"() => {}")},defaultOpts={skip:0,showFunctions:!1,enableBeautify:!0,showDefaultProps:!1},skipJsxRender=context=>{let sourceParams=context?.parameters.docs?.source,isArgsStory=context?.parameters.__isArgsStory;return sourceParams?.type===SourceType.DYNAMIC?!1:!isArgsStory||sourceParams?.code||sourceParams?.type===SourceType.CODE},isMdx=node=>node.type?.displayName==="MDXCreateElement"&&!!node.props?.mdxType,mdxToJsx=node=>{if(!isMdx(node))return node;let{mdxType,originalType,children,...rest}=node.props,jsxChildren=[];return children&&(jsxChildren=(Array.isArray(children)?children:[children]).map(mdxToJsx)),createElement(originalType,rest,...jsxChildren)},jsxDecorator=(storyFn,context)=>{let channel=addons.getChannel(),skip=skipJsxRender(context),jsx2="";useEffect(()=>{if(!skip){let{id,args}=context;channel.emit(SNIPPET_RENDERED,{id,source:jsx2,args})}});let story=storyFn();if(skip)return story;let options={...defaultOpts,...context?.parameters.jsx||{}},storyJsx=context?.parameters.docs?.source?.excludeDecorators?context.originalStoryFn(context.args,context):story,sourceJsx=mdxToJsx(storyJsx),rendered=renderJsx(sourceJsx,options);return rendered&&(jsx2=applyTransformSource(rendered,options,context)),story};var parameters={docs:{story:{inline:!0},extractArgTypes,extractComponentDescription}},decorators=[jsxDecorator],argTypesEnhancers=[enhanceArgTypes];var parameters2={renderer:"react",...parameters};export{argTypesEnhancers,decorators,parameters2 as parameters,render,renderToCanvas};
