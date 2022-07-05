import { Notebook } from "../../stores/notebook-store";
import { EntityController } from "../entity-controller";
export declare class NotebookController extends EntityController<Notebook> {
    protected getEntityName(): string;
}
