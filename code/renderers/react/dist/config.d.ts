import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';
import { R as ReactRenderer, S as StoryFnReactReturnType } from './types-0a347bb9.js';
import { ArgsStoryFn, RenderContext } from '@storybook/types';
import 'react';

declare const decorators: ((storyFn: lib_types_dist.PartialStoryFn<ReactRenderer, lib_types_dist.Args>, context: lib_types_dist.StoryContext<ReactRenderer, lib_types_dist.Args>) => StoryFnReactReturnType)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare const render: ArgsStoryFn<ReactRenderer>;
declare function renderToCanvas({ storyContext, unboundStoryFn, showMain, showException, forceRemount, }: RenderContext<ReactRenderer>, canvasElement: ReactRenderer['canvasElement']): Promise<() => void>;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
        extractArgTypes: lib_docs_tools_dist.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist.extractComponentDescription;
    };
    renderer: string;
};

export { argTypesEnhancers, decorators, parameters, render, renderToCanvas };
