import {
	faNoteSticky,
	faCode,
	faImage,
	fa0,
} from "@fortawesome/free-solid-svg-icons";
import { htmlSaver, imgSaver, textSaver } from "@/lib/content-modules";

const getContentModulePacks = (_) => {
	return [
		{
			name: "None",
			module: undefined,
			icon: fa0,
		},
		{
			name: "Html Saver",
			module: htmlSaver,
			icon: faCode,
		},
		{
			name: "Image Saver",
			module: imgSaver,
			icon: faImage,
		},
		{
			name: "Text Saver",
			module: textSaver,
			icon: faNoteSticky,
		},
	];
};

export default getContentModulePacks;
