const cfetch = url => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(url, { method: 'GET' });

        if (response.status === 200) {
            const contentType = response.headers.get('content-type');
            if (contentType && (contentType.includes('html') || contentType.includes('xml')))
                return resolve({ body: await response.text() })
            throw new CFetchError({ 
                message: 'Invalid Content Type',
                contentType,
                statusCode: 200                
            });
        }

        throw new CFetchError({ 
            message: 'Invalid Response',
            statusCode: response.status,
        });
    } catch (error) {
        return reject(error);
    }
});

class CFetchError extends Error {
    constructor({ message = 'CFetchError', contentType = 'Unknown', statusCode = 'Unknown' } = {}) {
        super(message);
        this.contentType = contentType;
        this.statusCode = statusCode;
    }
}

export { cfetch, CFetchError };