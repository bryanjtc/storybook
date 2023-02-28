"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("@storybook/global");
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function mockRiotToIncludeCompiler() {
    jest.mock('riot', () => jest.requireActual('riot/riot.js'));
}
function test(options) {
    return options.framework === 'riot' || (!options.framework && (0, hasDependency_1.default)('@storybook/riot'));
}
function load(options) {
    global_1.global.STORYBOOK_ENV = 'riot';
    mockRiotToIncludeCompiler();
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
    jest.mock('@storybook/riot', () => {
        const renderAPI = jest.requireActual('@storybook/riot');
        renderAPI.addDecorator = mockStartedAPI.clientApi.addDecorator;
        renderAPI.addParameters = mockStartedAPI.clientApi.addParameters;
        return renderAPI;
    });
    // eslint-disable-next-line global-require
    const storybook = require('@storybook/riot');
    (0, configure_1.default)({
        ...options,
        storybook,
    });
    return {
        framework: 'riot',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for riot');
        },
        storybook,
    };
}
const riotLoader = {
    load,
    test,
};
exports.default = riotLoader;
