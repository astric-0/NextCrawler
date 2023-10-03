import config from "../../config/index.js";
import Oracle from "./oracle.js";
import { cfetch, CFetchError, reaper } from "../utils/index.js";

class Weaver {
    constructor() {
        Weaver.instance = Weaver.instance ?? this;
        return Weaver.instance;
    }

    source(inputs, callbacks) {
        this.init = true;
        this.active = false;
        this.invariants = { ...config, ...inputs };
        this.variants = new Oracle(this.invariants.defaultUrl);
        this.callbacks = callbacks;
        return this;
    }

    getCurrInfo() {
        /*
        console.log('Remaining : ', this.variants.getRemaining());
        console.log('Waiting   : ', this.variants.getWaiting());
        console.log('Collected : ', this.variants.getCollected());
        console.log('Active    : ', this.variants.hostnameCount);
        console.log('Active Count: ', Object.keys(this.variants.hostnameCount).length);
        */
        return {
            depth: this.variants.depth,
            remaining: this.variants.getRemaining(),
            waiting: this.variants.getWaiting(),
            collected: this.variants.getCollected(),
            activeCount: Object.keys(this.variants.hostnameCount).length,
            processed: this.variants.getProcessed(),  
        };
    }

    stop() {
        this.active = false;
    }

    weave() {
        let urlIdCounter = -1;
        this.active = true;
        const { intervalRequestLimit, maxHostsLimit } = this.invariants;

        const interval = setInterval(_ => {

            if (this.active == false)  {
                clearInterval(interval);
                return;
            } 

            this.variants.roll();   
            const urls = this.variants.popBatch(intervalRequestLimit, maxHostsLimit);
            const { depth, batch } = this.variants.get();
            
            this.callbacks.setBatchInfo({ batch, urls, });
            this.callbacks.setActiveHosts({ ...this.variants.get().hostnameCount });
            this.callbacks.setUrlLog({ ...this.variants.get().processed });

            urls.forEach(async url => {
                const urlId = ++urlIdCounter;
                //const filename = urlId + '.html';
                try {                    
                    const { body } = await cfetch(url);
                    /*const { path, urls: extractedUrls, count } = await flute({
                        body,
                        url,
                        depth,
                        filename,
                        dir: this.invariants.targetDir,
                        processed: this.variants.processed
                    });*/
                    const { urls: extractedUrls, count } = reaper({ body, processed: this.variants.processed });
                    
                    this.callbacks.setCurrentInfo({ ...this.getCurrInfo() });

                    console.log('URLs EXTRACTED: ', count);

                    this.variants.push(extractedUrls);
                    await this.variants.setProcessed(url, this.invariants.targetDir, {
                        depth, 
                        batch, 
                        urlId, 
                        status: `Downloaded [${/* path + filename */ ''}]`,
                        failed: false
                    });

                } catch (error) {

                    this.callbacks.pushCrawlerErrorList({ message: error.message, urlId, batch, url });

                    if (error instanceof CFetchError) {
                        const { message, contentType, statusCode } = error;
                        await this.variants.setProcessed(url, this.invariants.targetDir, {
                            depth,
                            batch,
                            urlId,
                            status: `Fetch Failed: [${ message + ' ' + (contentType ? contentType : statusCode)}]`,
                            failed: true
                        });
                    }
                    else {
                        await this.variants.setProcessed(url, this.invariants.targetDir, {
                            depth,
                            batch,
                            urlId,
                            status: `Error: [${ error.message }]`,
                            failed: true
                        });
                    }                
                }
            });
        }, this.invariants.intervalGap);
    }
}

export default Weaver;