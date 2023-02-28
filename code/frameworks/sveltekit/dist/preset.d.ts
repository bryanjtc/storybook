import { P as PresetProperty, S as StorybookConfig } from './types-4cd4a97a.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: NonNullable<StorybookConfig['viteFinal']>;

export { core, viteFinal };
