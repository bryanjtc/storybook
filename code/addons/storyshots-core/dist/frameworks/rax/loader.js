"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("@storybook/global");
const configure_1 = __importDefault(require("../configure"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
function test(options) {
    return options.framework === 'rax' || (!options.framework && (0, hasDependency_1.default)('@storybook/rax'));
}
function load(options) {
    global_1.global.STORYBOOK_ENV = 'rax';
    let mockStartedAPI;
    jest.mock('@storybook/preview-api', () => {
        const previewAPI = jest.requireActual('@storybook/preview-api');
        return {
            ...previewAPI,
            start: (...args) => {
                mockStartedAPI = previewAPI.start(...args);
                return mockStartedAPI;
            },
        };
    });
    jest.mock('@storybook/rax', () => {
        const renderAPI = jest.requireActual('@storybook/rax');
        renderAPI.addDecorator = mockStartedAPI.clientApi.addDecorator;
        renderAPI.addParameters = mockStartedAPI.clientApi.addParameters;
        return renderAPI;
    });
    // eslint-disable-next-line global-require
    const storybook = require('@storybook/rax');
    (0, configure_1.default)({
        ...options,
        storybook,
    });
    return {
        framework: 'rax',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for rax');
        },
        storybook,
    };
}
const raxLoader = {
    load,
    test,
};
exports.default = raxLoader;
