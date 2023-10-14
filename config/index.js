const getDateString = _ => {
    const dateStr = new Date().toLocaleString();
    return dateStr.replaceAll(/(:|,|\s|\/)/g, '_');
}

const config = {
    defaultUrl: 'https://github.com',    
    intervalGap: 10000,
    intervalRequestLimit: 6,
    maxHostLimit: 6,
    linkLimit: 20000,
    targetDir: getDateString(),
    targetDomain: false
}

export default config;