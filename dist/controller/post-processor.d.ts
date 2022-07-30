import { HttpResponse } from "../http/http";
export declare class PostProcessor {
    processResponse(response: HttpResponse): Promise<HttpResponse>;
    private showPersonSelector;
}
