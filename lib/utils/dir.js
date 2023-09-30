import fs from 'fs';

export const isDir = path => fs.existsSync(path);

export const makeDir = path => new Promise((resolve, reject) => {
    if (isDir(path)) return resolve();
    fs.mkdir(path, { recursive: true }, error => {
        if (error)
            return reject({ message: error.message });
        return resolve();
    })
});