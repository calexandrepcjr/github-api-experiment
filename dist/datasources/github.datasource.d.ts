import { LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
export declare class GithubDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        baseURL: string;
        crud: boolean;
        operations: {
            template: {
                method: string;
                url: string;
                headers: {
                    accepts: string;
                    "content-type": string;
                    "User-Agent": string;
                };
                query: {
                    since: string;
                };
                responseHeaders: boolean;
            };
            functions: {
                since: never[];
            };
        }[];
    };
    constructor(dsConfig?: object);
}
