"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewAnnotations = exports.babel = void 0;
const ember_template_compiler_1 = require("ember-source/dist/ember-template-compiler");
const core_common_1 = require("@storybook/core-common");
let emberOptions;
function precompileWithPlugins(string, options) {
    const precompileOptions = options;
    if (emberOptions && emberOptions.polyfills) {
        precompileOptions.plugins = { ast: emberOptions.polyfills };
    }
    return (0, ember_template_compiler_1.precompile)(string, precompileOptions);
}
function babel(config, options) {
    if (options && options.presetsList) {
        options.presetsList.forEach((e, index) => {
            if (e.preset && e.preset.emberOptions) {
                emberOptions = e.preset.emberOptions;
                if (options.presetsList) {
                    // eslint-disable-next-line no-param-reassign
                    delete options.presetsList[index].preset.emberOptions;
                }
            }
        });
    }
    const babelConfigPlugins = config.plugins || [];
    const extraPlugins = [
        [
            require.resolve('babel-plugin-htmlbars-inline-precompile'),
            {
                precompile: precompileWithPlugins,
                modules: {
                    'ember-cli-htmlbars': 'hbs',
                    'ember-cli-htmlbars-inline-precompile': 'default',
                    'htmlbars-inline-precompile': 'default',
                },
            },
        ],
        [require.resolve('babel-plugin-ember-modules-api-polyfill')],
    ];
    return {
        ...config,
        plugins: [...babelConfigPlugins, ...extraPlugins],
    };
}
exports.babel = babel;
const previewAnnotations = (entry = []) => {
    return [...entry, (0, core_common_1.findDistEsm)(__dirname, 'client/preview/config')];
};
exports.previewAnnotations = previewAnnotations;
