const getDateString = (_) => {
	const dateStr = new Date().toLocaleString();
	return dateStr.replaceAll(/(:|,|\s|\/)/g, "_");
};

const config = {
	defaultUrl: "https://github.com",
	intervalGap: 10000,
	intervalRequestLimit: 6,
	maxHostLimit: 6,
	linkLimit: 20000,
	targetDir: getDateString(),
	targetDomain: false,
	upload: false,
	uploadUrl: "http://localhost:3001/client/index",
	imgListUrl: "http://localhost:3001/client/imglist",
	imgUrl: "http://localhost:3001/image",
};

export default config;
