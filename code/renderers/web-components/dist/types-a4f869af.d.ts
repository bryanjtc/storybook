import { WebRenderer } from '@storybook/types';
import { TemplateResult, SVGTemplateResult } from 'lit';

type StoryFnHtmlReturnType = string | Node | TemplateResult | SVGTemplateResult;
interface WebComponentsRenderer extends WebRenderer {
    component: string;
    storyResult: StoryFnHtmlReturnType;
}

export { WebComponentsRenderer as W };
