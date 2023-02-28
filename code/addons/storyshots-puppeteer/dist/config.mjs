const noop = () => undefined;
const asyncNoop = async () => undefined;
export const defaultCommonConfig = {
    storybookUrl: 'http://localhost:6006',
    chromeExecutablePath: process.env.SB_CHROMIUM_PATH,
    getGotoOptions: noop,
    customizePage: asyncNoop,
    getCustomBrowser: undefined,
    browserLaunchOptions: {},
    setupTimeout: 15000,
    testTimeout: 15000,
};
const getTestBody = (options) => options.context.parameters.puppeteerTest;
function defaultTestBody(page, options) {
    const testBody = getTestBody(options);
    if (testBody != null) {
        return testBody(page, options);
    }
    return null;
}
defaultTestBody.filter = (options) => getTestBody(options) != null;
export const defaultPuppeteerTestConfig = {
    ...defaultCommonConfig,
    testBody: defaultTestBody,
};
// We consider taking the full page is a reasonable default.
const defaultScreenshotOptions = () => ({ fullPage: true, encoding: 'base64' });
export const defaultImageSnapshotConfig = {
    ...defaultCommonConfig,
    getMatchOptions: noop,
    getScreenshotOptions: defaultScreenshotOptions,
    beforeScreenshot: noop,
    afterScreenshot: noop,
};
export const defaultAxeConfig = {
    ...defaultCommonConfig,
    beforeAxeTest: noop,
};
