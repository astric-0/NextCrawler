import fs from 'fs';
import * as cheerio from 'cheerio';
import { makeDir } from './dir.js';

const getHostname = url => {
    try {
        return new URL(url).hostname;
    } catch (error) {
        return false;
    }
}

const flute = ({ 
    body, 
    url, 
    dir = './', 
    dept = 0, 
    filename = Date.now() + '.html',
    processed = {}
}) => new Promise(async (resolve, reject) => {
    try {
        if (!(body && url)) throw new Error('Empty body or url');

        const { hostname } = new URL(url);
        const path = `${ dir }/${ hostname }/${ dept }/`;

        await makeDir(path);

        const urls = {};
        let count = 0;
        const $ = cheerio.load(body);
        $('a').each((_, element) => {
            const url = $(element).attr('href');
            const hostname = getHostname(url);
            if (hostname && !processed[url]) {                
                (!urls[hostname] && (urls[hostname] = new Set([])));
                urls[hostname].add(url);
                count++;
            }
        });

        const writer = fs.createWriteStream(path + '/' + filename);
        writer.on('error', error => reject ({ message: error.message }));
        writer.on('finish', _ => resolve({ path, urls, count }));
        writer.write(body);
        writer.end();
    } catch ({ message }) {
        return reject({ message });
    }    
});

export default flute;