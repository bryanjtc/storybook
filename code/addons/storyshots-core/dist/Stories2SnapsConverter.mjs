import path from 'path';
import { dedent } from 'ts-dedent';
const defaultOptions = {
    snapshotsDirName: '__snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
};
export class Stories2SnapsConverter {
    constructor(options = {}) {
        this.getSnapshotExtension = () => this.options.snapshotExtension;
        this.options = {
            ...defaultOptions,
            ...options,
        };
    }
    getStoryshotFile(fileName) {
        const { dir, name } = path.parse(fileName);
        const { snapshotsDirName, snapshotExtension } = this.options;
        // Convert to absolute path, in case jest is not running in CWD,
        // else it will create snapshots with the wrong path
        const absDir = path.isAbsolute(dir) ? dir : path.resolve(dir);
        return path.format({
            dir: path.join(absDir, snapshotsDirName),
            name,
            ext: snapshotExtension,
        });
    }
    getSnapshotFileName(context) {
        const { fileName, kind } = context;
        if (!fileName) {
            // eslint-disable-next-line no-console
            console.warn(dedent `
          Storybook was unable to detect filename for stories of kind "${kind}".
          To fix it, add following to your jest.config.js:
              transform: {
                // should be above any other js transform like babel-jest
                '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
              }
        `);
            return null;
        }
        return this.getStoryshotFile(fileName);
    }
    getPossibleStoriesFiles(storyshotFile) {
        const { dir, name } = path.parse(storyshotFile);
        const { storiesExtensions } = this.options;
        return storiesExtensions.map((ext) => path.format({
            dir: path.dirname(dir),
            name,
            ext,
        }));
    }
}
