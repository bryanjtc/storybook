import{decorateStory,render,renderToCanvas}from"./chunk-DOPQCPG5.mjs";import{global}from"@storybook/global";var{window:globalWindow}=global;globalWindow.STORYBOOK_ENV="vue";import{start}from"@storybook/preview-api";var RENDERER="vue",api=start(renderToCanvas,{decorateStory,render}),storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:RENDERER}),configure=(...args)=>api.configure(RENDERER,...args),forceReRender=api.forceReRender,raw=api.clientApi.raw;module?.hot?.decline();export{configure,forceReRender,raw,storiesOf};
