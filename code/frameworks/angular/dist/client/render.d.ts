import '@angular/compiler';
import { RenderContext, ArgsStoryFn } from '@storybook/types';
import { AngularRenderer } from './types';
import { RendererFactory } from './angular-beta/RendererFactory';
export declare const rendererFactory: RendererFactory;
export declare const render: ArgsStoryFn<AngularRenderer>;
export declare function renderToCanvas({ storyFn, showMain, forceRemount, storyContext: { parameters, component }, id, }: RenderContext<AngularRenderer>, element: HTMLElement): Promise<void>;
