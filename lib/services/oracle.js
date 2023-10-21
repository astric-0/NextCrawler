class Oracle {

    constructor(defaultUrl) {
        const { hostname } = new URL(defaultUrl);
        this.currentUrls = { [ hostname ]: new Set([ defaultUrl ]) };
        this.nextUrls = {};
        this.processed = {};
        this.hostnameCount = {};
        this.waiting = new Set([]);

        this.depth = 0;
        this.batch = 0;        
    }

    get() {
        return { ...this };
    }

    async setProcessed(url, targetDir, info) {
        if (!(url && info)) return;

        this.waiting.delete(url);
        this.processed[url] = { ...info, time: new Date().toLocaleString() };
    
        const { hostname } = new URL(url);
        const count = this.hostnameCount[hostname];
        this.hostnameCount[hostname] = (count ?? 0) - 1;
    
        if (this.hostnameCount[hostname] <= 0)
        delete this.hostnameCount[hostname];    
    }

    roll() {
        if (this.getRemaining() != 0) return;
        this.depth++;
        this.currentUrls = { ...this.nextUrls };
        this.nextUrls = {};
    }

    getProcessed() {
        return Object.keys(this.processed).length;
    }

    getRemaining() {
        let size = 0;
        for (const hostname in this.currentUrls)
            size += this.currentUrls[hostname].size;
        return size;
    }

    getWaiting() {
        return Object.keys(this.waiting).length;
    }

    getCollected() {
        let size = 0;
        for (const hostname in this.nextUrls)
            size += this.nextUrls[hostname].size;
        return size;
    }

    push(urls) {
        if (!urls) return;
        for (const hostname in urls) {
            const nextSet = this.nextUrls[hostname];
            this.nextUrls[hostname] = new Set([...(nextSet ?? []), ...urls[hostname]]);
        }
    }

    popHostname(hostname) {
        if (!(hostname && this.currentUrls[hostname])) return;

        const [ head ] = this.currentUrls[hostname];
        this.currentUrls[hostname].delete(head);
        this.waiting.add(head);

        const count = this.hostnameCount[hostname];
        this.hostnameCount[hostname] = (count ?? 0) + 1;

        if (this.currentUrls[hostname].size == 0)
            delete this.currentUrls[hostname];

        return head;
    }

    popBatch(max = 6, maxhosts = 6) {
        this.batch++;        
        const urls = [];
        for (const hostname in this.currentUrls) {
            if (Object.keys(this.hostnameCount).length >= maxhosts) break;

            for (let j = this.hostnameCount[hostname] ?? 1; j <= max; j++) {
                const url = this.popHostname(hostname);
                if (!url) break;
                urls.push(url);
            }
        }

        return urls;
    }
}

export default Oracle;