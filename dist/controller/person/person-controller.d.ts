import { Person } from "notes-model/dist/person-model";
import { FormBody } from "../../http/body-parser";
import { EntityController } from "../entity-controller";
export declare class PersonController extends EntityController<Person> {
    protected getEntityName(): string;
    protected mapRequestToEntityID(requestForm: FormBody): string;
    protected mapRequestToExistingEntity(username: string, person: Person, form: FormBody): Person;
    protected mapRequestToNewEntity(username: string, form: FormBody): Person;
    protected isAuthorizedToCreate(user: string, entity: Person): Promise<boolean>;
    protected getEntityURL(entity: Person): string;
}
