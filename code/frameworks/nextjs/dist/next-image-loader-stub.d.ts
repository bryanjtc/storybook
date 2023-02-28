import { RawLoaderDefinition } from 'webpack';

interface LoaderOptions {
    filename: string;
}
declare const nextImageLoaderStub: RawLoaderDefinition<LoaderOptions>;

export { nextImageLoaderStub as default };
