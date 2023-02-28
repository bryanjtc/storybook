import * as lib_types_dist from 'lib/types/dist';
import * as react from 'react';

declare const decorators: ((Story: react.FC<{}>, { globals, parameters }: lib_types_dist.Addon_StoryContext<lib_types_dist.Renderer>) => react.ReactNode)[];
declare const parameters: {
    docs: {
        source: {
            excludeDecorators: boolean;
        };
    };
};

export { decorators, parameters };
