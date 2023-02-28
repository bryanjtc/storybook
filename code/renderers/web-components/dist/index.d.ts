import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations, StrictArgs, DecoratorFunction, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations, Addon_ClientStoryApi, Addon_Loadable } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { W as WebComponentsRenderer } from './types-a4f869af.js';
import 'lit';

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<TArgs = Args> = ComponentAnnotations<WebComponentsRenderer, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TArgs = Args> = AnnotatedStoryFn<WebComponentsRenderer, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TArgs = Args> = StoryAnnotations<WebComponentsRenderer, TArgs>;
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
type Decorator<TArgs = StrictArgs> = DecoratorFunction<WebComponentsRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<WebComponentsRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<WebComponentsRenderer, TArgs>;
type Preview = ProjectAnnotations<WebComponentsRenderer>;

interface ClientApi extends Addon_ClientStoryApi<WebComponentsRenderer['storyResult']> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const forceReRender: ClientApi['forceReRender'];
declare const raw: ClientApi['raw'];

declare function isValidComponent(tagName: string): boolean;
declare function isValidMetaData(customElements: any): boolean;
/**
 * @param customElements any for now as spec is not super stable yet
 */
declare function setCustomElements(customElements: any): void;
declare function setCustomElementsManifest(customElements: any): void;
declare function getCustomElements(): any;

export { Decorator, Loader, Meta, Preview, Story, StoryContext, StoryFn, StoryObj, WebComponentsRenderer, configure, forceReRender, getCustomElements, isValidComponent, isValidMetaData, raw, setCustomElements, setCustomElementsManifest, storiesOf };
