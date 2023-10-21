import * as cheerio from 'cheerio';
import { saveAs } from 'file-saver';
import nameBuilder from '@/lib/contentModules/nameBuilder';

function textSaver(content, nameArr, targetTags) {
    const filename = nameBuilder(nameArr, '.txt');

    const $ = cheerio.load(content);

    let textContent = '';
    $('*').each((_, element) => {
        const tagName = $(element).prop('tagName');
        if (targetTags?.includes(tagName))
            content += $(element).text() + '\n';        
    });

    const file = new File([textContent], filename, {type: "text/plain;charset=utf-8"});    
    saveAs(file);
}

export default textSaver;