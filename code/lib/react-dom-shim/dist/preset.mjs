import{version}from"react-dom/package.json";var webpackFinal=async(config,options)=>{let{legacyRootApi}=await options.presets.apply("frameworkOptions"),isReact18=version.startsWith("18")||version.startsWith("0.0.0");return legacyRootApi??!isReact18?config:{...config,resolve:{...config.resolve,alias:{...config.resolve?.alias,"@storybook/react-dom-shim":"@storybook/react-dom-shim/dist/react-18"}}}},viteFinal=async(config,options)=>{let{legacyRootApi}=await options.presets.apply("frameworkOptions"),isReact18=version.startsWith("18")||version.startsWith("0.0.0");return legacyRootApi||!isReact18?config:{...config,resolve:{...config.resolve,alias:{...config.resolve.alias,"@storybook/react-dom-shim":"@storybook/react-dom-shim/dist/react-18"}}}};export{viteFinal,webpackFinal};
