import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Person } from "../../model/person-model";
import { HtmlViewProperties } from "../interfaces";
export declare class PersonHtmlView implements EntityView<Person> {
    protected properties: HtmlViewProperties;
    constructor(properties: HtmlViewProperties);
    renderEditingFormOneEntity(person: Person): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(person: Person): HttpResponse;
    renderListPageAllEntities(entities: Person[]): HttpResponse;
}
