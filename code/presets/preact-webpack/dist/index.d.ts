import { StorybookConfig } from '@storybook/core-webpack';
export { BuilderResult, StorybookConfig, TypescriptOptions } from '@storybook/core-webpack';

declare const babel: StorybookConfig['babelDefault'];
declare const webpackFinal: StorybookConfig['webpackFinal'];

export { babel, webpackFinal };
