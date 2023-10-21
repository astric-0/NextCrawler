import * as cheerio from 'cheerio';
import { saveAs } from 'file-saver';
import { nameBuilder } from '@/lib/contentModules/index.js';

function textSaver(content, nameArr, targetTags = ['H1', 'H2','P']) {
    const filename = nameBuilder(nameArr, '.txt');

    const $ = cheerio.load(content);

    let textContent = '';
    $('*').each((_, element) => {
        const tagName = $(element).prop('tagName');
        if (targetTags?.includes(tagName))
            textContent += `[--${ tagName }--] ` + $(element).text().trim() + '\n';        
    });
    
    if (textContent.length > 0) {
        const file = new File([textContent], filename, {type: "text/plain;charset=utf-8"});    
        saveAs(file);
    }
}

export default textSaver;