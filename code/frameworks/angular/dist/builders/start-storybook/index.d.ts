import { BuilderOutput } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { StylePreprocessorOptions } from '@angular-devkit/build-angular';
import { CLIOptions } from '@storybook/types';
import { StyleElement } from '@angular-devkit/build-angular/src/builders/browser/schema';
export type StorybookBuilderOptions = JsonObject & {
    browserTarget?: string | null;
    tsConfig?: string;
    docs: boolean;
    compodoc: boolean;
    compodocArgs: string[];
    styles?: StyleElement[];
    stylePreprocessorOptions?: StylePreprocessorOptions;
} & Pick<CLIOptions, 'port' | 'host' | 'configDir' | 'https' | 'sslCa' | 'sslCert' | 'sslKey' | 'smokeTest' | 'ci' | 'quiet' | 'disableTelemetry'>;
export type StorybookBuilderOutput = JsonObject & BuilderOutput & {};
declare const _default: import("@angular-devkit/architect/src/internal").Builder<any>;
export default _default;
