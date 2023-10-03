import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import AppContext from "@/context/AppContext";
import { Weaver } from "@/lib/services";
import Layout from "@/components/layouts/Layout";
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    const crawler = new Weaver();
    const [started, setStarted] = useState(false);
    const [activeHosts, setActiveHosts] = useState({});
    const [currentInfo,  setCurrentInfo] = useState({});
    const [crawlerErrorList, setCrawlerErrorList] = useState([]);
    const [batchInfo, setBatchInfo] = useState({ batch: 0, urls: [] });
    const [urlLog, setUrlLog] = useState({});

    const pushCrawlerErrorList = error => {
        crawlerErrorList.push(error);
        setCrawlerErrorList([ ...crawlerErrorList ]);
    }

    const callbacks = {
        setActiveHosts,
        setCurrentInfo,
        pushCrawlerErrorList,
        setBatchInfo,
        setUrlLog,
    }

    if (!started)
        crawler.source(undefined, callbacks);

    const value = { 
        started, 
        setStarted, 
        crawler, 
        activeHosts, 
        currentInfo, 
        crawlerErrorList, 
        batchInfo,
        urlLog,
    }

    return (
        <AppContext.Provider value={value}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    );
}