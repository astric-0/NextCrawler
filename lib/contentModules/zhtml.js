import JSZip from "jszip";

class ZHtml {
    constructor() {
        ZHtml.instance  = ZHtml.instance ?? this;
        return ZHtml.instance;
    }

    make() {
        this.zip = new JSZip();
        return this;
    }

    addFile(filename, content) {
        this.zip?.file(filename, content);        
    }

    addFolder(foldername) {
        this.zip.folder(foldername);
    }
}

export default ZHtml;

// export default function zHtml () {
//     let zip = new JSZip();
    
//     const get = _ => zip;

//     const addFile = (filename, content) => {
//         zip.file(filename, content);
//     }

//     const addFolder = foldername => {
//         zip.folder(foldername);
//     }

//     return [get, addFile, addFolder];
// }