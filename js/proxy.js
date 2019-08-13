const api = new Proxy({}, {
    get(target, key, context) {
        return target[key] || ['get', 'post'].reduce((acc, key) => {
            acc[key] = (config, data) => {

                if (!config && !config.url || config.url === '') throw new Error('Url cannot be empty.');
                let isPost = key === 'post';

                if (isPost && !data) throw new Error('Please provide data in JSON format when using POST request.');

                config.headers = isPost ? Object.assign(config.headers || {}, { 'content-type': 'application/json;chartset=utf8' }) :
                    config.headers;

                return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open(key, config.url);
                    if (config.headers) {
                        Object.keys(config.headers).forEach((header) => {
                            xhr.setRequestHeader(header, config.headers[header]);
                        });
                    }
                    xhr.onload = () => (xhr.status === 200 ? resolve : reject)(xhr);
                    xhr.onerror = () => reject(xhr);
                    xhr.send(isPost ? JSON.stringify(data) : null);
                });
            };
            return acc;
        }, target)[key];
    },
    set() {
        throw new Error('API methods are readonly');
    },
    deleteProperty() {
        throw new Error('API methods cannot be deleted!');
    }
});
//use
api.get({
    url: 'my-url'
}).then((xhr) => {
    alert('Success');
}, (xhr) => {
    alert('Fail');
});

/**
 * 
 * @param {*} tgt 
 * @param {string} type 
 */
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}