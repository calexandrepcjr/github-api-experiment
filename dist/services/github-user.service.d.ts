import { Provider } from "@loopback/core";
import { GithubDataSource } from "../datasources";
import { GithubUserService } from "./contracts/github-user-service";
export declare class GithubUserProvider implements Provider<GithubUserService> {
    protected dataSource: GithubDataSource;
    constructor(dataSource?: GithubDataSource);
    value(): Promise<GithubUserService>;
}
