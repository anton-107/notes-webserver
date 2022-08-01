import { HttpResponse } from "../http/http";
export interface PostProcessor {
    getRegularExpressionForMacro(): RegExp;
    renderMacro(username: string, match: RegExpMatchArray): Promise<string>;
}
export declare class PostProcessorRegistry {
    private postProcessors;
    addPostProcessor(postProcessor: PostProcessor): void;
    processResponse(username: string, response: HttpResponse): Promise<HttpResponse>;
}
