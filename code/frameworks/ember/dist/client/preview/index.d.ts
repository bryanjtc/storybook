import './globals';
import type { EmberRenderer } from './types';
declare const forceReRender: () => void;
export declare const raw: ((...args: any[]) => never) | (() => import("lib/types/dist").BoundStory<EmberRenderer>[] | undefined);
export declare const storiesOf: (kind: string, m: any) => import("lib/types/dist").Addon_StoryApi<import("./types").OptionsArgs>;
export declare const configure: (loadable: any, m: any) => any;
export { forceReRender };
