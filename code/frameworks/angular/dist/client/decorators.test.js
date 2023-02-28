"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const decorators_1 = require("./decorators");
const defaultContext = {
    componentId: 'unspecified',
    kind: 'unspecified',
    title: 'unspecified',
    id: 'unspecified',
    name: 'unspecified',
    story: 'unspecified',
    tags: [],
    parameters: {},
    initialArgs: {},
    args: {},
    argTypes: {},
    globals: {},
    hooks: {},
    loaded: {},
    originalStoryFn: jest.fn(),
    viewMode: 'story',
    abortSignal: undefined,
    canvasElement: undefined,
};
class MockModule {
}
class MockModuleTwo {
}
class MockService {
}
let MockComponent = class MockComponent {
};
MockComponent = __decorate([
    (0, core_1.Component)({})
], MockComponent);
describe('moduleMetadata', () => {
    it('should add metadata to a story without it', () => {
        const result = (0, decorators_1.moduleMetadata)({
            imports: [MockModule],
            providers: [MockService],
        })(() => ({
            component: MockComponent,
        }), 
        // deepscan-disable-next-line
        defaultContext);
        expect(result).toEqual({
            component: MockComponent,
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [MockModule],
                schemas: [],
                providers: [MockService],
            },
        });
    });
    it('should combine with individual metadata on a story', () => {
        const result = (0, decorators_1.moduleMetadata)({
            imports: [MockModule],
        })(() => ({
            component: MockComponent,
            moduleMetadata: {
                imports: [MockModuleTwo],
                providers: [MockService],
            },
        }), 
        // deepscan-disable-next-line
        defaultContext);
        expect(result).toEqual({
            component: MockComponent,
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [MockModule, MockModuleTwo],
                schemas: [],
                providers: [MockService],
            },
        });
    });
    it('should return the original metadata if passed null', () => {
        const result = (0, decorators_1.moduleMetadata)(null)(() => ({
            component: MockComponent,
            moduleMetadata: {
                providers: [MockService],
            },
        }), 
        // deepscan-disable-next-line
        defaultContext);
        expect(result).toEqual({
            component: MockComponent,
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [],
                schemas: [],
                providers: [MockService],
            },
        });
    });
});
