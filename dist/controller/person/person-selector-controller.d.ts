import { PostProcessor } from "../post-processor";
export declare class PersonSelectorController implements PostProcessor {
    getRegularExpressionForMacro(): RegExp;
    renderMacro(match: RegExpMatchArray): Promise<string>;
}
