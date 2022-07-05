import { Notebook } from "../../stores/notebook-store";
import { EntityController } from "../entity-controller";

export class NotebookController extends EntityController<Notebook> {
  protected getEntityName(): string {
    return "notebook";
  }
}
