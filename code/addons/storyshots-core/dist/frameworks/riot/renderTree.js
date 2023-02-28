"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("@storybook/global");
const { document } = global_1.global;
const riotForStorybook = jest.requireActual('@storybook/riot');
function bootstrapADocumentAndReturnANode() {
    const rootElement = document.createElement('div');
    rootElement.id = 'storybook-root';
    document.body = document.createElement('body');
    document.body.appendChild(rootElement);
    return rootElement;
}
function makeSureThatResultIsRenderedSomehow({ context, result, rootElement }) {
    if (!rootElement.firstChild) {
        const { kind, name } = context;
        riotForStorybook.render({
            storyFn: () => result,
            kind,
            name,
        });
    }
}
function getRenderedTree(story, context) {
    const rootElement = bootstrapADocumentAndReturnANode();
    const result = story.render();
    makeSureThatResultIsRenderedSomehow({ context, result, rootElement });
    return rootElement;
}
exports.default = getRenderedTree;
