import config from "#/dev.json";

export default class ApiService{
    static _getXmlHttp(){
        let xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
    static send(url, options={}, data={}) {
        return new Promise((res, rej) => {
            let req = ApiService._getXmlHttp();
            console.log(`${config.apiServerHost || location.hostname}:${config.apiServerPort}/api${url}`)
            req.open(options.method, `${config.apiServerHost || location.hostname}:${config.apiServerPort}/api${url}`, true);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        return res(JSON.parse(req.responseText));
                    }
                    rej();
                }
            };
            req.send(JSON.stringify(data));
        });
    }
}