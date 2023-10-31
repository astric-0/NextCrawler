import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import config from "@/config";
import AppContext from "@/context/AppContext";
import { Weaver } from "@/lib/services";
import { Layout, PanelBar } from "@/components";
import { getContentModulePacks } from '@/lib/content-modules';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    const crawler = new Weaver();

    const [started, setStarted] = useState(false);
    const [activeHosts, setActiveHosts] = useState({});
    const [currentInfo, setCurrentInfo] = useState({});
    const [crawlerErrorList, setCrawlerErrorList] = useState([]);
    const [batchInfo, setBatchInfo] = useState({ batch: 0, urls: [] });
    const [urlLog, setUrlLog] = useState({});
    const [urlLogLength, setUrlLogLength] = useState(0);
    const [sourceState, setSourceState] = useState({ ...config });
    const [contentModulePack, setContentModulePack] = useState(getContentModulePacks()[0]);

    const resetApp = _ => {
        crawler.reset();
        setStarted(false);
        setActiveHosts({});
        setCurrentInfo({});
        setCrawlerErrorList([]);
        setBatchInfo({ batch: 0, urls: [] });
        setUrlLog({});
        setUrlLogLength(0);
        setSourceState({ ...config });
        setContentModulePack(getContentModulePacks()[0]);
    }

    const pushCrawlerErrorList = error => {
        crawlerErrorList.push(error);
        setCrawlerErrorList([...crawlerErrorList]);
    }

    const setUrlLogExplicit = log => {
        const { url, batch } = log;
        if (urlLog[batch] == undefined) {
            urlLog[batch] = [log];
            setUrlLog({ ...urlLog });
        }
        else {
            urlLog[batch].push(log);            
            setUrlLog(urlLog);
        }
    }

    const getErrorListLength = _ => {
        return crawlerErrorList.length;
    }

    const callbacks = {
        setActiveHosts,
        setCurrentInfo,
        pushCrawlerErrorList,
        setBatchInfo,
        setUrlLog,
        setUrlLogExplicit,
    }

    const value = {
        started,
        setStarted,
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
        resetApp,
    }

    return (
        <AppContext.Provider value={value}>
            <Layout>
                <PanelBar />
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    );
}