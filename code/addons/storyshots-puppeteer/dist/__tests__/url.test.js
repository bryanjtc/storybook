"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csf_1 = require("@storybook/csf");
const url_1 = require("../url");
jest.mock('@storybook/node-logger');
const id = (0, csf_1.toId)('someKind', 'someStory');
describe('Construct URL for Storyshots', () => {
    it('can use a url without path and without query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001', id)).toEqual('http://localhost:9001/iframe.html?id=somekind--somestory');
    });
    it('can use a url without path (but slash) and without query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001/', id)).toEqual('http://localhost:9001/iframe.html?id=somekind--somestory');
    });
    it('can use a url without path and with query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001?hello=world', id)).toEqual('http://localhost:9001/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url without path (buth slash) and with query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001/?hello=world', id)).toEqual('http://localhost:9001/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url with some path and query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001/nice-path?hello=world', id)).toEqual('http://localhost:9001/nice-path/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url with some path (slash) and query params', () => {
        expect((0, url_1.constructUrl)('http://localhost:9001/nice-path/?hello=world', id)).toEqual('http://localhost:9001/nice-path/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url with username and password and query params', () => {
        expect((0, url_1.constructUrl)('http://username:password@localhost:9001/nice-path/?hello=world', id)).toEqual('http://username:password@localhost:9001/nice-path/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url with username and query params', () => {
        expect((0, url_1.constructUrl)('http://username@localhost:9001/nice-path/?hello=world', id)).toEqual('http://username@localhost:9001/nice-path/iframe.html?hello=world&id=somekind--somestory');
    });
    it('can use a url with file protocol', () => {
        expect((0, url_1.constructUrl)('file://users/storybook', id)).toEqual('file://users/storybook/iframe.html?id=somekind--somestory');
    });
});
