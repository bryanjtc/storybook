import { StorybookConfig } from '@storybook/core-webpack';
export { BuilderResult, StorybookConfig, TypescriptOptions } from '@storybook/core-webpack';

type SvelteOptions = {
    preprocess?: any;
};

declare const addons: StorybookConfig['addons'];

export { SvelteOptions, addons };
