import { Addon_ClientStoryApi, Addon_Loadable, Args, ComponentAnnotations, AnnotatedStoryFn, ArgsStoryFn, StoryAnnotations, ArgsFromMeta, StrictArgs, DecoratorFunction, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { V as VueRenderer } from './types-47445781.js';
import { Simplify, SetOptional } from 'type-fest';
import { Component } from 'vue';
import { ExtendedVue } from 'vue/types/vue';

interface ClientApi extends Addon_ClientStoryApi<VueRenderer['storyResult']> {
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
type Meta<TCmpOrArgs = Args> = ComponentAnnotations<VueRenderer, ComponentPropsOrProps<TCmpOrArgs>>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TCmpOrArgs = Args> = AnnotatedStoryFn<VueRenderer, ComponentPropsOrProps<TCmpOrArgs>>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TMetaOrCmpOrArgs = Args> = TMetaOrCmpOrArgs extends {
    render?: ArgsStoryFn<VueRenderer, any>;
    component?: infer C;
    args?: infer DefaultArgs;
} ? TMetaOrCmpOrArgs extends Component<any> ? StoryAnnotations<VueRenderer, ComponentPropsOrProps<TMetaOrCmpOrArgs>> : Simplify<ComponentProps<C> & ArgsFromMeta<VueRenderer, TMetaOrCmpOrArgs>> extends infer TArgs ? StoryAnnotations<VueRenderer, TArgs, SetOptional<TArgs, Extract<keyof TArgs, keyof DefaultArgs>>> : never : StoryAnnotations<VueRenderer, ComponentPropsOrProps<TMetaOrCmpOrArgs>>;
type ComponentProps<C> = C extends ExtendedVue<any, any, any, any, infer P> ? P : C extends Component<any, any, any, infer P> ? P : unknown;
type ComponentPropsOrProps<TCmpOrArgs> = TCmpOrArgs extends Component<any> ? unknown extends ComponentProps<TCmpOrArgs> ? TCmpOrArgs : ComponentProps<TCmpOrArgs> : TCmpOrArgs;
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
type Decorator<TArgs = StrictArgs> = DecoratorFunction<VueRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<VueRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<VueRenderer, TArgs>;
type Preview = ProjectAnnotations<VueRenderer>;

export { Decorator, Loader, Meta, Preview, Story, StoryContext, StoryFn, StoryObj, VueRenderer, configure, forceReRender, raw, storiesOf };
