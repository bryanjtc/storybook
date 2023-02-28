import type { TransformOptions } from '@babel/core';
import type { StorybookConfig, Options } from '@storybook/types';
export declare function babel(config: TransformOptions, options: Options): TransformOptions;
export declare const previewAnnotations: StorybookConfig['previewAnnotations'];
