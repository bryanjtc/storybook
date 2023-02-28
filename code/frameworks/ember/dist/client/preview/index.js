"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceReRender = exports.configure = exports.storiesOf = exports.raw = void 0;
const preview_api_1 = require("@storybook/preview-api");
require("./globals");
const render_1 = require("./render");
const { configure: coreConfigure, clientApi, forceReRender } = (0, preview_api_1.start)(render_1.renderToCanvas);
exports.forceReRender = forceReRender;
exports.raw = clientApi.raw;
const RENDERER = 'ember';
const storiesOf = (kind, m) => clientApi.storiesOf(kind, m).addParameters({ renderer: RENDERER });
exports.storiesOf = storiesOf;
const configure = (loadable, m) => coreConfigure(RENDERER, loadable, m);
exports.configure = configure;
