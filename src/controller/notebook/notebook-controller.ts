import { FormBody } from "../../http/body-parser";
import { Notebook } from "../../stores/notebook-store";
import { EntityController } from "../entity-controller";

export class NotebookController extends EntityController<Notebook> {
  protected getEntityName(): string {
    return "notebook";
  }
  protected mapRequestToEntity(username: string, form: FormBody): Notebook {
    return {
      id: form["notebook-id"],
      name: form["notebook-name"],
      owner: username,
    };
  }
}
