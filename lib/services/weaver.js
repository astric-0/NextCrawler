import config from "@/config/index.js";
import { Oracle } from "@/lib/services/index.js";
import { cfetch, CFetchError, reaper } from "@/lib/utils/index.js";

export const weaverStates = {
    pause: "PAUSED",
    stop: "STOPPED",
    active: "ACTIVE",
    inactive: "INACTIVE",
    reset: "RESET",
}

class Weaver {
    constructor() {
        Weaver.instance = Weaver.instance ?? this;
        if (Weaver.instance.state === undefined)
            Weaver.instance.state = weaverStates.inactive;
        return Weaver.instance;
    }

    reset() {
        this.stop();
        delete Weaver.instance;
        Weaver.instance = new Weaver();
    }

    source(inputs, callbacks, contentModule, filterModule = reaper) {
        this.init = true;
        this.state = weaverStates.inactive;

        this.invariants = { ...config, ...inputs };
        this.variants = new Oracle(this.invariants.defaultUrl);
        this.callbacks = callbacks;
        this.contentModule = contentModule;
        this.filterModule = filterModule;

        return this;
    }

    getCurrInfo() {
        return {
            depth: this.variants.depth,
            remaining: this.variants.getRemaining(),
            waiting: this.variants.getWaiting(),
            collected: this.variants.getCollected(),
            activeCount: Object.keys(this.variants.hostnameCount).length,
        };
    }

    stop() {
        if (this.interval)
            clearInterval(this.interval);
        this.state = weaverStates.stop;
    }

    pause() {
        this.state = weaverStates.pause;
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    weave() {
        let urlIdCounter = -1;
        this.state = weaverStates.active;
        const { intervalRequestLimit, maxHostLimit } = this.invariants;

        this.interval = setInterval(_ => {

            if (this.state == weaverStates.stop) return;            
            
            if (this.state == weaverStates.pause) {
                //this.variants.roll();
                this.callbacks.setActiveHosts({ ...this.variants.get().hostnameCount });
                this.callbacks.setUrlLogExplicit({ ...this.variants.get().processed });
                return;
            }            

            this.variants.roll();
            const urls = this.variants.popBatch(intervalRequestLimit, maxHostLimit);
            const { depth, batch } = this.variants.get();
            
            this.callbacks.setBatchInfo({ batch, urls, });
            this.callbacks.setActiveHosts({ ...this.variants.get().hostnameCount });            

            urls.forEach(async url => {
                const urlId = ++urlIdCounter;
                const urlInfo = { depth, batch, urlId, failed: false, status: '' };
                try {
                    const { body } = await cfetch(url);

                    let filename = '';
                    if (this.contentModule) {
                        if (!body)
                            throw new Error('File Content Is Empty');

                        filename = this.contentModule(body,
                            [
                                this.invariants.targetDir,
                                urlId,
                                url,
                            ]
                        );
                    }

                    const { urls: extractedUrls, count } = this.filterModule({ body, processed: this.variants.processed });

                    this.callbacks.setCurrentInfo({ ...this.getCurrInfo() });
                    this.variants.push(extractedUrls);
            
                    urlInfo.failed = false;
                    urlInfo.status = `Success [${filename ?? ''}]`;
                } catch (error) {
                    let status = '';
                    const { message, contentType, statusCode } = error;
                    
                    if (error instanceof CFetchError)
                        status = `Fetch Failed: [${message + ' ' + (contentType ? contentType : statusCode)}]`;
                    else
                        status = `Error: [${message}]`;

                    this.callbacks.pushCrawlerErrorList({ message, urlId, batch, url });

                    urlInfo.failed = true;
                    urlInfo.status = status;
                }
                               
                const log = this.variants.setProcessed(url, this.invariants.targetDir, urlInfo);
                this.callbacks.setUrlLogExplicit({ url, ...log });
            });
            //console.log(this.variants.waiting);
        }, this.invariants.intervalGap);
    }
}

export default Weaver;