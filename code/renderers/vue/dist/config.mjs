import{decorateStory,render,renderToCanvas}from"./chunk-DOPQCPG5.mjs";import{extractComponentDescription,enhanceArgTypes}from"@storybook/docs-tools";import{hasDocgen,extractComponentProps,convert}from"@storybook/docs-tools";var SECTIONS=["props","events","slots","methods"];function inferEnum(propDef,docgenInfo){let{type,values}=docgenInfo;if(!(Array.isArray(values)&&values.length&&type&&type.name!=="enum"))return!1;let enumString=values.join(", "),{summary}=propDef.type;return summary=summary?`${summary}: ${enumString}`:enumString,Object.assign(propDef.type,{...propDef.type,name:"enum",value:values,summary}),propDef}function verifyPropDef(propDef,docgenInfo){let def=propDef,isChanged=!1,callbacks=[inferEnum];for(let i=0,len=callbacks.length;i<len;i+=1){let matched=callbacks[i](propDef,docgenInfo);matched&&(def=matched,isChanged=!0)}return[def,isChanged]}var extractArgTypes=component=>{if(!hasDocgen(component))return null;let results={};return SECTIONS.forEach(section=>{extractComponentProps(component,section).forEach(({propDef,docgenInfo,jsDocTags})=>{let[result,isPropDefChanged]=verifyPropDef(propDef,docgenInfo),{name,type,description,defaultValue:defaultSummary,required}=result,sbType;isPropDefChanged?sbType=type:sbType=section==="props"?convert(docgenInfo):{name:"void"},results[name]={name,description,type:{required,...sbType},table:{type,jsDocTags,defaultValue:defaultSummary,category:section}}})}),results};import{addons}from"@storybook/preview-api";import{logger}from"@storybook/client-logger";import{SourceType,SNIPPET_RENDERED}from"@storybook/docs-tools";var skipSourceRender=context=>{let sourceParams=context?.parameters.docs?.source,isArgsStory=context?.parameters.__isArgsStory;return sourceParams?.type===SourceType.DYNAMIC?!1:!isArgsStory||sourceParams?.code||sourceParams?.type===SourceType.CODE},sourceDecorator=(storyFn,context)=>{let story=storyFn();if(skipSourceRender(context))return story;let channel=addons.getChannel(),storyComponent=getStoryComponent(story.options.STORYBOOK_WRAPS);return{components:{Story:story},mounted(){if(this._vnode)try{let storyNode=lookupStoryInstance(this,storyComponent),code=vnodeToString(storyNode._vnode),{id,args}=context;channel.emit(SNIPPET_RENDERED,{id,args,source:`<template>${code}</template>`,format:"vue"})}catch(e){logger.warn(`Failed to generate dynamic story source: ${e}`)}},template:"<story />"}};function vnodeToString(vnode){let attrString=[...vnode.data?.slot?[["slot",vnode.data.slot]]:[],["class",stringifyClassAttribute(vnode)],...vnode.componentOptions?.propsData?Object.entries(vnode.componentOptions.propsData):[],...vnode.data?.attrs?Object.entries(vnode.data.attrs):[]].filter(([name],index,list)=>list.findIndex(item=>item[0]===name)===index).map(([name,value])=>stringifyAttr(name,value)).filter(Boolean).join(" ");if(!vnode.componentOptions)return vnode.tag?vnode.children?`<${vnode.tag} ${attrString}>${vnode.children.map(vnodeToString).join("")}</${vnode.tag}>`:`<${vnode.tag} ${attrString}/>`:vnode.text?/[<>"&]/.test(vnode.text)?`{{\`${vnode.text.replace(/`/g,"\\`")}\`}}`:vnode.text:"";let tag=vnode.componentOptions.tag||vnode.tag||"unknown-component";return vnode.componentOptions.children?`<${tag} ${attrString}>${vnode.componentOptions.children.map(vnodeToString).join("")}</${tag}>`:`<${tag} ${attrString}/>`}function stringifyClassAttribute(vnode){if(!(!vnode.data||!vnode.data.staticClass&&!vnode.data.class))return[...vnode.data.staticClass?.split(" ")??[],...normalizeClassBinding(vnode.data.class)].filter(Boolean).join(" ")||void 0}function normalizeClassBinding(binding){return binding?typeof binding=="string"?[binding]:binding instanceof Array?binding.map(normalizeClassBinding).reduce((a,b)=>[...a,...b],[]):typeof binding=="object"?Object.entries(binding).filter(([,active])=>!!active).map(([className])=>className):[]:[]}function stringifyAttr(attrName,value){return typeof value>"u"||typeof value=="function"?null:value===!0?attrName:typeof value=="string"?`${attrName}=${quote(value)}`:`:${attrName}=${quote(JSON.stringify(value))}`}function quote(value){return value.includes('"')&&!value.includes("'")?`'${value}'`:`"${value.replace(/"/g,"&quot;")}"`}function getStoryComponent(w){let matched=w;for(;matched&&matched.options&&matched.options.components&&matched.options.components.story&&matched.options.components.story.options&&matched.options.components.story.options.STORYBOOK_WRAPS;)matched=matched.options.components.story.options.STORYBOOK_WRAPS;return matched}function lookupStoryInstance(instance,storyComponent){if(instance.$vnode&&instance.$vnode.componentOptions&&instance.$vnode.componentOptions.Ctor===storyComponent)return instance;for(let i=0,l=instance.$children.length;i<l;i+=1){let found=lookupStoryInstance(instance.$children[i],storyComponent);if(found)return found}return null}var parameters={docs:{story:{inline:!0,iframeHeight:"120px"},extractArgTypes,extractComponentDescription}},decorators=[sourceDecorator],argTypesEnhancers=[enhanceArgTypes];var parameters2={renderer:"vue",...parameters};export{decorateStory as applyDecorators,argTypesEnhancers,decorators,parameters2 as parameters,render,renderToCanvas};
