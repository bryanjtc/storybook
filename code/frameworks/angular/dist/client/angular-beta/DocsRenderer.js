"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsRenderer = void 0;
const preview_api_1 = require("@storybook/preview-api");
const core_events_1 = require("@storybook/core-events");
const AbstractRenderer_1 = require("./AbstractRenderer");
class DocsRenderer extends AbstractRenderer_1.AbstractRenderer {
    async render(options) {
        const channel = preview_api_1.addons.getChannel();
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular
         * For several stories to be rendered in the same docs we should
         * not destroy angular between each rendering but do it when the
         * rendered stories are not needed anymore.
         *
         * Note for improvement: currently there is one event per story
         * rendered in the doc. But one event could be enough for the whole docs
         *
         */
        channel.once(core_events_1.STORY_CHANGED, async () => {
            await DocsRenderer.resetApplications();
        });
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular
         * when doc re render. Allows to call ngOnDestroy of angular
         * for previous component
         */
        channel.once(core_events_1.DOCS_RENDERED, async () => {
            await DocsRenderer.resetApplications();
        });
        await super.render({ ...options, forced: false });
    }
    async beforeFullRender() {
        DocsRenderer.resetApplications();
    }
    async afterFullRender() {
        await AbstractRenderer_1.AbstractRenderer.resetCompiledComponents();
    }
}
exports.DocsRenderer = DocsRenderer;
