"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: "github",
    connector: "rest-hdr",
    baseURL: "https://api.github.com",
    crud: false,
    operations: [
        {
            template: {
                method: "GET",
                url: "https://api.github.com/users?since={format=json}",
                headers: {
                    accepts: "application/json",
                    "content-type": "application/json",
                    "User-Agent": "GithubApiExperiment",
                },
                query: {
                    since: "{since=1}",
                },
                responseHeaders: true,
            },
            functions: {
                since: [],
            },
        },
    ],
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let GithubDataSource = /** @class */ (() => {
    let GithubDataSource = class GithubDataSource extends repository_1.juggler.DataSource {
        constructor(dsConfig = config) {
            super(dsConfig);
        }
    };
    GithubDataSource.dataSourceName = "github";
    GithubDataSource.defaultConfig = config;
    GithubDataSource = tslib_1.__decorate([
        core_1.lifeCycleObserver("datasource"),
        tslib_1.__param(0, core_1.inject("datasources.config.github", { optional: true })),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GithubDataSource);
    return GithubDataSource;
})();
exports.GithubDataSource = GithubDataSource;
//# sourceMappingURL=github.datasource.js.map