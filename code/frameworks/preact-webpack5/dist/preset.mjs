var __require=(x=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(x,{get:(a,b)=>(typeof require<"u"?require:a)[b]}):x)(function(x){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+x+'" is not supported')});import path from"path";var addons=[path.dirname(__require.resolve(path.join("@storybook/preset-preact-webpack","package.json")))],core=async(config,options)=>{let framework=await options.presets.apply("framework");return{...config,builder:{name:path.dirname(__require.resolve(path.join("@storybook/builder-webpack5","package.json"))),options:typeof framework=="string"?{}:framework.options.builder||{}},renderer:path.dirname(__require.resolve(path.join("@storybook/preact","package.json")))}};export{addons,core};
