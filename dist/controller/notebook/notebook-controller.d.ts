import { FormBody } from "../../http/body-parser";
import { Notebook } from "../../stores/notebook-store";
import { EntityController } from "../entity-controller";
export declare class NotebookController extends EntityController<Notebook> {
    protected getEntityName(): string;
    protected mapRequestToExistingEntity(username: string, form: FormBody): Notebook;
    protected mapRequestToNewEntity(username: string, form: FormBody): Notebook;
}
