"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubUserProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const datasources_1 = require("../datasources");
let GithubUserProvider = /** @class */ (() => {
    let GithubUserProvider = class GithubUserProvider {
        constructor(
        // github must match the name property in the datasource json file
        dataSource = new datasources_1.GithubDataSource()) {
            this.dataSource = dataSource;
        }
        value() {
            return service_proxy_1.getService(this.dataSource);
        }
    };
    GithubUserProvider = tslib_1.__decorate([
        tslib_1.__param(0, core_1.inject("datasources.github")),
        tslib_1.__metadata("design:paramtypes", [datasources_1.GithubDataSource])
    ], GithubUserProvider);
    return GithubUserProvider;
})();
exports.GithubUserProvider = GithubUserProvider;
//# sourceMappingURL=github-user.service.js.map