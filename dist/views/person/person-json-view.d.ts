import { Person } from "notes-model/dist/person-model";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";
import { PersonHtmlView } from "./person-html-view";
export interface PersonJsonViewProperties extends HtmlViewProperties {
    corsHeaders: CORSHeaders;
}
export declare class PersonJsonView extends PersonHtmlView implements EntityView<Person> {
    protected properties: PersonJsonViewProperties;
    constructor(properties: PersonJsonViewProperties);
    renderDetailsPageOneEntity(entity: Person): HttpResponse;
}
