import{__require}from"../chunk-GYZG6JM4.mjs";import{dirname,join,resolve}from"path";import{DefinePlugin,HotModuleReplacementPlugin,ProgressPlugin,ProvidePlugin}from"webpack";import HtmlWebpackPlugin from"html-webpack-plugin";import CaseSensitivePathsPlugin from"case-sensitive-paths-webpack-plugin";import TerserWebpackPlugin from"terser-webpack-plugin";import VirtualModulePlugin from"webpack-virtual-modules";import ForkTsCheckerWebpackPlugin from"fork-ts-checker-webpack-plugin";import slash from"slash";import{globals}from"@storybook/preview/globals";import{getBuilderOptions,getRendererName,stringifyProcessEnvs,handlebars,interpolate,normalizeStories,readTemplate,loadPreviewOrConfigFile,isPreservingSymlinks}from"@storybook/core-common";import{toRequireContextString,toImportFn}from"@storybook/core-webpack";import{dedent}from"ts-dedent";import{getProjectRoot}from"@storybook/core-common";var createBabelLoader=(options,typescriptOptions)=>({test:typescriptOptions.skipBabel?/\.(mjs|jsx?)$/:/\.(mjs|tsx?|jsx?)$/,use:[{loader:__require.resolve("babel-loader"),options}],include:[getProjectRoot()],exclude:/node_modules/});var storybookPaths={global:dirname(__require.resolve("@storybook/global/package.json")),...["api","components","global","manager-api","router","theming"].reduce((acc,sbPackage)=>({...acc,[`@storybook/${sbPackage}`]:dirname(__require.resolve(`@storybook/${sbPackage}/package.json`))}),{}),["@storybook/api"]:dirname(__require.resolve("@storybook/manager-api/package.json"))},iframe_webpack_config_default=async options=>{let{outputDir=join(".","public"),quiet,packageJson,configType,presets,previewUrl,babelOptions,typescriptOptions,features,serverChannelUrl}=options,isProd=configType==="PRODUCTION",workingDir=process.cwd(),[coreOptions,frameworkOptions,envs,logLevel,headHtmlSnippet,bodyHtmlSnippet,template,docsOptions,entries2,nonNormalizedStories,modulesCount=1e3]=await Promise.all([presets.apply("core"),presets.apply("frameworkOptions"),presets.apply("env"),presets.apply("logLevel",void 0),presets.apply("previewHead"),presets.apply("previewBody"),presets.apply("previewMainTemplate"),presets.apply("docs"),presets.apply("entries",[]),presets.apply("stories",[]),options.cache?.get("modulesCount").catch(()=>{})]),stories=normalizeStories(nonNormalizedStories,{configDir:options.configDir,workingDir}),builderOptions=await getBuilderOptions(options),previewAnnotations=[...(await presets.apply("previewAnnotations",[],options)).map(entry=>typeof entry=="object"?entry.absolute:slash(entry)),loadPreviewOrConfigFile(options)].filter(Boolean),virtualModuleMapping={};if(features?.storyStoreV7){let storiesFilename="storybook-stories.js",storiesPath=resolve(join(workingDir,storiesFilename)),needPipelinedImport=!!builderOptions.lazyCompilation&&!isProd;virtualModuleMapping[storiesPath]=toImportFn(stories,{needPipelinedImport});let configEntryPath=resolve(join(workingDir,"storybook-config-entry.js"));virtualModuleMapping[configEntryPath]=handlebars(await readTemplate(__require.resolve("@storybook/builder-webpack5/templates/virtualModuleModernEntry.js.handlebars")),{storiesFilename,previewAnnotations}).replace(/\\/g,"\\\\"),entries2.push(configEntryPath)}else{let rendererName=await getRendererName(options),rendererInitEntry=resolve(join(workingDir,"storybook-init-renderer-entry.js"));virtualModuleMapping[rendererInitEntry]=`import '${rendererName}';`,entries2.push(rendererInitEntry);let entryTemplate=await readTemplate(join(__dirname,"..","..","templates","virtualModuleEntry.template.js"));if(previewAnnotations.forEach(previewAnnotationFilename=>{if(!previewAnnotationFilename)return;let entryFilename=previewAnnotationFilename.startsWith(".")?`${previewAnnotationFilename.replace(/(\w)(\/|\\)/g,"$1-")}-generated-config-entry.js`:`${previewAnnotationFilename}-generated-config-entry.js`;virtualModuleMapping[entryFilename]=interpolate(entryTemplate,{previewAnnotationFilename}),entries2.push(entryFilename)}),stories.length>0){let storyTemplate=await readTemplate(join(__dirname,"..","..","templates","virtualModuleStory.template.js")),storiesFilename=resolve(join(workingDir,"generated-stories-entry.cjs"));virtualModuleMapping[storiesFilename]=interpolate(storyTemplate,{rendererName}).replace("'{{stories}}'",stories.map(toRequireContextString).join(",")),entries2.push(storiesFilename)}}let shouldCheckTs=typescriptOptions.check&&!typescriptOptions.skipBabel,tsCheckOptions=typescriptOptions.checkOptions||{},cacheConfig=builderOptions.fsCache?{cache:{type:"filesystem"}}:{},lazyCompilationConfig=builderOptions.lazyCompilation&&!isProd?{lazyCompilation:{entries:!1}}:{};if(!template)throw new Error(dedent`
      Storybook's Webpack5 builder requires a template to be specified.
      Somehow you've ended up with a falsy value for the template option.

      Please file an issue at https://github.com/storybookjs/storybook with a reproduction.
    `);return{name:"preview",mode:isProd?"production":"development",bail:isProd,devtool:"cheap-module-source-map",entry:entries2,output:{path:resolve(process.cwd(),outputDir),filename:isProd?"[name].[contenthash:8].iframe.bundle.js":"[name].iframe.bundle.js",publicPath:""},stats:{preset:"none",logging:"error"},watchOptions:{ignored:/node_modules/},externals:globals,ignoreWarnings:[{message:/export '\S+' was not found in 'global'/},{message:/export '\S+' was not found in '@storybook\/global'/}],plugins:[Object.keys(virtualModuleMapping).length>0?new VirtualModulePlugin(virtualModuleMapping):null,new HtmlWebpackPlugin({filename:"iframe.html",chunksSortMode:"none",alwaysWriteToDisk:!0,inject:!1,template,templateParameters:{version:packageJson.version,globals:{CONFIG_TYPE:configType,LOGLEVEL:logLevel,FRAMEWORK_OPTIONS:frameworkOptions,CHANNEL_OPTIONS:coreOptions.channelOptions,FEATURES:features,PREVIEW_URL:previewUrl,STORIES:stories.map(specifier=>({...specifier,importPathMatcher:specifier.importPathMatcher.source})),DOCS_OPTIONS:docsOptions,SERVER_CHANNEL_URL:serverChannelUrl},headHtmlSnippet,bodyHtmlSnippet},minify:{collapseWhitespace:!0,removeComments:!0,removeRedundantAttributes:!0,removeScriptTypeAttributes:!1,removeStyleLinkTypeAttributes:!0,useShortDoctype:!0}}),new DefinePlugin({...stringifyProcessEnvs(envs),NODE_ENV:JSON.stringify(process.env.NODE_ENV)}),new ProvidePlugin({process:__require.resolve("process/browser.js")}),isProd?null:new HotModuleReplacementPlugin,new CaseSensitivePathsPlugin,quiet?null:new ProgressPlugin({modulesCount}),shouldCheckTs?new ForkTsCheckerWebpackPlugin(tsCheckOptions):null].filter(Boolean),module:{rules:[{test:/\.m?js$/,type:"javascript/auto"},{test:/\.m?js$/,resolve:{fullySpecified:!1}},createBabelLoader(babelOptions,typescriptOptions),{test:/\.md$/,type:"asset/source"}]},resolve:{extensions:[".mjs",".js",".jsx",".ts",".tsx",".json",".cjs"],modules:["node_modules"].concat(envs.NODE_PATH||[]),mainFields:["browser","module","main"].filter(Boolean),alias:storybookPaths,fallback:{path:__require.resolve("path-browserify"),assert:__require.resolve("browser-assert"),util:__require.resolve("util")},symlinks:!isPreservingSymlinks()},optimization:{splitChunks:{chunks:"all"},runtimeChunk:!0,sideEffects:!0,usedExports:isProd,moduleIds:"named",minimizer:isProd?[new TerserWebpackPlugin({parallel:!0,terserOptions:{sourceMap:!0,mangle:!1,keep_fnames:!0}})]:[]},performance:{hints:isProd?"warning":!1},...cacheConfig,experiments:{...lazyCompilationConfig}}};var webpack=async(_,options)=>iframe_webpack_config_default(options),entries=async(_,options)=>{let result=[];return options.configType==="DEVELOPMENT"&&(result=result.concat(`${__require.resolve("webpack-hot-middleware/client")}?reload=true&quiet=false&noInfo=${options.quiet}`)),result},babel=async(config,options)=>({...config,overrides:[...config?.overrides||[],{test:/\.(story|stories).*$/,plugins:[__require.resolve("babel-plugin-named-exports-order")]}]}),previewMainTemplate=()=>__require.resolve("@storybook/builder-webpack5/templates/preview.ejs");export{babel,entries,previewMainTemplate,webpack};
