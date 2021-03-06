import { PersonStore } from "../../stores/person/person-store";
import { PostProcessor } from "../post-processor";
export interface PersonSelectorControllerProperties {
    personStore: PersonStore;
}
export declare class PersonSelectorController implements PostProcessor {
    private properties;
    constructor(properties: PersonSelectorControllerProperties);
    getRegularExpressionForMacro(): RegExp;
    renderMacro(username: string, match: RegExpMatchArray): Promise<string>;
}
