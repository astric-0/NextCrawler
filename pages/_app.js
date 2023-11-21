import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import { useState } from "react";

import config from "@/config";
import AppContext from "@/context/AppContext";
import { Weaver, weaverStates } from "@/lib/services";
import { Layout, TopPanel } from "@/components";
import { getContentModulePacks } from "@/lib/content-modules";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }) {
	const crawler = new Weaver();

	const [crawlerState, setCrawlerState] = useState(
		crawler?.getState() ?? weaverStates.inactive
	);
	const [activeHosts, setActiveHosts] = useState({});
	const [currentInfo, setCurrentInfo] = useState({});
	const [crawlerErrorList, setCrawlerErrorList] = useState([]);
	const [batchInfo, setBatchInfo] = useState({ batch: 0, urls: [] });
	const [urlLog, setUrlLog] = useState({ total: 0 });
	const [urlLogLength, setUrlLogLength] = useState({ length: 0 });
	const [sourceState, setSourceState] = useState({ ...config });
	const [contentModulePack, setContentModulePack] = useState(
		getContentModulePacks()[0]
	);

	const resetApp = (_) => {
		crawler.reset();
		setCrawlerState(weaverStates.inactive);
		setActiveHosts({});
		setCurrentInfo({});
		setCrawlerErrorList([]);
		setBatchInfo({ batch: 0, urls: [] });
		setUrlLog({ total: 0 });
		setUrlLogLength(0);
		setSourceState({ ...config });
		setContentModulePack(getContentModulePacks()[0]);
	};

	const pushCrawlerErrorList = (error) => {
		crawlerErrorList.push(error);
		setCrawlerErrorList([...crawlerErrorList]);
	};

	const setUrlLogExplicit = (log) => {
		const { batch } = log;

		++urlLog.total;
		if (urlLog[batch] == undefined) {
			urlLog[batch] = [log];
			setUrlLog({ ...urlLog });
		} else {
			urlLog[batch].push(log);
			setUrlLog(urlLog);
		}
	};

	const getErrorListLength = (_) => {
		return crawlerErrorList.length;
	};

	const getTotalProccessedUrl = (_) => {
		return urlLog.total;
	};

	const setUpload = (flag) => {
		setSourceState({ ...sourceState, upload: flag });
	};

	const callbacks = {
		setActiveHosts,
		setCurrentInfo,
		pushCrawlerErrorList,
		setBatchInfo,
		setUrlLog,
		setCrawlerState,
		setUrlLogExplicit,
		setUpload,
		toast,
	};

	const value = {
		crawlerState,
		setCrawlerState,
		sourceState,
		setSourceState,
		contentModulePack,
		setContentModulePack,
		crawler,
		callbacks,
		activeHosts,
		currentInfo,
		crawlerErrorList,
		batchInfo,
		urlLog,
		urlLogLength,
		getErrorListLength,
		getTotalProccessedUrl,
		resetApp,
		toast,
	};

	return (
		<AppContext.Provider value={value}>
			<Layout>
				<TopPanel />
				<ToastContainer autoClose={false} />
				<Component {...pageProps} />
			</Layout>
		</AppContext.Provider>
	);
}
