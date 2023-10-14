import { saveAs } from "file-saver";

function htmlSaver(content, nameArr) {
    const filename = nameArr.reduce((value, curr) => value + '_' + curr);
    const file = new File([content], filename, {type: "text/plain;charset=utf-8"});    
    saveAs(file);
}

export default htmlSaver;