import { appendFile } from 'fs';

const logMessage =({ 
    dept, batch, urlId, url, status
}) => `\n[${ new Date().toLocaleString() }]\n[id: ${ urlId }][dept: ${ dept }][batch: ${ batch }]\nURL: ${ url }\n[STATUS: ${ status }]\n`;

const logger = (logfile, logInfo) => new Promise((resolve, reject) => {
    if (!(logfile && logInfo)) return reject('Undefined Or Wrong Parameter Values');
    appendFile(logfile, logMessage(logInfo), error => {
        if (error) 
            return reject ({ message: error });
        return resolve();
    });
});

export default logger;