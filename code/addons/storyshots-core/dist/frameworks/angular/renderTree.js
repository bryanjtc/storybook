"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ng_snapshot_1 = __importDefault(require("jest-preset-angular/build/serializers/ng-snapshot"));
const html_comment_1 = __importDefault(require("jest-preset-angular/build/serializers/html-comment"));
const testing_1 = require("@angular/core/testing");
const jest_specific_snapshot_1 = require("jest-specific-snapshot");
const renderer_1 = require("@storybook/angular/renderer");
const rxjs_1 = require("rxjs");
(0, jest_specific_snapshot_1.addSerializer)(html_comment_1.default);
(0, jest_specific_snapshot_1.addSerializer)(ng_snapshot_1.default);
function getRenderedTree(story) {
    const currentStory = story.render();
    const application = (0, renderer_1.getApplication)({
        storyFnAngular: currentStory,
        component: story.component,
        // TODO : To change with the story Id in v7. Currently keep with static id to avoid changes in snapshots
        targetSelector: 'storybook-wrapper',
    });
    testing_1.TestBed.configureTestingModule({
        imports: [application],
        providers: [(0, renderer_1.storyPropsProvider)(new rxjs_1.BehaviorSubject(currentStory.props))],
    });
    return testing_1.TestBed.compileComponents().then(() => {
        const tree = testing_1.TestBed.createComponent(application);
        tree.detectChanges();
        // Empty componentInstance remove attributes of the internal main component (<storybook-wrapper>) in snapshot
        return { ...tree, componentInstance: {} };
    });
}
exports.default = getRenderedTree;
