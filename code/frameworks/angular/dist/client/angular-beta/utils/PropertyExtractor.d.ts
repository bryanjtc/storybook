import { InjectionToken, NgModule, Provider, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { NgModuleMetadata } from '../../types';
export declare const reflectionCapabilities: ReflectionCapabilities;
export declare const REMOVED_MODULES: InjectionToken<unknown>;
export declare const uniqueArray: (arr: any[]) => any[];
export declare class PropertyExtractor implements NgModuleMetadata {
    private metadata;
    private component?;
    declarations?: any[];
    imports?: any[];
    providers?: Provider[];
    singletons?: Provider[];
    constructor(metadata: NgModuleMetadata, component?: any);
    private init;
    /**
     * Analyze NgModule Metadata
     *
     * - Removes Restricted Imports
     * - Extracts providers from ModuleWithProviders
     * - Flattens imports
     * - Returns a new NgModuleMetadata object
     *
     *
     */
    private analyzeMetadata;
    static analyzeRestricted: (ngModule: NgModule) => (boolean | Provider[])[];
    static analyzeDecorators: (component: any) => {
        isDeclarable: boolean;
        isStandalone: boolean;
    };
    static isDecoratorInstanceOf: (decorator: any, name: string) => boolean;
}
