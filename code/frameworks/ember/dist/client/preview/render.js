"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToCanvas = void 0;
const global_1 = require("@storybook/global");
const ts_dedent_1 = require("ts-dedent");
// @ts-expect-error (Converted from ts-ignore)
const component_1 = __importDefault(require("@ember/component")); // eslint-disable-line import/no-unresolved
const { document } = global_1.global;
const rootEl = document.getElementById('storybook-root');
const config = global_1.global.require(`${global_1.global.STORYBOOK_NAME}/config/environment`);
const app = global_1.global.require(`${global_1.global.STORYBOOK_NAME}/app`).default.create({
    autoboot: false,
    rootElement: rootEl,
    ...config.APP,
});
let lastPromise = app.boot();
let hasRendered = false;
let isRendering = false;
function render(options, el) {
    if (isRendering)
        return;
    isRendering = true;
    const { template, context = {}, element } = options;
    if (hasRendered) {
        lastPromise = lastPromise.then((instance) => instance.destroy());
    }
    lastPromise = lastPromise
        .then(() => {
        const appInstancePrivate = app.buildInstance();
        return appInstancePrivate.boot().then(() => appInstancePrivate);
    })
        .then((instance) => {
        instance.register('component:story-mode', component_1.default.extend({
            layout: template || options,
            ...context,
        }));
        const component = instance.lookup('component:story-mode');
        if (element) {
            component.appendTo(element);
            element.appendTo(el);
        }
        else {
            component.appendTo(el);
        }
        hasRendered = true;
        isRendering = false;
        return instance;
    });
}
function renderToCanvas({ storyFn, kind, name, showMain, showError }, canvasElement) {
    const element = storyFn();
    if (!element) {
        showError({
            title: `Expecting a Ember element from the story: "${name}" of "${kind}".`,
            description: (0, ts_dedent_1.dedent) `
        Did you forget to return the Ember element from the story?
        Use "() => hbs('{{component}}')" or "() => { return {
          template: hbs\`{{component}}\`
        } }" when defining the story.
      `,
        });
        return;
    }
    showMain();
    render(element, canvasElement);
}
exports.renderToCanvas = renderToCanvas;
