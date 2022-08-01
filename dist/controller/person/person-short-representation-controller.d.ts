import { PersonStore } from "../../stores/person/person-store";
import { PostProcessor } from "../post-processor";
export interface PersonShortRepresentationControllerProperties {
    personStore: PersonStore;
}
export declare class PersonShortRepresentationController implements PostProcessor {
    private properties;
    constructor(properties: PersonShortRepresentationControllerProperties);
    private personListCache;
    getRegularExpressionForMacro(): RegExp;
    renderMacro(username: string, match: RegExpMatchArray): Promise<string>;
    private getListOfPeople;
}
