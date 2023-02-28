import { Type } from '@angular/core';
import { DecoratorFunction, StoryContext } from '@storybook/types';
import { ICollection, NgModuleMetadata, AngularRenderer } from './types';
export declare const moduleMetadata: <TArgs = any>(metadata: Partial<NgModuleMetadata>) => DecoratorFunction<AngularRenderer, TArgs>;
export declare const componentWrapperDecorator: <TArgs = any>(element: Type<unknown> | ((story: string) => string), props?: ICollection | ((storyContext: StoryContext<AngularRenderer, TArgs>) => ICollection)) => DecoratorFunction<AngularRenderer, TArgs>;
