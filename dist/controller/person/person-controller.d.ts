import { FormBody } from "../../http/body-parser";
import { Person } from "../../model/person-model";
import { EntityController } from "../entity-controller";
export declare class PersonController extends EntityController<Person> {
    protected getEntityName(): string;
    protected mapRequestToExistingEntity(username: string, form: FormBody): Person;
    protected mapRequestToNewEntity(username: string, form: FormBody): Person;
    protected isAuthorizedToCreate(user: string, entity: Person): Promise<boolean>;
    protected getEntityURL(entity: Person): string;
}
