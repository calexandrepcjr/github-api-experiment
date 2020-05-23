import { ResponseWithHeader } from "./response-with-header";
import { ResponseWithoutHeader } from "./response-without-header";

export interface GithubUserService {
  since(since: number): Promise<ResponseWithHeader<object[]>>;
  details(username: string): Promise<ResponseWithoutHeader<object>>;
}
