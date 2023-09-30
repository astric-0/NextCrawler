import config from "../../config/index.js";
import Oracle from "./oracle.js";
import { cfetch, CFetchError, reaper } from "../utils/index.js";

class Weaver {
    constructor() {
        Weaver.instance = Weaver.instance ?? this;
        return Weaver.instance;
    }

    init(inputs) {
        this.init = true;
        this.active = false;
        this.invariants = { ...config, ...inputs };
        this.variants = new Oracle(this.invariants.defaultUrl);
        return this;
    }

    printInfo() {
        console.log('Remaining : ', this.variants.getRemaining());
        console.log('Waiting   : ', this.variants.getWaiting());
        console.log('Collected : ', this.variants.getCollected());
        console.log('Active    : ', this.variants.hostnameCount);
        console.log('Active Count: ', Object.keys(this.variants.hostnameCount).length);
    }

    stop() {
        this.active = false;
    }

    weave() {
        let urlIdCounter = -1;
        this.active = true;
        const interval = setInterval(_ => {

            if (this.active == false)  {
                clearInterval(interval);
                return;
            } 

            this.variants.roll();   
            const { intervalRequestLimit, maxHostsLimit } = this.invariants;
            const urls = this.variants.popBatch(intervalRequestLimit, maxHostsLimit);
            const { dept, batch } = this.variants.get();
            console.log('REQUESTs TO SEND: ', urls.length);

            this.printInfo();

            urls.forEach(async url => {
                const urlId = ++urlIdCounter;
                const filename = urlId + '.html';
                try {
                    const { body } = await cfetch(url);
                    /*const { path, urls: extractedUrls, count } = await flute({
                        body,
                        url,
                        dept,
                        filename,
                        dir: this.invariants.targetDir,
                        processed: this.variants.processed
                    });*/
                    const { urls: extractedUrls, count } = reaper({ body, processed: this.variants.processed });

                    console.log('URLs EXTRACTED: ', count);

                    this.variants.push(extractedUrls);
                    await this.variants.setProcessed(url, this.invariants.targetDir, {
                        dept, 
                        batch, 
                        urlId, 
                        status: `Downloaded [${ path + filename }]`
                    });

                } catch (error) {
                    if (error instanceof CFetchError) {
                        const { message, contentType, statusCode } = error;
                        await this.variants.setProcessed(url, this.invariants.targetDir, {
                            dept,
                            batch,
                            urlId,
                            status: `Fetch Failed: [${ message + ' ' + (contentType ? contentType : statusCode)}]`
                        });
                    }
                    console.log(url);
                    console.log(error.message);
                }
            });
        }, this.invariants.intervalGap);
    }
}

export default Weaver;