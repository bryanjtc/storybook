import{createUnplugin}from"unplugin";import fs from"fs/promises";import{loadCsf,enrichCsf,formatCsf}from"@storybook/csf-tools";var STORIES_REGEX=/\.(story|stories)\.[tj]sx?$/,logger=console,unplugin=createUnplugin(options=>({name:"unplugin-csf",enforce:"pre",loadInclude(id){return STORIES_REGEX.test(id)},async load(fname){let code=await fs.readFile(fname,"utf-8");try{let csf=loadCsf(code,{makeTitle:userTitle=>userTitle||"default"}).parse();return enrichCsf(csf,options),formatCsf(csf)}catch(err){return err.message?.startsWith("CSF:")||logger.warn(err.message),code}}})),{esbuild}=unplugin,{webpack}=unplugin,{rollup}=unplugin,{vite}=unplugin;export{esbuild,rollup,unplugin,vite,webpack};
