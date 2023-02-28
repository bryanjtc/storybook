import { PartialStoryFn, ArgsStoryFn, RenderContext, WebRenderer, StoryContext as StoryContext$1 } from '@storybook/types';
import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';

declare function sourceDecorator(storyFn: PartialStoryFn<HtmlRenderer>, context: StoryContext): StoryFnHtmlReturnType;

declare const decorators: (typeof sourceDecorator)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare const render: ArgsStoryFn<HtmlRenderer>;
declare function renderToCanvas({ storyFn, kind, name, showMain, showError, forceRemount }: RenderContext<HtmlRenderer>, canvasElement: HtmlRenderer['canvasElement']): void;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
        transformSource: unknown;
        source: {
            type: lib_docs_tools_dist.SourceType;
            language: string;
            code: unknown;
            excludeDecorators: unknown;
        };
    };
    renderer: "html";
};

type StoryFnHtmlReturnType = string | Node;
interface HtmlRenderer extends WebRenderer {
    component: string | HTMLElement | ArgsStoryFn<HtmlRenderer>;
    storyResult: StoryFnHtmlReturnType;
}
type StoryContext = StoryContext$1<HtmlRenderer> & {
    parameters: StoryContext$1<HtmlRenderer>['parameters'] & typeof parameters;
};

export { HtmlRenderer as H, argTypesEnhancers as a, render as b, decorators as d, parameters as p, renderToCanvas as r };
