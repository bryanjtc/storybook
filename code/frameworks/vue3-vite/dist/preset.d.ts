import { P as PresetProperty, S as StorybookConfig } from './types-8f552bb7.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: StorybookConfig['viteFinal'];

export { core, viteFinal };
