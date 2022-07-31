import { HttpResponse } from "../http/http";
export interface PostProcessor {
    getRegularExpressionForMacro(): RegExp;
    renderMacro(match: RegExpMatchArray): Promise<string>;
}
export declare class PostProcessorRegistry {
    private postProcessors;
    addPostProcessor(postProcessor: PostProcessor): void;
    processResponse(response: HttpResponse): Promise<HttpResponse>;
}
