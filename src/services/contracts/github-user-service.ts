import { ResponseWithHeader } from "./response-with-header";

export interface GithubUserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  since(since: number): Promise<ResponseWithHeader<object[]>>;
}
