import { HeadersObject } from "@loopback/rest";

export interface ResponseWithHeader<T = object> {
  body: T;
  headers: HeadersObject;
}
