import * as cheerio from "cheerio";

const getHostname = (url) => {
	try {
		return new URL(url).hostname;
	} catch (error) {
		return false;
	}
};

const reaper = ({ body, processed = {} }) => {
	if (!body) throw new Error("Empty body or url");

	const urls = {};
	let count = 0;
	const $ = cheerio.load(body);
	$("a").each((_, element) => {
		const url = $(element).attr("href");
		const hostname = getHostname(url);
		if (hostname && !processed[url]) {
			!urls[hostname] && (urls[hostname] = new Set([]));
			urls[hostname].add(url);
			count++;
		}
	});

	return { urls, count };
};

export default reaper;
