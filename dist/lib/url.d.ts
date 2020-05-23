/// <reference types="express" />
import { Request } from "@loopback/rest";
export declare class URL {
    private url;
    constructor(req: Request);
    queryParam(name: string, value: string): URL;
    toString(): string;
}
