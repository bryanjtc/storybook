import { WebRenderer, StoryContext as StoryContext$1 } from '@storybook/types';
import { Component, AsyncComponent } from 'vue';

type StoryFnVueReturnType = Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
type StoryContext = StoryContext$1<VueRenderer>;
interface VueRenderer extends WebRenderer {
    component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
    storyResult: StoryFnVueReturnType;
}

export { StoryContext as S, VueRenderer as V, StoryFnVueReturnType as a };
