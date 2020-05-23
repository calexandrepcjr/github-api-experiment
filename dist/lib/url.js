"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
class URL {
    constructor(req) {
        this.url = req.protocol + "://" + req.headers.host + req.originalUrl;
    }
    queryParam(name, value) {
        this.url = this.url.split("?")[0].concat(`?${name}=${value}`);
        return this;
    }
    toString() {
        return this.url;
    }
}
exports.URL = URL;
//# sourceMappingURL=url.js.map