import { WebRenderer } from '@storybook/types';
import { AnyComponent } from 'preact';

type StoryFnPreactReturnType = string | Node | preact.JSX.Element;
interface PreactRenderer extends WebRenderer {
    component: AnyComponent<any, any>;
    storyResult: StoryFnPreactReturnType;
}

export { PreactRenderer as P };
