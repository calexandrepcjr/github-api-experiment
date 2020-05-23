import { inject, Provider } from "@loopback/core";
import { getService } from "@loopback/service-proxy";
import { GithubDataSource } from "../datasources";
import { GithubUserService } from "./contracts/github-user-service";

export class GithubUserProvider implements Provider<GithubUserService> {
  constructor(
    // github must match the name property in the datasource json file
    @inject("datasources.github")
    protected dataSource: GithubDataSource = new GithubDataSource(),
  ) {}

  value(): Promise<GithubUserService> {
    return getService(this.dataSource);
  }
}
