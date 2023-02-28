"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const PropertyExtractor_1 = require("./PropertyExtractor");
const test_module_1 = require("../__testfixtures__/test.module");
const TEST_TOKEN = new core_1.InjectionToken('testToken');
const TestTokenProvider = { provide: TEST_TOKEN, useValue: 123 };
const TestService = (0, core_1.Injectable)()(class {
});
const TestComponent1 = (0, core_1.Component)({})(class {
});
const TestComponent2 = (0, core_1.Component)({})(class {
});
const StandaloneTestComponent = (0, core_1.Component)({ standalone: true })(class {
});
const TestDirective = (0, core_1.Directive)({})(class {
});
const TestModuleWithDeclarations = (0, core_1.NgModule)({ declarations: [TestComponent1] })(class {
});
const TestModuleWithImportsAndProviders = (0, core_1.NgModule)({
    imports: [TestModuleWithDeclarations],
    providers: [TestTokenProvider],
})(class {
});
const analyzeMetadata = (metadata, component) => {
    return new PropertyExtractor_1.PropertyExtractor(metadata, component);
};
const extractImports = (metadata, component) => {
    const { imports } = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    return imports;
};
const extractDeclarations = (metadata, component) => {
    const { declarations } = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    return declarations;
};
const extractProviders = (metadata, component) => {
    const { providers } = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    return providers;
};
const extractSingletons = (metadata, component) => {
    const { singletons } = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    return singletons;
};
describe('PropertyExtractor', () => {
    describe('analyzeMetadata', () => {
        it('should remove BrowserModule', () => {
            const metadata = {
                imports: [platform_browser_1.BrowserModule],
            };
            const { imports, providers, singletons } = analyzeMetadata(metadata);
            expect(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            expect(providers.flat(Number.MAX_VALUE)).toEqual([]);
            expect(singletons.flat(Number.MAX_VALUE)).toEqual([]);
        });
        it('should remove BrowserAnimationsModule and use its providers instead', () => {
            const metadata = {
                imports: [animations_1.BrowserAnimationsModule],
            };
            const { imports, providers, singletons } = analyzeMetadata(metadata);
            expect(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            expect(providers.flat(Number.MAX_VALUE)).toEqual([]);
            expect(singletons.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideAnimations)());
        });
        it('should remove NoopAnimationsModule and use its providers instead', () => {
            const metadata = {
                imports: [animations_1.NoopAnimationsModule],
            };
            const { imports, providers, singletons } = analyzeMetadata(metadata);
            expect(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            expect(providers.flat(Number.MAX_VALUE)).toEqual([]);
            expect(singletons.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideNoopAnimations)());
        });
        it('should remove Browser/Animations modules recursively', () => {
            const metadata = {
                imports: [animations_1.BrowserAnimationsModule, platform_browser_1.BrowserModule],
            };
            const { imports, providers, singletons } = analyzeMetadata(metadata);
            expect(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            expect(providers.flat(Number.MAX_VALUE)).toEqual([]);
            expect(singletons.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideAnimations)());
        });
        it('should not destructure Angular official module', () => {
            const metadata = {
                imports: [test_module_1.WithOfficialModule],
            };
            const { imports, providers, singletons } = analyzeMetadata(metadata);
            expect(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule, test_module_1.WithOfficialModule]);
            expect(providers.flat(Number.MAX_VALUE)).toEqual([]);
            expect(singletons.flat(Number.MAX_VALUE)).toEqual([]);
        });
    });
    describe('extractImports', () => {
        it('should return Angular official modules', () => {
            const imports = extractImports({ imports: [TestModuleWithImportsAndProviders] });
            expect(imports).toEqual([common_1.CommonModule, TestModuleWithImportsAndProviders]);
        });
        it('should return standalone components', () => {
            const imports = extractImports({
                imports: [TestModuleWithImportsAndProviders],
            }, StandaloneTestComponent);
            expect(imports).toEqual([
                common_1.CommonModule,
                TestModuleWithImportsAndProviders,
                StandaloneTestComponent,
            ]);
        });
    });
    describe('extractDeclarations', () => {
        it('should return an array of declarations that contains `storyComponent`', () => {
            const declarations = extractDeclarations({ declarations: [TestComponent1] }, TestComponent2);
            expect(declarations).toEqual([TestComponent1, TestComponent2]);
        });
    });
    describe('analyzeDecorators', () => {
        it('isStandalone should be false', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(TestComponent1);
            expect(isStandalone).toBe(false);
        });
        it('isStandalone should be true', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(StandaloneTestComponent);
            expect(isStandalone).toBe(true);
        });
    });
    describe('extractProviders', () => {
        it('should return an array of providers', () => {
            const providers = extractProviders({
                providers: [TestService],
            });
            expect(providers).toEqual([TestService]);
        });
        it('should return an array of singletons extracted', () => {
            const singeltons = extractSingletons({
                imports: [animations_1.BrowserAnimationsModule],
            });
            expect(singeltons).toEqual((0, animations_1.provideAnimations)());
        });
    });
});
