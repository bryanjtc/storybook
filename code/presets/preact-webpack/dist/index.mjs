var __require=(x=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(x,{get:(a,b)=>(typeof require<"u"?require:a)[b]}):x)(function(x){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+x+'" is not supported')});import path from"path";var babel=(config,options)=>({...config,plugins:[[__require.resolve("@babel/plugin-transform-react-jsx"),{importSource:"preact",runtime:"automatic"}],...(config.plugins||[]).filter(p=>{let name=Array.isArray(p)?p[0]:p;return typeof name=="string"?!name.includes("plugin-transform-react-jsx"):!0})],overrides:[{exclude:"**/node_modules/**",presets:[__require.resolve("@babel/preset-typescript")]}]}),webpackFinal=config=>({...config,resolve:{...config.resolve,alias:{...config.resolve?.alias||{},react:path.dirname(__require.resolve("preact/compat/package.json")),"react-dom/test-utils":path.dirname(__require.resolve("preact/test-utils/package.json")),"react-dom":path.dirname(__require.resolve("preact/compat/package.json")),"react/jsx-runtime":path.dirname(__require.resolve("preact/jsx-runtime/package.json"))}}});export{babel,webpackFinal};
