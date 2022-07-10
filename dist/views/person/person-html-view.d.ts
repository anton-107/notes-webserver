import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Person } from "../../stores/person/person-store";
import { HtmlViewProperties } from "../interfaces";
export declare class PersonHtmlView implements EntityView<Person> {
    private properties;
    constructor(properties: HtmlViewProperties);
    renderEditingFormOneEntity(person: Person): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(person: Person): HttpResponse;
}
