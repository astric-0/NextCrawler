import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import * as cheerio from 'cheerio';
import { nameBuilder } from '@/lib/contentModules/index.js';

async function imgSaver (content, nameArr) {    
    const filename = nameBuilder(nameArr, '.zip');
    const zip = new JSZip();

    const $ = cheerio.load(content);
    const imgSrcList = [];
    $('img').each((_, element) => {
        const src = $(element).attr('src');
        imgSrcList.push(src);
    });

    for (const url of imgSrcList) {
        try {
            const response = await fetch(url);
            if (response.status == 200) {
                const blob = await response.blob();
                zip.file(url.split('/').pop(), blob);                
            }            
        } catch ({ message }) {
            console.error(message);
        }        
    }

    const zipContent = await zip.generateAsync({ type: 'blob' });
    saveAs(zipContent, filename);

    return filename;
}

export default imgSaver;