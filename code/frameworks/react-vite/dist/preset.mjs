import{__require}from"./chunk-R4NKYYJA.mjs";import{hasVitePlugins}from"@storybook/builder-vite";var core={builder:"@storybook/builder-vite",renderer:"@storybook/react"},viteFinal=async(config,{presets})=>{let{plugins=[]}=config;if(!await hasVitePlugins(plugins,["vite:react-babel","vite:react-swc"])){let{default:react}=await import("@vitejs/plugin-react");plugins.push(react())}let{reactDocgen:reactDocgenOption,reactDocgenTypescriptOptions}=await presets.apply("typescript",{}),typescriptPresent;try{__require.resolve("typescript"),typescriptPresent=!0}catch{typescriptPresent=!1}if(reactDocgenOption==="react-docgen-typescript"&&typescriptPresent&&plugins.push(__require("@joshwooding/vite-plugin-react-docgen-typescript")({...reactDocgenTypescriptOptions,savePropValueAsString:!0})),typeof reactDocgenOption=="string"){let{reactDocgen}=await import("./react-docgen-IMJTCUEZ.mjs");plugins.unshift(reactDocgen({include:reactDocgenOption==="react-docgen"?/\.(mjs|tsx?|jsx?)$/:/\.(mjs|jsx?)$/}))}return config};export{core,viteFinal};
