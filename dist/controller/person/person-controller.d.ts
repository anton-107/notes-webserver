import { FormBody } from "../../http/body-parser";
import { Person } from "../../stores/person/person-store";
import { EntityController } from "../entity-controller";
export declare class PersonController extends EntityController<Person> {
    protected getEntityName(): string;
    protected mapRequestToExistingEntity(username: string, form: FormBody): Person;
    protected mapRequestToNewEntity(username: string, form: FormBody): Person;
}
