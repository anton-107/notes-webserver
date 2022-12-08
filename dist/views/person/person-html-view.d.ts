import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { Person } from "../../model/person-model";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";
export interface PersonHtmlViewProperties extends HtmlViewProperties {
    corsHeaders: CORSHeaders;
}
export declare class PersonHtmlView implements EntityView<Person> {
    protected properties: PersonHtmlViewProperties;
    constructor(properties: PersonHtmlViewProperties);
    renderEditingFormOneEntity(person: Person): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(person: Person): HttpResponse;
    renderListPageAllEntities(entities: Person[]): HttpResponse;
}
