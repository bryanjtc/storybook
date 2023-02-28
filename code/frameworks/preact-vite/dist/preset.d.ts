import { P as PresetProperty, S as StorybookConfig } from './types-a48e2914.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: StorybookConfig['viteFinal'];

export { core, viteFinal };
