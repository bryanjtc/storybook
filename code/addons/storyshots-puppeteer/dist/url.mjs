import { URL } from 'url';
export const constructUrl = (storybookUrl, id) => {
    const url = new URL(storybookUrl);
    url.pathname = url.pathname.replace(/\/$/, '').concat('/iframe.html');
    url.searchParams.append('id', id);
    return url.toString();
};
