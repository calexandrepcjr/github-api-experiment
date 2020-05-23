import { ResponseWithHeader } from "./response-with-header";
export interface GithubUserService {
    since(since: number): Promise<ResponseWithHeader<object[]>>;
}
