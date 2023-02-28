import { P as PresetProperty, S as StorybookConfig } from './types-87f2a826.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const typescript: PresetProperty<'typescript', StorybookConfig>;
declare const viteFinal: StorybookConfig['viteFinal'];

export { core, typescript, viteFinal };
