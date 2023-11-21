import { saveAs } from "file-saver";
import { nameBuilder } from "@/lib/content-modules/index.js";

function htmlSaver(content, nameArr) {
	const filename = nameBuilder(nameArr, ".html");
	const file = new File([content], filename, {
		type: "text/plain;charset=utf-8",
	});
	saveAs(file);
	return filename;
}

export default htmlSaver;
