import JSZip from "jszip";

const zHtml = _ => {
    this.zip = new JSZip();
    
    this.addFile = (filename, content) => {
        this.zip.file(filename, content);
    }

    this.addFolder = foldername => {
        this.zip.folder(foldername);
    }

    return this;
}

export default zHtml;