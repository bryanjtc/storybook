import{__require}from"./chunk-R4NKYYJA.mjs";import{hasDocsOrControls}from"@storybook/docs-tools";var webpackFinal=(config,options)=>{if(!hasDocsOrControls(options))return config;let vueDocgenOptions={};return options.presetsList?.forEach(preset=>{if(preset.name.includes("addon-docs")&&preset.options.vueDocgenOptions){let appendableOptions=preset.options.vueDocgenOptions;vueDocgenOptions={...vueDocgenOptions,...appendableOptions}}}),config.module.rules.push({test:/\.vue$/,loader:__require.resolve("vue-docgen-loader",{paths:[__require.resolve("@storybook/preset-vue3-webpack")]}),enforce:"post",options:{docgenOptions:{alias:config.resolve.alias,...vueDocgenOptions}}}),config};export{webpackFinal};
