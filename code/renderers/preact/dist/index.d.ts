import { Addon_ClientStoryApi, Addon_Loadable, Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations, StrictArgs, DecoratorFunction, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { P as PreactRenderer } from './types-dbc033aa.js';
import 'preact';

interface ClientApi extends Addon_ClientStoryApi<PreactRenderer['storyResult']> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const forceReRender: ClientApi['forceReRender'];
declare const raw: ClientApi['raw'];

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<TArgs = Args> = ComponentAnnotations<PreactRenderer, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TArgs = Args> = AnnotatedStoryFn<PreactRenderer, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TArgs = Args> = StoryAnnotations<PreactRenderer, TArgs>;
/**
 * @deprecated Use `StoryFn` instead.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type Story<TArgs = Args> = StoryFn<TArgs>;
type Decorator<TArgs = StrictArgs> = DecoratorFunction<PreactRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<PreactRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<PreactRenderer, TArgs>;
type Preview = ProjectAnnotations<PreactRenderer>;

export { ClientApi, Decorator, Loader, Meta, PreactRenderer, Preview, Story, StoryContext, StoryFn, StoryObj, configure, forceReRender, raw, storiesOf };
