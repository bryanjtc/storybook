"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var src_exports={};__export(src_exports,{bail:()=>bail,build:()=>build2,hasVitePlugins:()=>hasVitePlugins,start:()=>start,withoutVitePlugins:()=>withoutVitePlugins});module.exports=__toCommonJS(src_exports);var fs2=__toESM(require("fs-extra")),import_express=__toESM(require("express")),import_path3=require("path");var import_core_common=require("@storybook/core-common");async function transformIframeHtml(html,options){let{configType,features,presets,serverChannelUrl}=options,frameworkOptions=await presets.apply("frameworkOptions"),headHtmlSnippet=await presets.apply("previewHead"),bodyHtmlSnippet=await presets.apply("previewBody"),logLevel=await presets.apply("logLevel",void 0),docsOptions=await presets.apply("docs"),coreOptions=await presets.apply("core"),stories=(0,import_core_common.normalizeStories)(await options.presets.apply("stories",[],options),{configDir:options.configDir,workingDir:process.cwd()}).map(specifier=>({...specifier,importPathMatcher:specifier.importPathMatcher.source}));return html.replace("[CONFIG_TYPE HERE]",configType||"").replace("[LOGLEVEL HERE]",logLevel||"").replace("'[FRAMEWORK_OPTIONS HERE]'",JSON.stringify(frameworkOptions)).replace("'[CHANNEL_OPTIONS HERE]'",JSON.stringify(coreOptions&&coreOptions.channelOptions?coreOptions.channelOptions:{})).replace("'[FEATURES HERE]'",JSON.stringify(features||{})).replace("'[STORIES HERE]'",JSON.stringify(stories||{})).replace("'[DOCS_OPTIONS HERE]'",JSON.stringify(docsOptions||{})).replace("'[SERVER_CHANNEL_URL HERE]'",JSON.stringify(serverChannelUrl)).replace("<!-- [HEAD HTML SNIPPET HERE] -->",headHtmlSnippet||"").replace("<!-- [BODY HTML SNIPPET HERE] -->",bodyHtmlSnippet||"")}var import_vite10=require("vite");var path3=__toESM(require("path")),import_vite8=require("vite"),import_core_common6=require("@storybook/core-common"),import_globals=require("@storybook/preview/globals");var import_es_module_lexer=require("es-module-lexer"),import_magic_string=__toESM(require("magic-string")),import_vite=require("vite"),include=[/\.stories\.([tj])sx?$/,/(stories|story).mdx$/],filter=(0,import_vite.createFilter)(include),injectExportOrderPlugin={name:"storybook:inject-export-order-plugin",enforce:"post",async transform(code,id){if(!filter(id))return;let[,exports]=await(0,import_es_module_lexer.parse)(code);if(exports.includes("__namedExportsOrder"))return;let s=new import_magic_string.default(code),orderedExports=exports.filter(e=>e!=="default");return s.append(`;export const __namedExportsOrder = ${JSON.stringify(orderedExports)};`),{code:s.toString(),map:s.generateMap({hires:!0,source:id})}}};var import_vite2=require("vite"),isStorybookMdx=id=>id.endsWith("stories.mdx")||id.endsWith("story.mdx");async function mdxPlugin(options){let filter2=(0,import_vite2.createFilter)(/\.mdx$/),{features,presets}=options,{mdxPluginOptions,jsxOptions}=await presets.apply("options",{});return{name:"storybook:mdx-plugin",enforce:"pre",async transform(src,id){if(!filter2(id))return;let{compile}=features!=null&&features.legacyMdx1?await import("@storybook/mdx1-csf"):await import("@storybook/mdx2-csf"),mdxLoaderOptions=await options.presets.apply("mdxLoaderOptions",{...mdxPluginOptions,mdxCompileOptions:{providerImportSource:"@storybook/addon-docs/mdx-react-shim",...mdxPluginOptions==null?void 0:mdxPluginOptions.mdxCompileOptions},jsxOptions});return{code:String(await compile(src,{skipCsf:!isStorybookMdx(id),...mdxLoaderOptions})),map:null}}}}var import_vite3=require("vite"),import_magic_string2=__toESM(require("magic-string"));function stripStoryHMRBoundary(){let filter2=(0,import_vite3.createFilter)(/\.stories\.([tj])sx?$/);return{name:"storybook:strip-hmr-boundary-plugin",enforce:"post",async transform(src,id){if(!filter2(id))return;let s=new import_magic_string2.default(src);return s.replace(/import\.meta\.hot\.accept\(\);/,""),{code:s.toString(),map:s.generateMap({hires:!0,source:id})}}}}var fs=__toESM(require("fs"));var import_core_common2=require("@storybook/core-common");var virtualFileId="/virtual:/@storybook/builder-vite/vite-app.js",virtualStoriesFile="/virtual:/@storybook/builder-vite/storybook-stories.js",virtualPreviewFile="/virtual:/@storybook/builder-vite/preview-entry.js",virtualAddonSetupFile="/virtual:/@storybook/builder-vite/setup-addons.js";var import_path2=require("path"),import_slash=__toESM(require("slash"));var import_path=__toESM(require("path")),import_vite4=require("vite");function transformAbsPath(absPath){let splits=absPath.split(`node_modules${import_path.default.sep}`);return(0,import_vite4.normalizePath)(splits[splits.length-1])}function processPreviewAnnotation(path5){if(typeof path5=="object")return path5.bare;if(path5!=null&&path5.startsWith("./")||path5!=null&&path5.startsWith("../"))return(0,import_slash.default)((0,import_path2.resolve)(path5));if(!path5)throw new Error("Could not determine path for previewAnnotation");return path5.includes("node_modules")?transformAbsPath(path5):(0,import_slash.default)(path5)}async function generateIframeScriptCode(options){let{presets}=options,rendererName=await(0,import_core_common2.getRendererName)(options),configEntries=[...await presets.apply("previewAnnotations",[],options)].filter(Boolean).map(processPreviewAnnotation),filesToImport=(files,name)=>files.map((el,i)=>`import ${name?`* as ${name}_${i} from `:""}'${el}'`).join(`
`),importArray=(name,length)=>new Array(length).fill(0).map((_,i)=>`${name}_${i}`);return`
    // Ensure that the client API is initialized by the framework before any other iframe code
    // is loaded. That way our client-apis can assume the existence of the API+store
    import { configure } from '${rendererName}';

    import { logger } from '@storybook/client-logger';
    import * as previewApi from "@storybook/preview-api";
    ${filesToImport(configEntries,"config")}

    import * as preview from '${virtualPreviewFile}';
    import { configStories } from '${virtualStoriesFile}';

    const {
      addDecorator,
      addParameters,
      addLoader,
      addArgs,
      addArgTypes,
      addStepRunner,
      addArgTypesEnhancer,
      addArgsEnhancer,
      setGlobalRender,
    } = previewApi;

    const configs = [${importArray("config",configEntries.length).concat("preview.default").join(",")}].filter(Boolean)

    configs.map(config => config.default ? config.default : config).forEach(config => {
      Object.keys(config).forEach((key) => {
        const value = config[key];
        switch (key) {
          case 'args': {
            return addArgs(value);
          }
          case 'argTypes': {
            return addArgTypes(value);
          }
          case 'decorators': {
            return value.forEach((decorator) => addDecorator(decorator, false));
          }
          case 'loaders': {
            return value.forEach((loader) => addLoader(loader, false));
          }
          case 'parameters': {
            return addParameters({ ...value }, false);
          }
          case 'argTypesEnhancers': {
            return value.forEach((enhancer) => addArgTypesEnhancer(enhancer));
          }
          case 'argsEnhancers': {
            return value.forEach((enhancer) => addArgsEnhancer(enhancer))
          }
          case 'render': {
            return setGlobalRender(value)
          }
          case 'globals':
          case 'globalTypes': {
            const v = {};
            v[key] = value;
            return addParameters(v, false);
          }
          case 'decorateStory':
          case 'applyDecorators':
          case 'renderToDOM': // deprecated
          case 'renderToCanvas': {
            return null; // This key is not handled directly in v6 mode.
          }
          case 'runStep': {
            return addStepRunner(value);
          }
          default: {
            // eslint-disable-next-line prefer-template
            return console.log(key + ' was not supported :( !');
          }
        }
      });
    })
    
    /* TODO: not quite sure what to do with this, to fix HMR
    if (import.meta.hot) {
        import.meta.hot.accept();    
    }
    */

    configStories(configure);
    `.trim()}var import_core_common3=require("@storybook/core-common");async function generateModernIframeScriptCode(options){let{presets,configDir}=options,frameworkName=await(0,import_core_common3.getFrameworkName)(options),previewOrConfigFile=(0,import_core_common3.loadPreviewOrConfigFile)({configDir}),relativePreviewAnnotations=[...await presets.apply("previewAnnotations",[],options),previewOrConfigFile].filter(Boolean).map(processPreviewAnnotation),generateHMRHandler=frameworkName2=>frameworkName2==="@storybook/web-components-vite"?`
      if (import.meta.hot) {
        import.meta.hot.decline();
      }`.trim():`
    if (import.meta.hot) {
      import.meta.hot.accept('${virtualStoriesFile}', (newModule) => {
      // importFn has changed so we need to patch the new one in
      window.__STORYBOOK_PREVIEW__.onStoriesChanged({ importFn: newModule.importFn });
      });

    import.meta.hot.accept(${JSON.stringify(relativePreviewAnnotations)}, ([...newConfigEntries]) => {
      const newGetProjectAnnotations =  () => composeConfigs(newConfigEntries);

      // getProjectAnnotations has changed so we need to patch the new one in
      window.__STORYBOOK_PREVIEW__.onGetProjectAnnotationsChanged({ getProjectAnnotations: newGetProjectAnnotations });
    });
  }`.trim();return`
  import { composeConfigs, PreviewWeb, ClientApi } from '@storybook/preview-api';
  import '${virtualAddonSetupFile}';
  import { importFn } from '${virtualStoriesFile}';
  
    const getProjectAnnotations = async () => {
      const configs = await Promise.all([${relativePreviewAnnotations.map(previewAnnotation=>`import('${previewAnnotation}')`).join(`,
`)}])
      return composeConfigs(configs);
    }


    window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb();
    
    window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
    window.__STORYBOOK_CLIENT_API__ = window.__STORYBOOK_CLIENT_API__ || new ClientApi({ storyStore: window.__STORYBOOK_PREVIEW__.storyStore });
    window.__STORYBOOK_PREVIEW__.initialize({ importFn, getProjectAnnotations });
    
    ${generateHMRHandler(frameworkName)};
    `.trim()}var path2=__toESM(require("path")),import_vite5=require("vite"),import_node_logger=require("@storybook/node-logger");var posixPath=__toESM(require("path/posix")),import_glob_promise=require("glob-promise"),import_core_common4=require("@storybook/core-common");async function listStories(options){return(await Promise.all((0,import_core_common4.normalizeStories)(await options.presets.apply("stories",[],options),{configDir:options.configDir,workingDir:options.configDir}).map(({directory,files})=>{let pattern=posixPath.join(directory,files);return(0,import_glob_promise.promise)(posixPath.isAbsolute(pattern)?pattern:posixPath.join(options.configDir,pattern),{follow:!0})}))).reduce((carry,stories)=>carry.concat(stories),[])}function toImportPath(relativePath){return relativePath.startsWith("../")?relativePath:`./${relativePath}`}async function toImportFn(stories){return`
    const importers = {
      ${stories.map(file=>{let ext=path2.extname(file),relativePath=(0,import_vite5.normalizePath)(path2.relative(process.cwd(),file));return[".js",".jsx",".ts",".tsx",".mdx",".svelte"].includes(ext)||import_node_logger.logger.warn(`Cannot process ${ext} file with storyStoreV7: ${relativePath}`),`  '${toImportPath(relativePath)}': async () => import('/@fs/${file}')`}).join(`,
`)}
    };

    export async function importFn(path) {
        return importers[path]();
    }
  `}async function generateImportFnScriptCode(options){let stories=await listStories(options);return(await toImportFn(stories)).trim()}var import_core_common5=require("@storybook/core-common"),import_slash2=__toESM(require("slash")),import_vite6=require("vite");var absoluteFilesToImport=(files,name)=>files.map((el,i)=>`import ${name?`* as ${name}_${i} from `:""}'/@fs/${(0,import_vite6.normalizePath)(el)}'`).join(`
`);async function generateVirtualStoryEntryCode(options){let storyEntries=await listStories(options),resolveMap=storyEntries.reduce((prev,entry)=>({...prev,[entry]:entry.replace((0,import_slash2.default)(process.cwd()),".")}),{}),modules=storyEntries.map((entry,i)=>`${JSON.stringify(entry)}: story_${i}`).join(",");return`
    ${absoluteFilesToImport(storyEntries,"story")}

    function loadable(key) {
      return {${modules}}[key];
    }
    
    Object.assign(loadable, {
      keys: () => (${JSON.stringify(Object.keys(resolveMap))}),
      resolve: (key) => (${JSON.stringify(resolveMap)}[key])
    });

    export function configStories(configure) {
      configure(loadable, { hot: import.meta.hot }, false);
    }
  `.trim()}async function generatePreviewEntryCode({configDir}){let previewFile=(0,import_core_common5.loadPreviewOrConfigFile)({configDir});return previewFile?`import * as preview from '${(0,import_slash2.default)(previewFile)}';
  export default preview;`:""}async function generateAddonSetupCode(){return`
    import { createChannel as createPostMessageChannel } from '@storybook/channel-postmessage';
    import { createChannel as createWebSocketChannel } from '@storybook/channel-websocket';
    import { addons } from '@storybook/preview-api';

    const channel = createPostMessageChannel({ page: 'preview' });
    addons.setChannel(channel);
    window.__STORYBOOK_ADDONS_CHANNEL__ = channel;

    const { SERVER_CHANNEL_URL } = globalThis;
    if (SERVER_CHANNEL_URL) {
      const serverChannel = createWebSocketChannel({ url: SERVER_CHANNEL_URL });
      addons.setServerChannel(serverChannel);
      window.__STORYBOOK_SERVER_CHANNEL__ = serverChannel;
    }
  `.trim()}function codeGeneratorPlugin(options){let iframePath=require.resolve("@storybook/builder-vite/input/iframe.html"),iframeId;return{name:"storybook:code-generator-plugin",enforce:"pre",configureServer(server2){server2.watcher.on("change",()=>{let appModule=server2.moduleGraph.getModuleById(virtualFileId);appModule&&server2.moduleGraph.invalidateModule(appModule);let storiesModule=server2.moduleGraph.getModuleById(virtualStoriesFile);storiesModule&&server2.moduleGraph.invalidateModule(storiesModule)}),server2.watcher.on("add",path5=>{(/\.stories\.([tj])sx?$/.test(path5)||/\.(story|stories).mdx$/.test(path5))&&server2.watcher.emit("change",virtualStoriesFile)})},config(config,{command}){command==="build"&&(config.build||(config.build={}),config.build.rollupOptions={...config.build.rollupOptions,input:iframePath})},configResolved(config){iframeId=`${config.root}/iframe.html`},resolveId(source){if(source===virtualFileId)return virtualFileId;if(source===iframePath)return iframeId;if(source===virtualStoriesFile)return virtualStoriesFile;if(source===virtualPreviewFile)return virtualPreviewFile;if(source===virtualAddonSetupFile)return virtualAddonSetupFile},async load(id){var _a;let storyStoreV7=(_a=options.features)==null?void 0:_a.storyStoreV7;if(id===virtualStoriesFile)return storyStoreV7?generateImportFnScriptCode(options):generateVirtualStoryEntryCode(options);if(id===virtualAddonSetupFile)return generateAddonSetupCode();if(id===virtualPreviewFile&&!storyStoreV7)return generatePreviewEntryCode(options);if(id===virtualFileId)return storyStoreV7?generateModernIframeScriptCode(options):generateIframeScriptCode(options);if(id===iframeId)return fs.readFileSync(require.resolve("@storybook/builder-vite/input/iframe.html"),"utf-8")},async transformIndexHtml(html,ctx){if(ctx.path==="/iframe.html")return transformIframeHtml(html,options)}}}var import_csf_plugin=require("@storybook/csf-plugin");async function csfPlugin(config){var _a;let{presets}=config,docsOptions=((_a=(await presets.apply("addons",[])).find(a=>[a,a.name].includes("@storybook/addon-docs")))==null?void 0:_a.options)??{};return(0,import_csf_plugin.vite)(docsOptions==null?void 0:docsOptions.csfPluginOptions)}var import_node_path=require("path"),import_es_module_lexer2=require("es-module-lexer"),import_magic_string3=__toESM(require("magic-string")),import_fs_extra=require("fs-extra"),import_vite7=require("vite"),escapeKeys=key=>key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),defaultImportRegExp="import ([^*{}]+) from",replacementMap=new Map([["import ","const "],["import{","const {"],["* as ",""],[" as ",": "],[" from "," = "],["}from","} ="]]);async function externalGlobalsPlugin(externals){return await import_es_module_lexer2.init,{name:"storybook:external-globals-plugin",enforce:"post",async config(config,{command}){var _a;if(command!=="serve")return;let newAlias=(0,import_vite7.mergeAlias)([],(_a=config.resolve)==null?void 0:_a.alias),cachePath=(0,import_node_path.join)(process.cwd(),"node_modules",".cache","vite-plugin-externals");return await(0,import_fs_extra.ensureDir)(cachePath),await(0,import_fs_extra.emptyDir)(cachePath),await Promise.all(Object.keys(externals).map(async externalKey=>{let externalCachePath=(0,import_node_path.join)(cachePath,`${externalKey}.js`);newAlias.push({find:new RegExp(`^${externalKey}$`),replacement:externalCachePath}),await(0,import_fs_extra.ensureFile)(externalCachePath),await(0,import_fs_extra.writeFile)(externalCachePath,`module.exports = ${externals[externalKey]};`)})),{resolve:{alias:newAlias}}},async transform(code,id){let globalsList=Object.keys(externals);if(globalsList.every(glob2=>!code.includes(glob2)))return;let[imports]=(0,import_es_module_lexer2.parse)(code),src=new import_magic_string3.default(code);return imports.forEach(({n:path5,ss:startPosition,se:endPosition})=>{let packageName=path5;if(packageName&&globalsList.includes(packageName)){let importStatement=src.slice(startPosition,endPosition),transformedImport=rewriteImport(importStatement,externals,packageName);src.update(startPosition,endPosition,transformedImport)}}),{code:src.toString(),map:src.generateMap({source:id,includeContent:!0,hires:!0})}}}}function getDefaultImportReplacement(match){let matched=match.match(defaultImportRegExp);return matched&&`const {default: ${matched[1]}} =`}function getSearchRegExp(packageName){let staticKeys=[...replacementMap.keys()].map(escapeKeys),packageNameLiteral=`.${packageName}.`,dynamicImportExpression=`await import\\(.${packageName}.\\)`,lookup=[defaultImportRegExp,...staticKeys,packageNameLiteral,dynamicImportExpression];return new RegExp(`(${lookup.join("|")})`,"g")}function rewriteImport(importStatement,globs,packageName){let search=getSearchRegExp(packageName);return importStatement.replace(search,match=>replacementMap.get(match)??getDefaultImportReplacement(match)??globs[packageName])}var configEnvServe={mode:"development",command:"serve",ssrBuild:!1},configEnvBuild={mode:"production",command:"build",ssrBuild:!1};async function commonConfig(options,_type){let configEnv=_type==="development"?configEnvServe:configEnvBuild,{viteConfigPath}=await(0,import_core_common6.getBuilderOptions)(options),{config:{build:buildProperty=void 0,...userConfig}={}}=await(0,import_vite8.loadConfigFromFile)(configEnv,viteConfigPath)??{},sbConfig={configFile:!1,cacheDir:"node_modules/.cache/.vite-storybook",root:path3.resolve(options.configDir,".."),base:"./",plugins:await pluginConfig(options),resolve:{preserveSymlinks:(0,import_core_common6.isPreservingSymlinks)(),alias:{assert:require.resolve("browser-assert")}},envPrefix:userConfig.envPrefix?["STORYBOOK_"]:["VITE_","STORYBOOK_"]};return(0,import_vite8.mergeConfig)(userConfig,sbConfig)}async function pluginConfig(options){let frameworkName=await(0,import_core_common6.getFrameworkName)(options),plugins=[codeGeneratorPlugin(options),await csfPlugin(options),await mdxPlugin(options),injectExportOrderPlugin,stripStoryHMRBoundary(),{name:"storybook:allow-storybook-dir",enforce:"post",config(config){var _a,_b;(_b=(_a=config==null?void 0:config.server)==null?void 0:_a.fs)!=null&&_b.allow&&config.server.fs.allow.push(".storybook")}},await externalGlobalsPlugin(import_globals.globals)];if(frameworkName==="@storybook/glimmerx-vite"){let plugin=require("vite-plugin-glimmerx/index.cjs");plugins.push(plugin.default())}return plugins}var path4=__toESM(require("path")),import_vite9=require("vite");var INCLUDE_CANDIDATES=["@base2/pretty-print-object","@emotion/core","@emotion/is-prop-valid","@emotion/styled","@mdx-js/react","@storybook/addon-docs > acorn-jsx","@storybook/addon-docs","@storybook/channel-postmessage","@storybook/channel-websocket","@storybook/client-api","@storybook/client-logger","@storybook/core/client","@storybook/global","@storybook/preview-api","@storybook/preview-web","@storybook/react > acorn-jsx","@storybook/react","@storybook/svelte","@storybook/types","@storybook/vue3","acorn-jsx","acorn-walk","acorn","airbnb-js-shims","ansi-to-html","axe-core","color-convert","deep-object-diff","doctrine","emotion-theming","escodegen","estraverse","fast-deep-equal","html-tags","isobject","jest-mock","loader-utils","lodash/cloneDeep","lodash/isFunction","lodash/isPlainObject","lodash/isString","lodash/mapKeys","lodash/mapValues","lodash/pick","lodash/pickBy","lodash/startCase","lodash/throttle","lodash/uniq","markdown-to-jsx","memoizerific","overlayscrollbars","polished","prettier/parser-babel","prettier/parser-flow","prettier/parser-typescript","prop-types","qs","react-dom","react-dom/client","react-fast-compare","react-is","react-textarea-autosize","react","react/jsx-runtime","refractor/core","refractor/lang/bash.js","refractor/lang/css.js","refractor/lang/graphql.js","refractor/lang/js-extras.js","refractor/lang/json.js","refractor/lang/jsx.js","refractor/lang/markdown.js","refractor/lang/markup.js","refractor/lang/tsx.js","refractor/lang/typescript.js","refractor/lang/yaml.js","regenerator-runtime/runtime.js","slash","store2","synchronous-promise","telejson","ts-dedent","unfetch","util-deprecate","uuid-browser/v4","vue","warning"],asyncFilter=async(arr,predicate)=>Promise.all(arr.map(predicate)).then(results=>arr.filter((_v,index)=>results[index]));async function getOptimizeDeps(config,options){var _a;let{root=process.cwd()}=config,stories=(await listStories(options)).map(storyPath=>(0,import_vite9.normalizePath)(path4.relative(root,storyPath))),resolve3=(await(0,import_vite9.resolveConfig)(config,"serve","development")).createResolver({asSrc:!1}),include2=await asyncFilter(INCLUDE_CANDIDATES,async id=>Boolean(await resolve3(id)));return{...config.optimizeDeps,entries:stories,include:[...include2,...((_a=config.optimizeDeps)==null?void 0:_a.include)||[]]}}var import_core_common7=require("@storybook/core-common"),allowedEnvVariables=["STORYBOOK","BASE_URL","MODE","DEV","PROD","SSR"];function stringifyProcessEnvs(raw,envPrefix){let updatedRaw={},envs=Object.entries(raw).reduce((acc,[key,value])=>((allowedEnvVariables.includes(key)||Array.isArray(envPrefix)&&envPrefix.find(prefix=>key.startsWith(prefix))||typeof envPrefix=="string"&&key.startsWith(envPrefix))&&(acc[`import.meta.env.${key}`]=JSON.stringify(value),updatedRaw[key]=value),acc),{});return envs["import.meta.env"]=JSON.stringify((0,import_core_common7.stringifyEnvs)(updatedRaw)),envs}async function sanitizeEnvVars(options,config){let{presets}=options,envsRaw=await presets.apply("env"),{define}=config;if(Object.keys(envsRaw).length){let envs=stringifyProcessEnvs(envsRaw,config.envPrefix);define={...define,...envs}}return{...config,define}}async function createViteServer(options,devServer){let{presets}=options,commonCfg=await commonConfig(options,"development"),config={...commonCfg,server:{middlewareMode:!0,hmr:{port:options.port,server:devServer},fs:{strict:!0}},appType:"custom",optimizeDeps:await getOptimizeDeps(commonCfg,options)},finalConfig=await presets.apply("viteFinal",config,options);return(0,import_vite10.createServer)(await sanitizeEnvVars(options,finalConfig))}var import_vite11=require("vite");async function build(options){let{presets}=options,config=await commonConfig(options,"build");config.build=(0,import_vite11.mergeConfig)(config,{build:{outDir:options.outputDir,emptyOutDir:!1,sourcemap:!0,rollupOptions:{external:["./sb-preview/runtime.mjs"]}}}).build;let finalConfig=await presets.apply("viteFinal",config,options);await(0,import_vite11.build)(await sanitizeEnvVars(options,finalConfig))}var withoutVitePlugins=async(plugins=[],namesToRemove)=>{let result=[],resolvedPlugins=await Promise.all(plugins);for(let plugin of resolvedPlugins)Array.isArray(plugin)&&result.push(await withoutVitePlugins(plugin,namesToRemove)),plugin&&"name"in plugin&&!namesToRemove.includes(plugin.name)&&result.push(plugin);return result};function checkName(plugin,names){return plugin!==null&&typeof plugin=="object"&&"name"in plugin&&names.includes(plugin.name)}async function hasVitePlugins(plugins,names){let resolvedPlugins=await Promise.all(plugins);for(let plugin of resolvedPlugins)if(Array.isArray(plugin)&&Boolean(await hasVitePlugins(plugin,names))||checkName(plugin,names))return!0;return!1}function iframeMiddleware(options,server2){return async(req,res,next)=>{if(!req.url.match(/^\/iframe\.html($|\?)/)){next();return}if(req.query["html-proxy"]!==void 0){next();return}let indexHtml=await fs2.readFile(require.resolve("@storybook/builder-vite/input/iframe.html"),"utf-8"),generated=await transformIframeHtml(indexHtml,options),transformed=await server2.transformIndexHtml("/iframe.html",generated);res.setHeader("Content-Type","text/html"),res.status(200).send(transformed)}}var server;async function bail(){return server==null?void 0:server.close()}var start=async({startTime,options,router,server:devServer})=>{server=await createViteServer(options,devServer);let previewResolvedDir=(0,import_path3.dirname)(require.resolve("@storybook/preview/package.json")),previewDirOrigin=(0,import_path3.join)(previewResolvedDir,"dist");return router.use("/sb-preview",import_express.default.static(previewDirOrigin,{immutable:!0,maxAge:"5m"})),router.use(iframeMiddleware(options,server)),router.use(server.middlewares),{bail,stats:{toJson:()=>null},totalTime:process.hrtime(startTime)}},build2=async({options})=>{let viteCompilation=build(options),previewResolvedDir=(0,import_path3.dirname)(require.resolve("@storybook/preview/package.json")),previewDirOrigin=(0,import_path3.join)(previewResolvedDir,"dist"),previewDirTarget=(0,import_path3.join)(options.outputDir||"","sb-preview"),previewFiles=fs2.copy(previewDirOrigin,previewDirTarget,{filter:src=>{let{ext}=(0,import_path3.parse)(src);return ext?ext===".mjs":!0}}),[out]=await Promise.all([viteCompilation,previewFiles]);return out};0&&(module.exports={bail,build,hasVitePlugins,start,withoutVitePlugins});
