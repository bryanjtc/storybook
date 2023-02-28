import path from 'path';
export const addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
export const previewAnnotations = (entries = []) => [
    ...entries,
    require.resolve('./client/config'),
];
export const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: path.dirname(require.resolve(path.join('@storybook/builder-webpack5', 'package.json'))),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
export const typescript = async (config) => {
    return {
        ...config,
        skipBabel: true,
    };
};
