"use strict";
/// <reference types="webpack-env" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = exports.forceReRender = exports.configure = exports.storiesOf = void 0;
var preview_1 = require("./client/preview");
Object.defineProperty(exports, "storiesOf", { enumerable: true, get: function () { return preview_1.storiesOf; } });
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return preview_1.configure; } });
Object.defineProperty(exports, "forceReRender", { enumerable: true, get: function () { return preview_1.forceReRender; } });
Object.defineProperty(exports, "raw", { enumerable: true, get: function () { return preview_1.raw; } });
// optimization: stop HMR propagation in webpack
module?.hot?.decline();
