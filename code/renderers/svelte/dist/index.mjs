import{decorateStory,render,renderToCanvas}from"./chunk-L4OAT24I.mjs";import{global}from"@storybook/global";var{window:globalWindow}=global;globalWindow.STORYBOOK_ENV="svelte";import{start}from"@storybook/preview-api";var{configure:coreConfigure,clientApi,forceReRender}=start(renderToCanvas,{decorateStory,render}),{raw}=clientApi,RENDERER="svelte",storiesOf=(kind,m)=>clientApi.storiesOf(kind,m).addParameters({renderer:RENDERER}),configure=(loadable,m)=>coreConfigure(RENDERER,loadable,m);module?.hot?.decline();export{configure,forceReRender,raw,storiesOf};
