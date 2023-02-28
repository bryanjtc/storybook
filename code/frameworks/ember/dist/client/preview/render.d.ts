import type { RenderContext } from '@storybook/types';
import type { EmberRenderer } from './types';
export declare function renderToCanvas({ storyFn, kind, name, showMain, showError }: RenderContext<EmberRenderer>, canvasElement: EmberRenderer['canvasElement']): void;
