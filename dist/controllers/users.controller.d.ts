/// <reference types="express" />
import { Request } from "@loopback/rest";
import { GithubUserService } from "../services/contracts/github-user-service";
export declare class UsersController {
    githubUserService: GithubUserService;
    private req;
    constructor(githubUserService: GithubUserService, req: Request);
    since(since: number): Promise<object>;
    private nextLink;
}
