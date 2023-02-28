"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewAnnotations = void 0;
const core_common_1 = require("@storybook/core-common");
const docs_tools_1 = require("@storybook/docs-tools");
const previewAnnotations = (entry = [], options) => {
    if (!(0, docs_tools_1.hasDocsOrControls)(options))
        return entry;
    return [...entry, (0, core_common_1.findDistEsm)(__dirname, 'client/docs/config')];
};
exports.previewAnnotations = previewAnnotations;
