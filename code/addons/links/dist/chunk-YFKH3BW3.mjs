import{PARAM_KEY}from"./chunk-JT3VIYBO.mjs";import{global}from"@storybook/global";import{addons,makeDecorator}from"@storybook/preview-api";import{STORY_CHANGED,SELECT_STORY}from"@storybook/core-events";import{toId}from"@storybook/csf";var{document,HTMLElement}=global;function parseQuery(queryString){let query={},pairs=(queryString[0]==="?"?queryString.substring(1):queryString).split("&").filter(Boolean);for(let i=0;i<pairs.length;i++){let pair=pairs[i].split("=");query[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1]||"")}return query}var navigate=params=>addons.getChannel().emit(SELECT_STORY,params),hrefTo=(title,name)=>new Promise(resolve=>{let{location}=document,query=parseQuery(location.search),existingId=[].concat(query.id)[0],titleToLink=title||existingId.split("--",2)[0],id=toId(titleToLink,name),url=`${location.origin+location.pathname}?${Object.entries({...query,id}).map(item=>`${item[0]}=${item[1]}`).join("&")}`;resolve(url)}),valueOrCall=args=>value=>typeof value=="function"?value(...args):value,linkTo=(idOrTitle,nameInput)=>(...args)=>{let resolver=valueOrCall(args),title=resolver(idOrTitle),name=nameInput?resolver(nameInput):!1;title?.match(/--/)&&!name?navigate({storyId:title}):name&&title?navigate({kind:title,story:name}):title?navigate({kind:title}):name&&navigate({story:name})},linksListener=e=>{let{target}=e;if(!(target instanceof HTMLElement))return;let element=target,{sbKind:kind,sbStory:story}=element.dataset;(kind||story)&&(e.preventDefault(),navigate({kind,story}))},hasListener=!1,on=()=>{hasListener||(hasListener=!0,document.addEventListener("click",linksListener))},off=()=>{hasListener&&(hasListener=!1,document.removeEventListener("click",linksListener))},withLinks=makeDecorator({name:"withLinks",parameterName:PARAM_KEY,wrapper:(getStory,context)=>(on(),addons.getChannel().once(STORY_CHANGED,off),getStory(context))});export{navigate,hrefTo,linkTo,withLinks};
