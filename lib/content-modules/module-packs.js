import { faNoteSticky, faCode, faImage } from '@fortawesome/free-solid-svg-icons';
import { htmlSaver, imgSaver, textSaver } from '@/lib/content-modules';

const getContentModulePacks = _ => {
    return [
        {
            name: 'Html Saver',
            module: htmlSaver,
            icon: faCode,
        },
        {
            name: 'Image Saver',
            module: imgSaver,
            icon: faImage,
        },
        {
            name: 'Text Saver',
            module: textSaver,
            icon: faNoteSticky,
        }
    ];
}

export default getContentModulePacks;