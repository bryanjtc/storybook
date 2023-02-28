import{global}from"@storybook/global";import{dedent}from"ts-dedent";import{simulatePageLoad,simulateDOMContentLoaded}from"@storybook/preview-api";var{fetch,Node}=global,defaultFetchStoryHtml=async(url,path,params,storyContext)=>{let fetchUrl=new URL(`${url}/${path}`);return fetchUrl.search=new URLSearchParams({...storyContext.globals,...params}).toString(),(await fetch(fetchUrl)).text()},buildStoryArgs=(args,argTypes)=>{let storyArgs={...args};return Object.keys(argTypes).forEach(key=>{let argType=argTypes[key],{control}=argType,controlType=control&&control.type.toLowerCase(),argValue=storyArgs[key];switch(controlType){case"date":storyArgs[key]=new Date(argValue).toISOString();break;case"object":storyArgs[key]=JSON.stringify(argValue);break;default:}}),storyArgs},render=args=>{};async function renderToCanvas({id,title,name,showMain,showError,forceRemount,storyFn,storyContext,storyContext:{parameters,args,argTypes}},canvasElement){storyFn();let storyArgs=buildStoryArgs(args,argTypes),{server:{url,id:storyId,fetchStoryHtml=defaultFetchStoryHtml,params}}=parameters,fetchId=storyId||id,storyParams={...params,...storyArgs},element=await fetchStoryHtml(url,fetchId,storyParams,storyContext);if(showMain(),typeof element=="string")canvasElement.innerHTML=element,simulatePageLoad(canvasElement);else if(element instanceof Node){if(canvasElement.firstChild===element&&forceRemount===!1)return;canvasElement.innerHTML="",canvasElement.appendChild(element),simulateDOMContentLoaded()}else showError({title:`Expecting an HTML snippet or DOM node from the story: "${name}" of "${title}".`,description:dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}export{render,renderToCanvas};
