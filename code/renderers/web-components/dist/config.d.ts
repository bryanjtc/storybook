import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';
import { PartialStoryFn, StoryContext, ArgsStoryFn, RenderContext } from '@storybook/types';
import { W as WebComponentsRenderer } from './types-a4f869af.js';
import 'lit';

declare function sourceDecorator(storyFn: PartialStoryFn<WebComponentsRenderer>, context: StoryContext<WebComponentsRenderer>): WebComponentsRenderer['storyResult'];

declare const decorators: (typeof sourceDecorator)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare const render: ArgsStoryFn<WebComponentsRenderer>;
declare function renderToCanvas({ storyFn, kind, name, showMain, showError, forceRemount }: RenderContext<WebComponentsRenderer>, canvasElement: WebComponentsRenderer['canvasElement']): void;

declare const parameters: {
    docs: {
        extractArgTypes: (tagName: string) => {
            [x: string]: lib_types_dist.InputType;
        };
        extractComponentDescription: (tagName: string) => string;
        story: {
            inline: boolean;
        };
        source: {
            type: lib_docs_tools_dist.SourceType;
            language: string;
        };
    };
    renderer: "web-components";
};

export { argTypesEnhancers, decorators, parameters, render, renderToCanvas };
