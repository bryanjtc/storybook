"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = exports.addons = void 0;
const path_1 = __importDefault(require("path"));
exports.addons = [
    require.resolve('./server/framework-preset-babel-ember'),
    require.resolve('./server/framework-preset-ember-docs'),
];
const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: path_1.default.dirname(require.resolve(path_1.default.join('@storybook/builder-webpack5', 'package.json'))),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
exports.core = core;
