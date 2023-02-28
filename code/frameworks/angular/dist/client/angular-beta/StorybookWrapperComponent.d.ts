import { Type } from '@angular/core';
import { ICollection, NgModuleMetadata } from '../types';
export declare const componentNgModules: Map<any, Type<any>>;
/**
 * Wraps the story template into a component
 *
 * @param storyComponent
 * @param initialProps
 */
export declare const createStorybookWrapperComponent: (selector: string, template: string, storyComponent: Type<unknown> | undefined, styles: string[], moduleMetadata: NgModuleMetadata, initialProps?: ICollection) => Type<any>;
