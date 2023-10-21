import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import AppContext from "@/context/AppContext";
import { Weaver } from "@/lib/services";
import { Layout, PanelBar } from "@/components";
import '@/styles/globals.css';

import { htmlSaver, imgSaver } from '@/lib/contentModules';

export default function App({ Component, pageProps }) {
    const crawler = new Weaver();

    const [started, setStarted] = useState(false);
    const [activeHosts, setActiveHosts] = useState({});
    const [currentInfo, setCurrentInfo] = useState({});
    const [crawlerErrorList, setCrawlerErrorList] = useState([]);
    const [batchInfo, setBatchInfo] = useState({ batch: 0, urls: [] });
    const [urlLog, setUrlLog] = useState({});
    const [urlLogLength, setUrlLogLength] = useState(0);

    const pushCrawlerErrorList = error => {
        crawlerErrorList.push(error);
        setCrawlerErrorList([...crawlerErrorList]);
    }

    const setUrlLogExplicit = value => {
        const valueLen = Object.keys(value).length;
        if (urlLogLength != valueLen) {
            setUrlLog({ ...value });
            setUrlLogLength(valueLen);
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

    if (!started)
        crawler.source(undefined, callbacks, imgSaver, undefined);    

    const value = {
        started,
        setStarted,
        crawler,
        activeHosts,
        currentInfo,
        crawlerErrorList,
        batchInfo,
        urlLog,
        urlLogLength,
        getErrorListLength,        
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