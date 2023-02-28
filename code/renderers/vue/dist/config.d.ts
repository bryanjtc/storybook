import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';
import { S as StoryContext, V as VueRenderer, a as StoryFnVueReturnType } from './types-47445781.js';
import * as _storybook_types from '@storybook/types';
import { ArgsStoryFn, RenderContext, LegacyStoryFn, DecoratorFunction, StoryContext as StoryContext$1 } from '@storybook/types';
import 'vue';

declare const decorators: ((storyFn: any, context: StoryContext) => any)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare const render: ArgsStoryFn<VueRenderer>;
declare function renderToCanvas({ title, name, storyFn, showMain, showError, showException, forceRemount, }: RenderContext<VueRenderer>, canvasElement: VueRenderer['canvasElement']): void;

declare function decorateStory(storyFn: LegacyStoryFn<VueRenderer>, decorators: DecoratorFunction<VueRenderer>[]): (context: StoryContext$1<VueRenderer, _storybook_types.Args>) => StoryFnVueReturnType;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
            iframeHeight: string;
        };
        extractArgTypes: lib_docs_tools_dist.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist.extractComponentDescription;
    };
    renderer: "vue";
};

export { decorateStory as applyDecorators, argTypesEnhancers, decorators, parameters, render, renderToCanvas };
