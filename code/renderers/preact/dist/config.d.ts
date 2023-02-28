import { ArgsStoryFn, RenderContext } from '@storybook/types';
import { P as PreactRenderer } from './types-dbc033aa.js';
import 'preact';

declare const render: ArgsStoryFn<PreactRenderer>;
declare function renderToCanvas({ storyFn, title, name, showMain, showError, forceRemount }: RenderContext<PreactRenderer>, canvasElement: PreactRenderer['canvasElement']): void;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
    };
    renderer: "preact";
};

export { parameters, render, renderToCanvas };
