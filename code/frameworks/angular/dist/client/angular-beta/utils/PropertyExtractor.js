"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyExtractor = exports.uniqueArray = exports.REMOVED_MODULES = exports.reflectionCapabilities = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const NgModulesAnalyzer_1 = require("./NgModulesAnalyzer");
exports.reflectionCapabilities = new core_1.ɵReflectionCapabilities();
exports.REMOVED_MODULES = new core_1.InjectionToken('REMOVED_MODULES');
const uniqueArray = (arr) => {
    return arr
        .flat(Number.MAX_VALUE)
        .filter(Boolean)
        .filter((value, index, self) => self.indexOf(value) === index);
};
exports.uniqueArray = uniqueArray;
class PropertyExtractor {
    /* eslint-enable @typescript-eslint/lines-between-class-members */
    constructor(metadata, component) {
        this.metadata = metadata;
        this.component = component;
        /* eslint-disable @typescript-eslint/lines-between-class-members */
        this.declarations = [];
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
        this.analyzeMetadata = (metadata) => {
            const declarations = [...(metadata?.declarations || [])];
            const providers = [...(metadata?.providers || [])];
            const singletons = [...(metadata?.singletons || [])];
            const imports = [...(metadata?.imports || [])].reduce((acc, imported) => {
                // remove ngModule and use only its providers if it is restricted
                // (e.g. BrowserModule, BrowserAnimationsModule, NoopAnimationsModule, ...etc)
                const [isRestricted, restrictedProviders] = PropertyExtractor.analyzeRestricted(imported);
                if (isRestricted) {
                    singletons.unshift(restrictedProviders || []);
                    return acc;
                }
                acc.push(imported);
                return acc;
            }, []);
            return { ...metadata, imports, providers, singletons, declarations };
        };
        this.init();
    }
    init() {
        const analyzed = this.analyzeMetadata(this.metadata);
        this.imports = (0, exports.uniqueArray)([common_1.CommonModule, analyzed.imports]);
        this.providers = (0, exports.uniqueArray)(analyzed.providers);
        this.singletons = (0, exports.uniqueArray)(analyzed.singletons);
        this.declarations = (0, exports.uniqueArray)(analyzed.declarations);
        if (this.component) {
            const { isDeclarable, isStandalone } = PropertyExtractor.analyzeDecorators(this.component);
            const isDeclared = (0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(this.component, analyzed.declarations, this.imports);
            if (isStandalone) {
                this.imports.push(this.component);
            }
            else if (isDeclarable && !isDeclared) {
                this.declarations.push(this.component);
            }
        }
    }
}
exports.PropertyExtractor = PropertyExtractor;
_a = PropertyExtractor;
PropertyExtractor.analyzeRestricted = (ngModule) => {
    /**
     * BrowserModule is restricted,
     * because bootstrapApplication API, which mounts the component to the DOM,
     * automatically imports BrowserModule
     */
    if (ngModule === platform_browser_1.BrowserModule) {
        return [true];
    }
    /**
     * BrowserAnimationsModule imports BrowserModule, which is restricted,
     * because bootstrapApplication API, which mounts the component to the DOM,
     * automatically imports BrowserModule
     */
    if (ngModule === animations_1.BrowserAnimationsModule) {
        return [true, (0, animations_1.provideAnimations)()];
    }
    /**
     * NoopAnimationsModule imports BrowserModule, which is restricted,
     * because bootstrapApplication API, which mounts the component to the DOM,
     * automatically imports BrowserModule
     */
    if (ngModule === animations_1.NoopAnimationsModule) {
        return [true, (0, animations_1.provideNoopAnimations)()];
    }
    return [false];
};
PropertyExtractor.analyzeDecorators = (component) => {
    const decorators = exports.reflectionCapabilities.annotations(component);
    const isComponent = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Component'));
    const isDirective = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Directive'));
    const isPipe = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Pipe'));
    const isDeclarable = isComponent || isDirective || isPipe;
    const isStandalone = isComponent && decorators.some((d) => d.standalone);
    return { isDeclarable, isStandalone };
};
PropertyExtractor.isDecoratorInstanceOf = (decorator, name) => {
    let factory;
    switch (name) {
        case 'Component':
            factory = core_1.Component;
            break;
        case 'Directive':
            factory = core_1.Directive;
            break;
        case 'Pipe':
            factory = core_1.Pipe;
            break;
        case 'Injectable':
            factory = core_1.Injectable;
            break;
        case 'Input':
            factory = core_1.Input;
            break;
        case 'Output':
            factory = core_1.Output;
            break;
        default:
            throw new Error(`Unknown decorator type: ${name}`);
    }
    return decorator instanceof factory || decorator.ngMetadataName === name;
};
