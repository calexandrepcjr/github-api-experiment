import { HeadersObject } from "@loopback/rest";
import { ResponseWithoutHeader } from "./response-without-header";

export interface ResponseWithHeader<T = object>
  extends ResponseWithoutHeader<T> {
  headers: HeadersObject;
}
