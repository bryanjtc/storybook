import { P as PresetProperty, S as StorybookConfig } from './types-d98e432f.js';
import 'file-system-cache';
import '@babel/core';
import 'http';
import '@storybook/builder-vite';

declare const core: PresetProperty<'core', StorybookConfig>;
declare const viteFinal: NonNullable<StorybookConfig['viteFinal']>;

export { core, viteFinal };
